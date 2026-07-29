"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, Info, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PageHelpTooltipProps {
  title: string;
  purpose: string;
  features: string[];
}

export default function PageHelpTooltip({ title, purpose, features }: PageHelpTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex items-center ml-2 z-30 select-none" ref={popoverRef}>
      {/* Help Icon Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 transition-all cursor-pointer shadow-xs group focus:outline-none"
        title={`Why is ${title} here? Click for info`}
        aria-label="Page info and purpose"
      >
        <HelpCircle className="w-3.5 h-3.5 stroke-[2.5] group-hover:scale-110 transition-transform" />
      </button>

      {/* Animated Floating Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200/90 z-50 text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Info className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  About {title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Purpose */}
            <div className="mb-4">
              <span className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                Why this page is here:
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {purpose}
              </p>
            </div>

            {/* Features / Capabilities */}
            <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                What you can do on this page:
              </span>
              <ul className="space-y-2">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-semibold leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
