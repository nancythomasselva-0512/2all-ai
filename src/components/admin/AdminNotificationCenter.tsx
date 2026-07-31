"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bell,
  BellRing,
  CheckCircle2,
  Clock,
  Calendar,
  UserPlus,
  CreditCard,
  Globe,
  Search,
  Filter,
  Check,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Zap,
  Crown,
  ShieldCheck,
  Video,
  Mail,
  Phone,
  User,
  SlidersHorizontal,
  Inbox
} from "lucide-react";
import AdminDemoRequestsManager from "./AdminDemoRequestsManager";

interface UserType {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  plan?: string | null;
  paymentStatus?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt?: string;
}

interface ProjectType {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  user?: { name: string | null; email: string | null } | null;
}

interface Props {
  users?: UserType[];
  projects?: ProjectType[];
}

export default function AdminNotificationCenter({ users = [], projects = [] }: Props) {
  const [filterCategory, setFilterCategory] = useState<"ALL" | "DEMO" | "SIGNUPS" | "PAYMENTS" | "PROJECTS">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [markAllRead, setMarkAllRead] = useState(false);

  // CONSTRUCT UNIFIED REAL-TIME NOTIFICATIONS FEED FROM DATABASE RECORDS
  const systemNotifications = useMemo(() => {
    const list: any[] = [];

    // 1. User Signup Notifications
    users.forEach((u) => {
      const planUpper = (u.plan || "FREE").toUpperCase();
      const isPaid = u.paymentStatus === "PAID" || planUpper === "PRO" || planUpper === "ENTERPRISE";
      
      list.push({
        id: `user-${u.id}`,
        type: isPaid ? "PAYMENT" : "SIGNUP",
        category: "User Registration",
        title: isPaid ? `New Paid Subscription: ${planUpper} Plan` : `New User Signup: ${u.name || "Customer"}`,
        description: `Account created for ${u.email} on ${planUpper} plan. Status: ${isPaid ? "PAID" : "Active Free Tier"}.`,
        user: { name: u.name, email: u.email, phone: u.phone },
        plan: planUpper,
        timestamp: u.createdAt,
        unread: !markAllRead,
        badgeBg: isPaid ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-blue-100 text-blue-700 border-blue-200",
        icon: isPaid ? Crown : UserPlus
      });
    });

    // 2. Project Asset Notifications
    projects.forEach((p) => {
      list.push({
        id: `proj-${p.id}`,
        type: "PROJECT",
        category: "Project Asset",
        title: `New Project Integrated: ${p.name}`,
        description: `Domain URL ${p.url} monitored under account ${p.user?.email || "Unknown"}.`,
        user: p.user,
        url: p.url,
        timestamp: p.createdAt,
        unread: !markAllRead,
        badgeBg: "bg-cyan-100 text-cyan-700 border-cyan-200",
        icon: Globe
      });
    });

    // Sort notifications newest first
    return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [users, projects, markAllRead]);

  // FILTERED NOTIFICATIONS LIST
  const filteredNotifications = useMemo(() => {
    return systemNotifications.filter((n) => {
      if (filterCategory === "SIGNUPS" && n.type !== "SIGNUP") return false;
      if (filterCategory === "PAYMENTS" && n.type !== "PAYMENT") return false;
      if (filterCategory === "PROJECTS" && n.type !== "PROJECT") return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchDesc = n.description.toLowerCase().includes(q);
        const matchEmail = n.user?.email?.toLowerCase().includes(q) ?? false;
        if (!matchTitle && !matchDesc && !matchEmail) return false;
      }

      return true;
    });
  }, [systemNotifications, filterCategory, searchQuery]);

  const totalUnreadCount = markAllRead ? 0 : filteredNotifications.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left font-sans bg-slate-50/50 p-2 sm:p-4 rounded-3xl">

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-xs font-black text-blue-300 border border-blue-400/30 uppercase tracking-widest">
                <BellRing className="w-4 h-4 text-blue-400 animate-pulse" /> Unified Notification Center
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                System Activity & Telemetry Feeds
                {totalUnreadCount > 0 && (
                  <span className="px-3 py-0.5 text-xs font-black rounded-full bg-red-500 text-white shadow-lg shadow-red-500/50 animate-bounce">
                    {totalUnreadCount} Active
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
                Comprehensive real-time notifications for client demo slot bookings, new user registrations, paid subscription purchases, and project domain assets.
              </p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setMarkAllRead(!markAllRead)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-2xl border border-slate-700 shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {markAllRead ? "Mark as Unread" : "Mark All as Read"}
              </button>
            </div>
          </div>

          {/* CATEGORY TAB FILTERS BAR */}
          <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "ALL", label: "All Feeds", icon: Inbox },
                  { id: "DEMO", label: "Demo Bookings", icon: Calendar },
                  { id: "SIGNUPS", label: "User Signups", icon: UserPlus },
                  { id: "PAYMENTS", label: "Payments & Plans", icon: CreditCard },
                  { id: "PROJECTS", label: "Project Assets", icon: Globe },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isActive = filterCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFilterCategory(cat.id as any)}
                      className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-2 border ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 border-blue-400"
                          : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border-slate-700"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: ENTERPRISE DEMO REQUESTS & SLOT MANAGER (WHEN ALL OR DEMO IS SELECTED) */}
      {(filterCategory === "ALL" || filterCategory === "DEMO") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-black text-slate-900 tracking-tight">Enterprise Client Demo & Meeting Slots</h3>
          </div>
          <AdminDemoRequestsManager />
        </div>
      )}

      {/* SECTION 2: REAL-TIME SYSTEM ACTIVITY & TELEMETRY FEEDS */}
      {(filterCategory === "ALL" || filterCategory === "SIGNUPS" || filterCategory === "PAYMENTS" || filterCategory === "PROJECTS") && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Real-Time Telemetry Feed ({filteredNotifications.length})
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Live stream of database telemetry events including registrations, plan subscriptions, and asset monitoring.
              </p>
            </div>
            <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
              {filteredNotifications.length} Events
            </span>
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    item.unread
                      ? "bg-slate-50/80 border-slate-200/90 shadow-sm"
                      : "bg-white border-slate-100 opacity-80"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-3 rounded-2xl shrink-0 ${item.badgeBg}`}>
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-black text-slate-900 tracking-tight">{item.title}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${item.badgeBg}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">{item.description}</p>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" /> {item.user?.name || item.user?.email || "System User"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border border-slate-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Visit Asset
                    </a>
                  )}
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Inbox className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
                <p className="text-sm font-black text-slate-600">No matching notification events found</p>
                <p className="text-xs text-slate-400">Try clearing your search query or selecting another notification category filter.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
