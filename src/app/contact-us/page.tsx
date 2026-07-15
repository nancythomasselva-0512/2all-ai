"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", siteUrl: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", siteUrl: "", message: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Contact Us" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Get in <span className="text-[#C8FF4D]">Touch</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Have questions about compliance, billing, integration, or custom audits? Speak with our team.
          </p>
        </div>
      </section>

      {/* 2. SPLIT CONTACT CONTENT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          {/* Info cards (left 5 columns) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Contact Channels</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">We're here to help</h2>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                Connect with our compliance advocates or reach out to developer support directly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Email Contacts</h4>
                  <p className="text-slate-600 text-xs font-semibold mt-1">Sales: <span className="text-blue-600">sales@2all.ai</span></p>
                  <p className="text-slate-600 text-xs font-semibold">Support: <span className="text-blue-600">support@2all.ai</span></p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Office Location</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    100 Pine Street, Suite 1250,<br />San Francisco, CA 94111
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Call Channels</h4>
                  <p className="text-slate-500 text-xs mt-1 font-semibold">Toll-free: +1 (800) 555-0199</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form (right 7 columns) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 md:p-10 shadow-sm text-left">
            <h3 className="text-md font-black text-slate-900 tracking-tight leading-snug border-b border-slate-200/80 pb-4 mb-6">
              Submit Message
            </h3>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-black text-slate-900">Message Transmitted</h4>
                <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A compliance specialist will review your request and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer border-none shadow-md shadow-blue-500/20"
                >
                  New Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Website URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.siteUrl}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    placeholder="https://company.com"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 tracking-wider uppercase transition-all shadow-md cursor-pointer border-none shadow-blue-500/20"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Send Message
                      </>
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
