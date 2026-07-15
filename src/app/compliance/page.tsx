"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Scale, 
  Globe2, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  AlertCircle
} from "lucide-react";

export default function CompliancePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const legislations = [
    {
      title: "ADA (Americans with Disabilities Act)",
      subtitle: "United States • Civil Rights Law",
      desc: "Title III of the ADA prohibits discrimination based on disability in places of public accommodation. U.S. federal courts and the Department of Justice (DOJ) consistently interpret this to include commercial websites, portals, and digital services.",
      standard: "WCAG 2.1 Level AA",
      risk: "High risk of class-action lawsuits and demand letters",
      icon: Scale
    },
    {
      title: "European Accessibility Act (EAA)",
      subtitle: "European Union • Directive 2019/882",
      desc: "The EAA is a landmark directive mandating accessibility across all member states. Unlike previous laws, it directly applies to a broad range of private businesses, including e-commerce platforms, banking, and e-books.",
      standard: "EN 301 549 (WCAG 2.1 AA equivalent)",
      risk: "Enforcement began June 2025. Significant fines and product bans.",
      icon: Globe2
    },
    {
      title: "Section 508 / 504",
      subtitle: "United States • Federal Rehabilitation Act",
      desc: "Requires federal agencies, government departments, and organizations receiving federal financial assistance (such as universities and public healthcare facilities) to make their electronic and information technology accessible.",
      standard: "WCAG 2.0 Level AA",
      risk: "Loss of government funding and public procurement exclusion.",
      icon: FileText
    },
    {
      title: "AODA (Accessibility for Ontarians with Disabilities)",
      subtitle: "Ontario, Canada • Provincial Mandate",
      desc: "Mandates that public, private, and non-profit organizations with 50+ employees in Ontario conform to accessibility requirements. Organizations must file periodic accessibility compliance reports.",
      standard: "WCAG 2.0 Level AA",
      risk: "Fines up to $100,000 per day for directors and corporations.",
      icon: ShieldCheck
    }
  ];

  const standards = [
    { name: "WCAG 2.0", level: "AA Conformance", scope: "Original baseline standard for early regulations (AODA, Section 508)." },
    { name: "WCAG 2.1", level: "AA Conformance", scope: "Adds mobile accessibility, low vision, and cognitive parameters. Standard for ADA & EAA." },
    { name: "WCAG 2.2", level: "AA Conformance", scope: "Released in 2023. Adds criteria for cognitive disabilities, input devices, and accessibility support." }
  ];

  const complianceFaqs = [
    {
      q: "Does my small business website really need to comply with the ADA?",
      a: "Yes. The DOJ and U.S. courts hold that commercial websites are considered 'places of public accommodation' under Title III of the ADA. Websites with major usability barriers are common targets for civil lawsuits, regardless of business size."
    },
    {
      q: "What is the difference between WCAG and ADA?",
      a: "The ADA is the governing civil rights law in the United States, whereas the WCAG (Web Content Accessibility Guidelines) is the set of technical guidelines created by the W3C. The ADA specifies the legal requirement to be accessible, and courts point to WCAG as the technical benchmark for what constitutes an accessible site."
    },
    {
      q: "Can automated tools make my website 100% compliant?",
      a: "Automated tools and AI widgets can remediate roughly 70-80% of common accessibility barriers (such as keyboard control, alt-text generation, and contrast fixes) instantly. However, complete compliance requires a hybrid approach, combining AI remediation with human audits for complex user journeys and document testing (like PDFs)."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Compliance & Regulations" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Web Accessibility <span className="text-[#C8FF4D]">Compliance</span> & Regulations
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Navigate the global legal landscape of digital inclusion. Ensure compliance, mitigate legal risk, and make the web inclusive for all.
          </p>
        </div>
      </section>

      {/* 2. LEGISLATIONS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Legal Landscape</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Major Digital Accessibility Laws</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              Regulations across North America, Europe, and globally require websites to be fully operable and understandable by users with disabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {legislations.map((leg, idx) => {
              const Icon = leg.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 text-left space-y-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">{leg.title}</h3>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{leg.subtitle}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{leg.desc}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Benchmark: <strong className="text-slate-900">{leg.standard}</strong></span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-100 p-2.5 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{leg.risk}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WCAG BENCHMARKS */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Technical Standards</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Understanding WCAG standards</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              The Web Content Accessibility Guidelines (WCAG) form the basis of all global accessibility laws. Adhering to WCAG guidelines ensures compliance with ADA, EAA, and regional standards.
            </p>
            <div className="pt-4">
              <a href="/why-choose-2all-ai" className="inline-flex items-center gap-2 bg-[#0b3c96] text-white hover:bg-blue-700 px-6 py-3 rounded-full font-black text-xs tracking-wider uppercase transition-all shadow-md">
                Compare Our Solutions <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-left">
            {standards.map((std, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-sm tracking-wide border border-blue-100">
                  {std.name}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{std.level}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{std.scope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Support Desk</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Compliance & Regulations FAQ</h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {complianceFaqs.map((faq, idx) => (
              <div key={idx} className="py-5 text-left">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-slate-800 hover:text-[#0b3c96] transition-colors"
                >
                  <span className="text-md font-bold pr-4">{faq.q}</span>
                  {activeFaq === idx ? (
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {activeFaq === idx && (
                  <p className="text-sm text-slate-500 mt-3.5 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AUDIT CTA */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0b3c96] to-[#041d57] rounded-[40px] p-10 md:p-16 flex flex-col items-center text-white relative overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,255,77,0.08)_0%,transparent_60%)] pointer-events-none" />
          <span className="text-xs font-black tracking-widest text-[#C8FF4D] uppercase mb-4">Start your Compliance Journey</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">
            Get an instant website compliance scan
          </h2>
          <p className="text-slate-200 text-sm md:text-md max-w-md mt-4 font-light leading-relaxed">
            Enter your website URL to scan your templates and generate an accessibility report in seconds.
          </p>
          <div className="mt-8">
            <a href="/access-scan" className="bg-[#C8FF4D] hover:bg-[#b0e63c] text-slate-900 px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:scale-105 shadow-xl">
              Scan Website Now &rarr;
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
