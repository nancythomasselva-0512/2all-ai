"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Globe2, ShieldCheck, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function EaaCompliancePage() {
  const eaaPillars = [
    {
      title: "EU Directive 2019/882",
      desc: "Mandates European member states to enforce digital accessibility standards across commercial businesses selling goods, digital services, banking, and travel in the EU."
    },
    {
      title: "Enforcement from June 2025",
      desc: "Applies to all organizations doing business in the EU. Fines and market injunctions apply to non-compliant digital storefronts."
    },
    {
      title: "Harmonized Standard EN 301 549",
      desc: "The European technical standard directly maps to W3C WCAG 2.1 Level AA conformance criteria."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "European Accessibility Act (EAA)" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            European Union • Directive 2019/882
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            European Accessibility Act <span className="text-[#C8FF4D]">(EAA)</span> Compliance
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Ensure your digital platforms, e-commerce stores, and software products conform to European accessibility mandates and EN 301 549 standards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/register"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Prepare for EAA Compliance
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Free EAA Audit Scan
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">EU Mandate</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Who Must Comply with the EAA?</h2>
            <p className="text-slate-500 text-sm md:text-base">The EAA impacts virtually any business offering digital products or services to European consumers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eaaPillars.map((p, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
