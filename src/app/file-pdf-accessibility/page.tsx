"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, ShieldCheck, Zap, ArrowRight, FileCheck, Layers, Sparkles } from "lucide-react";

export default function FilePdfAccessibilityPage() {
  const features = [
    {
      title: "Automated Document Tagging",
      desc: "Automatically add structure trees, headings (H1-H6), figure tags, tables, and lists to untagged legacy PDFs.",
      icon: Layers
    },
    {
      title: "AI Alt-Text for Complex Charts",
      desc: "Our multimodal AI analyzes graphs, diagrams, and images within PDFs to produce meaningful screen-reader descriptions.",
      icon: Sparkles
    },
    {
      title: "PDF/UA-1 & WCAG 2.1 AA Compliance",
      desc: "Full conformance with international PDF Universal Accessibility standards (ISO 14289-1) and Section 508.",
      icon: ShieldCheck
    },
    {
      title: "Fillable Form Remediation",
      desc: "Remediate interactive form fields, checkboxes, tooltips, and tab orders for screen reader keyboard operability.",
      icon: FileCheck
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/services" }, { label: "File & PDF Accessibility" }]}
          />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            File &amp; PDF <span className="text-[#C8FF4D]">Accessibility</span> Remediation
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Ensure all downloadable assets—PDFs, Word documents, annual reports, and brochures—are fully accessible and compliant with PDF/UA and WCAG.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/demo"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Get a PDF Audit Quote
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Scan Website &amp; Files
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Document Inclusion</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Comprehensive Document Accessibility Solutions
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Inaccessible PDFs and documents are the #2 most common trigger for ADA Title III lawsuits. We fix them fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Step-by-Step</span>
            <h2 className="text-3xl font-black text-slate-900">How 2all.ai Remediates Your Documents</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">1</span>
              <h4 className="font-extrabold text-slate-900 text-base">Upload &amp; Scan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Submit your PDF/Word documents. Our automated scanner identifies tag structure, reading order, and contrast issues.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">2</span>
              <h4 className="font-extrabold text-slate-900 text-base">AI + Expert Remediation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">AI structures complex tabular data and image alt-text, verified by human accessibility engineers.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">3</span>
              <h4 className="font-extrabold text-slate-900 text-base">Certified Delivery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Receive PAC 2024 / PDF/UA validated files with full conformance documentation ready to publish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Need Hundreds of PDFs Remediated?</h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            We support high-volume automated remediation pipelines for enterprise organizations, banks, and universities.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-sm rounded-xl shadow-lg transition-all uppercase tracking-wider"
          >
            Talk to an Accessibility Specialist <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
