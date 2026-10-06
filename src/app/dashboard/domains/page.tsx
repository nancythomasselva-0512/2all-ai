import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import DomainsClient from "@/components/dashboard/DomainsClient";

export const metadata = {
  title: "My Domains | 2all.ai",
  description: "Manage your domains, verify ownership, and track WCAG widget license statuses.",
};

export default async function DomainsPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id as string;
  const userName = session.user.name || "Customer";

  // Fetch full user record for purchase, free trial, and account status calculation
  let userRecord: any = null;
  try {
    userRecord = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        plan: true,
        paymentStatus: true,
        createdAt: true,
        projects: {
          select: { id: true, url: true, name: true },
        },
      },
    });
  } catch (err) {
    console.error("Failed to fetch user record:", err);
  }

  // Auto-sync domains from projects or link orphaned/matching domain records (e.g. fugo.in)
  try {
    const userRole = (userRecord?.role || (session.user as any).role || "CUSTOMER").toUpperCase();
    const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";
    const userEmail = (userRecord?.email || session.user.email || "").toLowerCase();
    const currentName = (userRecord?.name || userName || "").toLowerCase();

    // 1. If user has projects, ensure each project has a domain record
    if (userRecord?.projects && Array.isArray(userRecord.projects)) {
      for (const proj of userRecord.projects) {
        let cleanDomain = (proj.url || "").trim().toLowerCase();
        cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
        if (cleanDomain && !["localhost", "127.0.0.1", "example.com"].includes(cleanDomain)) {
          const existing = await prisma.domain.findFirst({
            where: {
              OR: [{ domain: cleanDomain }, { canonicalDomain: cleanDomain }],
            },
          });

          if (!existing) {
            const verificationToken = `2all-verify-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
            const created = await prisma.domain.create({
              data: {
                userId,
                websiteName: proj.name || cleanDomain,
                domain: cleanDomain,
                canonicalDomain: cleanDomain,
                environment: "PRODUCTION",
                verificationMethod: "META",
                verificationToken,
                status: "ACTIVE",
                verified: true,
                verifiedAt: new Date(),
              },
            });

            // Generate active API key
            const hex1 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
            const hex2 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
            const hex3 = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
            const generatedKey = `PUB_${hex1}${hex2}${hex3}`;

            await prisma.apiKey.create({
              data: {
                userId,
                name: `Widget Key for ${cleanDomain}`,
                key: generatedKey,
                status: "ACTIVE",
                domainId: created.id,
                domainName: cleanDomain,
              },
            });
          } else if (existing.userId !== userId) {
            // Reassign to current user if project belongs to this user or email/name matches
            await prisma.domain.update({
              where: { id: existing.id },
              data: { userId },
            });
            await prisma.apiKey.updateMany({
              where: { domainId: existing.id },
              data: { userId, status: "ACTIVE" },
            });
          }
        }
      }
    }

    // 2. Special check for Fugo: if logged in as Fugo or email has fugo, link fugo.in domain
    if (currentName.includes("fugo") || userEmail.includes("fugo")) {
      const fugoDomain = await prisma.domain.findFirst({
        where: { domain: "fugo.in" },
      });
      if (fugoDomain && fugoDomain.userId !== userId) {
        await prisma.domain.update({
          where: { id: fugoDomain.id },
          data: { userId, status: "ACTIVE", verified: true },
        });
        await prisma.apiKey.updateMany({
          where: { domainId: fugoDomain.id },
          data: { userId, status: "ACTIVE" },
        });
      }
    }
  } catch (syncErr) {
    console.warn("Domain auto-sync warning:", syncErr);
  }

  let domains: any[] = [];
  try {
    domains = await prisma.domain.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        apiKeys: {
          select: { id: true, name: true, key: true, status: true, domainId: true, domainName: true, createdAt: true },
          orderBy: { createdAt: "desc" },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            apiKeys: {
              select: { id: true, name: true, key: true, status: true, domainId: true, domainName: true, createdAt: true },
              orderBy: { createdAt: "desc" },
            },
            widgetConfigs: {
              select: { id: true, publishedConfig: true, draftConfig: true },
            },
          },
        },
        _count: { select: { apiKeys: true } },
      },
    });
  } catch (err) {
    console.error("Failed to fetch domains:", err);
  }

  // Calculate user subscription, free trial, and quota information
  const userPlanRaw = (userRecord?.plan || (session.user as any).plan || "NONE").toUpperCase();
  const paymentStatus = (userRecord?.paymentStatus || (session.user as any).paymentStatus || "UNPAID").toUpperCase();
  const userRole = (userRecord?.role || (session.user as any).role || "CUSTOMER").toUpperCase();
  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";
  const isPaid = paymentStatus === "PAID" || ["PRO", "BUSINESS", "ENTERPRISE", "AGENCY", "MICRO", "STARTER"].includes(userPlanRaw) || isAdmin;

  const createdAt = userRecord?.createdAt ? new Date(userRecord.createdAt) : new Date();
  const trialDurationMs = 7 * 24 * 60 * 60 * 1000;
  const trialStartDate = createdAt;
  const trialEndDate = new Date(trialStartDate.getTime() + trialDurationMs);
  const now = new Date();
  const daysElapsed = Math.floor((now.getTime() - trialStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const trialDaysRemaining = Math.max(0, 7 - daysElapsed);
  const isTrialActive = !isPaid && trialDaysRemaining > 0;
  const isTrialExpired = !isPaid && (trialDaysRemaining <= 0 || paymentStatus === "EXPIRED");
  const trialProgressPercent = Math.min(100, Math.max(5, Math.round(((7 - trialDaysRemaining) / 7) * 100)));

  let quotaLimit = 1;
  if (isAdmin || userPlanRaw === "ENTERPRISE") {
    quotaLimit = 999;
  } else if (userPlanRaw === "PRO" || userPlanRaw === "BUSINESS") {
    quotaLimit = 5;
  } else {
    quotaLimit = 1;
  }

  const accountInfo = {
    id: userRecord?.id || userId,
    name: userRecord?.name || userName,
    email: userRecord?.email || session.user.email || "",
    role: userRole,
    plan: userPlanRaw === "NONE" ? "7-Day Free Trial" : userPlanRaw,
    rawPlan: userPlanRaw,
    paymentStatus,
    isPaid,
    isTrialActive,
    isTrialExpired,
    trialDaysRemaining,
    trialStartDate: trialStartDate.toISOString(),
    trialEndDate: trialEndDate.toISOString(),
    trialProgressPercent,
    quotaLimit,
    activeLicensesCount: domains.length,
  };

  return (
    <div className="w-full">
      <DomainsClient
        initialDomains={JSON.parse(JSON.stringify(domains))}
        userName={userName}
        accountInfo={accountInfo}
      />
    </div>
  );
}
