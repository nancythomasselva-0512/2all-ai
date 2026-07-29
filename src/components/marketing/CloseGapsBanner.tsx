"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CloseGapsBanner() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUrl = url || "yoursite.com";
    window.location.href = `/register?scanUrl=${encodeURIComponent(targetUrl)}`;
  };

  return (
    <motion.section 
      initial="visible"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 1, y: 0 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 }
        }
      }}
      className="py-6 md:py-10 bg-white relative overflow-hidden select-none font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Main Blue Banner Container */}
        <div className="w-full bg-gradient-to-r from-[#004bff] to-blue-700 rounded-[36px] px-8 py-16 md:px-16 md:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 shadow-2xl shadow-blue-600/20 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
          
          {/* Left Text */}
          <div className="text-left space-y-3 lg:max-w-xl relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300/90 block">READY TO START?</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight font-sans">
              Elevate your site into a <br className="hidden sm:inline" />
              <span className="italic font-serif font-normal text-cyan-300">universal experience</span>
            </h2>
          </div>

          {/* Right Input Form */}
          <form onSubmit={handleSubmit} className="w-full lg:max-w-md shrink-0 relative z-10">
            <div className="relative border border-white/40 rounded-[24px] sm:rounded-full p-2 flex flex-col sm:flex-row items-center justify-between bg-white/10 backdrop-blur-md shadow-inner focus-within:border-white transition-colors gap-2 sm:gap-0">
              <input
                type="text"
                placeholder="https://yoursite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-white/70 text-sm md:text-base font-extrabold focus:outline-none focus:ring-0 px-4 py-2 sm:py-0 text-center sm:text-left"
              />
              
              <button
                type="submit"
                className="btn-premium w-full sm:w-auto justify-center bg-white hover:bg-slate-50 text-[#004bff] rounded-full px-7 py-3.5 text-xs md:text-sm font-extrabold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-black/10 shrink-0 transition-transform active:scale-95"
              >
                GET AUDIT
                <ArrowRight className="w-4 h-4 text-[#004bff] stroke-[3]" />
              </button>
            </div>
          </form>

        </div>

      </div>
    </motion.section>
  );
}
