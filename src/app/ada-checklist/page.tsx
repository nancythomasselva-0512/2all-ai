"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { CheckSquare, Square, ShieldCheck, ArrowRight, CheckCircle2, Download } from "lucide-react";

export default function AdaChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const checklist = [
    { id: "c1", category: "Images & Media", title: "All images have descriptive alt-text", desc: "Decorative images use alt=\"\" or aria-hidden=\"true\"." },
    { id: "c2", category: "Images & Media", title: "Videos include accurate closed captions", desc: "Prerecorded videos provide synchronized captions and transcripts." },
    { id: "c3", category: "Images & Media", title: "Audio descriptions for visual content", desc: "Key visual actions in video have audio descriptions for blind users." },
    { id: "c4", category: "Color & Contrast", title: "Text contrast ratio meets 4.5:1 minimum", desc: "Small text is at least 4.5:1, large text (18pt+) is at least 3:1." },
    { id: "c5", category: "Color & Contrast", title: "Color is not the only indicator of state", desc: "Links, errors, and badges use icons or underlines in addition to color." },
    { id: "c6", category: "Keyboard Navigation", title: "All interactive elements are keyboard reachable", desc: "Users can Tab through links, buttons, form inputs, and modals." },
    { id: "c7", category: "Keyboard Navigation", title: "No keyboard focus traps exist", desc: "Users can enter and exit menus and dialogs using Tab/Esc." },
    { id: "c8", category: "Keyboard Navigation", title: "Visible focus outline on active elements", desc: "Focused buttons and inputs have clear 2px+ high-contrast outlines." },
    { id: "c9", category: "Structure & Semantics", title: "Logical H1–H6 heading hierarchy", desc: "Each page has a single H1 and nested headings in correct order." },
    { id: "c10", category: "Structure & Semantics", title: "HTML lang attribute defined on <html>", desc: "e.g., <html lang=\"en\"> for screen reader language detection." },
    { id: "c11", category: "Forms & Inputs", title: "All form inputs have explicit <label> tags", desc: "Labels are linked via 'for' and 'id' attributes or aria-label." },
    { id: "c12", category: "Forms & Inputs", title: "Error messages are clear and announced", desc: "Form validation states use aria-invalid and describe the required fix." }
  ];

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Compliance", href: "/compliance" }, { label: "ADA Checklist" }]}
          />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Interactive <span className="text-[#C8FF4D]">ADA Web Checklist</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Audit your website against essential ADA Title III &amp; WCAG 2.1 AA benchmarks. Track your progress in real time.
          </p>
        </div>
      </section>

      {/* CHECKLIST SECTION */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress Bar Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Checklist Progress: {completedCount} of {checklist.length} Passed</h3>
              <p className="text-xs text-slate-500 mt-0.5">Click any checklist item below to mark as compliant.</p>
            </div>
            <div className="w-full md:w-48 bg-slate-200 rounded-full h-3.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-4">
            {checklist.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${
                    isChecked ? "bg-blue-50/60 border-blue-300" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button className="mt-0.5 text-blue-600 bg-transparent border-none p-0 cursor-pointer">
                    {isChecked ? <CheckSquare className="w-5 h-5 fill-blue-600 text-white" /> : <Square className="w-5 h-5 text-slate-400" />}
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded">{item.category}</span>
                      <h4 className={`text-sm font-bold ${isChecked ? "text-blue-900 line-through" : "text-slate-900"}`}>{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/access-scan"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Automate This Checklist with 2all.ai Scan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
