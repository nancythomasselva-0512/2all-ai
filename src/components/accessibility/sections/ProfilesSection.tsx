"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, EyeOff, BrainCircuit, ScanFace, 
  Glasses, MonitorSpeaker, GraduationCap, Moon,
  ZapOff, Accessibility
} from "lucide-react";
import { useAccessibility, ProfileType } from "@/context/AccessibilityContext";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const profiles = [
  { 
    id: "seizure", 
    label: "Epilepsy Safe Mode", 
    icon: ZapOff, 
    desc: "Dampens color and removes blinks",
    detail: "This mode enables people with epilepsy to use the website safely by eliminating the risk of seizures that result from flashing or blinking animations and risky color combinations."
  },
  { 
    id: "low-vision", 
    label: "Visually Impaired Mode", 
    icon: Glasses, 
    desc: "Improves website's visuals",
    detail: "This mode adjusts the website for the convenience of users with visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others."
  },
  { 
    id: "cognitive", 
    label: "Cognitive Disability Mode", 
    icon: ScanFace, 
    desc: "Helps to focus on specific content",
    detail: "Assists users with cognitive disabilities such as Autism, Dyslexia, CVA, and others to focus on the essential elements of the website more easily."
  },
  { 
    id: "adhd", 
    label: "ADHD Friendly Mode", 
    icon: BrainCircuit, 
    desc: "Reduces distractions and improve focus",
    detail: "Significantly reduces distractions and noise, helping people with ADHD and Neurodevelopmental disorders to browse, read, and focus on the essential elements of the website."
  },
  { 
    id: "blind", 
    label: "Blindness Mode", 
    icon: MonitorSpeaker, 
    desc: "Allows to use the site with screen reader",
    detail: "Optimizes the site for compatibility with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack."
  },
  { 
    id: "dyslexia", 
    label: "Dyslexia Friendly", 
    icon: BookOpen, 
    desc: "Enhances readability for dyslexia",
    detail: "Applies specialized typography and letter/word spacing to increase reading speed and reduce reading errors for users with dyslexia."
  },
  { 
    id: "reading", 
    label: "Reading Mode", 
    icon: GraduationCap, 
    desc: "Improves reading comprehension",
    detail: "Highlights paragraph structure and simplifies reading alignment for clearer text focus."
  },
  { 
    id: "night", 
    label: "Night Mode", 
    icon: Moon, 
    desc: "Reduces eye strain in low light",
    detail: "Switches interface to dark themes to reduce blue light exposure and prevent eye fatigue."
  },
  { 
    id: "motor-impaired", 
    label: "Keyboard Nav / Motor Impaired", 
    icon: Accessibility, 
    desc: "Optimizes focus & keyboard controls",
    detail: "Enlarges interactive target areas and boosts keyboard focus indicators for easier navigation."
  }
];

export default function ProfilesSection({ searchQuery }: { searchQuery: string }) {
  const { state, applyProfile } = useAccessibility();

  const filtered = profiles.filter(p => 
    p.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-1.5">
      {searchQuery && filtered.length === 0 && (
        <div className="text-center py-6 text-slate-400 text-xs">No profiles found for "{searchQuery}"</div>
      )}
      
      {filtered.map((profile) => {
        const Icon = profile.icon;
        const isActive = state.activeProfile === profile.id;

        return (
          <motion.div key={profile.id} variants={fadeUp}>
            <div
              onClick={() => applyProfile(isActive ? "none" : (profile.id as ProfileType))}
              className={`w-full text-left rounded-xl transition-all duration-200 cursor-pointer overflow-hidden select-none ${
                isActive 
                  ? 'bg-blue-50/90 border border-blue-300 shadow-sm p-2.5 px-3 space-y-1.5' 
                  : 'bg-white border border-slate-200/80 hover:border-slate-300 p-2.5 px-3 shadow-xs hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div className="truncate">
                    <h4 className={`text-xs font-bold leading-tight truncate ${isActive ? 'text-blue-950' : 'text-slate-900'}`}>
                      {profile.label}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{profile.desc}</p>
                  </div>
                </div>
                
                {/* Compact toggle switch visual matching screenshot */}
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-xs ${isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Active mode detailed box */}
              {isActive && profile.detail && (
                <div className="pt-1.5 text-[11px] text-slate-700 font-normal leading-relaxed border-t border-blue-200/80">
                  {profile.detail}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
