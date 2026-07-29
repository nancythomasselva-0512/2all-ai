"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRIES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fullPhone = `${phonePrefix} ${phoneNumber}`;
      const res = await fetch("/api/admin/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: fullPhone, website }),
      });

      if (res.ok) {
        setSuccess(true);
        // Clear fields
        setName("");
        setEmail("");
        setPhoneNumber("");
        setWebsite("");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 relative z-10 text-left select-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {success ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-md">
                  <CheckCircle2 className="w-9 h-9 stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">Demo Scheduled!</h3>
                  <p className="text-xs text-slate-400 font-bold max-w-xs leading-relaxed">
                    Thank you! We've received your request and will reach out to you within 24 business hours to coordinate.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Header */}
                <div className="pb-1 font-sans">
                  <p className="no-scale font-sans text-lg font-black text-slate-900 tracking-tight leading-snug">Schedule an Accessibility Demo</p>
                  <p className="no-scale font-sans text-sm font-medium text-slate-600 mt-1 leading-relaxed">Let our experts walk you through our scanning and alignment features.</p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Full name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Business Email <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Phone number <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="flex items-center gap-2 font-sans">
                    {/* Custom Country Code Dropdown */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all cursor-pointer border-none font-sans"
                      >
                        <span className="text-base leading-none">{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                      </button>

                      {countryDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setCountryDropdownOpen(false)} />
                          <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200/90 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-56 overflow-y-auto no-scrollbar font-sans text-left">
                            {COUNTRIES.map((c, idx) => (
                              <button
                                key={`${c.name}-${idx}`}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setPhonePrefix(c.code);
                                  setCountryDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold text-left transition-colors cursor-pointer border-none bg-transparent ${
                                  selectedCountry.name === c.name ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-base leading-none">{c.flag}</span>
                                  <span>{c.name}</span>
                                </div>
                                <span className="text-slate-400 font-normal">{c.code}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      required
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold font-sans"
                    />
                  </div>
                </div>

                {/* Website */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Website link <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>

                {/* Consent checkbox notice ABOVE button */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-2 select-none text-left">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer shrink-0"
                  />
                  <span className="no-scale font-sans text-xs text-slate-600 leading-relaxed font-normal">
                    By clicking Schedule a Demo, you agree to 2all.ai&apos;s{" "}
                    <a href="/terms" target="_blank" className="text-blue-600 underline font-semibold hover:text-blue-700">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" target="_blank" className="text-blue-600 underline font-semibold hover:text-blue-700">
                      privacy notice
                    </a>
                    .
                  </span>
                </label>

                {/* Submit button BELOW notice */}
                <button
                  type="submit"
                  disabled={loading || !agreed}
                  className="w-full py-3.5 mt-2 bg-[#004bff] hover:bg-[#003edd] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 tracking-wider uppercase border-none cursor-pointer flex items-center justify-center gap-2 transition-all"
                >
                  {loading && <Loader2 className="w-4.5 h-4.5 animate-spin" />}
                  {loading ? "Scheduling..." : "SCHEDULE A DEMO"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
