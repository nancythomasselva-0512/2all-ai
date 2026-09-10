"use client";

import React, { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Check, Copy, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function WixIntegrationPage() {
  const [copied, setCopied] = useState(false);
  const snippet = `<!-- 2all.ai Accessibility Widget for Wix -->
<script 
  src="https://2all.ai/loader.js" 
  data-api-key="YOUR_API_KEY" 
  async>
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(127,216,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 relative z-10">
          <Breadcrumbs
            theme="dark"
            items={[{ label: "Home", href: "/" }, { label: "Integrations", href: "/integrate-with-your-cms" }, { label: "Wix" }]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/15">
            Wix &amp; Wix Studio
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Wix Website <span className="text-[#C8FF4D]">Accessibility</span> &amp; ADA Protection
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Easily install 2all.ai on your Wix website via Custom Code settings to achieve full WCAG 2.1 AA and ADA Title III compliance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/register"
              className="px-8 py-4 bg-[#004bff] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wider"
            >
              Start Free Trial
            </Link>
            <Link
              href="/access-scan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl transition-all uppercase tracking-wider"
            >
              Scan Wix Website
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Wix Custom Code</span>
            <h2 className="text-3xl font-black text-slate-900">How to Install on Wix</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">1</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">Open Custom Code in Wix Settings</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">In your Wix Dashboard, navigate to <strong>Settings &gt; Custom Code</strong> (under Advanced).</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">2</span>
              <div className="space-y-3 flex-1">
                <h4 className="font-extrabold text-slate-900 text-base">Add Custom Code Snippet</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Click <strong>+ Add Custom Code</strong>. Paste the code below, select <strong>Body - end</strong>, and apply to <strong>All Pages</strong>:</p>
                <div className="bg-slate-950 p-4 rounded-xl relative border border-slate-800">
                  <pre className="text-xs text-blue-300 font-mono overflow-x-auto whitespace-pre">{snippet}</pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg border-none cursor-pointer flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">3</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">Apply and Publish</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">Click <strong>Apply</strong>. Publish your site, and the 2all.ai accessibility interface will be live on all pages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
