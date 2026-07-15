"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import SpeechEngine from "@/components/accessibility/SpeechEngine";

export type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";
export type CursorSize = "normal" | "large" | "huge";
export type SaturationMode = "normal" | "high" | "low" | "monochrome";
export type TextAlignment = "default" | "left" | "right" | "center" | "justify";
export type ProfileType = "none" | "dyslexia" | "adhd" | "low-vision" | "blind" | "motor-impaired" | "cognitive" | "reading" | "night" | "seizure";

interface AccessibilityState {
  isPanelOpen: boolean;
  fontSize: number; // percentage, e.g., 100, 110
  letterSpacing: number; // px or em
  lineHeight: number; // multiplier
  wordSpacing: number; // em
  isHighContrast: boolean;
  isDarkMode: boolean;
  isLightMode: boolean;
  isSmartContrast: boolean;
  fontFamily: string; // 'default', 'dyslexic', 'lexend', 'readable'
  highlightLinks: boolean;
  highlightHeadings: boolean;
  highlightButtons: boolean;
  readingMask: boolean;
  readingRuler: boolean;
  reduceMotion: boolean;
  stopAnimations: boolean;
  muteSounds: boolean;
  cursorSize: CursorSize;
  colorBlindMode: ColorBlindMode;
  activeProfile: ProfileType;
  // Advanced features
  saturationMode: SaturationMode;
  highlightFocus: boolean;
  textToSpeech: boolean;
  textMagnifier: boolean;
  textAlignment: TextAlignment;
  // Speech & Reading
  speechStatus: "stopped" | "playing" | "paused";
  selectedText: string;
  voice: string;
  speed: number;
  pitch: "low" | "normal" | "high";
  volume: number;
  highlightWord: boolean;
  highlightSentence: boolean;
  autoScroll: boolean;
  autoReadSelection: boolean;
  readingMode: "selected" | "page" | "none";
  isVoiceSettingsOpen: boolean;
}

interface AccessibilityContextProps {
  state: AccessibilityState;
  setState: React.Dispatch<React.SetStateAction<AccessibilityState>>;
  togglePanel: () => void;
  resetSettings: () => void;
  applyProfile: (profile: ProfileType) => void;
  updateSetting: <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => void;
}

