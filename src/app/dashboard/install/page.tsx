"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  CreditCard,
  FileText,
  Code,
  BarChart3,
  ShieldCheck,
  User,
  Award,
  Globe,
  Rocket,
  HelpCircle,
  ArrowUpRight,
  Check,
} from "lucide-react";
import InstallCodeBlock from "@/components/dashboard/InstallCodeBlock";
import PageHelpTooltip from "@/components/ui/PageHelpTooltip";
import DemoModal from "@/components/marketing/DemoModal";

const PLAN_CARDS = [
  {
    name: "Micro",
    price: "$490",
    per: "/yr",
    features: ["Up to 999 pages/month", "AI-Powered widget", "Standard support"],
    href: "/checkout?plan=micro&billing=yearly",
    popular: false,
  },
  {
    name: "Business",
    price: "$1,490",
    per: "/yr",
    features: ["Up to 29,999 pages/month", "Full widget customization", "Priority support"],
    href: "/checkout?plan=business&billing=yearly",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    features: ["Unlimited pages", "Full AI suite", "Dedicated account manager"],
    href: null,
    popular: false,
  },
];

type Tab =
  | "plan"
  | "statement"
  | "install"
  | "remediation"
  | "audit"
  | "owner"
  | "proof";

const NAV_ITEMS: { label: string; icon: any; tab: Tab }[] = [
  { label: "Plan and payments", icon: CreditCard, tab: "plan" },
  { label: "Accessibility statement", icon: FileText, tab: "statement" },
  { label: "Install and customize widget", icon: Code, tab: "install" },
  { label: "Remediation report", icon: BarChart3, tab: "remediation" },
  { label: "Audit report", icon: ShieldCheck, tab: "audit" },
  { label: "License owner info", icon: User, tab: "owner" },
  { label: "Proof of effort toolkit", icon: Award, tab: "proof" },
];

