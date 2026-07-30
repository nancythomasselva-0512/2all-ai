"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Headphones, Scale, ArrowRight, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Framer Motion Variants
  const cardVariants = {
    initial: { opacity: 0, y: 25 },
    animate: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay }
    }),
    hover: {
      y: -6,
      scale: 1.01,
      transition: { type: "spring", stiffness: 150, damping: 15 }
    }
  };

  // Icon Animations
  const bookIconVariants = {
    hover: {
      rotateY: [0, -180, 0],
      scale: 1.1,
      transition: { duration: 0.95, ease: "easeInOut" }
    }
  };

  const headphonesIconVariants = {
    hover: {
      y: [0, -6, 0, -3, 0],
      scale: 1.1,
      transition: { duration: 0.65, ease: "easeOut" }
    }
  };

  const scaleIconVariants = {
    hover: {
      rotate: [0, -12, 12, -6, 6, 0],
      scale: 1.1,
      transition: { duration: 0.85, ease: "easeInOut" }
    }
  };

  // Bullet Point Animations
  const bulletDotVariants = (color: string) => ({
    initial: { scale: 1, backgroundColor: "#e2e8f0" },
    hover: {
      scale: 1.3,
      backgroundColor: color,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    }
  });

  const bulletTextVariants = {
    initial: { x: 0, color: "#475569" },
    hover: {
      x: 6,
      color: "#0f172a",
      transition: { type: "spring", stiffness: 150, damping: 15 }
    }
  };

  // Learn More Arrow Animations
  const arrowVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 0.4 }
    }
  };

  const services = [
    {
      id: "training-marketing",
      title: "Accessibility training & marketing materials",
      category: "Partner Enablement & Growth",
      icon: (
        <motion.div variants={bookIconVariants as any}>
          <BookOpen className="w-6 h-6 text-blue-600" />
        </motion.div>
      ),
      modalIcon: <BookOpen className="w-7 h-7 text-blue-600" />,
      bullets: [
        "White-label lead generation capabilities",
        "Impactful assets to sell web accessibility",
        "Private accessibility training sessions"
      ],
      dotColor: "#2563eb", // blue-600
      hoverBorder: "hover:border-blue-500/30 hover:shadow-blue-500/10",
      colorAccent: "bg-blue-500/10 text-blue-600 border-blue-100",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      accentBg: "bg-blue-600 hover:bg-blue-700",
      delay: 0.1,
      modalDesc: "Equip your agency, sales, and design teams with white-label lead generation tools, battle-tested pitch decks, and private WCAG 2.2 AA training sessions.",
      modalFeatures: [
        {
          name: "White-Label Lead Gen Widgets",
          description: "Embed automated web accessibility audit widgets directly on your agency website to automatically capture and convert qualified client leads."
        },
        {
          name: "Sales & Pitch Enablement Decks",
          description: "Gain full access to co-branded proposal templates, ROI audit calculators, and pitch presentations tailored for closing ADA compliance contracts."
        },
        {
          name: "Private Accessibility Training",
          description: "Conduct custom workshops for your developers and designers covering screen reader compatibility, keyboard navigation, and WCAG code standards."
        }
      ],
      modalCtaText: "Request Partner Marketing Kit",
      modalCtaLink: "/contact-us"
    },
    {
      id: "personal-support",
      title: "Unparalleled personal support",
      category: "Dedicated Partnership Support",
      icon: (
        <motion.div variants={headphonesIconVariants as any}>
          <Headphones className="w-6 h-6 text-indigo-600" />
        </motion.div>
      ),
      modalIcon: <Headphones className="w-7 h-7 text-indigo-600" />,
      bullets: [
        "Your own dedicated representative",
        "In-call sales involvement to close deals",
        "Choose how involved you want us to be"
      ],
      dotColor: "#4f46e5", // indigo-600
      hoverBorder: "hover:border-indigo-500/30 hover:shadow-indigo-500/10",
      colorAccent: "bg-indigo-500/10 text-indigo-600 border-indigo-100",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      accentBg: "bg-indigo-600 hover:bg-indigo-700",
      delay: 0.2,
      modalDesc: "Get direct access to senior accessibility engineers and dedicated account managers who join your client sales calls and handle complex technical inquiries.",
      modalFeatures: [
        {
          name: "Dedicated Technical Account Manager",
          description: "Enjoy direct access to a named accessibility specialist via dedicated Slack or Microsoft Teams channels for fast technical answers."
        },
        {
          name: "In-Call Sales & Technical Support",
          description: "Have our certified accessibility engineers join your client pitches to present technical architectures and answer complex compliance questions."
        },
        {
          name: "Flexible Service Engagement",
          description: "Operate with full control—choose whether 2all.ai functions as a hidden white-label partner or an active co-selling accessibility specialist."
        }
      ],
      modalCtaText: "Speak with a Partner Manager",
      modalCtaLink: "/contact-us"
    },
    {
      id: "litigation-support",
      title: "Comprehensive litigation support",
      category: "Legal Protection & Defense",
      icon: (
        <motion.div variants={scaleIconVariants as any}>
          <Scale className="w-6 h-6 text-violet-600" />
        </motion.div>
      ),
      modalIcon: <Scale className="w-7 h-7 text-violet-600" />,
      bullets: [
        "Dedicated case manager, start to finish",
        "Detailed claims analysis and responses",
        "ADA attorney consult"
      ],
      dotColor: "#7c3aed", // violet-600
      hoverBorder: "hover:border-violet-500/30 hover:shadow-violet-500/10",
      colorAccent: "bg-violet-500/10 text-violet-600 border-violet-100",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
      accentBg: "bg-violet-600 hover:bg-violet-700",
      delay: 0.3,
      modalDesc: "Shield your client websites from ADA and WCAG 2.2 AA legal demands with expert legal case management, certified audit reports, and specialized attorney consultations.",
      modalFeatures: [
        {
          name: "Dedicated Case Specialist",
          description: "Assign an experienced accessibility litigation manager to guide your client from initial demand letter receipt to complete resolution."
        },
        {
          name: "Certified Audit & Technical Responses",
          description: "Receive complete, line-by-line WCAG 2.2 AA audit documentation and technical remediation defense responses for legal counsel."
        },
        {
          name: "ADA Attorney Consultations",
          description: "Connect directly with specialized web accessibility defense attorneys to evaluate claims, formulate defense strategies, and reduce liability."
        }
      ],
      modalCtaText: "Explore Litigation Defense",
      modalCtaLink: "/litigation-support"
    }
  ];

  return (
    <>
      <motion.section 
        id="solutions"
        initial="visible"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 1, y: 0 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 }
          }
        }}
        className="py-10 md:py-14 bg-slate-50 relative overflow-hidden select-none"
      >
        {/* Background soft blur visual assets */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet-100/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          
          {/* Section Heading */}
          <div className="max-w-4xl mb-6 md:mb-8 space-y-3">
            <motion.span variants={{ hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }} className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block">END-TO-END SUPPORT & PROTECTION</motion.span>
            <motion.h2 variants={{ hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight font-sans">
              Compliance backed by <span className="text-blue-600 italic font-serif font-normal">human expertise</span>
            </motion.h2>
            <motion.p variants={{ hidden: { opacity: 1 }, visible: { opacity: 1 } }} className="text-slate-600 text-lg font-normal leading-relaxed">
              Beyond automated software, 2all.ai delivers dedicated accessibility engineers, continuous team training, and complete legal defense support.
            </motion.p>
          </div>

          {/* Coordinated 3-Card Grid */}
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {services.map((svc) => (
              <motion.div
                key={svc.title}
                custom={svc.delay}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
                variants={cardVariants as any}
                onClick={() => setSelectedService(svc)}
                className={`card-premium bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden ${svc.hoverBorder}`}
              >
                <div className="space-y-6">
                  
                  {/* Icon Core */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${svc.colorAccent}`}>
                    {svc.icon}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h3>

                  {/* Bullets List */}
                  <ul className="space-y-4 pt-4 border-t border-slate-100">
                    {svc.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        {/* Animated circular bullet indicator */}
                        <motion.div
                          variants={bulletDotVariants(svc.dotColor) as any}
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </motion.div>
                        {/* Animated bullet text */}
                        <motion.span
                          variants={bulletTextVariants as any}
                          className="text-sm font-medium leading-relaxed"
                        >
                          {bullet}
                        </motion.span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Link Footer */}
                <div className="mt-8 pt-4 border-t border-slate-50 flex justify-end">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(svc);
                    }}
                    className="text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-transparent border-none cursor-pointer"
                  >
                    Learn More
                    <motion.span variants={arrowVariants} className="inline-block">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </motion.span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* POPUP MODAL DIALOG */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8"
            >
              {/* Top Accent Line */}
              <div className={`h-2.5 w-full ${selectedService.accentBg}`} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-20 cursor-pointer border-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header Section */}
                <div className="space-y-3 pr-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${selectedService.colorAccent}`}>
                      {selectedService.modalIcon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase border ${selectedService.badgeColor}`}>
                      {selectedService.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {selectedService.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {selectedService.modalDesc}
                  </p>
                </div>

                {/* Capabilities Feature List */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Key Deliverables & Capabilities
                  </h4>

                  <div className="grid gap-3">
                    {selectedService.modalFeatures.map((feat: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors flex items-start gap-3.5"
                      >
                        <div className="mt-0.5 p-1 rounded-full bg-emerald-500/10 text-emerald-600 shrink-0">
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-extrabold text-slate-900">
                            {feat.name}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <Link
                    href={selectedService.modalCtaLink}
                    onClick={() => setSelectedService(null)}
                    className={`w-full sm:w-auto px-7 py-3.5 rounded-xl text-white text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 ${selectedService.accentBg}`}
                  >
                    {selectedService.modalCtaText}
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
