"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Moon, EyeOff, Droplet, Sun, Eye } from "lucide-react";

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

  // Clean vertical card list matching user's toggle design reference
  const colorAdjustments = [
    {
      id: "darkContrast",
      label: "Dark Contrast",
      desc: "High contrast mode for maximum text clarity",
      icon: <Moon className="w-5 h-5 stroke-[1.8]" />,
      isActive: state.isDarkMode || state.isHighContrast,
      toggle: () => {
        const next = !(state.isDarkMode || state.isHighContrast);
        updateSetting("isDarkMode", next);
        updateSetting("isHighContrast", next);
        updateSetting("isLightMode", false);
      }
    },
    {
      id: "monochrome",
      label: "Monochrome",
      desc: "Removes colors and displays site in grayscale",
      icon: <EyeOff className="w-5 h-5 stroke-[1.8]" />,
      isActive: state.saturationMode === "monochrome",
      toggle: () => {
        updateSetting("saturationMode", state.saturationMode === "monochrome" ? "normal" : "monochrome");
      }
    },
    {
      id: "highSaturation",
      label: "High Saturation",
      desc: "Enhances color intensity for sharper visibility",
      icon: <Droplet className="w-5 h-5 stroke-[1.8]" />,
      isActive: state.saturationMode === "high",
      toggle: () => {
        updateSetting("saturationMode", state.saturationMode === "high" ? "normal" : "high");
      }
    },
    {
      id: "lowSaturation",
      label: "Low Saturation",
      desc: "Dampens bright colors to reduce visual strain",
      icon: <Sun className="w-5 h-5 stroke-[1.8]" />,
      isActive: state.saturationMode === "low",
      toggle: () => {
        updateSetting("saturationMode", state.saturationMode === "low" ? "normal" : "low");
      }
    }
  ];

  const colorBlindModes = [
    { value: "none", label: "None" },
    { value: "protanopia", label: "Protanopia (Red-blind)" },
    { value: "deuteranopia", label: "Deuteranopia (Green-blind)" },
    { value: "tritanopia", label: "Tritanopia (Blue-blind)" },
    { value: "achromatopsia", label: "Achromatopsia (Monochromacy)" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 pb-8">
      
      {/* Clean Vertical Card List with Toggle Switches (Matching User Screenshot UI) */}
      <motion.div variants={fadeUp} className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Color & Contrast Adjustments</h3>
        
        <div className="space-y-2.5">
          {colorAdjustments.map((item) => {
            if (
              searchQuery && 
              !item.label.toLowerCase().includes(searchQuery.toLowerCase()) && 
              !item.desc.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return null;
            }

            return (
              <motion.div key={item.id} variants={fadeUp}>
                <div
                  onClick={item.toggle}
                  className={`w-full text-left rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden select-none border p-3.5 flex items-center justify-between gap-3 ${
                    item.isActive 
                      ? 'bg-blue-50/90 border-blue-300 shadow-md shadow-blue-500/10' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Left Icon Badge */}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      item.isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.icon}
                    </div>

                    {/* Center Title & Subtitle */}
                    <div>
                      <h4 className={`text-sm font-bold ${item.isActive ? 'text-blue-950' : 'text-slate-900'}`}>
                        {item.label}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  {/* Right Smooth Toggle Switch */}
                  <div className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${item.isActive ? 'bg-blue-600' : 'bg-slate-200'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${item.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Color Blindness Filters */}
      <motion.div variants={fadeUp} className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Color Blindness Profiles</h3>
        
        <div className="grid grid-cols-1 gap-2">
          {colorBlindModes.map(cb => {
            const isActive = state.colorBlindMode === cb.value;

            if (searchQuery && !cb.label.toLowerCase().includes(searchQuery.toLowerCase())) return null;

            return (
              <button
                key={cb.value}
                onClick={() => updateSetting("colorBlindMode", cb.value as any)}
                className={`w-full text-left flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${isActive ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm font-bold' : 'bg-white border-slate-200 text-[#0a1e3f] hover:border-blue-300'}`}
              >
                <div className="flex items-center gap-3">
                  <Eye className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold">{cb.label}</span>
                </div>
                {isActive && (
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

    </motion.div>
  );
}
