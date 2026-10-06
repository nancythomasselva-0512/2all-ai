import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import SuperAdminDashboard from "@/components/admin/SuperAdminDashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SuperAdminDashboardPage(props: { searchParams?: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || "users";
  const session = await auth();

  // Strict role separation: Admin and Super Admin must not collapse/mix
  const user = session?.user;
  const userRole = (user as any)?.role;

  // Admins belong exclusively to /admin/dashboard
  if (userRole === "ADMIN") {
    const targetUrl = tab && tab !== "users" 
      ? `/admin/dashboard?tab=${encodeURIComponent(tab)}`
      : "/admin/dashboard";
    redirect(targetUrl);
  }

  // Non-super-admins must authenticate at /super-admin/login
  if (userRole !== "SUPER_ADMIN") {
    redirect("/super-admin/login");
  }

  // Fetch telemetry data with safety fallbacks
  let users: any[] = [];
  let projects: any[] = [];
  let domains: any[] = [];

  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        plan: true,
        paymentStatus: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        scans: {
          select: {
            id: true,
            status: true,
            score: true,
            issuesCount: true,
            createdAt: true,
          },
        },
      },
    });

    if ((prisma as any).domain) {
      domains = await (prisma as any).domain.findMany({
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
              apiKeys: { select: { id: true, name: true, key: true, status: true, domainId: true, domainName: true } },
              widgetConfigs: { select: { id: true, publishedConfig: true, draftConfig: true } },
            },
          },
        },
      });
    }
  } catch (err) {
    console.warn("Could not query users/projects for Super Admin:", err);
  }

  // Read current site configuration
  let config = {
    brandName: "2all.ai",
    tagline: "Intelligence that scans",
    showDemoButton: true,
    showTrialButton: true,
    trialButtonText: "START FREE TRIAL",
    demoButtonText: "BOOK A DEMO",
    stripeActive: true,
    paypalActive: false,
    trialPeriodDays: 7,
    primaryColor: "blue",
    proPrice: 49,
    auditBannerTitle: "Put your website to the test",
    orbitIcon: "globe",
    customCss: "/* Inject custom CSS here */\nbody { font-family: sans-serif; }",
    customJs: "console.log('White label platform script injected');",
    trackingScripts: "<!-- Google Analytics or Tracking pixels code -->"
  };

  try {
    const configPath = path.join(process.cwd(), "src/data/site-config.json");
    const data = await fs.readFile(configPath, "utf-8");
    config = JSON.parse(data);
  } catch (err) {
    console.warn("Could not load config file in Super Admin Dashboard, using defaults.");
  }

  // Ensure fresh Super Admin profile
  let superAdminProfile = user;
  if (user?.email) {
    const dbSuper = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true, name: true, email: true, role: true }
    });
    if (dbSuper) {
      superAdminProfile = dbSuper as any;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 super-admin-typography">
      <SuperAdminDashboard
        initialUsers={users as any}
        initialProjects={projects as any}
        initialDomains={domains as any}
        initialConfig={config}
        currentUser={superAdminProfile as any}
        initialTab={tab}
      />
    </div>
  );
}
