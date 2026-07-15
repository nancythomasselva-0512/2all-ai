"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Cpu, 
  Eye, 
  Binary, 
  ArrowRight,
  Zap,
  Activity,
  Maximize2
} from "lucide-react";

export default function ArtificialIntelligencePage() {
  const steps = [
    {
      step: "01",
      title: "Real-time DOM Crawling",
      desc: "Our engine immediately audits the structure of the website upon loading, parsing elements, forms, and navigation states dynamically.",
      icon: Activity
    },
    {
      step: "02",
      title: "Contextual Learning",
      desc: "By matching against millions of historical accessibility audits, the system recognizes complex layouts (e.g., shopping carts) and understands user flows.",
      icon: Binary
    },
    {
      step: "03",
      title: "Automatic Remediation",
      desc: "The AI automatically injects ARIA labels, updates screen reader context, and adjusts keyboard controls directly in the browser.",
      icon: Zap
    }
  ];

  const technologies = [
    {
      title: "Computer Vision & OCR",
      desc: "Analyzes visual layouts, icons, and text embedded in images. Generates accurate alternative text (alt tags) automatically so blind users understand visual contexts.",
      icon: Eye
    },
    {
      title: "Neural Language Processing",
      desc: "Interprets language patterns and page hierarchy, ensuring screen readers announce page structures, dropdowns, and form labels in logical order.",
      icon: Cpu
    },
    {
      title: "Self-Learning Engine",
      desc: "Continuously tracks DOM changes. As website managers add products or update banners, the AI catches updates and adjusts compliance parameters.",
      icon: Sparkles
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
            items={[ { label: "Home", href: "/" }, { label: "Artificial Intelligence" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            AI-Powered <span className="text-[#C8FF4D]">Web Accessibility</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Discover how our advanced self-learning AI engine audits, maps, and remediates accessibility barriers contextually and in real-time.
          </p>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Process Pipeline</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">How our AI Engine Remediates</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              Achieve ongoing digital compliance without modifying your codebase manually.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 text-left space-y-6 relative shadow-sm hover:shadow-md transition-shadow">
                  <span className="absolute top-6 right-8 text-5xl font-black text-slate-200">{item.step}</span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center relative z-10">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-md font-black text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGY GRID */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Core Technology</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Under the Hood of 2all-ai</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              We leverage state-of-the-art visual models and heuristic mappings to handle complex DOM structures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-200/80 rounded-[28px] p-8 text-left space-y-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-slate-800 leading-snug">{tech.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{tech.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BENCHMARK COMPARISON */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0b3c96] to-[#041d57] rounded-[40px] p-10 md:p-16 flex flex-col items-center text-white relative overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,255,77,0.08)_0%,transparent_60%)] pointer-events-none" />
          <span className="text-xs font-black tracking-widest text-[#C8FF4D] uppercase mb-4">Self-Learning Continuity</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">
            Remediate your digital gaps in under 48 hours
          </h2>
          <p className="text-slate-200 text-sm md:text-md max-w-md mt-4 font-light leading-relaxed">
            Experience automatic compliance monitoring that updates as fast as your content updates.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="/access-widget" className="bg-[#C8FF4D] hover:bg-[#b0e63c] text-slate-900 px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:scale-105 shadow-xl">
              Explore Accessibility Interface &rarr;
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
