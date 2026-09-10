"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Cpu, ShieldCheck, ArrowRight, Layers } from "lucide-react";

export default function PlatformPartnersPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Partners", href: "/agency" }, { label: "Platform Partners" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            SaaS • CMS • Hosting • E-commerce Platforms
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            2all.ai <span className="text-[#C8FF4D]">Platform &amp; Tech</span> Ecosystem
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Integrate native accessibility remediation directly into your website builder, hosting dashboard, or SaaS ecosystem via our REST API.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/contact-us"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Contact Technology Partnerships
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-3xl font-black text-slate-900">Native Platform Integration Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">White-Label API Provisioning</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Programmatically provision accessibility licenses and API keys for thousands of tenant websites with one webhook call.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900">Co-Branded User Experience</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Offer 2all.ai accessibility suites inside your app store or control panel with custom revenue-sharing models.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
