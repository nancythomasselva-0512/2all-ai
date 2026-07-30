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
              className={`w-full text-left rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden select-none ${
                isActive 
                  ? 'bg-blue-50/90 border-2 border-blue-400 shadow-md p-4 px-4.5 space-y-2' 
                  : 'bg-white border border-slate-200/90 hover:border-slate-300 p-4 px-4.5 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-5.5 h-5.5 stroke-[1.8]" />
                  </div>
                  <div className="truncate">
                    <h4 className={`text-sm md:text-base font-extrabold leading-tight truncate ${isActive ? 'text-blue-950' : 'text-slate-900'}`}>
                      {profile.label}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold truncate mt-0.5">{profile.desc}</p>
                  </div>
                </div>
                
                {/* Larger toggle switch visual matching user request */}
                <div className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Active mode detailed box */}
              {isActive && profile.detail && (
                <div className="pt-2 text-xs text-slate-700 font-normal leading-relaxed border-t border-blue-200/80">
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
