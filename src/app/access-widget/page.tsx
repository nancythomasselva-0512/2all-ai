"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, CheckCircle2, Shield, Zap, Globe2,
  BarChart3, FileText, Users, Eye, Lock, Settings, ChevronDown
} from "lucide-react";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import ResourcesMegamenu from "@/components/marketing/ResourcesMegamenu";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AccessWidgetPage() {
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const closeMenuTimer = useRef<NodeJS.Timeout | null>(null);

  const openMenu = (name: string | null) => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    setActiveHoverMenu(name);
  };
  const closeMenuWithDelay = () => {
    closeMenuTimer.current = setTimeout(() => setActiveHoverMenu(null), 200);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTextClass = isScrolled ? "text-[#374b6c]" : "text-white/90";
  const navHoverClass = isScrolled ? "hover:text-blue-600" : "hover:text-white";
  const logoClass = isScrolled ? "mix-blend-multiply" : "brightness-0 invert";

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden font-sans">

      {/* NAVBAR */}
      <header
        onMouseLeave={closeMenuWithDelay}
        className={`w-full py-2 px-4 md:px-10 z-50 fixed top-0 transition-all duration-500 ease-out border-b ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-slate-200/50" : "bg-transparent border-transparent"}`}
      >
        <div className="w-full flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="md:px-4 py-1.5 flex items-center justify-between flex-grow">
            <Link href="/" className="flex items-center mr-2 md:mr-6 shrink-0">
              <img src="/images/logo.png" alt="2all.ai Logo" className={`h-10 md:h-16 w-auto object-contain transition-all ${logoClass}`} />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { name: "SOLUTIONS", hasDropdown: true },
                { name: "COMPANY", hasDropdown: true },
                { name: "PARTNERS", hasDropdown: true },
                { name: "RESOURCES", hasDropdown: true },
                { name: "PRICING", hasDropdown: false },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.name === "PRICING" ? "/pricing" : "#"}
                  onMouseEnter={() => link.name !== "PRICING" ? openMenu(link.name) : openMenu(null)}
                  className={`text-[13px] font-bold ${navTextClass} ${navHoverClass} transition-colors flex items-center gap-1.5 tracking-wider pb-1`}
                >
                  <span className="relative">
                    {link.name}
                    {activeHoverMenu === link.name && link.hasDropdown && (
                      <motion.span layoutId="aw-nav-underline" className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full ${isScrolled ? "bg-blue-600" : "bg-white"}`} />
                    )}
                  </span>
                  {link.hasDropdown && (
                    <motion.svg animate={{ rotate: activeHoverMenu === link.name ? 180 : 0 }} transition={{ duration: 0.2 }} viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[3.5] stroke-current fill-none">
                      <path d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  )}
                </Link>
              ))}
            </nav>
            <Link href="/login" className={`hidden md:block text-[13px] font-bold ${navTextClass} ${navHoverClass} tracking-wider mr-2`}>LOGIN</Link>
          </div>
          <div className="py-1.5 md:pl-6 flex items-center gap-3 md:gap-5 shrink-0">
            <button onClick={() => setIsDemoOpen(true)} className={`hidden md:block text-[13px] font-bold ${navTextClass} ${navHoverClass} tracking-wider border-none bg-transparent cursor-pointer pb-1`}>BOOK A DEMO</button>
            <Link href="/register" className={`flex items-center gap-2 rounded-xl px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-[12px] font-extrabold tracking-wider whitespace-nowrap transition-all ${isScrolled ? "bg-[#004bff] hover:bg-[#003edd] text-white shadow-md shadow-blue-500/20" : "bg-white hover:bg-slate-100 text-[#0f2d6b]"}`}>
              START FREE TRIAL
              <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[3] stroke-current fill-none"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
        <SolutionsMegamenu isOpen={activeHoverMenu === "SOLUTIONS"} onMouseEnter={() => openMenu("SOLUTIONS")} onMouseLeave={closeMenuWithDelay} />
        <CompanyMegamenu isOpen={activeHoverMenu === "COMPANY"} onMouseEnter={() => openMenu("COMPANY")} onMouseLeave={closeMenuWithDelay} />
        <PartnersMegamenu isOpen={activeHoverMenu === "PARTNERS"} onMouseEnter={() => openMenu("PARTNERS")} onMouseLeave={closeMenuWithDelay} />
        <ResourcesMegamenu isOpen={activeHoverMenu === "RESOURCES"} onMouseEnter={() => openMenu("RESOURCES")} onMouseLeave={closeMenuWithDelay} />
      </header>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      <main>
        {/* ── HERO ── */}
        <section className="w-full min-h-[92vh] bg-gradient-to-br from-[#0f1d4a] via-[#0a3580] to-[#0052cc] flex items-center pt-32 pb-20 px-6 md:px-10 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="text-white space-y-7">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-bold uppercase tracking-widest text-blue-200">
                <Zap className="w-3.5 h-3.5" /> accessWidget
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-[62px] font-black leading-[1.05] tracking-tight">
                Automate web<br />accessibility and<br /><span className="text-cyan-300 italic font-serif font-semibold">compliance</span> at scale
              </motion.h1>
              <motion.p variants={fadeUp} className="text-blue-100 text-lg md:text-xl leading-relaxed max-w-lg">
                One line of code. Instant WCAG 2.2 compliance. Protect your business, reach more users, and deliver an inclusive digital experience — automatically.
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

            {/* Mock product UI */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="relative lg:h-[580px] w-full hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800/50 to-blue-900/80 rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="h-10 border-b border-white/10 flex items-center px-5 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  <div className="ml-4 h-5 w-48 bg-white/10 rounded-md" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-full h-36 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                      <Eye className="w-10 h-10 text-cyan-400/60" />
                    </div>
                    <div className="w-full h-36 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                      <BarChart3 className="w-10 h-10 text-blue-400/60" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10 text-[11px]">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-white font-bold">Contrast Ratio Fixed</span></div>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-lg font-black text-[10px]">DONE</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10 text-[11px]">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /><span className="text-white font-bold">Alt Text Generator</span></div>
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-lg font-black text-[10px]">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10 text-[11px]">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400" /><span className="text-white font-bold">Keyboard Navigation</span></div>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-lg font-black text-[10px]">ENABLED</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-cyan-300">98%</div>
                      <div className="text-[10px] text-blue-200 mt-1">Accessibility Score</div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-white">1.2k</div>
                      <div className="text-[10px] text-blue-200 mt-1">Issues Fixed</div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-white">3s</div>
                      <div className="text-[10px] text-blue-200 mt-1">Install Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="w-full py-12 px-6 md:px-10 bg-[#f8fafc] border-y border-slate-100">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50">
              {["ADA Compliant", "WCAG 2.2", "Section 508", "EN 301 549", "AODA"].map((t) => (
                <span key={t} className="text-sm font-black text-slate-500 tracking-wider uppercase">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT IS accessWidget ── */}
        <section className="w-full py-28 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#004bff]">
                <Zap className="w-3.5 h-3.5" /> How It Works
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Validate your accessibility with a single click
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                accessWidget uses AI-driven processes and machine learning to continuously fix and improve your website's accessibility, ensuring compliance with WCAG 2.2, ADA, Section 508, and more.
              </p>
              <ul className="space-y-3 pt-2">
                {["Add one line of JavaScript to your site", "AI scans and fixes 70%+ of accessibility issues automatically", "Human experts handle the remaining complex fixes", "Receive a real-time accessibility statement"].map((t) => (
                  <li key={t} className="flex gap-3 items-start">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#004bff]" />
                    </div>
                    <span className="text-slate-700 font-medium">{t}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setIsDemoOpen(true)} className="mt-4 bg-[#004bff] hover:bg-[#003edd] text-white px-8 py-3.5 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 group">
                See it in action <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border border-blue-100 p-8 space-y-4">
              {[
                { label: "Missing Alt Text", count: "42 issues", color: "bg-red-100 text-red-600", status: "Fixing..." },
                { label: "Low Contrast Ratio", count: "18 issues", color: "bg-amber-100 text-amber-600", status: "Fixed ✓" },
                { label: "Missing ARIA Labels", count: "31 issues", color: "bg-blue-100 text-blue-600", status: "Fixed ✓" },
                { label: "Keyboard Navigation", count: "9 issues", color: "bg-purple-100 text-purple-600", status: "Fixed ✓" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{item.label}</div>
                    <div className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-md w-fit ${item.color}`}>{item.count}</div>
                  </div>
                  <span className={`text-sm font-extrabold ${item.status.includes("Fixed") ? "text-emerald-600" : "text-amber-500"}`}>{item.status}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES GRID ── */}
        <section className="w-full py-28 px-6 md:px-10 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto space-y-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Everything you need for accessibility</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">A complete accessibility platform built for modern websites and teams.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="w-6 h-6 text-blue-600" />, title: "1-Line Installation", desc: "Add a single JavaScript snippet to your site and let the AI do the rest. No developer expertise needed." },
                { icon: <Shield className="w-6 h-6 text-blue-600" />, title: "Legal Protection", desc: "Reduce your exposure to ADA lawsuits with a documented accessibility statement and ongoing compliance." },
                { icon: <Globe2 className="w-6 h-6 text-blue-600" />, title: "Global Standards", desc: "Compliant with WCAG 2.2, ADA, Section 508, EN 301 549, and AODA out of the box." },
                { icon: <Users className="w-6 h-6 text-blue-600" />, title: "User Profiles", desc: "Users with disabilities can set personalized accessibility preferences that persist across sessions." },
                { icon: <BarChart3 className="w-6 h-6 text-blue-600" />, title: "Compliance Dashboard", desc: "Track your accessibility score, monitor issues, and generate reports for your team in real time." },
                { icon: <Lock className="w-6 h-6 text-blue-600" />, title: "Data Privacy", desc: "No personal data collected. GDPR-ready and fully privacy-compliant by default." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── DARK SECTION: Why accessWidget ── */}
        <section className="w-full py-28 px-6 md:px-10 bg-[#060b27] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                Why choose <span className="text-cyan-300 italic font-serif font-semibold">accessWidget</span>?
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">We combine AI automation with human expertise to deliver the most comprehensive accessibility solution for your business.</p>
              <button onClick={() => setIsDemoOpen(true)} className="bg-cyan-400 hover:bg-cyan-300 text-[#060b27] px-8 py-3.5 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors">
                Get Started Free
              </button>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
              {[
                { title: "AI-Powered Automation", desc: "Our AI automatically remediates over 70% of WCAG issues without any manual work." },
                { title: "Always Up-to-Date", desc: "Continuous scanning ensures your site stays compliant as content changes." },
                { title: "Expert Backup", desc: "Our certified accessibility experts handle complex issues that AI can't fix alone." },
                { title: "24/7 Monitoring", desc: "Round-the-clock monitoring with instant alerts for new accessibility issues." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              { num: "150,000+", label: "Websites made accessible" },
              { num: "1 Billion+", label: "Users with disabilities reached" },
              { num: "98%", label: "Average accessibility score" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="pt-8 md:pt-0 px-6 space-y-2">
                <div className="text-4xl md:text-5xl font-black text-[#004bff]">{s.num}</div>
                <p className="text-slate-600 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── COMPLIANCE BANNER ── */}
        <section className="w-full py-20 px-6 md:px-10 bg-[#f8fafc]">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto bg-gradient-to-br from-[#0a3580] to-[#004bff] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-400/20 to-transparent pointer-events-none" />
            <div className="relative z-10 text-center md:text-left space-y-4 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Accessibility is not optional. <span className="italic font-serif text-cyan-300">Make it automatic.</span>
              </h2>
              <p className="text-blue-100 text-lg">Join thousands of businesses that have automated their compliance with accessWidget.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <Link href="/register" className="bg-white hover:bg-slate-100 text-[#004bff] px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-xl">
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center">Frequently asked questions.</h2>
            <div className="divide-y divide-slate-100 border-y border-slate-100">
              {[
                { q: "How quickly does accessWidget work?", a: "accessWidget starts working within minutes of installation. The AI begins scanning and fixing accessibility issues immediately after you add the script to your website." },
                { q: "Does it cover 100% of WCAG requirements?", a: "Our AI automatically fixes over 70% of WCAG 2.2 success criteria. For the remaining 30% that require human judgment, our expert team provides manual remediation as part of your plan." },
                { q: "Will it slow down my website?", a: "No. accessWidget is a lightweight, asynchronously loaded script that has virtually no impact on your site's performance or Core Web Vitals scores." },
                { q: "What types of websites does it support?", a: "accessWidget works with any website, regardless of the technology stack — WordPress, Shopify, React, Next.js, plain HTML, and more." },
                { q: "Do I need technical expertise to install it?", a: "Not at all. Simply copy and paste one line of JavaScript into your website's header. The rest is fully automated." },
              ].map((faq, i) => (
                <details key={i} className="group py-6 cursor-pointer">
                  <summary className="flex justify-between items-center font-bold text-slate-900 text-lg list-none">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <p className="text-slate-600 mt-4 leading-relaxed pr-8">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="w-full py-20 px-6 md:px-10 bg-[#e0f2fe]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight max-w-xl">
              See <span className="italic font-serif text-[#004bff] font-semibold">accessWidget</span> in action
            </h2>
            <div className="flex flex-wrap gap-4 shrink-0">
              <button onClick={() => setIsDemoOpen(true)} className="bg-[#004bff] hover:bg-[#003edd] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-lg shadow-blue-500/20">
                Book a Demo
              </button>
              <Link href="/register" className="bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
