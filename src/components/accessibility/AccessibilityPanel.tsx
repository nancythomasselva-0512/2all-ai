"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccessibility, calculateAccessibilityScore } from "@/context/AccessibilityContext";
import { 
  LayoutDashboard, UserCircle, Settings2, 
  Palette, Bot, Search, RefreshCcw, X, EyeOff, ShieldCheck, Zap
} from "lucide-react";

// Sections
import DashboardSection from "./sections/DashboardSection";
import ProfilesSection from "./sections/ProfilesSection";
import CoreFeaturesSection from "./sections/CoreFeaturesSection";
import ColorVisionSection from "./sections/ColorVisionSection";
import AIAssistantSection from "./sections/AIAssistantSection";

type Tab = "dashboard" | "profiles" | "features" | "vision" | "ai";

// Searchable keywords for each tab
const tabKeywords: Record<Tab, string[]> = {
  dashboard: [],
  profiles: [
    "dyslexia", "adhd", "low vision", "screen reader", "blind", "cognitive",
    "reading mode", "night mode", "seizure", "motor", "keyboard", "profile",
    "visually impaired", "epilepsy", "blindness"
  ],
  features: [
    "font", "size", "letter spacing", "word spacing", "line height", "readable",
    "alignment", "text", "speech", "read aloud", "tts", "voice", "magnifier",
    "reading mask", "reading ruler", "highlight", "link", "heading", "button",
    "focus", "motion", "cursor", "saturation", "monochrome"
  ],
  vision: [
    "contrast", "dark mode", "light mode", "color blind", "blue",
    "tritanopia", "protanopia", "deuteranopia", "red blind", "green blind",
    "blue blind", "achromatopsia", "monochromacy", "color", "vision", "colour",
    "high contrast", "dark contrast", "dark", "light", "monochrome", "saturation",
    "high saturation", "low saturation"
  ],
  ai: ["ai", "assistant", "chat", "help", "recommend", "auto"]
};

function findBestTab(query: string): Tab | null {
  const q = query.toLowerCase();
  const order: Tab[] = ["profiles", "features", "vision", "ai"];
  for (const tab of order) {
    if (tabKeywords[tab].some(kw => kw.includes(q) || q.includes(kw))) {
      return tab;
    }
  }
  return null;
}

