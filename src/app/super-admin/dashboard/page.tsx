import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import SuperAdminDashboard from "@/components/admin/SuperAdminDashboard";

export default async function SuperAdminDashboardPage(props: { searchParams?: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || "users";
  const session = await auth();

  const user = session?.user;
  const isSuperAdmin = user && ((user as any)?.role === "SUPER_ADMIN" || (user as any)?.role === "ADMIN");

  if (!isSuperAdmin) {
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
        createdAt: true,
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
      },
    });

    if ((prisma as any).domain) {
      domains = await (prisma as any).domain.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (err) {
    console.warn("Could not query users/projects for Super Admin:", err);
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <SuperAdminDashboard
        initialUsers={users as any}
        initialProjects={projects as any}
        initialDomains={domains as any}
        currentUser={user as any}
        initialTab={tab}
      />
    </div>
  );
}
