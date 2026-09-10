"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Handshake, Award, Users, ArrowRight, DollarSign } from "lucide-react";

export default function PartnersPortalPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Partners", href: "/agency" }, { label: "Partner Portal" }]}
          />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            2all.ai <span className="text-[#C8FF4D]">Global Partner</span> Network
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Collaborate with the leading automated accessibility provider. Partner programs designed for digital agencies, consultants, and platforms.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/agency-partners"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Agency Partners
            </Link>
            <Link
              href="/platform-partners"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Technology &amp; SaaS Partners
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-black text-slate-900">Partner Program Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <h4 className="font-extrabold text-slate-900">Recurring Commissions</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Earn 20% recurring monthly revenue share across all active client accounts.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <Award className="w-8 h-8 text-blue-600" />
              <h4 className="font-extrabold text-slate-900">Certified Agency Badge</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Showcase your verified 2all.ai Accessibility Partner certification on your agency website.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <Users className="w-8 h-8 text-blue-600" />
              <h4 className="font-extrabold text-slate-900">Co-Marketing &amp; Leads</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Receive qualified inbound accessibility remediation leads directly from our sales team.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