function PlanContent() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight font-['Times_New_Roman']">Plan and payments</h1>

      {/* Current plan banner */}
      <div className="bg-[#eef4ff] border border-blue-100 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-blue-600 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-900 uppercase tracking-widest font-sans">Current Plan</p>
            <p className="text-sm font-semibold text-blue-900 tracking-tight leading-snug font-sans">Free Trial</p>
            <p className="text-sm font-normal text-blue-900 leading-relaxed font-sans mt-0.5">Your free trial gives you access to basic features. Upgrade to unlock full AI accessibility.</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0">Active</span>
      </div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {PLAN_CARDS.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white border rounded-2xl p-6 flex flex-col shadow-sm ${
              plan.popular ? "border-blue-500 ring-1 ring-blue-200" : "border-slate-200/80"
            }`}
          >
            {plan.popular && (
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2">
                Most Popular
              </span>
            )}
            <h3 className="text-base font-black text-slate-800">{plan.name}</h3>
            <p className="text-2xl font-black text-slate-900 mt-1 mb-3">
              {plan.price}
              {plan.per && <span className="text-xs text-slate-400 font-normal ml-1">{plan.per}</span>}
            </p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-blue-500 shrink-0 stroke-[2.5]" />
                  {f}
                </li>
              ))}
            </ul>
            {plan.href ? (
              <Link
                href={plan.href}
                className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-center transition-all ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Upgrade Now
              </Link>
            ) : (
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-center bg-slate-900 hover:bg-blue-600 text-white cursor-pointer border-none transition-colors"
              >
                Contact Sales
              </button>
            )}
          </div>
        ))}
      </div>

      <DemoModal 
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
}

function ComingSoonContent({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight font-['Times_New_Roman']">{title}</h1>
      <div className="bg-white border border-slate-200/80 rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
          <Rocket className="w-7 h-7 text-blue-500 stroke-[2]" />
        </div>
        <h3 className="text-base font-black text-slate-800">Coming soon</h3>
        <p className="text-xs font-semibold text-slate-400 max-w-xs">
          This section is being built and will be available shortly. Check back soon!
        </p>
      </div>
    </div>
  );
}

/* ── Shared empty-state for locked report tables ── */
function EmptyTableState({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3">
      <div className="relative">
        <div className="w-16 h-12 bg-slate-100 rounded-lg border border-slate-200 flex items-end justify-center pb-2">
          <div className="w-8 h-1.5 bg-slate-200 rounded-full mb-1" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-400" />
        </div>
      </div>
      <p className="text-sm font-black text-slate-700">{message}</p>
      <p className="text-xs text-slate-400 font-semibold">{sub}</p>
    </div>
  );
}

/* ── Upgrade banner (purple) ── */
function UpgradeBanner({ title, sub, cta }: { title: string; sub: string; cta?: string }) {
  return (
    <div className="bg-[#f0edff] border border-purple-200/60 rounded-2xl p-4 flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-white stroke-[2.5]">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-purple-900 tracking-tight leading-snug font-sans">{title}</p>
          <p className="text-sm font-normal text-purple-700 leading-relaxed font-sans mt-0.5">{sub}</p>
        </div>
      </div>
      <Link
        href="/dashboard/install?tab=plan"
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-extrabold rounded-xl uppercase tracking-wider transition-colors shrink-0"
      >
        {cta || "Choose a Plan"}
      </Link>
    </div>
  );
}

function RemediationReportContent() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center font-['Times_New_Roman']">
        Remediation report
        <PageHelpTooltip
          title="Remediation Report"
          purpose="View a detailed monthly record of all automated code fixes and accessibility corrections applied by 2all.ai to your website."
          features={[
            "Track automated ARIA attribute and contrast fixes",
            "View date-stamped remediations by WCAG category",
            "Export proof of ongoing accessibility remediation for legal compliance"
          ]}
        />
      </h1>

      <div className="bg-[#eef4ff] border border-blue-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-inner">
          <BarChart3 className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="space-y-2 text-left font-sans">
          <p className="text-sm font-bold text-blue-900 font-sans tracking-normal">
            Monthly Remediation Tracking Report
          </p>
          <p className="text-sm font-normal text-blue-900 leading-relaxed font-sans">
            Get a detailed monthly report of all accessibility remediations and code changes 2all.ai has applied to your website.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5">
          <UpgradeBanner
            title="Advanced feature!"
            sub="Upgrade your 2all.ai plan to gain access to remediation reports"
          />
          {/* Table header */}
          <div className="grid grid-cols-4 px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <span>Date</span>
            <span className="text-center">Remediations</span>
            <span className="text-center">Categories</span>
            <span className="text-right">Action</span>
          </div>
          <EmptyTableState
            message="No remediation reports available yet."
            sub="Remediation reports will show up here"
          />
        </div>
      </div>
    </div>
  );
}

/* ── 2. Audit Report ── */
function AuditReportContent() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight font-['Times_New_Roman']">
        Audit report
      </h1>

      <div className="bg-[#eef4ff] border border-blue-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-inner">
          <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="space-y-2 text-left font-sans">
          <p className="text-sm font-bold text-blue-900 font-sans tracking-normal">
            Monthly Accessibility Audit History
          </p>
          <p className="text-sm font-normal text-blue-900 leading-relaxed font-sans">
            View the history of all monthly accessibility audits run for your websites and download the reports.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5">
          <UpgradeBanner
            title="Buy a plan!"
            sub="Gain access to Audit reports by purchasing a plan."
          />
          {/* Table header */}
          <div className="grid grid-cols-3 px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <span>Date</span>
            <span className="text-center">Verdict</span>
            <span className="text-right">Action</span>
          </div>
          <EmptyTableState
            message="No audit reports available yet."
            sub="Audit reports will show up here."
          />
        </div>
      </div>
    </div>
  );
}

/* ── 3. License Owner Info ── */
function LicenseOwnerContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Fetch existing data on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/user/license-owner");
        if (res.ok) {
          const data = await res.json();
          setName(data.name ?? "");
          setEmail(data.email ?? "");
          // Split stored phone into code + digits if it looks like "+1 5551234"
          if (data.phone) {
            const match = data.phone.match(/^(\+\d+)\s*(.*)$/);
            if (match) {
              setPhoneCode(match[1]);
              setPhoneDigits(match[2]);
            } else {
              setPhoneDigits(data.phone);
            }
          }
        }
      } catch {
        // silently fail; user can still fill in manually
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setStatus(null);
    setSaving(true);
    try {
      const phone = phoneDigits.trim() ? `${phoneCode} ${phoneDigits.trim()}` : "";
      const res = await fetch("/api/user/license-owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      let data: any = {};
      try { data = await res.json(); } catch { /* non-JSON response */ }
      if (!res.ok) {
        setStatus({ type: "error", msg: data.error || `Server error (${res.status}). Please try again.` });
      } else {
        setStatus({ type: "success", msg: "License owner info saved successfully." });
      }
    } catch (err: any) {
      setStatus({ type: "error", msg: err?.message || "Failed to reach server. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight font-['Times_New_Roman']">
        License owner info
      </h1>

      <div className="bg-[#eef4ff] border border-blue-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-inner">
          <User className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="space-y-2 text-left font-sans">
          <p className="text-sm font-bold text-blue-900 font-sans tracking-normal">
            License Owner & Organization Details
          </p>
          <p className="text-sm font-normal text-blue-900 leading-relaxed font-sans">
            This information is used in the accessibility statement and for sending account notifications based on your preferences in account settings.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6">
        {loading ? (
          <div className="flex items-center gap-3 py-6 text-slate-400">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold">Loading your info…</span>
          </div>
        ) : (
          <div className="space-y-5 max-w-lg">
            {/* Status feedback */}
            {status && (
              <div className={`px-4 py-3 rounded-xl text-xs font-semibold border ${
                status.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}>
                {status.msg}
              </div>
            )}

            {/* Website owner's name */}
            <div className="grid grid-cols-[220px_1fr] items-center gap-4">
              <label className="text-sm font-black text-slate-700">Website owner&apos;s name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Smith"
                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 w-full focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Website owner's email */}
            <div className="grid grid-cols-[220px_1fr] items-center gap-4">
              <label className="text-sm font-black text-slate-700">Website owner&apos;s email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. jane@example.com"
                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 w-full focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Phone number */}
            <div className="grid grid-cols-[220px_1fr] items-center gap-4">
              <label className="text-sm font-black text-slate-700">Phone number</label>
              <div className="flex items-center gap-2">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="border border-slate-200 rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-400 transition-all bg-white shrink-0"
                >
                  <option value="+1">🇺🇸 United States (+1)</option>
                  <option value="+44">🇬🇧 UK (+44)</option>
                  <option value="+91">🇮🇳 India (+91)</option>
                  <option value="+61">🇦🇺 Australia (+61)</option>
                  <option value="+49">🇩🇪 Germany (+49)</option>
                  <option value="+33">🇫🇷 France (+33)</option>
                </select>
                <input
                  type="tel"
                  value={phoneDigits}
                  onChange={(e) => setPhoneDigits(e.target.value)}
                  placeholder="Phone digits here..."
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 flex-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>

            {/* Save button */}
            <div className="pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-extrabold rounded-xl cursor-pointer border-none transition-colors flex items-center gap-2"
              >
                {saving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />}
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 4. Proof of Effort Toolkit ── */
function ProofOfEffortContent() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight font-['Times_New_Roman']">
        Proof of effort toolkit
      </h1>

      <div className="bg-[#eef4ff] border border-blue-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-inner">
          <Award className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="space-y-2 text-left font-sans">
          <p className="text-sm font-bold text-blue-900 font-sans tracking-normal">
            Proof of Effort & Legal Compliance Toolkit
          </p>
          <p className="text-sm font-normal text-blue-900 leading-relaxed font-sans">
            You&apos;ve taken steps to make your website accessible. The proof of effort toolkit compiles key documentation
            that showcases your commitment to accessibility. If your website&apos;s accessibility is ever challenged (i.e.
            you receive a demand letter), you&apos;ll have evidence to demonstrate your efforts and respond with confidence.
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5">
          <UpgradeBanner
            title="Buy a plan"
            sub="Gain access to Proof of Effort documentation by purchasing a plan."
          />
          <EmptyTableState
            message="No Proof of Effort documentation available yet"
            sub="Your Proof of Effort zip package will show up here, ready for download."
          />
        </div>
      </div>
    </div>
  );
}

