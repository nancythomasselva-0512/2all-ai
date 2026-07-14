"use client";

import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useTransform, 
  useInView, 
  useReducedMotion, 
  animate 
} from "framer-motion";
import { Check, Accessibility, Sparkles } from "lucide-react";

export default function Showcase() {
  const [phase, setPhase] = useState(0); // 0: Dashboard/Auto-Fix, 1: Mobile scan, 2: Desktop scan
  const [cursorClicked, setCursorClicked] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Scans visibility states
  const [mobileImgFixed, setMobileImgFixed] = useState(false);
  const [mobileTextFixed, setMobileTextFixed] = useState(false);
  const [desktopTitleFixed, setDesktopTitleFixed] = useState(false);
  const [desktopBtnFixed, setDesktopBtnFixed] = useState(false);

  // Framer Motion viewport hooks for Screen 2
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Progress Counter Motion Values
  const progressCount = useMotionValue(0);
  const progressText = useTransform(progressCount, Math.round);

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      const controls = animate(progressCount, 96, {
        delay: 0.3,
        duration: 1.2,
        ease: "easeInOut",
      });
      return controls.stop;
    } else if (shouldReduceMotion) {
      progressCount.set(96);
    }
  }, [isInView, shouldReduceMotion]);

  useEffect(() => {
    const runAnimationLoop = async () => {
      // PHASE 0: Dashboard Auto-Fix
      setPhase(0);
      setCursorClicked(false);
      setShowSparkles(false);
      setMobileImgFixed(false);
      setMobileTextFixed(false);
      setDesktopTitleFixed(false);
      setDesktopBtnFixed(false);

      // 1. Move cursor to button & click
      await delay(1800);
      setCursorClicked(true);
      setShowSparkles(true);

      // PHASE 1: Transition to Mobile and Scan
      await delay(1500);
      setPhase(1);

      // Mobile Image Fix
      await delay(1500);
      setMobileImgFixed(true);

      // Mobile Text Fix
      await delay(1500);
      setMobileTextFixed(true);

      // PHASE 2: Transition to Desktop and Scan
      await delay(2000);
      setPhase(2);

      // Desktop Title Fix
      await delay(1500);
      setDesktopTitleFixed(true);

      // Desktop Button Fix
      await delay(1500);
      setDesktopBtnFixed(true);

      // Wait before resetting
      await delay(3000);
    };

    runAnimationLoop();
    const interval = setInterval(runAnimationLoop, 15000);
    return () => clearInterval(interval);
  }, []);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Motion layout variants for 3 screens
  const getScreenStyles = (screenIndex: number) => {
    // Current active screen in center
    if (phase === screenIndex) {
      return {
        x: "0%",
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
      };
    }

    // Left Screen
    if ((phase === 0 && screenIndex === 1) || (phase === 1 && screenIndex === 2) || (phase === 2 && screenIndex === 0)) {
      return {
        x: -380,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 10,
        filter: "blur(1px)",
      };
    }

    // Right Screen
    return {
      x: 380,
      scale: 0.8,
      opacity: 0.6,
      zIndex: 10,
      filter: "blur(1px)",
    };
  };

  return (
    <section id="diff" className="pt-12 pb-10 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden select-none">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 relative z-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
            See AI Remediation in <span className="text-blue-600">Real-Time</span>
          </h2>
          <p className="text-lg text-slate-500 font-light">
            Watch 2all.ai scan, highlight, and automatically resolve critical accessibility violations across web interfaces instantly.
          </p>
        </div>

        {/* Presentation Stage */}
        <div className="relative w-full h-[620px] flex items-center justify-center overflow-hidden">

          {/* ======================================================== */}
          {/* SCREEN 1: MOBILE SCANNER (Index 1)                      */}
          {/* ======================================================== */}
          <motion.div
            animate={getScreenStyles(1)}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
            className="absolute w-[280px] h-[540px] bg-white border-[10px] border-slate-950 rounded-[44px] shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Top Bar Notch / Speaker */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-40 bg-white">
              <div className="w-24 h-4 bg-slate-950 rounded-b-xl" />
            </div>

            {/* Mobile Header */}
            <div className="pt-8 px-4 pb-2 flex justify-between items-center z-10 bg-white border-b border-slate-100">
              <span className="text-[10px] font-black text-slate-900 tracking-wider">2ALL.AI MOBILE</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">Active</span>
              </div>
            </div>

            {/* Product Body */}
            <div className="flex-grow flex flex-col justify-between relative z-10 bg-slate-50 overflow-hidden">
              {/* Product Image Frame - 3/4 length */}
              <div className="relative w-full h-[320px] bg-slate-950 overflow-hidden flex items-center justify-center">
                <video
                  src="/images/hand%20animation.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* AI Overlay Frame */}
                <AnimatePresence>
                  {phase === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 border-b-4 border-emerald-500 bg-emerald-500/5 z-20 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Floating Accessibility Badge */}
                <div className="absolute bottom-4 left-4 z-30">
                  <span className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-lg flex items-center gap-1">
                    <Accessibility className="w-3 h-3" /> Touch Assist
                  </span>
                </div>
              </div>

              {/* Related content below the 3/4 video */}
              <div className="bg-white p-4 border-t border-slate-100 flex-grow flex flex-col justify-center text-left">
                <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Target Remediation</span>
                <h4 className="text-xs font-black text-slate-900 mt-1 leading-snug">
                  Smart Touch Target Correction
                </h4>
                <p className="text-[9.5px] text-slate-500 mt-1.5 leading-relaxed">
                  2all.ai tracks finger taps in real-time, dynamically expanding interactive button boundaries to help meet contrast and hit-size guidelines.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/10 uppercase font-mono flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" /> Remediated
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Accessibility Scanner (Phase 1) */}
            <AnimatePresence>
              {phase === 1 && (
                <motion.div
                  initial={{ x: 100, y: 300, opacity: 0 }}
                  animate={
                    mobileImgFixed
                      ? mobileTextFixed
                        ? { x: -60, y: 260, opacity: 1 } // Position over Text
                        : { x: 50, y: 110, opacity: 1 } // Position over Image
                      : { x: 120, y: 380, opacity: 1 } // Initial floating entrance
                  }
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  className="absolute z-50 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
                >
                  <Accessibility className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ======================================================== */}
          {/* SCREEN 2: MAIN DASHBOARD & CODE EDITOR (Index 0)        */}
          {/* ======================================================== */}
          <motion.div
            ref={containerRef}
            initial={shouldReduceMotion ? "animate" : "initial"}
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            animate={getScreenStyles(0)}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
            variants={{
              initial: { 
                opacity: 0, 
                scale: 0.96,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                borderColor: "rgba(30,41,59,0.8)"
              },
              animate: { 
                opacity: 1, 
                scale: 1,
                boxShadow: [
                  "0 0 0 rgba(0,0,0,0)",
                  "0 0 25px rgba(200,255,77,0.15)",
                  "0 0 15px rgba(200,255,77,0.1)"
                ],
                borderColor: [
                  "rgba(30,41,59,0.8)",
                  "rgba(200,255,77,0.3)",
                  "rgba(30,41,59,0.8)"
                ],
                transition: {
                  opacity: { duration: 0.3, ease: "easeOut" },
                  scale: { duration: 0.3, ease: "easeOut" },
                  boxShadow: { delay: 2.8, duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" },
                  borderColor: { delay: 2.8, duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }
                }
              }
            }}
            className="absolute w-[95vw] md:w-[680px] h-[460px] bg-[#070b13] bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] border border-slate-850 rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header Address Bar */}
            <div className="px-6 py-3 bg-[#0B1220]/50 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 bg-emerald-500/10 rounded p-0.5 border border-emerald-500/20" />
                <span className="text-[10px] font-black text-white tracking-tight">2all.ai</span>
              </div>
              <div className="flex items-center gap-1.5 text-[8px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                scanning acme-store.com
              </div>
            </div>

            {/* Dashboard Content - Accessibility Scanner Simulation */}
            <div className="flex-grow flex p-6 overflow-hidden bg-transparent h-full text-white font-sans gap-5">
              
              {/* LEFT COLUMN: Radar scanner */}
              <div className="w-[150px] flex flex-col items-center justify-center shrink-0 border-r border-slate-800/40 pr-5">
                {/* Radar Grid Container */}
                <div className="relative w-24 h-24 rounded-full border border-slate-800/80 flex items-center justify-center bg-slate-950/40">
                  
                  {/* Inside concentric circles */}
                  <div className="absolute w-16 h-16 rounded-full border border-slate-800/40" />
                  <div className="absolute w-8 h-8 rounded-full border border-slate-800/20" />
                  
                  {/* Rotating radar line */}
                  <motion.div
                    variants={{
                      initial: { rotate: 0 },
                      animate: { rotate: 360, transition: { duration: 4, ease: "linear", repeat: Infinity } }
                    }}
                    className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.15)_0deg,transparent_120deg)] pointer-events-none"
                  />
                  
                  {/* Issue points */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      animate: { opacity: [0.3, 1, 0.3], transition: { duration: 2, repeat: Infinity } }
                    }}
                    className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-cyan-400"
                  />
                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      animate: { opacity: [0.2, 0.8, 0.2], transition: { duration: 2.5, delay: 0.5, repeat: Infinity } }
                    }}
                    className="absolute top-[55%] left-[25%] w-2 h-2 rounded-full bg-amber-400"
                  />
                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      animate: { opacity: [0.4, 1, 0.4], transition: { duration: 1.8, delay: 0.2, repeat: Infinity } }
                    }}
                    className="absolute top-[40%] right-[25%] w-2 h-2 rounded-full bg-teal-400"
                  />
                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      animate: { opacity: [0.1, 0.9, 0.1], transition: { duration: 3, delay: 0.8, repeat: Infinity } }
                    }}
                    className="absolute top-[70%] right-[35%] w-1.5 h-1.5 rounded-full bg-cyan-300"
                  />
                </div>

                {/* Score labels */}
                <div className="mt-4 text-center">
                  <span className="text-xl font-black text-white font-mono tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                    <motion.span>{progressText}</motion.span>%
                  </span>
                  <span className="block text-[7px] text-slate-500 font-extrabold uppercase tracking-widest mt-1">
                    Accessibility Score
                  </span>
                </div>
              </div>

              {/* CENTER COLUMN: Fixes list */}
              <div className="flex-grow flex flex-col justify-start text-left overflow-hidden min-h-[300px]">
                <span className="text-[8px] font-extrabold tracking-widest text-[#7FD8FF] uppercase">
                  LIVE SCAN &mdash; powered by 2all.ai
                </span>
                <h3 className="text-sm font-black tracking-tight text-white mt-1">
                  Finding & fixing issues in real time
                </h3>
                <p className="text-[9px] text-slate-500 mt-1 leading-relaxed max-w-[280px]">
                  2all.ai is walking the DOM right now. Each fix below was applied automatically, no code deploy needed.
                </p>

                {/* Fix items */}
                <div className="mt-4 space-y-2 flex-grow overflow-hidden">
                  
                  {/* Item 1 */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 15 },
                      animate: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.4 } }
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800/40 bg-slate-900/20 hover:border-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 bg-emerald-500/10 rounded-full p-0.5" />
                      <div className="text-left">
                        <span className="block text-[9px] font-bold text-slate-300">Added alt text to product image</span>
                        <span className="block text-[8px] text-slate-600 font-mono mt-0.5">product-hero.jpg</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                      Fixed
                    </span>
                  </motion.div>

                  {/* Item 2 */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 15 },
                      animate: { opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.4 } }
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800/40 bg-slate-900/20 hover:border-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 bg-emerald-500/10 rounded-full p-0.5" />
                      <div className="text-left">
                        <span className="block text-[9px] font-bold text-slate-300">Converted title div to semantic heading</span>
                        <span className="block text-[8px] text-slate-600 font-mono mt-0.5">product.tsx:14</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                      Fixed
                    </span>
                  </motion.div>

                  {/* Item 3 */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 15 },
                      animate: { opacity: 1, y: 0, transition: { delay: 2.0, duration: 0.4 } }
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800/40 bg-slate-900/20 hover:border-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 bg-emerald-500/10 rounded-full p-0.5" />
                      <div className="text-left">
                        <span className="block text-[9px] font-bold text-slate-300">Increased quantity button target size</span>
                        <span className="block text-[8px] text-slate-600 font-mono mt-0.5">product.tsx:41</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                      Fixed
                    </span>
                  </motion.div>

                  {/* Item 4 */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 15 },
                      animate: { opacity: 1, y: 0, transition: { delay: 2.6, duration: 0.4 } }
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800/40 bg-slate-900/20 hover:border-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 bg-emerald-500/10 rounded-full p-0.5" />
                      <div className="text-left">
                        <span className="block text-[9px] font-bold text-slate-300">Labeled "Add to cart" for screen readers</span>
                        <span className="block text-[8px] text-slate-600 font-mono mt-0.5">cart-button.tsx</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                      Fixed
                    </span>
                  </motion.div>

                </div>
              </div>

              {/* RIGHT COLUMN: Stats Panel */}
              <div className="w-[150px] flex flex-col justify-start gap-3 shrink-0">
                
                {/* Stat 1 */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 10 },
                    animate: { opacity: 1, x: 0, transition: { delay: 0.6 } }
                  }}
                  className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-3 flex flex-col justify-between text-left shadow"
                >
                  <span className="text-sm font-black text-white font-mono">24</span>
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Elements scanned</span>
                </motion.div>

                {/* Stat 2 */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 10 },
                    animate: { opacity: 1, x: 0, transition: { delay: 1.2 } }
                  }}
                  className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-3 flex flex-col justify-between text-left shadow"
                >
                  <span className="text-sm font-black text-amber-400 font-mono">1.2s</span>
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Scan time</span>
                </motion.div>

                {/* Stat 3 */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 10 },
                    animate: { opacity: 1, x: 0, transition: { delay: 1.8 } }
                  }}
                  className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-3 flex flex-col justify-between text-left shadow"
                >
                  <span className="text-sm font-black text-white font-mono">4</span>
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Files touched</span>
                </motion.div>

                {/* Stat 4 */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 10, scale: 1 },
                    animate: { 
                      opacity: 1, 
                      x: 0, 
                      scale: [1, 1.03, 1],
                      transition: { 
                        opacity: { delay: 2.4 },
                        x: { delay: 2.4 },
                        scale: { delay: 2.7, duration: 0.4 }
                      } 
                    }
                  }}
                  className="bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md rounded-xl p-3 flex flex-col justify-between text-left shadow-lg shadow-emerald-950/20"
                >
                  <span className="text-sm font-black text-emerald-400 font-mono">12 issues fixed</span>
                  <span className="text-[7px] text-emerald-500/80 font-bold uppercase tracking-widest mt-0.5">Across 4 files • 0 left</span>
                </motion.div>

              </div>

            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* SCREEN 3: DESKTOP SCANNER (Index 2)                     */}
          {/* ======================================================== */}
          <motion.div
            animate={getScreenStyles(2)}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
            className="absolute w-[95vw] md:w-[680px] h-[460px] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header Address Bar */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
              </div>
              <div className="bg-slate-100 rounded-lg px-12 py-1 text-[9px] text-slate-500 font-medium">
                https://2all.ai
              </div>
              <div className="w-12" />
            </div>

            {/* Desktop Web Body */}
            <div className="flex-1 bg-slate-950 relative overflow-hidden text-white flex items-center justify-center">
              <video
                src="/images/hero-animation%20(1).mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
