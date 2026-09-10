"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Scale, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, FileText } from "lucide-react";

export default function AdaCompliancePage() {
  const pillars = [
    {
      title: "Title III of the ADA",
      desc: "Applies to private businesses deemed places of 'public accommodation.' U.S. Federal Courts and DOJ explicitly include websites, online ordering, and web portals under Title III.",
      badge: "Public Accommodation"
    },
    {
      title: "WCAG 2.1 AA Technical Benchmark",
      desc: "While the ADA statute itself does not name a technical standard, courts consistently point to WCAG 2.1 Level AA as the legal measure of adequate accessibility.",
      badge: "Court Standard"
    },
    {
      title: "Immediate Civil Risk Shield",
      desc: "Inaccessibility can lead to demand letters and lawsuits costing $20,000–$100,000+ in plaintiff legal fees. 2all.ai remediates 80%+ of barriers automatically.",
      badge: "Lawsuit Protection"
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
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "ADA Compliance" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            Americans with Disabilities Act (Title III)
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Complete Guide to <span className="text-[#C8FF4D]">ADA Web Compliance</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Understand your legal responsibilities under U.S. law, avoid predatory litigation, and ensure equal digital access for 60+ million Americans with disabilities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/ada-checklist"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              View 25-Point ADA Checklist
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Test Your Site for ADA Violations
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Legal Foundations</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">What Every Business Needs to Know About the ADA</h2>
            <p className="text-slate-500 text-sm md:text-base">Web accessibility lawsuits grew by over 300% in recent years. Understanding the law is your first line of defense.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md uppercase tracking-wider">{p.badge}</span>
                  <h3 className="text-xl font-black text-slate-900">{p.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black">Is Your Website ADA Compliant?</h2>
          <p className="text-blue-100 text-sm">Run our instant free audit to check for high-risk ADA Title III violations in 30 seconds.</p>
          <Link
            href="/access-scan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-sm rounded-xl shadow-lg uppercase tracking-wider"
          >
            Run Free ADA Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
