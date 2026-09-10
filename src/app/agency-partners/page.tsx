"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Users, ShieldCheck, DollarSign, ArrowRight, CheckCircle2, Award } from "lucide-react";

export default function AgencyPartnersPage() {
  const benefits = [
    { title: "20% Recurring Revenue Share", desc: "Earn recurring monthly or annual commission on every client you refer to 2all.ai." },
    { title: "Multi-Client Agency Dashboard", desc: "Manage all client domains, scan scores, and API keys from a single centralized executive console." },
    { title: "White-Label Accessibility Options", desc: "Custom brand the widget colors, logo, and statement to match your client's design language." },
    { title: "Dedicated Partner Support", desc: "Access fast-track ticket support, co-marketing materials, and technical onboarding assistance." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Partners", href: "/agency" }, { label: "Agency Partner Program" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            Web Agencies • Dev Shops • Freelancers
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            2all.ai <span className="text-[#C8FF4D]">Agency Partner</span> Program
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Protect your clients from ADA lawsuits, add a new recurring revenue stream, and deliver state-of-the-art web accessibility with zero dev overhead.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/contact-us"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Apply as Agency Partner
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Book Partner Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Partner Perks</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Why Top Digital Agencies Choose 2all.ai</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-3">
                <h3 className="text-xl font-black text-slate-900">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
