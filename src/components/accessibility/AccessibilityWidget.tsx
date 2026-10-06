"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon as X } from "@heroicons/react/24/solid";
import { useAccessibility } from "@/context/AccessibilityContext";
import AccessibilityPanel from "./AccessibilityPanel";

export default function AccessibilityWidget() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/super-admin");
  const { state, togglePanel } = useAccessibility();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [magnifierText, setMagnifierText] = useState("");

  // Accessible Tooltip Engine State & Refs
  const [tooltipData, setTooltipData] = useState<{
    text: string;
    type?: string;
    top: number;
    left: number;
    position: "top" | "bottom";
  } | null>(null);
  const currentTooltipTargetRef = useRef<HTMLElement | null>(null);
  const tooltipShowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOverTooltipRef = useRef(false);
  const [showTooltipBanner, setShowTooltipBanner] = useState(false);

  // Widget Dragging State
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem("2all_widget_side");
    } catch {}
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Track mouse for reading mask/ruler/magnifier
    const handleMouseMove = (e: MouseEvent) => {
      if (state.readingMask || state.readingRuler || state.textMagnifier) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [state.readingMask, state.readingRuler, state.textMagnifier]);

  // Hover Text Magnifier Effect
  useEffect(() => {
    if (!state.textMagnifier) {
      setMagnifierText("");
      return;
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('.fixed.bottom-24.right-6') || target.closest('.fixed.bottom-6.right-6')) return;
      
      const text = target.innerText || target.getAttribute('alt') || target.getAttribute('aria-label');
      if (text && text.trim() && text.length < 300) {
        setMagnifierText(text.trim());
      } else {
        setMagnifierText("");
      }
    };
    
    const handleMouseOut = () => {
      setMagnifierText("");
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [state.textMagnifier]);

  // Text-To-Speech (Read Aloud) Effect with Double-Tap to Enter/Open
  useEffect(() => {
    if (!state.textToSpeech) return;

    let lastTappedTarget: HTMLElement | null = null;
    let lastTapTimestamp = 0;
    const DOUBLE_TAP_DELAY = 600; // ms threshold for double tap / double click
    let activeHighlightEl: HTMLElement | null = null;

    const clearHighlight = () => {
      if (activeHighlightEl) {
        activeHighlightEl.style.outline = "";
        activeHighlightEl.style.outlineOffset = "";
        activeHighlightEl.style.boxShadow = "";
        activeHighlightEl.classList.remove("a11y-tts-active");
        activeHighlightEl = null;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.closest('.fixed.bottom-24.right-6') || 
        target.closest('.fixed.bottom-6.right-6') || 
        target.closest('#accessibility-panel') || 
        target.closest('#accessibility-floating-toggle')
      ) return;
      
      const text = target.innerText || target.getAttribute('alt') || target.getAttribute('aria-label');
      if (text && text.trim() && target !== activeHighlightEl) {
        target.style.outline = "2px dashed #004bff";
        target.style.outlineOffset = "2px";
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target !== activeHighlightEl) {
        target.style.outline = "";
        target.style.outlineOffset = "";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Do not intercept clicks inside accessibility control widgets
      if (
        target.closest('.fixed.bottom-24.right-6') || 
        target.closest('.fixed.bottom-6.right-6') || 
        target.closest('#accessibility-panel') || 
        target.closest('#accessibility-floating-toggle')
      ) {
        return;
      }

      // Resolve interactive target (button, link, input, tab, or element)
      const actionable = (
        target.closest("button, a, [role='button'], [role='tab'], input, select, textarea, label, summary, [tabindex]") || 
        target
      ) as HTMLElement;

      const now = Date.now();
      const isSameActionable = lastTappedTarget && (
        lastTappedTarget === actionable ||
        lastTappedTarget.contains(actionable) ||
        actionable.contains(lastTappedTarget)
      );
      const isDoubleTap = isSameActionable && (now - lastTapTimestamp <= DOUBLE_TAP_DELAY);

      if (isDoubleTap) {
        // DOUBLE TAP / DOUBLE CLICK DETECTED:
        // Activate, open, or enter the functionality instead of staying on the screen!
        lastTappedTarget = null;
        lastTapTimestamp = 0;
        clearHighlight();

        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }

        // Focus inputs directly if applicable
        const tag = actionable.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") {
          actionable.focus();
        }

        // Allow event to propagate and fire native click handlers
        return;
      }

      // FIRST TAP / SINGLE TAP DETECTED:
      // Prevent immediate navigation/submission so user can hear the element spoken aloud
      lastTappedTarget = actionable;
      lastTapTimestamp = now;

      e.preventDefault();
      e.stopPropagation();

      clearHighlight();
      activeHighlightEl = actionable;
      actionable.style.outline = "3px solid #0052ff";
      actionable.style.outlineOffset = "3px";
      actionable.style.boxShadow = "0 0 16px rgba(0, 82, 255, 0.4)";
      actionable.classList.add("a11y-tts-active");

      // Extract spoken description
      const ariaLabel = actionable.getAttribute('aria-label') || target.getAttribute('aria-label');
      const titleAttr = actionable.getAttribute('title') || target.getAttribute('title');
      const altAttr = actionable.getAttribute('alt') || target.getAttribute('alt');
      const textContent = (actionable.innerText || target.innerText || '').trim();
      const spokenText = ariaLabel || titleAttr || altAttr || textContent;

      if (spokenText && spokenText.trim() && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(spokenText.substring(0, 500));
        window.speechSynthesis.speak(utterance);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("click", handleClick, true);
    
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("click", handleClick, true);
      clearHighlight();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [state.textToSpeech]);

  // Focus Highlight (Click & Keyboard Focus Ring) Effect
  useEffect(() => {
    if (!state.highlightFocus) {
      document.querySelectorAll(".a11y-focused-target").forEach((el) => {
        el.classList.remove("a11y-focused-target");
      });
      return;
    }

    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest("#accessibility-widget") || target.closest("#accessibility-panel") || target.closest("[id='2all-ai-widget-host']") || target.closest(".alex-chat-popover")) return;

      document.querySelectorAll(".a11y-focused-target").forEach((el) => {
        if (el !== target) el.classList.remove("a11y-focused-target");
      });
      target.classList.add("a11y-focused-target");
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest("#accessibility-widget") || target.closest("#accessibility-panel") || target.closest("[id='2all-ai-widget-host']") || target.closest(".alex-chat-popover")) return;

      const focusable = target.closest("button, a, input, select, textarea, [tabindex], h1, h2, h3, h4, p, li, [role='button']") as HTMLElement || target;
      if (focusable) {
        document.querySelectorAll(".a11y-focused-target").forEach((el) => {
          if (el !== focusable) el.classList.remove("a11y-focused-target");
        });
        focusable.classList.add("a11y-focused-target");
      }
    };

    window.addEventListener("focusin", handleFocus, true);
    window.addEventListener("click", handleClick, true);

    // Immediately highlight the first key CTA button or hero element so user sees it right away!
    const timer = setTimeout(() => {
      const heroBtn = (
        document.querySelector(".btn-premium, button:not(#accessibility-widget *):not(#accessibility-panel *), h1, a.btn, a[href*='demo'], [role='button']") ||
        document.querySelector("h1, h2, main button, main a")
      ) as HTMLElement;
      if (heroBtn && !heroBtn.closest("#accessibility-widget") && !heroBtn.closest("#accessibility-panel") && !heroBtn.closest("[id='2all-ai-widget-host']")) {
        heroBtn.classList.add("a11y-focused-target");
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("focusin", handleFocus, true);
      window.removeEventListener("click", handleClick, true);
      document.querySelectorAll(".a11y-focused-target").forEach((el) => {
        el.classList.remove("a11y-focused-target");
      });
    };
  }, [state.highlightFocus]);

  // Accessible Tooltip Engine Effect (WCAG 2.1 SC 1.4.13 & AccName Algorithm)
  useEffect(() => {
    if (!state.accessibleTooltips) {
      setTooltipData(null);
      setShowTooltipBanner(false);
      // Restore any suppressed title attributes
      document.querySelectorAll("[data-original-title]").forEach((el) => {
        const orig = el.getAttribute("data-original-title");
        if (orig) {
          el.setAttribute("title", orig);
          el.removeAttribute("data-original-title");
        }
        el.removeAttribute("aria-describedby");
      });
      return;
    }

    setShowTooltipBanner(true);
    const bannerTimer = setTimeout(() => setShowTooltipBanner(false), 3500);

    const clearTimeouts = () => {
      if (tooltipShowTimeoutRef.current) clearTimeout(tooltipShowTimeoutRef.current);
      if (tooltipHideTimeoutRef.current) clearTimeout(tooltipHideTimeoutRef.current);
    };

    const getInteractiveTarget = (el: HTMLElement | null): HTMLElement | null => {
      if (
        !el || 
        el.closest("#accessibility-widget") || 
        el.closest("#accessibility-panel") || 
        el.closest("[id='2all-ai-widget-host']") || 
        el.closest(".alex-chat-popover") || 
        el.id === "a11y-engine-tooltip"
      ) {
        return null;
      }
      return (
        el.closest(
          "button, a, input, select, textarea, [tabindex], [role='button'], [data-tooltip], [aria-label], [title], [data-original-title], img, video, audio, figure, picture, svg, [role='img']"
        ) as HTMLElement || null
      );
    };

    // Find Accessible Name: aria-label -> title -> visible text / media metadata
    const findAccessibleName = (target: HTMLElement): { text: string; type: string } | null => {
      // 1. Explicit aria-label or aria-labelledby
      const ariaLabel = target.getAttribute("aria-label");
      if (ariaLabel && ariaLabel.trim()) {
        const isMedia = target.tagName === "VIDEO" ? "Video" : target.tagName === "IMG" ? "Image" : "Accessible Tooltip";
        return { text: ariaLabel.trim(), type: isMedia };
      }

      const ariaLabelledby = target.getAttribute("aria-labelledby");
      if (ariaLabelledby) {
        const text = ariaLabelledby
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent || "")
          .join(" ")
          .trim();
        if (text) return { text, type: "Accessible Label" };
      }

      // 2. title attribute (suppress native OS tooltip so they don't overlap)
      if (target.hasAttribute("title")) {
        const titleText = target.getAttribute("title") || "";
        if (titleText.trim()) {
          target.setAttribute("data-original-title", titleText);
          target.removeAttribute("title");
          const isMedia = target.tagName === "VIDEO" ? "Video" : target.tagName === "IMG" ? "Image" : "Tooltip";
          return { text: titleText.trim(), type: isMedia };
        }
      } else if (target.getAttribute("data-original-title")) {
        const isMedia = target.tagName === "VIDEO" ? "Video" : target.tagName === "IMG" ? "Image" : "Tooltip";
        return { text: target.getAttribute("data-original-title")!.trim(), type: isMedia };
      }

      // 3. Media: HTMLVideoElement (<video>)
      if (target instanceof HTMLVideoElement || target.tagName.toLowerCase() === "video") {
        const videoEl = target as HTMLVideoElement;
        
        // Track caption check
        const track = videoEl.querySelector("track[label], track[kind='captions']");
        if (track && track.getAttribute("label")) {
          return { text: track.getAttribute("label")!.trim(), type: "Video" };
        }

        // Parent figure caption
        const figure = videoEl.closest("figure");
        const figcaption = figure?.querySelector("figcaption");
        if (figcaption && figcaption.textContent?.trim()) {
          return { text: figcaption.textContent.trim(), type: "Video" };
        }

        // Check nearest heading in parent card
        const cardParent = videoEl.closest(".rounded-3xl, .rounded-\\[44px\\], [class*='rounded'], article, section");
        const nearbyHeading = cardParent?.querySelector("h1, h2, h3, h4, [class*='font-black']");
        if (nearbyHeading && nearbyHeading.textContent?.trim()) {
          const headingText = nearbyHeading.textContent.trim();
          if (headingText.length > 2 && headingText.length < 60) {
            return { text: `${headingText} Video Demonstration`, type: "Video" };
          }
        }

        // Clean name from video src
        const src = videoEl.currentSrc || videoEl.src || videoEl.querySelector("source")?.getAttribute("src") || "";
        if (src) {
          try {
            const raw = decodeURIComponent(src.split("/").pop()?.split("?")[0]?.replace(/\.[^/.]+$/, "") || "");
            if (raw) {
              const clean = raw.replace(/[-_]/g, " ").replace(/\s*\(\d+\)/g, "").trim();
              const formatted = clean.replace(/\b\w/g, (c) => c.toUpperCase());
              return { text: `${formatted} Demonstration Video`, type: "Video" };
            }
          } catch {}
        }
        return { text: "Interactive Media Video", type: "Video" };
      }

      // 4. Media: HTMLImageElement (<img>)
      if (target instanceof HTMLImageElement || target.tagName.toLowerCase() === "img") {
        const imgEl = target as HTMLImageElement;
        if (imgEl.alt && imgEl.alt.trim()) {
          return { text: imgEl.alt.trim(), type: "Image" };
        }

        const figure = imgEl.closest("figure");
        const figcaption = figure?.querySelector("figcaption");
        if (figcaption && figcaption.textContent?.trim()) {
          return { text: figcaption.textContent.trim(), type: "Image" };
        }

        const src = imgEl.currentSrc || imgEl.src || "";
        if (src && !src.startsWith("data:")) {
          try {
            const raw = decodeURIComponent(src.split("/").pop()?.split("?")[0]?.replace(/\.[^/.]+$/, "") || "");
            if (raw) {
              const clean = raw.replace(/[-_]/g, " ").replace(/\s*\(\d+\)/g, "").trim();
              const formatted = clean.replace(/\b\w/g, (c) => c.toUpperCase());
              return { text: `${formatted} Graphic`, type: "Image" };
            }
          } catch {}
        }
        return { text: "Visual Graphic Image", type: "Image" };
      }

      // 5. SVG Icons
      if (target instanceof SVGElement || target.tagName.toLowerCase() === "svg") {
        const titleTag = target.querySelector("title");
        if (titleTag && titleTag.textContent?.trim()) {
          return { text: titleTag.textContent.trim(), type: "Icon" };
        }
        const parentBtn = target.closest("button, a");
        if (parentBtn) {
          const parentLabel = parentBtn.getAttribute("aria-label") || parentBtn.getAttribute("title");
          if (parentLabel) return { text: parentLabel.trim(), type: "Icon Action" };
        }
        return null;
      }

      // 6. Interactive Inputs
      if (target instanceof HTMLInputElement && target.placeholder) {
        return { text: target.placeholder.trim(), type: "Input Field" };
      }

      // 7. Visible text fallback for buttons, tags, links
      const visibleText = target.innerText || target.textContent;
      if (visibleText && visibleText.trim() && visibleText.trim().length > 0 && visibleText.trim().length <= 60) {
        return { text: visibleText.trim(), type: "Interactive" };
      }

      return null;
    };

    const hideTooltip = () => {
      if (currentTooltipTargetRef.current) {
        currentTooltipTargetRef.current.removeAttribute("aria-describedby");
        currentTooltipTargetRef.current = null;
      }
      setTooltipData(null);
    };

    const scheduleHide = () => {
      clearTimeouts();
      tooltipHideTimeoutRef.current = setTimeout(() => {
        if (!isOverTooltipRef.current) {
          hideTooltip();
        }
      }, 120);
    };

    const renderTooltip = (target: HTMLElement, textObj: { text: string; type: string }) => {
      currentTooltipTargetRef.current = target;
      target.setAttribute("aria-describedby", "a11y-engine-tooltip");

      const rect = target.getBoundingClientRect();
      const estimatedWidth = 260;
      const GAP = 10;
      const PADDING = 12;

      let top: number;
      let position: "top" | "bottom" = "top";

      // If element is tall or a video frame, place inside visible top
      if (rect.height > 250) {
        const visibleTop = Math.max(rect.top, PADDING);
        top = visibleTop + 14;
        position = "bottom";
      } else {
        top = rect.top - 46;
        if (top < PADDING) {
          top = rect.bottom + GAP;
          position = "bottom";
        }
      }

      let left = rect.left + rect.width / 2 - estimatedWidth / 2;
      if (left < PADDING) {
        left = PADDING;
      } else if (left + estimatedWidth > window.innerWidth - PADDING) {
        left = window.innerWidth - estimatedWidth - PADDING;
      }

      setTooltipData({ text: textObj.text, type: textObj.type, top, left, position });
    };

    const scheduleShow = (target: HTMLElement, isKeyboard: boolean) => {
      clearTimeouts();
      const textObj = findAccessibleName(target);
      if (!textObj) return;

      if (isKeyboard) {
        renderTooltip(target, textObj);
      } else {
        tooltipShowTimeoutRef.current = setTimeout(() => {
          renderTooltip(target, textObj);
        }, 150);
      }
    };

    // 1. Mouse Hover Listeners
    const handlePointerOver = (e: PointerEvent) => {
      const target = getInteractiveTarget(e.target as HTMLElement);
      if (target && target !== currentTooltipTargetRef.current) {
        scheduleShow(target, false);
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement;
      if (related && related.closest("#a11y-engine-tooltip")) return;
      if (currentTooltipTargetRef.current && !currentTooltipTargetRef.current.contains(related)) {
        scheduleHide();
      }
    };

    // 2. Keyboard Focus Listeners
    const handleFocusIn = (e: FocusEvent) => {
      const target = getInteractiveTarget(e.target as HTMLElement);
      if (target) {
        scheduleShow(target, true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const related = e.relatedTarget as HTMLElement;
      if (related && related.closest("#a11y-engine-tooltip")) return;
      scheduleHide();
    };

    // 3. Dismiss on Escape Key (WCAG 1.4.13 Dismissible)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearTimeouts();
        hideTooltip();
      }
    };

    const handleScroll = () => {
      if (currentTooltipTargetRef.current) {
        const textObj = findAccessibleName(currentTooltipTargetRef.current);
        if (textObj) {
          renderTooltip(currentTooltipTargetRef.current, textObj);
        }
      }
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(bannerTimer);
      clearTimeouts();
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);

      document.querySelectorAll("[data-original-title]").forEach((el) => {
        const orig = el.getAttribute("data-original-title");
        if (orig) {
          el.setAttribute("title", orig);
          el.removeAttribute("data-original-title");
        }
        el.removeAttribute("aria-describedby");
      });
    };
  }, [state.accessibleTooltips]);

  if (!mounted) return null;

  return (
    <>
      {/* Focus Highlight Active Toast */}
      {state.highlightFocus && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[2147483640] px-5 py-2.5 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/40 text-xs font-black flex items-center gap-2.5 pointer-events-none tracking-wide backdrop-blur-md border border-blue-400/40 transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          Focus Highlight Active — Click any element or press Tab
        </div>
      )}

      {/* Accessible Tooltips Active Toast */}
      {state.accessibleTooltips && showTooltipBanner && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[2147483640] px-5 py-2.5 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/40 text-xs font-black flex items-center gap-2.5 pointer-events-none tracking-wide backdrop-blur-md border border-blue-400/40 transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          Accessible Tooltip Engine Active — Hover or Focus any element
        </div>
      )}

      {/* Accessible Floating Tooltip Overlay (WCAG SC 1.4.13) */}
      {state.accessibleTooltips && tooltipData && (
        <div 
          id="a11y-engine-tooltip"
          role="tooltip"
          aria-hidden="false"
          onMouseEnter={() => { isOverTooltipRef.current = true; }}
          onMouseLeave={() => { 
            isOverTooltipRef.current = false; 
            if (tooltipHideTimeoutRef.current) clearTimeout(tooltipHideTimeoutRef.current);
            tooltipHideTimeoutRef.current = setTimeout(() => {
              if (!isOverTooltipRef.current && currentTooltipTargetRef.current) {
                currentTooltipTargetRef.current.removeAttribute("aria-describedby");
                currentTooltipTargetRef.current = null;
                setTooltipData(null);
              }
            }, 120);
          }}
          className="fixed z-[2147483647] px-3.5 py-2 rounded-xl bg-slate-950/95 text-white border border-blue-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-xs font-semibold max-w-xs transition-opacity duration-150 backdrop-blur-xl pointer-events-auto select-none"
          style={{ 
            top: `${tooltipData.top}px`, 
            left: `${tooltipData.left}px`,
          }}
        >
          <div className="flex items-center gap-1.5 text-[9px] text-blue-400 uppercase tracking-widest font-black mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>{tooltipData.type || "Accessible Tooltip"}</span>
          </div>
          <div className="text-white text-[12px] leading-snug font-medium">
            {tooltipData.text}
          </div>
        </div>
      )}

      {/* Reading Overlays */}
      {state.readingRuler && (
        <div 
          id="a11y-reading-ruler" 
          style={{ display: "block", top: `${mousePos.y}px` }}
        />
      )}
      
      {state.readingMask && (
        <>
          <div 
            id="a11y-reading-mask-top" 
            style={{ display: "block", top: 0, height: `${mousePos.y - 100}px` }}
          />
          <div 
            id="a11y-reading-mask-bottom" 
            style={{ display: "block", top: `${mousePos.y + 100}px`, bottom: 0 }}
          />
        </>
      )}

      {/* Hover text magnifier overlay */}
      {state.textMagnifier && magnifierText && (
        <div 
          className="fixed z-[2147483647] pointer-events-none p-4 rounded-2xl bg-slate-900/95 text-white border border-blue-500/50 shadow-2xl font-sans max-w-sm text-lg font-bold leading-normal transition-all duration-75"
          style={{ 
            top: `${mousePos.y + 25}px`, 
            left: `${mousePos.x + 25}px`,
          }}
        >
          <div className="text-[10px] text-blue-400 mb-1 font-bold uppercase tracking-widest">Accessibility Reader Magnifier</div>
          {magnifierText}
        </div>
      )}

      {/* Floating Button - Draggable & side-switchable, positioned on the left in admin consoles so it never blocks delete/action buttons */}
      <motion.button
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        drag
        dragMomentum={false}
        dragElastic={0.08}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDragging(false), 150);
        }}
        onClick={() => {
          if (isDragging) return;
          togglePanel();
        }}
        style={isAdminRoute ? { backgroundColor: "#004bff" } : undefined}
        className="fixed bottom-6 right-6 z-[2147483647] w-14 h-14 bg-[#004bff] hover:bg-[#003edd] active:scale-95 text-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,75,255,0.45)] transition-colors group border-2 border-white/20 cursor-grab active:cursor-grabbing select-none"
        aria-label="Toggle Accessibility Center"
        title="Accessibility Widget: Click to open • Drag to move"
      >
        <div className="absolute inset-0 rounded-full border border-[#004bff] animate-ping opacity-20 group-hover:opacity-40" />
        <AnimatePresence mode="wait">
          {state.isPanelOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 stroke-[3]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7"
                aria-hidden="true"
              >
                <path d="M12 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.75 8a1.25 1.25 0 000 2.5h4.5v10.75a1.25 1.25 0 102.5 0V15h1.5v6.25a1.25 1.25 0 102.5 0V10.5h4.5a1.25 1.25 0 100-2.5h-15.5z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* The Panel */}
      <AnimatePresence>
        {state.isPanelOpen && <AccessibilityPanel />}
      </AnimatePresence>

      {/* SVG Filters for Color Blindness Simulation */}
      <svg 
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }} 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="cb-protanopia" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="cb-deuteranopia" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="cb-tritanopia" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
