"use client";

import { useState } from "react";

export default function AlexChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ from: "alex" | "user"; text: string }[]>([
    { from: "alex", text: "Hi! I'm Alex, your 2all.ai virtual assistant. How can I help make your website accessible today?" },
  ]);

  const now = new Date();
  const startedAt = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const startedLabel = `Started ${now.toLocaleString("en-US", { month: "short" })} ${now.getDate()} at ${startedAt}`;

  const getAlexReply = (text: string): string => {
    const q = text.toLowerCase().trim();

    // 1. "I want my website more accessible" or similar intent
    if (q.includes("more accessible") || q.includes("make my website accessible") || q.includes("get accessible") || q.includes("accessibility for my site")) {
      return "Awesome! 🚀 2all.ai makes web accessibility effortless:\n\n1️⃣ **Instant 2-Minute Installation**: Add our single-line JS script to your site.\n2️⃣ **Automated AI Remediation**: Automatically fixes missing alt-tags, ARIA attributes, contrast ratios & keyboard focus traps in real time.\n3️⃣ **ADA & WCAG 2.1 AA Compliance**: Protects your business from legal risk while welcoming 20%+ more web visitors.\n\nWould you like to **Start a 7-day free trial** or **Book a live demo**?";
    }

    // 2. Account / Login query
    if (q.includes("2all.ai account") || q.includes("2all") || q.includes("account") || q.includes("login") || q.includes("sign in")) {
      return "Welcome back! 👋 You can sign in to your dashboard anytime at **2all.ai/login**.\n\nOnce logged in, you can manage your domains, view real-time accessibility audit reports, and download your VPAT compliance certificates!";
    }

    // 3. Greetings
    if (q.match(/^(hi|hello|hey|hii|good morning|good evening|greetings)/)) {
      return "Hi there! 👋 I'm Alex, your 2all.ai AI Assistant. I can help you with WCAG compliance, widget installation, pricing, or booking a live demo. What would you like to explore?";
    }

    // 4. How it works / Technology
    if (q.match(/how.*(work|does it|it work|this work)/) || q.includes("how it works")) {
      return "2all.ai operates seamlessly in 3 simple steps:\n1️⃣ **Embed Snippet**: Copy our lightweight JavaScript snippet into your website footer.\n2️⃣ **Automated AI Scan**: Our AI engine scans your DOM for WCAG 2.1 AA violations.\n3️⃣ **Real-time Remediation**: The widget automatically adjusts screen reader tags, keyboard navigation, contrast, and fonts for disabled visitors!\n\nWant to test it out with a **7-day Free Trial**?";
    }

    // 5. Pricing / Cost / Plans
    if (q.match(/pric|cost|how much|plan|subscri|pay|free trial|trial/)) {
      return "We offer simple, transparent pricing starting from **$49/month**! 💳\n\n✨ **All plans include**:\n- 7-Day Risk-Free Trial (No credit card required)\n- Automated WCAG 2.1 AA Remediation\n- Full Accessibility Toolbar Suite\n- VPAT Conformance Documentation\n\nVisit **2all.ai/pricing** to choose your plan!";
    }

    // 6. Widget Installation / Script
    if (q.match(/install|snippet|widget|code|script|embed|javascript/)) {
      return "Installing 2all.ai takes under 2 minutes! ⚡\n\n1. Sign up for a free trial at **2all.ai/register**\n2. Add your website domain\n3. Copy the script tag provided in your dashboard and paste it right before your website's closing `</body>` tag.\n\nNeed technical assistance? Our engineering team can help you set it up for free!";
    }

    // 7. ADA / WCAG / Legal Compliance
    if (q.match(/ada|wcag|compliance|legal|lawsuit|eaa|section 508|vpat|audit/)) {
      return "2all.ai provides comprehensive compliance coverage: 🛡️\n\n- **WCAG 2.1 & 2.2 Level AA**\n- **ADA Title III Compliance**\n- **Section 508 & EAA Guidelines**\n- **VPAT 2.4 Conformance Statement**\n\nUsing 2all.ai mitigates legal lawsuit risks and ensures your digital presence is 100% inclusive.";
    }

    // 8. Demo / Meeting / Call
    if (q.match(/demo|book|schedule|call|meeting|talk to human/)) {
      return "I'd love to schedule a live demo for you! 📅\n\nVisit **2all.ai/demo** to pick a time slot. One of our accessibility experts will walk you through the platform, run a live scan on your domain, and answer all your questions.";
    }

    // 9. Features / Capabilities
    if (q.match(/feature|what.*do|capability|can it|does it|tools/)) {
      return "2all.ai features 27+ powerful accessibility tools: 🌟\n\n- 🎙️ **Universal Voice Command Navigation**\n- 📖 **OpenDyslexic Font & Dyslexia Reader**\n- 🔍 **Reading Ruler & Focus Mask**\n- 🔊 **Text-to-Speech Read Aloud Engine**\n- 🎨 **Dark Contrast & High Saturation Modes**\n- 📜 **Instant VPAT Certificate Generation**";
    }

    // 10. Agency / Enterprise / White Label
    if (q.match(/agency|partner|resell|white label|enterprise/)) {
      return "We offer specialized **White-Label Agency Plans**! 🏢\n\n- Rebrand the widget with your agency logo\n- Bulk domain management dashboard\n- Resell accessibility services to your clients\n\nCheck out **2all.ai/agency** or contact `partners@2all.ai`!";
    }

    // 11. Polite closing / Thanks
    if (q.match(/thank|thanks|great|perfect|awesome|ok|okay|got it|understood/)) {
      return "You're very welcome! 😊 Is there anything else I can help you with regarding web accessibility?";
    }

    // Comprehensive Intelligent Fallback
    return "Thank you for reaching out! 2all.ai helps businesses make their websites fully WCAG 2.1 AA & ADA compliant.\n\nYou can:\n- **Start a Free Trial**: Visit 2all.ai/register\n- **Book a Live Demo**: Visit 2all.ai/demo\n- **Email Support**: Reach our team directly at support@2all.ai\n\nHow else can I assist you today?";
  };

  const handleSend = (textToSend?: string) => {
    const userText = (textToSend || message).trim();
    if (!userText) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setMessage("");
    setIsTyping(true);

    // Simulate natural AI thinking delay (350ms)
    setTimeout(() => {
      const alexReply = getAlexReply(userText);
      setMessages((prev) => [...prev, { from: "alex", text: alexReply }]);
      setIsTyping(false);
    }, 350);
  };

  const handleQuickReply = (text: string) => {
    handleSend(text);
  };

  return (
    <>
      {/* Floating Chat Button & Alex Popover (Right side) */}
      <div className="fixed bottom-4 right-20 md:bottom-6 md:right-[88px] z-[2147483646] flex flex-col items-end gap-3 select-none">
        {/* Alex bubble popover (shown when chat is closed) */}
        {showBubble && !open && (
          <div
            className="alex-chat-popover bg-white border border-slate-200/80 rounded-2xl p-2.5 md:p-3 shadow-xl w-[220px] md:w-[240px] flex items-center gap-2.5 mr-1 md:mr-2 relative cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="absolute right-4 md:right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-slate-200/80 rotate-45" />
            <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#000033] flex items-center justify-center shrink-0 border border-slate-700 overflow-hidden shadow-sm">
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" className="w-full h-full object-cover relative z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-white absolute inset-0 m-auto z-0">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className="block text-[10px] font-black text-[#000033] uppercase tracking-widest truncate leading-none mb-0.5">Alex</span>
              <p className="text-[11px] text-slate-700 font-semibold leading-tight break-words !m-0 !p-0 font-sans" style={{ fontSize: "11px", lineHeight: "1.3" }}>
                Hi, I&apos;m Alex! Need help with web accessibility?
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
              className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer shrink-0 text-sm font-bold focus:outline-none"
            >
              ×
            </button>
          </div>
        )}

        {/* Chat trigger button */}
        <button
          onClick={() => { setOpen(!open); setShowBubble(false); }}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full text-white flex items-center justify-center shadow-xl transition-all cursor-pointer border-none ${open ? 'bg-[#000033] shadow-slate-900/30' : 'bg-[#000033] hover:bg-[#000044] shadow-slate-900/30 hover:scale-105'}`}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2.5]">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2.5]">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-[88px] right-4 md:right-28 z-[99990] w-[92vw] sm:w-[380px] h-[78vh] sm:h-[580px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/90 font-sans">
          
          {/* Header */}
          <div className="bg-[#000033] px-5 py-3.5 flex items-center justify-between shrink-0 text-white">
            <button
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white border-none bg-transparent cursor-pointer focus:outline-none p-1"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current stroke-[2.5]">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 overflow-hidden border border-blue-400 shadow-sm">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" className="w-full h-full object-cover relative z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white absolute inset-0 m-auto z-0">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white text-xs font-black leading-tight">Alex (2all.ai AI Assistant)</p>
                <p className="text-[10px] text-emerald-400 font-bold leading-none flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online 24/7
                </p>
              </div>
            </div>

            <button 
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white border-none bg-transparent cursor-pointer focus:outline-none p-1"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current stroke-[2.5]">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Privacy Notice Banner */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 text-center shrink-0">
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              Conversations are monitored for quality. Read our{" "}
              <a href="/security-and-privacy" className="underline font-bold text-blue-600">Privacy Policy ↗</a>.
            </p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 flex flex-col">
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">{startedLabel}</p>

            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                {msg.from === "alex" && (
                  <span className="text-[10px] font-black text-slate-400 mb-1 ml-10">Alex</span>
                )}
                
                <div className={`flex items-end gap-2 max-w-[88%] ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.from === "alex" && (
                    <div className="relative w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 overflow-hidden border border-blue-400 shadow-sm">
                      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" className="w-full h-full object-cover relative z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white absolute inset-0 m-auto z-0">
                        <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-2.5 text-xs font-semibold leading-relaxed shadow-sm ${
                    msg.from === "alex"
                      ? "bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm"
                      : "bg-blue-600 text-white rounded-tr-sm"
                  }`}>
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 ml-10 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-slate-400 ml-1">Alex is typing...</span>
              </div>
            )}

            {/* Interactive Quick Action Pills */}
            <div className="space-y-2 pt-2 flex flex-col items-center">
              {[
                "I want my website more accessible",
                "I have a 2all.ai account",
                "How to install widget code",
                "Is 2all.ai ADA & WCAG compliant?",
                "Book a live demo",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleQuickReply(opt)}
                  className="w-full text-xs font-bold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50/80 border border-blue-200 rounded-xl py-2 px-3 transition-all cursor-pointer text-center shadow-sm hover:border-blue-300"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="bg-white p-3 border-t border-slate-100 shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Ask Alex a question..."
                className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={!message.trim()}
                className="w-8 h-8 rounded-full bg-blue-600 disabled:bg-slate-300 text-white flex items-center justify-center cursor-pointer border-none shadow-sm shrink-0 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-[2.5]">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
