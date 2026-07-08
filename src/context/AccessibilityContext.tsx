"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";
export type CursorSize = "normal" | "large" | "huge";
export type ProfileType = "none" | "dyslexia" | "adhd" | "low-vision" | "blind" | "motor-impaired" | "cognitive" | "reading" | "night";

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
  activeProfile: "none"
};

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>(defaultState);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("2all_accessibility");
      if (saved) {
        setState({ ...defaultState, ...JSON.parse(saved), isPanelOpen: false }); // keep closed on load
      }
    } catch (e) {
      console.error("Failed to load accessibility settings");
    }
    setMounted(true);
  }, []);

  // Save to localStorage when state changes (except isPanelOpen)
  useEffect(() => {
    if (mounted) {
      const { isPanelOpen, ...stateToSave } = state;
      localStorage.setItem("2all_accessibility", JSON.stringify(stateToSave));
      applyDOMChanges(state);
    }
  }, [state, mounted]);

  const applyDOMChanges = (s: AccessibilityState) => {
    const html = document.documentElement;
    const body = document.body;

    // Font size
    html.style.fontSize = `${s.fontSize}%`;
    
    // Spacing
    body.style.letterSpacing = s.letterSpacing ? `${s.letterSpacing}px` : "";
    body.style.lineHeight = s.lineHeight !== 1.5 ? `${s.lineHeight}` : "";
    body.style.wordSpacing = s.wordSpacing ? `${s.wordSpacing}em` : "";

    // Classes for boolean toggles
    const toggleClass = (className: string, condition: boolean) => {
      if (condition) body.classList.add(className);
      else body.classList.remove(className);
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
    
    // Motion
    toggleClass("a11y-reduce-motion", s.reduceMotion);
    toggleClass("a11y-stop-animations", s.stopAnimations);

    // Cursor
    body.classList.remove("a11y-cursor-large", "a11y-cursor-huge");
    if (s.cursorSize !== "normal") {
      body.classList.add(`a11y-cursor-${s.cursorSize}`);
    }

    // Color Blind
    body.classList.remove("a11y-cb-protanopia", "a11y-cb-deuteranopia", "a11y-cb-tritanopia", "a11y-cb-achromatopsia");
    if (s.colorBlindMode !== "none") {
      body.classList.add(`a11y-cb-${s.colorBlindMode}`);
    }
  };

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
        newSettings = { highlightLinks: true, highlightHeadings: true, muteSounds: false };
        break;
      case "reading":
        newSettings = { readingRuler: true, fontFamily: "lexend", letterSpacing: 0.5 };
        break;
      case "night":
        newSettings = { isDarkMode: true, isHighContrast: false, reduceMotion: true };
        break;
      // other profiles...
    }
    
    setState(prev => ({ ...defaultState, ...newSettings, isPanelOpen: prev.isPanelOpen, activeProfile: profile }));
  };

  return (
    <AccessibilityContext.Provider value={{ state, setState, togglePanel, resetSettings, applyProfile, updateSetting }}>
      {children}
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
