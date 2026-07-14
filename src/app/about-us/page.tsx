"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, ArrowRight, Heart, Sparkles, Shield, Users, Eye, Info,
  ChevronDown, HelpCircle, Activity, Globe, Scale
} from "lucide-react";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import ResourcesMegamenu from "@/components/marketing/ResourcesMegamenu";
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

  const navTextClass = isScrolled ? "text-[#374b6c]" : "text-[#0a1e3f]";
  const navHoverClass = "hover:text-blue-600";
  const logoClass = "mix-blend-multiply";

  const coreValues = [
    {
      icon: Heart,
      title: "Inclusivity First",
      desc: "We believe the digital world belongs to everyone. Our products are designed alongside individuals with disabilities to address real usability issues.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Innovation",
      desc: "We use next-generation machine learning and automated remediation tools to scan, identify, and fix compliance gaps instantly at scale.",
    },
    {
      icon: Shield,
      title: "Trust & Compliance",
      desc: "We help you work toward accessibility alignment under ADA, WCAG 2.2, Section 508, and EAA standards, protecting your brand and improving digital inclusion.",
    },
    {
      icon: Users,
      title: "Community Collaboration",
      desc: "We champion the principle of 'Nothing About Us Without Us', testing and vetting every workflow directly with disabled user groups.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden font-sans">
      
      {/* NAVBAR */}
      <header
        onMouseLeave={closeMenuWithDelay}
        className={`w-full py-2 px-4 md:px-10 z-50 fixed top-0 transition-all duration-500 ease-out border-b ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-slate-200/50" : "bg-white/80 backdrop-blur-md border-transparent"}`}
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
                      <motion.span layoutId="ls-nav-underline" className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-blue-600`} />
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
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-slate-300 text-slate-800 text-[13px] font-bold hover:bg-slate-50 transition-all cursor-pointer"
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
        <ResourcesMegamenu isOpen={activeHoverMenu === "RESOURCES"} onMouseEnter={() => openMenu("RESOURCES")} onMouseLeave={closeMenuWithDelay} />
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-[#f8fafc] overflow-hidden">
        {/* Abstract blurred background shapes */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/10 w-[500px] h-[500px] bg-indigo-300/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="flex justify-center">
            <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Company", href: "#" }, { label: "About Us" } ]} />
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-[#0a1e3f] leading-[1.1] tracking-tight"
            >
              Making the web accessible to <span className="text-blue-600 relative">
                everyone
                <svg className="absolute left-0 bottom-[-8px] w-full h-3 text-blue-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              At 2all.ai, we are dedicated to closing the digital gap. We combine smart AI automation with human expertise to make web accessibility seamless, automatic, and compliant.
            </motion.p>
            <motion.div 
              variants={fadeUp}
              className="pt-6 flex flex-wrap justify-center gap-4"
            >
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-300 text-slate-800 font-bold rounded-full hover:bg-slate-50 transition-all hover:scale-[1.02]"
              >
                Book a Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Visual Column: Animated Touch Hands */}
            <AboutUsAnimation />

            {/* Content Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
                  Our Mission & Vision
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">
                  Unlocking a fully inclusive internet
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-base">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#0a1e3f] flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" /> Our Vision
                  </h3>
                  <p>
                    We envision a digital world where every individual, regardless of their physical or cognitive abilities, can access information, communicate, and transact with absolute freedom and ease.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#0a1e3f] flex items-center gap-2">
                    <Scale className="w-5 h-5 text-blue-600" /> Our Mission
                  </h3>
                  <p>
                    Our mission is to help organizations of all sizes become accessible and compliant. By automating the identification and remediation of accessibility errors, we make the process simple, fast, and highly cost-effective.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 md:py-28 bg-[#faf9f6] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
              What Defines Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-600">
              Web accessibility isn't just about code or compliance checklists—it's about empathy, innovation, and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 text-left hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a1e3f] mb-3">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
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
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
                  Nothing About Us Without Us
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">
                  Tested and verified by real users
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  To build truly accessible web applications, we don't just rely on automated test runs or strict syntax checkers. We partner directly with advocate groups and hire experts with disabilities who verify our widget interfaces and accessibility outputs.
                </p>
                
                <ul className="space-y-3.5 pt-2">
                  {[
                    "Direct feedback loops with screen reader users",
                    "Usability testing for cognitive and motor-impaired individuals",
                    "Constant auditing in tandem with local accessibility organizations"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-amber-50 rounded-[2.5rem] rotate-2 z-0" />
              <img 
                src="/images/community_selfie.png" 
                alt="Our community working together" 
                className="relative z-10 rounded-[2rem] shadow-xl w-full object-cover max-h-[480px]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* CTA CARD */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Ready to make your website accessible to all?
              </h2>
              <p className="text-blue-100 max-w-xl mx-auto leading-relaxed">
                Join thousands of businesses who use 2all.ai to automate accessibility scanning aligned with WCAG standards and open their platforms to everyone.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link 
                  href="/register" 
                  className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-[1.02] shadow-lg shadow-black/10"
                >
                  Start Your Free Trial
                </Link>
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="px-8 py-4 bg-blue-600/30 border border-blue-400 hover:bg-blue-600/50 text-white font-bold rounded-full transition-all hover:scale-[1.02]"
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
    <div className="relative h-[340px] sm:h-[380px] md:h-[420px] w-full rounded-[2.5rem] bg-blue-50/50 border border-slate-200/60 flex items-center justify-center select-none overflow-hidden">
      <div className="absolute -inset-4 bg-blue-50/30 rounded-[2.5rem] -rotate-2 z-0" />
      
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
      <div className="absolute bottom-6 right-6 z-20 bg-blue-600 text-white p-6 rounded-2xl shadow-lg max-w-xs hidden sm:block">
        <p className="text-2xl font-black mb-1">99.9%</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Compliance accuracy with WCAG standards</p>
      </div>
    </div>
  );
}
