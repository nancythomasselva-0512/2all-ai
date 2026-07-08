"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

export default function ModernNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Platform", href: "/platform" },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-slate-200/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-1 group">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight transition-transform group-hover:scale-[1.02]">
            2ALL<span className="text-blue-600">.AI</span>
          </span>
          {/* Subtle glow on hover */}
          <span className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setHoveredMenu(link.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-2 flex items-center gap-1"
              >
                {link.name}
                {link.name !== "Pricing" && <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-transform duration-300" />}
              </Link>
              {/* Smooth underline animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
              
              {/* Dropdown Indicator Glow */}
              <AnimatePresence>
                {hoveredMenu === link.name && link.name !== "Pricing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 pointer-events-none"
                  >
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-100 rounded-xl p-4 shadow-xl shadow-blue-900/5">
                       {/* Placeholder for actual megamenus */}
                       <div className="text-xs text-slate-400 font-medium px-2 py-1 uppercase tracking-wider">Explore</div>
                       <div className="mt-2 space-y-1">
                         <div className="h-8 rounded-md bg-slate-50 hover:bg-blue-50 transition-colors w-full cursor-pointer"></div>
                         <div className="h-8 rounded-md bg-slate-50 hover:bg-blue-50 transition-colors w-full cursor-pointer"></div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Sign In
          </Link>
          <Link
            href="/register"
            className="relative group overflow-hidden rounded-full bg-blue-600 text-white text-sm font-bold px-6 py-2.5 shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Start Free Trial</span>
            {/* Hover ripple/glow effect */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] group-hover:animate-shimmer" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-600 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-slate-700 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100 my-2" />
              <Link href="/login" className="text-lg font-semibold text-slate-700">
                Sign In
              </Link>
              <Link
                href="/register"
                className="w-full text-center rounded-full bg-blue-600 text-white text-lg font-bold px-6 py-3 shadow-lg shadow-blue-600/25"
              >
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
