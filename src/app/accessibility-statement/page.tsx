"use client";

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-6 pb-10 relative overflow-hidden shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="flex justify-start text-left mb-3">
            <Breadcrumbs theme="dark" items={[{ label: "Home", href: "/" }, { label: "Accessibility Statement" }]} />
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-center">
              Accessibility <span className="text-[#C8FF4D]">Statement</span>
            </h1>
            <p className="text-slate-200 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed text-center">
              2all.ai is committed to digital inclusion and ensuring that our platform is accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-8 bg-white border border-slate-200/80 my-8 rounded-3xl shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">1. Our Commitment</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            At 2all.ai, we strive to make digital experiences inclusive for people of all abilities. We actively work to align our website and AI accessibility tools with WCAG 2.1 Level AA, ADA, and Section 508 guidelines.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">2. Standards & Testing</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            We continuously perform automated scanning, manual code audits, and assistive technology testing (screen readers, keyboard-only navigation, and high contrast modes) to ensure optimal usability.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">3. Feedback & Assistance</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            We welcome your feedback on the accessibility of 2all.ai. If you encounter accessibility barriers on any part of our website, please notify us at <a href="mailto:support@2all.ai" className="text-blue-600 font-semibold underline">support@2all.ai</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
