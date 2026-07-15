"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import AccessibilityPanel from "./AccessibilityPanel";

export default function AccessibilityWidget() {
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

  if (!mounted) return null;

  return (
    <>
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

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={togglePanel}
        className="fixed bottom-6 right-6 z-[2147483647] w-14 h-14 bg-[#004bff] hover:bg-[#003edd] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,75,255,0.4)] transition-colors group border-2 border-white/20"
        aria-label="Open Accessibility Center"
      >
        <div className="absolute inset-0 rounded-full border border-[#004bff] animate-ping opacity-20 group-hover:opacity-40" />
        <AnimatePresence mode="wait">
          {state.isPanelOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 stroke-[3]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
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
