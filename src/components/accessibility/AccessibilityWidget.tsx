"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import AccessibilityPanel from "./AccessibilityPanel";

export default function AccessibilityWidget() {
  const pathname = usePathname();
  const { state, togglePanel } = useAccessibility();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [magnifierText, setMagnifierText] = useState("");

  useEffect(() => {
    setMounted(true);
    
    // Track mouse for reading mask/ruler/magnifier
    const handleMouseMove = (e: MouseEvent) => {
      if (state.readingMask || state.readingRuler || state.textMagnifier) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [state.readingMask, state.readingRuler, state.textMagnifier]);

  // Hover Text Magnifier Effect
  useEffect(() => {
    if (!state.textMagnifier) {
      setMagnifierText("");
      return;
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('.fixed.bottom-24.right-6') || target.closest('.fixed.bottom-6.right-6')) return;
      
      const text = target.innerText || target.getAttribute('alt') || target.getAttribute('aria-label');
      if (text && text.trim() && text.length < 300) {
        setMagnifierText(text.trim());
      } else {
        setMagnifierText("");
      }
    };
    
    const handleMouseOut = () => {
      setMagnifierText("");
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [state.textMagnifier]);

  // Text-To-Speech (Read Aloud) Effect
  useEffect(() => {
    if (!state.textToSpeech) return;
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      if (target.closest('.fixed.bottom-24.right-6') || target.closest('.fixed.bottom-6.right-6')) return;
      
      const text = target.innerText || target.getAttribute('alt') || target.getAttribute('aria-label');
      if (text && text.trim()) {
        target.style.outline = "2px dashed #004bff";
        target.style.outlineOffset = "2px";
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        target.style.outline = "";
        target.style.outlineOffset = "";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('.fixed.bottom-24.right-6') || target.closest('.fixed.bottom-6.right-6')) return;

      const text = target.innerText || target.getAttribute('alt') || target.getAttribute('aria-label');
      if (text && text.trim()) {
        e.preventDefault();
        e.stopPropagation();
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text.trim().substring(0, 500));
        window.speechSynthesis.speak(utterance);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("click", handleClick, true);
    
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("click", handleClick, true);
      window.speechSynthesis.cancel();
    };
  }, [state.textToSpeech]);

  // Focus Highlight (Click & Keyboard Focus Ring) Effect
  useEffect(() => {
    if (!state.highlightFocus) {
      document.querySelectorAll(".a11y-focused-target").forEach((el) => {
        el.classList.remove("a11y-focused-target");
      });
      return;
    }

    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest("#accessibility-widget") || target.closest("#accessibility-panel") || target.closest("[id='2all-ai-widget-host']") || target.closest(".alex-chat-popover")) return;

      document.querySelectorAll(".a11y-focused-target").forEach((el) => {
        if (el !== target) el.classList.remove("a11y-focused-target");
      });
      target.classList.add("a11y-focused-target");
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest("#accessibility-widget") || target.closest("#accessibility-panel") || target.closest("[id='2all-ai-widget-host']") || target.closest(".alex-chat-popover")) return;

      const focusable = target.closest("button, a, input, select, textarea, [tabindex], h1, h2, h3, h4, p, li, [role='button']") as HTMLElement || target;
      if (focusable) {
        document.querySelectorAll(".a11y-focused-target").forEach((el) => {
          if (el !== focusable) el.classList.remove("a11y-focused-target");
        });
        focusable.classList.add("a11y-focused-target");
      }
    };

    window.addEventListener("focusin", handleFocus, true);
    window.addEventListener("click", handleClick, true);

    // Immediately highlight the first key CTA button or hero element so user sees it right away!
    const timer = setTimeout(() => {
      const heroBtn = (
        document.querySelector(".btn-premium, button:not(#accessibility-widget *):not(#accessibility-panel *), h1, a.btn, a[href*='demo'], [role='button']") ||
        document.querySelector("h1, h2, main button, main a")
      ) as HTMLElement;
      if (heroBtn && !heroBtn.closest("#accessibility-widget") && !heroBtn.closest("#accessibility-panel") && !heroBtn.closest("[id='2all-ai-widget-host']")) {
        heroBtn.classList.add("a11y-focused-target");
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("focusin", handleFocus, true);
      window.removeEventListener("click", handleClick, true);
      document.querySelectorAll(".a11y-focused-target").forEach((el) => {
        el.classList.remove("a11y-focused-target");
      });
    };
  }, [state.highlightFocus]);

  if (!mounted) return null;

  return (
    <>
      {/* Focus Highlight Active Toast */}
      {state.highlightFocus && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[2147483640] px-5 py-2.5 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/40 text-xs font-black flex items-center gap-2.5 pointer-events-none tracking-wide backdrop-blur-md border border-blue-400/40 transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          Focus Highlight Active — Click any element or press Tab
        </div>
      )}

      {/* Reading Overlays */}
      {state.readingRuler && (
        <div 
          id="a11y-reading-ruler" 
          style={{ display: "block", top: `${mousePos.y}px` }}
        />
      )}
      
      {state.readingMask && (
        <>
          <div 
            id="a11y-reading-mask-top" 
            style={{ display: "block", top: 0, height: `${mousePos.y - 100}px` }}
          />
          <div 
            id="a11y-reading-mask-bottom" 
            style={{ display: "block", top: `${mousePos.y + 100}px`, bottom: 0 }}
          />
        </>
      )}

      {/* Hover text magnifier overlay */}
      {state.textMagnifier && magnifierText && (
        <div 
          className="fixed z-[2147483647] pointer-events-none p-4 rounded-2xl bg-slate-900/95 text-white border border-blue-500/50 shadow-2xl font-sans max-w-sm text-lg font-bold leading-normal transition-all duration-75"
          style={{ 
            top: `${mousePos.y + 25}px`, 
            left: `${mousePos.x + 25}px`,
          }}
        >
          <div className="text-[10px] text-blue-400 mb-1 font-bold uppercase tracking-widest">Accessibility Reader Magnifier</div>
          {magnifierText}
        </div>
      )}

      {/* Floating Button - Always visible at bottom-6 right-6 */}
      <motion.button
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={togglePanel}
        className="fixed bottom-6 right-6 z-[2147483647] w-14 h-14 bg-[#004bff] hover:bg-[#003edd] text-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,75,255,0.45)] transition-colors group border-2 border-white/20 cursor-pointer"
        aria-label="Toggle Accessibility Center"
      >
        <div className="absolute inset-0 rounded-full border border-[#004bff] animate-ping opacity-20 group-hover:opacity-40" />
        <AnimatePresence mode="wait">
          {state.isPanelOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 stroke-[3]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 stroke-[2]"
              >
                <circle cx="12" cy="4" r="2" />
                <path d="M12 6v6" />
                <path d="M6 9h12" />
                <path d="M12 12l-3 9" />
                <path d="M12 12l3 9" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* The Panel */}
      <AnimatePresence>
        {state.isPanelOpen && <AccessibilityPanel />}
      </AnimatePresence>

      {/* SVG Filters for Color Blindness Simulation */}
      <svg 
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }} 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="cb-protanopia" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="cb-deuteranopia" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="cb-tritanopia" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
