"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function HeroV2() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden w-full min-h-screen flex items-center bg-[#FAFCFF]">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vh] bg-gradient-to-br from-blue-200/40 via-blue-100/20 to-transparent rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute top-[20%] -right-[10%] w-[50vw] h-[70vh] bg-gradient-to-bl from-blue-300/30 via-cyan-100/20 to-transparent rounded-full blur-[120px]"
        />
      </div>

      {/* Abstract Neural Network / Floating Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#94A3B8" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content Container (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 max-w-2xl text-center lg:text-left relative z-20"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 mx-auto lg:mx-0 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Next-Generation AI</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Web accessibility <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">tailored for you.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              We combine advanced AI technology with human expertise to help businesses achieve compliance, improve usability, and create inclusive digital experiences seamlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:shadow-blue-600/50 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-shimmer" />
              </Link>
              
              <Link
                href="/demo"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 shadow-sm transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Play className="w-4 h-4 text-slate-600 group-hover:text-blue-600 fill-current" />
                </div>
                See How It Works
              </Link>
            </div>
          </motion.div>

          {/* Right Floating AI Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto hidden md:block"
          >
            {/* The Floating Illustration Container */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative w-full aspect-square"
            >
              <div className="absolute inset-0 glass-card rounded-[2rem] flex items-center justify-center border border-white p-8 relative overflow-hidden group">
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent pointer-events-none" />
                
                {/* Mock UI elements inside the glass container */}
                <div className="w-full h-full border border-blue-100/50 rounded-2xl bg-white/50 backdrop-blur-sm p-6 shadow-inner flex flex-col gap-4">
                  {/* Mock Header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-slate-200 rounded-md mb-1 animate-pulse" />
                      <div className="h-3 w-16 bg-slate-100 rounded-md" />
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="space-y-3 flex-1">
                    <div className="h-3 w-full bg-slate-100 rounded-md" />
                    <div className="h-3 w-5/6 bg-slate-100 rounded-md" />
                    <div className="h-3 w-4/6 bg-slate-100 rounded-md" />
                  </div>

                  {/* Mock Analytics Chart area */}
                  <div className="h-32 w-full rounded-xl bg-gradient-to-t from-blue-50 to-transparent border border-blue-100/50 relative overflow-hidden">
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                  </div>
                </div>

                {/* Floating Elements around the main glass card */}
                <motion.div 
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass-card p-4 rounded-xl shadow-lg border border-white flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">99%</span>
                  </div>
                  <div className="h-2 w-16 bg-slate-200 rounded-full" />
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-8 glass-card p-4 rounded-xl shadow-lg border border-white"
                >
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator animation at the bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-blue-600"
          />
        </div>
      </motion.div>
    </section>
  );
}
