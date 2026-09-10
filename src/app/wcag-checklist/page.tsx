"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { CheckSquare, Square, ShieldCheck, ArrowRight } from "lucide-react";

export default function WcagChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const criteria = [
    { id: "w1", level: "Level A", criterion: "1.1.1 Non-text Content", desc: "All non-text content (images, icons, charts) has a text alternative that serves equivalent purpose." },
    { id: "w2", level: "Level A", criterion: "1.3.1 Info and Relationships", desc: "Information, structure, and relationships conveyed visually are programmatically determinable (headings, tables, labels)." },
    { id: "w3", level: "Level AA", criterion: "1.4.3 Contrast (Minimum)", desc: "Visual presentation of text and images of text has a contrast ratio of at least 4.5:1." },
    { id: "w4", level: "Level AA", criterion: "1.4.10 Reflow", desc: "Content can be presented without loss of information or functionality down to 320 CSS pixels without two-dimensional scrolling." },
    { id: "w5", level: "Level A", criterion: "2.1.1 Keyboard Operability", desc: "All functionality of the content is operable through a keyboard interface without requiring specific timings." },
    { id: "w6", level: "Level A", criterion: "2.1.2 No Keyboard Trap", desc: "If keyboard focus can be moved to a component, focus can also be moved away using standard keys." },
    { id: "w7", level: "Level AA", criterion: "2.4.7 Focus Visible", desc: "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is clearly visible." },
    { id: "w8", level: "Level AA", criterion: "2.5.8 Target Size (Minimum)", desc: "WCAG 2.2: Interactive targets have an area of at least 24 by 24 CSS pixels." },
    { id: "w9", level: "Level A", criterion: "3.1.1 Language of Page", desc: "The default human language of each web page can be programmatically determined." },
    { id: "w10", level: "Level A", criterion: "3.3.2 Labels or Instructions", desc: "Labels or instructions are provided when content requires user input." },
    { id: "w11", level: "Level AA", criterion: "3.3.3 Error Suggestion", desc: "If an input error is detected, suggestions for correction are provided to the user." },
    { id: "w12", level: "Level A", criterion: "4.1.2 Name, Role, Value", desc: "All UI components (buttons, links, dialogs) have accessible names and correct ARIA roles and states." }
  ];

  const toggle = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completed = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completed / criteria.length) * 100);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "WCAG Checklist" }]}
          />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            WCAG 2.1 &amp; 2.2 <span className="text-[#C8FF4D]">Level AA Checklist</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Verify your compliance against the W3C Web Content Accessibility Guidelines success criteria.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Conformance: {completed} of {criteria.length} Verified</h3>
              <p className="text-xs text-slate-500 mt-0.5">Click any criterion to mark as complete.</p>
            </div>
            <div className="w-full md:w-48 bg-slate-200 rounded-full h-3.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {criteria.map((c) => {
              const checked = !!checkedItems[c.id];
              return (
                <div
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${
                    checked ? "bg-blue-50/60 border-blue-300" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button className="mt-0.5 text-blue-600 bg-transparent border-none p-0 cursor-pointer">
                    {checked ? <CheckSquare className="w-5 h-5 fill-blue-600 text-white" /> : <Square className="w-5 h-5 text-slate-400" />}
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded">{c.level}</span>
                      <h4 className={`text-sm font-bold ${checked ? "text-blue-900 line-through" : "text-slate-900"}`}>{c.criterion}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/access-scan"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl shadow-lg uppercase tracking-wider"
            >
              Scan Your Web Page for WCAG Violations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