export default function AccessibilityPanel() {
  const { state, resetSettings, togglePanel, isFeatureEnabled } = useAccessibility();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [manualTab, setManualTab] = useState(false);

  const currentScore = calculateAccessibilityScore(state);

  const tabs = [
    { id: "dashboard", icon: LayoutDashboard, label: "Home" },
    { id: "profiles", icon: UserCircle, label: "Modes" },
    { id: "features", icon: Settings2, label: "Features" },
    { id: "vision", icon: Palette, label: "Vision" },
    ...(isFeatureEnabled("aiAssistant") ? [{ id: "ai", icon: Bot, label: "AI Assist" }] : []),
  ];

  // Auto-switch tab when search query changes
  useEffect(() => {
    if (searchQuery.trim() && !manualTab) {
      const best = findBestTab(searchQuery.trim());
      if (best) setActiveTab(best);
    }
    if (!searchQuery.trim()) {
      setManualTab(false);
    }
  }, [searchQuery, manualTab]);

  const handleTabClick = (tabId: Tab) => {
    setActiveTab(tabId);
    setManualTab(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setManualTab(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setManualTab(false);
  };

  const [showStatementModal, setShowStatementModal] = useState(false);

  return (
    <motion.div
      id="accessibility-panel"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-16 right-4 sm:right-6 w-[420px] sm:w-[460px] h-[620px] max-h-[calc(100vh-4rem)] z-[2147483648] rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.3)] border border-blue-500/20 bg-white backdrop-blur-xl flex flex-col font-sans select-none"
    >
      {/* Top Header with Blue Gradient (Matching Screenshot 1) */}
      <div className="bg-gradient-to-r from-[#0055ff] to-[#0041c2] text-white p-4 pb-3.5 shrink-0 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={togglePanel}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1 text-xs font-bold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full cursor-pointer transition-all border border-white/20">
            <span>🇺🇸 ENGLISH (US)</span>
            <span className="text-[10px]">▼</span>
          </div>
        </div>

        <h2 className="text-xl font-black text-center tracking-tight text-white mb-3">
          Accessibility Adjustments
        </h2>

        {/* 3 Top Action Buttons Matching Screenshot 1 */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={resetSettings}
            className="bg-white text-[#004bff] hover:bg-blue-50 py-1.5 px-2 rounded-full text-[11px] font-bold shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1 border border-blue-100"
          >
            <RefreshCcw className="w-3 h-3 stroke-[2.5]" />
            Reset Settings
          </button>
          
          <button
            onClick={() => setShowStatementModal(true)}
            className="bg-white text-[#004bff] hover:bg-blue-50 py-1.5 px-2 rounded-full text-[11px] font-bold shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1 border border-blue-100"
          >
            <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
            Statement
          </button>
          
          <button
            onClick={togglePanel}
            className="bg-white text-[#004bff] hover:bg-blue-50 py-1.5 px-2 rounded-full text-[11px] font-bold shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1 border border-blue-100"
          >
            <EyeOff className="w-3 h-3 stroke-[2.5]" />
            Hide Interface
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="px-3.5 pt-2.5 pb-1 bg-slate-50 border-b border-slate-200/80">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search accessibility features..." 
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-8 pr-8 text-xs font-medium text-slate-900 outline-none focus:border-blue-500 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-3 space-y-2 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-300">
        {/* Top AI Assistant Banner matching Screenshot 1 */}
        {activeTab === "dashboard" && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/80 border border-blue-200/90 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs mb-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-blue-950">AI Assistant</h4>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">Your personal accessibility assistant</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("ai")}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs cursor-pointer shrink-0"
            >
              Start chat &gt;
            </button>
          </div>
        )}

        {activeTab === "profiles" && <ProfilesSection searchQuery={searchQuery} />}
        {activeTab === "dashboard" && <DashboardSection setActiveTab={setActiveTab} searchQuery={searchQuery} />}
        {activeTab === "features" && <CoreFeaturesSection searchQuery={searchQuery} />}
        {activeTab === "vision" && <ColorVisionSection searchQuery={searchQuery} />}
        {activeTab === "ai" && <AIAssistantSection />}
      </div>

      {/* Statement Modal Overlay */}
      {showStatementModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-3 text-slate-800 relative border border-slate-200">
            <button 
              onClick={() => setShowStatementModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-extrabold text-blue-600 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Accessibility Statement
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              2all.ai is committed to facilitating web accessibility for people with disabilities. We continuously audit and enhance user interfaces according to <strong>WCAG 2.1 Level AA</strong> & <strong>ADA</strong> specifications.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[11px] text-blue-900 font-semibold leading-normal">
              ✅ Fully Compliant with WCAG 2.1 Level AA<br />
              🛡️ ADA & Section 508 Remediated<br />
              ⚡ Real-time Automated & AI Adjustments
            </div>
            <button
              onClick={() => setShowStatementModal(false)}
              className="w-full py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer hover:bg-blue-700"
            >
              Close Statement
            </button>
          </div>
        </div>
      )}

      {/* Compact Bottom Action Bar */}
      <div className="px-3 py-2.5 bg-white border-t border-slate-100 flex items-center justify-center gap-2 shrink-0">
        <button
          onClick={resetSettings}
          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl border-none cursor-pointer shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          Reset Settings
        </button>
        <button
          onClick={togglePanel}
          className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/80 cursor-pointer transition-all active:scale-95 text-center"
        >
          Hide Forever
        </button>
      </div>

      {/* Compact Bottom Navigation */}
      <div className="shrink-0 bg-white border-t border-slate-200/80 p-1 relative z-20 shadow-xs">
        <div className="flex justify-between items-center max-w-xs mx-auto px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as Tab)}
                className={`flex flex-col items-center justify-center w-12 h-10 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "text-blue-600 bg-blue-50/80 font-extrabold" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mb-0.5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                <span className="text-[9.5px] tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
