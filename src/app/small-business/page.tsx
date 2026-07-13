"use client";
import Navbar from "@/components/marketing/Navbar";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, Shield, Zap, Target,
  TrendingUp, Users, HeartHandshake, ChevronDown, Star
} from "lucide-react";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function SmallBusinessPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const closeMenuTimer = useRef<NodeJS.Timeout | null>(null);




  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden font-sans">

      {/* NAVBAR */}
      <Navbar />

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      <main>
        {/* ── HERO ── */}
        <section className="w-full min-h-[92vh] bg-gradient-to-br from-[#0a1e3f] via-[#10316b] to-[#0052cc] flex items-center pt-16 pb-20 px-6 md:px-10 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="text-white space-y-7">
              <Breadcrumbs items={[ { label: "Home", href: "/" }, { label: "Business Size" }, { label: "Small Business" } ]} />
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-[62px] font-black leading-[1.05] tracking-tight">
                Web accessibility <br/>made simple for<br /><span className="text-cyan-300 italic font-serif font-semibold">small businesses</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-blue-100 text-lg md:text-xl leading-relaxed max-w-lg">
                Protect your business from lawsuits and open your doors to everyone. Our automated solution handles ADA & WCAG compliance effortlessly.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                <Link href="/register" className="bg-white hover:bg-slate-100 text-[#0a3580] px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all shadow-xl group flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button onClick={() => setIsDemoOpen(true)} className="bg-transparent border-2 border-white/30 hover:border-white/70 text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all">
                  Book a Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Illustration */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="relative lg:h-[580px] w-full hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-600/30 rounded-full blur-3xl animate-pulse" />
                 <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-cyan-300" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">ADA Compliant</div>
                        <div className="text-blue-200 text-sm">Protected automatically</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 w-[95%]" />
                      </div>
                      <div className="flex justify-between text-xs text-blue-200 font-bold">
                        <span>Accessibility Score</span>
                        <span className="text-cyan-300">95/100</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                       <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                          <Zap className="w-6 h-6 text-amber-300 mx-auto mb-2" />
                          <div className="text-white font-bold">Instant Setup</div>
                       </div>
                       <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                          <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                          <div className="text-white font-bold">More Traffic</div>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* G2 BADGES SECTION (ANIMATED) */}
        <section className="bg-[#0a0f1e] text-white py-24 overflow-hidden relative border-t border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center space-y-4"
            >
              <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-400">Industry Recognition</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                The <span className="text-blue-400">#1 rated</span> web accessibility solution
              </h3>
              <p className="text-slate-400 text-base max-w-xl mx-auto">Consistently ranked as the leader for Small Businesses on G2 and other leading software review platforms.</p>
            </motion.div>

            {/* G2 Badges Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {[
                { season: "SUMMER 2026", label: "Most\nImplementable", sub: "" },
                { season: "SUMMER 2026", label: "Best\nUsability", sub: "" },
                { season: "SUMMER 2026", label: "Best\nEst. ROI", sub: "SMALL BUSINESS" },
                { season: "SUMMER 2026", label: "Leader", sub: "" },
                { season: "SUMMER 2026", label: "Best Meets\nRequirements", sub: "SMALL BUSINESS" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.08, y: -6 }}
                  className="flex flex-col items-center group cursor-default"
                >
                  {/* Badge Shell */}
                  <div className="relative w-[120px] h-[148px] flex flex-col items-center">
                    {/* Pentagon SVG Badge */}
                    <svg viewBox="0 0 120 148" className="absolute inset-0 w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="60,4 116,38 116,110 60,144 4,110 4,38" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="3" />
                      <polygon points="60,10 110,42 110,106 60,138 10,106 10,42" fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.4" />
                    </svg>

                    {/* Badge content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full pt-3 pb-2 px-2 text-center">
                      <span className="text-[8px] font-black uppercase tracking-[0.15em] text-amber-400 mb-1">{badge.season}</span>
                      <div className="w-8 h-8 bg-[#FF492C] rounded-md flex items-center justify-center mb-1.5 shadow-md">
                        <span className="text-white font-black text-[14px] leading-none">G2</span>
                      </div>
                      <p className="text-white font-black text-[11px] leading-tight whitespace-pre-line">{badge.label}</p>
                      {badge.sub && (
                        <p className="text-amber-400 font-black text-[7px] uppercase tracking-wider mt-1">{badge.sub}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12 pt-4 border-t border-white/10"
            >
              {["Capterra Best Value", "GetApp Category Leader", "SoftwareAdvice Highly Rated"].map((label) => (
                <div key={label} className="flex items-center gap-2 text-slate-400">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-black uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES FOR SMALL BIZ ── */}
        <section className="w-full py-28 px-6 md:px-10 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto space-y-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Everything a growing business needs</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">We've tailored our accessibility tools to be frictionless, affordable, and fully automated so you can focus on running your business.</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="w-6 h-6 text-[#004bff]" />, title: "Set and Forget", desc: "No complex developer integrations. Install one script and let our AI continuously scan and fix issues as you update your site." },
                { icon: <Shield className="w-6 h-6 text-[#004bff]" />, title: "Legal Peace of Mind", desc: "Small businesses are prime targets for ADA demand letters. Protect yourself with our Litigation Support Package included." },
                { icon: <Users className="w-6 h-6 text-[#004bff]" />, title: "Expand Your Market", desc: "Over 15% of the population lives with a disability. Ensure your digital storefront is open and welcoming to everyone." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                     {f.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="w-full py-20 px-6 md:px-10 bg-white">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto bg-gradient-to-br from-[#0a3580] to-[#004bff] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-400/20 to-transparent pointer-events-none" />
            <div className="relative z-10 text-center md:text-left space-y-4 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Ready to make your website accessible?
              </h2>
              <p className="text-blue-100 text-lg">Plans start at just $49/month. Join thousands of small businesses that trust 2all.ai.</p>
            </div>
            <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-4">
              <Link href="/pricing" className="bg-white hover:bg-slate-100 text-[#004bff] px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors text-center">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
