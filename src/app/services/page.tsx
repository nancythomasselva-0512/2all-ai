"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText, 
  Layout, 
  ShieldCheck, 
  Users, 
  Search, 
  Sparkles, 
  Code,
  ArrowRight,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ServicesPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white relative font-sans text-slate-800">
      
      {/* Standard Header Navbar */}
      <Navbar onOpenDemo={() => setIsDemoOpen(true)} />

      {/* HERO SECTION */}
      <section className="relative bg-white pt-4 pb-16 border-b border-transparent">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6 relative z-10">
          <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Services" } ]} />
              <h1 className="text-4xl sm:text-5xl md:text-[54px] font-black text-[#0f172a] leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Digital accessibility <span className="text-[#a044ff] italic font-serif relative">
              services
              <svg viewBox="0 0 100 20" className="absolute -bottom-1 left-0 w-full h-auto text-[#a044ff]/20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> for inclusion and compliance
          </h1>
          <p className="text-[#475569] text-base md:text-[17px] max-w-3xl mx-auto leading-relaxed font-medium">
            2all.ai provides you with all the professional services you need to meet the accessibility requirements important to you — with dedicated experts for every step of your needs.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsDemoOpen(true)}
              className="flex items-center gap-2 bg-[#311166] hover:bg-[#250d4d] text-white rounded-md px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all shadow-md"
            >
              BOOK A DEMO
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="pb-24 pt-4 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "VPAT",
              desc: "Get a comprehensive VPAT evaluating your web accessibility against WCAG 2.1 AA, the standard for businesses operating locally or globally.",
              icon: FileText,
            },
            {
              title: "File accessibility",
              desc: "Make your PDF, Word, Excel, and PPT files accessible to everyone. We will repair and test any document you have.",
              icon: Layout,
            },
            {
              title: "Litigation support",
              desc: "Enjoy peace of mind with end-to-end support in the event you're faced with an accessibility lawsuit.",
              icon: ShieldCheck,
            },
            {
              title: "User testing",
              desc: "Get feedback on product updates from an objective, 3rd party testing panel composed of people with a variety of disabilities.",
              icon: Users,
            },
            {
              title: "Expert audit",
              desc: "Get an intensive manual review of your entire digital platform from our accessibility experts, complete with actionable insights.",
              icon: Search,
            },
            {
              title: "MTOR",
              desc: "Ensure full-coverage web accessibility through 2all.ai's hybrid approach of AI and human review.",
              icon: Sparkles,
            },
          ].map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="bg-white border border-slate-200 rounded-[24px] p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col justify-between group text-left relative min-h-[220px]"
              >
                <div className="space-y-5">
                  <div className="text-slate-700">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-[17px] font-black text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>
                <div className="absolute bottom-6 right-6">
                  <Link 
                    href="/register" 
                    className="text-slate-300 group-hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 stroke-[2]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXCEPTIONAL SERVICE SECTION */}
      <section className="bg-[#FAF8F5] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight max-w-sm">
              Exceptional service.<br/>Unmatched expertise.
            </h2>
            <button
              onClick={() => setIsDemoOpen(true)}
              className="inline-flex items-center gap-2 bg-[#311166] hover:bg-[#250d4d] text-white rounded-md px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all shadow-md"
            >
              BOOK A DEMO
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Experts in accessibility + development",
                desc: "The team you will be working with includes developers and testing professionals with disabilities.",
                icon: <Users className="w-5 h-5" />
              },
              {
                title: "Secure workflows",
                desc: "Your data is secure. Choose a scalable solution with peace of mind. We protect digital assets for global enterprises.",
                icon: <ShieldCheck className="w-5 h-5" />
              },
              {
                title: "Competitive pricing",
                desc: "Pricing is determined by exactly what you need, delivering affordable accessibility without compromising on quality.",
                icon: <FileText className="w-5 h-5" />
              },
            ].map((bullet, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#5a2e9e] text-white flex items-center justify-center shrink-0 mt-1">
                  {bullet.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-[15px] font-black text-slate-900">{bullet.title}</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{bullet.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER PORTAL SECTION */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-4">
          <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">CUSTOMER PORTAL</span>
          <h2 className="text-3xl md:text-[38px] font-black text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">
            Enjoy frictionless service from A to Z through our customer portal
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 relative">
          {[
            {
              num: "1",
              title: "Quote",
              desc: "Request a custom quote from our experts through our customer portal.",
              active: false,
            },
            {
              num: "2",
              title: "Service underway",
              desc: "Receive a transparent quote, accept it, and check in on the project's progress anywhere, anytime.",
              active: false,
            },
            {
              num: "3",
              title: "Project delivery",
              desc: "Your fully compliant accessibility document. It's available for download directly from the portal.",
              active: true,
            },
          ].map((step, idx) => (
            <div 
              key={step.num}
              className={`flex-1 rounded-[24px] p-8 text-left relative overflow-hidden transition-all duration-300 min-h-[220px] ${
                step.active 
                  ? "bg-[#eef3ff] border border-transparent" 
                  : "bg-white border border-slate-200"
              }`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${step.active ? "bg-[#311166]" : "bg-slate-800"}`} />
              
              <div className="space-y-6 flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className={`text-[42px] font-light leading-none ${step.active ? "text-slate-900" : "text-slate-900"}`}>{step.num}</span>
                  <h4 className="text-[17px] font-black text-slate-900 mt-4 mb-2">{step.title}</h4>
                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                </div>
                
                <div className="flex justify-end pt-4 mt-auto">
                  {step.active ? (
                    <div className="w-10 h-10 rounded-full border border-[#311166]/20 flex items-center justify-center">
                       <CheckCircle2 className="w-5 h-5 text-[#311166] stroke-[1.5]" />
                    </div>
                  ) : (
                    <Link href="/register" className="text-slate-300 hover:text-slate-900 transition-colors">
                      <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4">
          <button
            onClick={() => setIsDemoOpen(true)}
            className="inline-flex items-center gap-2 bg-[#311166] hover:bg-[#250d4d] text-white rounded-md px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all shadow-md"
          >
            BOOK A DEMO
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </section>

      {/* CHALLENGE SOLUTION SECTION */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-[42px] font-black text-slate-900 tracking-tight max-w-xl mx-auto leading-tight">
              A solution for every accessibility challenge
            </h2>
            <p className="text-[15px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              2all.ai offers an end-to-end suite of accessibility tools and services designed to help you align with WCAG standards while integrating seamlessly into your development processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "2all.ai Widget",
                textColor: "text-[#1c64f2]",
                imgPlaceholder: "from-[#a1c4fd] to-[#c2e9fb]",
              },
              {
                title: "accessFlow",
                textColor: "text-[#00c49a]",
                imgPlaceholder: "from-[#113540] to-[#07171d]",
              },
              {
                title: "accessServices",
                textColor: "text-[#3b1275]",
                imgPlaceholder: "from-[#e5d4ff] to-[#f3e9ff]",
              },
            ].map((prod) => (
              <div 
                key={prod.title} 
                className="bg-white border border-slate-100 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl transition-all"
              >
                {/* Image Area */}
                <div className={`h-60 w-full relative overflow-hidden bg-gradient-to-br ${prod.imgPlaceholder} flex items-center justify-center p-6`}>
                  <div className="w-[85%] h-[80%] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl relative overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    {/* Abstract UI representation */}
                    <div className="w-full h-full p-4 flex flex-col gap-3">
                       <div className="flex gap-2 items-center mb-2">
                         <div className="w-6 h-6 rounded-full bg-white/40" />
                         <div className="w-16 h-3 bg-white/30 rounded-full" />
                       </div>
                       <div className="w-full h-24 bg-white/20 rounded-lg shadow-inner" />
                       <div className="flex gap-2">
                         <div className="w-1/2 h-10 bg-white/20 rounded-lg" />
                         <div className="w-1/2 h-10 bg-white/20 rounded-lg" />
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-6 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-sm ${prod.textColor === "text-[#1c64f2]" ? "bg-[#1c64f2]" : prod.textColor === "text-[#00c49a]" ? "bg-[#00c49a]" : "bg-[#3b1275]"}`} />
                  <h4 className={`text-[17px] font-black ${prod.textColor}`}>{prod.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION CARDS */}
      <section className="bg-[#FAF8F5] py-24 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">READY TO GET STARTED?</span>
            <h2 className="text-3xl md:text-[32px] font-black text-slate-900 tracking-tight leading-tight max-w-xl mx-auto">
              Get a quote online or chat with a team member to get started!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-[#FAF8F5] border border-[#d6d0e1] rounded-[24px] p-8 hover:bg-white hover:border-[#b8add0] transition-all flex flex-col justify-between h-52 group cursor-pointer">
              <div className="space-y-4">
                <div className="w-8 h-8 rounded-full bg-[#f3efff] text-[#5a2e9e] flex items-center justify-center border border-[#d6d0e1]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[17px] font-black text-slate-900 mb-2">Get quote</h3>
                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                    To get an instant quote, upload your files, URL, or code repository to the Customer Portal for free.
                  </p>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Link 
                  href="/register" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#5a2e9e] hover:text-[#311166] uppercase tracking-widest"
                >
                  GET AN INSTANT QUOTE
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF8F5] border border-[#d6d0e1] rounded-[24px] p-8 hover:bg-white hover:border-[#b8add0] transition-all flex flex-col justify-between h-52 group cursor-pointer">
              <div className="space-y-4">
                <div className="w-8 h-8 rounded-full bg-[#f3efff] text-[#5a2e9e] flex items-center justify-center border border-[#d6d0e1]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[17px] font-black text-slate-900 mb-2">Talk to an expert</h3>
                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                    Contact us for a personal consultation based on your exact accessibility needs.
                  </p>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#5a2e9e] hover:text-[#311166] uppercase tracking-widest border-none bg-transparent cursor-pointer"
                >
                  SCHEDULE A MEETING
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* DEMO MODAL */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

    </div>
  );
}
