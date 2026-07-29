"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, Mail, Phone, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
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

  const benefits = [
    { title: "Live Product Walkthrough", desc: "See exactly how our automated accessibility widget and compliance scanning tools work.", icon: Sparkles },
    { title: "Compliance Report Audit", desc: "Get an initial review of your website's accessibility barriers under WCAG & ADA standards.", icon: ShieldCheck },
    { title: "Tailored Pricing Strategy", desc: "Discuss custom license options, bulk setups, and manual audits with our sales team.", icon: Calendar }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-6 pb-8 md:pb-10 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="flex justify-start text-left mb-2">
            <Breadcrumbs 
              theme="dark" 
              items={[ { label: "Home", href: "/" }, { label: "Book a Demo" } ]} 
            />
          </div>
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-center">
              Schedule a <span className="text-[#C8FF4D]">Demo</span>
            </h1>
            
            <p className="text-slate-200 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed text-center">
              Let our compliance experts show you how to automate your web accessibility, protect your site, and conform to regulations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT */}
      <section className="py-10 md:py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Benefits (5 columns) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Consultation</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">What to expect</h2>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                Connect with our team to customize an accessibility roadmap for your digital presence.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 leading-snug">{b.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 font-normal mt-1 leading-relaxed max-w-md">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Demo Form (7 columns) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 md:p-10 shadow-sm text-left">
            <h3 className="text-md font-black text-slate-900 tracking-tight leading-snug border-b border-slate-200/80 pb-4 mb-6">
              Demo Request Details
            </h3>

            {success ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-black text-slate-900">Demo Scheduled!</h4>
                <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you! We've received your request and will reach out to you within 24 business hours to coordinate.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer border-none shadow-md shadow-blue-500/20"
                >
                  Schedule Another Demo
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Prefix</label>
                    <div className="relative">
                      <select
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner appearance-none cursor-pointer text-slate-800"
                      >
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (US / Canada)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (Australia)</option>
                        <option value="+49">+49 (Germany)</option>
                        <option value="+33">+33 (France)</option>
                        <option value="+81">+81 (Japan)</option>
                        <option value="+86">+86 (China)</option>
                        <option value="+971">+971 (UAE)</option>
                        <option value="+65">+65 (Singapore)</option>
                        <option value="+55">+55 (Brazil)</option>
                        <option value="+27">+27 (South Africa)</option>
                        <option value="+82">+82 (South Korea)</option>
                        <option value="+34">+34 (Spain)</option>
                        <option value="+39">+39 (Italy)</option>
                        <option value="+7">+7 (Russia)</option>
                        <option value="+52">+52 (Mexico)</option>
                        <option value="+64">+64 (New Zealand)</option>
                        <option value="+31">+31 (Netherlands)</option>
                        <option value="+41">+41 (Switzerland)</option>
                        <option value="+46">+46 (Sweden)</option>
                        <option value="+47">+47 (Norway)</option>
                        <option value="+48">+48 (Poland)</option>
                        <option value="+90">+90 (Turkey)</option>
                        <option value="+62">+62 (Indonesia)</option>
                        <option value="+63">+63 (Philippines)</option>
                        <option value="+60">+60 (Malaysia)</option>
                        <option value="+84">+84 (Vietnam)</option>
                        <option value="+92">+92 (Pakistan)</option>
                        <option value="+880">+880 (Bangladesh)</option>
                        <option value="+20">+20 (Egypt)</option>
                        <option value="+234">+234 (Nigeria)</option>
                        <option value="+254">+254 (Kenya)</option>
                        <option value="+54">+54 (Argentina)</option>
                        <option value="+966">+966 (Saudi Arabia)</option>
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Website URL *</label>
                  <input
                    required
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.com"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 tracking-wider uppercase transition-all shadow-md cursor-pointer border-none shadow-blue-500/20"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
