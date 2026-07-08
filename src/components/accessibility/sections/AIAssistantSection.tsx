"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Send, Bot, Sparkles, User } from "lucide-react";

export default function AIAssistantSection() {
  const { applyProfile } = useAccessibility();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, type: "bot", text: "Hi! Tell me about your accessibility needs (e.g., 'I have dyslexia' or 'I need larger text')." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), type: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    // Mock AI Logic
    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();
      
      if (lower.includes("dyslexia")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "I understand. I recommend the **Dyslexia Profile** which enables the OpenDyslexic font, increases letter spacing, and reduces motion.",
          action: "dyslexia"
        }]);
      } else if (lower.includes("adhd") || lower.includes("focus") || lower.includes("distracted")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "For better focus, the **ADHD Profile** will apply a reading mask to highlight the current line and stop all distracting animations.",
          action: "adhd"
        }]);
      } else if (lower.includes("vision") || lower.includes("large") || lower.includes("blind")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "I suggest the **Low Vision Profile**. It will maximize font size, apply high contrast, and enlarge the cursor.",
          action: "low-vision"
        }]);
      } else if (lower.includes("reading") || lower.includes("read")) {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "The **Reading Mode** will apply a reading ruler and highly legible typography to improve reading comprehension.",
          action: "reading"
        }]);
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now(), type: "bot", 
          text: "I see. I've optimized a few general settings for readability. You can also explore our Smart Profiles tab for more options.",
        }]);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[480px]">
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar-thin scrollbar-thumb-slate-300">
        {messages.map((msg: any) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white shadow-md'}`}>
              {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.type === 'user' ? 'bg-slate-100 text-[#0a1e3f] rounded-tr-none' : 'bg-blue-50 border border-blue-100 text-[#0a1e3f] rounded-tl-none'}`}>
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              
              {msg.action && (
                <button 
                  onClick={() => applyProfile(msg.action)}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  Apply All <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tl-none p-3 px-4 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 pt-4 border-t border-slate-200/50 mt-auto">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Type your needs naturally..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-5 pr-12 text-sm font-semibold text-[#0a1e3f] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
