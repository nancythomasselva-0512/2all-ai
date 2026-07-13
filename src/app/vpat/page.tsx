"use client";
import Navbar from "@/components/marketing/Navbar";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, CheckCircle2, FileText, ArrowRight, Play, Check } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function VPATPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);



  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden selection:bg-slate-100 font-sans">
      
      {/* Header Navigation */}
      <Navbar />

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      <main className="w-full relative">
        {/* HERO SECTION */}
        <section className="w-full min-h-[90vh] bg-[#311166] flex items-center pt-16 pb-20 px-6 md:px-10 overflow-hidden relative">
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#491a8e] rounded-full blur-[120px] opacity-50 pointer-events-none transform translate-x-1/3" />
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-6 max-w-xl"
            >
              <Breadcrumbs items={[ { label: "Home", href: "/" }, { label: "Services" }, { label: "VPAT" } ]} />
              <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.05] tracking-tight text-white">
                Secure more business<br/>with a <span className="italic font-serif text-cyan-300">VPAT</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed pb-4">
                Prove compliance, win enterprise contracts, and demonstrate your commitment to accessibility with a customized Voluntary Product Accessibility Template (VPAT).
              </p>
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="bg-white hover:bg-slate-100 text-[#311166] px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all shadow-xl shadow-black/10 flex items-center gap-2 group"
              >
                Get a quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square max-w-md mx-auto lg:max-w-none lg:h-[600px]"
            >
              {/* Graphic Placeholder resembling the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4b1996] to-[#2d0c5a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
                 <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                   <div className="absolute top-10 right-10 bg-white p-3 rounded-full shadow-lg z-20">
                     <CheckCircle2 className="w-8 h-8 text-[#311166]" />
                   </div>
                   <div className="w-3/4 h-3/4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col overflow-hidden">
                     <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-400" />
                       <div className="w-3 h-3 rounded-full bg-amber-400" />
                       <div className="w-3 h-3 rounded-full bg-green-400" />
                     </div>
                     <div className="flex-1 p-6 flex flex-col gap-4">
                       <div className="w-full h-8 bg-white/10 rounded-md" />
                       <div className="w-3/4 h-8 bg-white/10 rounded-md" />
                       <div className="w-1/2 h-8 bg-white/10 rounded-md" />
                       <div className="mt-auto flex justify-end">
                         <div className="w-24 h-10 bg-cyan-400 rounded-lg" />
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Uncover your accessibility */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Graphic Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-50 p-8">
                 <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    <div className="h-12 border-b border-slate-100 flex items-center px-6 gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="h-4 w-32 bg-slate-100 rounded" />
                    </div>
                    <div className="flex-1 p-6 space-y-4">
                      <div className="h-4 w-full bg-slate-100 rounded" />
                      <div className="h-4 w-5/6 bg-slate-100 rounded" />
                      <div className="h-4 w-4/6 bg-slate-100 rounded" />
                    </div>
                 </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
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
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                We'll help identify the right VPAT for your business.
              </h2>
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="bg-cyan-400 hover:bg-cyan-300 text-[#060b27] px-8 py-3.5 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors"
              >
                Get a quote
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
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
            {/* Background Accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#4b1996] to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Compliance is <span className="italic font-serif text-cyan-300 font-semibold">priceless</span>
              </h2>
              <p className="text-white/80 text-lg">
                Win enterprise contracts and mitigate legal risks with a comprehensive VPAT.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0">
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="bg-white hover:bg-slate-100 text-[#311166] px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-xl"
              >
                Get a quote
              </button>
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
                  className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
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
            <div className="flex justify-center pt-8">
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="bg-[#004bff] hover:bg-[#003edd] text-white px-8 py-3.5 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-md shadow-blue-500/20"
              >
                Get a quote
              </button>
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
            <div className="divide-y divide-slate-100 border-y border-slate-100">
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

        {/* SECTION 9: Ready to get your VPAT stat? */}
        <section className="w-full py-20 px-6 md:px-10 bg-[#e0f2fe]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight max-w-xl">
              Ready to get your <br className="hidden md:block"/>
              <span className="italic font-serif text-[#004bff] font-semibold">VPAT</span> stat?
            </h2>
            <button 
              onClick={() => setIsDemoOpen(true)}
              className="bg-[#004bff] hover:bg-[#003edd] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap"
            >
              Get a quote
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
