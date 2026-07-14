"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Zap, 
  Globe2, 
  Sparkles, 
  ArrowRight, 
  Code, 
  Terminal, 
  ArrowLeftRight,
  Accessibility
} from "lucide-react";

export default function WhyChoose2allAiPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const g2Metrics = [
    { label: "Ease of Administration", ours: 9.6, theirs: 8.2 },
    { label: "Quality of Support", ours: 9.8, theirs: 8.5 },
    { label: "Ease of Setup", ours: 9.5, theirs: 8.0 },
    { label: "Ease of Use", ours: 9.4, theirs: 8.1 }
  ];

  const complianceBadges = [
    { name: "ADA", desc: "US Title III compliance support" },
    { name: "WCAG 2.2", desc: "Latest web accessibility standards" },
    { name: "Section 508", desc: "US Federal procurement rules" },
    { name: "EN 301549", desc: "European Union digital standards" },
    { name: "AODA", desc: "Ontario accessibility guidelines" }
  ];

  const faqItems = [
    {
      q: "How does 2all.ai compare to traditional manual accessibility services?",
      a: "Traditional agencies cost thousands of dollars per audit and take weeks to implement. 2all.ai scans and fixes over 70% of accessibility violations automatically within 48 hours of installation for a fraction of the cost, while keeping your website compliant continuously."
    },
    {
      q: "Will 2all.ai slow down my website's page load speeds?",
      a: "No. The 2all.ai script loads asynchronously from a global CDN, meaning it runs in the background and has zero impact on your core page loading speed, SEO, or Google Lighthouse Vitals."
    },
    {
      q: "Is 2all.ai fully compliant with WCAG 2.2 and ADA standards?",
      a: "Yes. Our AI engine and accessibility widget are engineered from the ground up to address WCAG 2.2 Level AA guidelines, supporting compliance under the Americans with Disabilities Act (ADA), Section 508, and global legislation."
    },
    {
      q: "How often does 2all.ai scan my site for new content changes?",
      a: "Our AI walks the DOM on every session and runs a complete full-site accessibility scanner sweep every 24 hours, ensuring new products, articles, or layout updates are accessible instantly without developer intervention."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
      <Navbar />

      {/* ── 1. BLUE HERO HEADER ── */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,255,77,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Why Choose 2all.ai" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Why choose <span className="text-[#C8FF4D]">2all.ai</span>?
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Join thousands of businesses that trust 2all.ai to help improve alignment with WCAG 2.2, ADA, Section 508, and global web accessibility standards.
          </p>
          
          <div className="pt-4">
            <button className="bg-white hover:bg-slate-100 text-[#041d57] px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:scale-105 shadow-xl">
              Compare Us &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. G2 LEADER / METRICS COMPARISON ── */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 text-left">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">G2 Leader Standings</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              G2 ranks 2all.ai as a Grid Leader.
            </h2>
            <p className="text-slate-500 text-md leading-relaxed">
              Based on real verified user feedback, 2all.ai consistently outperforms the industry standards in ease of use, setup complexity, and dedicated compliance support.
            </p>
            
            <ul className="space-y-3.5 pt-2">
              {[
                "Ranked #1 in ease of administration and widget utility",
                "Automated DOM correction with zero layout shifts",
                "98% average satisfaction rating on customer support channels"
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                  </div>
                  <span className="text-slate-600 font-semibold text-sm">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* G2 Styled Comparison Card */}
          <div className="bg-slate-50 rounded-[32px] border border-slate-100 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
            
            <div className="flex justify-between items-center border-b border-slate-200/80 pb-5 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400 bg-emerald-500/10 rounded p-0.5 border border-emerald-500/20" />
                <span className="text-xs font-black text-slate-900 tracking-tight">2all.ai (Grid Leader)</span>
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Industry Competitor</span>
            </div>

            <div className="space-y-5">
              {g2Metrics.map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-slate-600 flex-grow text-left">{metric.label}</span>
                  
                  <div className="flex items-center gap-6 shrink-0">
                    {/* Ours score gauge */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="16" cy="16" r="13" className="stroke-slate-200 fill-none" strokeWidth="2" />
                          <circle cx="16" cy="16" r="13" className="stroke-emerald-500 fill-none" strokeWidth="2.5" strokeDasharray="81" strokeDashoffset={81 - (81 * metric.ours) / 10} />
                        </svg>
                        <span className="absolute text-[8px] font-black text-emerald-600 font-mono">{metric.ours}</span>
                      </div>
                    </div>

                    {/* Theirs score gauge */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="16" cy="16" r="13" className="stroke-slate-200 fill-none" strokeWidth="2" />
                          <circle cx="16" cy="16" r="13" className="stroke-slate-400 fill-none" strokeWidth="2.5" strokeDasharray="81" strokeDashoffset={81 - (81 * metric.theirs) / 10} />
                        </svg>
                        <span className="absolute text-[8px] font-black text-slate-500 font-mono">{metric.theirs}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. FULL COMPLIANCE SUPPORT ── */}
      <section className="py-24 px-6 bg-slate-50/50 border-y border-slate-100 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Compliance Support</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Comprehensive Accessibility Alignment</h2>
            <p className="text-slate-500 text-md max-w-xl mx-auto leading-relaxed">
              We dynamically monitor legislation changes to help align with international accessibility standards.
            </p>
          </div>

          {/* Standards Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {complianceBadges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3 bg-white p-6 rounded-[24px] border border-slate-200/80 shadow-sm w-36 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-black text-slate-800 tracking-tight">{badge.name}</h4>
                <span className="text-[7.5px] text-slate-400 font-medium leading-relaxed block">{badge.desc}</span>
              </div>
            ))}
          </div>

          <div>
            <button className="bg-[#0b3c96] hover:bg-[#082d70] text-white px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-colors shadow-lg">
              View Compliance Standard details
            </button>
          </div>

        </div>
      </section>

      {/* ── 4. WORKFLOWS & MOCKUP PREVIEW ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Glass dashboard mockup rendering */}
          <div className="relative rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl bg-slate-950 aspect-[16/10] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,216,255,0.15)_0%,transparent_60%)] pointer-events-none" />
            <div className="p-8 text-left w-full h-full flex flex-col justify-between text-white font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-slate-400 font-sans font-bold">2all-ai.dashboard / metrics</span>
                <span className="text-emerald-400 font-sans font-bold uppercase tracking-wider">Online</span>
              </div>
              
              <div className="flex-grow flex flex-col justify-center space-y-3 py-6">
                <div className="text-slate-500">// Fetching live DOM tree accessibility checks...</div>
                <div className="text-[#C8FF4D]">Check #1: ARIA Landmark role validation [OK]</div>
                <div className="text-cyan-300">Check #2: Contrast ratio sweep index [96% Pass]</div>
                <div className="text-red-400/90">- Missing Alt text on &lt;img src="hero.png"&gt;</div>
                <div className="text-emerald-400">+ Injected: alt="Corporate marketing dashboard banner"</div>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between text-slate-500 text-[8px]">
                <span>2all.ai AI Scanner Engine v4.0.2</span>
                <span>Audit complete &bull; 0 issues remaining</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Workflow Integration</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Tailored solutions, simplified.</h2>
            <p className="text-slate-500 text-md leading-relaxed">
              We fit perfectly into your existing ecosystem. Installing 2all.ai requires no infrastructure code modifications. Our widget runs asynchronously without impacting page responsiveness.
            </p>
            <div>
              <button className="bg-[#0b3c96] hover:bg-[#082d70] text-white px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-colors shadow-lg">
                Explore Custom Integrations
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. THREE FEATURE ROW CARD CAROUSEL ── */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase font-sans">Core Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Automated, Continuous Accessibility</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Leading-edge automated remediation",
                desc: "AI automatically updates target tags, image alt properties, structural headers, and focus loops in the DOM real-time.",
                bg: "from-blue-600/5 to-cyan-500/5 border-blue-100/50"
              },
              {
                title: "Regular testing & verification",
                desc: "Runs automated daily accessibility scans to help identify new accessibility issues as layouts change.",
                bg: "from-amber-600/5 to-orange-500/5 border-amber-100/50"
              },
              {
                title: "Dedicated accessibility support",
                desc: "Certified specialists are standing by 24/7 to handle customized code remits, audits, and custom accessibility templates.",
                bg: "from-purple-600/5 to-indigo-500/5 border-purple-100/50"
              }
            ].map((card, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${card.bg} border rounded-[32px] p-8 text-left flex flex-col justify-between h-[240px] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white`}>
                <div className="space-y-4">
                  <h4 className="text-lg font-black text-slate-800 tracking-tight leading-snug">{card.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. DEVELOPER API SECTION (Dark Navy) ── */}
      <section className="py-24 px-6 bg-[#070b13] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 text-left">
            <span className="text-xs font-black tracking-widest text-[#7FD8FF] uppercase">Developer Portal</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Simplifies tools for developers.
            </h2>
            <p className="text-slate-400 text-md leading-relaxed">
              Integrate web compliance directly into your deployment pipeline. Use our lightweight API SDKs and automatic build triggers to scan layouts pre-production.
            </p>
            <div>
              <button className="bg-white hover:bg-slate-100 text-[#070b13] px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-colors shadow-lg">
                View Documentation
              </button>
            </div>
          </div>

          {/* Dev Terminal Interface Mockup */}
          <div className="bg-[#0B1220]/60 border border-slate-800/80 rounded-[32px] p-6 backdrop-blur-md shadow-2xl relative text-left">
            <div className="flex items-center gap-1.5 border-b border-slate-800/50 pb-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-[10px] text-slate-500 font-mono ml-2">2allai-api-integration.js</span>
            </div>
            
            <pre className="text-[11px] text-[#7FD8FF] font-mono leading-relaxed overflow-x-auto">
{`// Initialize 2all-ai automated DOM listener
import { AccessibilityScanner } from '@2allai/sdk';

const scanner = new AccessibilityScanner({
  apiKey: 'pk_live_2allai_96a0a7f',
  remediationMode: 'auto-fix',
  prefersReducedMotion: true
});

// Start real-time DOM interception
scanner.observeDOM();
console.log('✓ 2all.ai active - DOM sweep initialized');`}
            </pre>
          </div>

        </div>
      </section>

      {/* ── 7. FAQ ACCORDION SECTION ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Support Desk</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently asked questions.</h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="py-5 text-left">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-slate-800 hover:text-[#0b3c96] transition-colors"
                >
                  <span className="text-md font-bold pr-4">{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-slate-500 mt-3.5 leading-relaxed pl-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 8. CALL TO ACTION BANNER ── */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0b3c96] to-[#041d57] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-400/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Supporting you <span className="text-[#C8FF4D] italic font-serif">every step</span> of the way.
            </h2>
            <p className="text-slate-200 text-md md:text-lg">
              Unlock a fully accessible web presence for your customers. Start scan correction under 2all.ai.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <button className="bg-white hover:bg-slate-100 text-[#041d57] px-8 py-4 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:scale-105 shadow-xl">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
