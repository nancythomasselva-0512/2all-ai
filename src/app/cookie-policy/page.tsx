"use client";

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-6 pb-10 relative overflow-hidden shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="flex justify-start text-left mb-3">
            <Breadcrumbs theme="dark" items={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]} />
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-center">
              Cookie <span className="text-[#C8FF4D]">Policy</span>
            </h1>
            <p className="text-slate-200 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed text-center">
              Understand how 2all.ai uses cookies and similar tracking technologies to improve your experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-8 bg-white border border-slate-200/80 my-8 rounded-3xl shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">1. What Are Cookies?</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Cookies are small text files that are stored on your device when you visit websites. They help websites remember your preferences, keep you logged in, and understand how you interact with our platform.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">2. How We Use Cookies</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            2all.ai uses essential cookies to ensure key platform security and functionality, preference cookies to save your language and accessibility widget settings, and analytics cookies to measure feature performance.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">3. Managing Your Cookie Preferences</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            You can modify your browser settings to decline or delete cookies at any time. Please note that disabling essential cookies may impact certain interactive features on our platform.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">4. Contact Information</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            If you have any questions regarding our Cookie Policy, please reach out to our privacy team at <a href="mailto:support@2all.ai" className="text-blue-600 font-semibold underline">support@2all.ai</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
