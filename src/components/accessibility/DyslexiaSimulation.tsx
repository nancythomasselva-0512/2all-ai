"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  MessageSquarePlus, 
  Type, 
  Link as LinkIcon, 
  AlignCenter, 
  ArrowUp,
  RotateCcw,
  EyeOff,
  Sparkles,
  Check,
  Info,
  Sliders,
  CheckCircle2
} from "lucide-react";

interface CharacterTransform {
  translateX: number;
  translateY: number;
  rotate: number;
  opacity: number;
  blur: boolean;
  swappedChar?: string;
}

const SAMPLE_TEXT = 
  "The Global Rainbow Foundation (GRF) is a charitable trust founded by Prof. Armoogum Parsuramen G.O.S.K. in Mauritius on the 11th November 2011. The aim of the organisation is to serve the most vulnerable groups especially persons with different types of disabilities. Driven by the vision of the Founder, the activities of the organisation are oriented towards educating, enabling, and empowering Persons with Disabilities while advocating for their rights.";

export default function DyslexiaSimulation() {
  // Toggle states
  const [isDyslexiaActive, setIsDyslexiaActive] = useState(true);
  const [isOptimizedMode, setIsOptimizedMode] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  // Widget option states
  const [isTextMagnifier, setIsTextMagnifier] = useState(false);
  const [isReadableFont, setIsReadableFont] = useState(false);
  const [isHighlightLinks, setIsHighlightLinks] = useState(false);
  const [isCenterAligned, setIsCenterAligned] = useState(false);

  // Character jitter map: index -> transform object
  const [charTransforms, setCharTransforms] = useState<Map<number, CharacterTransform>>(new Map());
  
  // Animation ref & reduced motion check
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Core Dyslexia Jitter Animation Effect
  useEffect(() => {
    // Stop animation if disabled, panel hidden, or user prefers reduced motion
    const prefersReducedMotion = 
      typeof window !== "undefined" && 
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDyslexiaActive || prefersReducedMotion) {
      setCharTransforms(new Map());
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Animation Tick (~200ms)
    intervalRef.current = setInterval(() => {
      const nextMap = new Map<number, CharacterTransform>();
      const chars = SAMPLE_TEXT.split("");
      const totalChars = chars.length;

      // Select ~8-12% of characters to jitter randomly on each tick
      const jitterCount = Math.floor(totalChars * 0.1);

      for (let i = 0; i < jitterCount; i++) {
        const randomIndex = Math.floor(Math.random() * totalChars);
        const char = chars[randomIndex];

        // Skip whitespace characters from transform jitter to maintain layout stability
        if (char === " " || char === "\n") continue;

        // Determine subtle random jitter parameters
        const translateX = (Math.random() - 0.5) * 4; // -2px to +2px
        const translateY = (Math.random() - 0.5) * 4; // -2px to +2px
        const rotate = (Math.random() - 0.5) * 6;     // -3deg to +3deg
        const opacity = Math.random() < 0.25 ? 0.65 : 1;
        const blur = Math.random() < 0.15;

        // Occasional neighbor letter swap simulation (visual swap)
        let swappedChar: string | undefined = undefined;
        if (Math.random() < 0.1 && randomIndex < totalChars - 1) {
          const nextChar = chars[randomIndex + 1];
          if (nextChar && nextChar !== " ") {
            swappedChar = nextChar;
          }
        }

        nextMap.set(randomIndex, {
          translateX,
          translateY,
          rotate,
          opacity,
          blur,
          swappedChar
        });
      }

      setCharTransforms(nextMap);
    }, 220);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDyslexiaActive]);

  // Reset all panel settings
  const handleResetSettings = () => {
    setIsDyslexiaActive(false);
    setIsOptimizedMode(false);
    setIsTextMagnifier(false);
    setIsReadableFont(false);
    setIsHighlightLinks(false);
    setIsCenterAligned(false);
  };

  // Render individual character with jitter transform when active
  const renderInteractiveText = () => {
    return SAMPLE_TEXT.split("").map((char, idx) => {
      const transform = charTransforms.get(idx);

      // Handle spaces cleanly to avoid reflow collapse
      if (char === " ") {
        return (
          <span key={idx} className="inline">
            {" "}
          </span>
        );
      }

      const displayChar = transform?.swappedChar || char;

      if (!isDyslexiaActive || !transform) {
        return (
          <span 
            key={idx} 
            className="inline-block transition-transform duration-150 ease-out"
          >
            {char}
          </span>
        );
      }

      return (
        <span
          key={idx}
          className="inline-block transition-all duration-200 ease-in-out select-none"
          style={{
            transform: `translate(${transform.translateX}px, ${transform.translateY}px) rotate(${transform.rotate}deg)`,
            opacity: transform.opacity,
            filter: transform.blur ? "blur(0.5px)" : "none",
            color: transform.swappedChar ? "#2563eb" : "inherit"
          }}
        >
          {displayChar}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
      {/* Import Required Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Lexend:wght@400;500;600;700&display=swap');

        .font-playfair {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-lexend {
          font-family: 'Lexend', 'OpenDyslexic', sans-serif;
        }
      `}</style>

      {/* Top Banner / Mode Controls */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Accessibility Widget Simulator
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Dyslexia Reading Experience & Remediation Demo
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl">
            Toggle the active profile inside the panel to experience visual text jittering, or test the optimized reader mode.
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80">
          <button
            onClick={() => setIsOptimizedMode(!isOptimizedMode)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
              isOptimizedMode
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isOptimizedMode ? "Optimized Fix Active" : "Enable Dyslexia Fix"}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      <div className="relative min-h-[580px] bg-slate-100 rounded-3xl p-6 md:p-12 overflow-hidden border border-slate-200/80 shadow-inner flex flex-col justify-between">
        
        {/* Decorative subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />

        {/* Main Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 relative z-10 items-start">
          
          {/* LEFT SIDE CONTENT SECTION */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Serif Heading (2 lines, dark navy #1a2b4a) */}
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-[#1a2b4a] leading-[1.15] tracking-tight">
              Serving People With<br />Disabilities
            </h1>

            {/* Paragraph Section with Jitter Simulation or Optimized Fix */}
            <div 
              className={`p-6 md:p-8 rounded-2xl transition-all duration-300 border ${
                isOptimizedMode 
                  ? "bg-[#FDF6E3] border-amber-200 text-[#1a2b4a] font-lexend shadow-md" 
                  : "bg-white border-slate-200/70 text-[#1a2b4a] font-sans shadow-sm"
              } ${isCenterAligned ? "text-center" : "text-left"}`}
              style={{
                fontFamily: isOptimizedMode ? "'Lexend', 'OpenDyslexic', sans-serif" : "Arial, Helvetica, sans-serif",
                letterSpacing: isOptimizedMode ? "0.05em" : isDyslexiaActive ? "0.02em" : "normal",
                wordSpacing: isOptimizedMode ? "0.15em" : "normal",
                lineHeight: isOptimizedMode ? 1.8 : 1.7,
                fontSize: isTextMagnifier ? "1.25rem" : "1.05rem"
              }}
            >
              {/* Highlight Links indicator demo */}
              {isHighlightLinks && (
                <div className="mb-4 inline-block bg-yellow-300 text-black px-2.5 py-1 rounded font-bold text-xs underline decoration-2">
                  🔗 Link Highlight Mode Active
                </div>
              )}

              <p className="whitespace-normal leading-relaxed text-[#1a2b4a] text-lg select-none">
                {renderInteractiveText()}
              </p>

              {/* Status Badge */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className={`w-2 h-2 rounded-full ${isDyslexiaActive ? "bg-blue-600 animate-pulse" : "bg-slate-400"}`} />
                  {isDyslexiaActive ? "Dyslexia Jitter Active (Demonstrating Reading Difficulty)" : "Normal Reading View"}
                </span>

                {isOptimizedMode && (
                  <span className="bg-amber-200/80 text-amber-900 px-2.5 py-1 rounded-full font-bold">
                    ✨ Dyslexia-Optimized Typography Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FLOATING ACCESSIBILITY PANEL */}
          {isPanelVisible && (
            <div className="lg:col-span-4 relative lg:-ml-12 z-20">
              <div className="bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 max-w-sm w-full relative overflow-hidden">
                
                {/* Blue scrollbar indicator on right edge */}
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#2d8fd5] rounded-r-2xl" />

                {/* Panel Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    Accessibility
                  </h3>
                  
                  {/* Yellow Circular X Close Button */}
                  <button
                    onClick={() => setIsPanelVisible(false)}
                    className="w-7 h-7 bg-amber-300 hover:bg-amber-400 text-slate-900 rounded-full font-bold text-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    aria-label="Close Accessibility Panel"
                  >
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                {/* 2-Column Grid Layout Controls */}
                <div className="space-y-3">
                  
                  {/* Row 1: Text Magnifier (Full Width) */}
                  <button
                    onClick={() => setIsTextMagnifier(!isTextMagnifier)}
                    className={`w-full p-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      isTextMagnifier
                        ? "bg-[#2d8fd5] text-white border-[#2d8fd5] shadow-md shadow-blue-500/20"
                        : "bg-blue-50/40 border-blue-400/60 text-[#2d8fd5] hover:bg-blue-50"
                    }`}
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Text Magnifier</span>
                  </button>

                  {/* Row 2: Readable Font | Dyslexia Friendly */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsReadableFont(!isReadableFont)}
                      className={`p-3 rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        isReadableFont
                          ? "bg-[#2d8fd5] text-white border-[#2d8fd5] shadow-md shadow-blue-500/20"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Type className="w-4 h-4" />
                      <span>Readable Font</span>
                    </button>

                    {/* DYSLEXIA FRIENDLY TOGGLE BUTTON (Active by default) */}
                    <button
                      onClick={() => setIsDyslexiaActive(!isDyslexiaActive)}
                      className={`p-3 rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        isDyslexiaActive
                          ? "bg-[#2d8fd5] text-white border-[#2d8fd5] shadow-lg shadow-blue-500/30 ring-2 ring-blue-300"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Type className="w-4 h-4" />
                        {isDyslexiaActive && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>Dyslexia Friendly</span>
                    </button>
                  </div>

                  {/* Row 3: Highlight Links | Center Aligned */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsHighlightLinks(!isHighlightLinks)}
                      className={`p-3 rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        isHighlightLinks
                          ? "bg-[#2d8fd5] text-white border-[#2d8fd5] shadow-md shadow-blue-500/20"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Highlight Links</span>
                    </button>

                    <button
                      onClick={() => setIsCenterAligned(!isCenterAligned)}
                      className={`p-3 rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        isCenterAligned
                          ? "bg-[#2d8fd5] text-white border-[#2d8fd5] shadow-md shadow-blue-500/20"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <AlignCenter className="w-4 h-4" />
                      <span>Center Aligned</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Action Buttons (Two Yellow Rounded-Full Buttons) */}
                <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-slate-100">
                  <button
                    onClick={handleResetSettings}
                    className="bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-xs py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Settings
                  </button>

                  <button
                    onClick={() => setIsPanelVisible(false)}
                    className="bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-xs py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    Hide Forever
                  </button>
                </div>

                {/* Small Yellow Circular Scroll-Up Arrow Button */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="absolute bottom-3 right-3 w-7 h-7 bg-amber-300 hover:bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold shadow-sm transition-colors cursor-pointer"
                  aria-label="Scroll to top"
                  title="Scroll to top"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM-LEFT CIRCULAR BLUE ACCESSIBILITY BUTTON */}
        <div className="absolute bottom-6 left-6 z-30">
          <button
            onClick={() => setIsPanelVisible(!isPanelVisible)}
            className="w-14 h-14 bg-[#2d8fd5] hover:bg-[#257ab7] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white transition-all transform hover:scale-105 cursor-pointer group"
            aria-label="Toggle Accessibility Panel"
            title="Toggle Accessibility Panel"
          >
            {/* Wheelchair SVG Icon */}
            <svg 
              className="w-7 h-7 fill-current" 
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="4" r="2" />
              <path d="M19 13h-4.2l-1.4-3.5C13.1 8.8 12.3 8 11.3 8H9c-1.1 0-2 .9-2 2v7h2v-5h1.5l1.6 4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-1h3.3l1.8 3.6c.4.8 1.2 1.4 2.1 1.4h2.8v-2h-2.8l-1.2-2.4 1.8-4.6H19v-2zM8 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
