"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ end, suffix = "", prefix = "", decimals = 0 }: { end: number, suffix?: string, prefix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const stats = [
    { label: "Supported Languages", value: 100, suffix: "+", prefix: "" },
    { label: "Daily Translations", value: 5, suffix: "M+", prefix: "" },
    { label: "Accuracy Rate", value: 99.9, suffix: "%", prefix: "", decimals: 1 },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="glass-card rounded-3xl p-10 text-center flex flex-col items-center justify-center relative overflow-hidden group"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h4 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 tracking-tighter">
                <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </h4>
              <p className="text-sm md:text-base font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
