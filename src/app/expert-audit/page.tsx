"use client";
import Navbar from "@/components/marketing/Navbar";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, FileSearch, ShieldCheck, PenTool } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DemoModal from "@/components/marketing/DemoModal";

export default function ExpertAuditPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-50 relative font-sans text-[#0a1e3f]">
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-2 pb-8 md:pt-3 md:pb-10 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-blue-50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 max-w-xl relative z-10">
            <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Services" }, { label: "Expert Audit" } ]} />
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mt-3 mb-3 text-[#004bff]">Manual Accessibility Audit</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-[1.1] tracking-tight text-[#0a1e3f]">
              Rigorous manual testing by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bff] to-[#00ff87] italic font-serif font-light">accessibility experts</span>.
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Our certified experts dig deep into your code and UI, catching complex accessibility barriers that automated tools miss, ensuring strict WCAG compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowDemo(true)}
                className="bg-[#0a1e3f] hover:bg-blue-900 text-white px-7 py-3 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                REQUEST AN AUDIT
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[380px] md:h-[450px]">
             {/* Decorative Background */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 rounded-full blur-3xl" />
             
             {/* Mockup Card */}
             <div className="relative h-full w-full flex items-center justify-center p-6 z-10">
                 <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-7 w-full max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
                       <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Audit Report</div>
                          <div className="text-lg font-black text-[#0a1e3f]">WCAG 2.2 AA Analysis</div>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <CheckCircle className="w-5 h-5" />
                       </div>
                    </div>
                    
                    <div className="space-y-3.5">
                       <div className="flex items-start gap-3.5">
                          <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                             <div className="w-2 h-2 rounded-full bg-rose-500" />
                          </div>
                          <div>
                             <div className="font-bold text-xs md:text-sm text-[#0a1e3f]">Keyboard Trap Detected</div>
                             <div className="text-xs text-slate-500 mt-0.5">Checkout modal cannot be closed via Escape key. (WCAG 2.1.2)</div>
                          </div>
                       </div>
                       
                       <div className="flex items-start gap-3.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                             <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                          <div>
                             <div className="font-bold text-xs md:text-sm text-[#0a1e3f]">Contrast Verified</div>
                             <div className="text-xs text-slate-500 mt-0.5">All primary buttons pass 4.5:1 ratio. (WCAG 1.4.3)</div>
                          </div>
                       </div>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1e3f] mb-3">
              Comprehensive Manual Auditing
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
               Automated scanners only detect 20-30% of accessibility issues. Our manual audit uncovers the remaining 70-80% through exhaustive human testing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
             {[
               { icon: FileSearch, title: "Deep Component Analysis", desc: "Every interactive element is tested for keyboard operability and screen reader compatibility." },
               { icon: PenTool, title: "Remediation Code Snippets", desc: "We don't just report problems; we provide the exact ARIA attributes and HTML fixes you need." },
               { icon: ShieldCheck, title: "Compliance Certification", desc: "Receive a formal Letter of Conformance to demonstrate your commitment to accessibility." },
             ].map((feature, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-7 hover:-translate-y-1 transition-transform">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                      <feature.icon className="w-5 h-5 text-[#004bff]" />
                   </div>
                   <h3 className="text-lg font-bold text-[#0a1e3f] mb-2">{feature.title}</h3>
                   <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-[#0a1e3f] text-white">
         <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-medium leading-relaxed italic mb-6">
               "The expert audit report was incredibly thorough. The actionable remediation advice saved our development team hundreds of hours in research."
            </h3>
            <div className="flex items-center justify-center gap-4">
               <div className="text-center">
                  <div className="font-bold text-sm">Sarah Jenkins</div>
                  <div className="text-xs text-blue-200">VP of Engineering, FinTech Solutions</div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#004bff] py-12 md:py-14 px-6 md:px-12 lg:px-16 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
               Get a comprehensive WCAG compliance review today
            </h2>
            <button
              onClick={() => setShowDemo(true)}
              className="bg-white text-[#004bff] hover:bg-blue-50 px-7 py-3 rounded-full font-bold text-sm transition-all shadow-lg"
            >
               REQUEST AN AUDIT QUOTE
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
