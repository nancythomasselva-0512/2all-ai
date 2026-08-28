import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Zap, Sparkles, ArrowRight, 
  Info, ChevronDown, ChevronUp, CheckCircle2 
} from "lucide-react";
import { useAccessibility, calculateAccessibilityScore } from "@/context/AccessibilityContext";

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
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  if (searchQuery) return null; // Hide dashboard if searching

  // Calculate real-time accessibility score based on active optimizations
  const hasProfile = Boolean(state.activeProfile) && state.activeProfile !== "none";

  const hasTypography = 
    state.fontFamily !== "default" || 
    state.fontSize > 100 || 
    state.letterSpacing > 0 || 
    state.lineHeight !== 1.5 ||
    state.wordSpacing > 0 ||
    state.textAlignment !== "default";

  const hasContrast = 
    state.isHighContrast || 
    state.isDarkMode || 
    state.isLightMode || 
    state.isSmartContrast ||
    state.colorBlindMode !== "none" || 
    state.saturationMode !== "normal" ||
    (Boolean(state.textColor) && state.textColor !== "default");

  const hasReadingTools = 
    state.readingMask || 
    state.readingRuler || 
    state.highlightFocus || 
    state.textMagnifier || 
    state.textToSpeech || 
    state.autoReadSelection ||
    state.readingMode !== "none" ||
    state.highlightLinks ||
    state.highlightHeadings ||
    state.highlightButtons ||
    state.voiceNavigation ||
    state.reduceMotion ||
    state.stopAnimations;

  const profileScore = hasProfile ? 15 : 0;
  const typographyScore = hasTypography ? 5 : 0;
  const contrastScore = hasContrast ? 5 : 0;
  const readingToolsScore = hasReadingTools ? 5 : 0;

  const totalScore = calculateAccessibilityScore(state);

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

      {/* Quick Actions */}
      <motion.div variants={fadeUp} className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => updateSetting("fontFamily", state.fontFamily === "readable" ? "default" : "readable")}
            className={`rounded-2xl py-3.5 px-3 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border-2 ${
              state.fontFamily === "readable" ? 'border-[#0091ff] bg-sky-50/80 text-blue-950 shadow-sm scale-[1.01]' : 'bg-white border-[#cbe2ff] text-slate-800 hover:border-[#0091ff] hover:shadow-sm'
            }`}
          >
            <span className="text-2xl font-black text-[#0091ff] leading-none">Aa</span>
            <span className="text-xs font-bold text-[#262626] text-center">Readable Font</span>
          </button>
          
          <button 
            onClick={() => updateSetting("textAlignment", state.textAlignment === "center" ? "default" : "center")}
            className={`rounded-2xl py-3.5 px-3 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border-2 ${
              state.textAlignment === "center" ? 'border-[#0091ff] bg-sky-50/80 text-blue-950 shadow-sm scale-[1.01]' : 'bg-white border-[#cbe2ff] text-slate-800 hover:border-[#0091ff] hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-center h-6">
              <svg width="26" height="21" viewBox="0 0 34 28" fill="none">
                <rect x="10" y="1" width="14" height="4.5" rx="2.25" fill="#0091ff" />
                <rect x="3" y="8.5" width="28" height="4.5" rx="2.25" fill="#0091ff" />
                <rect x="7" y="16" width="20" height="4.5" rx="2.25" fill="#0091ff" />
                <rect x="3" y="23.5" width="28" height="4.5" rx="2.25" fill="#0091ff" />
              </svg>
            </div>
            <span className="text-xs font-bold text-[#262626] text-center leading-tight">Center Aligned</span>
          </button>

          <button 
            onClick={() => updateSetting("isHighContrast", !state.isHighContrast)}
            className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-[20px] border transition-all ${state.isHighContrast ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'}`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold">High Contrast</span>
          </button>
          
          <button 
            onClick={() => updateSetting("readingMask", !state.readingMask)}
            className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-[20px] border transition-all ${state.readingMask ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'}`}
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
