"use client";

import Link from "next/link";
import { Terminal, Code2, GitMerge, Box } from "lucide-react";
import Footer from "@/components/marketing/Footer";
import Navbar from "@/components/marketing/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function DevelopAccessibleCodePage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 relative font-sans text-[#0a1e3f]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-6">
               <div className="p-1.5 bg-blue-500/20 rounded-md border border-blue-400/30">
                  <Terminal className="w-4 h-4 text-blue-400" />
               </div>
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300">Developer Tools</span>
            </div>
            
            <Breadcrumbs items={[ { label: "Home", href: "/" }, { label: "Products" }, { label: "Develop Accessible Code" } ]} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-white">
              Accessibility natively built into your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bff] to-[#00ff87] italic font-serif font-light">CI/CD pipeline</span>.
            </h1>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
              Catch accessibility bugs before they reach production. 2allFlow integrates directly with your source code, IDEs, and testing frameworks.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#004bff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                START BUILDING
              </button>
              <button className="bg-transparent text-white hover:bg-white/10 border border-slate-600 px-8 py-3.5 rounded-full font-bold text-sm transition-all">
                READ THE DOCS
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
             <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden p-6 font-mono text-sm leading-relaxed">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                   <div className="w-3 h-3 rounded-full bg-rose-500" />
                   <div className="w-3 h-3 rounded-full bg-amber-500" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   <span className="ml-4 text-slate-500 text-xs">Button.tsx</span>
                </div>
                <div className="text-slate-300">
                   <span className="text-pink-400">export const</span> Button = ({"{"} <span className="text-blue-300">label, onClick</span> {"}"}) <span className="text-pink-400">{`=>`}</span> {"{"}
                   <br/>
                   &nbsp;&nbsp;<span className="text-pink-400">return</span> (
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;{`<`}button
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClick={'{'}onClick{'}'}
                   <br/>
                   <span className="bg-rose-500/20 text-rose-300 inline-block w-full px-2">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// ERROR: Missing aria-label (WCAG 4.1.2)
                   </span>
                   <br/>
                   <span className="bg-emerald-500/20 text-emerald-300 inline-block w-full px-2">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aria-label={'{'}label{'}'}
                   </span>
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;{`>`}
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}label{'}'}
                   <br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;{`<`}/button{`>`}
                   <br/>
                   &nbsp;&nbsp;);
                   <br/>
                   {"}"}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1e3f] mb-4">
              Shift accessibility left.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
               Don't wait for the QA phase to fix accessibility debt. Empower your developers to write accessible code from the very first commit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Code2, title: "IDE Extensions", desc: "Real-time linting in VS Code and WebStorm that highlights WCAG violations as you type." },
               { icon: GitMerge, title: "CI/CD Integration", desc: "Block PRs automatically if new code introduces accessibility regressions into your codebase." },
               { icon: Box, title: "Component Libraries", desc: "Pre-built, thoroughly tested accessible React, Vue, and Angular components ready to use." },
             ].map((feature, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:-translate-y-1 transition-transform">
                   <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-[#004bff]" />
                   </div>
                   <h3 className="text-xl font-bold text-[#0a1e3f] mb-3">{feature.title}</h3>
                   <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#004bff] py-20 px-4 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
               Give your developers the ultimate accessibility toolkit.
            </h2>
            <button className="bg-white text-[#004bff] hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg">
               GET API KEYS
            </button>
         </div>
      </section>

      <Footer />
    </div>
  );
}
