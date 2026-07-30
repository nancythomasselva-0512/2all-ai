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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: "Message: " + formData.message,
          website: formData.siteUrl || "Not specified"
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", siteUrl: "", message: "" });
      }
    } catch (err) {
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-6 pb-10 md:pb-14 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
          <div className="flex justify-start text-left mb-2">
            <Breadcrumbs 
              theme="dark" 
              items={[ { label: "Home", href: "/" }, { label: "Contact Us" } ]} 
            />
          </div>
          
          <div className="max-w-3xl mx-auto text-center space-y-3 pt-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300">CONTACT 2ALL.AI</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-center text-white">
              Get in <span className="text-[#C8FF4D]">Touch</span>
            </h1>
            
            <p className="text-slate-200 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed text-center">
              Have questions about compliance, billing, integration, or custom audits? Speak with our team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SPLIT CONTACT CONTENT */}
      <section className="py-16 md:py-24 px-6 sm:px-12 md:px-16 lg:px-20 bg-white font-sans">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Info cards (left 5 columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold tracking-widest text-[#004bff] uppercase">CONTACT CHANNELS</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">We're here to help</h2>
              <p className="text-slate-600 text-xs md:text-sm font-normal leading-relaxed">
                Connect with our compliance advocates or reach out to developer support directly.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Email Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:border-blue-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004bff] border border-blue-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Email Contacts</h4>
                  <div className="text-[13px] text-slate-600 font-medium space-y-0.5">
                    <p>Sales: <a href="mailto:sales@2all.ai" className="text-[#004bff] hover:underline font-semibold">sales@2all.ai</a></p>
                    <p>Support: <a href="mailto:support@2all.ai" className="text-[#004bff] hover:underline font-semibold">support@2all.ai</a></p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:border-blue-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004bff] border border-blue-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Office Location</h4>
                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                    100 Pine Street, Suite 1250,<br />San Francisco, CA 94111
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:border-blue-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004bff] border border-blue-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Call Channels</h4>
                  <p className="text-[13px] text-slate-600 font-medium">
                    Toll-free: <a href="tel:+18005550199" className="text-slate-900 font-semibold hover:text-[#004bff] transition-colors">+1 (800) 555-0199</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form (right 7 columns) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-[28px] p-6 sm:p-8 md:p-10 shadow-sm text-left font-sans">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug border-b border-slate-200/80 pb-4 mb-6 uppercase tracking-wider text-xs">
              Submit Message
            </h3>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Message Transmitted</h4>
                <p className="text-slate-600 text-xs md:text-sm max-w-sm mx-auto leading-relaxed font-normal">
                  Thank you for reaching out. A compliance specialist will review your request and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#004bff] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer border-none shadow-md shadow-blue-500/20"
                >
                  New Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider px-1 block">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-slate-200/90 rounded-xl py-2.5 px-3.5 text-xs md:text-sm font-medium outline-none focus:border-[#004bff] focus:ring-1 focus:ring-[#004bff]/20 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider px-1 block">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-white border border-slate-200/90 rounded-xl py-2.5 px-3.5 text-xs md:text-sm font-medium outline-none focus:border-[#004bff] focus:ring-1 focus:ring-[#004bff]/20 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider px-1 block">Website URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.siteUrl}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    placeholder="https://company.com"
                    className="w-full bg-white border border-slate-200/90 rounded-xl py-2.5 px-3.5 text-xs md:text-sm font-medium outline-none focus:border-[#004bff] focus:ring-1 focus:ring-[#004bff]/20 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider px-1 block">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry..."
                    className="w-full bg-white border border-slate-200/90 rounded-xl py-2.5 px-3.5 text-xs md:text-sm font-medium outline-none focus:border-[#004bff] focus:ring-1 focus:ring-[#004bff]/20 transition-all shadow-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3.5 bg-[#004bff] hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 tracking-wider uppercase transition-all shadow-md cursor-pointer border-none shadow-blue-500/20"
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
