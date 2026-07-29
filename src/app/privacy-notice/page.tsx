"use client";

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function PrivacyNoticePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0b3c96] to-[#041d57] text-white pt-6 pb-10 relative overflow-hidden shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="flex justify-start text-left mb-3">
            <Breadcrumbs theme="dark" items={[{ label: "Home", href: "/" }, { label: "Privacy Notice" }]} />
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-center">
              Privacy <span className="text-[#C8FF4D]">Notice</span>
            </h1>
            <p className="text-slate-200 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed text-center">
              Learn how 2all.ai collects, protects, and respects your personal data.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-8 bg-white border border-slate-200/80 my-8 rounded-3xl shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">1. Information We Collect</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            We collect information you provide directly to us when creating an account, requesting a demo, or subscribing to our services, including name, business email address, organization name, and domain URLs.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">2. How We Use Information</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            We use collected data to operate, maintain, and enhance our accessibility auditing platform, process subscriptions, provide technical support, and send compliance alerts or updates.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">3. Data Security & Protection</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            We implement industry-standard encryption, strict access controls, and security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">4. Cookies & Tracking Technologies</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            We use essential session cookies to remember your preferences and keep you logged in safely. You can configure your browser to decline non-essential cookies.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-2">5. Privacy Inquiries</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            If you have any questions or data requests regarding this Privacy Notice, please contact our Data Protection Officer at <a href="mailto:privacy@2all.ai" className="text-blue-600 font-bold underline">privacy@2all.ai</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
