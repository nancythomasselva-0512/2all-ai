"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { Play, Calendar, User, Clock, CheckCircle } from "lucide-react";

export default function WebinarPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setRegistered(true);
    }, 1500);
  };

  const recordedWebinars = [
    {
      title: "Tactical WCAG 2.2 Audits & Compliance Guide",
      speaker: "David Vance, Chief Audit Officer",
      duration: "45 minutes",
      date: "June 12, 2026",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Making E-commerce Checkout Flows Accessible",
      speaker: "Amanda Brooks, Accessibility Designer",
      duration: "50 minutes",
      date: "May 20, 2026",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Webinars" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            On-Demand <span className="text-[#C8FF4D]">Webinars</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Gain tactical insights on web accessibility audit guidelines, legal frameworks, and digital compliance from our team of industry experts.
          </p>
        </div>
      </section>

      {/* 2. FEATURED VIDEO PLAYER & REGISTRATION SPLIT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          {/* Simulated Video Player (left 7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h3 className="text-xs font-black tracking-widest text-blue-600 uppercase">Now Playing</h3>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              How dev teams are tackling accessibility debt in 2026
            </h2>

            <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group flex items-center justify-center cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" 
                alt="Webinar Speaker Cover" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              
              <div className="w-16 h-16 rounded-full bg-[#C8FF4D] text-slate-900 flex items-center justify-center shadow-2xl relative z-10 transition-transform group-hover:scale-105">
                <Play className="w-6 h-6 fill-current translate-x-0.5 stroke-[2.5]" />
              </div>

              {/* Speaker tag */}
              <div className="absolute bottom-6 left-6 text-white space-y-1 z-10">
                <span className="text-[10px] font-black uppercase text-[#C8FF4D]">Panel Webinar</span>
                <p className="text-sm font-black tracking-tight leading-tight">Featured On-Demand Session</p>
              </div>
            </div>
          </div>

          {/* Registration form (right 5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 shadow-sm text-left">
            <h3 className="text-md font-black text-slate-900 tracking-tight leading-snug border-b border-slate-200/80 pb-4 mb-6">
              Register to Watch
            </h3>

            {registered ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-black text-slate-900">Registration Complete</h4>
                <p className="text-slate-500 text-xs max-w-xs mx-auto leading-relaxed">
                  We've emailed you the links to unlock our full webinar catalog and download supporting transcripts.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider px-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Inc."
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all shadow-inner"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 tracking-wider uppercase transition-all shadow-md cursor-pointer border-none shadow-blue-500/20"
                  >
                    {loading ? "Registering..." : "Access Recording"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. RECORDED ARCHIVE GRID */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Archive Library</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">On-Demand Recorded Sessions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {recordedWebinars.map((web, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 rounded-[32px] overflow-hidden hover:shadow-lg transition-all duration-300 shadow-sm text-left flex flex-col justify-between"
              >
                {/* Image */}
                <div className="aspect-[16/10] w-full bg-slate-900 overflow-hidden relative">
                  <img 
                    src={web.image} 
                    alt={web.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-blue-600 flex items-center justify-center shadow-lg cursor-pointer">
                      <Play className="w-5 h-5 fill-current translate-x-0.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-slate-800 tracking-tight leading-snug line-clamp-2">
                      {web.title}
                    </h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                      {web.speaker}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-slate-400 text-[10px] font-bold">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {web.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {web.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
