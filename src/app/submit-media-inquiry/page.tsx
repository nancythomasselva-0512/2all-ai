"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Mail, Send, CheckCircle2, Download, Newspaper } from "lucide-react";

export default function SubmitMediaInquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", outlet: "", email: "", deadline: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Company", href: "/about-us" }, { label: "Media & Press Inquiries" }]}
          />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Press &amp; <span className="text-[#C8FF4D]">Media Inquiries</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Journalists, analysts, and content creators can reach the 2all.ai communications team for interviews, quotes, reports, and high-res media kits.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-black text-emerald-900">Inquiry Received</h3>
              <p className="text-xs text-emerald-700">Thank you for contacting 2all.ai communications. A member of our press relations team will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-black text-slate-900">Submit Your Media Request</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Publication / Outlet *</label>
                  <input
                    type="text"
                    required
                    value={formData.outlet}
                    onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="TechCrunch, WSJ, Forbes..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="jane@publication.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Story Deadline</label>
                  <input
                    type="text"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Tomorrow 5 PM EST"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Inquiry Details *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                  placeholder="Please describe your story topic, questions, or interview requests..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all uppercase tracking-wider cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Media Request
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
