"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Terminal, Code2, GitMerge, Check, Box } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import ResourcesMegamenu from "@/components/marketing/ResourcesMegamenu";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function DevelopAccessibleCodePage() {
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
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-6">
               <div className="p-1.5 bg-blue-500/20 rounded-md border border-blue-400/30">
                  <Terminal className="w-4 h-4 text-blue-400" />
               </div>
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300">Developer Tools</span>
            </div>
            
            <Breadcrumbs items={[ { label: "Home", href: "/" }, { label: "Products" }, { label: "Develop Accessible Code" } ]} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-white">
              Accessibility natively built into your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bff] to-[#00ff87] italic font-serif font-light">CI/CD pipeline</span>.
            </h1>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
              Catch accessibility bugs before they reach production. 2allFlow integrates directly with your source code, IDEs, and testing frameworks.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#004bff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                START BUILDING
              </button>
              <button className="bg-transparent text-white hover:bg-white/10 border border-slate-600 px-8 py-3.5 rounded-full font-bold text-sm transition-all">
                READ THE DOCS
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
             <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden p-6 font-mono text-sm leading-relaxed">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                   <div className="w-3 h-3 rounded-full bg-rose-500" />
                   <div className="w-3 h-3 rounded-full bg-amber-500" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   <span className="ml-4 text-slate-500 text-xs">Button.tsx</span>
                </div>
                <div className="text-slate-300">
                   <span className="text-pink-400">export const</span> Button = ({"{"} <span className="text-blue-300">label, onClick</span> {"}"}) <span className="text-pink-400">{`=>`}</span> {"{"}
                   <br/>
                   &nbsp;&nbsp;<span className="text-pink-400">return</span> (
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;{`<`}button
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClick={'{'}onClick{'}'}
                   <br/>
                   <span className="bg-rose-500/20 text-rose-300 inline-block w-full px-2">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// ERROR: Missing aria-label (WCAG 4.1.2)
                   </span>
                   <br/>
                   <span className="bg-emerald-500/20 text-emerald-300 inline-block w-full px-2">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aria-label={'{'}label{'}'}
                   </span>
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;{`>`}
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}label{'}'}
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;{`<`}/button{`>`}
                   <br/>
                   &nbsp;&nbsp;);
                   <br/>
                   {"}"}
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
              Shift accessibility left.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
               Don't wait for the QA phase to fix accessibility debt. Empower your developers to write accessible code from the very first commit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Code2, title: "IDE Extensions", desc: "Real-time linting in VS Code and WebStorm that highlights WCAG violations as you type." },
               { icon: GitMerge, title: "CI/CD Integration", desc: "Block PRs automatically if new code introduces accessibility regressions into your codebase." },
               { icon: Box, title: "Component Libraries", desc: "Pre-built, thoroughly tested accessible React, Vue, and Angular components ready to use." },
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

      {/* CTA Banner */}
      <section className="bg-[#004bff] py-20 px-4 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
               Give your developers the ultimate accessibility toolkit.
            </h2>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg">
               GET API KEYS
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
