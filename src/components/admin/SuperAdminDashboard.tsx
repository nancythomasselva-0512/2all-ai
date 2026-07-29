"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Globe,
  Award,
  DollarSign,
  LayoutGrid,
  CreditCard,
  UserCog,
  Check,
  Trash2,
  Search,
  LogOut,
  ShieldCheck,
  Crown,
  KeyRound,
  Plus,
  Loader2,
  X,
  FileCode,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import AdminApiKeysPanel from "@/components/admin/AdminApiKeysPanel";

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
  currentUser?: { name?: string | null; email?: string | null };
  initialTab?: string;
}

export default function SuperAdminDashboard({
  initialUsers,
  initialProjects,
  initialDomains = [],
  currentUser,
  initialTab = "users"
}: SuperAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Create Admin Form State
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("ADMIN");
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.pushState({}, "", url.toString());
    }
  };

  // Submit Create Admin
  const handleCreateAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      showToast("Email and password are required.", "error");
      return;
    }
    setCreatingAdmin(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAdminName,
          email: newAdminEmail,
          password: newAdminPassword,
          role: newAdminRole,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUsers([data.user, ...users]);
        showToast(`New ${newAdminRole} account created for ${data.user.email}!`);
        setIsCreateAdminModalOpen(false);
        setNewAdminName("");
        setNewAdminEmail("");
        setNewAdminPassword("");
      } else {
        showToast(data.message || "Failed to create admin account", "error");
      }
    } catch (err) {
      showToast("Network error creating admin account", "error");
    } finally {
      setCreatingAdmin(false);
    }
  };

  // Delete User Call
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action is irreversible.")) return;
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
        showToast("User deleted successfully!");
      } else {
        const data = await res.json();
        showToast(data.message || "Failed to delete user", "error");
      }
    } catch (err) {
      showToast("Network error deleting user", "error");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR: CRISP WHITE & SAPPHIRE BLUE */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[294px] bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 select-none transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="overflow-y-auto flex-grow max-h-[calc(100vh-70px)]">
          {/* Logo */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Logo height={36} className="self-center" />
              <span className="text-xs font-black text-amber-700 tracking-wider uppercase mt-2.5 px-2 py-0.5 bg-amber-50 border border-amber-200/80 rounded-md block leading-none shadow-sm">
                Super Admin
              </span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Super Admin Navigation Links */}
          <div className="p-4 space-y-1.5">
            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-3 leading-none">
              Master Executive Controls
            </span>
            {[
              { id: "users", label: "User & Admin Registry", icon: UserCog },
              { id: "api-keys", label: "API Keys Console", icon: KeyRound },
              { id: "payments", label: "Financial & Gateways", icon: CreditCard },
              { id: "overview", label: "System Telemetry", icon: LayoutGrid },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabChange(tab.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-black transition-all cursor-pointer border-none ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-600/25 scale-[1.02]"
                      : "bg-transparent text-slate-700 hover:text-blue-700 hover:bg-blue-50/70"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-blue-700 font-extrabold text-sm rounded-xl transition-all cursor-pointer border border-slate-200/80 uppercase tracking-wider text-center shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Switch to Admin Portal
          </Link>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0 bg-slate-50">
        {/* TOP HEADER - CRISP WHITE & GLASSMORPHISM */}
        <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Crown className="w-4 h-4" />
              </div>
              <h2 className="text-sm md:text-base font-black text-slate-900 tracking-wider uppercase truncate">
                Super Admin Master Executive Portal
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <span className="text-xs md:text-sm font-black text-amber-700 whitespace-nowrap bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Super Admin Active
            </span>
          </div>
        </header>

        {/* CONTENT VIEW */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          {/* TOAST NOTIFICATION */}
          {statusMessage && (
            <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-black transition-all animate-in fade-in ${
              statusMessage.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
            }`}>
              <Check className="w-4 h-4 stroke-[3]" />
              {statusMessage.text}
            </div>
          )}

          {/* TAB 1: USER REGISTRY & CREATE ADMIN MANAGER */}
          {activeTab === "users" && (
            <div className="space-y-6 text-left animate-in fade-in duration-200">
              {/* Vibrant Royal Blue Hero Banner */}
              <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-600/15 border border-blue-500/30">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-amber-300 border border-white/20 uppercase tracking-wider">
                      <Crown className="w-3.5 h-3.5 text-amber-400" /> Super Admin Exclusive Access
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      User Database & Admin Account Creator
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-2xl leading-relaxed">
                      Create new Admin staff accounts, manage system security roles, and control master database user access with real-time permissions.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreateAdminModalOpen(true)}
                    className="px-5 py-3.5 bg-white hover:bg-blue-50 text-blue-700 font-black text-xs rounded-2xl shadow-xl shadow-blue-900/20 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider shrink-0 hover:scale-[1.02]"
                  >
                    <Plus className="w-4.5 h-4.5 stroke-[3]" /> Create New Admin
                  </button>
                </div>
              </div>

              {/* Search Filter Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl px-5 py-3.5 shadow-sm">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                  />
                </div>
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider self-end sm:self-center">
                  Showing {filteredUsers.length} of {users.length} Users
                </span>
              </div>

              {/* Users Registry List Table */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-sm font-medium text-slate-600">
                    <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500 tracking-wider border-b border-slate-200/80">
                      <tr>
                        <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">User details</th>
                        <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">Security Role</th>
                        <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">Date registered</th>
                        <th className="px-4 md:px-6 py-4 text-center whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <span className="block text-base font-black text-slate-900">{user.name || "Unnamed"}</span>
                            <span className="block text-xs text-slate-500 font-medium">{user.email}</span>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                              user.role === "SUPER_ADMIN"
                                ? "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm"
                                : user.role === "ADMIN"
                                ? "bg-purple-50 text-purple-700 border border-purple-200 shadow-sm"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 text-xs text-slate-600 font-bold whitespace-nowrap">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 md:px-6 py-4 text-center whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border-none bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: API KEYS CONSOLE */}
          {activeTab === "api-keys" && (
            <div className="space-y-6 text-left animate-in fade-in duration-200">
              <AdminApiKeysPanel />
            </div>
          )}

          {/* TAB 3: FINANCIAL & PAYMENTS GATEWAY */}
          {activeTab === "payments" && (
            <div className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-200 text-left">
              {/* Stripe Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">Stripe Gateway</h3>
                      <span className="text-xs text-slate-500 font-medium">Standard card checkout payments</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Stripe Public Key</label>
                  <input
                    type="text"
                    value="pk_test_51Mz2allAiSecretPublicKeyExample12345"
                    disabled
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold text-slate-600"
                  />
                </div>
              </div>

              {/* PayPal Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">PayPal Gateway</h3>
                      <span className="text-xs text-slate-500 font-medium">Alternative checkout payments</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    Configured
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">PayPal Client ID</label>
                  <input
                    type="text"
                    value="Af_2allAiPayPalClientIdMockExample998877"
                    disabled
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold text-slate-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM TELEMETRY OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200 text-left">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Accounts", value: users.length, icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
                  { label: "Active Domains", value: projects.length, icon: Globe, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                  { label: "Admin Staff", value: users.filter(u => u.role === "ADMIN" || u.role === "SUPER_ADMIN").length, icon: Award, color: "text-purple-600 bg-purple-50 border-purple-100" },
                  { label: "Virtual Trial Yield", value: `$${users.length * 49}`, icon: DollarSign, color: "text-amber-600 bg-amber-50 border-amber-100" },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{card.label}</span>
                        <span className="block text-2xl font-black text-slate-900 tracking-tight leading-none">{card.value}</span>
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.color}`}>
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        {/* MODAL: CREATE ADMIN ACCOUNT - CRISP WHITE & BLUE ACCENTS */}
        {isCreateAdminModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <UserCog className="w-4.5 h-4.5 text-blue-600" /> Create New Admin Account
                </h3>
                <button
                  onClick={() => setIsCreateAdminModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer border-none bg-transparent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAdminSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Harrison"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="admin.alex@2all.ai"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Assigned Security Role</label>
                  <select
                    value={newAdminRole}
                    onChange={(e) => setNewAdminRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
                  >
                    <option value="ADMIN">ADMIN (Operations & Content)</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Master Platform Access)</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateAdminModalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border-none transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingAdmin}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {creatingAdmin ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Admin Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
