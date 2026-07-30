"use client";
import Navbar from "@/components/marketing/Navbar";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Shield, Lock, FileText, Settings, Users, Monitor, Award, Star } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DemoModal from "@/components/marketing/DemoModal";

export default function MidLargeBusinessPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white relative font-sans text-[#0a1e3f]">
      {/* Header */}
      <Navbar />

      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#061826] via-[#112a46] to-[#004bff] pt-2 pb-10 md:pt-3 md:pb-14 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-1 text-white max-w-xl">
            <Breadcrumbs items={[ { label: "Home", href: "/" }, { label: "Business Size" }, { label: "Mid-Large Business" } ]} />
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mt-3 mb-3 text-emerald-300">For mid-large businesses</div>
            <h1 className="text-4xl md:text-5xl font-black mb-5 leading-[1.1] tracking-tight">
              Your website's<br />
              accessibility. Our<br />
              custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#60efff] italic font-serif font-light">expertise</span>.
            </h1>
            <p className="text-base md:text-lg text-blue-50 mb-8 leading-relaxed font-medium">
              We help medium and large businesses solve accessibility challenges, minimize risk, and open their doors to everyone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="no-underline bg-white text-[#004bff] hover:bg-blue-50 px-7 py-3 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                START FREE TRIAL
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="bg-transparent border-2 border-white/30 hover:border-white/70 text-white px-7 py-3 rounded-full font-bold text-sm transition-all"
              >
                BOOK A DEMO
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[450px]">
            <div className="absolute inset-0 bg-blue-600/20 rounded-[40px] blur-3xl transform rotate-12 scale-110" />
            <div className="relative h-full w-full bg-slate-900/10 rounded-[32px] border border-white/10 overflow-hidden shadow-2xl">
               <img src="/images/vpat_audit_dashboard.png" alt="Accessibility Audit Dashboard" className="absolute right-0 bottom-0 h-full w-full object-cover z-10 opacity-70" />
               <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 w-60 z-20">
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-blue-600" />
                     </div>
                     <div>
                        <div className="text-xs font-bold text-slate-800">WCAG Compliant</div>
                        <div className="text-[10px] text-slate-500">Scan completed</div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="h-2 bg-slate-100 rounded-full w-full"><div className="h-full bg-green-500 rounded-full w-[94%]" /></div>
                     <div className="h-2 bg-slate-100 rounded-full w-full"><div className="h-full bg-blue-500 rounded-full w-[100%]" /></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Logos */}
      <section className="py-6 bg-slate-50 border-b border-slate-100 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">Also trusted by world-class brands</span>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60 grayscale">
            <span className="font-serif text-lg font-bold text-slate-800">Acme Corp</span>
            <span className="font-sans text-lg font-black text-slate-800 tracking-tighter">GLOBEX</span>
            <span className="font-mono text-lg font-bold text-slate-800">SOYUZ</span>
            <span className="font-serif italic text-lg font-bold text-slate-800">Umbrella</span>
          </div>
        </div>
      </section>

      {/* Solutions Tailored Cards */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10 text-[#0a1e3f] max-w-2xl mx-auto leading-tight">
            Solutions tailored for your<br />medium or large brand.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0a1e3f] rounded-[28px] p-7 md:p-8 text-white transform transition-transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
              <h3 className="text-lg font-bold mb-3 relative z-10">Customized to your exact styling</h3>
              <p className="text-xs md:text-sm text-blue-100/80 leading-relaxed relative z-10 mb-6">
                Seamlessly match your website's exact styling and aesthetics. We offer full design customization to align with your brand guidelines.
              </p>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative z-10">
                <Settings className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-[#f0f4ff] rounded-[28px] p-7 md:p-8 text-[#0a1e3f] transform transition-transform hover:-translate-y-1 border border-blue-50">
              <h3 className="text-lg font-bold mb-3">Dedicated API & custom integrations</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                Our technology integrates seamlessly with your existing tech stack. Access custom APIs, webhooks, and direct platform connections.
              </p>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 rounded-[28px] p-7 md:p-8 text-[#0a1e3f] transform transition-transform hover:-translate-y-1 border border-slate-100">
              <h3 className="text-lg font-bold mb-3">Comprehensive proxy support</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                For the highest level of security and performance, we offer dedicated proxy setups tailored for enterprise-scale environments.
              </p>
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Technology Section */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-lg">
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1e3f] mb-4 leading-tight">
              Put our advanced<br />technology to work
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed font-medium">
              We leverage AI and machine learning to scan, analyze, and repair accessibility issues in real-time, ensuring continuous compliance.
            </p>
            <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed font-medium">
              Our automated solutions handle the heavy lifting, giving your team back valuable time and resources.
            </p>
            <Link
              href="/register"
              className="no-underline bg-[#0a1e3f] hover:bg-blue-900 text-white px-7 py-3 rounded-full font-bold text-sm transition-all shadow-md inline-flex items-center"
            >
              START FREE TRIAL
            </Link>
          </div>
          <div className="flex-1 w-full relative">
            <div className="bg-[#e6f0ff] rounded-[32px] aspect-[4/3] flex items-center justify-center relative overflow-hidden border border-blue-50">
               {/* Abstract UI Mockup */}
               <div className="w-[85%] h-[75%] bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-xl relative p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                     <div className="w-28 h-3.5 bg-slate-200 rounded-full" />
                     <div className="w-7 h-7 rounded-full bg-blue-100" />
                  </div>
                  <div className="flex gap-3">
                     <div className="flex-1 bg-white rounded-xl h-20 border border-slate-100 p-3 shadow-sm flex flex-col justify-end gap-2">
                        <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                        <div className="h-2 w-full bg-blue-500 rounded-full" />
                     </div>
                     <div className="flex-1 bg-white rounded-xl h-20 border border-slate-100 p-3 shadow-sm flex flex-col justify-end gap-2">
                        <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                        <div className="h-2 w-[80%] bg-green-500 rounded-full" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Banner - Audit Check */}
      <section className="bg-[#004bff] py-10 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-blue-600/30 rounded-2xl p-6 md:p-8 border border-blue-400/30">
          <h2 className="text-xl md:text-2xl font-black text-white">
            Find out <span className="italic font-serif font-light">now</span> if your<br />website is accessible
          </h2>
          <div className="flex w-full md:w-auto flex-col sm:flex-row gap-2 bg-white/10 p-1.5 rounded-full backdrop-blur-sm border border-white/20">
            <input 
              type="text" 
              placeholder="Enter your website URL" 
              className="bg-transparent border-none text-white placeholder:text-blue-100 px-4 py-2 outline-none w-full md:w-60 text-sm"
            />
            <button className="bg-white text-[#004bff] px-6 py-2 rounded-full font-bold text-xs whitespace-nowrap hover:bg-blue-50 transition-colors shadow-sm">
              GET A FREE AUDIT
            </button>
          </div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1e3f] mb-2">
              One simple solution.<br />Lots of advanced features.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 max-w-5xl mx-auto">
             {[
               { title: "Accessibility statement and badge", desc: "Showcase your commitment to inclusion with a certified statement." },
               { title: "Monthly AI-powered scans", desc: "Automated checks run monthly to ensure continuous compliance." },
               { title: "Detailed audit reports", desc: "Download comprehensive PDF reports for your internal teams." },
               { title: "Screen reader optimization", desc: "Ensure visually impaired users can navigate perfectly." },
               { title: "Keyboard navigation", desc: "Full keyboard operability for users with motor impairments." },
               { title: "24/7 technical support", desc: "Dedicated enterprise support teams ready to assist at any time." },
             ].map((feature, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                   <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-3 h-3 text-[#004bff]" />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#0a1e3f] text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link
              href="/platform"
              className="no-underline bg-[#0a1e3f] hover:bg-blue-900 text-white px-7 py-3 rounded-full font-bold text-xs transition-all shadow-md inline-flex items-center"
            >
              VIEW ALL FEATURES
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-10 md:py-12 px-6 md:px-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-black text-[#0a1e3f] mb-8">
            Litigation Support & Web accessibility compliance
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
             {['ADA', 'WCAG 2.1', 'Section 508', 'AODA', 'EN 301 549'].map((badge, idx) => (
               <div key={idx} className="w-20 h-20 rounded-full bg-white shadow-sm border border-blue-50 flex items-center justify-center text-[#0a1e3f] font-black text-xs text-center px-2">
                  {badge}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="bg-[#0a1e3f] py-12 md:py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex-1 max-w-lg">
             <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 text-blue-300">TRUST & TRANSPARENCY</div>
             <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
               Top-grade security & privacy
             </h2>
             <p className="text-sm text-blue-100 mb-6 leading-relaxed">
               We adhere to the strictest global data privacy regulations and security standards to ensure your enterprise data is always protected.
             </p>
             <Link
               href="/security-and-privacy"
               className="no-underline bg-white text-[#0a1e3f] hover:bg-slate-100 px-7 py-3 rounded-full font-bold text-xs transition-all inline-flex items-center"
             >
               LEARN MORE
             </Link>
           </div>
           <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-40 h-40 rounded-full border-2 border-blue-400/30 flex items-center justify-center relative">
                 <div className="w-32 h-32 rounded-full border-2 border-blue-400/50 flex items-center justify-center bg-blue-500/10 backdrop-blur-md">
                    <div className="text-center">
                       <Lock className="w-6 h-6 text-white mx-auto mb-1" />
                       <span className="font-bold text-white tracking-widest text-xs">SOC 2</span>
                       <div className="text-[9px] text-blue-200 mt-0.5">COMPLIANT</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Comprehensive Litigation Support */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-4">
               <FileText className="w-6 h-6 text-[#004bff]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1e3f] mb-6">
              Get comprehensive litigation<br />support you can count on
            </h2>
            <Link
              href="/litigation-support"
              className="no-underline bg-[#0a1e3f] hover:bg-blue-900 text-white px-7 py-3 rounded-full font-bold text-xs transition-all shadow-md inline-flex items-center"
            >
              LEARN MORE
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
             {[
               { icon: FileText, title: "Detailed Documentation" },
               { icon: Shield, title: "Compliance Certification" },
               { icon: Users, title: "Expert Legal Consultation" },
               { icon: Award, title: "Priority Support SLAs" },
             ].map((card, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
                   <card.icon className="w-5 h-5 text-[#004bff] mx-auto mb-3" />
                   <h4 className="font-bold text-[#0a1e3f] text-xs">{card.title}</h4>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* G2 Rating */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white border-t border-slate-100">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 max-w-xl text-center md:text-left">
               <h3 className="text-xl md:text-2xl font-black text-[#0a1e3f] mb-3 leading-snug">
                 The <span className="text-[#004bff]">#1 rated</span> web accessibility solution for ADA & WCAG compliance
               </h3>
               <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                     <span className="font-bold text-slate-900 text-sm">4.8 / 5</span>
                     <div className="flex text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                     </div>
                  </div>
                  <span className="text-xs font-extrabold tracking-wider uppercase text-[#004bff] bg-blue-50 px-3 py-1.5 rounded-full">G2 Reviews</span>
               </div>
            </div>
            
            {/* Real SVG G2 Badges */}
            <div className="flex flex-wrap justify-center gap-3">
               {[
                 { season: "SUMMER 2026", label: "Leader" },
                 { season: "SUMMER 2026", label: "Best Usability" },
                 { season: "SUMMER 2026", label: "Best ROI" },
               ].map((b, i) => (
                 <div key={i} className="relative w-20 h-24 flex flex-col items-center">
                   <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                     <polygon points="50,3 97,28 97,92 50,117 3,92 3,28" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                   </svg>
                   <div className="relative z-10 flex flex-col items-center justify-between h-full py-3 px-1 text-center">
                     <span className="text-[6px] font-black text-amber-400 tracking-wider uppercase">{b.season}</span>
                     <div className="w-5 h-5 bg-[#FF492C] rounded flex items-center justify-center text-white font-black text-[9px]">G2</div>
                     <span className="text-[7.5px] font-bold text-white leading-tight">{b.label}</span>
                   </div>
                 </div>
               ))}
            </div>
         </div>
         
         <div className="max-w-4xl mx-auto mt-10 bg-[#e6f0ff] rounded-2xl p-6 md:p-8 border border-blue-50 relative">
            <p className="text-sm md:text-base font-medium text-[#0a1e3f] leading-relaxed relative z-10 italic">
               "2all.ai's accessibility tools have been incredibly vital for our global expansion. Their seamless integration and continuous monitoring keep our enterprise applications universally accessible without placing an undue burden on our development team."
            </p>
            <div className="mt-4 flex items-center gap-3">
               <div className="w-9 h-9 rounded-full bg-slate-300 overflow-hidden">
                  <img src="/images/avatar.jpg" className="w-full h-full object-cover" alt="User" />
               </div>
               <div>
                  <div className="font-bold text-[#0a1e3f] text-sm">Sarah Jenkins</div>
                  <div className="text-xs text-slate-500">VP of Engineering, GlobalTech</div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#004bff] py-12 px-6 md:px-12 text-center">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-black text-white text-left leading-tight">
               Discover the ultimate web<br />
               accessibility <span className="italic font-serif font-light text-blue-200">solution</span>
            </h2>
            <Link
              href="/register"
              className="no-underline bg-white text-[#004bff] hover:bg-blue-50 px-7 py-3 rounded-full font-bold text-sm transition-all shadow-lg shrink-0"
            >
               START FREE TRIAL
            </Link>
         </div>
      </section>

      <Footer />
    </div>
  );
}
