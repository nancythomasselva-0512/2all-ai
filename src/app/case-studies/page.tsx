"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { 
  BadgeCheck, 
  Quote, 
  ArrowRight,
  TrendingUp,
  Percent
} from "lucide-react";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Global E-Commerce Retailer Accessibility Overhaul",
      client: "TrendWear Group",
      metrics: "+43% Checkout Conversion",
      desc: "TrendWear integrated our AI automated widget across their regional shopping portals. By correcting visual checkout obstacles and supporting screen reader labels, they saw a massive increase in checkout completion from visually impaired consumers.",
      quote: "2all-ai solved our compliance concerns in hours, while positively impacting our conversion metrics.",
      author: "Sarah Jenkins, VP of Engineering"
    },
    {
      title: "Health Care Portal Compliance Upgrade",
      client: "CarePlus Networks",
      metrics: "ADA & Section 508 Resolved",
      desc: "CarePlus operates medical records dashboards and booking tools. They required quick compliance with Section 508. Implementing our overlay and DOM-scanning systems resolved keyboard control errors across booking forms.",
      quote: "The automated updates keep us compliant as we roll out updates weekly. It's a lifesaver.",
      author: "Marcus Rivera, CTO"
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
            items={[ { label: "Home", href: "/" }, { label: "Case Studies" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Customer <span className="text-[#C8FF4D]">Case Studies</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Read real-world examples of how businesses use our AI-powered accessibility solutions to achieve compliance and improve conversions.
          </p>
        </div>
      </section>

      {/* 2. CASE STUDIES LIST */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          {caseStudies.map((cs, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-200/80 rounded-[40px] p-8 md:p-12 text-left grid lg:grid-cols-12 gap-10 items-center shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Context info */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-600 px-3 py-1 rounded-full border border-blue-200 inline-block">
                  {cs.client}
                </span>
                
                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {cs.title}
                </h3>
                
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {cs.desc}
                </p>

                {/* Quote block */}
                <div className="border-l-4 border-blue-600 pl-4 py-1.5 bg-blue-50/50 pr-4 rounded-r-xl">
                  <div className="flex gap-1.5 text-blue-600 mb-1">
                    <Quote className="w-4 h-4 fill-current shrink-0" />
                  </div>
                  <p className="text-slate-600 text-xs italic font-semibold leading-relaxed">
                    "{cs.quote}"
                  </p>
                  <span className="block text-[10px] text-slate-400 font-bold mt-1.5">
                    — {cs.author}
                  </span>
                </div>
              </div>

              {/* Metrics highlight block */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0b3c96] to-[#041d57] text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg min-h-[220px]">
                <TrendingUp className="w-10 h-10 text-[#C8FF4D] mb-4" />
                <h4 className="text-lg font-black tracking-tight leading-tight text-white">Impact Metric</h4>
                <p className="text-3xl font-black text-[#C8FF4D] mt-2 tracking-tight">{cs.metrics}</p>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white uppercase tracking-wider cursor-pointer">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
