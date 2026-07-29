"use client";

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-6 pb-10 relative overflow-hidden shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="flex justify-start text-left mb-3">
            <Breadcrumbs theme="dark" items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-center">
              Terms of <span className="text-[#C8FF4D]">Service</span>
            </h1>
            <p className="text-slate-200 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed text-center">
              Please read these terms carefully before using our accessibility software and services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-8 bg-white border border-slate-200/80 my-8 rounded-3xl shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">1. Agreement to Terms</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            By accessing or using 2all.ai services, widget, and platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">2. Use License & Platform Accessibility</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            2all.ai grants you a revocable, non-exclusive, non-transferable, limited license to install and use our accessibility widget and compliance audit tools on registered domains in accordance with your subscription plan.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">3. User Responsibilities & Data</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">4. Disclaimers & Compliance Standards</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            While 2all.ai tools significantly assist in improving compliance with WCAG 2.2, ADA, and Section 508 guidelines, digital accessibility is an ongoing process. Automated tools complement, but do not replace, human expert audits.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">5. Contact Information</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            If you have questions about these Terms of Service, please contact our legal team at <a href="mailto:legal@2all.ai" className="text-blue-600 font-bold underline">legal@2all.ai</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
