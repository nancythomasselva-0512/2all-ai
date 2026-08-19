"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  HelpCircle,
  ChevronDown,
  LayoutDashboard,
  Globe,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  FileText,
  MessageSquare,
  Mail,
  Check,
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Logo from "@/components/ui/Logo";
import DemoModal from "@/components/marketing/DemoModal";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    plan?: string | null;
    paymentStatus?: string | null;
    createdAt?: string | null;
    role?: string | null;
  };
}

export default function DashboardHeader({ user }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [contactSalesOpen, setContactSalesOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const pathname = usePathname();
  const firstName = user?.name?.split(" ")[0] ?? "Zubairya";

  // Calculate Plan Expiration Status (7-day trial enforced from user creation)
  const userPlan = (user?.plan || "").toUpperCase();
  const paymentStatus = (user?.paymentStatus || "").toUpperCase();
  const userRole = (user?.role || "").toUpperCase();
  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";
  const isPaid = paymentStatus === "PAID" || ["PRO", "BUSINESS", "ENTERPRISE", "AGENCY"].includes(userPlan) || isAdmin;

  const userCreatedAt = user?.createdAt ? new Date(user.createdAt).getTime() : Date.now();
  const trialDurationMs = 7 * 24 * 60 * 60 * 1000;
  const isTrialExpired = !isPaid && (Date.now() - userCreatedAt > trialDurationMs);
  const isPlanExpired = !isPaid && (isTrialExpired || paymentStatus === "EXPIRED");

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/dashboard/domains", label: "My Domains", icon: Globe },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="sticky top-0 z-30 w-full flex flex-col">
      {/* Top Banner Alert for Expired / Unpaid Plans */}
      {isPlanExpired && (
        <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-4 sm:px-12 py-2 flex items-center justify-between text-xs font-bold shadow-md select-none">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-200 animate-bounce shrink-0" />
            <span>Plan Expired Alert: Your 7-day trial or subscription has ended. Upgrade your plan to reactivate live accessibility suite & compliance widgets.</span>
          </div>
          <Link href="/pricing" className="px-3.5 py-1 bg-white hover:bg-slate-100 text-red-700 font-black rounded-lg text-[10px] uppercase tracking-wider transition-all no-underline shadow-xs shrink-0 ml-4">
            Renew / Upgrade Plan ↗
          </Link>
        </div>
      )}

      <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-12 py-3.5 flex items-center justify-between select-none">

      {/* LEFT: Logo & Main Nav */}
      <div className="flex items-center gap-10">
        <Logo height={36} className="self-center" />

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider transition-colors ${
                  isActive 
                    ? "text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100" 
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        {/* Contact Sales */}
        <button 
          onClick={() => setContactSalesOpen(true)}
          className="hidden sm:inline-flex px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs rounded-full transition-all cursor-pointer border-none shadow-sm"
        >
          Contact Sales
        </button>

        {/* Help Circle Button & Popover */}
        <div className="relative">
          <button 
            onClick={() => {
              setHelpOpen(!helpOpen);
              setNotificationsOpen(false);
              setDropdownOpen(false);
            }}
            className={`p-2 rounded-full transition-colors cursor-pointer border-none bg-transparent ${
              helpOpen ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
            title="Help & Support"
          >
            <HelpCircle className="w-5 h-5 stroke-[2.5]" />
          </button>

          {helpOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setHelpOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left font-sans">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Help & Support</h3>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">2all.ai Support</span>
                </div>
                <div className="space-y-2">
                  <Link 
                    href="/dashboard/install?tab=install"
                    onClick={() => setHelpOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 no-underline"
                  >
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Widget Setup Guide</p>
                      <p className="text-[11px] text-slate-400 font-normal">Step-by-step code snippet installation</p>
                    </div>
                  </Link>

                  <Link 
                    href="/dashboard/install?tab=statement"
                    onClick={() => setHelpOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 no-underline"
                  >
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Accessibility Statement</p>
                      <p className="text-[11px] text-slate-400 font-normal">WCAG 2.2 AA compliance documentation</p>
                    </div>
                  </Link>

                  <a 
                    href="mailto:support@2all.ai"
                    onClick={() => setHelpOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 no-underline"
                  >
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Email Support</p>
                      <p className="text-[11px] text-slate-400 font-normal">support@2all.ai (24hr response)</p>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bell Notifications Button & Popover */}
        <div className="relative">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setHelpOpen(false);
              setDropdownOpen(false);
              setUnreadCount(0);
            }}
            className={`relative p-2 rounded-full transition-colors cursor-pointer border-none bg-transparent ${
              notificationsOpen ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
            title="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[2.5]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            )}
          </button>

          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left font-sans">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Notifications</h3>
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[10px] font-bold text-blue-600 hover:underline border-none bg-transparent cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-3">
                  {isPlanExpired ? (
                    <Link
                      href="/pricing"
                      onClick={() => setNotificationsOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-red-50 border border-red-200/80 no-underline hover:bg-red-100/70 transition-colors"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-red-950">Subscription / Trial Expired</p>
                        <p className="text-[11px] text-red-800 font-normal mt-0.5">Your accessibility plan needs renewal. Click to upgrade & reactivate live widgets.</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100/60">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-blue-950">Free Trial Active</p>
                        <p className="text-[11px] text-blue-800 font-normal mt-0.5">Your 7-day full feature trial is currently active.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">WCAG Audit Scheduled</p>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5">Monthly automated remediation report ready for review.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setHelpOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-50 rounded-full transition-colors cursor-pointer border-none bg-transparent"
          >
            {/* Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold text-sm border border-blue-200">
              {firstName[0]?.toUpperCase()}
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-700">{firstName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
          </button>

          {/* Simple Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>

      </div>

      </header>

      {/* Mobile Nav Row */}
      <nav className="md:hidden flex items-center gap-6 px-4 py-3 bg-slate-50 border-b border-slate-200/80 overflow-x-auto no-scrollbar w-full shadow-inner select-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center gap-1.5 font-extrabold text-[10px] uppercase tracking-wider transition-colors shrink-0 ${
                isActive 
                  ? "text-blue-600" 
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Contact Sales Modal */}
      <DemoModal 
        isOpen={contactSalesOpen}
        onClose={() => setContactSalesOpen(false)}
      />
    </div>
  );
}
