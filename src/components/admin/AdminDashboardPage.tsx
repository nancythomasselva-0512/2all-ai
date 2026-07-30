"use client";

import { Users, Globe, Award, DollarSign, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  user: { name: string | null; email: string | null } | null;
}

interface Props {
  users?: UserType[];
  projects?: ProjectType[];
}

export default function AdminDashboardPage({ users = [], projects = [] }: Props) {
  const statCards = [
    { label: "Total Accounts", value: users.length, icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Active Domains", value: projects.length, icon: Globe, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Sandbox Licenses", value: users.filter(u => u.role === "ADMIN").length + projects.length, icon: Award, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Virtual Trial Yield", value: `$${users.length * 49}`, icon: DollarSign, color: "text-amber-600 bg-amber-50 border-amber-100" },
  ];

  // Build simple monthly chart data from user join dates
  const monthlyMap: Record<string, { installs: number; scans: number }> = {};
  users.forEach(u => {
    const month = new Date(u.createdAt).toLocaleString("default", { month: "short" });
    if (!monthlyMap[month]) monthlyMap[month] = { installs: 0, scans: 0 };
    monthlyMap[month].installs += 1;
  });
  projects.forEach(p => {
    const month = new Date(p.createdAt).toLocaleString("default", { month: "short" });
    if (!monthlyMap[month]) monthlyMap[month] = { installs: 0, scans: 0 };
    monthlyMap[month].scans += 1;
  });
  const chartData = Object.entries(monthlyMap).map(([name, v]) => ({ name, ...v }));
  const displayChart = chartData.length > 0 ? chartData : [
    { name: "Jan", installs: 0, scans: 0 },
    { name: "Feb", installs: 0, scans: 0 },
    { name: "Mar", installs: 0, scans: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{card.label}</span>
                <span className="block text-2xl font-black text-slate-800 tracking-tight leading-none">{card.value}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.color}`}>
                <Icon className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Recent Registrations */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase">Recent Registrations</h3>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-xs font-medium text-slate-600">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200/60">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left whitespace-nowrap">User</th>
                  <th className="px-4 md:px-6 py-3 text-left whitespace-nowrap">Role</th>
                  <th className="px-4 md:px-6 py-3 text-left whitespace-nowrap">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.slice(0, 5).map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 md:px-6 py-3.5 whitespace-nowrap">
                      <span className="block font-black text-slate-800">{user.name || "Unnamed"}</span>
                      <span className="block text-[10px] text-slate-400 font-bold">{user.email}</span>
                    </td>
                    <td className="px-4 md:px-6 py-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider ${user.role === "ADMIN" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-blue-50 text-blue-600 border border-blue-100"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3.5 text-slate-400 font-bold whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-400 font-bold">No users yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Projects */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase">Active Projects</h3>
            <Globe className="w-4 h-4 text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] text-xs font-medium text-slate-600">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200/60">
                <tr>
                  <th className="px-6 py-3 text-left">Domain</th>
                  <th className="px-6 py-3 text-left">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="block font-black text-slate-800">{project.name}</span>
                      <span className="block text-[9px] text-slate-400 font-bold truncate max-w-[150px]">{project.url}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="block text-[11px] font-black text-slate-700">{project.user?.name || "Unnamed"}</span>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-slate-400 font-bold">No projects yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Bar Chart */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h3 className="mb-4 text-xs font-black text-slate-800 tracking-wider uppercase">Registrations vs. Active Projects (by Month)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={displayChart}>
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="installs" fill="#2563eb" name="Users" radius={[4, 4, 0, 0]} />
            <Bar dataKey="scans" fill="#10b981" name="Projects" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
