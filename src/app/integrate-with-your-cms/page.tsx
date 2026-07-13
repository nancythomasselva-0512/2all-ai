"use client";
import Navbar from "@/components/marketing/Navbar";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Puzzle, Settings, Download, Globe, CheckCircle } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CMSIntegrationsPage() {




  return (
    <div className="min-h-screen w-full bg-slate-50 relative font-sans text-[#0a1e3f]">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-xl relative z-10">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-[#004bff]">CMS Integrations</div>
            <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Products" }, { label: "CMS Integrations" } ]} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-[#0a1e3f]">
              Connect natively with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bff] to-[#00ff87] italic font-serif font-light">favorite CMS</span>.
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              Seamless 1-click installations for the world's most popular website builders. Make your site accessible in under five minutes, without touching a single line of code.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#0a1e3f] hover:bg-blue-900 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                EXPLORE PLATFORMS
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[400px] md:h-[500px]">
            <div className="absolute inset-0 bg-blue-100/50 rounded-[40px] blur-3xl transform rotate-6 scale-110" />
            
            {/* Integrations Cloud */}
            <div className="relative h-full w-full flex items-center justify-center">
               <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center z-20">
                  <img src="/images/logo.png" alt="2all.ai" className="h-16 w-auto mix-blend-multiply" />
                  
                  {/* Surrounding CMS Icons */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center">
                     <span className="font-bold text-[#004bff] text-xs">Wix</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center">
                     <span className="font-bold text-[#004bff] text-xs">Shopify</span>
                  </div>
                  <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center">
                     <span className="font-bold text-[#004bff] text-[10px]">WordPress</span>
                  </div>
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center">
                     <span className="font-bold text-[#004bff] text-xs">Squarespace</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] mb-4">
              Effortless deployment
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
               You shouldn't need a developer to make your website accessible. Our native plugins do the heavy lifting for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Download, title: "1-Click Install", desc: "Available directly in the plugin marketplaces of major CMS platforms." },
               { icon: Settings, title: "Automatic Updates", desc: "The widget automatically updates to comply with the latest WCAG standards." },
               { icon: Globe, title: "Platform Agnostic", desc: "If you don't use a major CMS, our universal JS tag works on any HTML site." },
             ].map((feature, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:-translate-y-1 transition-transform">
                   <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-[#004bff]" />
                   </div>
                   <h3 className="text-xl font-bold text-[#0a1e3f] mb-3">{feature.title}</h3>
                   <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#004bff] py-20 px-4 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
               Integrate with your CMS today
            </h2>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg">
               GET INSTALLATION GUIDE
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
