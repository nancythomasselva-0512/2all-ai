"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, ArrowRight, Heart, Sparkles, Shield, Users, Globe, Scale,
  ChevronDown, Award, Zap, Target, Lock, Eye, Star, Activity
} from "lucide-react";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AboutUsPage() {
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
  const navHoverClass = "hover:text-blue-400";

  const coreValues = [
    {
      icon: Heart,
      title: "Inclusivity First",
      desc: "We believe the digital world belongs to everyone. Our platform is co-designed alongside individuals with disabilities to solve real-world usability challenges.",
      highlights: ["Built with native screen reader users", "Motor & cognitive access optimization"]
    },
    {
      icon: Sparkles,
      title: "AI-Powered Innovation",
      desc: "We combine next-generation artificial intelligence with continuous machine learning to scan, identify, and remediate accessibility issues at enterprise scale.",
      highlights: ["Instant automated remediation", "Zero-code DOM transformation"]
    },
    {
      icon: Shield,
      title: "Trust & Compliance",
      desc: "We guarantee seamless alignment under ADA, WCAG 2.2 AA, Section 508, and EAA standards, shielding your organization from legal litigation.",
      highlights: ["VPAT & ACR report generation", "Full litigation support guarantee"]
    },
    {
      icon: Users,
      title: "Community Collaboration",
      desc: "We champion 'Nothing About Us Without Us'—testing every workflow, component, and widget interface directly with diverse disability advocate networks.",
      highlights: ["Human expert verification", "Real user usability testing"]
    },
  ];

  const impactStats = [
    { number: "10M+", label: "Pages Audited & Remediated", icon: Zap },
    { number: "99.4%", label: "WCAG 2.2 AA Compliance Rate", icon: Award },
    { number: "250K+", label: "Users Assisted Daily", icon: Users },
    { number: "4.9/5", label: "Customer Satisfaction Score", icon: Star },
  ];

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden font-sans">
      
      {/* NAVBAR */}
      <header
        onMouseLeave={closeMenuWithDelay}
        className={`w-full py-2.5 px-4 md:px-10 z-50 fixed top-0 transition-all duration-500 ease-out border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-md border-slate-200/60" 
            : "bg-white/90 backdrop-blur-md border-slate-100"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="md:px-4 py-1.5 flex items-center justify-between flex-grow">
            <Link href="/" className="flex items-center mr-2 md:mr-6 shrink-0">
              <img 
                src="/images/logo.png" 
                alt="2all.ai Logo" 
                className="h-10 md:h-14 w-auto object-contain mix-blend-multiply transition-all" 
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { name: "SOLUTIONS", hasDropdown: true },
                { name: "COMPANY", hasDropdown: true },
                { name: "PARTNERS", hasDropdown: true },
                { name: "PRICING", hasDropdown: false },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.name === "PRICING" ? "/pricing" : "#"}
                  onMouseEnter={() => link.name !== "PRICING" ? openMenu(link.name) : openMenu(null)}
                  className="text-[13px] font-bold text-[#0a1e3f] hover:text-blue-600 transition-colors flex items-center gap-1.5 tracking-wider pb-1"
                >
                  <span className="relative">
                    {link.name}
                    {activeHoverMenu === link.name && link.hasDropdown && (
                      <motion.span layoutId="ls-nav-underline" className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-blue-600" />
                    )}
                  </span>
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <Link href="/login" className="text-[13px] font-bold text-slate-700 hover:text-blue-600 px-3 py-2 transition-colors">
                LOGIN
              </Link>
              <button
                onClick={() => setIsDemoOpen(true)}
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-slate-300 text-slate-800 text-[13px] font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
              >
                BOOK A DEMO
              </button>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-full text-[13px] font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
              >
                START FREE TRIAL
              </Link>
            </div>
          </div>
        </div>

        <SolutionsMegamenu isOpen={activeHoverMenu === "SOLUTIONS"} onMouseEnter={() => openMenu("SOLUTIONS")} onMouseLeave={closeMenuWithDelay} />
        <CompanyMegamenu isOpen={activeHoverMenu === "COMPANY"} onMouseEnter={() => openMenu("COMPANY")} onMouseLeave={closeMenuWithDelay} />
        <PartnersMegamenu isOpen={activeHoverMenu === "PARTNERS"} onMouseEnter={() => openMenu("PARTNERS")} onMouseLeave={closeMenuWithDelay} />
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-[#0b3c96] via-[#082b70] to-[#041d57] text-white overflow-hidden">
        {/* Ambient background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex justify-start text-left mb-6">
            <Breadcrumbs theme="dark" items={[ { label: "Home", href: "/" }, { label: "Company", href: "#" }, { label: "About Us" } ]} />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 max-w-4xl mx-auto text-center"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-200 border border-white/20 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI-Powered Accessibility • Global Inclusion</span>
            </motion.div>

            <motion.h1 
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
            >
              Making the web accessible to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-white">
                everyone, everywhere
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              At 2all.ai, we are closing the digital accessibility gap. We combine autonomous AI scanning and real-time remediation with human expert auditing to make WCAG 2.2 AA & ADA compliance effortless for every organization.
            </motion.p>

            <motion.div 
              variants={fadeUp}
              className="pt-6 flex flex-wrap justify-center gap-4"
            >
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-extrabold rounded-full transition-all shadow-xl shadow-blue-500/30 hover:scale-[1.02]"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-full transition-all hover:scale-[1.02] backdrop-blur-sm"
              >
                Book a Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS COUNTER BAR */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100">
          {impactStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-2 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">{stat.number}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Visual Column */}
            <AboutUsAnimation />

            {/* Content Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                  Our Mission & Vision
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-[#0a1e3f] tracking-tight leading-tight">
                  Unlocking a fully inclusive digital world
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-base">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 hover:border-blue-200 transition-all">
                  <h3 className="text-lg font-bold text-[#0a1e3f] flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" /> Our Vision
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We envision a digital ecosystem where every individual—regardless of physical, sensory, or cognitive abilities—can navigate, communicate, and transact online with zero barriers.
                  </p>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 hover:border-blue-200 transition-all">
                  <h3 className="text-lg font-bold text-[#0a1e3f] flex items-center gap-2">
                    <Scale className="w-5 h-5 text-blue-600" /> Our Mission
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our mission is to empower organizations of all sizes to achieve full WCAG 2.2 AA and ADA compliance effortlessly. By combining continuous AI automation with human auditing, we make digital inclusion fast, scalable, and affordable.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 md:py-28 bg-[#f8fafc] border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              What Defines Us
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0a1e3f] tracking-tight">
              Our Core Principles & Values
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Web accessibility isn't just a compliance checklist—it's a commitment to empathy, innovation, and digital equality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-2 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a1e3f] mb-3">{value.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{value.desc}</p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {value.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMUNITY FOCUS */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Content Column */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                  Nothing About Us Without Us
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-[#0a1e3f] tracking-tight leading-tight">
                  Verified by real accessibility advocates
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-base">
                <p>
                  To deliver true accessibility, automated code checkers alone are not enough. We partner directly with disability advocate organizations and hire certified accessibility auditors who perform hands-on usability testing with assistive technology.
                </p>
                
                <ul className="space-y-4 pt-2">
                  {[
                    "Direct testing loops with native screen reader users (NVDA, JAWS, VoiceOver)",
                    "Comprehensive navigation testing for motor and mobility impairments",
                    "Cognitive usability assessments and customized reading adjustments",
                    "Continuous audit verification aligned with international WCAG standards"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-800 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[2.5rem] rotate-2 z-0" />
              <img 
                src="/images/community_selfie.png" 
                alt="Our community of accessibility advocate partners" 
                className="relative z-10 rounded-[2rem] shadow-2xl w-full object-cover max-h-[500px] border border-slate-200/60"
              />
              <div className="absolute bottom-6 left-6 z-20 bg-slate-900/90 text-white backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Advocate Testing</p>
                  <p className="text-sm font-extrabold text-white">100% Human-Validated</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA CARD */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-r from-[#0b3c96] via-[#082b70] to-[#041d57] rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-950/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/20 uppercase tracking-widest">
                Start Your Compliance Journey Today
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Ready to make your website accessible to all?
              </h2>
              <p className="text-blue-100 max-w-xl mx-auto leading-relaxed text-base">
                Join thousands of forward-thinking businesses using 2all.ai to automate accessibility, ensure legal compliance, and welcome every user.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link 
                  href="/register" 
                  className="px-8 py-4 bg-white text-blue-700 font-extrabold rounded-full hover:bg-slate-100 transition-all hover:scale-[1.02] shadow-xl shadow-black/20"
                >
                  Start Your Free Trial
                </Link>
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-full transition-all hover:scale-[1.02] backdrop-blur-sm"
                >
                  Book a Demo Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* DEMO MODAL */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}

function AboutUsAnimation() {
  return (
    <div className="relative h-[360px] sm:h-[400px] md:h-[460px] w-full rounded-[2.5rem] bg-blue-50/50 border border-slate-200/60 flex items-center justify-center select-none overflow-hidden shadow-lg">
      <div className="absolute -inset-4 bg-blue-50/40 rounded-[2.5rem] -rotate-2 z-0" />
      
      {/* Animation Stage: Video Player */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center rounded-[2.5rem] z-10">
        <video
          src="/images/hand%20animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>

      {/* Floating Compliance Stats card */}
      <div className="absolute bottom-6 right-6 z-20 bg-[#0b3c96] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/20 hidden sm:block">
        <p className="text-3xl font-black mb-0.5 text-cyan-300">99.9%</p>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-100">Compliance Accuracy with WCAG Standards</p>
      </div>
    </div>
  );
}
