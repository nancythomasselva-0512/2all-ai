"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import Logo from "@/components/ui/Logo";

// Import Megamenus
import SolutionsMegamenu from "./SolutionsMegamenu";
import CompanyMegamenu from "./CompanyMegamenu";
import PartnersMegamenu from "./PartnersMegamenu";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<"solutions" | "company" | "partners" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: "solutions" | "company" | "partners") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Section: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0 select-none">
          <Logo height={42} className="self-center" />
        </Link>

        {/* Center Section: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 select-none">
          
          {/* Solutions Link */}
          <div 
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
            className="py-2"
          >
            <button className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-colors ${
              activeMenu === "solutions" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"
            }`}>
              Solutions
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMenu === "solutions" ? "rotate-180 text-blue-600" : "text-slate-400"
              }`} />
            </button>
            <SolutionsMegamenu 
              isOpen={activeMenu === "solutions"}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Company Link */}
          <div 
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={handleMouseLeave}
            className="py-2"
          >
            <button className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-colors ${
              activeMenu === "company" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"
            }`}>
              Company
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMenu === "company" ? "rotate-180 text-blue-600" : "text-slate-400"
              }`} />
            </button>
            <CompanyMegamenu 
              isOpen={activeMenu === "company"}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Partners Link */}
          <div 
            onMouseEnter={() => handleMouseEnter("partners")}
            onMouseLeave={handleMouseLeave}
            className="py-2"
          >
            <button className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-colors ${
              activeMenu === "partners" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"
            }`}>
              Partners
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMenu === "partners" ? "rotate-180 text-blue-600" : "text-slate-400"
              }`} />
            </button>
            <PartnersMegamenu 
              isOpen={activeMenu === "partners"}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Pricing Link */}
          <Link 
            href="/pricing" 
            className="text-xs font-black uppercase tracking-widest text-slate-700 hover:text-slate-900 transition-colors py-2"
          >
            Pricing
          </Link>

        </nav>

        {/* Right Section: CTAs */}
        <div className="flex items-center gap-3 md:gap-4 select-none shrink-0">
          <Link 
            href="/login" 
            className="text-xs font-black uppercase tracking-widest text-slate-700 hover:text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50/80 hover:scale-105 active:scale-95 hover:shadow-sm hover:shadow-blue-500/20 transition-all duration-200"
          >
            Login
          </Link>
          <Link 
            href="/demo" 
            className="hidden md:inline-flex items-center justify-center border border-slate-300/80 hover:border-blue-500/60 bg-white hover:bg-blue-50/60 text-slate-800 hover:text-blue-600 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Book A Demo
          </Link>
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 shadow-md shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95"
          >
            Start Free Trial
          </Link>
        </div>

      </div>
    </header>
  );
}
