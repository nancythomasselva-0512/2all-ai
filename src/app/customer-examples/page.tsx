"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, BadgeCheck, Eye } from "lucide-react";

export default function CustomerExamplesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const customers = [
    {
      name: "TrendWear E-commerce",
      industry: "Retail",
      status: "Remediated",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
      link: "https://example.com"
    },
    {
      name: "CarePlus Patient Portal",
      industry: "Healthcare",
      status: "Compliant",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
      link: "https://example.com"
    },
    {
      name: "Metro Transit Authority",
      industry: "Public Sector",
      status: "Remediated",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80",
      link: "https://example.com"
    }
  ];

  const industries = ["All", "Retail", "Healthcare", "Public Sector"];

  const filteredCustomers = selectedIndustry === "All"
    ? customers
    : customers.filter(c => c.industry === selectedIndustry);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Customer Examples" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Customer <span className="text-[#C8FF4D]">Showcase</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            See our accessibility tool in action. Browse live examples of customer websites that conform to WCAG and ADA guidelines using our software.
          </p>
        </div>
      </section>

      {/* 2. INDUSTRY FILTERS */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedIndustry === ind
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CUSTOMER GRID */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCustomers.map((customer) => (
                <motion.div
                  key={customer.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200/80 rounded-[32px] overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm text-left"
                >
                  {/* Visual Image */}
                  <div className="aspect-[16/10] w-full bg-slate-900 overflow-hidden relative">
                    <img 
                      src={customer.image} 
                      alt={customer.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider bg-white/95 text-blue-600 px-2.5 py-1 rounded-full shadow-sm border border-slate-200 flex items-center gap-1.5">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                      {customer.status}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        {customer.industry}
                      </span>
                      <h4 className="text-sm font-black text-slate-800 tracking-tight leading-snug">
                        {customer.name}
                      </h4>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600 hover:text-[#0b3c96] uppercase tracking-wider cursor-pointer">
                      <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Live Website</span>
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
