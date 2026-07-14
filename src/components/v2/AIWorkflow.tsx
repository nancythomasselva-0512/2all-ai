"use client";

import { motion } from "framer-motion";
import { FileText, Cpu, Globe, Mic, CheckCircle } from "lucide-react";

export default function AIWorkflow() {
  const steps = [
    { icon: FileText, label: "Input Analysis", color: "from-slate-400 to-slate-500", activeColor: "from-blue-500 to-cyan-400" },
    { icon: Cpu, label: "AI Processing", color: "from-slate-400 to-slate-500", activeColor: "from-blue-600 to-indigo-500" },
    { icon: Globe, label: "Translation", color: "from-slate-400 to-slate-500", activeColor: "from-indigo-500 to-purple-500" },
    { icon: Mic, label: "Speech Synthesis", color: "from-slate-400 to-slate-500", activeColor: "from-purple-500 to-fuchsia-500" },
    { icon: CheckCircle, label: "Accessible Output", color: "from-slate-400 to-slate-500", activeColor: "from-emerald-400 to-green-500" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">AI Workflow</span> operates.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            A seamless, automated pipeline that helps make any website accessible and inclusive in real-time.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute top-0 bottom-0 left-[27px] w-1 bg-slate-100 rounded-full" />
          
          {/* Desktop Horizontal Line */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-1 bg-slate-100 rounded-full" />
          
          {/* Animated Gradient Progress Line (Desktop) */}
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="hidden md:block absolute top-[45px] left-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-green-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.6)]"
          />

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-10 md:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-row md:flex-col items-center gap-6 md:gap-4 relative group">
                  {/* Icon Node */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.6 }}
                    className="relative"
                  >
                    <div className="w-14 h-14 md:w-24 md:h-24 rounded-2xl bg-white border-2 border-slate-100 shadow-xl flex items-center justify-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-blue-500/25 group-hover:border-blue-200">
                      <Icon className="w-6 h-6 md:w-10 md:h-10 text-slate-400 transition-colors duration-500 group-hover:text-blue-600" />
                    </div>
                    {/* Active State Glow Overlay that fades in */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.6 + 0.3 }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.activeColor} flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                    >
                       <Icon className="w-6 h-6 md:w-10 md:h-10 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Text Label */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.6 + 0.2 }}
                    className="text-left md:text-center"
                  >
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1 md:hidden">Step {index + 1}</div>
                    <h3 className="text-base md:text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600">{step.label}</h3>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
