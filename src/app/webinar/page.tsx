import React from 'react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function WebinarPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <Breadcrumbs theme="light" items={[ { label: "Home", href: "/" }, { label: "Webinar" } ]} />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            On-Demand Webinars
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Watch our recorded sessions on web accessibility.
          </p>
          <div className="pt-8">
            <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
              Return Home
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
