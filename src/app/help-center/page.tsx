"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Settings, 
  Lock, 
  ArrowRight,
  MessageSquare
} from "lucide-react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Getting Started",
      desc: "Install the JS script, verify domains installation, and configure initial panel preferences.",
      icon: BookOpen,
      articlesCount: 5
    },
    {
      title: "Settings & Profiles",
      desc: "Customize widget visibility, toggle profiles (ADHD, Vision), and modify panel styling.",
      icon: Settings,
      articlesCount: 8
    },
    {
      title: "Compliance & Security",
      desc: "Generate accessibility statements, configure audited reports, and view privacy encryption details.",
      icon: Lock,
      articlesCount: 6
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
            items={[ { label: "Home", href: "/" }, { label: "Help Center" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Support <span className="text-[#C8FF4D]">Help Center</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Search our knowledge base, read guides, and configure your accessibility widget dashboard settings.
          </p>

          {/* Search box */}
          <div className="w-full max-w-md relative pt-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 mt-1.5" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#C8FF4D]/40 transition-all shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Knowledge Base</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Browse Support Categories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
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
                    <h3 className="text-md font-black text-slate-900 tracking-tight">{cat.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{cat.desc}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-black text-blue-600 hover:text-[#0b3c96] uppercase tracking-wider cursor-pointer">
                    <span>{cat.articlesCount} articles</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CONTACT TICKET CALLOUT */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-[40px] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-4 max-w-lg">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto md:mx-0">
              <MessageSquare className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
              Still need assistance?
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              If you can't find the answers in our help guides, submit a support ticket or start a live dialogue with our developer support desk.
            </p>
          </div>

          <div className="shrink-0">
            <a href="/contact-us" className="inline-flex items-center gap-2 bg-[#0b3c96] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-wider uppercase transition-all shadow-md">
              Contact Support <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
