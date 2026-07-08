"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingV2() {
  const plans = [
    {
      name: "Starter",
      desc: "Perfect for small blogs and personal websites.",
      price: "$49",
      features: ["Up to 1,000 pages", "Standard WCAG 2.2 AA", "Monthly compliance report", "Email support"],
      popular: false,
    },
    {
      name: "Business",
      desc: "For growing companies needing advanced features.",
      price: "$149",
      features: ["Up to 10,000 pages", "Advanced AI remediation", "Real-time compliance monitoring", "Priority 24/7 support", "Custom branding"],
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "Custom solutions for large scale organizations.",
      price: "Custom",
      features: ["Unlimited pages", "Dedicated success manager", "Custom AI training", "SLA guarantee", "On-premise deployment"],
      popular: false,
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-50/50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple, transparent <span className="text-blue-600">pricing</span>.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Start your 7-day free trial today. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              className={`relative rounded-3xl p-8 bg-white border ${plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-900/10 scale-105 z-10' : 'border-slate-200 shadow-xl shadow-slate-200/50'} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300 group`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </motion.div>
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium h-10">{plan.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-slate-500 font-medium">/mo</span>}
              </div>

              <Link
                href="/register"
                className={`block w-full py-3.5 px-6 rounded-full text-center font-bold text-sm transition-all relative overflow-hidden group/btn ${
                  plan.popular 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50' 
                    : 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="relative z-10">Get Started</span>
                {plan.popular && (
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-shimmer" />
                )}
              </Link>

              <hr className="my-8 border-slate-100" />
              
              <ul className="space-y-4">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
