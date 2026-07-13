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
  ChevronRight,
  ShieldCheck, 
  TrendingUp, 
  HeartHandshake,
  Play,
  Check,
  CheckCircle2,
  DollarSign,
  Briefcase,
  HelpCircle
} from 'lucide-react';

export default function AgencyPage() {
  const [activePartnerDetail, setActivePartnerDetail] = useState(0);

  const stats = [
    { value: "5,000+", label: "Agencies & Freelancers joined", highlight: false },
    { value: "$350K", label: "Additional annual agency revenue potential", highlight: true },
    { value: "125+", label: "Ready-to-use partner resources", highlight: false }
  ];

  const valueCards = [
    {
      badge: "CLIENT VALUE",
      title: "Offer WCAG, ADA, & Section 508 compliance",
      desc: "Help your clients achieve compliance, improve website usability, and protect their brand from litigation.",
      color: "bg-[#0b1c34] text-white"
    },
    {
      badge: "AGENCY VALUE",
      title: "Unlock recurring revenue streams",
      desc: "Earn 20% recurring commission on all referrals or pass direct savings to your clients with agency pricing.",
      color: "bg-[#004bff] text-white"
    },
    {
      badge: "SOCIAL IMPACT",
      title: "Build an inclusive web for everyone",
      desc: "Do good by helping make the digital world accessible to people with visual, auditory, motor, and cognitive impairments.",
      color: "bg-emerald-50 text-slate-800 border border-emerald-100"
    }
  ];

  const experienceGrid = [
    {
      title: "Dedicated Account Manager",
      desc: "Get 1-on-1 support from an accessibility expert to assist with deal strategy, client pitches, and technical onboarding.",
      icon: Users
    },
    {
      title: "Marketing & Sales Assets",
      desc: "Access a rich library of pitch decks, co-branded sheets, proposal templates, and email scripts ready for your logo.",
      icon: FileText
    },
    {
      title: "Client Audit Scans",
      desc: "Run unlimited compliance scans and generate detailed accessibility gap reports to showcase audit results to prospects.",
      icon: Search
    },
    {
      title: "Partner Portal Dashboard",
      desc: "Register leads, track installation statuses, download marketing collaterals, and request payouts in one centralized portal.",
      icon: LineChart
    },
    {
      title: "Live Training & Webinars",
      desc: "Join monthly technical and sales webinars to keep your engineering and design teams updated with latest WCAG changes.",
      icon: Globe
    },
    {
      title: "Legal & Litigation Support",
      desc: "Provide clients with professional compliance statements, documentation logs, and active legal advisory backing.",
      icon: ShieldCheck
    }
  ];

  const workflowSteps = [
    {
      num: "1",
      title: "Sign up",
      desc: "Submit your application to join the partner network and create your customized dashboard account."
    },
    {
      num: "2",
      title: "Use partner resources",
      desc: "Access your dashboard to retrieve training courses, pitch templates, and co-branded audit scanners."
    },
    {
      num: "3",
      title: "Earn ARR rewards",
      desc: "Add client websites, manage active installations, and watch your monthly recurring payout streams grow."
    }
  ];

  const partnerSpotlights = [
    {
      title: "Dedicated Account Manager",
      desc: "Your primary contact works with your team to review pipelines, prepare pitch structures, and coordinate technical onboarding.",
      icon: Users
    },
    {
      title: "Technical & Legal Support",
      desc: "Our regulatory compliance department assists your developers with custom integrations and supplies audit defense docs.",
      icon: ShieldCheck
    },
    {
      title: "Sales & Marketing Training",
      desc: "Receive ready-to-run marketing toolkits, email outreach schedules, and interactive sales training decks.",
      icon: FileText
    },
    {
      title: "Free Accessibility Audits",
      desc: "Scan prospective client websites using our automated checker to identify and demonstrate WCAG violations instantly.",
      icon: Search
    }
  ];

  const caseStudies = [
    {
      tag: "AGENCY SPOTLIGHT",
      title: "How DigitalLink added $84K ARR in 6 months",
      desc: "Learn how a mid-sized design agency integrated accessibility audits into their standard retainer agreements.",
      img: "/images/testing_session.png"
    },
    {
      tag: "REVENUE CASE STUDY",
      title: "Upselling compliance to retail clients",
      desc: "A step-by-step review of pitching digital inclusion to e-commerce clients resulting in a 90% contract attachment rate.",
      img: "/images/community_selfie.png"
    },
    {
      tag: "PARTNER STORY",
      title: "From custom code to automated scale",
      desc: "How agencies use our compliance widgets to secure client sites instantly while cutting developer review hours by 70%.",
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
                2ALL.AI FOR AGENCIES
              </span>
              <Breadcrumbs theme="dark" items={[ { label: "Home", href: "/" }, { label: "Partners" }, { label: "Agency" } ]} />
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                More revenue.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic font-serif font-light">Happier clients.</span>
              </h1>
              
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
                Join the leading web accessibility partnership program. Position your agency as an accessibility champion, expand your service suite, and generate new recurring revenue streams.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#register" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider transition-all shadow-md shadow-blue-600/15 inline-flex items-center gap-2"
                >
                  JOIN THE PROGRAM
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
                    2all.ai/partners/agency
                  </span>
                </div>
                {/* Browser Content */}
                <div className="relative rounded-b-[1.8rem] overflow-hidden aspect-[16/10] bg-slate-900">
                  <img 
                    src="/images/testing_session.png" 
                    alt="Agency collaboration" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  {/* Floating glassmorphic stat card */}
                  <div className="absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur-md px-4 py-3.5 rounded-2xl shadow-xl border border-white/10 max-w-xs text-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-xs">Average Monthly Earnings</div>
                        <div className="text-[14px] text-emerald-400 font-black mt-0.5">$8,600 / mo</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Face Avatars */}
                  <div className="absolute top-6 right-6 flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&crop=faces",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&crop=faces",
                      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&fit=crop&crop=faces"
                    ].map((avatar, idx) => (
                      <img 
                        key={idx}
                        src={avatar}
                        alt="Partner Avatar"
                        className="w-8 h-8 rounded-full border-2 border-slate-950 object-cover"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-white">
                      +5k
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section (Matching background pattern in screenshot) */}
      <section className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`rounded-[2rem] p-8 text-center flex flex-col justify-center items-center shadow-sm min-h-[160px] transition-transform duration-300 ${
                  stat.highlight 
                    ? "bg-[#0a1e3f] text-white md:-translate-y-4 shadow-xl shadow-slate-900/10" 
                    : "bg-white text-slate-800 border border-slate-100/50"
                }`}
              >
                <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className={`text-xs font-semibold max-w-[200px] tracking-wide leading-relaxed ${
                  stat.highlight ? "text-slate-300" : "text-slate-500"
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Way Street Section */}
      <section className="py-20 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Column */}
            <div className="flex-1 w-full relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] -rotate-2" />
              <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white p-4">
                <img 
                  src="/images/hands_collaboration.png" 
                  alt="Partnership Handshake" 
                  className="w-full h-auto rounded-3xl object-cover aspect-[4/3]"
                />
                <div className="absolute top-8 left-8 bg-[#004bff] text-white text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg">
                  Partner Network
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="flex-1 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#004bff]">MUTUAL COMMITMENT</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                A partner relationship is a two-way street
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                As a partner, your success is our top priority. We're dedicated to helping you grow, provide value to your clients, and make the web accessible to everyone. We back your agency with complete sales enablement and engineering.
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  "Unlock recurring revenue splits on all accounts",
                  "Offer clients compliance backed by litigation support",
                  "Expand client lifetime value (LTV) with direct design upsells"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a 
                  href="#register"
                  className="bg-[#0a1e3f] hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider transition-all inline-flex items-center gap-2"
                >
                  Join Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-20 bg-slate-50 border-y border-slate-100 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-3">
              Value for your agency. Value for your clients.
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              We design our solutions to benefit both your internal bottom line and your client relationships.
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

      {/* The Complete Agency Experience Grid */}
      <section className="py-24 bg-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-4">
              The complete agency experience with 2all.ai
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Everything you need to confidently launch, pitch, scale, and manage compliance audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experienceGrid.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={i} 
                  className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
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

      {/* Compliance Trust Badges Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-black tracking-widest text-[#004bff] uppercase mb-8">
            THE #1 WEB ACCESSIBILITY SOLUTION FOR ADA & EAA COMPLIANCE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
            {["WCAG 2.1 AA", "ADA TITLE III", "SECTION 508", "EAA COMPLIANT", "G2 LEADER 2026"].map((badge, idx) => (
              <div 
                key={idx} 
                className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-[10px] font-black text-slate-700 tracking-widest shadow-sm"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Testimonial & Interactivity Panel */}
      <section className="py-24 bg-[#08152c] text-white px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,75,255,0.12)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400 font-serif text-4xl font-black">
              “
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Get an expert you can count on
            </h2>
            <p className="text-sm text-slate-400 font-light">
              We provide full hands-on support. Click through the categories below to see the support structures we deploy for your agency.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-stretch mt-12">
            
            {/* Interactive Tabs */}
            <div className="flex-1 flex flex-col gap-3 justify-center">
              {partnerSpotlights.map((item, idx) => {
                const SpotlightIcon = item.icon;
                const isSelected = activePartnerDetail === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePartnerDetail(idx)}
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
                  key={activePartnerDetail}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                    {React.createElement(partnerSpotlights[activePartnerDetail].icon, { className: "w-6 h-6" })}
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {partnerSpotlights[activePartnerDetail].title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    {partnerSpotlights[activePartnerDetail].desc}
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

      {/* How it Works Workflow */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-4">
              How our Partner Program works
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Start expanding your product catalog and collecting passive recurring income in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, i) => (
              <div 
                key={i} 
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                <div className="absolute -top-4 -right-4 text-7xl font-black text-slate-50 pointer-events-none select-none">
                  {step.num}
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-black text-xs flex items-center justify-center mb-6 relative z-10">
                  {step.num}
                </div>
                <div className="space-y-2 relative z-10">
                  <h3 className="text-md font-extrabold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid (Our partners speak for themselves) */}
      <section className="py-24 bg-white px-6 sm:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-4">
              Our agency partners speak for themselves
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Join thousands of digital agencies scaling client retention and compliance ARR.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 bg-slate-50 rounded-[3rem] p-8 sm:p-12 border border-slate-100">
            {/* Left Column Graphic */}
            <div className="flex-1 w-full bg-white rounded-2xl p-6 border border-slate-200/60 shadow-lg shadow-slate-100/50 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#004bff] tracking-wider uppercase">PARTNER SUCCESS METER</span>
                <span className="text-emerald-500 text-xs font-bold">+28% YoY Growth</span>
              </div>
              <div className="h-40 bg-slate-50 rounded-xl relative overflow-hidden p-4 flex flex-col justify-between border border-slate-100">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Active Domains</div>
                  <div className="text-2xl font-black text-slate-900">4,280 Sites</div>
                </div>
                {/* Visual Chart Bars representing growth */}
                <div className="flex items-end gap-2 h-16 pt-2">
                  <div className="flex-1 bg-blue-100 rounded-md h-4" />
                  <div className="flex-1 bg-blue-200 rounded-md h-8" />
                  <div className="flex-1 bg-blue-300 rounded-md h-12" />
                  <div className="flex-1 bg-[#004bff] rounded-md h-16" />
                </div>
              </div>
            </div>
            {/* Right Column Testimonial text */}
            <div className="flex-1 space-y-6">
              <div className="flex gap-1 text-amber-400">
                {"★★★★★".split("").map((star, idx) => (
                  <span key={idx} className="text-lg">{star}</span>
                ))}
              </div>
              <blockquote className="text-lg font-light text-slate-700 italic leading-relaxed">
                "Integrating 2all.ai was a zero-friction process. We referred our first 30 retail client websites in a week, secured their compliance layout, and unlocked a high monthly referral payout structure instantly."
              </blockquote>
              <div>
                <div className="font-extrabold text-sm text-slate-900">Samantha Vance</div>
                <div className="text-xs text-slate-500 font-medium">Head of Accounts at BlueHorizon Studios</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / Action Impact Cards */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-4">
              Partner impact in action
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Read real-world case studies detailing how agencies expand services and build inclusive sites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((item, i) => (
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
                    {item.tag}
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
                    href="#register" 
                    className="text-[10px] font-bold tracking-widest text-[#004bff] flex items-center gap-1.5 group-hover:gap-2.5 transition-all w-fit"
                  >
                    READ CASE STUDY
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
              Drive revenue with<br />
              <span className="text-cyan-300 italic font-serif font-light">web accessibility</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-light max-w-md mx-auto leading-relaxed">
              Unlock a complete suite of agency referral resources, automated tools, and co-branded marketing assets. Let's make the web inclusive together.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <button 
                onClick={() => window.open('/register', '_self')}
                className="bg-white text-blue-900 hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider shadow-lg transition-all"
              >
                JOIN THE PARTNER PORTAL
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
