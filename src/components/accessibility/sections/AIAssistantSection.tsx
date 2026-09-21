"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Send, Bot, Sparkles, User, HelpCircle, Volume2, ShieldCheck, DollarSign, Code2, Mail } from "lucide-react";

interface AIAssistantSectionProps {
  setActiveTab?: (tab: any) => void;
}

export default function AIAssistantSection({ setActiveTab }: AIAssistantSectionProps) {
  const { applyProfile, updateSetting, resetSettings } = useAccessibility();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: "bot",
      text: "👋 Hi! I'm your **2all.ai AI Assistant**. Ask me **anything** about our accessibility tools, color blindness, voice navigation, WCAG compliance, pricing, or custom features!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    setMessages(prev => [...prev, { id: Date.now(), type: "user", text: userText }]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();

      // 1. Color Blindness Filters (TOP PRIORITY - must evaluate before generic "list" or "blind"!)
      const isColorBlind = (
        lower.includes("color blind") || lower.includes("colorblind") ||
        lower.includes("protanopia") || lower.includes("deuteranopia") ||
        lower.includes("tritanopia") || lower.includes("achromatopsia") ||
        lower.includes("monochrom") || lower.includes("daltonism") ||
        lower.includes("color vision") ||
        (lower.includes("color") && lower.includes("blind"))
      );

      if (isColorBlind) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🎨 **Color Vision Deficiency (Color Blindness) Filters**:\n\n" +
                "2all.ai provides 4 specialized vision compensation filters designed for different types of color blindness:\n\n" +
                "• **Protanopia (Red-Blind / Red-Weak)**: Calibrates red wavelengths so you can easily distinguish reds from greens, browns, and dark tones.\n" +
                "• **Deuteranopia (Green-Blind / Green-Weak)**: Adjusts green spectrum clarity for the most common form of color blindness.\n" +
                "• **Tritanopia (Blue-Blind / Blue-Weak)**: Amplifies blue and yellow differentiation with balanced contrast tuning.\n" +
                "• **Achromatopsia (Monochromacy / Total Color Blindness)**: Converts the entire page to ultra-crisp, high-contrast monochrome grayscale.\n\n" +
                "You can test and apply any of these filters directly from the **Vision Tab**!",
          actionLabel: "Open Vision Tab",
          onActionClick: () => setActiveTab?.("vision")
        }]);
        return;
      }

      // 2. Background, Title & Text Colors
      const isBg = (
        lower.includes("background") || lower.includes("bg color") ||
        lower.includes("adjust bg") || lower.includes("title color") ||
        lower.includes("text color") || lower.includes("heading color") ||
        lower.includes("change color") || lower.includes("bg tint")
      );

      if (isBg) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🎨 **Adjusting Background & Text Colors**:\n\n" +
                "You can customize page colors anytime in the **Vision** tab:\n" +
                "• **Adjust Background Colors**: Choose from 8 accessible shades (White, Black, Blue, Green, Amber, Purple, Slate, Teal) to eliminate glare and eye fatigue.\n" +
                "• **Adjust Title & Text Colors**: Pick high-contrast custom colors for headings and body paragraphs.\n" +
                "• All backgrounds, sections, cards, and container gradients are styled live without breaking layouts!",
          actionLabel: "Open Vision Tab",
          onActionClick: () => setActiveTab?.("vision")
        }]);
        return;
      }

      // 3. Voice Navigation & Microphone Hands-Free Control
      const isVoiceNav = (
        lower.includes("voice navigation") || lower.includes("voice command") ||
        lower.includes("microphone") || lower.includes("mic") ||
        lower.includes("hands free") || lower.includes("speak command")
      );

      if (isVoiceNav) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🎙️ **Voice Navigation (Hands-Free Control)**:\n\n" +
                "Speak natural voice commands into your microphone to control the website:\n" +
                "• *\"Read page\"* or *\"Speak text\"* → Starts page narrator.\n" +
                "• *\"Scroll down\"* / *\"Scroll up\"* → Smooth page navigation.\n" +
                "• *\"Dark mode\"* / *\"Reset\"* → Toggles accessibility modes.\n" +
                "• *\"Pricing\"* / *\"Contact\"* → Direct navigation.\n\n" +
                "Click below to activate voice control!",
          actionLabel: "Enable Voice Navigation",
          settingAction: { key: "voiceNavigation", value: true }
        }]);
        return;
      }

      // 4. Voice, Speech, Read Aloud & Text-to-Speech (TTS)
      const isVoice = (
        lower.includes("voice") || lower.includes("speech") || lower.includes("tts") ||
        lower.includes("read page") || lower.includes("read aloud") || lower.includes("text to speech") ||
        lower.includes("narrat") || lower.includes("read text") || lower.includes("listen") ||
        lower.includes("audio") || lower.includes("speak") ||
        (lower.includes("read") && !lower.includes("ruler") && !lower.includes("mask"))
      );

      if (isVoice) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🔊 **Voice & Reading Tools**:\n\n" +
                "• **Read Entire Page**: Natural voice reading with real-time sentence highlight and auto-scroll.\n" +
                "• **Read Selected Text**: Highlight any sentence or paragraph on the page to hear it spoken.\n" +
                "• **Voice Settings Parameters**: Choose from available system voices (Google UK English, US English, etc.), adjust Reading Speed (0.5x to 2x), and pitch live!",
          actionLabel: "Enable Text-to-Speech",
          settingAction: { key: "textToSpeech", value: true }
        }]);
        return;
      }

      // 5. Dyslexia Mode & OpenDyslexic Typography
      const isDyslexia = (
        lower.includes("dyslexi") || lower.includes("letter flip") ||
        lower.includes("opendyslexic") || lower.includes("b/d/p/q") ||
        lower.includes("gravity font")
      );

      if (isDyslexia) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "📚 **Dyslexia Friendly Mode**:\n\n" +
                "• Applies **OpenDyslexic** typography with heavy weighted gravity bottoms to prevent letter inversion and flipping (b/d/p/q).\n" +
                "• Expands letter spacing (+0.5px), word spacing (+0.05em), and line height (1.6x) for effortless scanning and improved reading fluency.",
          actionLabel: "Enable Dyslexia Mode",
          action: "dyslexia"
        }]);
        return;
      }

      // 6. ADHD, Reading Mask & Ruler
      const isAdhd = (
        lower.includes("adhd") || lower.includes("focus") || lower.includes("distract") ||
        lower.includes("reading mask") || lower.includes("reading ruler") ||
        lower.includes("mask") || lower.includes("ruler")
      );

      if (isAdhd) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "⚡ **ADHD & Focus Assistance**:\n\n" +
                "• **Reading Mask**: Creates a clear horizontal reading spotlight that moves with your cursor while gently dimming the rest of the screen.\n" +
                "• **Reading Ruler**: Provides a sharp line guide underneath your active reading position.\n" +
                "• **Stop Animations**: Freezes moving banners, autoplay videos, and distracting GIFs.",
          actionLabel: "Enable Reading Mask",
          action: "adhd"
        }]);
        return;
      }

      // 7. Cognitive & Learning Disabilities
      const isCognitive = (
        lower.includes("cogniti") || lower.includes("autism") ||
        lower.includes("stroke") || lower.includes("learning") ||
        lower.includes("memory")
      );

      if (isCognitive) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🧠 **Cognitive Disability Mode**:\n\n" +
                "• Cleans visual clutter and stops moving animations.\n" +
                "• Applies readable **Lexend** typography designed by educational researchers to increase reading comprehension.\n" +
                "• Highlights action buttons, links, and headings with high-contrast outlines.",
          actionLabel: "Enable Cognitive Mode",
          action: "cognitive"
        }]);
        return;
      }

      // 8. Blindness & Screen Readers (Must exclude Color Blindness!)
      const isBlind = !isColorBlind && (
        lower.includes("screen reader") || lower.includes("jaws") ||
        lower.includes("nvda") || lower.includes("voiceover") ||
        lower.includes("talkback") || lower.includes("blindness") ||
        lower.includes("blind") || lower.includes("aria")
      );

      if (isBlind) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "♿ **Blindness / Screen Reader Mode**:\n\n" +
                "• Optimizes website DOM hierarchy and ARIA landmarks for JAWS, NVDA, VoiceOver & TalkBack.\n" +
                "• Enables comprehensive keyboard navigation loops and automatically describes missing image alt tags.",
          actionLabel: "Enable Screen Reader Mode",
          action: "blind"
        }]);
        return;
      }

      // 9. Vision & High Contrast Modes
      const isContrast = (
        lower.includes("contrast") || lower.includes("dark mode") ||
        lower.includes("light mode") || lower.includes("vision") ||
        lower.includes("glare") || lower.includes("invert")
      );

      if (isContrast) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "👁️ **High Contrast & Vision Modes**:\n\n" +
                "• **Dark Contrast**: Deep slate background (`#0f172a`) with crisp white typography to eliminate glare.\n" +
                "• **Light Contrast**: Clean high-contrast white layout with deep black text.\n" +
                "• **High Contrast Boost**: 150% contrast amplification for low-vision clarity.",
          actionLabel: "Enable Dark Contrast",
          action: "low-vision"
        }]);
        return;
      }

      // 10. Motor Impairment & Keyboard Access
      const isMotor = (
        lower.includes("motor") || lower.includes("keyboard") ||
        lower.includes("parkinson") || lower.includes("mobility") ||
        lower.includes("tremor")
      );

      if (isMotor) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🎮 **Motor Impairment Assistance**:\n\n" +
                "• Enlarges clickable targets and highlights active keyboard focus with prominent glow rings.\n" +
                "• Provides Large (32px) and Huge (64px) cursor overlays.\n" +
                "• Allows complete hands-free site navigation via Voice Navigation.",
          actionLabel: "Highlight Buttons & Links",
          action: "motor"
        }]);
        return;
      }

      // 11. Seizure Safety & Animation Stopping
      const isSeizure = (
        lower.includes("seizure") || lower.includes("epilep") ||
        lower.includes("flashing") || lower.includes("animation") ||
        lower.includes("motion") || lower.includes("freeze")
      );

      if (isSeizure) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🛡️ **Seizure Safe Mode**:\n\n" +
                "• Instantly pauses and freezes all moving animations, autoplay videos, scrolling marquees, and flashing GIFs.\n" +
                "• Eliminates photosensitive epileptic seizure risks and vestibular motion sickness.",
          actionLabel: "Stop All Animations",
          action: "seizure-safe"
        }]);
        return;
      }

      // 12. Font Sizing, Spacing & Text Scaling
      const isFont = (
        lower.includes("font") || lower.includes("text size") ||
        lower.includes("zoom") || lower.includes("scale") ||
        lower.includes("spacing") || lower.includes("line height")
      );

      if (isFont) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🔤 **Font Sizing & Spacing Adjustments**:\n\n" +
                "• **Text Scaling**: Scale full website text up to **200%** dynamically.\n" +
                "• **Line Height**: Increase line spacing up to **2.5x**.\n" +
                "• **Letter & Word Spacing**: Widen space between individual letters and words.\n" +
                "• **Text Alignment**: Left, Center, Right, or Justify.",
          actionLabel: "Increase Text Size (+20%)",
          settingAction: { key: "fontSize", value: 120 }
        }]);
        return;
      }

      // 13. Cursor & Mouse
      const isCursor = (lower.includes("cursor") || lower.includes("mouse") || lower.includes("pointer"));
      if (isCursor) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🔍 **Cursor & Pointer Enhancements**:\n\n" +
                "• Switch between **Normal**, **Large** (32px), and **Huge** (64px) high-contrast cursor pointers to easily track mouse movement across large monitors.",
          actionLabel: "Enable Large Cursor",
          settingAction: { key: "cursorSize", value: "large" }
        }]);
        return;
      }

      // 14. Mute Sounds
      const isMute = (lower.includes("mute") || lower.includes("silence") || lower.includes("quiet") || lower.includes("stop sound"));
      if (isMute) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🔇 **Mute Website Sounds**:\n\n" +
                "Instantly silences all background music, autoplay media, and HTML5 `<audio>` / `<video>` elements across the website.",
          actionLabel: "Mute All Sounds",
          settingAction: { key: "muteSounds", value: true }
        }]);
        return;
      }

      // 15. WCAG, ADA, EAA & Legal Compliance
      const isCompliance = (
        lower.includes("wcag") || lower.includes("ada") || lower.includes("law") ||
        lower.includes("legal") || lower.includes("lawsuit") || lower.includes("compliance") ||
        lower.includes("508") || lower.includes("eaa") || lower.includes("vpat")
      );

      if (isCompliance) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "⚖️ **ADA & WCAG 2.1 AA Compliance Protection**:\n\n" +
                "• **Legal Standard**: Conforms with **ADA Title III**, **Section 508**, **EAA**, and **WCAG 2.1 Level AA**.\n" +
                "• **Automated Remediation**: Patches missing alt text, ARIA landmarks, form labels, and color contrast.\n" +
                "• **Audit Certificates**: Generates official VPAT statements and litigation defense records.",
          linkUrl: "/litigation-support",
          linkLabel: "Learn About Legal Protection"
        }]);
        return;
      }

      // 16. Installation & Embed Code
      const isInstall = (
        lower.includes("install") || lower.includes("code") || lower.includes("script") ||
        lower.includes("embed") || lower.includes("setup") || lower.includes("wordpress") ||
        lower.includes("shopify") || lower.includes("webflow") || lower.includes("how to add")
      );

      if (isInstall) {
        const prodUrl = typeof window !== "undefined" && window.location.hostname === "localhost"
          ? "http://localhost:3000/loader.js"
          : "https://2all-ai.mccmrfip.in/loader.js";
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "⚡ **Quick 2-Minute Installation**:\n\n" +
                "Simply paste our script before the closing `</body>` tag on your website:\n\n" +
                `\`\`\`html\n<script src="${prodUrl}" data-api-key="YOUR_KEY" async></script>\n\`\`\`\n\n` +
                "Compatible with WordPress, Shopify, Next.js, React, Webflow, Squarespace, and custom HTML!",
          linkUrl: "/dashboard/install",
          linkLabel: "Get Embed Code"
        }]);
        return;
      }

      // 17. Pricing & Plans
      const isPricing = (
        lower.includes("pricing") || lower.includes("price") || lower.includes("cost") ||
        lower.includes("plan") || lower.includes("how much") || lower.includes("buy") ||
        lower.includes("trial") || lower.includes("subscription") || lower.includes("pay")
      );

      if (isPricing) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "💰 **2all.ai Pricing Plans**:\n\n" +
                "• **Standard**: $49/month (Under 10k pageviews/mo).\n" +
                "• **Business**: $99/month (Automated AI remediation & monthly audit reports).\n" +
                "• **Enterprise**: Custom dedicated SLA, custom widget branding & legal protection support.\n\n" +
                "🎉 All plans include a **7-Day Free Trial** with no commitment!",
          linkUrl: "/pricing",
          linkLabel: "View Pricing Page"
        }]);
        return;
      }

      // 18. Account & Dashboard
      const isAccount = (lower.includes("account") || lower.includes("login") || lower.includes("dashboard") || lower.includes("portal") || lower.includes("sign in"));
      if (isAccount) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🔑 **Client Portal & Dashboard**:\n\n" +
                "Manage authorized domains, inspect accessibility scorecards, customize brand theme colors, and download VPAT compliance reports from your 2all.ai dashboard.",
          linkUrl: "/login",
          linkLabel: "Go to Login Page"
        }]);
        return;
      }

      // 19. Support & Demo
      const isSupport = (lower.includes("support") || lower.includes("contact") || lower.includes("email") || lower.includes("demo") || lower.includes("help desk"));
      if (isSupport) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "📧 **24/7 Dedicated Support**:\n\n" +
                "Our accessibility engineering specialists are here for you 24/7!\n" +
                "• Email: **support@2all.ai**\n" +
                "• Schedule a 1-on-1 personalized compliance audit demo anytime.",
          linkUrl: "/demo",
          linkLabel: "Schedule a Live Demo"
        }]);
        return;
      }

      // 20. Reset Settings
      const isReset = (lower.includes("reset") || lower.includes("clear") || lower.includes("default") || lower.includes("restore"));
      if (isReset) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🔄 **Reset Accessibility Adjustments**:\n\n" +
                "Click below or press the 'Reset Settings' button at the bottom of the panel to restore all website colors, typography, and modes back to normal.",
          resetAction: true
        }]);
        return;
      }

      // 21. About 2all.ai
      const isAbout = (lower.includes("what is 2all") || lower.includes("who are you") || lower.includes("who made") || lower === "about");
      if (isAbout) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🤖 **About 2all.ai**:\n\n" +
                "2all.ai is an enterprise AI-powered web accessibility platform designed to ensure digital equity for over 1 billion people with disabilities while protecting businesses from ADA Title III & WCAG compliance lawsuits."
        }]);
        return;
      }

      // 22. Elderly / Seniors / Aging Eyes
      const isElderly = (lower.includes("elderly") || lower.includes("senior") || lower.includes("aging") || lower.includes("old age") || lower.includes("grand"));
      if (isElderly) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "👵 **Senior & Low-Vision Reading Comfort**:\n\n" +
                "For elderly visitors experiencing presbyopia, cataracts, or eye fatigue:\n" +
                "• **Text Scaling**: Magnify text up to 200% without breaking layouts.\n" +
                "• **High Contrast / Dark Mode**: Crisp typography with zero glare.\n" +
                "• **Large Pointers**: High-visibility 32px/64px cursors.\n" +
                "• **Text-To-Speech**: Natural voice reading with word highlighting.",
          actionLabel: "Increase Text Size (+20%)",
          settingAction: { key: "fontSize", value: 120 }
        }]);
        return;
      }

      // 23. Performance / Speed / SEO
      const isSpeed = (lower.includes("speed") || lower.includes("performance") || lower.includes("slow") || lower.includes("seo") || lower.includes("load time"));
      if (isSpeed) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "⚡ **High-Speed & Zero Impact Architecture**:\n\n" +
                "• **Ultra-Lightweight**: Under 20KB gzipped, loaded asynchronously via CDN (`async defer`).\n" +
                "• **Zero PageSpeed Impact**: Operates without blocking the main DOM thread.\n" +
                "• **SEO Boost**: Fixes missing image alt tags and structural ARIA landmarks, improving search ranking.",
          actionLabel: "Explore All Features",
          onActionClick: () => setActiveTab?.("features")
        }]);
        return;
      }

      // 24. Clarity InfoTech / Host Website
      const isClarity = (lower.includes("clarity") || lower.includes("this site") || lower.includes("this website"));
      if (isClarity) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🏢 **Website Accessibility Integration**:\n\n" +
                "This website is powered by **2all.ai** to guarantee complete digital inclusion, WCAG 2.1 AA adherence, and ADA compliance for all users and assistive devices.\n\n" +
                "You can customize any colors, fonts, voice reading, and focus tools directly on this page!",
          actionLabel: "Explore Features",
          onActionClick: () => setActiveTab?.("features")
        }]);
        return;
      }

      // 25. Greetings
      const isGreeting = (
        lower === "hi" || lower === "hello" || lower === "hey" ||
        lower.startsWith("hi ") || lower.startsWith("hello ") || lower.startsWith("hey ") ||
        lower.includes("good morning") || lower.includes("good afternoon")
      );
      if (isGreeting) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "👋 **Hello! How can I assist you today?**\n\n" +
                "I can help you navigate this website or activate accessibility adjustments:\n" +
                "• Say *\"give color blindness list\"* to see vision filters.\n" +
                "• Say *\"read page\"* to start voice narration.\n" +
                "• Say *\"dark mode\"* or *\"change colors\"* for visual contrast.\n" +
                "• Say *\"dyslexia\"* or *\"adhd\"* for specialized reading modes.",
          actionLabel: "Open Vision Tab",
          onActionClick: () => setActiveTab?.("vision")
        }]);
        return;
      }

      // 26. Complete Tools Suite Listing (ONLY fires when explicitly asking for all tools / features / menu / overview)
      const isAllTools = (
        lower.includes("all tools") || lower.includes("list the tools") ||
        lower.includes("list all") || lower.includes("list of tools") ||
        lower.includes("what tools") || lower.includes("what features") ||
        lower.includes("what can you do") || lower.includes("what do you do") ||
        lower.includes("capabilities") || lower.includes("overview") ||
        lower === "tools" || lower === "features" || lower === "list" || lower === "menu" || lower === "help"
      );

      if (isAllTools) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: "🛠️ **2all.ai Complete Accessibility Tools Suite**:\n\n" +
                "🔊 **1. Speech & Audio**\n" +
                "• **Read Entire Page / Selection**: Natural Text-to-Speech narrator with real-time sentence highlighting.\n" +
                "• **Voice Navigation**: Hands-free voice commands (\"read page\", \"dark mode\", etc.).\n" +
                "• **Voice Settings**: Multi-voice selection, pitch tuning, and speed up to 2x.\n\n" +
                "👁️ **2. Vision & Color Customization**\n" +
                "• **Adjust Background Colors**: 8 high-comfort tints (White, Black, Blue, Amber, Green, etc.).\n" +
                "• **Adjust Title & Text Colors**: Custom contrast palettes for headings and body text.\n" +
                "• **Dark, Light & High Contrast**: Instant contrast enhancement.\n" +
                "• **Color Blindness**: Filters for Protanopia, Deuteranopia, Tritanopia & Monochromacy.\n\n" +
                "🔤 **3. Typography & Layout**\n" +
                "• **Dyslexia Friendly Mode**: OpenDyslexic weighted gravity typography.\n" +
                "• **Text Scaling**: Zoom text up to 200% without breaking layouts.\n" +
                "• **Letter / Word Spacing & Line Height**: Eliminates visual text crowding.\n\n" +
                "🎯 **4. Focus & Motor Navigation**\n" +
                "• **Reading Mask & Ruler**: Horizontal line spotlighting for ADHD and focus.\n" +
                "• **Big / Huge Cursor**: High-visibility 32px & 64px pointers.\n" +
                "• **Highlight Links & Buttons**: Prominent interactive navigation guides.\n" +
                "• **Stop Animations & Hide Images**: Freeze motion distractions.",
          actionLabel: "Open Vision Tab",
          onActionClick: () => setActiveTab?.("vision")
        }]);
        return;
      }

      // 27. Universal Dynamic Contextual Fallback (Answers ANY other question)
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: "bot",
        text: `💡 **2all.ai Accessibility Assistant**:\n\nRegarding: *"${userText}"*\n\n2all.ai provides instant accessibility adjustments directly on this page:\n• **Vision**: 4 Color Blindness filters (Protanopia, Deuteranopia, Tritanopia, Grayscale), 8 background tints, and contrast modes.\n• **Audio**: Text-to-speech page narrator with natural voices and hands-free microphone voice navigation.\n• **Reading**: OpenDyslexic typography, ADHD Reading Mask & Ruler, and text scaling up to 200%.\n• **Motor**: Enlarged cursors, clickable target highlights, and keyboard navigation rings.\n\nYou can ask me to activate any feature or explain how it works!`,
        actionLabel: "Explore All Features",
        onActionClick: () => setActiveTab?.("features")
      }]);

    }, 350);
  };

  const quickQuestions = [
    "give color blindness list",
    "How to read page aloud?",
    "Change background colors",
    "Dyslexia & ADHD modes",
    "Pricing plans?",
    "WCAG 2.1 Compliance law?"
  ];

  return (
    <div className="flex flex-col h-[345px] max-h-[350px] overflow-hidden font-sans text-xs">
      
      {/* Quick Doubt Suggestion Chips */}
      {messages.length <= 2 && (
        <div className="shrink-0 pb-2 flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[11px] font-bold rounded-lg transition-all text-left flex items-center gap-1 cursor-pointer border-none"
            >
              <HelpCircle className="w-3 h-3 text-blue-500 shrink-0" />
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-2 scrollbar-thin scrollbar-thumb-slate-300">
        {messages.map((msg: any) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 text-white shadow-xs'}`}>
              {msg.type === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            
            <div className={`max-w-[85%] rounded-xl p-2.5 text-xs leading-relaxed ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-tr-none font-medium' : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none font-normal'}`}>
              <div 
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
              />

              {msg.onActionClick && (
                <button 
                  onClick={msg.onActionClick}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-xs border-none cursor-pointer"
                >
                  {msg.actionLabel || "Open Tab"} <Sparkles className="w-3 h-3" />
                </button>
              )}
              
              {msg.action && (
                <button 
                  onClick={() => applyProfile(msg.action)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-xs border-none cursor-pointer"
                >
                  {msg.actionLabel || "Apply Mode"} <Sparkles className="w-3 h-3" />
                </button>
              )}

              {msg.settingAction && (
                <button 
                  onClick={() => updateSetting(msg.settingAction.key, msg.settingAction.value)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-xs border-none cursor-pointer"
                >
                  {msg.actionLabel || "Enable Feature"} <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}

              {msg.linkUrl && (
                <a
                  href={msg.linkUrl}
                  className="mt-2 inline-flex bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg items-center gap-1 transition-all shadow-xs no-underline"
                >
                  {msg.linkLabel || "Learn More"}
                </a>
              )}

              {msg.resetAction && (
                <button 
                  onClick={() => resetSettings()}
                  className="mt-2 bg-slate-700 hover:bg-slate-800 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-xs border-none cursor-pointer"
                >
                  Reset All Settings
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl rounded-tl-none p-2 px-3 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="shrink-0 pt-2 border-t border-slate-100 bg-white">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Ask anything about 2all.ai..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-3.5 pr-10 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="absolute right-1.5 w-7 h-7 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg flex items-center justify-center transition-all border-none cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
