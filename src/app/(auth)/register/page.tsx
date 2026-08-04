"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Globe,
  Accessibility,
  MessageSquare,
  Check,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import Logo from "@/components/ui/Logo";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const billing = searchParams.get("billing");
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState("K9#vX2$mL8!pQ4");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password validation regex checks
  const hasMinLength = password.length >= 7;
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!website.trim()) {
      setError("Please enter your website URL to continue.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password requirements before submit
    if (!hasMinLength || !hasMixedCase || !hasNumber) {
      setError("Please meet all password requirements before continuing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, website }),
      });

      const data = await res.json().catch(() => ({ message: "Please restart your Next.js development server (npm run dev) to apply the Prisma database changes." }));

      if (!res.ok) {
        setError(data.message || "Failed to register.");
      } else {
        // Automatically sign in the user
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginRes?.error) {
          // Fallback to login redirect if automatic sign-in fails
          setSuccess(true);
          setTimeout(() => {
            if (plan) {
              router.push(`/login?plan=${plan}&billing=${billing || "yearly"}`);
            } else {
              const encodedSite = encodeURIComponent(website.trim());
              router.push(`/login?trial=1&site=${encodedSite}`);
            }
          }, 2000);
        } else {
          setSuccess(true);
          setTimeout(() => {
            if (plan) {
              router.push(`/checkout?plan=${plan}&billing=${billing || "yearly"}`);
            } else {
              // Redirect to dashboard with trial modal trigger + prefilled website
              const encodedSite = encodeURIComponent(website.trim());
              router.push(`/dashboard?trial=1&site=${encodedSite}`);
            }
          }, 1500);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Helper checkmark circle component
  const ReqCheck = ({ isValid }: { isValid: boolean }) => (
    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${isValid ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 border border-slate-200/80"}`}>
      <Check className="w-2.5 h-2.5 stroke-[3.5]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex flex-col justify-between relative overflow-x-hidden font-sans text-slate-900 select-none">

      {/* HEADER BAR */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-12 py-6 flex items-center justify-between z-10">
        {/* Left: Back button (visible only in step 2) */}
        <div className="flex-1 flex justify-start">
          <AnimatePresence>
            {step === 2 && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => {
                  setStep(1);
                  setShowPasswordPopup(false);
                }}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Back</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Centered Logo */}
        <div className="flex justify-center shrink-0 items-center gap-2">
          <div className="hidden md:block"><Logo height={52} className="self-center" /></div>
          <div className="block md:hidden"><Logo height={32} className="self-center" /></div>
        </div>

        {/* Right: Log in link */}
        <div className="flex-1 flex justify-end text-right">
          <span className="text-xs sm:text-sm font-medium text-slate-500">
            <span className="hidden sm:inline">Already have an account?{" "}</span>
            <Link href="/login" className="font-extrabold text-blue-600 hover:text-blue-700 transition-colors sm:ml-1">
              Log in
            </Link>
          </span>
        </div>
      </header>

      {/* CENTER CARD CONTAINER */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12 z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-0 mb-auto md:my-auto mx-auto bg-white rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-100/80 max-w-4xl w-full p-6 sm:p-8 md:p-14 grid md:grid-cols-2 gap-8 md:gap-16 items-start"
        >
          {/* LEFT COLUMN: Features & Steps */}
          <div className="flex flex-col justify-between h-full min-h-[220px]">
            <div>
              {/* Step indicator capsule dots */}
              <div className="flex items-center gap-1.5 mb-8">
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? "w-8 bg-blue-600" : "w-2 bg-blue-600"}`} />
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`} />
              </div>

              {/* Step Heading */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-[1.2] tracking-tight mb-6">
                {step === 1 ? (
                  "Whatever your accessibility needs, we've got you covered"
                ) : (
                  "Add your details"
                )}
              </h2>

              {/* Step Description */}
              <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                {step === 1 ? (
                  "Start scanning your site and making it accessible with a click."
                ) : (
                  "Add your full name, business email and a password you'll remember."
                )}
              </p>
            </div>

            {/* Bullets List (Visible only on Step 1) */}
            {step === 1 && (
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 leading-snug">
                    Free 7-day trial - no credit card required
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Form Fields */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Registration Successful!</h3>
                  <p className="text-slate-500 text-sm font-semibold">Redirecting to login...</p>
                </motion.div>
              ) : step === 1 ? (
                /* STEP 1 FORM: WEBSITE URL */
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleNextStep}
                  className="space-y-6"
                >
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-500 text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Enter your website <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="flex rounded-xl border border-slate-200/80 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 overflow-hidden transition-all bg-slate-50">
                      <div className="bg-slate-100 border-r border-slate-200/80 px-3.5 flex items-center gap-1.5 text-slate-500 font-bold text-xs select-none shrink-0">
                        <Globe className="w-3.5 h-3.5 text-slate-500" />
                        <span className="hidden sm:inline">www.</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none text-xs font-semibold"
                        placeholder="yourwebsite.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#004bff] hover:bg-[#003edd] text-white font-extrabold py-3 px-6 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 transition-all text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </motion.form>
              ) : (
                /* STEP 2 FORM: ACCOUNT INFO */
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold">
                      {error}
                    </div>
                  )}

                  {/* Continue with Google */}
                  <button
                    type="button"
                    onClick={() => {
                      const callback = website.trim() 
                        ? `/dashboard?trial=1&site=${encodeURIComponent(website.trim())}` 
                        : "/dashboard";
                      signIn("google", { callbackUrl: callback });
                    }}
                    className="w-full bg-white border border-slate-200/85 hover:bg-slate-50 text-slate-700 font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-sm transition-all text-xs tracking-wider uppercase cursor-pointer"
                  >
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.842 1.091 15.114 0 12 0 7.354 0 3.327 2.673 1.341 6.577l3.925 3.188z" />
                      <path fill="#34A853" d="M16.04 15.345c-1.07.728-2.43 1.164-4.04 1.164a7.077 7.077 0 0 1-6.75-4.909l-3.925 3.188c1.986 3.905 6.013 6.577 10.675 6.577 3.09 0 5.864-1.036 7.84-2.827l-3.8-2.993z" />
                      <path fill="#4285F4" d="M23.864 12.273c0-.818-.073-1.636-.218-2.427H12v4.61h6.654a5.69 5.69 0 0 1-2.463 3.73l3.8 2.993c2.218-2.045 4.318-5.073 4.318-8.906z" />
                      <path fill="#FBBC05" d="M5.25 12c0-.527.09-1.036.25-1.527L1.575 7.285A11.954 11.954 0 0 0 0 12c0 1.68.345 3.28.97 4.736l3.913-3.18c-.16-.49-.25-.99-.25-1.556z" />
                    </svg>
                    Continue with Google
                  </button>

                  {/* "or" Divider */}
                  <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-400 font-bold">or</span>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Full name <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                    />
                  </div>

                  {/* Company Email */}
                  <div>
                    <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Enter your company email <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      autoComplete="off"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-200/80 bg-slate-50 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Password <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative z-10">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowPasswordPopup(true)}
                        className="w-full border border-slate-200/80 bg-slate-50 rounded-xl pl-4 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Eye className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </button>
                    </div>

                    {/* Requirements validation bar */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 font-semibold mt-2.5 select-none">
                      <div className="flex items-center gap-1.5">
                        <ReqCheck isValid={hasMinLength} />
                        <span>7+ Characters</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ReqCheck isValid={hasMixedCase} />
                        <span>1 Upper & Lower case</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ReqCheck isValid={hasNumber} />
                        <span>1 Number</span>
                      </div>
                    </div>

                    {/* Transparent Click-Outside Backdrop */}
                    {showPasswordPopup && (
                      <div
                        className="fixed inset-0 z-20 cursor-default"
                        onClick={() => setShowPasswordPopup(false)}
                      />
                    )}

                    {/* Strong Password Generator Popup */}
                    <AnimatePresence>
                      {showPasswordPopup && (
                        <motion.div
                          initial={{ opacity: 0, x: -12, scale: 0.98 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -12, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 lg:left-auto lg:right-[calc(100%+28px)] top-full lg:top-0 mt-2 lg:mt-0 bg-white border border-blue-100 rounded-2xl shadow-[0_15px_45px_rgba(11,60,150,0.16)] p-4.5 z-30 w-full lg:w-[340px] text-left"
                        >
                          {/* Triangle speech bubble pointer arrow for desktop */}
                          <div className="hidden lg:block w-3 h-3 bg-white rotate-45 border-r border-t border-blue-100 absolute -right-[6.5px] top-5 z-31" />

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">🔐</span>
                              <h4 className="text-xs font-black text-slate-800">
                                Suggested Strong Password
                              </h4>
                            </div>
                          </div>

                          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between gap-2 mb-2.5">
                            <code className="text-xs font-mono font-bold text-blue-700 tracking-wider">
                              {suggestedPassword}
                            </code>
                            <button
                              type="button"
                              onClick={() => {
                                const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*";
                                let pass = "";
                                for (let i = 0; i < 14; i++) {
                                  pass += chars.charAt(Math.floor(Math.random() * chars.length));
                                }
                                setSuggestedPassword(pass);
                              }}
                              className="text-[10px] text-blue-600 hover:text-blue-700 font-bold underline border-none bg-transparent cursor-pointer"
                            >
                              Regenerate
                            </button>
                          </div>

                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-3">
                            Use this secure password for your 2all.ai account or type your own.
                          </p>

                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setShowPasswordPopup(false)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-[11px] rounded-lg transition-colors cursor-pointer border-none"
                            >
                              Type my own
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPassword(suggestedPassword);
                                setShowPasswordPopup(false);
                              }}
                              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] rounded-lg transition-colors cursor-pointer border-none shadow-sm shadow-blue-500/20"
                            >
                              Use strong password
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-3.5 pt-2 text-left">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-0.5 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600 shrink-0"
                      />
                      <span className="text-sm font-semibold text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors select-none">
                        I want to receive latest news and accessibility updates from 2all.ai.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        required
                        checked={termsConsent}
                        onChange={(e) => setTermsConsent(e.target.checked)}
                        className="mt-0.5 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600 shrink-0"
                      />
                      <span className="text-sm font-semibold text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors select-none">
                        I agree to the{" "}
                        <Link 
                          href="/terms-of-service" 
                          className="text-blue-600 hover:text-blue-700 font-extrabold underline transition-colors"
                        >
                          Terms of Service
                        </Link>{" "}
                        &{" "}
                        <Link 
                          href="/privacy-notice" 
                          className="text-blue-600 hover:text-blue-700 font-extrabold underline transition-colors"
                        >
                          Privacy Notice
                        </Link>.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !termsConsent}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/15 transition-all text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Sign Up
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* FOOTER: TRUST LOGOS */}
      <footer className="w-full pb-8 pt-4 relative z-10 shrink-0">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-6">
          Trusted by over 100,000 businesses worldwide
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 max-w-4xl mx-auto px-6 select-none opacity-40">
          <span className="font-sans font-black text-lg tracking-tighter text-slate-900 uppercase">TOSHIBA</span>
          <span className="font-serif text-xs tracking-[0.25em] text-slate-900 uppercase">DOLCE & GABBANA</span>
          <span className="font-sans font-bold text-md text-slate-900 lowercase tracking-tight">playmobil</span>
          <span className="font-serif font-black text-md tracking-widest text-slate-900 uppercase">SEIKO</span>
          <span className="font-sans font-extrabold text-md text-slate-900 uppercase tracking-tight">Panasonic</span>
        </div>
      </footer>

    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
