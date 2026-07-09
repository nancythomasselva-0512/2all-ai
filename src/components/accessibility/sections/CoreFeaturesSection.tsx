"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { 
  Type, AlignLeft, Search, Link, MousePointer2,
  Video, Maximize, Target, Hash, Expand, BetweenHorizonalEnd
} from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function CoreFeaturesSection({ searchQuery }: { searchQuery: string }) {
  const { state, updateSetting } = useAccessibility();

  const groups = [
    {
      title: "Typography",
      items: [
        { 
          id: "fontSize", label: "Font Size", type: "range", 
          min: 90, max: 200, step: 10, value: state.fontSize,
          icon: <Type className="w-4 h-4" />, suffix: "%"
        },
        { 
          id: "letterSpacing", label: "Letter Spacing", type: "range", 
          min: 0, max: 5, step: 0.5, value: state.letterSpacing,
          icon: <AlignLeft className="w-4 h-4" />, suffix: "px"
        },
        { 
          id: "wordSpacing", label: "Word Spacing", type: "range", 
          min: 0, max: 2, step: 0.1, value: state.wordSpacing,
          icon: <BetweenHorizonalEnd className="w-4 h-4" />, suffix: "em"
        },
        { 
          id: "lineHeight", label: "Line Height", type: "range", 
          min: 1, max: 3, step: 0.1, value: state.lineHeight,
          icon: <Expand className="w-4 h-4" />, suffix: "x"
        },
        { 
          id: "fontFamily", label: "Readable Fonts", type: "select",
          value: state.fontFamily,
          options: [
            { value: "default", label: "Default" },
            { value: "dyslexic", label: "OpenDyslexic" },
            { value: "lexend", label: "Lexend" },
            { value: "readable", label: "Readable (Verdana)" },
          ]
        }
      ]
    },
    {
      title: "Reading & Focus",
      items: [
        { id: "readingMask", label: "Reading Mask", type: "toggle", value: state.readingMask, icon: <Maximize className="w-5 h-5" /> },
        { id: "readingRuler", label: "Reading Ruler", type: "toggle", value: state.readingRuler, icon: <Target className="w-5 h-5" /> },
      ]
    },
    {
      title: "Highlights",
      items: [
        { id: "highlightLinks", label: "Highlight Links", type: "toggle", value: state.highlightLinks, icon: <Link className="w-5 h-5" /> },
        { id: "highlightHeadings", label: "Highlight Headings", type: "toggle", value: state.highlightHeadings, icon: <Hash className="w-5 h-5" /> },
        { id: "highlightButtons", label: "Highlight Buttons", type: "toggle", value: state.highlightButtons, icon: <MousePointer2 className="w-5 h-5" /> },
      ]
    },
    {
      title: "Interaction",
      items: [
        { id: "reduceMotion", label: "Reduce Motion", type: "toggle", value: state.reduceMotion, icon: <Video className="w-5 h-5" /> },
        { 
          id: "cursorSize", label: "Cursor Size", type: "select", value: state.cursorSize, icon: <MousePointer2 className="w-5 h-5" />,
          options: [
            { value: "normal", label: "Normal" },
            { value: "large", label: "Large" },
            { value: "huge", label: "Huge" },
          ]
        }
      ]
    }
  ];

  const filterItems = (items: any[]) => items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGroups = groups.map(g => ({ ...g, items: filterItems(g.items) })).filter(g => g.items.length > 0);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8 pb-10">
      
      {filteredGroups.length === 0 && (
        <div className="text-center py-10 text-slate-400 text-sm">No features found for "{searchQuery}"</div>
      )}

      {filteredGroups.map((group, gIdx) => (
        <motion.div key={gIdx} variants={fadeUp} className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{group.title}</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {group.items.map((item, iIdx) => {
              
              if (item.type === "toggle") {
                const isActive = item.value as boolean;
                return (
                  <button
                    key={item.id}
                    onClick={() => updateSetting(item.id as any, !isActive)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'}`}
                  >
                    {item.icon}
                    <span className="text-[11px] font-bold text-center leading-tight">{item.label}</span>
                  </button>
                );
              }

              if (item.type === "range") {
                return (
                  <div key={item.id} className="col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#0a1e3f]">
                        {item.icon} {item.label}
                      </div>
                      <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
                        {item.value}{item.suffix}
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min={item.min} max={item.max} step={item.step}
                      value={item.value as number}
                      onChange={(e) => updateSetting(item.id as any, parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>
                );
              }

              if (item.type === "select") {
                return (
                  <div key={item.id} className="col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-3 text-sm font-bold text-[#0a1e3f]">
                      {item.label}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {item.options?.map((opt: any) => (
                        <button
                          key={opt.value}
                          onClick={() => updateSetting(item.id as any, opt.value)}
                          className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${item.value === opt.value ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              
              return null;
            })}
          </div>
        </motion.div>
      ))}

    </motion.div>
  );
}
