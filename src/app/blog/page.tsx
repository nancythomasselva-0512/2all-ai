"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const blogPosts = [
    {
      id: 1,
      title: "Understanding the European Accessibility Act (EAA) Requirements",
      excerpt: "A comprehensive guide to compliance requirements, enforcement dates, and the organizations impacted by the EAA legislation.",
      category: "Compliance",
      date: "June 28, 2026",
      author: "Legal Compliance Team",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "How to Build Accessible Forms with HTML and ARIA Guidelines",
      excerpt: "Step-by-step developer tutorial covering logical tab order, input descriptions, errors handling, and keyboard controls.",
      category: "Development",
      date: "May 15, 2026",
      author: "Dev Relations Team",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Why AI is the Future of Continuous Digital Compliance",
      excerpt: "How computer vision models and DOM-crawlers automate alternative text generation and support dynamic web layouts.",
      category: "Product",
      date: "April 10, 2026",
      author: "AI Research Team",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const categories = ["All", "Product", "Compliance", "Development"];

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-24 px-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs 
            theme="dark" 
            items={[ { label: "Home", href: "/" }, { label: "Blog" } ]} 
          />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            The Accessibility <span className="text-[#C8FF4D]">Blog</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Stay up to date with the latest web accessibility tutorials, compliance insights, design strategies, and company announcements.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED POST (ONLY DISPLAY WHEN CATEGORY IS "ALL") */}
      {selectedCategory === "All" && blogPosts.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-8 text-center md:text-left">Featured Post</h2>
            
            <div className="grid lg:grid-cols-12 gap-10 items-center bg-slate-50 border border-slate-200/80 rounded-[40px] overflow-hidden p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="lg:col-span-7 aspect-[16/10] w-full rounded-[28px] overflow-hidden shadow-inner bg-slate-900">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" 
                />
              </div>

              {/* Excerpt */}
              <div className="lg:col-span-5 text-left space-y-5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-600 px-3 py-1 rounded-full border border-blue-200">
                  {blogPosts[0].category}
                </span>

                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {blogPosts[0].title}
                </h3>

                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>

                <div className="flex flex-wrap gap-4 text-slate-400 text-[10px] font-bold">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blogPosts[0].date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {blogPosts[0].author}</span>
                </div>

                <div className="pt-2">
                  <a href={`/blog`} className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. BLOG GRID */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">
          {selectedCategory !== "All" && (
            <h2 className="text-xs font-black tracking-widest text-slate-400 uppercase text-center md:text-left">
              Category: {selectedCategory}
            </h2>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200/80 rounded-[32px] overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] w-full bg-slate-900 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider bg-white/95 text-blue-600 px-2.5 py-1 rounded-full shadow-sm border border-slate-200">
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5 text-left">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <h4 className="text-sm font-black text-slate-800 tracking-tight leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600 hover:text-[#0b3c96] uppercase tracking-wider cursor-pointer">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
