"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  Cpu, 
  Globe2,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MegamenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function PartnersMegamenu({ isOpen, onMouseEnter, onMouseLeave }: MegamenuProps) {
  const [isPlayingVideo, setIsPlayingVideo] = React.useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.99 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-[72px] left-4 right-4 md:left-auto md:right-auto max-w-2xl mx-auto bg-white border border-slate-200/90 rounded-3xl shadow-2xl z-40 p-4 md:p-5 flex flex-col lg:grid lg:grid-cols-2 gap-4 text-left select-none overflow-hidden"
        >
          {/* MOBILE CLOSE HEADER */}
          <div className="flex lg:hidden justify-between items-center p-3 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-lg">Partners</h3>
            <button 
              onClick={onMouseLeave}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[2] stroke-current fill-none"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* LEFT PANEL: PROGRAMS */}
          <div className="w-full p-2 space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100 pb-2.5">
              Programs
            </h4>
            <div className="space-y-2">
              {[
                { title: "Agency", desc: "Explore your agency's offering", icon: Building2, href: "/agency" },
                { title: "Platform", desc: "Customized accessibility solutions", icon: Cpu, href: "/platform" },
                { title: "Non-profit", desc: "Build a more inclusive world", icon: Globe2, href: "/non-profit" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.title} 
                    href={item.href} 
                    className="flex items-center gap-3 group/item hover:bg-blue-50/50 p-2 rounded-2xl transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <span className="block text-xs md:text-sm font-extrabold text-slate-900 group-hover/item:text-blue-600 transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-[11px] text-slate-500 font-medium leading-snug">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL: PROMO CARD WITH VIDEO */}
          <div className="w-full bg-indigo-900 text-white p-4 md:p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[340px] max-h-[340px]">
            {/* Visual design accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 shrink-0">
                <span className="text-[11px] font-black text-indigo-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  Partners Program
                </span>
                <span className="text-[10px] font-extrabold text-indigo-200 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full">
                  VIDEO DEMO
                </span>
              </div>
              
              <div className="w-full flex-1 my-2.5 rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner flex items-center justify-center relative min-h-0">
                <video 
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls 
                  className="w-full h-full object-cover rounded-2xl max-h-[220px]"
                >
                  <source src="/partner-video.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>

              <div className="pt-2 border-t border-white/10 text-center shrink-0">
                <h5 className="text-xs font-extrabold text-white leading-snug tracking-tight truncate px-1">
                  How partners scale web accessibility in 2026
                </h5>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
