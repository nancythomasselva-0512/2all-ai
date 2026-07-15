"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { 
  Check, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Heart, 
  Globe2, 
  Volume2, 
  Play, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scanUrl, setScanUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const heroAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
  ];

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
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqItems = [
    {
      q: "Who is eligible for the 2all.ai Nonprofit Community program?",
      a: "Any registered 501(c)(3) nonprofit organization, charitable foundation, or global equivalent dedicated to social impact and community support is eligible to receive our accessibility software for free."
    },
    {
      q: "What do we get with the free nonprofit license?",
      a: "Eligible nonprofits receive full access to our AI automatic scanner, DOM remediation engine, accessibility widget customization options, and daily compliance verification audits at zero cost."
    },
    {
      q: "Are there co-marketing opportunities for our organization?",
      a: "Yes. We work closely with our nonprofit partners to showcase their mission through interviews, co-branded compliance statements, newsletters, and spotlights in our disability dialogues media feed."
    },
    {
      q: "How do we get started?",
      a: "Simply submit an application with your organization details, 501(c)(3) documentation, and website URL. Our compliance team will verify and activate your dashboard license within 24-48 hours."
    }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanUrl) return;
    setIsScanning(true);
    setScanSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-slate-800">
      <Navbar />

      {/* ── 1. HERO HEADER GALLERY ── */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Avatars Grid Gallery Banner */}
        <div className="max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-8 gap-3 opacity-60 mb-10 select-none pointer-events-none">
          {heroAvatars.map((url, idx) => (
            <div key={idx} className="aspect-square rounded-2xl border border-white/10 shadow-lg overflow-hidden bg-slate-900">
              <img src={url} alt={`Community member ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Community" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Join 2all.ai's <span className="text-[#C8FF4D]">Nonprofit</span> Community
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Empowering nonprofits with free automated web compliance tools to make digital experiences accessible to everyone.
          </p>
          
          <div className="pt-4">
            <button className="bg-[#C8FF4D] hover:bg-[#b0e63c] text-slate-900 px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:scale-105 shadow-xl">
              Apply For Free License &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. TRUSTED BY NONPROFITS ROW ── */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Join 100K+ websites worldwide already accessible to everyone
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60">
            {["Parkinson Foundation", "Blind Veterans Association", "United Spinal", "Disabled Sports USA", "National MS Society"].map((name, i) => (
              <span key={i} className="text-xs font-black tracking-tight text-slate-500 font-mono border border-slate-200 rounded px-2.5 py-1">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. YOUR MISSION MOVES ACCESSIBILITY FORWARD ── */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 text-left">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Our Commitment</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Your mission moves accessibility forward.
            </h2>
            <p className="text-slate-500 text-md leading-relaxed">
              We provide eligible nonprofit organizations with our automatic accessibility tools completely free. Together, we can make the internet inclusive for all.
            </p>
            
            <div className="space-y-6 pt-4">
              {[
                { title: "Co-marketing partnership", desc: "Collaborate with our marketing team to raise awareness, co-publish updates, and spotlight your mission." },
                { title: "Web accessibility support", desc: "Get priority developer assistance to ensure custom donation platforms and registration pages meet WCAG 2.2 AA." },
                { title: "Product impact & feedback", desc: "Be a part of our product development cycle. Nonprofits share feedback that directly shapes our accessibility features." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 leading-tight">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Community First Mockup */}
          <div className="relative rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 aspect-[4/3] flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80" 
              alt="Community leader playing basketball" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,255,77,0.1)_0%,transparent_60%)] z-10" />
            
            {/* Visual content representing basketball/advocacy context */}
            <div className="absolute bottom-8 left-8 right-8 z-20 text-left text-white space-y-3">
              <span className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-md">
                Community First
              </span>
              <h3 className="text-lg font-black tracking-tight leading-snug">
                "Our portal traffic rose by 40% after implementing 2all.ai's dynamic controls."
              </h3>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white border border-slate-600 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80" alt="Paul Thompson" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Paul Thompson</span>
                  <span className="block text-[9px] text-slate-400">Director, Adaptive Sports USA</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. DIALOGUES WITH DISABILITY LEADERS ── */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100 text-center">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Inclusion Voices</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Dialogues with disability leaders</h2>
            <p className="text-slate-500 text-md max-w-xl mx-auto leading-relaxed">
              Watch interviews and deep-dives highlighting accessibility champions who are redefining inclusive user design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Dialogue Card 1 */}
            <div className="bg-slate-900 rounded-[32px] overflow-hidden border border-slate-800 shadow-xl aspect-[16/10] relative flex items-end p-6 text-left group">
              <img 
                src="https://images.unsplash.com/photo-1484156818044-c040038b0719?auto=format&fit=crop&w=500&q=80" 
                alt="Active sports inclusion dialogue spotlight" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors z-10" />
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white z-20 hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <div className="relative z-20 text-white space-y-2">
                <span className="text-[8px] font-black uppercase tracking-wider text-[#C8FF4D]">Podcast Spotlight</span>
                <h4 className="text-sm font-black tracking-tight leading-snug">
                  SpotifyM &mdash; Inclusion in parasports and digital media
                </h4>
              </div>
            </div>

            {/* Dialogue Card 2 */}
            <div className="bg-slate-900 rounded-[32px] overflow-hidden border border-slate-800 shadow-xl aspect-[16/10] relative flex items-end p-6 text-left group">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80" 
                alt="Accessibility presentation dialogue with disability advocate" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors z-10" />
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white z-20 hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <div className="relative z-20 text-white space-y-2">
                <span className="text-[8px] font-black uppercase tracking-wider text-cyan-300">Accessibility Talk</span>
                <h4 className="text-sm font-black tracking-tight leading-snug">
                  Advocate Dialogue &mdash; WCAG 2.2 audit workflows explained
                </h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. NONPROFIT PARTNERS GRID & FILTER ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Nonprofit Network</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Explore our incredible nonprofit partners
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We coordinate with leading advocacy organizations to raise awareness and support inclusive web practices worldwide.
            </p>

            {/* Real-time Search Filter Bar */}
            <div className="pt-4 max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search partners by name or focus area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200/80 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Grid Layout of Partners */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredPartners.map((partner, idx) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200/80 rounded-[28px] p-6 text-left flex flex-col justify-between h-[180px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <div className="space-y-3">
                    <span className="text-[7.5px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full inline-block">
                      {partner.category}
                    </span>
                    <h4 className="text-xs font-black text-slate-800 tracking-tight leading-snug">
                      {partner.name}
                    </h4>
                    <p className="text-slate-500 text-[10px] leading-relaxed">
                      {partner.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 uppercase tracking-wider cursor-pointer hover:text-blue-700">
                    Visit Site &rarr;
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center text-slate-400 py-10 font-medium">
              No partners match your search query. Try another keyword.
            </div>
          )}

        </div>
      </section>

      {/* ── 6. FAQ ACCORDION SECTION ── */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-[#0b3c96] uppercase">Support Desk</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently asked questions.</h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="py-5 text-left">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-slate-800 hover:text-[#0b3c96] transition-colors"
                >
                  <span className="text-md font-bold pr-4">{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
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
                      <p className="text-sm text-slate-500 mt-3.5 leading-relaxed pl-1">
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

      {/* ── 7. FREE ACCESSIBILITY SCANNER AUDIT CTA ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0b3c96] to-[#041d57] rounded-[40px] p-10 md:p-16 flex flex-col items-center justify-center gap-6 relative overflow-hidden text-white shadow-2xl text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(200,255,77,0.08)_0%,transparent_60%)] pointer-events-none" />
          
          <span className="text-xs font-black tracking-widest text-[#C8FF4D] uppercase">Live Scan Utility</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl leading-tight">
            Find out now if your website is accessible
          </h2>
          
          <p className="text-slate-200 text-sm md:text-md max-w-md font-light leading-relaxed">
            Enter your website URL below to run a real-time compliance scan on your templates.
          </p>

          <form onSubmit={handleScan} className="w-full max-w-md flex flex-col sm:flex-row gap-3 pt-3 relative z-10">
            <input
              type="url"
              required
              placeholder="e.g. https://example.com"
              value={scanUrl}
              onChange={(e) => setScanUrl(e.target.value)}
              className="flex-grow px-5 py-3.5 rounded-full border border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C8FF4D] text-sm"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="bg-[#C8FF4D] hover:bg-[#b0e63c] disabled:bg-slate-700 disabled:text-slate-400 text-slate-900 px-8 py-3.5 rounded-full font-black text-sm tracking-widest uppercase transition-colors shrink-0 flex items-center justify-center gap-2"
            >
              {isScanning ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Scanning...
                </>
              ) : "Scan Website"}
            </button>
          </form>

          {scanSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl text-xs font-bold mt-4 max-w-sm flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
              Scan report compiled successfully! Redirecting to report dashboard...
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
