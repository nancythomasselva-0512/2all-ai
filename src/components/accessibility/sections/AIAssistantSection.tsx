"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Send, Bot, Sparkles, User, HelpCircle, Volume2, ShieldCheck, DollarSign, Code2, Mail } from "lucide-react";

export default function AIAssistantSection() {
  const { applyProfile, updateSetting, resetSettings } = useAccessibility();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: "bot",
      text: "👋 Hi! I'm your **2all.ai AI Assistant**. Ask me **anything** about our accessibility tools, WCAG compliance, pricing, installation, or platform features!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    setMessages(prev => [...prev, { id: Date.now(), type: "user", text: userText }]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();

      // 1. Greetings & Social
      if (
        lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || 
        lower.includes("greetings") || lower.includes("who are you") || lower.includes("what can you do") ||
        lower.includes("help")
      ) {
        setMessages(prev => [...prev, {
          id: Date.now(), type: "bot",
          text: "🤖 **I'm your 2all.ai AI Assistant!** I can answer questions about:\n\n• **Accessibility Tools**: Voice Text-to-Speech, Dyslexia, ADHD, Contrast & Screen Reader modes.\n• **Compliance & Laws**: WCAG 2.1 AA, ADA Title III & 508 legal protection.\n• **Platform Setup**: 2-minute script installation & pricing options.\n\nWhat would you like to know or enable?",
        }]);
      }
      // 2. Voice / Speech / Read Aloud / Audio / Sound / TTS (including typos)
      else if (
        lower.includes("voice") || lower.includes("speech") || lower.includes("speak") ||
        lower.includes("audio") || lower.includes("sound") || lower.includes("tts") ||
        lower.includes("read aloud") || lower.includes("listen") || lower.includes("talk") ||
        lower.includes("reated") || lower.includes("speaker")
      ) {
        setMessages(prev => [...prev, {
          id: Date.now(), type: "bot",
          text: "🔊 **Voice & Speech Tools Available**:\n\n1️⃣ **Text-to-Speech (Read Aloud)**: Reads selected text or paragraph out loud with natural voice synthesis.\n2️⃣ **Screen Reader Compatibility**: Full speech output support for NVDA, JAWS, VoiceOver & TalkBack.",
          actionLabel: "Enable Text-to-Speech",
          settingAction: { key: "textToSpeech", value: true }
        }]);
      } 
      // 3. Pricing / Cost / Plans
      else if (
        lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || 
        lower.includes("plan") || lower.includes("pay") || lower.includes("buy") || lower.includes("subscription")
      ) {
        setMessages(prev => [...prev, {
          id: Date.now(), type: "bot",
          text: "💰 **2all.ai Pricing Plans**:\n\n• **Standard Plan**: $49/mo for websites under 10k pageviews.\n• **Business Plan**: $99/mo with full automated AI remediation & monthly audit reports.\n• **Enterprise Plan**: Custom dedicated SLAs & legal protection support.\n\nAll plans come with a **7-Day Free Trial**!",
          linkUrl: "/pricing",
          linkLabel: "View Pricing Page"
        }]);
      }
      // 4. Installation / Embed Code / Setup
      else if (
        lower.includes("install") || lower.includes("code") || lower.includes("script") || 
        lower.includes("embed") || lower.includes("setup") || lower.includes("wordpress") || lower.includes("shopify")
      ) {
        setMessages(prev => [...prev, {
          id: Date.now(), type: "bot",
          text: "⚡ **2-Minute Installation**:\n\nJust copy and paste our single JavaScript snippet right before the `</body>` tag on your website:\n```html\n<script src=\"https://2all.ai/widget.js\" async></script>\n```\nWorks seamlessly with WordPress, Shopify, Next.js, React, Webflow, and HTML!",
          linkUrl: "/dashboard/install",
          linkLabel: "Get Embed Code"
        }]);
      }
      // 5. Compliance / WCAG / ADA / Lawsuits / Legal
      else if (
        lower.includes("wcag") || lower.includes("ada") || lower.includes("law") || 
        lower.includes("legal") || lower.includes("lawsuit") || lower.includes("litigation") || lower.includes("508")
      ) {
        setMessages(prev => [...prev, {
          id: Date.now(), type: "bot",
          text: "⚖️ **ADA & WCAG 2.1 AA Compliance**:\n\n2all.ai automatically remediates your site's DOM structure, ARIA landmarks, image alt texts, and color contrast ratios to protect your business against ADA Title III lawsuits and ensure WCAG 2.1 AA adherence.",
          linkUrl: "/litigation-support",
          linkLabel: "Learn About Legal Protection"
        }]);
      }
      // 6. Account / Login / Dashboard
      else if (
        lower.includes("login") || lower.includes("sign in") || lower.includes("account") || 
        lower.includes("dashboard") || lower.includes("register")
      ) {
        setMessages(prev => [...prev, {
          id: Date.now(), type: "bot",
          text: "🔑 **Account & Dashboard Access**:\n\nYou can sign in to your 2all.ai workspace to manage registered domains, view accessibility audit reports, and generate API authorization keys.",
          linkUrl: "/login",
          linkLabel: "Go to Login Page"
        }]);
      }
      // 7. Support / Contact
      else if (
        lower.includes("support") || lower.includes("contact") || lower.includes("email") || lower.includes("reach")
      ) {
        setMessages(prev => [...prev, {
          id: Date.now(), type: "bot",
          text: "📧 **Need Direct Support?**\n\nOur accessibility team is available 24/7! Reach out to us at **support@2all.ai** or book a 1-on-1 walkthrough session with our specialists.",
          linkUrl: "/demo",
          linkLabel: "Schedule a Live Demo"
        }]);
      }
      // 8. Cognitive Mode
      else if (lower.includes("cognitive")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "🧠 **Cognitive Disability Mode** simplifies website visuals, stops all flashing animations, highlights action buttons & links, and activates a reading ruler to assist users with Autism, Stroke recovery, or focus challenges.",
          actionLabel: "Enable Cognitive Mode",
          action: "cognitive"
        }]);
      } 
      // 9. Reading vs Dyslexia
      else if (lower.includes("reading") && lower.includes("dyslexia")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "📖 **Difference**:\n• **Dyslexia Mode**: Uses specialized OpenDyslexic typography + letter spacing to prevent letter confusion.\n• **Reading Mode**: Uses Lexend font, paragraph focus guides, and Text-to-Speech auto-read.",
          actionLabel: "Try Reading Mode",
          action: "reading"
        }]);
      } 
      // 10. Dyslexia Mode
      else if (lower.includes("dyslexia")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "📚 **Dyslexia Friendly Mode** applies OpenDyslexic typography, expands letter/word spacing, and increases line heights to prevent letter flipping and improve reading speed.",
          actionLabel: "Enable Dyslexia Mode",
          action: "dyslexia"
        }]);
      } 
      // 11. ADHD Mode
      else if (lower.includes("adhd") || lower.includes("focus") || lower.includes("distract")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "⚡ **ADHD Friendly Mode** applies a focused reading mask that highlights your active cursor line while freezing all moving GIFs, background videos, and popups.",
          actionLabel: "Enable ADHD Mode",
          action: "adhd"
        }]);
      } 
      // 12. Blindness / Screen Reader
      else if (lower.includes("blind") || lower.includes("screen reader")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "♿ **Blindness / Screen Reader Mode** optimizes ARIA attributes, semantic headings, and keyboard focus traps for full compatibility with JAWS, NVDA, VoiceOver, and TalkBack.",
          actionLabel: "Enable Screen Reader Mode",
          action: "blind"
        }]);
      } 
      // 13. Vision & Color Blindness
      else if (lower.includes("color") || lower.includes("contrast") || lower.includes("vision") || lower.includes("dark")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "👁️ **Visually Impaired & Color Vision Modes** maximize contrast ratios, enlarge cursors, and offer tailored filters (Tritanopia, Deuteranopia, Protanopia, Dark Mode) to reduce eye strain.",
          actionLabel: "Enable Visually Impaired Mode",
          action: "low-vision"
        }]);
      } 
      // 14. Font / Text Size / Spacing
      else if (lower.includes("font") || lower.includes("size") || lower.includes("zoom") || lower.includes("space") || lower.includes("text")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "🔤 **Font & Text Scaling**: You can scale text size up to **200%**, adjust letter/word spacing, and switch to OpenDyslexic or Lexend fonts in the **Features** tab.",
          actionLabel: "Increase Text Size (+20%)",
          settingAction: { key: "fontSize", value: 120 }
        }]);
      }
      // 15. Cursor & Pointer
      else if (lower.includes("cursor") || lower.includes("mouse") || lower.includes("pointer") || lower.includes("ruler")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "🔍 **Cursor & Focus Tools**: Enlarge mouse cursor, enable high-contrast pointers, or activate the Reading Mask & Ruler in the **Features** tab.",
          actionLabel: "Enable Large Cursor",
          settingAction: { key: "cursorSize", value: "large" }
        }]);
      }
      // 16. Reset
      else if (lower.includes("reset") || lower.includes("clear")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "🔄 You can reset all applied accessibility modes and font customizations back to default anytime using the 'Reset Settings' button at the bottom of the panel.",
          resetAction: true
        }]);
      } 
      // 17. Intelligent Universal Fallback Response
      else {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: `💡 Regarding "${userText}": 2all.ai provides automated AI accessibility remediation, ADA compliance tools, voice text-to-speech, and specialized reading profiles.\n\nFeel free to ask about **pricing**, **installation**, **voice tools**, **WCAG laws**, or **support**!`,
        }]);
      }
    }, 450);
  };

  const quickQuestions = [
    "Voice related tool?",
    "Pricing plans?",
    "How to install?",
    "WCAG Compliance law?"
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
