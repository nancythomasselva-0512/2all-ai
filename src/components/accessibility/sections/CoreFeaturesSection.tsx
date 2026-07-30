"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { 
  Type, AlignLeft, AlignCenter, Search, Link, MousePointer2,
  Video, Maximize, Target, Hash, Expand, BetweenHorizonalEnd,
  MonitorSpeaker, ShieldAlert, Play, Pause, Square, Settings, BookOpen,
  MessageSquarePlus, Minus, Plus, Mic
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
      title: "Typography & Alignment",
      items: [
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
        },
        { 
          id: "textAlignment", label: "Text Alignment", type: "select",
          value: state.textAlignment,
          options: [
            { value: "default", label: "Default" },
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "justify", label: "Justify" },
          ]
        }
      ]
    },
    {
      title: "Color & Contrast Adjustments",
      items: [
        {
          id: "monochrome",
          label: "Monochrome Mode",
          type: "toggle",
          value: state.saturationMode === "monochrome",
          onClick: () => updateSetting("saturationMode", state.saturationMode === "monochrome" ? "normal" : "monochrome"),
          icon: <Video className="w-5 h-5" />
        },
        {
          id: "darkMode",
          label: "Dark Contrast Mode",
          type: "toggle",
          value: state.isDarkMode || state.isHighContrast,
          onClick: () => {
            const next = !(state.isDarkMode || state.isHighContrast);
            updateSetting("isDarkMode", next);
            updateSetting("isHighContrast", next);
            updateSetting("isLightMode", false);
          },
          icon: <Target className="w-5 h-5" />
        }
      ]
    },
    {
      title: "🔊 Speech & Reading",
      items: [
        {
          id: "readSelectedText",
          label: "Read Selected Text",
          type: "action",
          onClick: () => {
            if (typeof window !== "undefined" && (window as any).__a11yStartSelectedReading) {
              (window as any).__a11yStartSelectedReading();
            }
          },
          icon: <Play className="w-5 h-5 text-blue-600" />
        },
        {
          id: "autoReadSelection",
          label: "Auto Read Selection",
          type: "toggle",
          value: state.autoReadSelection,
          icon: <MousePointer2 className="w-5 h-5" />
        },
        {
          id: "readEntirePage",
          label: "Read Entire Page",
          type: "action",
          onClick: () => {
            if (typeof window !== "undefined" && (window as any).__a11yStartPageReading) {
              (window as any).__a11yStartPageReading();
            }
          },
          icon: <BookOpen className="w-5 h-5 text-blue-600" />
        },
        {
          id: "pauseReading",
          label: "Pause Reading",
          type: "action",
          onClick: () => {
            if (typeof window !== "undefined" && (window as any).__a11yPauseReading) {
              (window as any).__a11yPauseReading();
            }
          },
          icon: <Pause className="w-5 h-5 text-amber-600" />,
          disabled: state.speechStatus !== "playing"
        },
        {
          id: "resumeReading",
          label: "Resume Reading",
          type: "action",
          onClick: () => {
            if (typeof window !== "undefined" && (window as any).__a11yResumeReading) {
              (window as any).__a11yResumeReading();
            }
          },
          icon: <Play className="w-5 h-5 text-emerald-600" />,
          disabled: state.speechStatus !== "paused"
        },
        {
          id: "stopReading",
          label: "Stop Reading",
          type: "action",
          onClick: () => {
            if (typeof window !== "undefined" && (window as any).__a11yStopReading) {
              (window as any).__a11yStopReading();
            }
          },
          icon: <Square className="w-5 h-5 text-rose-600" />,
          disabled: state.speechStatus === "stopped"
        },
        {
          id: "highlightWord",
          label: "Highlight Word",
          type: "toggle",
          value: state.highlightWord,
          icon: <Target className="w-5 h-5" />
        },
        {
          id: "highlightSentence",
          label: "Highlight Sentence",
          type: "toggle",
          value: state.highlightSentence,
          icon: <Hash className="w-5 h-5" />
        },
        {
          id: "autoScroll",
          label: "Auto Scroll",
          type: "toggle",
          value: state.autoScroll,
          icon: <Expand className="w-5 h-5" />
        },
        {
          id: "voiceSettings",
          label: "Voice Settings",
          type: "action",
          onClick: () => updateSetting("isVoiceSettingsOpen", true),
          icon: <Settings className="w-5 h-5 text-slate-600" />
        },
        {
          id: "voiceNavigation",
          label: "Voice Navigation",
          type: "toggle",
          value: state.voiceNavigation,
          icon: <Mic className="w-5 h-5 text-blue-600" />
        }
      ]
    },
    {
      title: "Reading, Focus & Assistive Reading",
      items: [
        { id: "readingMask", label: "Reading Mask", type: "toggle", value: state.readingMask, icon: <Maximize className="w-5 h-5" /> },
        { id: "readingRuler", label: "Reading Ruler", type: "toggle", value: state.readingRuler, icon: <Target className="w-5 h-5" /> },
        { id: "textToSpeech", label: "Read Aloud (TTS)", type: "toggle", value: state.textToSpeech, icon: <MonitorSpeaker className="w-5 h-5" /> },
      ]
    },
    {
      title: "Highlights & Outlines",
      items: [
        { id: "highlightLinks", label: "Highlight Links", type: "toggle", value: state.highlightLinks, icon: <Link className="w-5 h-5" /> },
        { id: "highlightHeadings", label: "Highlight Headings", type: "toggle", value: state.highlightHeadings, icon: <Hash className="w-5 h-5" /> },
        { id: "highlightButtons", label: "Highlight Buttons", type: "toggle", value: state.highlightButtons, icon: <MousePointer2 className="w-5 h-5" /> },
        { id: "highlightFocus", label: "Focus Highlight", type: "toggle", value: state.highlightFocus, icon: <ShieldAlert className="w-5 h-5" /> },
      ]
    },
    {
      title: "Navigation & Saturation",
      items: [
        { id: "reduceMotion", label: "Reduce Motion", type: "toggle", value: state.reduceMotion, icon: <Video className="w-5 h-5" /> },
        { 
          id: "cursorSize", label: "Cursor Size", type: "select", value: state.cursorSize, icon: <MousePointer2 className="w-5 h-5" />,
          options: [
            { value: "normal", label: "Normal" },
            { value: "large", label: "Large" },
            { value: "huge", label: "Huge" },
          ]
        },
        { 
          id: "saturationMode", label: "Saturation Control", type: "select", value: state.saturationMode, icon: <Target className="w-5 h-5" />,
          options: [
            { value: "normal", label: "Normal" },
            { value: "high", label: "High" },
            { value: "low", label: "Low" },
            { value: "monochrome", label: "Monochrome" },
          ]
        }
      ]
    }
  ];

  const filterItems = (items: any[]) => items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGroups = groups.map(g => ({ ...g, items: filterItems(g.items) })).filter(g => g.items.length > 0);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 pb-10">
      
      {/* Readable Experience Section (Matching User Reference Images) */}
      {(!searchQuery || "readable experience content scaling text magnifier readable font center aligned".includes(searchQuery.toLowerCase())) && (
        <motion.div variants={fadeUp} className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 px-1">Readable Experience</h3>

          {/* Card 1: Content Scaling */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:border-slate-300 transition-all">
            <span className="text-xs font-bold text-slate-900">Content Scaling</span>
            <div className="flex items-center justify-between w-full max-w-[220px] px-2">
              {/* Minus Button */}
              <button
                onClick={() => updateSetting("fontSize", Math.max(90, state.fontSize - 10))}
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg flex items-center justify-center border border-blue-500 shadow-md shadow-blue-500/20 cursor-pointer transition-all active:scale-95"
                aria-label="Decrease content scaling"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Center Label */}
              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                {state.fontSize === 100 ? "Default" : `${state.fontSize}%`}
              </span>

              {/* Plus Button */}
              <button
                onClick={() => updateSetting("fontSize", Math.min(200, state.fontSize + 10))}
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg flex items-center justify-center border border-blue-500 shadow-md shadow-blue-500/20 cursor-pointer transition-all active:scale-95"
                aria-label="Increase content scaling"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Card 2: Text Magnifier */}
          <button
            onClick={() => updateSetting("textMagnifier", !state.textMagnifier)}
            className={`w-full rounded-2xl p-3.5 flex items-center justify-center gap-3 transition-all cursor-pointer select-none ${
              state.textMagnifier 
                ? 'border-2 border-blue-500 bg-blue-50/80 text-blue-900 shadow-md shadow-blue-500/10' 
                : 'border border-slate-200/80 bg-white text-slate-800 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-colors ${
              state.textMagnifier ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'
            }`}>
              <MessageSquarePlus className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs font-bold">Text Magnifier</span>
          </button>

          {/* Card 3 & 4 Grid: Readable Font (Aa) & Center Aligned (Small Boxes) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Card 3: Readable Font (Aa) */}
            <button
              onClick={() => updateSetting("fontFamily", state.fontFamily === "readable" ? "default" : "readable")}
              className={`rounded-2xl py-3.5 px-3 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none border-2 ${
                state.fontFamily === "readable"
                  ? 'border-[#0091ff] bg-sky-50/80 text-blue-950 shadow-sm scale-[1.01]' 
                  : 'border-[#cbe2ff] bg-white text-slate-800 hover:border-[#0091ff] hover:shadow-sm'
              }`}
            >
              <span className="text-2xl font-black text-[#0091ff] tracking-tight leading-none">
                Aa
              </span>
              <span className="text-xs font-bold text-[#262626] text-center">
                Readable Font
              </span>
            </button>

            {/* Card 4: Center Aligned */}
            <button
              onClick={() => updateSetting("textAlignment", state.textAlignment === "center" ? "default" : "center")}
              className={`rounded-2xl py-3.5 px-3 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none border-2 ${
                state.textAlignment === "center"
                  ? 'border-[#0091ff] bg-sky-50/80 text-blue-950 shadow-sm scale-[1.01]' 
                  : 'border-[#cbe2ff] bg-white text-slate-800 hover:border-[#0091ff] hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-center h-6">
                <svg width="26" height="21" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="1" width="14" height="4.5" rx="2.25" fill="#0091ff" />
                  <rect x="3" y="8.5" width="28" height="4.5" rx="2.25" fill="#0091ff" />
                  <rect x="7" y="16" width="20" height="4.5" rx="2.25" fill="#0091ff" />
                  <rect x="3" y="23.5" width="28" height="4.5" rx="2.25" fill="#0091ff" />
                </svg>
              </div>
              <div className="text-xs font-bold text-[#262626] text-center leading-tight">
                Center<br />Aligned
              </div>
            </button>
          </div>
        </motion.div>
      )}

      {filteredGroups.length === 0 && searchQuery && (
        <div className="text-center py-10 text-slate-400 text-sm">No features found for "{searchQuery}"</div>
      )}

      {filteredGroups.map((group, gIdx) => (
        <motion.div key={gIdx} variants={fadeUp} className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{group.title}</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {group.items.map((item) => {
              
              if (item.type === "action") {
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300 active:bg-slate-100 ${item.disabled ? 'opacity-40 cursor-not-allowed hover:border-slate-200' : 'cursor-pointer'}`}
                  >
                    {item.icon}
                    <span className="text-[11px] font-bold text-center leading-tight">{item.label}</span>
                  </button>
                );
              }

              if (item.type === "toggle") {
                const isActive = item.value as boolean;
                return (
                  <button
                    key={item.id}
                    onClick={() => (item.onClick ? item.onClick() : updateSetting(item.id as any, !isActive))}
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
