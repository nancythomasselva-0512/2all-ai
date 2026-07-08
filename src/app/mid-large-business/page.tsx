"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Check, Shield, Lock, FileText, ChevronRight, Settings, Users, Monitor, Award, Star } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import ResourcesMegamenu from "@/components/marketing/ResourcesMegamenu";

export default function MidLargeBusinessPage() {
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = (menu: string) => setActiveHoverMenu(menu);
  const closeMenuWithDelay = () => {
    setTimeout(() => {
      const isHovering = document.querySelector(':hover')?.closest('.megamenu-container');
      if (!isHovering) setActiveHoverMenu(null);
    }, 100);
  };

  const navTextClass = isScrolled ? "text-[#374b6c]" : "text-white";
  const navHoverClass = isScrolled ? "hover:text-[#004bff]" : "hover:text-blue-100";
  const logoClass = isScrolled ? "mix-blend-multiply" : "brightness-0 invert";

  return (
    <div className="min-h-screen w-full bg-white relative font-sans text-[#0a1e3f]">
      {/* Header */}
      <header 
        onMouseLeave={() => setActiveHoverMenu(null)}
        className={`w-full py-3 px-4 md:px-10 z-50 shrink-0 fixed top-0 transition-all duration-300 ease-out border-b ${isScrolled ? 'bg-white shadow-sm border-slate-200/50' : 'bg-[#004bff] border-transparent'}`}
      >
        <div className="w-full flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="md:px-4 py-1.5 flex items-center justify-between flex-grow">
            <Link href="/" className="flex items-center mr-2 md:mr-6 shrink-0">
              <img src="/images/logo.png" alt="2all.ai Logo" className={`h-10 md:h-14 w-auto object-contain transition-all ${logoClass}`} />
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
                  onMouseEnter={() => {
                    if (link.hasDropdown) openMenu(link.name);
                    else setActiveHoverMenu(null);
                  }}
                  className={`text-[12px] font-bold ${navTextClass} ${navHoverClass} transition-colors flex items-center gap-1.5 tracking-widest pb-1`}
                >
                  <span className="relative">
                    {link.name}
                    {activeHoverMenu === link.name && link.hasDropdown && (
                      <motion.span layoutId="nav-underline" className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full ${isScrolled ? 'bg-[#004bff]' : 'bg-white'}`} />
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
            <Link href="/login" className={`hidden md:block text-[12px] font-bold ${navTextClass} ${navHoverClass} tracking-widest mr-2`}>
              LOGIN
            </Link>
          </div>
          <div className="py-1.5 md:pl-6 flex items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
            <button className={`hidden sm:flex text-[12px] font-bold px-6 py-2.5 rounded-full transition-all tracking-widest ${isScrolled ? 'bg-transparent text-[#004bff] hover:bg-blue-50' : 'bg-transparent text-white hover:bg-white/10'}`}>
              BOOK A DEMO
            </button>
            <Link href="/register" className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-[12px] font-bold transition-all shadow-sm tracking-widest ${isScrolled ? 'bg-[#004bff] text-white hover:bg-blue-700' : 'bg-white text-[#004bff] hover:bg-blue-50'}`}>
              START FREE TRIAL <ChevronRight className="w-4 h-4" />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-white'}`}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Megamenus */}
        <div className="megamenu-container">
          <SolutionsMegamenu isOpen={activeHoverMenu === "SOLUTIONS"} onMouseEnter={() => openMenu("SOLUTIONS")} onMouseLeave={closeMenuWithDelay} />
          <CompanyMegamenu isOpen={activeHoverMenu === "COMPANY"} onMouseEnter={() => openMenu("COMPANY")} onMouseLeave={closeMenuWithDelay} />
          <PartnersMegamenu isOpen={activeHoverMenu === "PARTNERS"} onMouseEnter={() => openMenu("PARTNERS")} onMouseLeave={closeMenuWithDelay} />
          <ResourcesMegamenu isOpen={activeHoverMenu === "RESOURCES"} onMouseEnter={() => openMenu("RESOURCES")} onMouseLeave={closeMenuWithDelay} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#004bff] pt-32 pb-24 md:pt-40 md:pb-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-white max-w-xl">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-blue-100">For mid-large businesses</div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight">
              Your website's<br />
              accessibility. Our<br />
              custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#60efff] italic font-serif font-light">expertise</span>.
            </h1>
            <p className="text-lg text-blue-50 mb-10 leading-relaxed font-medium">
              We help medium and large businesses solve accessibility challenges, minimize risk, and open their doors to everyone.
            </p>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
              START FREE TRIAL
            </button>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px]">
            <div className="absolute inset-0 bg-blue-600/20 rounded-[40px] blur-3xl transform rotate-12 scale-110" />
            <div className="relative h-full w-full bg-slate-900/10 rounded-[32px] border border-white/10 overflow-hidden shadow-2xl">
               <img src="/images/white_puffer_jacket.png" alt="Hero representation" className="absolute right-0 bottom-0 h-[80%] w-auto object-contain z-10" />
               <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 w-64 z-20">
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
      <section className="py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">Also trusted by world-class brands</span>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
            {/* Using text placeholders since actual brand logos aren't provided */}
            <span className="font-serif text-xl font-bold text-slate-800">Acme Corp</span>
            <span className="font-sans text-xl font-black text-slate-800 tracking-tighter">GLOBEX</span>
            <span className="font-mono text-xl font-bold text-slate-800">SOYUZ</span>
            <span className="font-serif italic text-xl font-bold text-slate-800">Umbrella</span>
          </div>
        </div>
      </section>

      {/* Solutions Tailored Cards */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 text-[#0a1e3f] max-w-2xl mx-auto leading-tight">
            Solutions tailored for your<br />medium or large brand.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0a1e3f] rounded-[32px] p-8 md:p-10 text-white transform transition-transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Customized to your exact styling</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed relative z-10 mb-8">
                Seamlessly match your website's exact styling and aesthetics. We offer full design customization to align with your brand guidelines.
              </p>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center relative z-10">
                <Settings className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-[#f0f4ff] rounded-[32px] p-8 md:p-10 text-[#0a1e3f] transform transition-transform hover:-translate-y-2 border border-blue-50">
              <h3 className="text-xl font-bold mb-4">Dedicated API & custom integrations</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                Our technology integrates seamlessly with your existing tech stack. Access custom APIs, webhooks, and direct platform connections.
              </p>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 rounded-[32px] p-8 md:p-10 text-[#0a1e3f] transform transition-transform hover:-translate-y-2 border border-slate-100">
              <h3 className="text-xl font-bold mb-4">Comprehensive proxy support</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                For the highest level of security and performance, we offer dedicated proxy setups tailored for enterprise-scale environments.
              </p>
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Technology Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] mb-6 leading-tight">
              Put our advanced<br />technology to work
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed font-medium">
              We leverage AI and machine learning to scan, analyze, and repair accessibility issues in real-time, ensuring continuous compliance.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed font-medium">
              Our automated solutions handle the heavy lifting, giving your team back valuable time and resources.
            </p>
            <button className="bg-[#0a1e3f] hover:bg-blue-900 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all">
              START FREE TRIAL
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="bg-[#e6f0ff] rounded-[40px] aspect-[4/3] flex items-center justify-center relative overflow-hidden border border-blue-50">
               {/* Abstract UI Mockup */}
               <div className="w-[80%] h-[70%] bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-xl relative p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                     <div className="w-32 h-4 bg-slate-200 rounded-full" />
                     <div className="w-8 h-8 rounded-full bg-blue-100" />
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-1 bg-white rounded-xl h-24 border border-slate-100 p-4 shadow-sm flex flex-col justify-end gap-2">
                        <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                        <div className="h-2 w-full bg-blue-500 rounded-full" />
                     </div>
                     <div className="flex-1 bg-white rounded-xl h-24 border border-slate-100 p-4 shadow-sm flex flex-col justify-end gap-2">
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
      <section className="bg-[#004bff] py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-blue-600/30 rounded-3xl p-8 border border-blue-400/30">
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Find out <span className="italic font-serif font-light">now</span> if your<br />website is accessible
          </h2>
          <div className="flex w-full md:w-auto flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20">
            <input 
              type="text" 
              placeholder="Enter your website URL" 
              className="bg-transparent border-none text-white placeholder:text-blue-100 px-4 py-2 outline-none w-full md:w-64"
            />
            <button className="bg-white text-[#004bff] px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap hover:bg-blue-50 transition-colors shadow-sm">
              GET A FREE AUDIT
            </button>
          </div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] mb-4">
              One simple solution.<br />Lots of advanced features.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
             {[
               { title: "Accessibility statement and badge", desc: "Showcase your commitment to inclusion with a certified statement." },
               { title: "Monthly AI-powered scans", desc: "Automated checks run monthly to ensure continuous compliance." },
               { title: "Detailed audit reports", desc: "Download comprehensive PDF reports for your internal teams." },
               { title: "Screen reader optimization", desc: "Ensure visually impaired users can navigate perfectly." },
               { title: "Keyboard navigation", desc: "Full keyboard operability for users with motor impairments." },
               { title: "24/7 technical support", desc: "Dedicated enterprise support teams ready to assist at any time." },
             ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                   <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 text-[#004bff]" />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#0a1e3f] mb-1.5">{feature.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-[#0a1e3f] hover:bg-blue-900 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md">
              VIEW ALL FEATURES
            </button>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-16 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0a1e3f] mb-12">
            Litigation Support & Web<br />accessibility compliance
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
             {['ADA', 'WCAG 2.1', 'Section 508', 'AODA', 'EN 301 549'].map((badge, idx) => (
               <div key={idx} className="w-24 h-24 rounded-full bg-white shadow-sm border border-blue-50 flex items-center justify-center text-[#0a1e3f] font-black text-sm text-center">
                  {badge}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="bg-[#0a1e3f] py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="flex-1 max-w-lg">
             <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-blue-300">TRUST & TRANSPARENCY</div>
             <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
               Top-grade security & privacy
             </h2>
             <p className="text-blue-100 mb-8 leading-relaxed">
               We adhere to the strictest global data privacy regulations and security standards to ensure your enterprise data is always protected.
             </p>
             <button className="bg-white text-[#0a1e3f] hover:bg-slate-100 px-8 py-3.5 rounded-full font-bold text-sm transition-all">
               LEARN MORE
             </button>
           </div>
           <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-48 h-48 rounded-full border-2 border-blue-400/30 flex items-center justify-center relative">
                 <div className="w-40 h-40 rounded-full border-2 border-blue-400/50 flex items-center justify-center bg-blue-500/10 backdrop-blur-md">
                    <div className="text-center">
                       <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                       <span className="font-bold text-white tracking-widest">SOC 2</span>
                       <div className="text-[10px] text-blue-200 mt-1">COMPLIANT</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Comprehensive Litigation Support */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-6">
               <FileText className="w-8 h-8 text-[#004bff]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] mb-8">
              Get comprehensive litigation<br />support you can count on
            </h2>
            <button className="bg-[#0a1e3f] hover:bg-blue-900 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md">
              LEARN MORE
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
             {[
               { icon: FileText, title: "Detailed Documentation" },
               { icon: Shield, title: "Compliance Certification" },
               { icon: Users, title: "Expert Legal Consultation" },
               { icon: Award, title: "Priority Support SLAs" },
             ].map((card, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                   <card.icon className="w-6 h-6 text-[#004bff] mx-auto mb-4" />
                   <h4 className="font-bold text-[#0a1e3f] text-sm">{card.title}</h4>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* G2 Rating */}
      <section className="py-20 px-4 bg-white border-t border-slate-100">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
               <h3 className="text-2xl font-black text-[#0a1e3f] mb-4">The #1 rated web accessibility solution for ADA & WCAG compliance</h3>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                     <span className="font-bold text-slate-800">4.8/5</span>
                     <div className="flex text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                     </div>
                  </div>
                  <span className="text-sm font-bold text-[#004bff]">G2 Reviews</span>
               </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end gap-4">
               {/* Placeholders for G2 badges */}
               <div className="w-16 h-20 bg-slate-100 rounded-lg border border-slate-200" />
               <div className="w-16 h-20 bg-slate-100 rounded-lg border border-slate-200" />
               <div className="w-16 h-20 bg-slate-100 rounded-lg border border-slate-200" />
            </div>
         </div>
         
         <div className="max-w-4xl mx-auto mt-16 bg-[#e6f0ff] rounded-3xl p-8 md:p-12 border border-blue-50 relative">
            <div className="absolute top-8 left-8 text-blue-200">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <p className="text-lg md:text-xl font-medium text-[#0a1e3f] leading-relaxed relative z-10 pl-12 italic">
               "2all.ai's accessibility tools have been incredibly vital for our global expansion. Their seamless integration and continuous monitoring keep our enterprise applications universally accessible without placing an undue burden on our development team."
            </p>
            <div className="mt-6 pl-12 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                  <img src="/images/avatar.jpg" className="w-full h-full object-cover" alt="User" />
               </div>
               <div>
                  <div className="font-bold text-[#0a1e3f]">Sarah Jenkins</div>
                  <div className="text-sm text-slate-500">VP of Engineering, GlobalTech</div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#004bff] py-20 px-4 text-center">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl md:text-4xl font-black text-white text-left leading-tight">
               Discover the ultimate web<br />
               accessibility <span className="italic font-serif font-light text-blue-200">solution</span>
            </h2>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg shrink-0">
               START FREE TRIAL
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
