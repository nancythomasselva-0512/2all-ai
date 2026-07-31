import { redirect } from "next/navigation";

// /super-admin redirects to /super-admin/login
export default function SuperAdminIndexPage() {
  redirect("/super-admin/login");
}
