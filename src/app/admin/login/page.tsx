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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
      <AdminLoginForm errorMsg={errorMsg} />
    </div>
  );
}
