"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Lock, Server, Headset, Shield, Activity, BarChart } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import ResourcesMegamenu from "@/components/marketing/ResourcesMegamenu";

export default function EnterprisePage() {
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

  const navTextClass = isScrolled ? "text-[#374b6c]" : "text-[#0a1e3f]";
  const navHoverClass = isScrolled ? "hover:text-[#004bff]" : "hover:text-blue-600";
  const logoClass = "mix-blend-multiply";

  return (
    <div className="min-h-screen w-full bg-slate-50 relative font-sans text-[#0a1e3f]">
      {/* Header */}
      <header 
        onMouseLeave={() => setActiveHoverMenu(null)}
        className={`w-full py-3 px-4 md:px-10 z-50 shrink-0 fixed top-0 transition-all duration-300 ease-out border-b ${isScrolled ? 'bg-white shadow-sm border-slate-200/50' : 'bg-transparent border-transparent'}`}
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
                      <motion.span layoutId="nav-underline" className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full ${isScrolled ? 'bg-[#004bff]' : 'bg-blue-600'}`} />
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
            <button className={`hidden sm:flex text-[12px] font-bold px-6 py-2.5 rounded-full transition-all tracking-widest bg-transparent text-[#004bff] hover:bg-blue-50`}>
              BOOK A DEMO
            </button>
            <Link href="/register" className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-[12px] font-bold transition-all shadow-sm tracking-widest bg-[#004bff] text-white hover:bg-blue-700`}>
              START FREE TRIAL <ChevronRight className="w-4 h-4" />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="megamenu-container">
          <SolutionsMegamenu isOpen={activeHoverMenu === "SOLUTIONS"} onMouseEnter={() => openMenu("SOLUTIONS")} onMouseLeave={closeMenuWithDelay} />
          <CompanyMegamenu isOpen={activeHoverMenu === "COMPANY"} onMouseEnter={() => openMenu("COMPANY")} onMouseLeave={closeMenuWithDelay} />
          <PartnersMegamenu isOpen={activeHoverMenu === "PARTNERS"} onMouseEnter={() => openMenu("PARTNERS")} onMouseLeave={closeMenuWithDelay} />
          <ResourcesMegamenu isOpen={activeHoverMenu === "RESOURCES"} onMouseEnter={() => openMenu("RESOURCES")} onMouseLeave={closeMenuWithDelay} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden bg-[#020817] text-white">
        {/* Abstract Data Visualization Background */}
        <div className="absolute inset-0 z-0 opacity-20">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 C20,80 40,120 60,60 C80,0 100,40 100,100" fill="none" stroke="#004bff" strokeWidth="0.5" />
              <path d="M0,100 C30,90 50,70 70,80 C90,90 100,50 100,100" fill="none" stroke="#00ff87" strokeWidth="0.2" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-6">
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300">Enterprise Accessibility</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-white">
              Accessibility at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bff] to-[#00ff87] italic font-serif font-light">massive scale</span>.
            </h1>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
              Designed for large organizations with complex digital ecosystems. Enterprise-grade security, dedicated account management, and multi-site orchestration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#004bff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                CONTACT SALES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] mb-4">
              Built for the world's most demanding teams
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
               We understand that enterprise accessibility requires more than just a widget. It requires a partner who understands compliance, security, and governance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Lock, title: "Enterprise Security", desc: "SOC2 Type II certified. ISO 27001 compliant. We meet the strictest data privacy and security requirements." },
               { icon: Headset, title: "Dedicated Success Manager", desc: "A named technical account manager provides proactive guidance, training, and strategic planning." },
               { icon: BarChart, title: "Multi-Domain Analytics", desc: "Manage hundreds of domains from a single pane of glass with rolled-up compliance reporting." },
             ].map((feature, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:-translate-y-1 transition-transform">
                   <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-[#004bff]" />
                   </div>
                   <h3 className="text-xl font-bold text-[#0a1e3f] mb-3">{feature.title}</h3>
                   <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Integration Grid */}
      <section className="py-24 px-4 bg-slate-50">
         <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black text-[#0a1e3f] mb-12">Seamless integration with your enterprise stack</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 opacity-60">
               {/* Dummy placeholders for enterprise logos */}
               {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-200 rounded-xl flex items-center justify-center">
                     <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Partner</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#004bff] py-20 px-4 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
               Secure your digital presence today.
            </h2>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg">
               GET AN ENTERPRISE QUOTE
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
