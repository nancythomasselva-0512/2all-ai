"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Check, 
  HelpCircle, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles,
  Info,
  DollarSign,
  Star,
  Menu,
  X
} from "lucide-react";
import Navbar from "@/components/marketing/Navbar";
import Logo from "@/components/ui/Logo";
import Footer from "@/components/marketing/Footer";
import DemoModal from "@/components/marketing/DemoModal";
import SolutionsMegamenu from "@/components/marketing/SolutionsMegamenu";
import CompanyMegamenu from "@/components/marketing/CompanyMegamenu";
import PartnersMegamenu from "@/components/marketing/PartnersMegamenu";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function PricingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("2allWidget");
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isVisitsInfoOpen, setIsVisitsInfoOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [plansConfig, setPlansConfig] = useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/admin/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.plans && Array.isArray(data.plans)) {
          setPlansConfig(data.plans);
        }
      })
      .catch((err) => console.error("Error loading plans config", err));
  }, []);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const getPrice = (monthlyPrice: number) => {
    if (billingPeriod === "yearly") {
      return monthlyPrice * 10; // 2 months free (20% off)
    }
    return monthlyPrice;
  };

  const faqs = [
    {
      q: "Does 2all.ai comply with regulations?",
      a: "Yes, our automated and expert solutions are designed to satisfy key international accessibility requirements, including WCAG 2.2 Level AA, ADA, EAA, Section 508, and more."
    },
    {
      q: "How's 2all.ai different from accessibility plugins?",
      a: "Unlike static plugins that merely adjust fonts or contrast, 2all.ai uses advanced AI logic and contextual computer vision to adapt structure, add missing screen reader alt-texts, correct keyboard navigation, and resolve full HTML code hierarchies dynamically."
    },
    {
      q: "Do 2all.ai solutions integrate with website builders and CMS?",
      a: "Absolutely. A single installation script integrates immediately with WordPress, Shopify, Webflow, Wix, Squarespace, Drupal, Custom React/NextJS setups, and all other major CMS frameworks."
    },
    {
      q: "Does 2all.ai help you conform to WCAG?",
      a: "Yes, 2all.ai automatically remediates interactive elements, form fields, document states, and navigational structures to align with official WCAG 2.2 AA guidelines."
    },
    {
      q: "How much does 2all.ai cost?",
      a: "Pricing starts as low as $49/mo (or $490 billed annually) for smaller sites, scaling incrementally based on the total page count of your digital platform."
    },
    {
      q: "Does 2all.ai affect loading speed?",
      a: "No. The system loads asynchronously and executes after the main DOM is fully parsed, ensuring zero impact on your Core Web Vitals or page load performance."
    },
    {
      q: "How do I install 2all.ai?",
      a: "Simply paste a single line of JavaScript code right before the closing </body> tag of your website. Alternatively, use our official CMS plugins for one-click installation."
    },
    {
      q: "Can I customize 2all.ai's user interface?",
      a: "Yes. Through the admin dashboard customizer, you can change the widget's primary colors, positioning, button shapes, icons, and language selections to align perfectly with your branding."
    },
    {
      q: "How do I know which plan is right for my needs?",
      a: "Plans are based strictly on total page volume. The Micro plan covers up to 999 pages, the Business plan up to 29,999 pages, and the Advanced plan covers up to 999,999 pages. Volume above this falls under our custom Enterprise category."
    },
    {
      q: "When I subscribe to a plan, will my entire domain become accessible?",
      a: "Yes. Once the automated script runs, it crawls and corrects accessibility issues across all public sub-pages and dynamic endpoints under your registered domain."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden selection:bg-slate-100 font-sans text-slate-800">
      
      {/* Standard Header Navbar */}
      <Navbar onOpenDemo={() => setIsDemoOpen(true)} />

      {/* TITLE & TOGGLES */}
      <section className="relative bg-[#f8fafc] pt-6 pb-8 overflow-visible z-20 text-center border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="flex justify-start text-left mb-2">
            <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Pricing" } ]} />
          </div>
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight text-center max-w-3xl mx-auto">
              <span className="text-blue-600 italic font-serif">Plans</span> scale with your website's growth and accessibility needs
            </h1>
          </div>

          {/* Toggle Control & Product Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 max-w-4xl mx-auto">
            {/* Show prices for: Dropdown */}
            <div className="flex items-center gap-3 relative">
              <span className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider">Show prices for:</span>
              <div className="relative">
                <button
                  onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                  className="flex items-center justify-between gap-3.5 bg-white border-2 border-slate-300 hover:border-blue-500 rounded-2xl px-5 py-3 text-base sm:text-lg font-black text-slate-900 shadow-sm cursor-pointer min-w-[260px] transition-all select-none"
                >
                  <span className="flex items-center gap-3">
                    {selectedProduct === "2allWidget" && (
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M4 6C4 4.89543 4.89543 4 6 4H14V16C14 18.2091 12.2091 20 10 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="#004bff" />
                        <circle cx="15" cy="9" r="4.5" fill="#38bdf8" opacity="0.9" />
                      </svg>
                    )}
                    {selectedProduct === "2allFlow" && (
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="#0d9488" />
                        <path d="M12 6.5L15.5 12L12 17.5L8.5 12L12 6.5Z" fill="#ffffff" />
                      </svg>
                    )}
                    {selectedProduct === "2allServices" && (
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="6" width="10" height="13" rx="2" fill="#a78bfa" />
                        <rect x="10" y="10" width="10" height="9" rx="2" fill="#5b21b6" />
                      </svg>
                    )}
                    <span>{selectedProduct}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isProductDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isProductDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full min-w-[260px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 space-y-1 text-left">
                    {[
                      {
                        name: "2allWidget",
                        icon: (
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6C4 4.89543 4.89543 4 6 4H14V16C14 18.2091 12.2091 20 10 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="#004bff" />
                            <circle cx="15" cy="9" r="4.5" fill="#38bdf8" opacity="0.9" />
                          </svg>
                        )
                      },
                      {
                        name: "2allFlow",
                        icon: (
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="#0d9488" />
                            <path d="M12 6.5L15.5 12L12 17.5L8.5 12L12 6.5Z" fill="#ffffff" />
                          </svg>
                        )
                      },
                      {
                        name: "2allServices",
                        icon: (
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                            <rect x="4" y="6" width="10" height="13" rx="2" fill="#a78bfa" />
                            <rect x="10" y="10" width="10" height="9" rx="2" fill="#5b21b6" />
                          </svg>
                        )
                      },
                    ].map((prod) => (
                      <button
                        key={prod.name}
                        onClick={() => {
                          setSelectedProduct(prod.name);
                          setIsProductDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer border-none ${
                          selectedProduct === prod.name ? "bg-blue-50 text-blue-600 font-black" : "text-slate-800 hover:bg-slate-50 font-bold"
                        }`}
                      >
                        <span className="flex items-center gap-3 text-sm sm:text-base font-extrabold">
                          {prod.icon}
                          <span>{prod.name}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pay Yearly / Monthly Toggle */}
            <div className="bg-slate-100/80 border border-slate-200/50 p-1 rounded-2xl flex items-center gap-1">
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-none cursor-pointer flex items-center gap-2 ${
                  billingPeriod === "yearly" ? "bg-white text-blue-600 shadow-sm" : "bg-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Pay yearly
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-md text-[9px] font-black tracking-normal">Save 20%</span>
              </button>
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-none cursor-pointer ${
                  billingPeriod === "monthly" ? "bg-white text-blue-600 shadow-sm" : "bg-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Pay monthly
              </button>
            </div>
          </div>

          {/* How monthly visits are calculated Popover Link */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setIsVisitsInfoOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 border-none bg-transparent cursor-pointer transition-colors"
            >
              How monthly visits are calculated
              <HelpCircle className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>
      </section>

      {/* How Monthly Visits Are Calculated Modal */}
      {isVisitsInfoOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border border-slate-100 text-left space-y-4"
          >
            <button
              onClick={() => setIsVisitsInfoOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors border-none cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-slate-900 pr-6">
              How monthly visits are calculated
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <strong>2all.ai</strong> subscription plans are priced according to your website's monthly traffic. We calculate the average monthly visits (non-unique, desktop, and mobile) to your domain based on data from the past six months.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsVisitsInfoOpen(false)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold tracking-wider uppercase border-none cursor-pointer shadow-md shadow-blue-500/20"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* PRICING CARDS SECTION */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        {selectedProduct === "2allFlow" ? (
          <div className="space-y-10">
            {/* 2allFlow 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
              {/* Card 1: Essential */}
              <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:shadow-2xl transition-all relative">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-wider uppercase">ESSENTIAL</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1">Up to 1,000 web pages</p>
                  </div>

                  <button
                    onClick={() => setIsDemoOpen(true)}
                    className="w-full py-3.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-500/20 tracking-wider uppercase border-none cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    BOOK A DEMO
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="border-t border-slate-100 pt-6">
                    <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
                      {[
                        "Up to 2 domains",
                        "Up to 2 users",
                        "Automatic monthly scans",
                        "AI based auditing & monitoring",
                        "20 daily on demand page scans",
                        "10 user journey recordings",
                        "Ticketing system integrations",
                        "Dedicated onboarding",
                        "In-app fix guidance",
                        "Commit-ready code remediation",
                        "Dynamic accessibility statement generator",
                        "Auto-resolve (user based session fixes)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[3]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 2: Professional */}
              <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:shadow-2xl transition-all relative">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-wider uppercase">PROFESSIONAL</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1">Up to 10,000 web pages</p>
                  </div>

                  <button
                    onClick={() => setIsDemoOpen(true)}
                    className="w-full py-3.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-500/20 tracking-wider uppercase border-none cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    BOOK A DEMO
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Everything in Essential, plus:</span>
                    <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
                      {[
                        "Up to 10 domains",
                        "Up to 10 users",
                        "Bi-weekly scan frequency",
                        "50 daily on demand page scans",
                        "50 user journey recordings",
                        "Federated Login using Google",
                        "CI/CD integrations (SDK)",
                        "MCP",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[3]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 3: Enterprise */}
              <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:shadow-2xl transition-all relative">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-wider uppercase">ENTERPRISE</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1">10,000+ web pages</p>
                  </div>

                  <button
                    onClick={() => setIsDemoOpen(true)}
                    className="w-full py-3.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-500/20 tracking-wider uppercase border-none cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    BOOK A DEMO
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Everything in Professional, plus:</span>
                    <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
                      {[
                        "Up to 100 domains",
                        "No user limits",
                        "Weekly scan frequency",
                        "150 daily on demand page scans",
                        "150 user journey recordings",
                        "Custom Legal and SLA",
                        "Single Sign-On",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[3]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Note text at bottom of 2allFlow */}
            <div className="text-left pt-4">
              <p className="text-xs text-slate-500 font-medium">
                NOTE: For a list of accessibility issues that are not remediated by 2allWidget, read our{" "}
                <Link href="/compliance" className="text-blue-600 underline font-bold hover:text-blue-700">
                  excluded issues article
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Dynamic Plans Mapping */}
            {(plansConfig.length > 0 ? plansConfig : [
              { id: "micro", name: "MICRO", description: "Under 999 pages website volume.", monthlyPrice: "$49", yearlyPrice: "$490", isRecommended: false },
              { id: "growth", name: "GROWTH", description: "Under 29,999 pages website volume.", monthlyPrice: "$149", yearlyPrice: "$1,490", isRecommended: false },
              { id: "scale", name: "SCALE", description: "Under 999,999 pages website volume.", monthlyPrice: "$399", yearlyPrice: "$3,990", isRecommended: true },
              { id: "enterprise", name: "ENTERPRISE", description: "Above 999,999 pages volume.", monthlyPrice: "Custom", yearlyPrice: "Custom", isRecommended: false },
            ]).map((plan: any) => {
              const displayPrice = billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
              const isCustom = displayPrice === "Custom";

              return (
                <div 
                  key={plan.id}
                  className={`bg-white border rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:shadow-xl transition-all text-left relative ${
                    plan.isRecommended ? "border-2 border-blue-600" : "border-slate-200/80"
                  }`}
                >
                  {plan.isRecommended && (
                    <span className="absolute top-0 right-4 lg:right-6 -translate-y-1/2 bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-white" />
                      {plan.badge || "Most Popular"}
                    </span>
                  )}

                  <div className="space-y-6">
                    <div className="min-h-[160px] flex flex-col justify-between">
                      <div>
                        <h3 className={`text-xl sm:text-2xl font-black tracking-wider uppercase ${plan.isRecommended ? "text-blue-600" : "text-[#02183a]"}`}>
                          {plan.name}
                        </h3>
                        <div className="mt-1 flex items-baseline">
                          <span className="text-3xl font-black text-slate-900">{displayPrice}</span>
                          {!isCustom && (
                            <span className="text-xs text-slate-400 font-bold ml-1">/{billingPeriod === "yearly" ? "yr" : "mo"}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-1">{plan.description}</p>
                    </div>

                    {isCustom ? (
                      <button
                        onClick={() => setIsDemoOpen(true)}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white font-extrabold text-xs rounded-xl tracking-wider uppercase border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                      >
                        Get a Quote
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <Link
                        href={`/checkout?plan=${plan.id}&billing=${billingPeriod}`}
                        className="w-full py-3 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 tracking-wider uppercase border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                      >
                        Buy Now
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}

                    <div className="border-t border-slate-100 pt-6 space-y-4 text-sm font-semibold text-slate-700">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Included Features</span>
                      <ul className="space-y-3">
                        {(plan.bulletFeatures || [
                          "2all.ai Widget (AI-Powered Overlay)",
                          "Automated Screen Reader adjustments",
                          "Standard support helpdesk"
                        ]).map((feat: string, fi: number) => (
                          <li key={fi} className="flex items-start gap-2.5">
                            <Check className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </section>

      {/* FEATURE COMPARISON TABLE */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 pb-32">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 md:mb-8 text-left">
          Compare all plan features
        </h2>

        <div className="flex items-center justify-end gap-2 mb-6">
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
              billingPeriod === "yearly"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-500 border-slate-200 hover:text-slate-700"
            }`}
          >
            Yearly (save 20%)
          </button>
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
              billingPeriod === "monthly"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-500 border-slate-200 hover:text-slate-700"
            }`}
          >
            Monthly
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-sm relative">
          <table className="w-full min-w-[900px] lg:min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-6 text-base sm:text-lg font-black text-slate-900 uppercase tracking-wider bg-white w-1/3 sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Features</th>
                {(plansConfig.length > 0 ? plansConfig : [
                  { id: "micro", name: "MICRO", description: "Under 999 pages website volume.", monthlyPrice: "$49", yearlyPrice: "$490", isRecommended: false },
                  { id: "growth", name: "GROWTH", description: "Under 29,999 pages website volume.", monthlyPrice: "$149", yearlyPrice: "$1,490", isRecommended: false },
                  { id: "scale", name: "SCALE", description: "Under 999,999 pages website volume.", monthlyPrice: "$399", yearlyPrice: "$3,990", isRecommended: true },
                  { id: "enterprise", name: "ENTERPRISE", description: "Above 999,999 pages volume.", monthlyPrice: "Custom", yearlyPrice: "Custom", isRecommended: false },
                ]).map((col: any) => {
                  const displayPrice = billingPeriod === "yearly" ? col.yearlyPrice : col.monthlyPrice;
                  const isCustom = displayPrice === "Custom";

                  return (
                    <th
                      key={col.id}
                      className={`p-5 text-center align-top ${col.isRecommended ? "bg-blue-50" : "bg-white"}`}
                    >
                      <div className="h-full flex flex-col justify-between min-h-[175px]">
                        <div>
                          {col.isRecommended ? (
                            <div className="flex items-center justify-center mb-2.5 h-6">
                              <span className="bg-[#004bff] text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-md shadow-blue-500/20">
                                <Star className="w-3 h-3 fill-white stroke-none" />
                                RECOMMENDED
                              </span>
                            </div>
                          ) : (
                            <div className="h-6 mb-2.5" />
                          )}
                          <h4 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wider mb-1">
                            {col.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-normal leading-snug">{col.description}</p>
                        </div>

                        <div>
                          <p className="text-xl font-black text-slate-900 mt-2">
                            {displayPrice}
                            {!isCustom && (
                              <span className="text-xs text-slate-400 font-normal ml-1">/{billingPeriod === "yearly" ? "year" : "mo"}</span>
                            )}
                          </p>
                          <div className="mt-3 px-1">
                            {!isCustom ? (
                              <Link
                                href={`/checkout?plan=${col.id}&billing=${billingPeriod}`}
                                className={`flex items-center justify-center text-center w-full px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all select-none whitespace-nowrap ${
                                  col.isRecommended
                                    ? "bg-[#004bff] hover:bg-[#003edd] text-white shadow-md shadow-blue-500/20"
                                    : "bg-[#02183a] hover:bg-slate-800 text-white shadow-sm"
                                }`}
                              >
                                BUY NOW
                              </Link>
                            ) : (
                              <button
                                onClick={() => setIsDemoOpen(true)}
                                className="flex items-center justify-center text-center w-full px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 cursor-pointer shadow-sm select-none whitespace-nowrap"
                              >
                                CONTACT SALES
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base text-slate-800">
              {(() => {
                const isToolIncludedInPlan = (toolId: string, planIndex: number): boolean => {
                  const planIds = ["micro", "growth", "scale", "enterprise"];
                  const targetId = planIds[planIndex];
                  const foundPlan = plansConfig.find((p: any) => p.id === targetId);
                  if (!foundPlan || !Array.isArray(foundPlan.includedFeatureIds)) {
                    if (toolId === "voiceNavigation" || toolId === "textToSpeech" || toolId === "aiAssistant" || toolId === "readEntirePage" || toolId === "autoReadSelection") {
                      return planIndex >= 2;
                    }
                    if (toolId === "dyslexiaFont" || toolId === "readingMask" || toolId === "readingRuler" || toolId === "wordSpacing" || toolId === "lineHeight") {
                      return planIndex >= 1;
                    }
                    return true;
                  }
                  return foundPlan.includedFeatureIds.includes(toolId);
                };

                const rows = [
                  // Category 1: Speech & Voice Tools
                  { isCategory: true, category: "Speech & Voice Navigation Tools" },
                  { id: "voiceNavigation", feature: "Voice Command Navigation Engine" },
                  { id: "textToSpeech", feature: "Read Aloud (Text-to-Speech Engine)" },
                  { id: "readEntirePage", feature: "Read Entire Page Narrator" },
                  { id: "autoReadSelection", feature: "Auto Read Selection Mode" },
                  { id: "highlightWord", feature: "Highlight Spoken Word" },
                  { id: "highlightSentence", feature: "Highlight Spoken Sentence" },
                  { id: "autoScroll", feature: "Auto Scroll Page Narrator" },
                  { id: "aiAssistant", feature: "Anna AI Virtual Accessibility Assistant" },

                  // Category 2: Typography & Font Controls
                  { isCategory: true, category: "Typography & Readable Fonts" },
                  { id: "fontSize", feature: "Content Scaling (Font Size Controls)" },
                  { id: "textMagnifier", feature: "Text Magnifier Bubble" },
                  { id: "readableFont", feature: "Readable Font (Verdana & Custom)" },
                  { id: "dyslexiaFont", feature: "OpenDyslexic Font & Reader Mode" },
                  { id: "textAlignment", feature: "Text Alignment Controls (Left / Center)" },
                  { id: "letterSpacing", feature: "Letter Spacing (Kerning Adjuster)" },
                  { id: "wordSpacing", feature: "Word Spacing Adjuster" },
                  { id: "lineHeight", feature: "Line Height Multiplier" },

                  // Category 3: Visual & Color Adjustments
                  { isCategory: true, category: "Visual & Color Adjustments" },
                  { id: "darkMode", feature: "Dark Contrast & Night Mode" },
                  { id: "monochrome", feature: "Monochrome Contrast Mode" },
                  { id: "highSaturation", feature: "High Saturation Mode" },
                  { id: "lowSaturation", feature: "Low Saturation Mode" },

                  // Category 4: Focus & Reading Tools
                  { isCategory: true, category: "Focus & Reading Assistive Tools" },
                  { id: "readingMask", feature: "Reading Mask Spotlight" },
                  { id: "readingRuler", feature: "Reading Guide Ruler" },
                  { id: "highlightLinks", feature: "Highlight Links & Anchors" },
                  { id: "highlightHeadings", feature: "Highlight Headings (H1-H6)" },
                  { id: "highlightButtons", feature: "Highlight Action Buttons" },
                  { id: "reduceMotion", feature: "Reduce Motion & Animation Pauser" },
                  { id: "cursorSize", feature: "Big Pointer / Cursor Mode" },

                  // Category 5: Compliance & Audit Tools
                  { isCategory: true, category: "Compliance & Audit Services" },
                  { feature: "ADA, WCAG 2.2 AA, Sec 508 & EAA Conformance", values: [true, true, true, true] },
                  { feature: "Automated Site Crawling & Scan Engine", values: ["1k pages", "30k pages", "100k pages", "Unlimited"] },
                  { feature: "Automated Proof of Effort Statements", values: [true, true, true, true] },
                  { feature: "Scheduled Compliance Scanning Reports", values: [false, true, true, true] },
                  { feature: "White-Label (Remove 2all.ai Branding)", values: [false, true, true, true] },
                  { feature: "Dedicated Account Manager & Advisor", values: [false, false, true, true] },
                ];

                return rows.map((row, ri) => {
                  if (row.isCategory) {
                    return (
                      <tr key={`cat-${ri}`} className="bg-[#02183a] text-white">
                        <td
                          colSpan={5}
                          className="px-6 py-3.5 font-black text-xs sm:text-sm uppercase tracking-widest text-blue-300 bg-[#02183a] border-t border-slate-800"
                        >
                          {row.category}
                        </td>
                      </tr>
                    );
                  }

                  const isDynamicTool = "id" in row && typeof row.id === "string";

                  return (
                    <tr key={ri} className={`border-t border-slate-100 ${ri % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                      <td className="px-6 py-4 font-bold text-slate-900 sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        {row.feature}
                      </td>
                      {[0, 1, 2, 3].map((colIndex) => {
                        let isChecked = false;
                        let customVal: any = null;

                        if (isDynamicTool) {
                          isChecked = isToolIncludedInPlan((row as any).id, colIndex);
                        } else if ("values" in row && Array.isArray((row as any).values)) {
                          const val = (row as any).values[colIndex];
                          if (typeof val === "boolean") {
                            isChecked = val;
                          } else {
                            customVal = val;
                          }
                        }

                        return (
                          <td
                            key={colIndex}
                            className={`px-6 py-4 text-center ${colIndex === 1 ? "bg-blue-50/60" : ""}`}
                          >
                            {customVal !== null ? (
                              <span className="text-slate-700 font-extrabold text-xs sm:text-sm">{customVal}</span>
                            ) : isChecked ? (
                              <Check className="w-4 h-4 text-blue-600 mx-auto stroke-[2.5]" />
                            ) : (
                              <span className="text-slate-300 font-black">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADDITIONAL CTAS SECTION */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 flex gap-4 items-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100/50 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Litigation support you can depend on</h4>
              <p className="text-xs text-slate-400 font-bold mt-1">Get peace of mind with expert legal guidance and documentation.</p>
              <Link href="/register" className="text-blue-600 hover:text-blue-700 text-xs font-black uppercase tracking-wider mt-2 inline-flex items-center gap-1">
                Learn more
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 flex gap-4 items-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100/50 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">AI and custom remediation for ADA compliance</h4>
              <p className="text-xs text-slate-400 font-bold mt-1">Get tailored web accessibility solution for your website.</p>
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="text-blue-600 hover:text-blue-700 text-xs font-black uppercase tracking-wider mt-2 inline-flex items-center gap-1 border-none bg-transparent cursor-pointer"
              >
                Contact Sales
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* G2 BADGES SECTION */}
      <section className="bg-[#0a0f1e] text-white py-24 overflow-hidden relative">
        {/* Subtle blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-4"
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-400">Industry Recognition</p>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">
              The <span className="text-blue-400">#1 rated</span> web accessibility solution
            </h3>
            <p className="text-slate-400 text-base max-w-xl mx-auto">Recognized by leading software review platforms for usability, ROI, and impact for businesses of all sizes.</p>
          </motion.div>

          {/* G2 Badges Row */}
          <div className="flex flex-wrap justify-center gap-5 md:gap-7">
            {[
              { season: "SUMMER 2026", label: "Most\nImplementable", sub: "" },
              { season: "SUMMER 2026", label: "Best\nUsability", sub: "" },
              { season: "SUMMER 2026", label: "Best\nEst. ROI", sub: "ENTERPRISE" },
              { season: "SUMMER 2026", label: "Leader", sub: "" },
              { season: "SUMMER 2026", label: "Best Meets\nRequirements", sub: "SMALL BUSINESS" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.08, y: -6 }}
                className="flex flex-col items-center group cursor-default"
              >
                {/* Badge Shell */}
                <div className="relative w-[144px] h-[176px] flex flex-col items-center">
                  {/* Pentagon SVG Badge */}
                  <svg viewBox="0 0 144 176" className="absolute inset-0 w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="72,4 140,42 140,134 72,172 4,134 4,42" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
                    <polygon points="72,10 134,46 134,130 72,166 10,130 10,46" fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.4" />
                  </svg>

                  {/* Badge content */}
                  <div className="relative z-10 flex flex-col items-center justify-between h-full pt-6 pb-6 px-3 text-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-400">{badge.season}</span>
                    <div className="w-7 h-7 bg-[#FF492C] rounded-md flex items-center justify-center shadow-md my-0.5">
                      <span className="text-white font-black text-[13px] leading-none">G2</span>
                    </div>
                    <p className="text-white font-bold text-[11px] leading-tight whitespace-pre-line">{badge.label}</p>
                    {badge.sub ? (
                      <p className="text-amber-400 font-extrabold text-[8px] uppercase tracking-wider">{badge.sub}</p>
                    ) : (
                      <div className="h-2" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Trust Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 pt-4 border-t border-white/10"
          >
            {["Capterra Best Value", "GetApp Category Leader", "SoftwareAdvice Highly Rated"].map((label) => (
              <div key={label} className="flex items-center gap-2 text-slate-400">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-left space-y-16">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center">Frequently asked questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-200 pb-4">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center py-3 text-left border-none bg-transparent cursor-pointer"
              >
                <span className="text-sm font-black text-slate-800 hover:text-blue-600 transition-colors">
                  {faq.q}
                </span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {activeFaq === idx && (
                <div className="mt-2 text-xs text-slate-500 font-bold leading-relaxed pr-8 animate-in slide-in-from-top-1 duration-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* DEMO MODAL */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

    </div>
  );
}
