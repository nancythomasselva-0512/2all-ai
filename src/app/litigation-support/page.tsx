"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, FileText, FileSearch, HelpCircle, ArrowRight,
  ShieldAlert, MessagesSquare, FileSignature, MonitorCheck,
  ChevronDown, X, Sparkles, Activity, ShieldCheck, Lock, Play
} from "lucide-react";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import ResourcesMegamenu from "@/components/marketing/ResourcesMegamenu";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function LitigationSupportPage() {
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const closeMenuTimer = useRef<NodeJS.Timeout | null>(null);

  const openMenu = (name: string | null) => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    setActiveHoverMenu(name);
  };
  const closeMenuWithDelay = () => {
    closeMenuTimer.current = setTimeout(() => setActiveHoverMenu(null), 200);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const navTextClass = isScrolled ? "text-[#374b6c]" : "text-[#0a1e3f]";
  const navHoverClass = "hover:text-blue-600";
  const logoClass = "mix-blend-multiply";

  const faqs = [
    { q: "What does the litigation support package include?", a: "Our litigation support package includes a comprehensive audit of your website, professional compliance documentation, priority support from our dedicated case managers, and technical guidance for your legal team if you receive a demand letter." },
    { q: "Do you guarantee that I won't get sued?", a: "While no company can guarantee immunity from lawsuits, using 2all.ai significantly reduces your risk by bringing your website into compliance with WCAG and ADA guidelines, and providing the documentation to prove it." },
    { q: "How quickly can you provide compliance documentation?", a: "Once your website is scanned and remediated by our tools, we can generate compliance reports and VPATs almost immediately through your dashboard." },
    { q: "Does litigation support cost extra?", a: "Basic litigation support documentation is included in all premium plans. For dedicated expert testimony and advanced legal tech support, we offer specialized enterprise packages." },
    { q: "Who handles the litigation support?", a: "We have a dedicated team of accessibility experts and compliance officers who work alongside your technical and legal teams to provide all necessary evidence and remediation roadmaps." },
    { q: "Is 2all.ai legally liable if my website is sued?", a: "We provide the tools and support to make your website accessible, but ultimate legal liability remains with the website owner. We act as your compliance partner and technical advocate." }
  ];

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden font-sans">
      
      {/* NAVBAR */}
      <header
        onMouseLeave={closeMenuWithDelay}
        className={`w-full py-2 px-4 md:px-10 z-50 fixed top-0 transition-all duration-500 ease-out border-b ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-slate-200/50" : "bg-white/80 backdrop-blur-md border-transparent"}`}
      >
        <div className="w-full flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="md:px-4 py-1.5 flex items-center justify-between flex-grow">
            <Link href="/" className="flex items-center mr-2 md:mr-6 shrink-0">
              <img src="/images/logo.png" alt="2all.ai Logo" className={`h-10 md:h-16 w-auto object-contain transition-all ${logoClass}`} />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { name: "SOLUTIONS", hasDropdown: true },
                { name: "COMPANY", hasDropdown: true },
                { name: "PARTNERS", hasDropdown: true },
                { name: "RESOURCES", hasDropdown: true },
                { name: "PRICING", hasDropdown: false },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.name === "PRICING" ? "/pricing" : "#"}
                  onMouseEnter={() => link.name !== "PRICING" ? openMenu(link.name) : openMenu(null)}
                  className={`text-[13px] font-bold ${navTextClass} ${navHoverClass} transition-colors flex items-center gap-1.5 tracking-wider pb-1`}
                >
                  <span className="relative">
                    {link.name}
                    {activeHoverMenu === link.name && link.hasDropdown && (
                      <motion.span layoutId="ls-nav-underline" className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-blue-600`} />
                    )}
                  </span>
                  {link.hasDropdown && (
                    <motion.svg animate={{ rotate: activeHoverMenu === link.name ? 180 : 0 }} transition={{ duration: 0.2 }} viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[3.5] stroke-current fill-none">
                      <path d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  )}
                </Link>
              ))}
            </nav>
            <Link href="/login" className={`hidden md:block text-[13px] font-bold ${navTextClass} ${navHoverClass} tracking-wider mr-2`}>LOGIN</Link>
          </div>
          <div className="py-1.5 md:pl-6 flex items-center gap-3 md:gap-5 shrink-0">
            <button onClick={() => setIsDemoOpen(true)} className={`hidden md:block text-[13px] font-bold ${navTextClass} ${navHoverClass} tracking-wider border-none bg-transparent cursor-pointer pb-1`}>BOOK A DEMO</button>
            <Link href="/register" className={`flex items-center gap-2 rounded-xl px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-[12px] font-extrabold tracking-wider whitespace-nowrap transition-all bg-[#004bff] hover:bg-[#003edd] text-white shadow-md shadow-blue-500/20`}>
              START FREE TRIAL
              <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[3] stroke-current fill-none"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
        <SolutionsMegamenu isOpen={activeHoverMenu === "SOLUTIONS"} onMouseEnter={() => openMenu("SOLUTIONS")} onMouseLeave={closeMenuWithDelay} />
        <CompanyMegamenu isOpen={activeHoverMenu === "COMPANY"} onMouseEnter={() => openMenu("COMPANY")} onMouseLeave={closeMenuWithDelay} />
        <PartnersMegamenu isOpen={activeHoverMenu === "PARTNERS"} onMouseEnter={() => openMenu("PARTNERS")} onMouseLeave={closeMenuWithDelay} />
        <ResourcesMegamenu isOpen={activeHoverMenu === "RESOURCES"} onMouseEnter={() => openMenu("RESOURCES")} onMouseLeave={closeMenuWithDelay} />
      </header>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      <main>
        {/* ── HERO ── */}
        <section className="w-full pt-40 pb-20 px-6 md:px-10 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
              
              <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Services" }, { label: "Litigation Support" } ]} />
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0a1e3f] leading-[1.1] tracking-tight">
                Comprehensive<br/>litigation support<br/>you can depend on
              </motion.h1>
              <motion.p variants={fadeUp} className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-md">
                Secure your peace of mind with 2all.ai's dedicated support experts. From documentation to technical guidance, we've got you covered.
              </motion.p>
              <motion.div variants={fadeUp} className="pt-2">
                <Link href="/register" className="bg-[#004bff] hover:bg-[#003edd] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all shadow-xl shadow-blue-500/20 inline-block">
                  Get started
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="relative h-[500px] hidden lg:block">
               {/* Hero Images overlapping */}
               <div className="absolute right-0 top-10 w-[380px] h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 bg-slate-100">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" alt="Legal professional" className="w-full h-full object-cover" />
               </div>
               <div className="absolute left-10 top-32 w-[280px] h-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 bg-slate-100">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" alt="Expert support" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                     <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
               </div>
               {/* Decorative dots/blobs */}
               <div className="absolute -top-10 left-20 w-32 h-32 bg-blue-100 rounded-full blur-3xl pointer-events-none" />
               <div className="absolute bottom-10 right-20 w-40 h-40 bg-indigo-100 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* ── BLUE BANNER ── */}
        <section className="w-full bg-[#004bff] text-white py-12 px-6 md:px-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl lg:text-4xl font-black max-w-4xl mx-auto leading-tight">
            <span className="text-cyan-300 italic font-serif">Zero</span> cases lost by 2all.ai customers for non compliance
          </motion.h2>
        </section>

        {/* ── DEDICATED CASE MANAGER ── */}
        <section className="w-full py-24 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0a1e3f] tracking-tight leading-tight">
                A dedicated case manager<br/>and trusted advocate
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Our accessibility experts become an extension of your team. From gathering necessary documentation to advising your legal counsel, we ensure you have everything needed to prove your compliance standing quickly and effectively.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" alt="Consultation" className="w-full h-full object-cover" />
              </div>
              {/* Floating chat widget */}
              <div className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-12 bg-white p-4 pr-8 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                   <MessagesSquare className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Connect with us</div>
                   <div className="text-sm font-black text-[#0a1e3f]">A 2all.ai expert has joined the chat</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PEACE OF MIND GRID ── */}
        <section className="w-full py-16 px-6 md:px-10 border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">Gain peace of mind.<br/>Defend claims with confidence.</h2>
             </motion.div>
             <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                {[
                  { icon: <ShieldAlert className="w-6 h-6 text-blue-600" />, title: "Litigation support package", desc: "Access comprehensive documentation designed to quickly dismiss unfounded demand letters, including technical compliance reports." },
                  { icon: <FileSearch className="w-6 h-6 text-blue-600" />, title: "Audit & remediation process", desc: "Show exactly when your site was scanned, what issues were identified, and how our AI automatically remediated them to meet WCAG standards." },
                  { icon: <FileSignature className="w-6 h-6 text-blue-600" />, title: "Professional guidance & reports", desc: "Receive detailed, lawyer-approved documentation that breaks down technical accessibility concepts into actionable legal defense strategies." },
                  { icon: <Lock className="w-6 h-6 text-blue-600" />, title: "Compliance status assurance", desc: "Demonstrate ongoing commitment with time-stamped logs proving continuous accessibility monitoring and automated real-time fixes." }
                ].map((feature, i) => (
                   <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                      <div className="shrink-0 mt-1">{feature.icon}</div>
                      <div>
                         <h3 className="text-lg font-bold text-[#0a1e3f] mb-2">{feature.title}</h3>
                         <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
             <div className="mt-16 text-center">
                <Link href="/register" className="bg-[#0a1e3f] hover:bg-[#06122b] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all inline-block">
                  Learn more
                </Link>
             </div>
          </div>
        </section>

        {/* ── STEP BY STEP PROCESS ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-[#e0f2fe]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
                {[
                  "Dedicated Support Expert",
                  "Audit Documentation",
                  "Professional Guidance",
                  "Continued Accessibility Monitoring",
                  "Comprehensive Litigation support package"
                ].map((step, i) => (
                   <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 flex items-center gap-4 group hover:shadow-md transition-shadow">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-black text-sm flex items-center justify-center shrink-0 border border-blue-100">
                         {i + 1}
                      </div>
                      <h4 className="text-lg font-bold text-[#0a1e3f]">{step}</h4>
                   </motion.div>
                ))}
             </motion.div>

             <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sticky top-32 space-y-6 lg:pl-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0a1e3f] tracking-tight leading-tight">
                  Comprehensive litigation<br/>support, step by step
                </h2>
                <Link href="/register" className="bg-[#0a1e3f] hover:bg-[#06122b] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all inline-block mt-4">
                  Talk to us
                </Link>
             </motion.div>
          </div>
        </section>

        {/* ── PRICING TABLE ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-white">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight">Choose the best litigation<br/>support for your business</h2>
            </div>
            
            <div className="w-full overflow-x-auto pb-4">
               <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                     <tr>
                        <th className="text-left py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-widest w-2/5 border-b-2 border-slate-100">Features</th>
                        <th className="text-center py-4 px-6 text-sm font-bold text-[#0a1e3f] border-b-2 border-slate-100 w-1/5">Standard<br/><span className="text-xs text-slate-400 font-normal mt-1 block">Up to 1K pages</span></th>
                        <th className="text-center py-4 px-6 text-sm font-bold text-[#0a1e3f] border-b-2 border-slate-100 w-1/5">Professional<br/><span className="text-xs text-slate-400 font-normal mt-1 block">Up to 10K pages</span></th>
                        <th className="text-center py-4 px-6 text-sm font-bold text-[#0a1e3f] border-b-2 border-slate-100 w-1/5">Enterprise<br/><span className="text-xs text-slate-400 font-normal mt-1 block">Unlimited</span></th>
                     </tr>
                  </thead>
                  <tbody>
                     {[
                       ["accessWidget", true, true, true],
                       ["Litigation Support", true, true, true],
                       ["Compliance Audit", false, true, true],
                       ["VPAT Documentation", false, true, true],
                       ["Dedicated Case Manager", false, false, true],
                       ["SLA & Guaranteed Response Time", false, false, true],
                       ["API Access", false, false, true]
                     ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                           <td className="py-5 px-6 border-b border-slate-100 text-sm font-bold text-slate-700">{row[0]}</td>
                           <td className="py-5 px-6 border-b border-slate-100 text-center">
                              {row[1] ? <Check className="w-5 h-5 text-blue-600 mx-auto" /> : <span className="text-slate-300">-</span>}
                           </td>
                           <td className="py-5 px-6 border-b border-slate-100 text-center">
                              {row[2] ? <Check className="w-5 h-5 text-blue-600 mx-auto" /> : <span className="text-slate-300">-</span>}
                           </td>
                           <td className="py-5 px-6 border-b border-slate-100 text-center">
                              {row[3] ? <Check className="w-5 h-5 text-blue-600 mx-auto" /> : <span className="text-slate-300">-</span>}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="text-center">
               <Link href="/pricing" className="bg-[#0a1e3f] hover:bg-[#06122b] text-white px-8 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all inline-block mt-4">
                 See full pricing
               </Link>
            </div>
          </div>
        </section>

        {/* ── PRODUCT CARDS ── */}
        <section className="w-full py-12 px-6 md:px-10 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="bg-[#0a1e3f] rounded-[32px] overflow-hidden flex flex-col group cursor-pointer shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 overflow-hidden bg-slate-800 relative">
                   <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop" alt="accessWidget" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                   <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">accessWidget</div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                   <div>
                      <h3 className="text-xl font-black text-white mb-3">AI-Powered Accessibility for Websites</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">Fully automated solution that installs in minutes and ensures WCAG and ADA compliance without modifying your source code.</p>
                   </div>
                   <Link href="/access-widget" className="text-cyan-400 font-bold text-sm hover:text-cyan-300 uppercase tracking-wider inline-flex items-center gap-1">Read more <ArrowRight className="w-4 h-4" /></Link>
                </div>
             </div>
             {/* Card 2 */}
             <div className="bg-[#f8fafc] rounded-[32px] border border-slate-200 overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-48 overflow-hidden bg-slate-200 relative">
                   <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop" alt="accessFlow" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#0a1e3f] shadow-sm">accessFlow</div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                   <div>
                      <h3 className="text-xl font-black text-[#0a1e3f] mb-3">Native Accessibility for Dev Teams</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">Integrate accessibility testing and remediation directly into your CI/CD pipeline and development workflow.</p>
                   </div>
                   <Link href="/register" className="text-blue-600 font-bold text-sm hover:text-blue-700 uppercase tracking-wider inline-flex items-center gap-1">Read more <ArrowRight className="w-4 h-4" /></Link>
                </div>
             </div>
             {/* Card 3 */}
             <div className="bg-[#0f172a] rounded-[32px] overflow-hidden flex flex-col group cursor-pointer shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 overflow-hidden bg-slate-900 relative">
                   <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop" alt="accessScan" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                   <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">accessScan</div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                   <div>
                      <h3 className="text-xl font-black text-white mb-3">Free Website Accessibility Audit</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">Scan your website instantly to identify WCAG violations and get a detailed report of compliance gaps.</p>
                   </div>
                   <Link href="/register" className="text-cyan-400 font-bold text-sm hover:text-cyan-300 uppercase tracking-wider inline-flex items-center gap-1">Read more <ArrowRight className="w-4 h-4" /></Link>
                </div>
             </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-24 px-6 md:px-10 bg-[#f8fafc]">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] tracking-tight text-center">Frequently asked questions</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, idx) => (
                 <div key={idx} className="border-b border-slate-200 last:border-none pb-2">
                    <button
                       onClick={() => toggleFaq(idx)}
                       className="w-full flex justify-between items-center py-5 text-left border-none bg-transparent cursor-pointer group"
                    >
                       <span className="text-base font-bold text-[#0a1e3f] group-hover:text-blue-600 transition-colors">
                          {faq.q}
                       </span>
                       {activeFaq === idx ? (
                          <ChevronDown className="w-5 h-5 text-blue-600 shrink-0 rotate-180 transition-transform" />
                       ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform" />
                       )}
                    </button>
                    {activeFaq === idx && (
                       <div className="pb-5 text-sm text-slate-600 leading-relaxed pr-8 animate-in fade-in slide-in-from-top-2 duration-200">
                          {faq.a}
                       </div>
                    )}
                 </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section className="w-full bg-[#004bff] text-white py-20 px-6 md:px-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-cyan-400/20 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Supporting you<br/>
              <span className="italic font-serif text-cyan-300">every step</span> of the way
            </h2>
            <Link href="/register" className="bg-white hover:bg-slate-100 text-[#004bff] px-10 py-4 rounded-full font-extrabold text-sm tracking-widest uppercase transition-colors shadow-xl shrink-0">
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
