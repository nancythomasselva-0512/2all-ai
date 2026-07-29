"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Lock, Mail, Loader2, Key, Crown, ShieldAlert } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function SuperAdminLoginForm({ errorMsg }: { errorMsg?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorMsg || "");
  const [loading, setLoading] = useState(false);

  const handleAutoFill = () => {
    setEmail("superadmin@gmail.com");
    setPassword("superadmin123");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your Super Admin credentials.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. First ensure Super Admin account exists via bootstrap check
      await fetch("/api/admin/bootstrap-superadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      // 2. Sign out any existing session
      await signOut({ redirect: false });

      // 3. Authenticate with NextAuth credentials provider
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Super Admin credentials. Please try again.");
      } else {
        // Full page reload so server reads new super admin session cookie
        window.location.href = "/super-admin/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left">
      {/* Title Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-6 select-none">
        <Logo height={50} className="self-center" />
        <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full">
          <Crown className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Super Admin Executive Portal</span>
        </div>
        <p className="text-xs text-slate-500 font-semibold mt-1">Master Access &amp; Executive Platform Controls</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold leading-relaxed flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Super Admin Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="superadmin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Master Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer border-none uppercase tracking-wider"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Authenticating Executive Access...
            </>
          ) : (
            "Authenticate Super Admin"
          )}
        </button>
      </form>

      {/* Auto-fill Helper */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-left">
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <Key className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="block text-[9px] font-black text-amber-700 uppercase tracking-wider">Super Admin Credentials</span>
              <p className="text-[10px] text-slate-700 font-bold leading-normal">
                Email: <span className="text-slate-900 select-all font-mono">superadmin@gmail.com</span> <br />
                Password: <span className="text-slate-900 select-all font-mono">superadmin123</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleAutoFill}
            className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] rounded-xl border-none transition-all cursor-pointer uppercase tracking-wider select-none focus:outline-none shadow-sm"
          >
            One-Click Auto Fill Super Admin
          </button>
        </div>
      </div>
    </div>
  );
}
