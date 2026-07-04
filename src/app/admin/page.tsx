import { redirect } from "next/navigation";

// /admin always redirects to the login page.
// The actual dashboard lives at /admin/dashboard.
export default function AdminPage() {
  redirect("/admin/login");
}
