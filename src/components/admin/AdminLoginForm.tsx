"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Lock, Mail, Loader2, Key, Shield, ShieldAlert } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function AdminLoginForm({ errorMsg }: { errorMsg?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorMsg || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Sign out any existing session first (customer etc.)
      await signOut({ redirect: false });

      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Full page reload so server reads the new admin session cookie
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left">

      {/* Title Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-6 select-none">
        <Logo height={50} className="self-center" />
        <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-black text-blue-700 uppercase tracking-wider">ADMIN EXECUTIVE PORTAL</span>
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
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Admin Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
              Authenticating Executive Access...
            </>
          ) : (
            "AUTHENTICATE ADMIN"
          )}
        </button>

      </form>
    </div>
  );
}
