"use client";

import React, { useState } from 'react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Sparkles, 
  LineChart, 
  Globe, 
  Search, 
  Award, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  HeartHandshake,
  Cpu,
  Layers,
  Check,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function PlatformPage() {
  const [activeSupportDetail, setActiveSupportDetail] = useState(0);

  const stats = [
    { value: "Shopify", label: "Direct Integration Available" },
    { value: "WordPress", label: "Custom Plugin Available" },
    { value: "Wix", label: "1-Click App Installer" },
    { value: "Squarespace", label: "Header Injection Installer" }
  ];

  const valueCards = [
    {
      badge: "STATE-OF-THE-ART AI",
      title: "Work with latest AI accessibility technology",
      desc: "Our proprietary AI models scan and remediate code structural errors, alt text, and ARIA attributes in real time.",
      color: "bg-[#004bff] text-white"
    },
    {
      badge: "LEGAL SAFETY",
      title: "Mitigate legal risk for you and your users",
      desc: "Protect your website builders and hosting clients from ADA Title III, EAA, and Section 508 legal actions with legal statements.",
      color: "bg-[#0b1c34] text-white"
    },
    {
      badge: "CMS INDEPENDENT",
      title: "Integrate into any CMS within minutes",
      desc: "Deploy our modular JS bundles or REST APIs directly inside website layouts, themes, or core platform templates.",
      color: "bg-emerald-50 text-slate-800 border border-emerald-100"
    }
  ];

  const perksGrid = [
    {
      title: "Dedicated Partner Manager",
      desc: "Get 1-on-1 assistance from partner success representatives to review integration plans, API documentation, and handle custom accounts.",
      icon: Users
    },
    {
      title: "Marketing & Sales Materials",
      desc: "Access ready-to-use brochures, co-branded sheets, proposal slides, and user guides to display platform accessibility values.",
      icon: FileText
    },
    {
      title: "24/7 Priority API Support",
      desc: "Direct access to our senior software engineers and accessibility consultants for custom API endpoints and framework support.",
      icon: Cpu
    },
    {
      title: "Customer Portal Dashboard",
      desc: "Track active compliance indexes, download billing statements, review client scanner logs, and manage API keys easily.",
      icon: LineChart
    },
    {
      title: "Flexible Integration Models",
      desc: "Choose between fully white-labeled layouts, co-branded partner structures, or referral setups matching your business flows.",
      icon: Layers
    },
    {
      title: "Compliance Support",
      desc: "All client installations are supported by standard accessibility logs, monthly scanning, and litigation audit documentation.",
      icon: ShieldCheck
    }
  ];

  const supportDetails = [
    {
      title: "Dedicated Account Manager",
      desc: "Your account director helps structure platform packages, provides API roadmap updates, and hosts client education calls.",
      icon: Users
    },
    {
      title: "Technical & Legal Support",
      desc: "Our regulatory lawyers supply compliance certifications, VPAT reports, and expert legal review in case of audit inquiries.",
      icon: ShieldCheck
    },
    {
      title: "Customer Portal Dashboard",
      desc: "Generate detailed white-labeled report sheets, configure domain settings, and manage commission logs.",
      icon: LineChart
    },
    {
      title: "Continuous Monitoring Alignment",
      desc: "We provide automated tools to monitor layout accessibility, offering continuous regression tests and accessibility alignment updates.",
      icon: CheckCircle2
    }
  ];

  const products = [
    {
      badge: "AUTOMATED WIDGET",
      title: "2all-Widget",
      desc: "Our client-side accessibility interface. Allows users to adapt contrast, font sizing, screen readers, and keyboard profiles.",
      img: "/images/hands_collaboration.png"
    },
    {
      badge: "TESTING & MONITORING",
      title: "2all-Flow",
      desc: "DevOps compliance monitor. Scans staging code, integrates into CI/CD pipelines, and flags WCAG violations before production.",
      img: "/images/testing_session.png"
    },
    {
      badge: "PROFESSIONAL AUDITS",
      title: "2all-Services",
      desc: "Expert manual validation, real-user accessibility testing, and official VPAT/ACR compliance audit documentation.",
      img: "/images/nonprofit_group.png"
    }
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a1e3f] text-white pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,75,255,0.15)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content Column */}
            <div className="flex-1 space-y-6 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                PARTNERSHIPS FOR PLATFORMS
              </span>
              <Breadcrumbs theme="dark" items={[ { label: "Home", href: "/" }, { label: "Partners" }, { label: "Platform" } ]} />
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                The only solution that can <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic font-serif font-light">match your platform</span>
              </h1>
              
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
                Improve design layout, decrease code vulnerability, secure your website platform, and offer new value to users with full control over custom structures.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#register" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider transition-all shadow-md shadow-blue-600/15 inline-flex items-center gap-2"
                >
                  PARTNER WITH 2ALL.AI
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Graphics/Image Column */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-blue-500/10 rounded-[3rem] blur-2xl transform rotate-3" />
              {/* Browser Window Mockup */}
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-950 p-1 flex flex-col">
                {/* Browser Header Bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900 border-b border-white/5 rounded-t-[1.8rem]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="h-4 w-32 bg-slate-950/60 rounded ml-4 border border-white/5 text-[9px] text-slate-500 font-mono flex items-center justify-center">
                    2all.ai/partners/platform
                  </span>
                </div>
                {/* Browser Content */}
                <div className="relative rounded-b-[1.8rem] overflow-hidden aspect-[16/10] bg-slate-900">
                  <img 
                    src="/images/nonprofit_group.png" 
                    alt="Platform dashboard mockup" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  {/* Floating glassmorphic stat card */}
                  <div className="absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur-md px-4 py-3.5 rounded-2xl shadow-xl border border-white/10 max-w-xs text-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-xs">Platform API Status</div>
                        <div className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                          Integration Active <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section / Partner Logo Ticker */}
      <section className="bg-slate-50 py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">ACTIVE INTEGRATIONS ACROSS MAJOR SITE BUILDERS</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-slate-700 font-black text-lg">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="px-6 py-3 bg-white rounded-2xl border border-slate-200/50 shadow-sm flex flex-col items-center justify-center min-w-[150px]"
              >
                <span className="text-slate-950 font-black text-base">{stat.value}</span>
                <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your one-stop shop for web accessibility */}
      <section className="py-20 bg-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-3">
              Your one-stop shop for web accessibility
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              We supply state-of-the-art compliance tools natively integrated into platform architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueCards.map((card, i) => (
              <div 
                key={i} 
                className={`rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between min-h-[260px] transition-transform duration-300 hover:-translate-y-1 ${card.color}`}
              >
                <span className="text-[9px] font-black tracking-widest uppercase opacity-75">{card.badge}</span>
                <div className="space-y-3 mt-8">
                  <h3 className="text-lg font-extrabold tracking-tight leading-snug">{card.title}</h3>
                  <p className="text-xs leading-relaxed opacity-85 font-light">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with 2all.ai and see enterprise-level results */}
      <section className="py-20 bg-slate-50 border-y border-slate-100 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-4">
              Partner with 2all.ai and see enterprise-level results
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Join forces with our team to distribute, package, and custom-brand compliance toolkits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perksGrid.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={i} 
                  className="p-8 rounded-[2rem] bg-white border border-slate-200/50 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-700 w-fit group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-md font-extrabold text-slate-900 tracking-tight mt-6 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Ticker / Standards Badges */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-black tracking-widest text-[#004bff] uppercase mb-8">
            THE #1 RATED WEB ACCESSIBILITY SOLUTION FOR ADA & EAA COMPLIANCE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
            {["WCAG 2.1 AA", "ADA TITLE III", "SECTION 508", "EAA COMPLIANT", "G2 LEADER 2026"].map((badge, idx) => (
              <div 
                key={idx} 
                className="px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-[10px] font-black text-slate-700 tracking-widest shadow-sm"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Testimonial & Interactivity Panel (Get comprehensive litigation support you can count on) */}
      <section className="py-24 bg-[#08152c] text-white px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,75,255,0.12)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400 font-serif text-4xl font-black">
              “
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Get comprehensive litigation support you can count on
            </h2>
            <p className="text-sm text-slate-400 font-light">
              We stand behind our platform compliance with professional legal backup resources.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-stretch mt-12">
            
            {/* Interactive Tabs */}
            <div className="flex-1 flex flex-col gap-3 justify-center">
              {supportDetails.map((item, idx) => {
                const SpotlightIcon = item.icon;
                const isSelected = activeSupportDetail === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSupportDetail(idx)}
                    className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all border ${
                      isSelected 
                        ? "bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-600/10" 
                        : "bg-white/5 text-slate-300 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-white/20 text-white" : "bg-white/5 text-slate-300"}`}>
                      <SpotlightIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm">{item.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Display Panel */}
            <div className="flex-1 rounded-[2.5rem] bg-slate-900 border border-white/5 p-8 sm:p-12 flex flex-col justify-between shadow-2xl min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSupportDetail}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                    {React.createElement(supportDetails[activeSupportDetail].icon, { className: "w-6 h-6" })}
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {supportDetails[activeSupportDetail].title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    {supportDetails[activeSupportDetail].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <div className="border-t border-white/10 pt-6 mt-12 flex items-center justify-between text-xs text-slate-500">
                <span>SUPPORT RESOURCE ACTIVE</span>
                <span className="text-blue-400 font-extrabold flex items-center gap-1">
                  100% Free Access <Check className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-stack web accessibility from A to Z */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-4">
              Full-stack web accessibility from A to Z
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Deploy our modular components across your platform build structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((item, i) => (
              <div 
                key={i} 
                className="bg-white rounded-[2.2rem] overflow-hidden border border-slate-200/60 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-[#0a1e3f] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md">
                    {item.badge}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  <a 
                    href="/register" 
                    className="text-[10px] font-bold tracking-widest text-[#004bff] flex items-center gap-1.5 group-hover:gap-2.5 transition-all w-fit"
                  >
                    LEARN MORE
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section id="register" className="py-20 px-6 sm:px-12 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-700 to-blue-900 rounded-[3rem] text-white py-16 px-8 sm:px-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,180,255,0.15)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Add web accessibility to<br />
              <span className="text-cyan-300 italic font-serif font-light">your offering</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-light max-w-md mx-auto leading-relaxed">
              Unlock a complete suite of platform API integrations, automated widgets, developer tools, and litigation assistance.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <button 
                onClick={() => window.open('/register', '_self')}
                className="bg-white text-blue-900 hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider shadow-lg transition-all"
              >
                PARTNER WITH 2ALL.AI
              </button>
              <button 
                onClick={() => window.open('/contact-us', '_self')}
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider transition-all"
              >
                TALK TO PARTNER MGR
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
