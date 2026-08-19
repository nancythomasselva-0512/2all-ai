import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;
  const userRole = (session.user as any).role || "USER";
  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";

  const db = getDb();

  // Auto-sync domains and default API keys from user's projects if they don't have any domain records yet
  if (!isAdmin) {
    try {
      const domainCount = await db.domain.count({ where: { userId } });
      if (domainCount === 0) {
        const projects = await db.project.findMany({ where: { userId } });
        for (const proj of projects) {
          let cleanDomain = proj.url.trim().toLowerCase();
          cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
          
          if (cleanDomain) {
            const verificationToken = `2all-verify-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
            const newDom = await db.domain.create({
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
              }
            });

            // Auto-generate default active key for the domain
            const hex1 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
            const hex2 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
            const hex3 = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
            const generatedKey = `PUB_${hex1}${hex2}${hex3}`;

            await db.apiKey.create({
              data: {
                userId,
                name: `Widget Key for ${cleanDomain}`,
                key: generatedKey,
                status: "ACTIVE",
                domainId: newDom.id,
                domainName: cleanDomain,
              }
            });

            await logAudit({
              userId,
              action: "REGISTERED_DOMAIN",
              details: { domainId: newDom.id, domain: cleanDomain, websiteName: newDom.websiteName },
            });
          }
        }
      }
    } catch (syncErr) {
      console.warn("Could not sync projects to domains:", syncErr);
    }
  }

  const [domains, allApiKeys] = await Promise.all([
    db.domain.findMany({
      where: isAdmin ? {} : { userId },
      orderBy: { createdAt: "desc" },
      include: {
        apiKeys: {
          select: { id: true, name: true, key: true, status: true, domainId: true, domainName: true, createdAt: true }
        },
        _count: {
          select: { apiKeys: true }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            apiKeys: { select: { id: true, name: true, key: true, status: true, domainId: true, domainName: true, createdAt: true } },
            widgetConfigs: { select: { id: true, publishedConfig: true, draftConfig: true } },
          },
        },
      },
    }),
    db.apiKey.findMany({
      where: isAdmin ? {} : { userId },
      select: { id: true, name: true, key: true, status: true, domainId: true, domainName: true, createdAt: true }
    })
  ]);

  const domainsWithKeys = await Promise.all(domains.map(async (d: any) => {
    const dName = (d.domain || "").toLowerCase();
    const dCanon = (d.canonicalDomain || "").toLowerCase();

    const matchingKeys = allApiKeys.filter((k: any) => 
      k.domainId === d.id ||
      (k.domainName && k.domainName.toLowerCase() === dName) ||
      (k.domainName && dCanon && k.domainName.toLowerCase() === dCanon)
    );

    const unlinkedKeys = matchingKeys.filter((k: any) => !k.domainId);
    if (unlinkedKeys.length > 0) {
      try {
        await db.apiKey.updateMany({
          where: { id: { in: unlinkedKeys.map((k: any) => k.id) } },
          data: { domainId: d.id, domainName: d.domain }
        });
      } catch (linkErr) {
        console.warn("Could not backfill domainId for API keys:", linkErr);
      }
    }

    return {
      ...d,
      apiKeys: matchingKeys,
      _count: { apiKeys: matchingKeys.length },
      apiKeysCount: matchingKeys.length
    };
  }));

  return NextResponse.json(domainsWithKeys);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  try {
    const { websiteName, domain, environment, verificationMethod, notes } = await req.json();
    if (!domain) {
      return NextResponse.json({ message: "Domain name is required." }, { status: 400 });
    }

    // Clean up domain
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");

    const db = getDb();
    // Check if domain already exists
    const existing = await db.domain.findFirst({
      where: {
        OR: [
          { domain: cleanDomain },
          { canonicalDomain: cleanDomain },
          { domain: `www.${cleanDomain}` },
        ],
      },
      include: { user: true },
    });
    if (existing) {
      if (existing.user) {
        return NextResponse.json({ message: "Domain is already registered in the platform." }, { status: 409 });
      } else {
        // Orphaned domain from deleted user — purge stale record so new owner can register
        await db.apiKey.deleteMany({ where: { domainId: existing.id } });
        await db.domain.delete({ where: { id: existing.id } });
      }
    }

    const verificationToken = `2all-verify-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;

    const newDomain = await db.domain.create({
      data: {
        userId,
        websiteName: websiteName || cleanDomain,
        domain: cleanDomain,
        canonicalDomain: cleanDomain,
        environment: environment || "PRODUCTION",
        verificationMethod: verificationMethod || "META",
        verificationToken,
        status: "PENDING_VERIFICATION",
        verified: false,
        notes: notes || "",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            apiKeys: { select: { id: true, name: true, key: true, status: true } },
            widgetConfigs: { select: { id: true, publishedConfig: true, draftConfig: true } },
          },
        },
      },
    });

    // Auto-generate or fetch default API key for the new domain
    let activeKey = "";
    try {
      const existingKey = await db.apiKey.findFirst({
        where: { OR: [{ domainId: newDomain.id }, { domainName: cleanDomain }] }
      });
      if (existingKey) {
        activeKey = existingKey.key;
      } else {
        const hex1 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
        const hex2 = Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");
        const hex3 = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
        const generatedKey = `PUB_${hex1}${hex2}${hex3}`;

        const createdKey = await db.apiKey.create({
          data: {
            userId,
            name: `Widget Key for ${cleanDomain}`,
            key: generatedKey,
            status: "ACTIVE",
            domainId: newDomain.id,
            domainName: cleanDomain,
          }
        });
        activeKey = createdKey.key;
      }

      // Dispatch installation script email to user
      const userEmail = (session.user as any)?.email;
      const userName = (session.user as any)?.name || "Subscriber";
      if (userEmail) {
        const { sendDomainCreatedScriptEmail } = await import("@/lib/mail");
        await sendDomainCreatedScriptEmail(userEmail, userName, cleanDomain, activeKey);
      }
    } catch (keyErr) {
      console.warn("Could not auto-generate/send email for new domain key:", keyErr);
    }

    await logAudit({
      userId,
      action: "REGISTERED_DOMAIN",
      details: { domainId: newDomain.id, domain: cleanDomain, websiteName: newDomain.websiteName, environment: newDomain.environment },
    });

    return NextResponse.json(newDomain, { status: 201 });
  } catch (error: any) {
    console.error("Error creating domain:", error);
    return NextResponse.json({ message: error.message || "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;
  const userRole = (session.user as any).role || "USER";
  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Domain ID is required." }, { status: 400 });
    }

    const db = getDb();
    const domain = await db.domain.findFirst({
      where: isAdmin ? { id } : { id, userId },
    });

    if (!domain) {
      return NextResponse.json({ message: "Domain not found or unauthorized." }, { status: 404 });
    }

    await db.domain.delete({
      where: { id },
    });

    await logAudit({
      userId,
      action: "DELETED_DOMAIN",
      details: { domainId: id, domain: domain.domain },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting domain:", error);
    return NextResponse.json({ message: error.message || "Internal server error." }, { status: 500 });
  }
}
