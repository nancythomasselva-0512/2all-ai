"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import DyslexiaSimulation from "@/components/accessibility/DyslexiaSimulation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function DyslexiaSimulationPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-16 px-6 text-center relative overflow-hidden shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[
              { label: "Home", href: "/" },
              { label: "Accessibility Interface", href: "/accessibility-interface" },
              { label: "Dyslexia Simulation" }
            ]} 
          />
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Dyslexia <span className="text-[#C8FF4D]">Reading Simulation</span>
          </h1>
          
          <p className="text-slate-200 text-base md:text-lg font-light max-w-2xl leading-relaxed">
            Experience how text can appear visually unstable for individuals with dyslexia, and test AI-powered typography remediations.
          </p>
        </div>
      </section>

      {/* Main Interactive Demo Container */}
      <section className="py-12 px-4 md:px-6 flex-1">
        <DyslexiaSimulation />
      </section>

      <Footer />
    </main>
  );
}
