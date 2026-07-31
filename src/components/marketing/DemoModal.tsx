"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2, ChevronDown, Calendar, Clock } from "lucide-react";
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
  const [config, setConfig] = useState<any>({
    demoFormTitle: "Schedule an Accessibility Demo",
    demoFormSuccessMsg: "Demo Request Submitted!",
    requirePhoneNumber: true,
    requireWebsiteUrl: true,
    demoButtonText: "SCHEDULE A DEMO",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(true);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("Tomorrow, 10:00 AM");
  const [slotConfirmed, setSlotConfirmed] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/admin/config", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (data) setConfig((prev: any) => ({ ...prev, ...data }));
        })
        .catch(() => {});
    }
  }, [isOpen]);

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
            className="bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-8 pt-8 max-w-md w-full mx-4 relative z-10 text-left select-none max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors border-none cursor-pointer z-20"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {success ? (
              /* Success & Meeting Slot Booking State */
              <div className="flex flex-col items-center justify-center py-4 text-center space-y-4 font-sans">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-md">
                  <CheckCircle2 className="w-8 h-8 stroke-[2]" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">Demo Request Submitted!</h3>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
                    Select your preferred date & time slot for your live 1-on-1 accessibility demonstration below:
                  </p>
                </div>

                {slotConfirmed ? (
                  isSkipped ? (
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-left">
                      <div className="flex items-center gap-2 text-slate-800 font-extrabold text-xs">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Slot Assignment Pending</span>
                      </div>
                      <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed font-medium">
                        Thank you! You skipped instant slot selection. Our enterprise team will review your website and email you 2 proposed meeting times within 24 business hours.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full bg-blue-50 border border-blue-200/80 rounded-2xl p-4 space-y-3 text-left">
                      <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>Meeting Slot Confirmed!</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-blue-100">
                        📅 {selectedDate}
                      </p>
                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=2all.ai+Accessibility+Demo+Session&details=Live+1-on-1+web+accessibility+demo+and+compliance+audit+walkthrough&location=Google+Meet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 text-center text-white no-underline shadow-sm transition-all"
                      >
                        <Calendar className="w-4 h-4 text-white" /> Add to Google Calendar
                      </a>
                    </div>
                  )
                ) : (
                  <div className="w-full space-y-3 text-left">
                    <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider">
                      Select Meeting Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Tomorrow, 10:00 AM",
                        "Tomorrow, 02:00 PM",
                        "Friday, 11:30 AM",
                        "Friday, 04:00 PM"
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedDate(slot)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                            selectedDate === slot
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          📅 {slot}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={slotLoading}
                      onClick={async () => {
                        setSlotLoading(true);
                        try {
                          await fetch("/api/admin/demo", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name: name || "Client", email: email || "client@2all.ai", phone: phoneNumber || "+1", website: website || "https://2all.ai", meetingSlot: selectedDate }),
                          });
                        } catch (e) {}
                        setSlotLoading(false);
                        setSlotConfirmed(true);
                      }}
                      className="w-full py-2.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer border-none uppercase tracking-wider shadow-md mt-2"
                    >
                      {slotLoading ? "Confirming..." : `Confirm Slot (${selectedDate})`}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSkipped(true);
                        setSlotConfirmed(true);
                        setSelectedDate("Skipped (2all.ai Team will assign time)");
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer border-none uppercase tracking-wider"
                    >
                      Skip & Let Team Email Me Proposed Slots
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSuccess(false);
                    setSlotConfirmed(false);
                    onClose();
                  }}
                  className="text-xs text-slate-400 font-bold hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer pt-1"
                >
                  Close Window
                </button>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Header */}
                <div className="pb-1 font-sans">
                  <p className="no-scale font-sans text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {config.demoFormTitle || "Schedule an Accessibility Demo"}
                  </p>
                  <p className="no-scale font-sans text-sm font-medium text-slate-600 mt-1 leading-relaxed">
                    Let our experts walk you through our scanning and alignment features.
                  </p>
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
                <div className="space-y-1 font-sans">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider font-sans">
                    Business Email <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold font-sans"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Phone number {config.requirePhoneNumber !== false && <span className="text-red-500 font-bold">*</span>}
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
                      required={config.requirePhoneNumber !== false}
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
                    Website link {config.requireWebsiteUrl !== false && <span className="text-red-500 font-bold">*</span>}
                  </label>
                  <input
                    type="url"
                    required={config.requireWebsiteUrl !== false}
                    placeholder="https://yourwebsite.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>

                {/* Additional Custom Form Template Fields (Company, Notes, Custom Fields) */}
                {config.formFields && config.formFields
                  .filter((f: any) => f.enabled !== false && !["name", "email", "phone", "website"].includes(f.id))
                  .map((f: any) => (
                    <div key={f.id} className="space-y-1">
                      <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                        {f.label} {f.required && <span className="text-red-500 font-bold">*</span>}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea
                          rows={2}
                          required={f.required}
                          placeholder={f.placeholder || ""}
                          value={customFields[f.id] || ""}
                          onChange={(e) => setCustomFields({ ...customFields, [f.id]: e.target.value })}
                          className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                        />
                      ) : (
                        <input
                          type={f.type || "text"}
                          required={f.required}
                          placeholder={f.placeholder || ""}
                          value={customFields[f.id] || ""}
                          onChange={(e) => setCustomFields({ ...customFields, [f.id]: e.target.value })}
                          className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                        />
                      )}
                    </div>
                  ))}

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
                  {loading ? "Scheduling..." : (config.demoButtonText || "SCHEDULE A DEMO")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
