"use client";

import React, { useState } from 'react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Workflow, Users, Box, Heart, Puzzle, Check } from "lucide-react";
import Link from 'next/link';

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showPromo, setShowPromo] = useState(true);

  const values = [
    {
      id: 0,
      title: "Take ownership",
      icon: Workflow,
      color: "bg-[#004bff]",
      textColor: "text-white",
      activeIconColor: "text-[#004bff]",
      description: "We hold ourselves accountable for our actions and their outcomes, empowering everyone within our organization to drive meaningful impact.",
      image: "/images/testing_session.png"
    },
    {
      id: 1,
      title: "Work as one",
      icon: Users,
      color: "bg-blue-800",
      textColor: "text-white",
      activeIconColor: "text-blue-800",
      description: "We believe in collaboration, mutual respect, and leveraging our diverse strengths to achieve extraordinary goals together.",
      image: "/images/community_selfie.png"
    },
    {
      id: 2,
      title: "Think simple",
      icon: Box,
      color: "bg-[#d9f99d]",
      textColor: "text-slate-800",
      activeIconColor: "text-lime-700",
      description: "We aim for clarity and simplicity in our solutions, ensuring accessibility is straightforward and effective for everyone.",
      image: "/images/hands_collaboration.png"
    },
    {
      id: 3,
      title: "Keep caring",
      icon: Heart,
      color: "bg-slate-900",
      textColor: "text-white",
      activeIconColor: "text-slate-900",
      description: "We design with empathy and care, putting the needs of people with disabilities and our community at the center of everything we do.",
      image: "/images/nonprofit_group.png"
    },
    {
      id: 4,
      title: "Keep growing",
      icon: Puzzle,
      color: "bg-[#a5b4fc]",
      textColor: "text-slate-800",
      activeIconColor: "text-indigo-600",
      description: "We foster a culture of continuous learning, curiosity, and innovation to lead the future of web accessibility.",
      image: "/images/testing_session.png"
    }
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col relative select-none font-sans">
      {/* Top Announcement Bar */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-slate-950 text-white text-[10px] sm:text-xs py-2 px-4 flex items-center justify-between gap-4 z-50 shrink-0 font-medium relative"
          >
            <div className="mx-auto flex items-center gap-2">
              <span>New Partner Program! Download the revenue opportunities.</span>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 font-bold uppercase tracking-wider underline">
                FREE WEBINAR
              </a>
            </div>
            <button 
              onClick={() => setShowPromo(false)} 
              className="absolute right-4 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <div className="flex-grow flex flex-col pt-6 pb-24">
        
        {/* Breadcrumbs and Hero Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full text-center space-y-6 pt-4">
          <div className="flex justify-center">
            <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Careers" } ]} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tight max-w-2xl mx-auto leading-[1.1]">
            Ready to make an <span className="text-[#004bff] italic font-serif font-light">impact?</span><br />
            Join us.
          </h1>
          
          <p className="text-base sm:text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            If you think you have what it takes to make a never-before-seen impact, then we're looking for you.
          </p>

          <div className="pt-4">
            <Link 
              href="#positions"
              className="bg-[#004bff] hover:bg-blue-600 text-white rounded-xl px-8 py-3.5 text-xs font-black tracking-wider uppercase inline-flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
            >
              SEE OPEN POSITIONS <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80", alt: "Team collaborating over laptop screen" },
              { src: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=500&q=80", alt: "Team mapping accessible wireframes on whiteboard" },
              { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80", alt: "Bright, modern open office lounge area" },
              { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80", alt: "Accessibility software engineer presenting build flow" }
            ].map((img, i) => (
              <div 
                key={i} 
                className="h-64 rounded-3xl overflow-hidden shadow-sm border border-slate-100/50 relative group"
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* "Why work at 2all.ai?" Info Section */}
        <div className="max-w-5xl mx-auto px-6 sm:px-12 w-full mt-24">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left Column Heading */}
            <div className="lg:w-1/3 space-y-3 shrink-0">
              <span className="text-[10px] font-bold text-[#004bff] uppercase tracking-widest block">
                A JOB YOU CAN BE PROUD OF
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Why work at 2all.ai?
              </h2>
            </div>
            
            {/* Right Column Copy */}
            <div className="lg:w-2/3 space-y-6 text-slate-500 font-light text-sm sm:text-base leading-relaxed text-left">
              <p>
                <strong className="font-semibold text-slate-800">2all.ai is unique</strong> because it allows employees to gain the best of both worlds: product-focus and employee opportunities and transitions, and knowing that your work genuinely helps people around the world.
              </p>
              <p>
                It is a win-win solution for our employees, just like our solutions are a win-win for both people with disabilities and local businesses. This positive energy sinks into every facet of our company and is carried forward into all endeavors.
              </p>
              <p>
                Joining us means becoming part of something bigger than our individual selves, and we're looking for enthusiastic employees who share our passion!
              </p>
              <div className="pt-2">
                <Link 
                  href="#" 
                  className="text-[#004bff] hover:text-blue-600 font-bold inline-flex items-center gap-1.5 transition-colors uppercase tracking-wider text-xs font-sans"
                >
                  CANDIDATES PRIVACY NOTICE <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-5xl mx-auto px-6 sm:px-12 w-full mt-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
              Our Values
            </h2>
          </div>

          {/* Interactive Values component switcher */}
          <div className="flex flex-col md:flex-row h-auto md:h-[300px] w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50 relative">
            {values.map((val) => {
              const isActive = activeTab === val.id;
              const IconComp = val.icon;
              return (
                <motion.div
                  key={val.id}
                  layout
                  onClick={() => setActiveTab(val.id)}
                  className={`h-[250px] md:h-full transition-all duration-500 cursor-pointer flex flex-col justify-between p-8 relative overflow-hidden select-none border-b md:border-b-0 md:border-r border-white/10 ${
                    isActive 
                      ? "flex-[3] bg-white text-slate-800 cursor-default" 
                      : `flex-[0.6] ${val.color} ${val.textColor} hover:opacity-95`
                  }`}
                >
                  {/* Top: Icon (Large when active, medium when inactive) */}
                  <div className="flex items-center justify-between w-full">
                    <div 
                      className={`p-3.5 rounded-2xl flex items-center justify-center transition-all ${
                        isActive ? "bg-slate-100 text-slate-900" : "bg-white/10 text-current"
                      }`}
                    >
                      <IconComp className={`w-6 h-6 ${isActive ? val.activeIconColor : "text-current"}`} />
                    </div>
                  </div>

                  {/* Middle / Bottom Content */}
                  <div className="space-y-3">
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex items-center justify-between gap-6 text-left w-full h-[140px]"
                      >
                        <div className="flex-grow space-y-2">
                          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                            {val.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
                            {val.description}
                          </p>
                        </div>
                        <div className="hidden sm:block w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-sm bg-slate-50">
                          <img src={val.image} alt={val.title} className="w-full h-full object-cover" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="md:h-12 flex items-end justify-center w-full">
                        <span className="text-[10px] font-black uppercase tracking-widest md:[writing-mode:vertical-lr] md:rotate-180 select-none opacity-80 whitespace-nowrap">
                          {val.title}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div id="positions" className="max-w-6xl mx-auto px-6 w-full mt-24">
          <div className="w-full bg-[#004bff] rounded-[3rem] text-white py-16 px-8 sm:px-16 relative overflow-hidden shadow-2xl shadow-blue-500/20">
            {/* Decorative soft blur gradient blobs */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-300/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-400/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
                  Ready to make an <span className="italic font-serif font-light text-cyan-200">impact?</span>
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 font-light">
                  Join our passionate team and help make the internet accessible for everyone.
                </p>
              </div>
              <Link 
                href="/register" 
                className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-2xl font-extrabold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0"
              >
                JOIN THE TEAM <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
