"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardSection({ setActiveTab, searchQuery }: { setActiveTab: (t: any) => void, searchQuery: string }) {
  const { state, updateSetting, applyProfile } = useAccessibility();
  
  if (searchQuery) return null; // Hide dashboard if searching

  // Calculate a fake score based on active settings
  let score = 75;
  if (state.activeProfile !== "none") score += 15;
  if (state.isHighContrast || state.isDarkMode) score += 5;
  if (state.fontSize > 100) score += 5;

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
      
      {/* Score Card */}
      <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#0a1e3f] to-[#004bff] rounded-2xl p-5 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-cyan-400 flex items-center justify-center shrink-0">
            <span className="text-xl font-black">{score}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">Accessibility Score</h3>
            <p className="text-blue-200 text-xs mt-1">Your personalized score based on active optimizations.</p>
          </div>
        </div>
      </motion.div>

      {/* AI Recommendation */}
      <motion.div variants={fadeUp} className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10"><Sparkles className="w-16 h-16" /></div>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <BotIcon className="w-4 h-4" />
        </div>
        <div className="relative z-10">
          <h4 className="text-sm font-bold text-[#0a1e3f] flex items-center gap-1.5">AI Suggestion <Sparkles className="w-3 h-3 text-amber-500" /></h4>
          <p className="text-xs text-slate-600 mt-1 mb-3">Based on your activity, we recommend enabling the "Dyslexia Profile" for a smoother reading experience.</p>
          <button 
            onClick={() => applyProfile("dyslexia")}
            className="text-[10px] font-bold uppercase tracking-widest bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
          >
            Apply Profile
          </button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp} className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => updateSetting("isHighContrast", !state.isHighContrast)}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${state.isHighContrast ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'}`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold">High Contrast</span>
          </button>
          
          <button 
            onClick={() => updateSetting("readingMask", !state.readingMask)}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${state.readingMask ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'}`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-xs font-bold">Reading Mask</span>
          </button>
        </div>
      </motion.div>

      {/* Explore More */}
      <motion.div variants={fadeUp}>
        <button 
          onClick={() => setActiveTab("profiles")}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:bg-slate-100 transition-colors"
        >
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#0a1e3f]">Explore Smart Profiles</h4>
            <p className="text-xs text-slate-500 mt-0.5">1-click accessibility configurations</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </div>
        </button>
      </motion.div>

    </motion.div>
  );
}

function BotIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
