"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Eye, 
  Settings, 
  Accessibility, 
  HelpCircle,
  Lightbulb,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function AccessibilityInterfacePage() {
  // Simulated Interactive Widget State
  const [largeText, setLargeText] = useState(false);
  const [contrast, setContrast] = useState<"standard" | "monochrome">("standard");
  const [highlightLinks, setHighlightLinks] = useState(false);

  const profiles = [
    {
      title: "ADHD Friendly Profile",
      desc: "Reduces animations, blocks flashing banners, and adds a reading mask focus rule to minimize visual distractions, aiding focus.",
      icon: Lightbulb
    },
    {
      title: "Vision Impaired Profile",
      desc: "Instantly increases font sizes, boosts color contrast ratios, improves text spacing, and highlights visual components.",
      icon: Eye
    },
    {
      title: "Seizure Safe Profile",
      desc: "Disables flashing elements, stops auto-playing videos, and stops animations instantly to eliminate triggers for epilepsy.",
      icon: Accessibility
    },
    {
      title: "Cognitive Disability Profile",
      desc: "Adds glossary search utilities directly on the page to simplify complex vocabulary and aid comprehension.",
      icon: Settings
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
            items={[ { label: "Home", href: "/" }, { label: "Accessibility Interface" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            The Accessibility <span className="text-[#C8FF4D]">Interface</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Empower website visitors with a customizable accessibility panel to browse content on their own terms.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE DEMO CONTAINER */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Live Mockup</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Test the Widget Controls</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              Use the controls on the left to change the appearance of the simulated card on the right instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 text-left space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-600" /> Controls Panel
              </h3>

              <div className="space-y-4">
                {/* Large text toggle */}
                <button
                  onClick={() => setLargeText(!largeText)}
                  className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-between border cursor-pointer ${
                    largeText
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <span>Enlarge Text</span>
                  <span className="text-[10px] opacity-75">{largeText ? "ON" : "OFF"}</span>
                </button>

                {/* Contrast toggle */}
                <button
                  onClick={() => setContrast(contrast === "standard" ? "monochrome" : "standard")}
                  className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-between border cursor-pointer ${
                    contrast === "monochrome"
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <span>Monochrome Mode</span>
                  <span className="text-[10px] opacity-75">{contrast === "monochrome" ? "ON" : "OFF"}</span>
                </button>

                {/* Highlight links toggle */}
                <button
                  onClick={() => setHighlightLinks(!highlightLinks)}
                  className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-between border cursor-pointer ${
                    highlightLinks
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <span>Highlight Links</span>
                  <span className="text-[10px] opacity-75">{highlightLinks ? "ON" : "OFF"}</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Preview Card */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div 
                className={`w-full bg-white border border-slate-200 rounded-[32px] p-8 text-left shadow-lg transition-all duration-300 ${
                  contrast === "monochrome" ? "grayscale filter" : ""
                }`}
              >
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Preview Card</span>
                
                <h4 className={`font-black text-slate-900 mt-3 tracking-tight ${
                  largeText ? "text-2xl" : "text-lg"
                }`}>
                  Accessible Digital Spaces
                </h4>
                
                <p className={`text-slate-500 mt-4 leading-relaxed ${
                  largeText ? "text-sm" : "text-xs"
                }`}>
                  Web content accessibility is essential to include everyone. By offering customizable options, users with dyslexia, vision loss, or situational needs can browse websites with comfort.
                </p>

                <div className="pt-6">
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className={`inline-flex items-center gap-2 font-black text-xs uppercase tracking-wider ${
                      highlightLinks 
                        ? "bg-amber-300 text-slate-900 px-3 py-1 rounded border-2 border-slate-900 underline" 
                        : "text-blue-600 hover:text-[#0b3c96]"
                    }`}
                  >
                    Read full documentation &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROFILES GRID */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Interface Profiles</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Pre-configured Accessibility Profiles</h2>
            <p className="text-slate-500 text-sm md:text-md leading-relaxed">
              Users can select tailored profiles to apply specific layouts and color configurations automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map((profile, idx) => {
              const Icon = profile.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200/80 rounded-[28px] p-6 text-left flex flex-col justify-between h-[220px] hover:shadow-lg transition-all duration-300 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-black text-slate-800 tracking-tight">{profile.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{profile.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
