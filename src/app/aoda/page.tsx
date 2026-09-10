"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

export default function AodaCompliancePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "AODA (Ontario, Canada)" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            Canada • Ontario Provincial Mandate
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            AODA Compliance <span className="text-[#C8FF4D]">for Canadian Websites</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Meet the requirements of the Accessibility for Ontarians with Disabilities Act and protect against fines up to $100,000 per day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/register"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Get AODA Compliant
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Free AODA Scan
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Key Requirements</span>
            <h2 className="text-3xl font-black text-slate-900">AODA Digital Mandate Summary</h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">Who Must Comply?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">All public sector organizations, plus private and non-profit organizations with 50+ employees in Ontario.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">Technical Standard</h4>
              <p className="text-xs text-slate-600 leading-relaxed">WCAG 2.0 Level AA conformance across all public-facing web content, web applications, and digital documents.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">Compliance Reporting</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Organizations must file periodic Accessibility Compliance Reports with the Ontario Ministry for Seniors and Accessibility.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
