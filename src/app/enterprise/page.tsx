"use client";

import Link from "next/link";
import { Lock, Headset, BarChart, ArrowRight, ShieldCheck, Cpu, Layers } from "lucide-react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function EnterprisePage() {
  const integrations = [
    { name: "Salesforce", category: "CRM & Enterprise" },
    { name: "HubSpot", category: "Marketing Automation" },
    { name: "WordPress", category: "CMS Platform" },
    { name: "Shopify", category: "E-Commerce" },
    { name: "Next.js / React", category: "Frontend Framework" },
    { name: "Webflow", category: "Visual CMS" },
    { name: "Drupal", category: "Enterprise CMS" },
    { name: "Adobe Experience", category: "Digital Platform" },
    { name: "Magento", category: "E-Commerce" },
    { name: "AWS Cloud", category: "Infrastructure" },
    { name: "Microsoft Azure", category: "Cloud & Security" },
    { name: "Google Cloud", category: "Infrastructure" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-6 pb-10 md:pb-14 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="flex justify-start text-left mb-2">
            <Breadcrumbs 
              theme="dark" 
              items={[ { label: "Home", href: "/" }, { label: "Enterprise" } ]} 
            />
          </div>
          
          <div className="max-w-3xl mx-auto text-center space-y-3 pt-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300">ENTERPRISE ACCESSIBILITY</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-center text-white">
              Accessibility at <span className="text-[#C8FF4D]">massive scale</span>.
            </h1>
            
            <p className="text-slate-200 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed text-center">
              Designed for large organizations with complex digital ecosystems. Enterprise-grade security, dedicated account management, and multi-site orchestration.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="bg-[#004bff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                CONTACT SALES
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold text-[#004bff] uppercase tracking-widest block">ENTERPRISE CAPABILITIES</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f]">
              Built for the world's most demanding teams
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              We understand that enterprise accessibility requires more than just a widget. It requires a partner who understands compliance, security, and governance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Lock, title: "Enterprise Security", desc: "SOC2 Type II certified. ISO 27001 compliant. We meet the strictest data privacy and security requirements." },
               { icon: Headset, title: "Dedicated Success Manager", desc: "A named technical account manager provides proactive guidance, training, and strategic planning." },
               { icon: BarChart, title: "Multi-Domain Analytics", desc: "Manage hundreds of domains from a single pane of glass with rolled-up compliance reporting." },
             ].map((feature, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md">
                   <div className="w-12 h-12 rounded-2xl bg-blue-100/80 flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-[#004bff]" />
                   </div>
                   <h3 className="text-xl font-extrabold text-[#0a1e3f] mb-3">{feature.title}</h3>
                   <p className="text-sm text-slate-600 leading-relaxed font-normal">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Integration Grid */}
      <section className="py-20 px-4 bg-slate-50 border-t border-slate-200/60">
         <div className="max-w-7xl mx-auto text-center space-y-10">
            <div>
              <span className="text-xs font-bold text-[#004bff] uppercase tracking-widest block mb-2">ECOSYSTEM COMPATIBILITY</span>
              <h2 className="text-3xl font-black text-[#0a1e3f]">Seamless integration with your enterprise stack</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {integrations.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col items-center justify-center gap-1 group"
                  >
                     <span className="font-extrabold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{item.name}</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#004bff] to-[#041d57] py-20 px-4 text-center text-white">
         <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white">
               Secure your digital presence today.
            </h2>
            <p className="text-blue-100 text-base max-w-xl mx-auto">
              Get a customized enterprise compliance quote tailored to your site volume and infrastructure needs.
            </p>
            <div className="pt-2">
              <Link 
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-white text-[#004bff] hover:bg-blue-50 px-9 py-4 rounded-full font-extrabold text-sm transition-all shadow-xl hover:scale-105 active:scale-95 group"
              >
                 GET AN ENTERPRISE QUOTE
                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
