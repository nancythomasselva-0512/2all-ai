"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { 
  LayoutDashboard, UserCircle, Settings2, 
  Palette, Bot, Search, RefreshCcw, X
} from "lucide-react";

// Sections
import DashboardSection from "./sections/DashboardSection";
import ProfilesSection from "./sections/ProfilesSection";
import CoreFeaturesSection from "./sections/CoreFeaturesSection";
import ColorVisionSection from "./sections/ColorVisionSection";
import AIAssistantSection from "./sections/AIAssistantSection";

type Tab = "dashboard" | "profiles" | "features" | "vision" | "ai";

// Searchable keywords for each tab — used to auto-switch tabs on search
const tabKeywords: Record<Tab, string[]> = {
  dashboard: [],
  profiles: [
    "dyslexia", "adhd", "low vision", "screen reader", "blind", "cognitive",
    "reading mode", "night mode", "seizure", "motor", "keyboard", "profile"
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
    "high contrast", "dark", "light"
  ],
  ai: ["ai", "assistant", "chat", "help", "recommend", "auto"]
};

function findBestTab(query: string): Tab | null {
  const q = query.toLowerCase();
  const order: Tab[] = ["features", "vision", "profiles", "ai"];
  for (const tab of order) {
    if (tabKeywords[tab].some(kw => kw.includes(q) || q.includes(kw))) {
      return tab;
    }
  }
  return null;
}

export default function AccessibilityPanel() {
  const { resetSettings } = useAccessibility();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [manualTab, setManualTab] = useState(false);

  const tabs = [
    { id: "dashboard", icon: LayoutDashboard, label: "Home" },
    { id: "profiles", icon: UserCircle, label: "Profiles" },
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
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-3rem)] h-[650px] max-h-[calc(100vh-8rem)] z-[99998] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 bg-white/90 backdrop-blur-2xl flex flex-col font-sans"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-200/50 shrink-0 bg-white/50 backdrop-blur-md relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-[#0a1e3f] tracking-tight">Accessibility Center</h2>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mt-0.5">Powered by AI</p>
          </div>
          <button 
            onClick={resetSettings}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white hover:bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search accessibility features..." 
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-white/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-9 text-sm font-semibold text-[#0a1e3f] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Show which tab we auto-navigated to during search */}
        {searchQuery && (
          <p className="text-[10px] text-blue-500 font-semibold mt-2 px-1">
            Showing results in{" "}
            <span className="font-black capitalize">
              {tabs.find(t => t.id === activeTab)?.label ?? activeTab}
            </span>{" "}
            tab — click any tab to switch manually
          </p>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="p-6">
          {activeTab === "dashboard" && <DashboardSection setActiveTab={setActiveTab} searchQuery={searchQuery} />}
          {activeTab === "profiles" && <ProfilesSection searchQuery={searchQuery} />}
          {activeTab === "features" && <CoreFeaturesSection searchQuery={searchQuery} />}
          {activeTab === "vision" && <ColorVisionSection searchQuery={searchQuery} />}
          {activeTab === "ai" && <AIAssistantSection />}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="shrink-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-2 relative z-10">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as Tab)}
                className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl relative transition-all duration-300 ${isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="a11y-nav-bg"
                    className="absolute inset-0 bg-blue-50 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon className={`w-5 h-5 mb-1 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                <span className={`text-[10px] ${isActive ? "font-bold" : "font-semibold"}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
