import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  // 1. Seed/Sync default accounts so credentials ALWAYS work
  try {
    const hashAdmin = await bcrypt.hash("admin123", 10);
    const hashSuper = await bcrypt.hash("superadmin123", 10);

    // Admin Account
    await prisma.user.upsert({
      where: { email: "aiadmin@gmail.com" },
      update: { password: hashAdmin, role: "ADMIN" },
      create: {
        name: "Admin User",
        email: "aiadmin@gmail.com",
        password: hashAdmin,
        role: "ADMIN",
      },
    });

    // Super Admin Manager Account (2allaimanager@gmail.com)
    await prisma.user.upsert({
      where: { email: "2allaimanager@gmail.com" },
      update: { password: hashSuper, role: "SUPER_ADMIN", plan: "ENTERPRISE", paymentStatus: "PAID" },
      create: {
        name: "Super Admin Master",
        email: "2allaimanager@gmail.com",
        password: hashSuper,
        role: "SUPER_ADMIN",
        plan: "ENTERPRISE",
        paymentStatus: "PAID",
      },
    });

    // Super Admin Account (superadmin@gmail.com)
    await prisma.user.upsert({
      where: { email: "superadmin@gmail.com" },
      update: { password: hashSuper, role: "SUPER_ADMIN", plan: "ENTERPRISE", paymentStatus: "PAID" },
      create: {
        name: "Super Admin Master",
        email: "superadmin@gmail.com",
        password: hashSuper,
        role: "SUPER_ADMIN",
        plan: "ENTERPRISE",
        paymentStatus: "PAID",
      },
    });
  } catch (seedErr) {
    console.warn("User seeding non-fatal error:", seedErr);
  }

  let errorMsg: string | undefined;
  if (error === "CredentialsSignin") {
    errorMsg = "Invalid email or password. Please try again.";
  } else if (error === "AccessDenied") {
    errorMsg = "Access denied. Executive privileges required.";
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <AdminLoginForm errorMsg={errorMsg} />
    </div>
  );
}
