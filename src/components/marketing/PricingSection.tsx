import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, HelpCircle, X, Check } from "lucide-react";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [selectedProduct, setSelectedProduct] = useState("2allWidget");
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isVisitsInfoOpen, setIsVisitsInfoOpen] = useState(false);

  const [dbPlans, setDbPlans] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.plans) {
          setDbPlans(data.plans);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const getPlanPrice = (planId: string, defaultMonthly: string, defaultYearly: string) => {
    const found = dbPlans.find((p) => p.id === planId);
    if (!found) return billingPeriod === "yearly" ? defaultYearly : defaultMonthly;
    return billingPeriod === "yearly" ? found.yearlyPrice : found.monthlyPrice;
  };

  const plans = [
    {
      name: "MICRO",
      desc: "Family-owned business and Entrepreneurs",
      monthlyPrice: getPlanPrice("micro", "$49", "$490"),
      yearlyPrice: getPlanPrice("micro", "$49", "$490"),
      period: billingPeriod === "yearly" ? "/year" : "/month",
      isRecommended: false,
      delay: 0.1
    },
    {
      name: "GROWTH",
      desc: "Businesses experiencing rapid expansion",
      monthlyPrice: getPlanPrice("growth", "$149", "$1,490"),
      yearlyPrice: getPlanPrice("growth", "$149", "$1,490"),
      period: billingPeriod === "yearly" ? "/year" : "/month",
      isRecommended: false,
      delay: 0.2
    },
    {
      name: "SCALE",
      desc: "Businesses expanding operations to support demand",
      monthlyPrice: getPlanPrice("scale", "$399", "$3,990"),
      yearlyPrice: getPlanPrice("scale", "$399", "$3,990"),
      period: billingPeriod === "yearly" ? "/year" : "/month",
      isRecommended: true,
      delay: 0.3
    },
    {
      name: "ENTERPRISE",
      desc: "Established companies driving progress and growth",
      monthlyPrice: getPlanPrice("enterprise", "Custom", "Custom"),
      yearlyPrice: getPlanPrice("enterprise", "Custom", "Custom"),
      period: "",
      isRecommended: false,
      delay: 0.4
    }
  ];

  return (
    <motion.section 
      id="pricing"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.08 }
        }
      }}
      className="py-10 md:py-24 bg-white relative overflow-visible z-10 select-none font-sans border-t border-slate-100"
    >
      
      {/* Background Technical Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto space-y-4 mb-8 md:mb-14">
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xs font-bold uppercase tracking-widest text-[#004bff] block">
            A Solution for Every Budget
          </motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Plans customized to fit your<br className="hidden md:block" />
            web accessibility needs
          </motion.h2>
        </div>

        {/* Product Selector & Billing Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
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

          {/* Monthly / Yearly Billing Toggle */}
          <div className="bg-slate-100/90 p-1.5 rounded-2xl flex items-center border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-none ${
                billingPeriod === "monthly"
                  ? "bg-white text-slate-900 shadow-md shadow-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              MONTHLY BILLING
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-none flex items-center gap-1.5 ${
                billingPeriod === "yearly"
                  ? "bg-[#004bff] text-white shadow-md shadow-blue-500/20"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              ANNUAL BILLING
              <span className="bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                2 MONTHS FREE
              </span>
            </button>
          </div>
        </div>

        {/* How monthly visits are calculated Popover Link */}
        <div className="mb-10 md:mb-14 flex justify-center">
          <button
            onClick={() => setIsVisitsInfoOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 border-none bg-transparent cursor-pointer transition-colors"
          >
            How monthly visits are calculated
            <HelpCircle className="w-4 h-4 text-blue-500" />
          </button>
        </div>

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

        {/* Pricing Cards Grid */}
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

                  <Link
                    href="/demo"
                    className="w-full py-3.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-500/20 tracking-wider uppercase flex items-center justify-center gap-2 transition-all no-underline"
                  >
                    BOOK A DEMO
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>

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

                  <Link
                    href="/demo"
                    className="w-full py-3.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-500/20 tracking-wider uppercase flex items-center justify-center gap-2 transition-all no-underline"
                  >
                    BOOK A DEMO
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>

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

                  <Link
                    href="/demo"
                    className="w-full py-3.5 bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-500/20 tracking-wider uppercase flex items-center justify-center gap-2 transition-all no-underline"
                  >
                    BOOK A DEMO
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => {
              const currentPrice = billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
              return (
              <motion.div
                key={plan.name}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, delay: plan.delay }}
                className={`card-premium relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer bg-white border ${
                  plan.isRecommended
                    ? "border-[#004bff] shadow-xl shadow-blue-500/5 ring-1 ring-[#004bff]/20"
                    : "border-slate-200/80 shadow-sm"
                }`}
              >
                {/* Recommended Top Banner */}
                {plan.isRecommended && (
                  <div className="absolute top-0 left-0 right-0 h-10 bg-[#02183a] rounded-t-[22px] flex items-center justify-center gap-1.5">
                    <span className="text-[10px] font-black text-white tracking-widest uppercase flex items-center gap-1">
                      ★ RECOMMENDED
                    </span>
                  </div>
                )}

                {/* Main Content */}
                <div className={`space-y-6 text-left flex-grow ${plan.isRecommended ? "pt-6" : ""}`}>
                  <div className="space-y-2">
                    {/* Large Plan Title at top */}
                    <h3 className="text-2xl sm:text-3xl font-black text-[#02183a] tracking-wider uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed min-h-[36px]">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="pt-2">
                    <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                      {currentPrice}
                    </span>
                    {plan.period && (
                      <span className="text-slate-400 text-sm font-bold ml-1.5 uppercase tracking-wider">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button - Redirects to /pricing */}
                <div className="pt-8 w-full">
                  {plan.name === "ENTERPRISE" ? (
                    <Link
                      href="/contact-us"
                      className="btn-premium w-full flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-[#004bff] text-[#02183a] hover:text-[#004bff] bg-transparent hover:bg-[#004bff]/5 rounded-2xl py-4 text-xs font-extrabold tracking-wider transition-all group select-none"
                    >
                      CONTACT US
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[3]" />
                    </Link>
                  ) : plan.isRecommended ? (
                    <Link
                      href="/pricing"
                      className="btn-premium w-full flex items-center justify-center gap-2 bg-[#004bff] hover:bg-[#003edd] text-white rounded-2xl py-4 text-xs font-extrabold tracking-wider transition-all shadow-md shadow-blue-500/20 group select-none"
                    >
                      SEE FULL PLANS
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[3]" />
                    </Link>
                  ) : (
                    <Link
                      href="/pricing"
                      className="btn-premium w-full flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-[#004bff] text-[#02183a] hover:text-[#004bff] bg-transparent hover:bg-[#004bff]/5 rounded-2xl py-4 text-xs font-extrabold tracking-wider transition-all group select-none"
                    >
                      SEE FULL PLANS
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[3]" />
                    </Link>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </motion.section>
  );
}
