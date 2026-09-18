import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
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
  const { applyProfile } = useAccessibility();
  
  if (searchQuery) return null; // Hide dashboard if searching

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">

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

      {/* Explore Respective Menus */}
      <motion.div variants={fadeUp} className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Dedicated Menus</h4>

        {/* 1. Modes */}
        <button 
          onClick={() => setActiveTab("profiles")}
          className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between group hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer select-none"
        >
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Smart Profiles (Modes)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">1-click accessibility configurations (Epilepsy, ADHD, Blindness, etc.)</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-all shrink-0 ml-2">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>

        {/* 2. Features */}
        <button 
          onClick={() => setActiveTab("features")}
          className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between group hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer select-none"
        >
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Features (Typography & Reading)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Font scaling, text-to-speech read aloud, reading mask, focus outlines</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-all shrink-0 ml-2">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>

        {/* 3. Vision */}
        <button 
          onClick={() => setActiveTab("vision")}
          className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between group hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer select-none"
        >
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Vision (Color & Contrast)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Dark contrast, monochrome, saturation, color blindness filters</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-all shrink-0 ml-2">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
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
