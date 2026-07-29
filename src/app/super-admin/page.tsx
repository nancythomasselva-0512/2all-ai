import { redirect } from "next/navigation";

// /super-admin redirects to /super-admin/dashboard
export default function SuperAdminIndexPage() {
  redirect("/super-admin/dashboard");
}
