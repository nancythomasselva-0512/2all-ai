"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Terminal, Volume2 } from "lucide-react";

export default function AIDemoWorkspace() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence the animation steps
    const timer1 = setTimeout(() => setStep(1), 1000); // Start typing
    const timer2 = setTimeout(() => setStep(2), 3500); // Finish typing, start processing
    const timer3 = setTimeout(() => setStep(3), 6000); // Finish processing, show output
    const timer4 = setTimeout(() => setStep(4), 8000); // Show audio waveform
    
    // Loop
    const reset = setTimeout(() => setStep(0), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(reset);
    };
  }, [step]);

  const inputText = "Analyze my website for WCAG 2.2 AA compliance issues.";

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            See the <span className="text-blue-600">Intelligence</span> in Action
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Our AI engine instantly processes complex accessibility requirements, generating actionable code and real-time audio descriptions.
          </p>
        </div>

        {/* Workspace Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-2xl shadow-blue-900/5"
        >
          {/* Mac-style Window Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <Terminal className="w-3 h-3" />
              2ALL Workspace
            </div>
          </div>

          {/* Workspace Body */}
          <div className="p-6 md:p-10 bg-white min-h-[400px] flex flex-col gap-8">
            
            {/* User Input Block */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-slate-500">YOU</span>
              </div>
              <div className="flex-1 bg-slate-50 rounded-2xl rounded-tl-none p-4 text-slate-700 font-mono text-sm border border-slate-100 shadow-sm">
                {step >= 1 ? (
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="inline-block overflow-hidden whitespace-nowrap"
                  >
                    {inputText}
                  </motion.span>
                ) : (
                  <span className="opacity-0">{inputText}</span>
                )}
                {/* Blinking cursor */}
                {(step === 1 || step === 0) && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-blue-600 ml-1 align-middle"
                  />
                )}
              </div>
            </div>

            {/* AI Processing / Output Block */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex-1 bg-blue-50/50 rounded-2xl rounded-tl-none p-4 border border-blue-100 shadow-sm relative overflow-hidden">
                    {/* Processing State */}
                    {step === 2 && (
                      <div className="flex items-center gap-3 text-blue-600 font-medium text-sm">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                        />
                        Processing DOM nodes...
                        
                        {/* Progress Bar */}
                        <div className="w-32 h-1.5 bg-blue-100 rounded-full overflow-hidden ml-auto">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.2, ease: "easeInOut" }}
                            className="h-full bg-blue-600"
                          />
                        </div>
                      </div>
                    )}

                    {/* Output State */}
                    {step >= 3 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-slate-700"
                      >
                        <p className="font-semibold text-blue-900 mb-2">Scan Complete. 3 issues automatically remediated:</p>
                        <ul className="space-y-2 mb-4 font-mono text-xs">
                          <li className="flex gap-2 items-center text-green-700">
                            <span className="text-green-500">✓</span> Added aria-labels to 14 navigation links.
                          </li>
                          <li className="flex gap-2 items-center text-green-700">
                            <span className="text-green-500">✓</span> Adjusted color contrast ratio from 3.2:1 to 4.5:1.
                          </li>
                          <li className="flex gap-2 items-center text-green-700">
                            <span className="text-green-500">✓</span> Generated alt-text for 7 decorative images.
                          </li>
                        </ul>

                        {/* Voice Waveform */}
                        {step >= 4 && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pt-4 border-t border-blue-100 flex items-center gap-3"
                          >
                            <Volume2 className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">Screen Reader Output Generated</span>
                            
                            {/* Animated Audio Waveform */}
                            <div className="ml-auto flex items-center gap-1 h-6">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ height: ["20%", "100%", "20%"] }}
                                  transition={{ 
                                    duration: 0.5 + Math.random() * 0.5, 
                                    repeat: Infinity, 
                                    delay: Math.random() * 0.5 
                                  }}
                                  className="w-1 bg-blue-500 rounded-full"
                                  style={{ height: "20%" }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
