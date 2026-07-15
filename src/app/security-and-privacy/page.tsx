"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

type ActiveTab = "security" | "privacy" | "gdpr";

export default function SecurityAndPrivacyPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("security");

  const sections = {
    security: {
      title: "Security Standards",
      desc: "Our platform is designed with enterprise-level security protocols to ensure that widget loading and DOM-crawling are highly secure.",
      points: [
        { title: "No Data Collection", desc: "Our AI widget remediates accessibility barriers client-side without storing or harvesting visitors' browsing data." },
        { title: "HTTPS & SSL Protection", desc: "All network calls are strictly encrypted with TLS/SSL protocols." },
        { title: "GDPR Compliant Infrastructure", desc: "Servers are hosted on enterprise cloud environments with ISO 27001 certifications." }
      ]
    },
    privacy: {
      title: "Privacy Policy Guidelines",
      desc: "We prioritize user privacy. Our tools conform to modern data regulation standards, protecting organizational dashboards and viewer states.",
      points: [
        { title: "Anonymized Logging", desc: "Telemetry logs used for diagnostics are fully hashed, containing no personally identifiable details (PII)." },
        { title: "Cookie Policies", desc: "Cookies set by our accessibility panels are strictly functional, preserving visual choices (like high contrast) for returning visitors." }
      ]
    },
    gdpr: {
      title: "GDPR & CCPA Compliance",
      desc: "We strictly conform to global privacy regulations, ensuring our accessibility widgets respect data control requests.",
      points: [
        { title: "Visitor Opt-In Rights", desc: "We support clean data opt-ins. Visually impaired users can access widget remediations without exposing any tracking data." },
        { title: "Right to Erasure", desc: "Dashboard accounts can easily download or delete their entire account logs through their configuration panel." }
      ]
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Security & Privacy" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Security & <span className="text-[#C8FF4D]">Privacy</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Learn about our protocols, GDPR compliance, encryption standards, and user privacy protections.
          </p>
        </div>
      </section>

      {/* 2. MAIN ACCORDION & TABS CONTENT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          {/* Navigation tabs (left 4 columns) */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-[32px] p-6 text-left space-y-3">
            {[
              { id: "security", label: "Security Standards", icon: ShieldCheck },
              { id: "privacy", label: "Privacy Policy", icon: Lock },
              { id: "gdpr", label: "GDPR & CCPA", icon: Server }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`w-full py-3 px-5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-3 border cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content panel (right 8 columns) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[32px] p-8 md:p-10 shadow-sm text-left space-y-8">
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {sections[activeTab].title}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                {sections[activeTab].desc}
              </p>
            </div>

            <div className="space-y-6">
              {sections[activeTab].points.map((pt, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-800 leading-tight">{pt.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-xl">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
