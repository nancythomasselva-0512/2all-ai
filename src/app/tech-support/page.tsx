"use client";

import React from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { LifeBuoy, Mail, MessageSquare, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";

export default function TechSupportPage() {
  const channels = [
    { title: "24/7 Technical Ticket Support", desc: "Submit an urgent ticket regarding script errors, domain verification, or custom styles.", action: "Submit Support Ticket", href: "/contact-us" },
    { title: "Developer Documentation & API", desc: "Read our comprehensive guides for REST API, Webhooks, and custom script integrations.", action: "Read Documentation", href: "/help-center" },
    { title: "Live Community & Discord", desc: "Chat with fellow frontend engineers, accessibility professionals, and 2all.ai core devs.", action: "Join Community", href: "/community" }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Support", href: "/help-center" }, { label: "Technical Support" }]}
          />
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            2all.ai <span className="text-[#C8FF4D]">Technical Support</span> Center
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Fast, responsive technical assistance for developers, system administrators, and site owners.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid md:grid-cols-3 gap-8">
            {channels.map((c, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">{c.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{c.desc}</p>
                </div>
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-wider"
                >
                  {c.action} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
