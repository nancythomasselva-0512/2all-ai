"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, ChevronDown, Activity, ShieldCheck,
  Search, Lock, ArrowRight, BarChart3,
  Shield, FileText
} from "lucide-react";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import Navbar from "@/components/marketing/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AccessScanPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleGetAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqs = [
    { q: "What is an accessibility audit?", a: "An accessibility audit is an automated and manual evaluation of your website to identify potential barriers for people with disabilities, checking against standards like WCAG and ADA." },
    { q: "How much does a scan cost?", a: "Our initial automated accessScan is completely free. It provides a high-level overview of your website's compliance status and highlights critical areas needing attention." },
    { q: "What does the free scan cover?", a: "The free scan checks your homepage or any single URL for common accessibility issues including missing alt text, contrast errors, ARIA labeling, and keyboard navigation barriers." },
    { q: "Are automated scans enough for full ADA compliance?", a: "No. While automated scans catch up to 30% of accessibility issues, true ADA compliance requires combining automated tools with manual expert auditing. 2all.ai offers both." },
    { q: "Is my data safe during the scan?", a: "Absolutely. We only scan the public-facing HTML/CSS of the URL you provide. We do not access databases, user data, or any protected areas of your site." }
  ];

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden font-sans">

      {/* NAVBAR */}
      <Navbar />

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      <main>
        {/* ── HERO (BLUE BOX) ── */}
        <section className="w-full pt-1 md:pt-2 pb-8 px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-[1400px] mx-auto bg-[#004bff] rounded-[36px] px-6 pt-3 md:pt-4 pb-8 md:pb-10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
            {/* Soft background glows */}
            <div className="absolute inset-0">
              <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-400/30 rounded-full blur-[120px]" />
              <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-cyan-400/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 space-y-5 max-w-4xl w-full">
              <Breadcrumbs items={[ { label: "Home", href: "/" }, { label: "Products" }, { label: "accessScan" } ]} />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Check if your website is<br/>accessible and ADA compliant<br/><span className="italic font-serif text-cyan-300">in seconds</span>
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white font-bold text-xs md:text-sm">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> No credit card</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> Instant results</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> Completely free</span>
              </div>

              <form onSubmit={handleGetAuditSubmit} className="max-w-xl mx-auto w-full bg-white rounded-full p-1.5 flex shadow-xl border-2 border-white/30">
                <input 
                  type="text" 
                  placeholder="mywebsite.com" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 text-[#0a1e3f] font-semibold text-sm placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  onClick={() => setIsDemoOpen(true)}
                  className="bg-[#0a1e3f] hover:bg-[#06122b] text-white px-6 py-2.5 rounded-full font-bold tracking-wider uppercase text-xs transition-colors shrink-0 cursor-pointer"
                >
                  Get Audit
                </button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* ── 3 STEPS PROCESS ── */}
        <section className="w-full py-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto space-y-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center space-y-3">
               <div className="text-blue-600 font-bold tracking-widest uppercase text-xs">Free Website Audit</div>
               <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">
                  3 simple steps.<br/>Put your website to the test
               </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
               {/* Step 1 */}
               <motion.div variants={fadeUp} className="bg-white border border-slate-200 rounded-3xl p-8 relative flex flex-col hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-black text-slate-200 absolute top-6 left-6 -z-0">1</div>
                  <div className="relative z-10 pt-10">
                     <h3 className="text-lg font-black text-[#0a1e3f] mb-3">Enter website URL</h3>
                     <p className="text-slate-500 text-sm font-semibold leading-relaxed">Paste your domain name and hit get audit</p>
                  </div>
                  <div className="mt-auto pt-8 flex justify-end">
                     <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-slate-400" /></div>
                  </div>
               </motion.div>
               {/* Step 2 */}
               <motion.div variants={fadeUp} className="bg-white border border-slate-200 rounded-3xl p-8 relative flex flex-col hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-black text-slate-200 absolute top-6 left-6 -z-0">2</div>
                  <div className="relative z-10 pt-10">
                     <h3 className="text-lg font-black text-[#0a1e3f] mb-3">Run scan</h3>
                     <p className="text-slate-500 text-sm font-semibold leading-relaxed">Our AI engines analyze the code structure and accessibility barriers</p>
                  </div>
                  <div className="mt-auto pt-8 flex justify-end">
                     <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-slate-400" /></div>
                  </div>
               </motion.div>
               {/* Step 3 */}
               <motion.div variants={fadeUp} className="bg-[#fff9f5] border border-amber-100 rounded-3xl p-8 relative flex flex-col hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-black text-amber-200/50 absolute top-6 left-6 -z-0">3</div>
                  <div className="relative z-10 pt-10">
                     <h3 className="text-lg font-black text-[#0a1e3f] mb-3">Detailed Report</h3>
                     <p className="text-slate-500 text-sm font-semibold leading-relaxed">Receive an actionable PDF report detailing violations and solutions</p>
                  </div>
                  <div className="mt-auto pt-8 flex justify-end">
                     <div className="w-10 h-10 rounded-full border border-amber-200 flex items-center justify-center"><FileText className="w-4 h-4 text-amber-600" /></div>
                  </div>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── DARK BAR STATS ── */}
        <section className="w-full bg-[#0a101f] text-white py-12 px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black">
              <span className="text-emerald-400 italic font-serif">650,000+</span> scans performed annually
            </h2>
          </motion.div>
        </section>

        {/* ── CHART SECTION ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0a1e3f] tracking-tight leading-tight">
                  Mitigate legal risk, stay compliant & access the market
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  ADA website compliance lawsuits are rising every year. Protect your brand, avoid expensive litigation, and ensure your services are available to the 15% of the population living with disabilities.
                </p>
             </motion.div>
             <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-[#ffe4e1] rounded-[40px] p-10 flex flex-col justify-between aspect-square md:aspect-auto md:h-[450px] shadow-lg">
                <div>
                   <div className="text-5xl font-black text-[#0a1e3f] mb-2">175%</div>
                   <div className="text-[#0a1e3f] font-bold">Increase in legal demand</div>
                   <div className="text-slate-500 text-sm">Over the past 5 years</div>
                </div>
                <div className="flex items-end gap-2 h-40 mt-10">
                   <div className="w-1/5 bg-[#ffb6b6] rounded-t-lg h-[20%] hover:bg-[#ff9c9c] transition-colors" />
                   <div className="w-1/5 bg-[#ffb6b6] rounded-t-lg h-[40%] hover:bg-[#ff9c9c] transition-colors" />
                   <div className="w-1/5 bg-[#ffb6b6] rounded-t-lg h-[65%] hover:bg-[#ff9c9c] transition-colors" />
                   <div className="w-1/5 bg-[#ffb6b6] rounded-t-lg h-[80%] hover:bg-[#ff9c9c] transition-colors" />
                   <div className="w-1/5 bg-[#0a1e3f] rounded-t-lg h-[100%] shadow-lg" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mt-2">
                   <span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span>
                </div>
             </motion.div>
          </div>
        </section>



        {/* ── 3 CARDS GRID ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
               <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">You want an accessible website.<br/>Start with a scan.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
               {/* Card 1 */}
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a1e3f] rounded-3xl p-8 flex flex-col justify-between aspect-square shadow-xl hover:-translate-y-2 transition-transform">
                  <div>
                     <h3 className="text-white font-bold text-xl mb-4">Protecting your business</h3>
                     <p className="text-slate-300 text-sm leading-relaxed">Stop the threat of demand letters and lawsuits by identifying the critical issues putting your business at risk.</p>
                  </div>
               </motion.div>
               {/* Card 2 */}
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#e0f2f1] rounded-3xl p-8 flex flex-col justify-between aspect-square border border-teal-100 hover:shadow-lg transition-all hover:-translate-y-2">
                  <div>
                     <h3 className="text-[#0a1e3f] font-bold text-xl mb-4">Comprehensive Audit</h3>
                     <p className="text-slate-600 text-sm leading-relaxed">Our unified engine tests against WCAG 2.2 AA standards, ensuring you get the most accurate snapshot of your compliance.</p>
                  </div>
               </motion.div>
               {/* Card 3 */}
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#fffdf7] rounded-3xl p-8 flex flex-col justify-between aspect-square border border-amber-100 hover:shadow-lg transition-all hover:-translate-y-2">
                  <div>
                     <h3 className="text-[#0a1e3f] font-bold text-xl mb-4">Actionable reporting</h3>
                     <p className="text-slate-600 text-sm leading-relaxed">Receive a detailed breakdown of what needs fixing, categorized by severity, to guide your remediation efforts.</p>
                  </div>
               </motion.div>
            </div>
          </div>
        </section>

        {/* ── BADGES SECTION ── */}
        <section className="w-full py-16 px-6 md:px-10 border-t border-slate-100">
          <div className="max-w-5xl mx-auto text-center space-y-10">
             <div className="text-blue-600 font-bold tracking-widest uppercase text-xs">A unified solution</div>
             <h2 className="text-2xl md:text-3xl font-black text-[#0a1e3f] tracking-tight">Built to support compliance</h2>
             
             <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-4">
                {["WCAG", "ADA", "EAA", "Section 508", "AODA"].map((badge, i) => (
                   <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-3 group">
                      <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                         <Check className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{badge}</span>
                   </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* ── SECURITY SECTION (DARK) ── */}
        <section className="w-full bg-[#0a101f] text-white py-24 px-6 md:px-10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
                <div className="text-slate-500 font-bold tracking-widest uppercase text-xs">Enterprise-grade security</div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">Security & privacy are our top priorities</h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md border-l-2 border-blue-600 pl-4">
                  2all.ai complies with strict international data protection laws, holding ISO 27001 certifications and undergoing regular SOC 2 Type II audits.
                </p>
                <div className="pt-2">
                   <Link href="/register" className="bg-white hover:bg-slate-200 text-[#0a1e3f] px-6 py-3 rounded-full font-extrabold text-xs tracking-widest uppercase transition-colors shadow-xl inline-block">
                     Learn More
                   </Link>
                </div>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex justify-center md:justify-end">
                {/* SOC2 Badge Mockup */}
                <div className="w-48 h-48 rounded-full border border-blue-500/30 bg-blue-900/20 backdrop-blur-sm flex flex-col items-center justify-center p-6 shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                   <ShieldCheck className="w-12 h-12 text-cyan-400 mb-2" />
                   <div className="text-white font-black text-xl leading-none">AICPA</div>
                   <div className="text-blue-200 font-bold text-lg">SOC</div>
                   <div className="text-slate-400 text-[10px] mt-1 tracking-widest uppercase">Certified</div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight text-center">Frequently asked questions</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, idx) => (
                 <div key={idx} className="border-b border-slate-200 last:border-none pb-2">
                    <button
                       onClick={() => toggleFaq(idx)}
                       className="w-full flex justify-between items-center py-5 text-left border-none bg-transparent cursor-pointer group"
                    >
                       <span className="text-base font-bold text-[#0a1e3f] group-hover:text-blue-600 transition-colors pr-6">
                          {faq.q}
                       </span>
                       {activeFaq === idx ? (
                          <ChevronDown className="w-5 h-5 text-blue-600 shrink-0 rotate-180 transition-transform" />
                       ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform" />
                       )}
                    </button>
                    {activeFaq === idx && (
                       <div className="pb-5 text-sm text-[#475569] leading-relaxed pr-8 animate-in fade-in slide-in-from-top-2 duration-200">
                          {faq.a}
                       </div>
                    )}
                 </div>
              ))}
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
