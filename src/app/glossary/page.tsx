"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, HelpCircle } from "lucide-react";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const glossaryTerms = [
    {
      term: "A11y",
      definition: "A common abbreviation for 'accessibility', where the number 11 represents the count of letters between the starting 'a' and ending 'y'."
    },
    {
      term: "Alternative Text (Alt Text)",
      definition: "Text added to an HTML image tag (`alt='...'`) that describes the contents of the image. Screen readers read alt text to blind users so they understand visual elements."
    },
    {
      term: "ARIA (Accessible Rich Internet Applications)",
      definition: "A set of roles, states, and properties defined by the W3C that extend HTML. ARIA allows developers to make complex widgets (like menus, sliders, modals) accessible to screen readers."
    },
    {
      term: "Contrast Ratio",
      definition: "The difference in luminance (brightness) between foreground text and its background. WCAG 2.1 AA mandates a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text."
    },
    {
      term: "Keyboard Navigation",
      definition: "The ability to navigate and interact with a website completely using a keyboard (typically via Tab, Shift+Tab, Enter, Space, and Arrow keys) without needing a mouse."
    },
    {
      term: "Screen Reader",
      definition: "Assistive software used by blind or visually impaired individuals that reads the text and structural components of a web page out loud (e.g., JAWS, NVDA, VoiceOver)."
    },
    {
      term: "VPAT (Voluntary Product Accessibility Template)",
      definition: "A document that evaluates how accessible a particular product or website is according to Section 508 standards. VPATs are widely used in public procurement."
    },
    {
      term: "WCAG (Web Content Accessibility Guidelines)",
      definition: "The global gold standard guidelines for digital accessibility, developed by the W3C. Compliance with most laws (like ADA, EAA) is measured against WCAG criteria."
    }
  ];

  const filteredTerms = glossaryTerms.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = selectedLetter ? item.term.toUpperCase().startsWith(selectedLetter) : true;
    return matchesSearch && matchesLetter;
  });

  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Accessibility Glossary" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Accessibility <span className="text-[#C8FF4D]">Glossary</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Quickly lookup and understand the definitions, guidelines, and technical terms used in the web accessibility landscape.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & ALPHABET FILTER SECTION */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Search box */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search glossary terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
            />
          </div>

          {/* Alphabet button list */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
                selectedLetter === null 
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => {
              // Check if any terms start with this letter
              const hasTerms = glossaryTerms.some(t => t.term.toUpperCase().startsWith(letter));
              return (
                <button
                  key={letter}
                  disabled={!hasTerms}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-8 h-8 rounded-lg text-xs font-black uppercase transition-all ${
                    selectedLetter === letter
                      ? "bg-blue-600 text-white shadow-sm"
                      : hasTerms
                      ? "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      : "bg-slate-50/40 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. GLOSSARY TERM LIST */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredTerms.map((item, idx) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200/80 rounded-3xl p-8 text-left space-y-4 hover:shadow-lg transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-md font-black text-slate-900 tracking-tight leading-snug">{item.term}</h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.definition}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center text-slate-400 py-16 font-medium">
              No glossary terms match your search query or letter filter.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
