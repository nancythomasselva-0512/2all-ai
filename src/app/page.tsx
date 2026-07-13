"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Showcase from "@/components/marketing/Showcase";
import TrustSection from "@/components/marketing/TrustSection";
import AudienceSection from "@/components/marketing/AudienceSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import AuditCTA from "@/components/marketing/AuditCTA";
import BeyondCompliance from "@/components/marketing/BeyondCompliance";
import CommunityInvolvement from "@/components/marketing/CommunityInvolvement";
import ComplianceSection from "@/components/marketing/ComplianceSection";
import SecuritySection from "@/components/marketing/SecuritySection";
import PricingSection from "@/components/marketing/PricingSection";
import CloseGapsBanner from "@/components/marketing/CloseGapsBanner";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import Navbar from "@/components/marketing/Navbar";

export default function Home() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);


  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const parallaxY = useTransform(smoothMouseY, [0, 1], [-20, 20]);
  const parallaxParticlesX = useTransform(smoothMouseX, [0, 1], [-40, 40]);
  const parallaxParticlesY = useTransform(smoothMouseY, [0, 1], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden selection:bg-slate-100">
      <Navbar />
      
      {/* SECTION 1: Intro Screen (First Viewport) */}
      {/* SECTION 1: Intro Screen (First Viewport) */}
      <div 
        onMouseMove={handleMouseMove}
        className="w-full flex flex-col min-h-[calc(100svh-74px)] relative overflow-hidden bg-white pt-12 pb-12"
      >

        {/* Center Presentation Stage */}
        <div className="flex-1 relative flex flex-col justify-center gap-10 px-6 max-w-7xl mx-auto w-full z-10">

          {/* Soft central gradient accent behind text */}
          <motion.div 
            style={{ x: parallaxX, y: parallaxY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,75,255,0.08)_0%,rgba(0,75,255,0)_70%)] rounded-full blur-[60px] pointer-events-none" 
          />

          {/* Floating Blue Particles */}
          <motion.div style={{ x: parallaxParticlesX, y: parallaxParticlesY }} className="absolute inset-0 pointer-events-none">
            <motion.div animate={{ y: [-15, 15, -15], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full blur-[1px] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <motion.div animate={{ y: [15, -15, 15], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-cyan-400 rounded-full blur-[1px] shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </motion.div>

          {/* Central Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
              }
            }}
            className="w-full flex flex-col justify-center items-center text-center max-w-4xl mx-auto z-20 space-y-6"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="px-3.5 py-1.5 bg-blue-50/80 backdrop-blur-sm border border-blue-100/50 rounded-full text-xs font-bold text-[#004bff] uppercase tracking-widest block font-sans shadow-[0_0_15px_rgba(0,75,255,0.15)]"
              >
                EXPERT-DRIVEN. AI-POWERED.
              </motion.span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-[54px] font-black text-slate-900 leading-[1.15] tracking-tight font-sans max-w-3xl pt-2">
              <span className="overflow-hidden block">
                <motion.span variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="block">
                  Web accessibility
                </motion.span>
              </span>
              <span className="overflow-hidden block">
                <motion.span variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="block">
                  <span className="italic font-serif font-semibold text-[#004bff]">tailored</span> for your business
                </motion.span>
              </span>
            </h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.4, duration: 0.8 } } }}
              className="text-slate-500 text-sm sm:text-base md:text-lg font-normal max-w-2xl leading-relaxed font-sans"
            >
              We combine AI technology with accessibility expertise to help businesses achieve compliance, improve usability, and create more inclusive digital experiences.
            </motion.p>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.6 } } }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4 w-full px-4 sm:px-0"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDemoOpen(true)}
                className="btn-premium w-full sm:w-auto justify-center border-2 border-slate-200 hover:border-slate-800 text-slate-800 rounded-full px-6 py-3 md:px-8 md:py-3.5 text-xs md:text-sm font-extrabold tracking-wider uppercase flex items-center gap-2 bg-transparent cursor-pointer group shadow-sm transition-all"
              >
                BOOK A DEMO
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[3] stroke-current fill-none transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/register"
                  className="btn-premium w-full sm:w-auto justify-center bg-[#004bff] hover:bg-[#003edd] text-white rounded-full px-6 py-3 md:px-8 md:py-3.5 text-xs md:text-sm font-extrabold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-blue-500/30 group relative overflow-hidden transition-all"
                >
                  <span className="relative z-10">START FREE TRIAL</span>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[3] stroke-current fill-none relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  {/* Subtle ripple/glow overlay on hover */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
            className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto pt-10 border-t border-slate-100/60 z-20 mt-8"
          >
            {[
              {
                title: "ADA & EAA COMPLIANCE",
                desc: "WCAG 2.2 AA-based remediation for legal compliance and accessibility readiness."
              },
              {
                title: "CUSTOMIZABLE",
                desc: "Solutions and plans designed to fit every business type, platform, and accessibility goal."
              },
              {
                title: "HEAVY-LIFTING ON US",
                desc: "Fast to implement, easy to scale, and fully managed by our accessibility specialists."
              }
            ].map((feat, index) => {
              const isActive = activeCard === index;
              return (
                <motion.div
                  key={feat.title}
                  onClick={() => setActiveCard(index)}
                  layout
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  animate={{
                    y: isActive ? -12 : 0,
                    scale: isActive ? 1.04 : 1.0,
                    borderColor: isActive ? "#004bff" : "rgba(241, 245, 249, 0.8)",
                    backgroundColor: isActive ? "#ffffff" : "rgba(248, 250, 252, 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.04,
                    borderColor: "#004bff",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 20px 40px -10px rgba(0, 75, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`card-premium border p-8 sm:p-10 rounded-[32px] text-center space-y-3 cursor-pointer select-none transition-shadow duration-300 group relative overflow-hidden
                    ${isActive 
                      ? "shadow-2xl shadow-blue-500/10" 
                      : "shadow-sm"
                    }
                  `}
                >
                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <h4 className={`text-sm sm:text-base font-black tracking-wider uppercase transition-colors duration-300 group-hover:text-[#004bff]
                    ${isActive ? "text-[#004bff]" : "text-slate-800"}
                  `}>
                    {feat.title}
                  </h4>
                  <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-[280px] mx-auto transition-colors duration-300 group-hover:text-slate-600
                    ${isActive ? "text-slate-600" : "text-slate-500"}
                  `}>
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: Showcase Carousel (Video Animation) */}
      <Showcase />

      {/* SECTION 2.5: Trust Section (Orbiting Logos + Stats) */}
      <TrustSection />

      {/* SECTION 2.8: Audience Section (Website Owners / Partners) */}
      <AudienceSection />

      {/* SECTION 2.9: Services Section (Training, Support, Litigation) */}
      <ServicesSection />

      {/* SECTION 2.95: Audit CTA Banner */}
      <AuditCTA />

      {/* SECTION 2.98: Beyond Compliance (Inclusion, Opportunity, Reputation) */}
      <BeyondCompliance />

      {/* SECTION 2.99: Community Involvement Collage */}
      <CommunityInvolvement />

      {/* SECTION 2.995: Legal Compliance Badges Section */}
      <ComplianceSection />

      {/* SECTION 2.998: Highest Security Standards Section */}
      <SecuritySection />

      {/* SECTION 2.999: Pricing Plans Table Section */}
      <PricingSection />

      {/* SECTION 3: Close Gaps Blue Banner CTA */}
      <CloseGapsBanner />

      {/* SECTION 4: Brand Footer */}
      <Footer />

      {/* SCHEDULE A DEMO POPUP MODAL */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

    </div>
  );
}
