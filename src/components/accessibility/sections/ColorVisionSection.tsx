"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Moon, Sun, Monitor, Eye } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ColorVisionSection({ searchQuery }: { searchQuery: string }) {
  const { state, updateSetting } = useAccessibility();

  const colorModes = [
    { id: "isHighContrast", label: "High Contrast", icon: <Monitor className="w-5 h-5" /> },
    { id: "isDarkMode", label: "Dark Mode", icon: <Moon className="w-5 h-5" /> },
    { id: "isLightMode", label: "Light Mode", icon: <Sun className="w-5 h-5" /> },
  ];

  const colorBlindModes = [
    { value: "none", label: "None" },
    { value: "protanopia", label: "Protanopia (Red-blind)" },
    { value: "deuteranopia", label: "Deuteranopia (Green-blind)" },
    { value: "tritanopia", label: "Tritanopia (Blue-blind)" },
    { value: "achromatopsia", label: "Achromatopsia (Monochromacy)" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8 pb-10">
      
      {/* Basic Color Modes */}
      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Contrast & Colors</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {colorModes.map((mode) => {
            const isActive = state[mode.id as keyof typeof state] as boolean;
            
            // Exclude from search if it doesn't match
            if (searchQuery && !mode.label.toLowerCase().includes(searchQuery.toLowerCase())) return null;

            return (
              <button
                key={mode.id}
                onClick={() => {
                  // Mutual exclusivity logic for color modes
                  if (mode.id === "isHighContrast") {
                    updateSetting("isHighContrast", !isActive);
                    updateSetting("isDarkMode", false);
                    updateSetting("isLightMode", false);
                  } else if (mode.id === "isDarkMode") {
                    updateSetting("isDarkMode", !isActive);
                    updateSetting("isHighContrast", false);
                    updateSetting("isLightMode", false);
                  } else if (mode.id === "isLightMode") {
                    updateSetting("isLightMode", !isActive);
                    updateSetting("isHighContrast", false);
                    updateSetting("isDarkMode", false);
                  }
                }}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'}`}
              >
                {mode.icon}
                <span className="text-[10px] font-bold text-center leading-tight">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Color Blindness Filters */}
      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Color Blindness Profiles</h3>
        
        <div className="grid grid-cols-1 gap-2">
          {colorBlindModes.map(cb => {
            const isActive = state.colorBlindMode === cb.value;

            if (searchQuery && !cb.label.toLowerCase().includes(searchQuery.toLowerCase())) return null;

            return (
              <button
                key={cb.value}
                onClick={() => updateSetting("colorBlindMode", cb.value as any)}
                className={`w-full text-left flex items-center justify-between p-4 rounded-xl border transition-all ${isActive ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-[#0a1e3f] hover:border-blue-300'}`}
              >
                <div className="flex items-center gap-3">
                  <Eye className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-sm font-bold">{cb.label}</span>
                </div>
                {isActive && (
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </motion.div>

    </motion.div>
  );
}
