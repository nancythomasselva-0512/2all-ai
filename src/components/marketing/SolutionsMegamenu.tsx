"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  ShieldCheck,
  Sparkles,
  Search,
  Code,
  Globe,
  User,
  Activity,
  LayoutGrid,
  ChevronRight,
  TrendingUp,
  Play,
  ClipboardCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MegamenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function SolutionsMegamenu({ isOpen, onMouseEnter, onMouseLeave }: MegamenuProps) {
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
          className="fixed top-20 left-4 right-4 md:left-6 md:right-6 max-w-[1360px] mx-auto bg-white border border-slate-200/90 rounded-3xl shadow-2xl z-50 p-5 md:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 text-left select-none max-h-[85vh] overflow-y-auto font-sans"
        >
          {/* MOBILE CLOSE HEADER */}
          <div className="flex lg:hidden justify-between items-center pb-4 mb-2 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-xl">Solutions</h3>
            <button
              onClick={onMouseLeave}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[2] stroke-current fill-none"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* COLUMN 1: SERVICES (cols 3) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-normal leading-none border-b border-slate-100 pb-3">
              Services
            </p>
            <div className="space-y-3">
              {[
                { title: "VPAT", desc: "Document your compliance", icon: FileText, href: "/vpat" },
                { title: "Litigation support", desc: "Get support from dedicated experts", icon: ShieldCheck, href: "/litigation-support" },
                { title: "User testing", desc: "Test with real end-users", icon: Users, href: "/user-testing" },
                { title: "Expert audit", desc: "Conduct a manual accessibility audit", icon: ClipboardCheck, href: "/expert-audit" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3.5 group/item hover:bg-blue-50/50 p-2.5 rounded-2xl transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <span style={{ textTransform: "none", letterSpacing: "normal" }} className="block text-xs md:text-sm font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors normal-case tracking-normal">
                        {item.title}
                      </span>
                      <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: "normal" }} className="block text-[11px] text-slate-500 font-normal mt-0.5 leading-snug normal-case tracking-normal">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-normal pt-2"
            >
              See All Services
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* COLUMN 2: PRODUCTS (cols 3) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-normal leading-none border-b border-slate-100 pb-3">
              Products
            </p>
            <div className="space-y-3">
              {[
                { title: "Automated website accessibility", desc: "2all.ai Widget", icon: Sparkles, href: "/access-widget" },
                { title: "Assess your accessibility", desc: "accessScan", icon: Search, href: "/access-scan" },
                { title: "Develop accessible code", desc: "accessFlow", icon: Code, href: "/develop-accessible-code" },
                { title: "Integrate with your CMS", desc: "Integrations", icon: Globe, href: "/integrate-with-your-cms" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3.5 group/item hover:bg-blue-50/50 p-2.5 rounded-2xl transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <span style={{ textTransform: "none", letterSpacing: "normal" }} className="block text-xs md:text-sm font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors normal-case tracking-normal">
                        {item.title}
                      </span>
                      <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: "normal" }} className="block text-[11px] text-slate-500 font-normal mt-0.5 leading-snug normal-case tracking-normal">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* COLUMN 3: BUSINESS (cols 3) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-normal leading-none border-b border-slate-100 pb-3">
              Business
            </p>
            <div className="space-y-3">
              {[
                { title: "Small business", desc: "Streamline web accessibility", icon: User, href: "/small-business" },
                { title: "Mid-large business", desc: "Get a customized solution", icon: Activity, href: "/mid-large-business" },
                { title: "Enterprise", desc: "Scale with hybrid accessibility", icon: Globe, href: "/enterprise" },
                { title: "Industries", desc: "Explore solutions designed for your field", icon: LayoutGrid, href: "/industries" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3.5 group/item hover:bg-blue-50/50 p-2.5 rounded-2xl transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <span style={{ textTransform: "none", letterSpacing: "normal" }} className="block text-xs md:text-sm font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors normal-case tracking-normal">
                        {item.title}
                      </span>
                      <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: "normal" }} className="block text-[11px] text-slate-500 font-normal mt-0.5 leading-snug normal-case tracking-normal">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* COLUMN 4: PROMOTION CARD WITH VIDEO (cols 3) */}
          <div className="col-span-3 bg-slate-900 text-white rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between shadow-xl h-[380px] max-h-[380px]">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 shrink-0">
                <span className="text-[11px] font-black text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Solutions Showcase
                </span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded-full">
                  VIDEO DEMO
                </span>
              </div>

              <div className="w-full flex-1 my-2.5 rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner flex items-center justify-center relative min-h-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover rounded-2xl max-h-[230px]"
                >
                  <source src="/solution-video.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-center shrink-0">
                <h5 className="text-xs font-extrabold text-white leading-snug tracking-tight truncate px-1">
                  How dev teams tackle accessibility in 2026
                </h5>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