function AccessibilityStatementContent({ domain }: { domain: string }) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-4 font-['Times_New_Roman']">
      {/* Top bar: date + print button */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-normal text-slate-600 font-['Times_New_Roman']">{today}</span>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-semibold rounded-xl cursor-pointer border-none transition-colors font-['Times_New_Roman']"
        >
          Print
        </button>
      </div>

      {/* Document card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden font-['Times_New_Roman']">
        {/* Document header */}
        <div className="p-8 pb-6 border-b border-slate-100 font-['Times_New_Roman']">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-black text-blue-600 tracking-tight font-['Times_New_Roman']">Accessibility Statement</h1>
              <div className="flex items-center gap-3 mt-2 font-['Times_New_Roman']">
                <span className="text-[14px] font-normal text-slate-500 font-['Times_New_Roman']">{domain}</span>
                <span className="text-slate-300">|</span>
                <span className="text-[14px] font-normal text-slate-500 font-['Times_New_Roman']">{today}</span>
              </div>
            </div>
            <div className="shrink-0 text-right font-['Times_New_Roman']">
              <p className="no-scale text-[13px] font-normal text-slate-500 mb-1 font-['Times_New_Roman']">Issued by</p>
              <div className="flex items-center gap-1.5 justify-end font-['Times_New_Roman']">
                <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 stroke-white stroke-[2.5]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-[15px] font-bold text-slate-800 font-['Times_New_Roman']">2all.ai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Document body */}
        <div className="p-8 space-y-8 text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman']">
          <div>
            <h2 className="text-[16px] font-bold text-slate-900 font-['Times_New_Roman'] mb-3.5 mt-0 block">Compliance status</h2>
            <div className="space-y-3.5">
              <p className="no-scale text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman'] m-0">
                We firmly believe that the internet should be available and accessible to anyone and are committed to
                providing a website that is accessible to the broadest possible audience, regardless of ability.
              </p>
              <p className="no-scale text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman'] m-0">
                To fulfill this, we aim to adhere as strictly as possible to the World Wide Web Consortium's (W3C) Web
                Content Accessibility Guidelines 2.2 (WCAG 2.2) at the AA level. These guidelines explain how to make
                web content accessible to people with a wide array of disabilities. Complying with those guidelines
                helps us ensure that the website is accessible to blind people, people with motor impairments, visual
                impairment, cognitive disabilities, and more.
              </p>
              <p className="no-scale text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman'] m-0">
                This website utilizes various technologies that are meant to make it as accessible as possible at all times.
                We utilize an accessibility interface that allows persons with specific disabilities to adjust the website's
                UI (user interface) and design it to their personal needs.
              </p>
              <p className="no-scale text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman'] m-0">
                Additionally, the website utilizes an AI-based application that runs in the background and optimizes its
                accessibility level constantly. This application remediates the website's HTML, adapts its functionality
                and behavior for screen-readers used by blind users, and for keyboard functions used by individuals with
                motor impairments.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-slate-900 font-['Times_New_Roman'] mb-3.5 mt-0 block">Screen-reader and keyboard navigation</h2>
            <p className="no-scale text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman'] m-0">
              Our website implements the ARIA attributes (Accessible Rich Internet Applications) technique, alongside
              various different behavioral changes, to ensure blind users visiting with screen-readers are able to
              read, comprehend, and enjoy the website's functions. As soon as a user with a screen-reader enters your
              website, they immediately receive a prompt to enter the Screen-Reader Profile so they can browse and
              operate your website effectively.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-slate-900 font-['Times_New_Roman'] mb-3.5 mt-0 block">Disability profiles supported</h2>
            <ul className="list-none space-y-3 p-0 m-0 font-['Times_New_Roman']">
              {[
                { name: "Epilepsy Safe Mode", desc: "Reduces the risk of seizures by eliminating flashing or blinking animations and risky color combinations." },
                { name: "Visually Impaired Mode", desc: "Optimizes the website for the experience of users with visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others." },
                { name: "Cognitive Disability Mode", desc: "Assists with reading and focusing by significantly reducing the distracting elements." },
                { name: "ADHD Friendly Mode", desc: "Reduces distractions and improves focus by enabling a reading bar, a reading mask, and suppressing irrelevant elements." },
                { name: "Blind Users (Screen-reader)", desc: "Optimizes the website's compatibility with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack." },
                { name: "Keyboard Navigation Profile", desc: "Enables motor-impaired persons to operate the website using the keyboard Tab, Shift+Tab, and the Enter keys." },
              ].map((item) => (
                <li key={item.name} className="flex items-start gap-2.5 text-[15px] font-normal text-slate-700 font-['Times_New_Roman']">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>
                  <span className="font-['Times_New_Roman']"><strong className="font-bold text-slate-900 font-['Times_New_Roman']">{item.name}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-slate-900 font-['Times_New_Roman'] mb-3.5 mt-0 block">Additional UI, design, and readability adjustments</h2>
            <p className="no-scale text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman'] m-0">
              In addition to the profiles above, we provide users the ability to change font sizes, spacing, alignment,
              colors, and more via accessibility tools built into our widget. Changes are stored via browser cookies and
              persist across sessions.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-slate-900 font-['Times_New_Roman'] mb-3.5 mt-0 block">Assistive technology support</h2>
            <p className="no-scale text-[15px] font-normal text-slate-700 leading-relaxed font-['Times_New_Roman'] m-0">
              We aim to support the widest array of browsers and assistive technologies as possible, so our users can
              choose the best fitting tools for them, with as few limitations as possible. We support all major systems
              including Windows and Mac ecosystems, major browsers including Chrome, Firefox, Safari, and Opera,
              screen readers including NVDA and JAWS for Windows and VoiceOver for Mac and iOS.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-2.5 font-['Times_New_Roman']">
            <h2 className="text-[15px] font-bold text-slate-900 font-['Times_New_Roman'] mb-2 mt-0 block">Got feedback or encountered an issue?</h2>
            <p className="no-scale text-[14px] font-normal text-slate-600 font-['Times_New_Roman'] m-0">
              We are always striving to improve our accessibility. If you find anything broken or have suggestions,
              please contact us and we will be happy to assist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Accessibility Mock Button ── */
function AccessibilityMockButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 transition-all cursor-pointer border-none">
        <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 fill-none stroke-current stroke-[2.5]">
          <path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.5 12h9M12 8v8M10 22v-6h4v6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function InstallPageInner() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "install";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  // Real domain & API key dynamic data
  const [domains, setDomains] = useState<any[]>([]);
  const [selectedDomain, setSelectedDomain] = useState("yourwebsite.com");
  const [loading, setLoading] = useState(true);

  // Sync if URL changes (e.g. when navigated from billing link)
  useEffect(() => {
    const t = searchParams.get("tab") as Tab;
    if (t) setActiveTab(t);
  }, [searchParams]);

  useEffect(() => {
    async function fetchDomains() {
      try {
        setLoading(true);
        const res = await fetch("/api/domains");
        if (res.ok) {
          const data = await res.json();
          setDomains(data);
          if (data.length > 0) {
            setSelectedDomain(data[0].domain);
          }
        }
      } catch (err) {
        console.error("Failed to fetch domains:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDomains();
  }, []);

  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 7);
  const formattedExpDate = expDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const renderContent = () => {
    switch (activeTab) {
      case "plan":
        return <PlanContent />;
      case "install":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight font-['Times_New_Roman']">
              Install and customize widget
            </h1>

            {/* Trial Expiry Alert Box */}
            <div className="bg-[#eef4ff] border border-blue-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-inner">
                <Rocket className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="space-y-2 text-left font-sans">
                <p className="text-sm font-bold text-blue-900 font-sans tracking-normal">
                  Your free trial is active and will expire on {formattedExpDate}.
                </p>
                <p className="text-sm font-normal text-blue-900 leading-relaxed font-sans">
                  Next, install 2all.ai on your website and help make it accessible.
                </p>
              </div>
            </div>

            {/* Code Block & Tabs Component */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
              <InstallCodeBlock domain={selectedDomain} onDomainChange={setSelectedDomain} />
            </div>

            {/* Need Help footer banner */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between text-left shadow-sm">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                <span className="text-xs font-bold text-slate-600">Need help with setup? Check out our step-by-step installation guides</span>
              </div>
              <a href="#" className="flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">
                Check out guides
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </a>
            </div>
          </div>
        );
      case "statement":
        return <AccessibilityStatementContent domain={selectedDomain} />;
      case "remediation":
        return <RemediationReportContent />;
      case "audit":
        return <AuditReportContent />;
      case "owner":
        return <LicenseOwnerContent />;
      case "proof":
        return <ProofOfEffortContent />;
      default:
        return null;
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start select-none text-left">

      {/* SIDEBAR NAVIGATION: (3 cols) */}
      <div className="lg:col-span-3 space-y-6">

        {/* Back Link */}
        <Link
          href="/dashboard/domains"
          className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 text-sm font-black transition-colors py-1"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" />
          All licenses
        </Link>

        {/* Domain Selector Dropdown Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shrink-0">
              <Globe className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">DOMAIN</span>
              {domains.length > 0 ? (
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="block w-full bg-transparent text-sm font-black text-slate-900 focus:outline-none cursor-pointer border-none p-0 mt-0.5"
                >
                  {domains.map((d) => (
                    <option key={d.id} value={d.domain}>
                      {d.domain}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="block text-sm font-black text-slate-900 mt-0.5">yourwebsite.com</span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Tab Nav */}
        <nav className="space-y-1 bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-sm">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all cursor-pointer border-none ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-black"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 stroke-[2.5] shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

      </div>

      {/* MAIN CONTENT AREA: (9 cols) */}
      <div className="lg:col-span-9 space-y-6">
        {renderContent()}
      </div>

      {/* Dashboard fixed Alex widget demo */}
      <AccessibilityMockButton />
    </div>
  );
}

export default function InstallPage() {
  return (
    <Suspense fallback={null}>
      <InstallPageInner />
    </Suspense>
  );
}

