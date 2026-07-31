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

  // Seed/Sync default admin so credentials always work
  const adminEmail = "aiadmin@gmail.com";
  const adminPassword = "admin123";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing || existing.role !== "ADMIN") {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { password: hashedPassword, role: "ADMIN" },
      create: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }

  let errorMsg: string | undefined;
  if (error === "CredentialsSignin") {
    errorMsg = "Invalid email or password. Please try again.";
  } else if (error === "AccessDenied") {
    errorMsg = "Access denied. Admin privileges required.";
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans super-admin-typography">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <AdminLoginForm errorMsg={errorMsg} />
    </div>
  );
}
