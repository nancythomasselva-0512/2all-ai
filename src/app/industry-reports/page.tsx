"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { 
  FileText, 
  TrendingUp, 
  Download, 
  AlertCircle,
  BarChart4,
  ArrowRight
} from "lucide-react";

export default function IndustryReportsPage() {
  const stats = [
    { value: "97.8%", label: "Homepage Audits Failures", desc: "The vast majority of homepages audited globally exhibit basic accessibility failures under WCAG standards." },
    { value: "50.8", label: "Average Errors Per Page", desc: "Webpages exhibit on average dozens of detectible errors, mostly centering on contrast and missing labels." },
    { value: "+37%", label: "ADA Lawsuits Growth", desc: "Web accessibility litigation and formal demand letters continue to grow year over year." }
  ];

  const reports = [
    {
      title: "E-Commerce Web Accessibility Report 2026",
      size: "2.4 MB",
      format: "PDF Document",
      desc: "An in-depth analysis of the top 500 online retail templates, highlighting cart navigation, checkout barriers, and product image issues."
    },
    {
      title: "Higher Education Digital Compliance Review",
      size: "1.8 MB",
      format: "PDF Document",
      desc: "Auditing student portals, enrollment panels, and university landing pages for compliance with Section 508 and ADA Title II."
    },
    {
      title: "Hospitality & Booking Systems Audit Summary",
      size: "3.1 MB",
      format: "PDF Document",
      desc: "Identifying accessibility checkpoints in hotel reservation flows, calendar inputs, and room selector grids."
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
            items={[ { label: "Home", href: "/" }, { label: "Industry Reports" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Industry <span className="text-[#C8FF4D]">Reports</span> & Insights
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Access our latest statistical audits, data analysis, and compliance benchmarks across e-commerce, education, and hospitality.
          </p>
        </div>
      </section>

      {/* 2. STATS OVERVIEW SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Key Indicators</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">The Current State of Web Accessibility</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              Recent telemetry and auditing data reveal major accessibility gaps across commercial websites.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="block text-4xl md:text-5xl font-black text-[#0b3c96] tracking-tight">{stat.value}</span>
                <h3 className="text-sm font-black text-slate-900 tracking-tight">{stat.label}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REPORT DOWNLOAD SECTION */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Downloads Archive</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Available Audit Reports</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              Download our research documents to analyze specific compliance trends in your sector.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reports.map((report, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200/80 rounded-[32px] p-8 text-left space-y-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug">{report.title}</h3>
                    <div className="flex gap-2 text-[10px] text-slate-400 font-bold mt-1">
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{report.format}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{report.desc}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => alert("Report download simulated.")}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 tracking-wider uppercase transition-all shadow-md cursor-pointer border-none"
                  >
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
