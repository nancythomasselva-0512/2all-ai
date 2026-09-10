"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Mail, AlertCircle, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DemandLetterGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "Demand Letter Guide" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            Pre-Litigation Resolution
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            How to Handle an <span className="text-[#C8FF4D]">ADA Demand Letter</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Received an accessibility demand letter threatening legal action? Here is a practical roadmap to remediate fast and settle favorably.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/litigation-support"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Get Legal Remediation Pack
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Run Instant Audit
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Demand Letter Playbook</span>
            <h2 className="text-3xl font-black text-slate-900">Immediate Action Checklist</h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">1. Note the Deadline</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Most demand letters specify a 14–30 day response window. Timely remediation prevents formal court filing.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">2. Deploy Instant AI Remediation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Installing 2all.ai immediately remediates the specific keyboard, contrast, and label issues cited in the letter.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">3. Provide Proof of Good-Faith Remediation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Export timestamped scan audits, accessibility statement, and roadmaps to demonstrate compliance to the plaintiff attorney.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
