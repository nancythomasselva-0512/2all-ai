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
  const { state, resetSettings, togglePanel } = useAccessibility();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [manualTab, setManualTab] = useState(false);

  const currentScore = calculateAccessibilityScore(state);

  const tabs = [
    { id: "dashboard", icon: LayoutDashboard, label: "Home" },
    { id: "profiles", icon: UserCircle, label: "Modes" },
    { id: "features", icon: Settings2, label: "Features" },
    { id: "vision", icon: Palette, label: "Vision" },
    { id: "ai", icon: Bot, label: "AI Assist" },
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

  return (
    <motion.div
      id="accessibility-panel"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-20 right-4 sm:right-6 w-[360px] sm:w-[380px] h-[510px] max-h-[calc(100vh-6rem)] z-[2147483648] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-slate-200/90 bg-white backdrop-blur-xl flex flex-col font-sans select-none"
    >
      {/* Compact Header with Live Accessibility Score Badge */}
      <div className="px-4 pt-3.5 pb-2.5 border-b border-slate-100 shrink-0 bg-white relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-none">Accessibility</h2>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Accessibility modes</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Live Score Pill in Header */}
            <div className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-xs border transition-all ${
              currentScore === 100 
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-400/30" 
                : currentScore >= 85 
                  ? "bg-blue-50 text-blue-700 border-blue-300" 
                  : "bg-slate-100 text-slate-700 border-slate-200"
            }`}>
              <span className={`w-2 h-2 rounded-full ${currentScore === 100 ? "bg-emerald-500 animate-ping" : "bg-blue-600 animate-pulse"}`} />
              Score: {currentScore}/100
            </div>

            <button 
              onClick={togglePanel}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center border border-slate-200/80 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Close panel"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Compact Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search accessibility features..." 
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-8 text-xs font-medium text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Compact Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-300">
        {activeTab === "profiles" && <ProfilesSection searchQuery={searchQuery} />}
        {activeTab === "dashboard" && <DashboardSection setActiveTab={setActiveTab} searchQuery={searchQuery} />}
        {activeTab === "features" && <CoreFeaturesSection searchQuery={searchQuery} />}
        {activeTab === "vision" && <ColorVisionSection searchQuery={searchQuery} />}
        {activeTab === "ai" && <AIAssistantSection />}
      </div>

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
