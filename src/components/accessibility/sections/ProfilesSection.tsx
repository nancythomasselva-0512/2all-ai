"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, EyeOff, BrainCircuit, ScanFace, 
  Glasses, MonitorSpeaker, GraduationCap, Moon 
} from "lucide-react";
import { useAccessibility, ProfileType } from "@/context/AccessibilityContext";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const profiles = [
  { id: "dyslexia", label: "Dyslexia Friendly", icon: BookOpen, desc: "Enhances readability for dyslexia" },
  { id: "adhd", label: "ADHD Friendly", icon: BrainCircuit, desc: "Reduces distractions & improves focus" },
  { id: "low-vision", label: "Low Vision", icon: Glasses, desc: "Increases text size and contrast" },
  { id: "blind", label: "Screen Reader", icon: MonitorSpeaker, desc: "Optimized for screen readers" },
  { id: "cognitive", label: "Cognitive Disability", icon: ScanFace, desc: "Simplifies reading experience" },
  { id: "reading", label: "Reading Mode", icon: GraduationCap, desc: "Improves reading comprehension" },
  { id: "night", label: "Night Mode", icon: Moon, desc: "Reduces eye strain in low light" }
];

export default function ProfilesSection({ searchQuery }: { searchQuery: string }) {
  const { state, applyProfile } = useAccessibility();

  const filtered = profiles.filter(p => 
    p.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4">
      {searchQuery && filtered.length === 0 && (
        <div className="text-center py-10 text-slate-400 text-sm">No profiles found for "{searchQuery}"</div>
      )}
      
      {filtered.map((profile) => {
        const Icon = profile.icon;
        const isActive = state.activeProfile === profile.id;

        return (
          <motion.button
            key={profile.id}
            variants={fadeUp}
            onClick={() => applyProfile(isActive ? "none" : (profile.id as ProfileType))}
            className={`w-full text-left p-4 rounded-3xl border transition-all duration-300 flex items-center gap-5 ${
              isActive 
                ? 'bg-blue-50/50 border-blue-500 shadow-[0_4px_20px_rgba(37,99,235,0.1)]' 
                : 'bg-white border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
              isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100/80 text-[#0a1e3f]'
            }`}>
              <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div className="flex-1">
              <h4 className={`text-base font-bold ${isActive ? 'text-blue-700' : 'text-[#0a1e3f]'}`}>
                {profile.label}
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-1">{profile.desc}</p>
            </div>
            
            {/* Toggle switch visual */}
            <div className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${isActive ? 'bg-blue-600' : 'bg-[#e2e8f0]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
