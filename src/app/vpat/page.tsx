"use client";
import Navbar from "@/components/marketing/Navbar";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, CheckCircle2, FileText, ArrowRight, Check } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DemoModal from "@/components/marketing/DemoModal";

export default function VPATPage() {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden selection:bg-slate-100 font-sans">
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
      
      {/* Header Navigation */}
      <Navbar />

      <main className="w-full relative">
        {/* HERO SECTION */}
        <section className="w-full bg-[#311166] pt-1 md:pt-2 pb-10 md:pb-12 px-6 md:px-10 overflow-hidden relative">
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#491a8e] rounded-full blur-[120px] opacity-50 pointer-events-none transform translate-x-1/3" />
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-4 max-w-xl"
            >
              <Breadcrumbs className="mb-1" items={[ { label: "Home", href: "/" }, { label: "Services" }, { label: "VPAT" } ]} />
              <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.05] tracking-tight text-white">
                Secure more business<br/>with a <span className="italic font-serif text-cyan-300">VPAT</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed pb-4">
                Prove compliance, win enterprise contracts, and demonstrate your commitment to accessibility with a customized Voluntary Product Accessibility Template (VPAT).
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {/* BUTTON 1: Opens Demo Modal */}
                <button
                  onClick={() => setShowDemo(true)}
                  className="bg-white hover:bg-slate-100 text-[#311166] px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all shadow-xl shadow-black/10 inline-flex items-center gap-2 group"
                >
                  Request Expert Audit
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-lg mx-auto lg:max-w-none min-h-[500px]"
            >
              {/* Ultra-Neat VPAT Conformance Certificate Card */}
              <div className="bg-gradient-to-br from-[#4b1996] via-[#311166] to-[#2d0c5a] rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-7 relative overflow-hidden space-y-5 text-left text-white">
                
                {/* Top Header Bar */}
                <div className="border-b border-white/15 pb-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs font-mono font-bold text-white/90 truncate max-w-[200px]">VPAT_Conformance_2.4.pdf</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Conformance
                  </div>
                </div>

                {/* Document Title Block */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-widest">
                    <FileText className="w-4 h-4" /> VPAT 2.4 Edition
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                    Voluntary Product Accessibility Template
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Official conformance audit documentation for enterprise procurement, Section 508 & ADA legal verification.
                  </p>
                </div>

                {/* Conformance Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5">
                    <span className="block text-[10px] text-white/60 uppercase font-black tracking-wider">WCAG Conformance</span>
                    <span className="text-base sm:text-lg font-black text-emerald-400 flex items-center gap-1 mt-1">
                      <Check className="w-4 h-4" /> 100% AA Level
                    </span>
                  </div>
                  <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5">
                    <span className="block text-[10px] text-white/60 uppercase font-black tracking-wider">Legal Coverage</span>
                    <span className="text-base sm:text-lg font-black text-cyan-300 flex items-center gap-1 mt-1">
                      Section 508 / EAA
                    </span>
                  </div>
                </div>

                {/* Audit Checklist */}
                <div className="space-y-2.5 bg-black/30 p-4 rounded-2xl border border-white/10 text-xs font-medium">
                  <div className="flex items-center justify-between text-emerald-300">
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Perceivable (Text & Contrast)</span>
                    <span className="font-mono font-bold text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">SUPPORTS</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-300">
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Operable (Keyboard Navigation)</span>
                    <span className="font-mono font-bold text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">SUPPORTS</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-300">
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Understandable (Screen Reader)</span>
                    <span className="font-mono font-bold text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">SUPPORTS</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Uncover your accessibility */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* High-Resolution Accessibility Audit Dashboard Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group"
            >
              <img
                src="/images/vpat_audit_dashboard.png"
                alt="2all.ai VPAT Automated Accessibility Audit Dashboard"
                className="w-full h-auto object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-extrabold tracking-wide">Automated WCAG 2.1 AA Scanner</span>
                </div>
                <span className="font-mono font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30 text-[10px] uppercase">
                  100% Compliant
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-left"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Uncover your accessibility
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A VPAT (Voluntary Product Accessibility Template) is a document that explains how information and communication technology (ICT) products such as software, hardware, electronic content, and support documentation meet accessibility standards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: Identify the right VPAT */}
        <section className="w-full py-24 px-6 md:px-10 bg-[#060b27]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-left"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                We'll help identify the right VPAT for your business.
              </h2>
              <p className="text-slate-300 text-lg">
                Our accessibility specialists analyze your website and software architecture to issue standardized VPAT reports recognized across global enterprise procurement frameworks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-left"
            >
              {[
                { title: "Custom VPATs", desc: "Expert-driven analysis built for your unique product, no matter how complex." },
                { title: "Standardized Formats", desc: "Formats for Section 508, WCAG 2.1, and EN 301 549." },
                { title: "Fast Delivery", desc: "Get your detailed assessment completed and delivered promptly." },
                { title: "Actionable Insights", desc: "Clear recommendations to fix the identified accessibility issues." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: Compliance is priceless banner */}
        <section className="w-full py-20 px-6 md:px-10 bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto bg-[#311166] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#4b1996] to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Compliance is <span className="italic font-serif text-cyan-300 font-semibold">priceless</span>
              </h2>
              <p className="text-white/80 text-lg">
                Win enterprise contracts and mitigate legal risks with a comprehensive VPAT.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION 5: 3 Simple Steps */}
        <section className="w-full py-24 px-6 md:px-10 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                How to get a VPAT in <br className="md:hidden"/> 3 simple steps.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Audit", desc: "Our accessibility experts thoroughly audit your product against established standards." },
                { step: "2", title: "Remediate", desc: "We provide detailed guidance to help your development team fix identified issues." },
                { step: "3", title: "Generate VPAT", desc: "Once compliant, we issue your official VPAT document ready for procurement." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left"
                >
                  <div className="text-5xl font-light text-slate-300 mb-6 font-serif">{item.step}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Boost your business with a VPAT */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center">
              Boost your business with a VPAT
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 text-left">
              {[
                { title: "Increase market reach", desc: "Open doors to local, state, and federal government contracts that require compliance." },
                { title: "Enhance brand equity", desc: "Demonstrate that you value inclusivity and accessibility for all users." },
                { title: "Mitigate legal risk", desc: "Show proactive steps towards accessibility to avoid costly litigation and penalties." },
                { title: "Clear technical roadmap", desc: "Get a clear picture of what needs to be fixed and how to fix it." },
                { title: "Trust and transparency", desc: "Provide buyers with the exact accessibility status of your product." },
                { title: "Fast-track procurement", desc: "Speed up enterprise sales cycles with a ready-to-go accessibility statement." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* BUTTON 2: Dedicated Scan / Assessment Page */}
            <div className="flex justify-center pt-8">
              <Link 
                href="/access-scan"
                className="no-underline bg-[#004bff] hover:bg-[#003edd] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-md shadow-blue-500/20 inline-flex items-center gap-2 group"
              >
                Start Free Assessment
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 7: Disability Community */}
        <section className="w-full py-24 px-6 md:px-10 bg-[#311166] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#491a8e] rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 space-y-16">
            <h2 className="text-3xl md:text-5xl font-black text-white text-center max-w-3xl mx-auto tracking-tight leading-tight">
              When you win with accessibility, you work with the disability community
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { icon: <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />, title: "Over 1 billion people", desc: "Worldwide experience some form of disability." },
                { icon: <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />, title: "$1.2 Trillion", desc: "Annual disposable income of the disability market." },
                { icon: <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />, title: "Brand Loyalty", desc: "78% of people will purchase from accessible brands." }
              ].map((stat, i) => (
                <div key={i} className="space-y-4 pt-8 md:pt-0 px-4">
                  {stat.icon}
                  <h4 className="text-xl font-bold text-white">{stat.title}</h4>
                  <p className="text-white/70">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center">
              Frequently asked questions.
            </h2>
            <div className="divide-y divide-slate-100 border-y border-slate-100 text-left">
              {[
                { q: "What does VPAT stand for?", a: "VPAT stands for Voluntary Product Accessibility Template. It's a document that explains how a product conforms to accessibility standards like Section 508 and WCAG." },
                { q: "Who needs a VPAT?", a: "Any company looking to sell technology products to government agencies or large enterprises often needs a VPAT as part of the procurement process." },
                { q: "How long does it take to get a VPAT?", a: "The timeline depends on the complexity of your product, but standard audits typically take 2-4 weeks to complete." },
                { q: "Is a VPAT a legal guarantee?", a: "No, a VPAT is a self-disclosing document that outlines your product's accessibility status. It is not a legal certification, but it is required for compliance validation." }
              ].map((faq, i) => (
                <details key={i} className="group py-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                  <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-slate-600 mt-4 leading-relaxed pr-12">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Ready to get your VPAT stat? (BUTTON 3) */}
        <section className="w-full py-20 px-6 md:px-10 bg-[#e0f2fe]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight max-w-xl text-left">
              Ready to get your <br className="hidden md:block"/>
              <span className="italic font-serif text-[#004bff] font-semibold">VPAT</span> stat?
            </h2>
            
            {/* BUTTON 3: Dedicated Pricing / Get Started Page */}
            <Link 
              href="/pricing"
              className="no-underline bg-[#004bff] hover:bg-[#003edd] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap inline-flex items-center gap-2 group"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
