"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Scale, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LawsuitGuidePage() {
  const steps = [
    { title: "1. Stay Calm & Engage Legal Counsel", desc: "Do not ignore the lawsuit summons or try to contact the plaintiff attorney directly without counsel." },
    { title: "2. Perform an Immediate Accessibility Scan", desc: "Scan your site using 2all.ai to identify and catalog the specific barriers cited in the complaint." },
    { title: "3. Deploy 2all.ai Automated Remediation", desc: "Installing the 2all.ai widget remediates over 80% of cited violations immediately, demonstrating active good-faith remediation." },
    { title: "4. Document Remediation Efforts", desc: "Export automated scan logs, accessibility statement, and VPAT conformance documentation for court presentation." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "ADA Lawsuit Defense Guide" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            Legal Risk Mitigation
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            ADA Website <span className="text-[#C8FF4D]">Lawsuit Defense</span> Guide
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            What to do if your business is sued under ADA Title III or California Unruh Civil Rights Act for digital accessibility barriers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/litigation-support"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Get Litigation Support
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Scan Your Vulnerability
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Action Plan</span>
            <h2 className="text-3xl font-black text-slate-900">4 Critical Steps to Respond to a Lawsuit</h2>
          </div>

          <div className="space-y-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">{idx + 1}</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
