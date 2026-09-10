"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

export default function WcagGuidelinesPage() {
  const principles = [
    { title: "1. Perceivable", desc: "Information and user interface components must be presentable to users in ways they can perceive (e.g., text alternatives, captions, adaptable layouts, high contrast)." },
    { title: "2. Operable", desc: "User interface components and navigation must be operable (e.g., keyboard accessible, enough time, no seizure triggers, navigable headings)." },
    { title: "3. Understandable", desc: "Information and the operation of user interface must be understandable (e.g., readable language, predictable behavior, input assistance and error handling)." },
    { title: "4. Robust", desc: "Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies like screen readers." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "WCAG 2.1 & 2.2 Guidelines" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            W3C Web Accessibility Standard
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            WCAG 2.1 &amp; 2.2 <span className="text-[#C8FF4D]">Level AA Guidelines</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            The definitive global standard for digital accessibility. Learn the 4 core principles (POUR) and achieve Level AA conformance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/wcag-checklist"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Interactive WCAG Checklist
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Test WCAG Conformance
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">The 4 Principles</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Understanding POUR</h2>
            <p className="text-slate-500 text-sm md:text-base">Every WCAG success criterion is organized under four foundational pillars.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((p, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-3">
                <h3 className="text-xl font-black text-slate-900">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
