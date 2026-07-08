"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CTO, TechFlow",
    content: "2ALL.AI completely transformed our compliance workflow. What used to take our engineering team months of manual auditing now happens automatically in real-time.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Michael Chang",
    role: "Director of Product, Nexus",
    content: "The seamless integration and the sheer accuracy of the AI are unmatched. It feels like magic seeing our entire web application become instantly accessible.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=michael",
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Designer, StudioV",
    content: "Finally, an accessibility solution that doesn't ruin the aesthetic of our hard work. The widget is beautiful and the automated fixes are flawless.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=elena",
  }
];

export default function TestimonialCarousel() {
  return (
    <section className="py-24 bg-[#FAFCFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Trusted by <span className="text-blue-600">innovators</span>.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Join thousands of forward-thinking companies building a more inclusive web.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              className="glass-card p-8 rounded-3xl relative mt-8 group"
            >
              {/* Floating Profile Image */}
              <div className="absolute -top-10 left-8 w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                <Image src={t.image} alt={t.name} fill className="object-cover" unoptimized />
              </div>

              <div className="pt-10">
                {/* Animated Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.5 + j * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed mb-6 font-medium">"{t.content}"</p>
                
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm font-semibold text-blue-600">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
