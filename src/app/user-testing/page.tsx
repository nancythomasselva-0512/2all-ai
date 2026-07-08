"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Check, Search, Shield, ChevronRight, Users, Play, Target } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import ResourcesMegamenu from "@/components/marketing/ResourcesMegamenu";

export default function UserTestingPage() {
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

        {/* Megamenus */}
        <div className="megamenu-container">
          <SolutionsMegamenu isOpen={activeHoverMenu === "SOLUTIONS"} onMouseEnter={() => openMenu("SOLUTIONS")} onMouseLeave={closeMenuWithDelay} />
          <CompanyMegamenu isOpen={activeHoverMenu === "COMPANY"} onMouseEnter={() => openMenu("COMPANY")} onMouseLeave={closeMenuWithDelay} />
          <PartnersMegamenu isOpen={activeHoverMenu === "PARTNERS"} onMouseEnter={() => openMenu("PARTNERS")} onMouseLeave={closeMenuWithDelay} />
          <ResourcesMegamenu isOpen={activeHoverMenu === "RESOURCES"} onMouseEnter={() => openMenu("RESOURCES")} onMouseLeave={closeMenuWithDelay} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-xl relative z-10">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-[#004bff]">User Testing Services</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-[#0a1e3f]">
              Test with real<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bff] to-[#00ff87] italic font-serif font-light">end-users</span>.
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              Ensure your digital experience works perfectly for people with disabilities by testing with the very users you are building for.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#0a1e3f] hover:bg-blue-900 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                TALK TO AN EXPERT
              </button>
              <button className="bg-white text-[#0a1e3f] hover:bg-slate-100 border border-slate-200 px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-sm">
                LEARN MORE
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[400px] md:h-[500px]">
            <div className="absolute inset-0 bg-blue-100/50 rounded-[40px] blur-3xl transform -rotate-6 scale-110" />
            <div className="relative h-full w-full bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl flex items-center justify-center p-8">
               <img src="/images/testing_session.png" alt="User Testing Session" className="w-full h-full object-cover rounded-2xl" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 w-full max-w-sm">
                     <div className="flex items-center gap-3">
                        <Users className="text-[#004bff] w-6 h-6" />
                        <div>
                           <div className="font-bold text-sm text-slate-900">Live Usability Session</div>
                           <div className="text-xs text-slate-500">Screen reader navigation</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] mb-4">
              Why test with real users?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
               Automated tools and expert audits find technical violations, but only real users can tell you if your experience is genuinely usable and intuitive.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Target, title: "Authentic Feedback", desc: "Get direct insights from users who rely on assistive technologies daily." },
               { icon: Shield, title: "Risk Mitigation", desc: "Identify usability blockers that could lead to discrimination claims." },
               { icon: Search, title: "Actionable Reports", desc: "Receive comprehensive analysis and clear steps for remediation." },
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

      {/* Testimonial Section */}
      <section className="py-24 px-4 bg-[#0a1e3f] text-white">
         <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-medium leading-relaxed italic mb-8">
               "Testing our platform with 2all.ai's user testers opened our eyes to barriers we didn't even know existed. It fundamentally changed how our engineering team approaches UX design."
            </h3>
            <div className="flex items-center justify-center gap-4">
               <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-300">
                  <img src="/images/avatar.jpg" alt="Testimonial Author" className="w-full h-full object-cover" />
               </div>
               <div className="text-left">
                  <div className="font-bold">David Chen</div>
                  <div className="text-sm text-blue-200">Director of Digital, Horizon Media</div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#004bff] py-20 px-4 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
               Ready to validate your accessibility with real users?
            </h2>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg">
               REQUEST A CONSULTATION
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
