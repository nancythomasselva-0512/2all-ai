"use client";
import Navbar from "@/components/marketing/Navbar";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ShoppingCart, HeartPulse, GraduationCap, Building2, Scale, Search } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function IndustriesPage() {




  const industries = [
    {
      title: "eCommerce & Retail",
      icon: ShoppingCart,
      desc: "Tap into the $8 trillion global disability market. Ensure your checkout flow is completely accessible to screen readers, preventing cart abandonment by users with disabilities.",
      color: "bg-pink-100 text-pink-600",
      dot: "bg-pink-500"
    },
    {
      title: "Healthcare",
      icon: HeartPulse,
      desc: "Meet Section 1557 requirements. Help make patient portals, appointment scheduling, and telemedicine platforms more usable for all patients.",
      color: "bg-rose-100 text-rose-600",
      dot: "bg-rose-500"
    },
    {
      title: "Education",
      icon: GraduationCap,
      desc: "Comply with Title II of the ADA. Make sure online courses, university portals, and digital learning materials are accessible to students of all abilities.",
      color: "bg-indigo-100 text-indigo-600",
      dot: "bg-indigo-500"
    },
    {
      title: "Real Estate",
      icon: Building2,
      desc: "Prevent costly Fair Housing Act (FHA) lawsuits. Ensure virtual tours, property listings, and mortgage calculators are accessible.",
      color: "bg-emerald-100 text-emerald-600",
      dot: "bg-emerald-500"
    },
    {
      title: "Government & Public Sector",
      icon: Scale,
      desc: "Achieve mandatory Section 508 and WCAG 2.1 AA compliance for state and local government websites to ensure equal access to public services.",
      color: "bg-blue-100 text-blue-600",
      dot: "bg-blue-500"
    },
    {
      title: "Hospitality & Travel",
      icon: Search,
      desc: "Make booking engines, hotel accommodations pages, and travel itineraries accessible so everyone can plan their next journey with ease.",
      color: "bg-amber-100 text-amber-600",
      dot: "bg-amber-500"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 relative font-sans text-[#0a1e3f]">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 relative">
        <div className="absolute inset-0 bg-blue-50/50 -z-10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-[#004bff]">Industries</div>
          <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Business Size" }, { label: "Industries" } ]} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-[#0a1e3f] max-w-4xl mx-auto">
            Web accessibility solutions tailored for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bff] to-[#00ff87] italic font-serif font-light">every sector</span>.
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Whether you're selling products online, providing critical healthcare, or educating the next generation, accessibility is both a legal requirement and a moral imperative.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {industries.map((ind, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white transition-all group relative overflow-hidden">
                   {/* Decorative background element */}
                   <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-transform group-hover:scale-110 ${ind.color.split(' ')[0]}`} />
                   
                   <div className="relative z-10">
                       <div className="flex items-center gap-4 mb-6">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${ind.color}`}>
                              <ind.icon className="w-7 h-7" />
                           </div>
                           <h3 className="text-xl font-black text-[#0a1e3f]">{ind.title}</h3>
                       </div>
                       <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                          {ind.desc}
                       </p>
                       <Link href="/register" className="inline-flex items-center gap-2 text-sm font-bold text-[#004bff] group-hover:gap-3 transition-all">
                          Explore solutions <ChevronRight className="w-4 h-4" />
                       </Link>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#004bff] py-20 px-4 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
               Protect your business and expand your reach.
            </h2>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg">
               GET STARTED TODAY
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
