"use client";

import AdminDashboard from "@/components/admin/AdminDashboard";

interface UserType {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
}

interface ProjectType {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
  } | null;
}

interface SuperAdminDashboardProps {
  initialUsers: UserType[];
  initialProjects: ProjectType[];
  initialDomains?: any[];
  initialConfig?: any;
  currentUser?: { name?: string | null; email?: string | null };
  initialTab?: string;
}

export default function SuperAdminDashboard({
  initialUsers,
  initialProjects,
  initialDomains = [],
  initialConfig,
  currentUser,
  initialTab = "overview"
}: SuperAdminDashboardProps) {
  const defaultConfig = initialConfig || {
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

  return (
    <AdminDashboard
      initialUsers={initialUsers as any}
      initialProjects={initialProjects as any}
      initialDomains={initialDomains as any}
      initialConfig={defaultConfig}
      currentUser={currentUser as any}
      initialTab={initialTab}
      isSuperAdminView={true}
    />
  );
}
