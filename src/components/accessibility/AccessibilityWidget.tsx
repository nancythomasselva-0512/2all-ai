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

  useEffect(() => {
    setMounted(true);
    
    // Track mouse for reading mask/ruler
    const handleMouseMove = (e: MouseEvent) => {
      if (state.readingMask || state.readingRuler) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [state.readingMask, state.readingRuler]);

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

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        onClick={togglePanel}
        className="fixed bottom-6 right-6 z-[99999] w-14 h-14 bg-[#004bff] hover:bg-[#003edd] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,75,255,0.4)] transition-colors group border-2 border-white/20"
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
    </>
  );
}
