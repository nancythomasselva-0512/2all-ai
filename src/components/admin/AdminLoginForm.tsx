"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Lock, Mail, Loader2, Shield, ShieldAlert, Crown, UserCheck } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function AdminLoginForm({ errorMsg }: { errorMsg?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorMsg || "");
  const [loading, setLoading] = useState(false);

  const handleFillAdmin = () => {
    setEmail("aiadmin@gmail.com");
    setPassword("admin123");
    setError("");
  };

  const handleFillSuperAdminManager = () => {
    setEmail("2allaimanager@gmail.com");
    setPassword("superadmin123");
    setError("");
  };

  const handleFillSuperAdmin = () => {
    setEmail("superadmin@gmail.com");
    setPassword("superadmin123");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cleanEmail = email.trim().toLowerCase();

      // Sign out any existing session first
      await signOut({ redirect: false });

      // Authenticate with NextAuth credentials provider
      const res = await signIn("credentials", {
        email: cleanEmail,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please verify your email and password.");
        setLoading(false);
        return;
      }

      // Query session to determine user's role
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const userRole = (sessionData?.user?.role || "").toUpperCase();

      // Role-Based Dynamic Routing
      if (userRole === "SUPER_ADMIN") {
        window.location.href = "/super-admin/dashboard";
      } else if (userRole === "ADMIN") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Login authentication error:", err);
      setError("An unexpected error occurred during authentication.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left">
      {/* Title Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-6 select-none">
        <Logo height={50} className="self-center" />
        
        <div className="flex items-center gap-2 mt-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-full shadow-xs">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-black text-blue-700 uppercase tracking-wider">EXECUTIVE ACCESS PORTAL</span>
        </div>

        <p className="text-xs text-slate-500 font-semibold mt-1">
          Role-Based Access for Administrators &amp; Super Administrators
        </p>
      </div>

      {/* Quick Fill Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
        <button
          type="button"
          onClick={handleFillAdmin}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-xs"
        >
          <UserCheck className="w-3.5 h-3.5" />
          Admin (aiadmin@)
        </button>
        <button
          type="button"
          onClick={handleFillSuperAdminManager}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-xs"
        >
          <Crown className="w-3.5 h-3.5" />
          Super Admin (2allaimanager@)
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold leading-relaxed flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Executive Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="email"
              placeholder="2allaimanager@gmail.com / aiadmin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className="w-full bg-slate-50 border border-slate-200/90 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all font-sans"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full bg-slate-50 border border-slate-200/90 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all font-sans"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:bg-blue-400 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer border-none uppercase tracking-wider font-sans"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Authenticating Executive Role...
            </>
          ) : (
            "Authenticate & Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
