"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { ShieldCheck, Lock, Server, FileCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function TrustCenterPage() {
  const securityItems = [
    { title: "Zero PII Data Collection", desc: "2all.ai operates purely client-side for accessibility remediations. We never track, record, or sell personal visitor data or keystrokes." },
    { title: "TLS 1.3 & AES-256 Encryption", desc: "All network communication between our global edge CDN and your website is protected by modern end-to-end encryption." },
    { title: "GDPR & CCPA Compliant", desc: "User interface preferences are stored locally in the visitor's browser localStorage without cross-site tracking cookies." },
    { title: "99.99% Global Uptime SLA", desc: "Our high-speed multi-region edge delivery network ensures zero latency impact on Core Web Vitals and page load times." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Security", href: "/security-and-privacy" }, { label: "Trust Center" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            Security • Privacy • Reliability
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            2all.ai <span className="text-[#C8FF4D]">Trust &amp; Security</span> Center
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Enterprise-grade security, data privacy, and compliance infrastructure protecting millions of daily web visitors worldwide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/security-and-privacy"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Security Whitepaper
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Security Framework</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">How We Protect Your Website &amp; Visitors</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityItems.map((s, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-black text-slate-900">{s.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
