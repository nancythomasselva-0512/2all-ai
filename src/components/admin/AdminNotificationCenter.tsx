"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  BellIcon as Bell,
  BellAlertIcon as BellRing,
  CheckCircleIcon as CheckCircle2,
  ClockIcon as Clock,
  CalendarDaysIcon as Calendar,
  UserPlusIcon as UserPlus,
  CreditCardIcon as CreditCard,
  GlobeAltIcon as Globe,
  MagnifyingGlassIcon as Search,
  FunnelIcon as Filter,
  CheckIcon as Check,
  ArrowPathIcon as RotateCcw,
  SparklesIcon as Sparkles,
  ArrowTopRightOnSquareIcon as ExternalLink,
  BoltIcon as Zap,
  TrophyIcon as Crown,
  ShieldCheckIcon as ShieldCheck,
  VideoCameraIcon as Video,
  EnvelopeIcon as Mail,
  PhoneIcon as Phone,
  UserIcon as User,
  AdjustmentsHorizontalIcon as SlidersHorizontal,
  InboxIcon as Inbox
} from "@heroicons/react/24/solid";
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
  markAllRead?: boolean;
  onToggleMarkAllRead?: (read?: boolean) => void;
}

export default function AdminNotificationCenter({ 
  users = [], 
  projects = [],
  markAllRead: controlledMarkAllRead,
  onToggleMarkAllRead
}: Props) {
  const [filterCategory, setFilterCategory] = useState<"ALL" | "DEMO" | "SIGNUPS" | "PAYMENTS" | "PROJECTS">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [localMarkAllRead, setLocalMarkAllRead] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const markAllRead = controlledMarkAllRead !== undefined ? controlledMarkAllRead : localMarkAllRead;

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (e) {
      console.error("Failed to load notifications:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleToggleMarkRead = async () => {
    const nextVal = !markAllRead;
    setLocalMarkAllRead(nextVal);
    if (onToggleMarkAllRead) {
      onToggleMarkAllRead(nextVal);
    }
    try {
      await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: nextVal }),
      });
      fetchNotifications();
    } catch (e) {
      console.error("Failed to update notification read status:", e);
    }
  };

  // REAL INCOMING NOTIFICATIONS LIST ONLY
  const systemNotifications = useMemo(() => {
    return notifications.map((n) => {
      const isUnread = markAllRead ? false : !n.read;
      const badgeBg =
        n.type === "PAYMENT"
          ? "bg-purple-100 text-purple-700 border-purple-200"
          : n.type === "DEMO"
          ? "bg-amber-100 text-amber-700 border-amber-200"
          : n.type === "PROJECT"
          ? "bg-cyan-100 text-cyan-700 border-cyan-200"
          : "bg-blue-100 text-blue-700 border-blue-200";

      const icon =
        n.type === "PAYMENT"
          ? Crown
          : n.type === "DEMO"
          ? Calendar
          : n.type === "PROJECT"
          ? Globe
          : UserPlus;

      return {
        ...n,
        unread: isUnread,
        badgeBg,
        icon,
      };
    });
  }, [notifications, markAllRead]);

  // FILTERED NOTIFICATIONS LIST
  const filteredNotifications = useMemo(() => {
    return systemNotifications.filter((n) => {
      if (filterCategory === "DEMO" && n.type !== "DEMO") return false;
      if (filterCategory === "SIGNUPS" && n.type !== "SIGNUP") return false;
      if (filterCategory === "PAYMENTS" && n.type !== "PAYMENT") return false;
      if (filterCategory === "PROJECTS" && n.type !== "PROJECT") return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = n.title?.toLowerCase().includes(q) ?? false;
        const matchDesc = n.description?.toLowerCase().includes(q) ?? false;
        const matchEmail = n.user?.email?.toLowerCase().includes(q) ?? false;
        const matchName = n.user?.name?.toLowerCase().includes(q) ?? false;
        const matchPhone = n.user?.phone?.toLowerCase().includes(q) ?? false;
        const matchUrl = n.url?.toLowerCase().includes(q) ?? false;
        const matchCategory = n.category?.toLowerCase().includes(q) ?? false;
        const matchType = n.type?.toLowerCase().includes(q) ?? false;
        if (
          !matchTitle &&
          !matchDesc &&
          !matchEmail &&
          !matchName &&
          !matchPhone &&
          !matchUrl &&
          !matchCategory &&
          !matchType
        ) {
          return false;
        }
      }

      return true;
    });
  }, [systemNotifications, filterCategory, searchQuery]);

  const totalUnreadCount = markAllRead ? 0 : filteredNotifications.filter((n) => n.unread).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left super-admin-typography bg-slate-50/50 p-2 sm:p-4 pb-6 rounded-3xl">

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
                onClick={handleToggleMarkRead}
                suppressHydrationWarning
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-2xl border border-slate-700 shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span suppressHydrationWarning>
                  {markAllRead ? "Mark as Unread" : "Mark All as Read"}
                </span>
              </button>
            </div>
          </div>

          {/* CATEGORY TAB FILTERS BAR */}
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-slate-700/80 shadow-xl overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 flex-nowrap overflow-x-hidden">
              
              {/* Category Pills (Strictly in one straight row, no wrapping, no scrollbar) */}
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 flex-nowrap">
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
                      className={`px-2 sm:px-2.5 lg:px-3 py-1.5 text-[11px] sm:text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 border whitespace-nowrap shrink-0 select-none ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 border-blue-400"
                          : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border-slate-700"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar (Straight row alignment on the right) */}
              <div className="relative min-w-[130px] max-w-[220px] flex-1 shrink">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-7 py-1.5 text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
                />
                {searchQuery.trim() !== "" && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-black cursor-pointer bg-transparent border-none p-0.5"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
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
          <AdminDemoRequestsManager searchQuery={searchQuery} />
        </div>
      )}

      {/* SECTION 2: REAL-TIME SYSTEM ACTIVITY & TELEMETRY FEEDS */}
      {(filterCategory === "ALL" || filterCategory === "DEMO" || filterCategory === "SIGNUPS" || filterCategory === "PAYMENTS" || filterCategory === "PROJECTS") && (
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
                          <Clock className="w-3 h-3 text-slate-400" /> {new Date(item.timestamp).toLocaleString("en-US")}
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