const defaultState: AccessibilityState = {
  isPanelOpen: false,
  fontSize: 100,
  letterSpacing: 0,
  lineHeight: 1.5,
  wordSpacing: 0,
  isHighContrast: false,
  isDarkMode: false,
  isLightMode: false,
  isSmartContrast: false,
  fontFamily: "default",
  highlightLinks: false,
  highlightHeadings: false,
  highlightButtons: false,
  readingMask: false,
  readingRuler: false,
  reduceMotion: false,
  stopAnimations: false,
  muteSounds: false,
  cursorSize: "normal",
  colorBlindMode: "none",
  activeProfile: "none",
  saturationMode: "normal",
  highlightFocus: false,
  textToSpeech: false,
  textMagnifier: false,
  textAlignment: "default",
  // Speech & Reading Defaults
  speechStatus: "stopped",
  selectedText: "",
  voice: "",
  speed: 1,
  pitch: "normal",
  volume: 100,
  highlightWord: true,
  highlightSentence: true,
  autoScroll: true,
  autoReadSelection: false,
  readingMode: "none",
  isVoiceSettingsOpen: false
};

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const applyDOMChanges = (s: AccessibilityState) => {
    const html = document.documentElement;
    const body = document.body;

    // Font size
    html.style.fontSize = `${s.fontSize}%`;
    
    // Spacing
    body.style.letterSpacing = s.letterSpacing ? `${s.letterSpacing}px` : "";
    body.style.lineHeight = s.lineHeight !== 1.5 ? `${s.lineHeight}` : "";
    body.style.wordSpacing = s.wordSpacing ? `${s.wordSpacing}em` : "";

    // Classes for boolean toggles - apply to both HTML and BODY
    const toggleClass = (className: string, condition: boolean) => {
      if (condition) {
        body.classList.add(className);
        html.classList.add(className);
      } else {
        body.classList.remove(className);
        html.classList.remove(className);
      }
    };

    toggleClass("a11y-high-contrast", s.isHighContrast);
    toggleClass("a11y-dark-mode", s.isDarkMode);
    toggleClass("a11y-light-mode", s.isLightMode);
    
    // Fonts
    body.classList.remove("a11y-font-dyslexic", "a11y-font-lexend", "a11y-font-readable");
    if (s.fontFamily !== "default") {
      body.classList.add(`a11y-font-${s.fontFamily}`);
    }

    // Highlights
    toggleClass("a11y-highlight-links", s.highlightLinks);
    toggleClass("a11y-highlight-headings", s.highlightHeadings);
    toggleClass("a11y-highlight-buttons", s.highlightButtons);
    toggleClass("a11y-highlight-focus", s.highlightFocus);
    
    // Motion
    toggleClass("a11y-reduce-motion", s.reduceMotion);
    toggleClass("a11y-stop-animations", s.stopAnimations);

    // Cursor
    body.classList.remove("a11y-cursor-large", "a11y-cursor-huge");
    html.classList.remove("a11y-cursor-large", "a11y-cursor-huge");
    if (s.cursorSize !== "normal") {
      body.classList.add(`a11y-cursor-${s.cursorSize}`);
      html.classList.add(`a11y-cursor-${s.cursorSize}`);
    }

    // Color Blind
    body.classList.remove("a11y-cb-protanopia", "a11y-cb-deuteranopia", "a11y-cb-tritanopia", "a11y-cb-achromatopsia");
    html.classList.remove("a11y-cb-protanopia", "a11y-cb-deuteranopia", "a11y-cb-tritanopia", "a11y-cb-achromatopsia");
    if (s.colorBlindMode !== "none") {
      html.classList.add(`a11y-cb-${s.colorBlindMode}`);
    }

    // Saturation
    body.classList.remove("a11y-sat-high", "a11y-sat-low", "a11y-sat-mono");
    html.classList.remove("a11y-sat-high", "a11y-sat-low", "a11y-sat-mono");
    if (s.saturationMode === "high") {
      html.classList.add("a11y-sat-high");
    } else if (s.saturationMode === "low") {
      html.classList.add("a11y-sat-low");
    } else if (s.saturationMode === "monochrome") {
      html.classList.add("a11y-sat-mono");
    }

    // Text Alignment
    body.classList.remove("a11y-align-left", "a11y-align-right", "a11y-align-center", "a11y-align-justify");
    if (s.textAlignment !== "default") {
      body.classList.add(`a11y-align-${s.textAlignment}`);
    }
  };

  const [state, setState] = useState<AccessibilityState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("2all_accessibility");
        if (saved) {
          return { ...defaultState, ...JSON.parse(saved), isPanelOpen: false };
        }
      } catch {
        console.error("Failed to load accessibility settings");
      }
    }
    return defaultState;
  });
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage when state changes (except isPanelOpen)
  useEffect(() => {
    if (mounted) {
      const stateToSave = { ...state };
      delete (stateToSave as any).isPanelOpen;
      localStorage.setItem("2all_accessibility", JSON.stringify(stateToSave));
      applyDOMChanges(state);
    }
  }, [state, mounted]);

  const togglePanel = () => setState(prev => ({ ...prev, isPanelOpen: !prev.isPanelOpen }));
  
  const resetSettings = () => setState(defaultState);

  const updateSetting = <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => {
    setState(prev => ({ ...prev, [key]: value, activeProfile: "none" }));
  };

  const applyProfile = (profile: ProfileType) => {
    let newSettings: Partial<AccessibilityState> = {};
    
    switch (profile) {
      case "dyslexia":
        newSettings = { fontFamily: "dyslexic", letterSpacing: 1, wordSpacing: 0.2, lineHeight: 1.8 };
        break;
      case "adhd":
        newSettings = { readingMask: true, reduceMotion: true, stopAnimations: true, highlightLinks: true };
        break;
      case "low-vision":
        newSettings = { fontSize: 150, isHighContrast: true, cursorSize: "huge", highlightHeadings: true };
        break;
      case "blind":
        // Screen Reader profile — optimises the page for screen reader users
        // Highlights interactive elements, enables TTS, uses a readable font,
        // and boosts letter/line spacing for braille display compatibility
        newSettings = {
          highlightLinks: true,
          highlightHeadings: true,
          highlightButtons: true,
          highlightFocus: true,
          textToSpeech: true,
          fontFamily: "readable",
          fontSize: 110,
          lineHeight: 1.8,
          letterSpacing: 0.5,
        };
        break;
      case "cognitive":
        // Cognitive Disability profile — simplifies the visual experience
        // Uses a readable font, increases spacing, slows/stops animations,
        // highlights navigation elements, and applies a reading ruler to guide focus
        newSettings = {
          fontFamily: "lexend",
          fontSize: 115,
          lineHeight: 1.9,
          letterSpacing: 0.5,
          wordSpacing: 0.1,
          reduceMotion: true,
          stopAnimations: true,
          highlightLinks: true,
          highlightButtons: true,
          readingRuler: true,
          textAlignment: "left",
        };
        break;
      case "reading":
        // Reading Mode profile — maximises reading comfort
        // Uses Lexend font (proven to improve reading speed), reading ruler for tracking,
        // increased line & word spacing, and auto-reads selections on click
        newSettings = {
          readingRuler: true,
          fontFamily: "lexend",
          letterSpacing: 0.5,
          wordSpacing: 0.15,
          lineHeight: 1.9,
          fontSize: 108,
          textAlignment: "left",
          highlightHeadings: true,
          autoReadSelection: true,
        };
        break;
      case "night":
        newSettings = { isDarkMode: true, isHighContrast: false, reduceMotion: true };
        break;
      case "seizure":
        newSettings = { reduceMotion: true, stopAnimations: true, saturationMode: "low" };
        break;
      case "motor-impaired":
        newSettings = { cursorSize: "large", highlightFocus: true, highlightButtons: true, highlightLinks: true };
        break;
    }
    
    setState(prev => ({ ...defaultState, ...newSettings, isPanelOpen: prev.isPanelOpen, activeProfile: profile }));
  };

  return (
    <AccessibilityContext.Provider value={{ state, setState, togglePanel, resetSettings, applyProfile, updateSetting }}>
      {children}
      {mounted && <SpeechEngine />}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
