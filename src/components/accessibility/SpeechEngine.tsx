"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Play, Pause, Square, X, Volume2, Settings2, Mic, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SpeechEngine() {
  const { state, updateSetting, setState } = useAccessibility();
  const pathname = usePathname();

  // Web Speech references
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Installed voices
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Selection states
  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);

  // Active page-reading tracking states
  const pageElementsRef = useRef<HTMLElement[]>([]);
  const currentElementIndexRef = useRef<number>(-1);
  const originalHtmlRef = useRef<{ element: HTMLElement; html: string } | null>(null);

  // Always-current ref so speech callbacks never use stale state (closure issue fix)
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Initialize Speech Synthesis and load voices
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        if (synthRef.current) {
          const list = synthRef.current.getVoices();
          setVoices(list);
        }
      };

      loadVoices();
      if (typeof window.speechSynthesis !== "undefined") {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      stopSpeech();
    };
  }, []);

  // Cancel speech on page/route change
  useEffect(() => {
    stopSpeech();
  }, [pathname]);

  // Cancel speech when widget closes
  useEffect(() => {
    if (!state.isPanelOpen && state.readingMode === "none") {
      // Just stop if closes while playing
      stopSpeech();
    }
  }, [state.isPanelOpen]);

  // Global Mouseup / Keyup to track selected text
  useEffect(() => {
    const handleSelection = () => {
      if (typeof window === "undefined") return;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        // Clear selection if collapsed
        setToolbarPos(null);
        return;
      }

      const text = sel.toString().trim();
      if (!text) {
        setToolbarPos(null);
        return;
      }

      // Track selection state
      updateSetting("selectedText", text);

      // Position toolbar near selection
      try {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect) {
          // Place floating toolbar slightly above the selection
          const top = rect.top + window.scrollY - 45;
          const left = rect.left + window.scrollX + rect.width / 2;
          setToolbarPos({ top, left });
        }
      } catch (e) {
        // Range selection error
      }

      // Auto read if enabled
      if (state.autoReadSelection && state.speechStatus === "stopped") {
        startSpeech(text, "selected");
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
    };
  }, [state.autoReadSelection, state.speechStatus]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + R
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        const selText = window.getSelection()?.toString().trim();
        if (selText) {
          startSpeech(selText, "selected");
        }
      }
      // Ctrl + Shift + P
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        pauseSpeech();
      }
      // Ctrl + Shift + O
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        resumeSpeech();
      }
      // Ctrl + Shift + S
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        stopSpeech();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.selectedText]);

  // Helper: Restore original innerHTML of any wrapped element
  const restoreOriginalElement = () => {
    if (originalHtmlRef.current) {
      const { element, html } = originalHtmlRef.current;
      element.innerHTML = html;
      originalHtmlRef.current = null;
    }
  };

  // Helper: Smoothly scroll to element
  const scrollToElement = (el: HTMLElement) => {
    if (stateRef.current.autoScroll) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Core Speech Starter
  const startSpeech = (textToRead: string, mode: "selected" | "page") => {
    if (!synthRef.current) return;

    // First stop any active speech
    stopSpeech();

    updateSetting("readingMode", mode);
    updateSetting("speechStatus", "playing");

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    // Apply voice settings
    if (stateRef.current.voice) {
      const selectedVoice = voices.find((v) => v.name === stateRef.current.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    // Set properties
    utterance.rate = stateRef.current.speed;
    utterance.volume = stateRef.current.volume / 100;
    
    // Pitch configuration mapping
    if (stateRef.current.pitch === "low") {
      utterance.pitch = 0.5;
    } else if (stateRef.current.pitch === "high") {
      utterance.pitch = 1.5;
    } else {
      utterance.pitch = 1.0;
    }

    // For "selected" mode: build a temporary overlay element to highlight words/sentences
    // We inject a floating highlight box near the browser selection
    let selectionOverlay: HTMLElement | null = null;
    let wordSpans: HTMLElement[] = [];

    if (mode === "selected" && (stateRef.current.highlightWord || stateRef.current.highlightSentence)) {
      try {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          // Build word-wrapped overlay
          selectionOverlay = document.createElement("div");
          selectionOverlay.id = "a11y-selection-overlay";
          selectionOverlay.style.cssText = `
            position: fixed;
            top: ${rect.top - 60}px;
            left: ${Math.max(8, rect.left)}px;
            max-width: ${Math.min(600, window.innerWidth - 16)}px;
            background: rgba(15,23,42,0.95);
            color: white;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            line-height: 1.6;
            z-index: 2147483646;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            pointer-events: none;
            border: 1px solid rgba(96,165,250,0.4);
          `;

          // Split into words preserving whitespace
          const words = textToRead.split(/(\s+)/);
          let charOffset = 0;
          words.forEach((w) => {
            if (w.trim()) {
              const span = document.createElement("span");
              span.textContent = w;
              span.setAttribute("data-offset", String(charOffset));
              span.style.cssText = "transition: background 0.1s ease; border-radius: 3px; padding: 0 2px;";
              selectionOverlay!.appendChild(span);
              wordSpans.push(span);
            } else {
              selectionOverlay!.appendChild(document.createTextNode(w));
            }
            charOffset += w.length;
          });

          document.body.appendChild(selectionOverlay);
        }
      } catch (e) {
        // Skip overlay if selection range fails
      }
    }

    // Boundary handler — highlights the current word/sentence during reading
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const charIdx = event.charIndex;

        if (mode === "selected" && wordSpans.length > 0) {
          // Reset all word styles
          wordSpans.forEach((ws) => {
            ws.style.background = "transparent";
            ws.style.color = "white";
          });

          // Find nearest word span to charIndex
          let bestSpan: HTMLElement | null = null;
          let minDiff = Infinity;
          wordSpans.forEach((ws) => {
            const off = parseInt(ws.getAttribute("data-offset") || "0");
            const diff = Math.abs(off - charIdx);
            if (diff < minDiff) {
              minDiff = diff;
              bestSpan = ws;
            }
          });

          if (bestSpan && stateRef.current.highlightWord) {
            (bestSpan as HTMLElement).style.background = "#2563eb";
            (bestSpan as HTMLElement).style.color = "white";
          }
        }
      }
    };

    utterance.onend = () => {
      // Remove selection overlay
      if (selectionOverlay) {
        selectionOverlay.remove();
        selectionOverlay = null;
      }
      if (mode === "page") {
        readNextPageElement();
      } else {
        stopSpeech();
      }
    };

    utterance.onerror = () => {
      if (selectionOverlay) {
        selectionOverlay.remove();
        selectionOverlay = null;
      }
      stopSpeech();
    };

    synthRef.current.speak(utterance);
  };

  // Page Mode crawler: retrieves all visible text nodes
  const triggerPageReading = () => {
    if (typeof document === "undefined") return;

    // Stop any current speech first
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    restoreOriginalElement();

    // Set status BEFORE crawling so Pause/Stop buttons enable immediately
    updateSetting("speechStatus", "playing");
    updateSetting("readingMode", "page");

    // Crawl DOM tree
    const container = document.body;
    const elements: HTMLElement[] = [];

    const crawl = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();

        // Excluded tags
        if (
          tagName === "script" ||
          tagName === "style" ||
          tagName === "noscript" ||
          tagName === "iframe" ||
          el.hasAttribute("aria-hidden") ||
          el.getAttribute("role") === "presentation" ||
          el.closest("#accessibility-widget") || // skip accessibility widget itself
          el.closest(".accessibility-floating-trigger")
        ) {
          return;
        }

        // Check computed visibility
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
          return;
        }

        // Add leaf text container elements
        if (
          (tagName === "p" ||
            tagName === "h1" ||
            tagName === "h2" ||
            tagName === "h3" ||
            tagName === "h4" ||
            tagName === "h5" ||
            tagName === "h6" ||
            tagName === "li" ||
            (tagName === "span" && el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE)) &&
          el.innerText.trim().length > 0
        ) {
          elements.push(el);
          return;
        }

        // Recurse children
        for (let i = 0; i < el.childNodes.length; i++) {
          crawl(el.childNodes[i]);
        }
      }
    };

    crawl(container);

    pageElementsRef.current = elements;
    currentElementIndexRef.current = -1;

    if (elements.length > 0) {
      readNextPageElement();
    } else {
      // Nothing to read
      updateSetting("speechStatus", "stopped");
      updateSetting("readingMode", "none");
    }
  };

  const readNextPageElement = () => {
    restoreOriginalElement();

    currentElementIndexRef.current++;
    if (currentElementIndexRef.current >= pageElementsRef.current.length) {
      stopSpeech();
      return;
    }

    const nextEl = pageElementsRef.current[currentElementIndexRef.current];
    scrollToElement(nextEl);

    // Save original state for restoring
    originalHtmlRef.current = {
      element: nextEl,
      html: nextEl.innerHTML,
    };

    // Split text into words and sentences
    const text = nextEl.innerText;
    const sentences = text.match(/[^.!?]+[.!?]*(\s*|$)/g) || [text];
    let newHTML = "";
    let charOffset = 0;

    sentences.forEach((sentenceText, sIdx) => {
      const words = sentenceText.split(/(\s+)/);
      let sentenceHTML = "";
      words.forEach((word) => {
        if (word.trim()) {
          sentenceHTML += `<span class="a11y-speak-word duration-100" data-offset="${charOffset}">${word}</span>`;
        } else {
          sentenceHTML += word;
        }
        charOffset += word.length;
      });
      newHTML += `<span class="a11y-speak-sentence duration-200" data-sentence-index="${sIdx}">${sentenceHTML}</span>`;
    });

    nextEl.innerHTML = newHTML;

    // Start speaking the text of this element
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Apply voice settings
    if (stateRef.current.voice) {
      const selectedVoice = voices.find((v) => v.name === stateRef.current.voice);
      if (selectedVoice) utterance.voice = selectedVoice;
    }
    utterance.rate = stateRef.current.speed;
    utterance.volume = stateRef.current.volume / 100;
    if (stateRef.current.pitch === "low") {
      utterance.pitch = 0.5;
    } else if (stateRef.current.pitch === "high") {
      utterance.pitch = 1.5;
    } else {
      utterance.pitch = 1.0;
    }

    // Border highlight for the active paragraph/heading
    nextEl.classList.add("ring-2", "ring-blue-600/30", "rounded-lg", "transition-all");

    // Boundary word / sentence highlight implementation
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const charIdx = event.charIndex;

        // Reset highlights
        nextEl.querySelectorAll(".a11y-speak-word").forEach((w) => {
          w.classList.remove("bg-blue-600", "text-white", "px-0.5", "rounded");
        });
        nextEl.querySelectorAll(".a11y-speak-sentence").forEach((s) => {
          s.classList.remove("bg-blue-100/50", "rounded");
        });

        // Find spoken word
        let activeWordSpan: HTMLElement | null = null;
        let minDiff = Infinity;
        const wordSpans = nextEl.querySelectorAll(".a11y-speak-word");

        wordSpans.forEach((w) => {
          const wOffset = parseInt(w.getAttribute("data-offset") || "0");
          const diff = Math.abs(wOffset - charIdx);
          if (diff < minDiff) {
            minDiff = diff;
            activeWordSpan = w as HTMLElement;
          }
        });

        if (activeWordSpan) {
          if (stateRef.current.highlightWord) {
            (activeWordSpan as HTMLElement).classList.add("bg-blue-600", "text-white", "px-0.5", "rounded");
          }

          // Highlight corresponding sentence containing this word
          const parentSentence = (activeWordSpan as HTMLElement).closest(".a11y-speak-sentence") as HTMLElement;
          if (parentSentence) {
            if (stateRef.current.highlightSentence) {
              parentSentence.classList.add("bg-blue-100/50", "rounded");
            }
            if (stateRef.current.autoScroll) {
              parentSentence.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }
        }
      }
    };

    utterance.onend = () => {
      // Clear ring border
      nextEl.classList.remove("ring-2", "ring-blue-600/30", "rounded-lg");
      readNextPageElement();
    };

    utterance.onerror = () => {
      nextEl.classList.remove("ring-2", "ring-blue-600/30", "rounded-lg");
      stopSpeech();
    };

    synthRef.current.speak(utterance);
  };

  const pauseSpeech = () => {
    if (synthRef.current && stateRef.current.speechStatus === "playing") {
      synthRef.current.pause();
      updateSetting("speechStatus", "paused");
    }
  };

  const resumeSpeech = () => {
    if (synthRef.current && stateRef.current.speechStatus === "paused") {
      synthRef.current.resume();
      updateSetting("speechStatus", "playing");
    }
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    restoreOriginalElement();
    updateSetting("speechStatus", "stopped");
    updateSetting("readingMode", "none");
  };

  // Exposed trigger helpers inside window object to bind panel triggers
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__a11yStartSelectedReading = () => {
        const text = state.selectedText || window.getSelection()?.toString().trim();
        if (text) startSpeech(text, "selected");
      };
      (window as any).__a11yStartPageReading = () => {
        triggerPageReading();
      };
      (window as any).__a11yPauseReading = () => {
        pauseSpeech();
      };
      (window as any).__a11yResumeReading = () => {
        resumeSpeech();
      };
      (window as any).__a11yStopReading = () => {
        stopSpeech();
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).__a11yStartSelectedReading;
        delete (window as any).__a11yStartPageReading;
        delete (window as any).__a11yPauseReading;
        delete (window as any).__a11yResumeReading;
        delete (window as any).__a11yStopReading;
      }
    };
  }, [state.selectedText, state.voice, state.speed, state.pitch, state.volume, state.speechStatus, voices, state.highlightWord, state.highlightSentence, state.autoScroll]);

  // ========================================================
  // Voice Command Navigation Effect (SpeechRecognition API)
  // ========================================================
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (state.voiceNavigation) {
        updateSetting("lastVoiceCommand", "Browser doesn't support Voice Navigation API");
      }
      return;
    }

    let recognition: any = null;
    let isStoppedManually = false;

    if (state.voiceNavigation) {
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          updateSetting("isVoiceListening", true);
        };

        recognition.onresult = (event: any) => {
          const lastIndex = event.results.length - 1;
          const rawTranscript = event.results[lastIndex][0].transcript.trim();
          
          // Remove all punctuation (periods, commas, question marks) added by browser SpeechRecognition
          const transcript = rawTranscript
            .replace(/[.,?!;:'"()]/g, "")
            .toLowerCase()
            .trim();

          console.log("[Voice Command Spoken Raw]:", rawTranscript, "[Cleaned]:", transcript);

          // 1. Clean conversational command prefixes/suffixes
          let cleanQuery = transcript
            .replace(/^(go to|navigate to|open|show|take me to|scroll to|find|search|where is|jump to|i want to go to)\s+/i, "")
            .replace(/\s+(po|page|section|option|button|link|text)$/i, "")
            .trim();

          // Alias mapping for speech variants
          const aliases: Record<string, string> = {
            "vpat": "vpat",
            "v pat": "vpat",
            "veepatt": "vpat",
            "weepatt": "vpat",
            "bpat": "vpat",
            "pricing": "pricing",
            "price": "pricing",
            "plans": "pricing",
            "plan": "pricing",
            "cost": "pricing",
            "solution": "solutions",
            "solutions": "solutions",
            "service": "solutions",
            "services": "solutions",
            "footer": "footer",
            "bottom": "footer",
            "contact": "contact",
            "about": "about",
            "security": "security",
            "trust": "trust",
            "audit": "audit",
            "compliance": "compliance",
            "features": "features",
            "showcase": "features"
          };

          if (aliases[cleanQuery]) {
            cleanQuery = aliases[cleanQuery];
          }

          // 2. Special system commands check
          if (transcript.includes("open accessibility") || transcript.includes("open menu") || transcript.includes("open panel")) {
            if (!stateRef.current.isPanelOpen) setState(prev => ({ ...prev, isPanelOpen: true }));
            updateSetting("lastVoiceCommand", `Opened Accessibility Panel ("${rawTranscript}")`);
            return;
          }
          if (transcript.includes("close accessibility") || transcript.includes("close menu") || transcript.includes("close panel")) {
            if (stateRef.current.isPanelOpen) setState(prev => ({ ...prev, isPanelOpen: false }));
            updateSetting("lastVoiceCommand", `Closed Accessibility Panel ("${rawTranscript}")`);
            return;
          }
          if (transcript.includes("dark mode") || transcript.includes("dark contrast")) {
            updateSetting("isDarkMode", true);
            updateSetting("lastVoiceCommand", `Applied Dark Contrast ("${rawTranscript}")`);
            return;
          }
          if (transcript.includes("monochrome")) {
            updateSetting("saturationMode", "monochrome");
            updateSetting("lastVoiceCommand", `Applied Monochrome ("${rawTranscript}")`);
            return;
          }
          if (transcript.includes("reset settings") || transcript.includes("reset accessibility")) {
            updateSetting("lastVoiceCommand", `Reset Settings ("${rawTranscript}")`);
            return;
          }
          // Direct Page Route Map for Instant Voice Navigation
          const PAGE_ROUTES: Record<string, string> = {
            "about": "/about-us",
            "about us": "/about-us",
            "about page": "/about-us",
            "pricing": "/pricing",
            "prices": "/pricing",
            "plan": "/pricing",
            "plans": "/pricing",
            "cost": "/pricing",
            "vpat": "/vpat",
            "v pat": "/vpat",
            "veepatt": "/vpat",
            "weepatt": "/vpat",
            "bpat": "/vpat",
            "contact": "/contact-us",
            "contact us": "/contact-us",
            "contact page": "/contact-us",
            "services": "/services",
            "service": "/services",
            "solutions": "/services",
            "careers": "/careers",
            "career": "/careers",
            "jobs": "/careers",
            "enterprise": "/enterprise",
            "mid large business": "/mid-large-business",
            "small business": "/small-business",
            "agency": "/agency",
            "non profit": "/non-profit",
            "security": "/security-and-privacy",
            "privacy": "/security-and-privacy",
            "security and privacy": "/security-and-privacy",
            "compliance": "/compliance",
            "blog": "/blog",
            "case studies": "/case-studies",
            "case study": "/case-studies",
            "demo": "/demo",
            "access scan": "/access-scan",
            "audit": "/expert-audit",
            "expert audit": "/expert-audit",
            "glossary": "/glossary",
            "help": "/help-center",
            "help center": "/help-center",
            "user testing": "/user-testing",
            "webinar": "/webinar",
            "why choose us": "/why-choose-2all-ai",
            "why choose 2all ai": "/why-choose-2all-ai",
            "dyslexia": "/dyslexia-simulation",
            "dashboard": "/dashboard",
            "admin": "/admin/dashboard",
            "super admin": "/super-admin/dashboard",
          };

          if (PAGE_ROUTES[cleanQuery]) {
            const targetRoute = PAGE_ROUTES[cleanQuery];
            updateSetting("lastVoiceCommand", `Voice Command Heard: "${rawTranscript}" ➔ Opening ${targetRoute}...`);
            setTimeout(() => {
              window.location.href = targetRoute;
            }, 600);
            return;
          }

          if (cleanQuery === "home" || cleanQuery === "top" || cleanQuery === "start") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            updateSetting("lastVoiceCommand", `Navigated to Home ("${rawTranscript}")`);
            return;
          }

          if (!cleanQuery) return;

          // 3. UNIVERSAL TOKENIZED DOM ELEMENT SEARCH ALGORITHM
          let targetElement: HTMLElement | null = null;
          let matchReason = "";

          // Extract candidate tokens (full query + non-stop words)
          const stopWords = new Set(["the", "a", "an", "and", "or", "to", "for", "in", "on", "of", "with", "is", "it", "at", "by"]);
          const words = cleanQuery.split(/\s+/).filter((w: string) => w.length > 2 && !stopWords.has(w));
          const searchCandidates = Array.from(new Set([cleanQuery, ...words]));

          for (const q of searchCandidates) {
            if (targetElement) break;

            // Priority A: Search elements with ID matching candidate
            const elById = document.getElementById(q) || 
                           document.querySelector(`[id*="${q}"]`) as HTMLElement;
            if (elById) {
              targetElement = elById;
              matchReason = `Section #${q}`;
              break;
            }

            // Priority B: Explicit VPAT match
            if (q === "vpat") {
              const vpatEl = Array.from(document.querySelectorAll<HTMLElement>("a, button, h1, h2, h3, h4, span, div")).find(el => {
                const txt = (el.innerText || "").toLowerCase();
                const href = (el.getAttribute("href") || "").toLowerCase();
                return txt.includes("vpat") || href.includes("vpat");
              });
              if (vpatEl) {
                targetElement = vpatEl;
                matchReason = "VPAT Link & Reference";
                break;
              }
            }

            // Priority C: Search headings (h1, h2, h3, h4, h5, h6, .font-heading)
            const headings = Array.from(document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6, .font-heading"));
            for (const h of headings) {
              const text = (h.innerText || "").toLowerCase();
              if (text.includes(q)) {
                targetElement = h;
                matchReason = `Heading: "${h.innerText.trim().substring(0, 25)}..."`;
                break;
              }
            }
            if (targetElement) break;

            // Priority D: Search clickable links and buttons (a, button, [role='button'])
            const clickables = Array.from(document.querySelectorAll<HTMLElement>("a, button, [role='button'], input[type='submit']"));
            for (const c of clickables) {
              const text = (c.innerText || c.getAttribute("aria-label") || c.getAttribute("title") || c.getAttribute("alt") || "").toLowerCase();
              const href = (c.getAttribute("href") || "").toLowerCase();
              if (text.includes(q) || href.includes(q)) {
                targetElement = c;
                matchReason = `Link/Button: "${(c.innerText || q).trim().substring(0, 25)}"`;
                break;
              }
            }
            if (targetElement) break;

            // Priority E: Search content text blocks (section, div, p, li, span)
            const textBlocks = Array.from(document.querySelectorAll<HTMLElement>("section, footer, header, nav, main, article, div[class*='card'], p, li, span"));
            for (const el of textBlocks) {
              if (el.closest("#accessibility-panel") || el.closest(".fixed")) continue;
              const text = (el.innerText || "").toLowerCase();
              if (text.includes(q) && el.children.length < 6) {
                targetElement = el;
                matchReason = `Text Element: "${q}"`;
                break;
              }
            }
            if (targetElement) break;

            // Priority F: Footer fallback search
            if (q.includes("footer") || q.includes("bottom")) {
              const footerEl = document.querySelector("footer") || document.getElementById("footer");
              if (footerEl) {
                targetElement = footerEl as HTMLElement;
                matchReason = "Footer Section";
                break;
              }
            }
          }

          // 4. SCROLL, HIGHLIGHT AND NAVIGATE ON SUCCESS MATCH
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

            // Flash glowing ring highlight on the target element
            targetElement.classList.add("ring-4", "ring-blue-500", "ring-offset-4", "rounded-xl", "transition-all", "duration-500");
            setTimeout(() => {
              targetElement?.classList.remove("ring-4", "ring-blue-500", "ring-offset-4", "rounded-xl");
            }, 3500);

            // Check if matched element is an anchor link or contains one
            const anchor = (targetElement.tagName.toLowerCase() === "a" 
              ? targetElement 
              : targetElement.closest("a") || targetElement.querySelector("a")) as HTMLAnchorElement | null;
            const href = anchor?.getAttribute("href");

            if (anchor && href && href.startsWith("/") && href !== "#" && !href.startsWith("#")) {
              updateSetting("lastVoiceCommand", `Opening page "${cleanQuery}" (${href})...`);
              setTimeout(() => {
                anchor.click();
              }, 1200);
            } else {
              updateSetting("lastVoiceCommand", `Jumped to "${cleanQuery}" (${matchReason})`);
            }

            // Auto-dismiss notification toast after 4 seconds
            setTimeout(() => {
              updateSetting("lastVoiceCommand", "");
            }, 4000);
          } else {
            // Silence background noise/unmatched speech error toasts for a clean experience
            console.log("[Voice Navigation Unmatched Ambient Speech]:", rawTranscript);
          }
        };

        recognition.onerror = (e: any) => {
          if (e.error !== "no-speech") {
            console.warn("Speech Recognition Error:", e.error);
          }
        };

        recognition.onend = () => {
          updateSetting("isVoiceListening", false);
          if (stateRef.current.voiceNavigation && !isStoppedManually) {
            try {
              recognition.start();
            } catch (err) {
              // Ignore restart collision
            }
          }
        };

        recognition.start();
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
      }
    }

    return () => {
      isStoppedManually = true;
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {}
      }
      updateSetting("isVoiceListening", false);
    };
  }, [state.voiceNavigation]);

  return (
    <>
      {/* 1. Selected Text Floating Toolbar */}
      <AnimatePresence>
        {toolbarPos && state.selectedText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="absolute z-[99999] flex items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 shadow-lg backdrop-blur-md -translate-x-1/2 select-none"
            style={{
              top: `${toolbarPos.top}px`,
              left: `${toolbarPos.left}px`,
            }}
          >
            {state.speechStatus !== "playing" && state.speechStatus !== "paused" ? (
              <button
                onClick={() => startSpeech(state.selectedText, "selected")}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer border-none shadow-sm"
                title="Read Selected Text"
              >
                <Play className="w-4 h-4 fill-white" />
              </button>
            ) : (
              <>
                {state.speechStatus === "playing" ? (
                  <button
                    onClick={pauseSpeech}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer border-none shadow-sm"
                    title="Pause Reading"
                  >
                    <Pause className="w-4 h-4 fill-white" />
                  </button>
                ) : (
                  <button
                    onClick={resumeSpeech}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer border-none shadow-sm"
                    title="Resume Reading"
                  >
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                )}
                <button
                  onClick={stopSpeech}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer border-none shadow-sm"
                  title="Stop Reading"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                </button>
              </>
            )}
            <div className="w-[1px] h-6 bg-slate-200 mx-1" />
            <button
              onClick={() => {
                setToolbarPos(null);
                window.getSelection()?.removeAllRanges();
              }}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer border-none bg-transparent"
              title="Close Toolbar"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Voice Settings Modal */}
      <AnimatePresence>
        {state.isVoiceSettingsOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => updateSetting("isVoiceSettingsOpen", false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 relative z-10 text-left select-none font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => updateSetting("isVoiceSettingsOpen", false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                  <Volume2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">Voice Settings</h3>
                  <p className="text-xs text-slate-400 font-bold tracking-wide mt-0.5">Customize Speech Engine Parameters</p>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-5">
                {/* Voice Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest px-1">Voice</label>
                  <select
                    value={state.voice}
                    onChange={(e) => updateSetting("voice", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold text-[#0a1e3f] outline-none focus:border-blue-500 transition-all cursor-pointer shadow-inner"
                  >
                    <option value="">Auto Detect Voice</option>
                    {voices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Speed Controls */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest px-1">Reading Speed</label>
                  <div className="grid grid-cols-6 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => updateSetting("speed", rate)}
                        className={`py-2 text-[10px] font-black rounded-lg border-none transition-all cursor-pointer ${
                          state.speed === rate
                            ? "bg-blue-600 text-white shadow-sm font-black"
                            : "bg-transparent text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pitch Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest px-1">Pitch</label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    {(["low", "normal", "high"] as const).map((pVal) => (
                      <button
                        key={pVal}
                        onClick={() => updateSetting("pitch", pVal)}
                        className={`py-2 text-xs font-black rounded-lg border-none transition-all cursor-pointer uppercase ${
                          state.pitch === pVal
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-transparent text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        {pVal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Volume</label>
                    <span className="text-xs font-bold text-blue-600">{state.volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.volume}
                    onChange={(e) => updateSetting("volume", parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => updateSetting("isVoiceSettingsOpen", false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer border-none uppercase tracking-wider shadow-md shadow-blue-500/20"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Floating Voice Command Navigation Overlay */}
      <AnimatePresence>
        {state.voiceNavigation && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[2147483647] flex flex-col items-center gap-2 pointer-events-none select-none font-sans"
          >
            {/* Listening Mic Badge */}
            <div className="bg-slate-900/95 text-white backdrop-blur-md px-4 py-2 rounded-full border border-blue-500/40 shadow-2xl flex items-center gap-3 text-xs font-bold pointer-events-auto">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </div>
              <span className="text-blue-300 font-extrabold uppercase tracking-wider text-[10px]">
                Voice Navigation Active
              </span>
              <span className="text-slate-300 font-medium">
                Say <strong className="text-white font-bold">"Go to pricing"</strong>, <strong className="text-white font-bold">"Solutions"</strong>, or <strong className="text-white font-bold">"Plans"</strong>
              </span>
              <button
                onClick={() => updateSetting("voiceNavigation", false)}
                className="ml-2 w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer border-none"
                title="Turn off Voice Navigation"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Last Command Recognition Toast */}
            {state.lastVoiceCommand && (
              <motion.div
                key={state.lastVoiceCommand}
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                className="bg-slate-900/95 text-white px-5 py-2 rounded-full text-xs font-black shadow-2xl border border-cyan-400/80 flex items-center gap-2 pointer-events-auto backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                <span className="text-cyan-300 font-extrabold">{state.lastVoiceCommand}</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
