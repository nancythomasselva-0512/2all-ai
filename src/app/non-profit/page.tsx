"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DemoModal from "@/components/marketing/DemoModal";
import { 
  Check, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Heart, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Gift,
  Award,
  FileCheck,
  CheckCircle2
} from "lucide-react";

export default function NonProfitPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const partners = [
    { name: "Parkinson Foundation", desc: "Support and research for Parkinson disease.", category: "Health" },
    { name: "Blind Veterans Association", desc: "Supporting blind and visually impaired veterans.", category: "Veterans" },
    { name: "United Spinal Association", desc: "Empowering wheelchair users and spinal survivors.", category: "Physical" },
    { name: "Disabled Sports USA", desc: "Providing adaptive sports programs for youth and adults.", category: "Sports" },
    { name: "National MS Society", desc: "Curing MS while empowering those affected.", category: "Health" },
    { name: "Access Advancements", desc: "Expanding assistive tech solutions in public spaces.", category: "Advocacy" },
    { name: "Heart of Autism", desc: "Support programs for autistic children and families.", category: "Youth" },
    { name: "Alliance of Nations", desc: "Global outreach advocacy for disability inclusion.", category: "Advocacy" }
  ];

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqItems = [
    {
      q: "Who is eligible for the 2all.ai Nonprofit Grant program?",
      a: "Any registered 501(c)(3) nonprofit organization, charitable foundation, or registered international equivalent dedicated to social impact is eligible to receive our accessibility software 100% free."
    },
    {
      q: "What is included with the free nonprofit license?",
      a: "Eligible nonprofits receive full access to our AI automatic scanner, real-time DOM remediation engine, accessibility widget customization options, and daily compliance verification audits at zero cost."
    },
    {
      q: "Are there co-marketing opportunities for our organization?",
      a: "Yes. We work closely with our nonprofit partners to showcase their mission through interviews, co-branded compliance statements, newsletters, and spotlights in our media feed."
    },
    {
      q: "How fast is the verification process?",
      a: "Simply submit your organization name, 501(c)(3) EIN number, and website URL. Our compliance team verifies applications within 24 to 48 hours."
    }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-slate-800">
      <Navbar />

      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />

      {/* ── 1. UNIQUE EMERALD HERO HEADER ── */}
      <section className="bg-gradient-to-b from-[#043427] via-[#064e3b] to-[#022c22] text-white pt-2 pb-10 md:pt-3 md:pb-14 px-6 md:px-12 lg:px-16 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(52,211,153,0.12)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Top-Left Breadcrumbs */}
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left mb-6">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Non Profit" } ]} 
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Content */}
          <div className="space-y-5 text-left max-w-xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              100% Free Nonprofit Accessibility Grant
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Web accessibility for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white italic font-serif font-light">every mission</span>.
            </h1>

            <p className="text-emerald-100/90 text-base md:text-lg leading-relaxed font-light">
              We believe digital inclusion is a fundamental human right. 2all.ai provides 100% free, full-feature licenses to eligible 501(c)(3) nonprofits and charitable organizations worldwide.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setShowDemo(true)}
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-7 py-3 rounded-full font-extrabold text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-500/20 inline-flex items-center gap-2"
              >
                Apply For Free License <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Custom Hero Card: Nonprofit Grant Dashboard */}
          <div className="relative w-full">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-[2.5rem] blur-2xl transform -rotate-2" />
            <div className="relative bg-slate-900/90 border border-emerald-500/20 rounded-[2rem] p-7 text-white shadow-2xl backdrop-blur-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">Nonprofit Grant Program</div>
                    <div className="text-[10px] text-emerald-300 font-bold">501(c)(3) Verified License</div>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">$0 / LIFETIME</span>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Full AI Scanner & DOM Engine", status: "Included (100% Free)" },
                  { title: "Custom Branded Accessibility Widget", status: "Included (100% Free)" },
                  { title: "WCAG 2.2 AA Compliance Audit", status: "Included (100% Free)" },
                  { title: "24/7 Priority Support", status: "Included (100% Free)" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 font-mono">{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-950/60 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Over 500+ registered charities rely on 2all.ai to protect their digital presence.</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. TRUSTED BY NONPROFITS TICKER ── */}
      <section className="py-10 bg-white border-b border-slate-100 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Empowering Leading Nonprofits & Advocacy Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {["Parkinson Foundation", "Blind Veterans Association", "United Spinal", "Disabled Sports USA", "National MS Society"].map((name, i) => (
              <span key={i} className="text-xs font-bold tracking-tight text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 shadow-sm">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. NONPROFIT PROGRAM BENEFITS ── */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">Program Benefits</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              Everything your organization needs for compliance
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We eliminate technical barriers so your team can focus 100% on your core mission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Gift,
                title: "100% Free Lifetime Access",
                desc: "Zero licensing fees, zero hidden charges. Get enterprise-grade accessibility tools completely free."
              },
              {
                icon: Award,
                title: "WCAG 2.2 AA Certification",
                desc: "Receive formal Letter of Conformance certificates to prove your site's digital accessibility."
              },
              {
                icon: Heart,
                title: "Co-Marketing Spotlights",
                desc: "We feature our nonprofit partners across our media channels to raise awareness for your cause."
              }
            ].map((perk, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-7 hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  <perk.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{perk.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW TO APPLY (3-STEP PROCESS) ── */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">Application Steps</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">How to get your free license</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { step: "01", title: "Submit 501(c)(3) Details", desc: "Fill out a short 1-minute form with your organization name and website URL." },
              { step: "02", title: "Instant Review", desc: "Our team verifies your nonprofit status within 24-48 business hours." },
              { step: "03", title: "Activate Site Protection", desc: "Copy your single-line JS snippet to make your entire website accessible." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-3xl font-black text-emerald-500/20 absolute top-4 right-6 font-mono">{item.step}</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NONPROFIT PARTNERS DIRECTORY ── */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">Nonprofit Network</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Explore our nonprofit partners
            </h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
              Filter by advocacy focus or organization name to see registered partners.
            </p>

            {/* Real-time Search Filter Bar */}
            <div className="pt-2 max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search partners by name or focus area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Grid Layout of Partners */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {filteredPartners.map((partner) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-left flex flex-col justify-between h-[170px] hover:shadow-md hover:bg-white transition-all duration-300"
                >
                  <div className="space-y-2">
                    <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full inline-block">
                      {partner.category}
                    </span>
                    <h4 className="text-xs font-black text-slate-900 tracking-tight leading-snug">
                      {partner.name}
                    </h4>
                    <p className="text-slate-500 text-[10px] leading-relaxed">
                      {partner.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                    Verified Partner <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center text-slate-400 py-8 text-xs font-medium">
              No partners match your search query. Try another keyword.
            </div>
          )}

        </div>
      </section>

      {/* ── 6. FAQ ACCORDION SECTION ── */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">Support Desk</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Frequently asked questions</h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="py-4 text-left">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-slate-800 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-sm md:text-base font-bold pr-4">{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs md:text-sm text-slate-500 mt-2.5 leading-relaxed pl-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. CTA BANNER ── */}
      <section className="pb-12 md:pb-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#043427] via-[#064e3b] to-[#022c22] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-400/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left space-y-3 max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">
              Ready to make your website <span className="text-emerald-300 italic font-serif">fully accessible</span>?
            </h2>
            <p className="text-emerald-100/80 text-xs md:text-sm">
              Apply for your 100% free nonprofit license today. Quick 24-hour verification.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setShowDemo(true)}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-7 py-3 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-xl"
            >
              APPLY FOR FREE LICENSE
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
