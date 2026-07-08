"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the aesthetic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full blur-[100px]"
            />
          </div>

          {/* Logo container */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 flex flex-col items-center"
          >
            {/* 2ALL.AI Text Logo with Shimmer */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 relative">
              2ALL<span className="text-blue-600">.AI</span>
              {/* Shimmer overlay */}
              <div className="absolute inset-0 text-gradient shimmer mix-blend-overlay">
                2ALL.AI
              </div>
            </h1>

            {/* Premium Loader */}
            <div className="relative w-16 h-16">
              {/* Outer glowing ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600 border-r-blue-400 opacity-80"
              />
              {/* Inner glowing ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-blue-500 border-l-blue-300 opacity-60"
              />
              {/* Center dot */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
