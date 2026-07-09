"use client";

import { useState } from "react";

export default function AlexChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ from: "alex" | "user"; text: string }[]>([
    { from: "alex", text: "Ask me a question or select one of the following options below." },
  ]);
  const [quickReplied, setQuickReplied] = useState(false);

  const now = new Date();
  const startedAt = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const startedLabel = `Started ${now.toLocaleString("en-US", { month: "short" })} ${now.getDate()} at ${startedAt}`;

  const handleQuickReply = (text: string) => {
    setQuickReplied(true);
    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "alex", text: "Thanks! Let me connect you with the right support. A team member will be with you shortly." },
    ]);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: message.trim() },
      { from: "alex", text: "Thanks for your message! Our team will get back to you soon." },
    ]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Chat Button & Alex Popover (Right side) */}
      <div className="fixed bottom-4 right-20 md:bottom-6 md:right-[88px] z-[2147483646] flex flex-col items-end gap-3 select-none">
        {/* Alex bubble popover (shown when chat is closed) */}
        {showBubble && !open && (
          <div
            className="bg-white border border-slate-200/80 rounded-2xl p-2.5 md:p-3 shadow-xl max-w-[200px] md:max-w-[220px] flex items-center gap-2 md:gap-3 mr-1 md:mr-2 relative cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="absolute right-4 md:right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-slate-200/80 rotate-45" />
            <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" className="w-full h-full object-cover relative z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-slate-400 absolute inset-0 m-auto z-0">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className="block text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest truncate">Alex</span>
              <p className="text-xs text-slate-700 font-bold leading-snug break-words">Hi, I&apos;m Alex! I&apos;m your 24 hour virtual assistant.</p>
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
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full text-white flex items-center justify-center shadow-lg transition-all cursor-pointer border-none ${open ? 'bg-[#000033] shadow-slate-900/30' : 'bg-[#000033] shadow-slate-900/30 hover:scale-105'}`}
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
        <div className="fixed bottom-[88px] right-6 md:right-32 z-[99990] w-[90vw] md:w-[360px] h-[75vh] md:h-[580px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          
          {/* Header */}
          <div className="bg-[#000033] px-4 py-3 flex items-center justify-between shrink-0">
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-slate-200 border-none bg-transparent cursor-pointer focus:outline-none p-1"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current stroke-[2]">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full bg-slate-400 overflow-hidden shrink-0">
                 <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" className="w-full h-full object-cover relative z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
                 <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-100 absolute inset-0 m-auto z-0">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <p className="text-white text-sm font-bold">{startedLabel}</p>
            </div>
            <button className="text-white hover:text-slate-200 border-none bg-transparent cursor-pointer focus:outline-none p-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="19" r="1.5" fill="currentColor" />
              </svg>
            </button>
          </div>

          {/* Notice bar */}
          <div className="bg-white px-8 pt-4 pb-2 text-center shrink-0">
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              This chat is recorded using a cloud service and is subject to the terms of our{" "}
              <a href="#" className="underline text-slate-600">Privacy Notice ↗</a>.
            </p>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-5 pb-2 space-y-6 bg-white flex flex-col">
            <p className="text-center text-[10px] text-slate-400 font-medium">{startedAt}</p>

            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                
                {msg.from === "alex" && (
                  <p className="text-[11px] font-medium text-slate-500 mb-1 ml-10">Alex</p>
                )}
                
                <div className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.from === "alex" && (
                    <div className="relative w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200 shadow-sm">
                       <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Alex" className="w-full h-full object-cover relative z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
                       <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-400 absolute inset-0 m-auto z-0">
                        <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className={`rounded-3xl px-4 py-2.5 max-w-[230px] text-sm text-slate-800 ${
                    msg.from === "alex"
                      ? "bg-[#f3f4f6]"
                      : "bg-[#f3f4f6] text-right"
                  }`}>
                    {msg.text}
                  </div>
                </div>

                {msg.from === "alex" && (
                  <p className="text-[10px] font-medium text-slate-400 mt-1 ml-10">Just now</p>
                )}
              </div>
            ))}

            {/* Quick-reply option buttons */}
            {!quickReplied && (
              <div className="space-y-3 pt-4 flex flex-col items-center">
                {["I have an accessiBe account", "I want my website more accessible"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleQuickReply(opt)}
                    className="w-auto px-5 text-sm font-medium text-[#1c64f2] border border-[#1c64f2] rounded-full py-2 hover:bg-blue-50 transition-colors cursor-pointer bg-white text-center"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message input */}
          <div className="bg-white p-4 pb-6 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Type a message"
                className="w-full border-2 border-[#1c64f2] rounded-full px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-500"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-slate-800 animate-pulse" style={{ display: message ? 'none' : 'block' }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

