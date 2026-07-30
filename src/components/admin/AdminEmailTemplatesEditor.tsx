"use client";

import React, { useState, useEffect } from "react";
import { Mail, Save, Code, CheckCircle2, Info, Type, Sparkles, AlertCircle } from "lucide-react";

interface TemplateItem {
  subject: string;
  bannerText?: string;
  greetingText?: string;
  messageContent?: string;
  ctaText?: string;
  ctaLink?: string;
  footerNote?: string;
  body: string;
}

interface TemplatesState {
  [key: string]: TemplateItem | undefined;
}

const TEMPLATE_KEYS = [
  { id: "demoConfirmedCustomer", label: "📅 Confirmed Demo (Customer)", category: "Demo System", desc: "Sent to customer when demo meeting slot is confirmed." },
  { id: "demoPendingCustomer", label: "⏳ Pending Demo (Customer)", category: "Demo System", desc: "Sent to customer when they skip instant slot selection." },
  { id: "demoAdminAction", label: "⚡ Action Required (Admin Alert)", category: "Demo System", desc: "Sent to admin when customer skips slot, with 1-click slot buttons." },
  { id: "welcomeUser", label: "👋 Welcome & Registration (User)", category: "Authentication", desc: "Sent to new users when registering an account." },
  { id: "paymentSuccess", label: "💳 Payment & Receipt (User)", category: "Billing", desc: "Sent to users upon purchasing a subscription plan." },
  { id: "scriptInstalledUser", label: "💻 Widget Script Guide (User)", category: "Product Integration", desc: "Sent to users when widget script is ready for website installation." },
];

const DEFAULT_TEMPLATES: Record<string, TemplateItem> = {
  demoConfirmedCustomer: {
    subject: "[CONFIRMED DEMO] Your 2all.ai Demo is Scheduled for {{meetingSlot}}",
    bannerText: "MEETING CONFIRMED",
    greetingText: "Hello {{leadName}} & 2all.ai Team,",
    messageContent: "This email confirms your 1-on-1 enterprise accessibility demonstration request for website {{leadWebsite}}. Your meeting slot is confirmed for {{meetingSlot}}. Our expert engineering team will walk you through automated WCAG 2.1 AA auditing, real-time widget controls, and ADA compliance remediation.",
    ctaText: "📅 Add to Google Calendar",
    ctaLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=2all.ai+Accessibility+Demo+Session&details=Live+1-on-1+web+accessibility+demo+and+compliance+audit+walkthrough&location={{meetLinkEnc}}",
    footerNote: "Need to reschedule or invite team members? Reach out to support@2all.ai.",
    body: ""
  },
  demoPendingCustomer: {
    subject: "2all.ai Demo Request Received - We will assign your meeting slot shortly!",
    bannerText: "DEMO REQUEST RECEIVED",
    greetingText: "Hello {{leadName}} & Team,",
    messageContent: "Thank you for requesting an enterprise accessibility demonstration for website {{leadWebsite}}. You skipped instant slot selection. Our enterprise team is reviewing your site and will send your confirmed meeting time slot along with your video call join link shortly.",
    ctaText: "Visit 2all.ai Support",
    ctaLink: "{{baseUrl}}/contact-us",
    footerNote: "Need immediate assistance? Contact our team directly at support@2all.ai.",
    body: ""
  },
  demoAdminAction: {
    subject: "[ACTION REQUIRED] Demo Request from {{leadName}} - Assign Slot",
    bannerText: "ENTERPRISE DEMO ALERT",
    greetingText: "Hello {{leadName}} & 2all.ai Team,",
    messageContent: "This email confirms the 1-on-1 enterprise accessibility demonstration request for website {{leadWebsite}}.",
    ctaText: "Open Admin Console",
    ctaLink: "{{baseUrl}}/admin/dashboard",
    footerNote: "This lead request is automatically logged in your Admin Dashboard Console.",
    body: ""
  },
  welcomeUser: {
    subject: "Welcome to 2all.ai Accessibility Platform!",
    bannerText: "ACCOUNT REGISTERED",
    greetingText: "Welcome {{userName}}!",
    messageContent: "We are thrilled to welcome you to 2all.ai! Your accessibility workspace account has been created successfully. You can now access automated web accessibility scanning, WCAG 2.1 Level AA compliance auditing, and instant widget embed scripts directly from your dashboard.",
    ctaText: "GO TO YOUR DASHBOARD",
    ctaLink: "{{baseUrl}}/dashboard",
    footerNote: "Need help integrating your site? Contact our onboarding team at support@2all.ai.",
    body: ""
  },
  paymentSuccess: {
    subject: "Payment Confirmed - Your 2all.ai {{planName}} Subscription is Active!",
    bannerText: "PAYMENT SUCCESSFUL",
    greetingText: "Hi {{userName}},",
    messageContent: "Thank you for choosing 2all.ai! We are pleased to confirm that your payment of ${{amount}} USD was processed successfully. Your {{planName}} subscription is now active with full access to automated scanning, continuous monitoring, and priority remediation support.",
    ctaText: "ACCESS YOUR SUBSCRIPTION",
    ctaLink: "{{baseUrl}}/dashboard",
    footerNote: "Questions about your transaction or invoice? Contact billing@2all.ai.",
    body: ""
  },
  scriptInstalledUser: {
    subject: "Your 2all.ai Accessibility Script is Ready for Integration!",
    bannerText: "SCRIPT INTEGRATION READY",
    greetingText: "Hi {{userName}},",
    messageContent: "Your accessibility widget script has been compiled for domain {{domainUrl}}. You can now copy and paste the 1-line script tag into your website header to enable real-time WCAG compliance and assistive reading tools.",
    ctaText: "GET EMBED SCRIPT",
    ctaLink: "{{baseUrl}}/dashboard/install",
    footerNote: "Need developer integration support? Reach our engineering team at support@2all.ai.",
    body: ""
  }
};

const AVAILABLE_VARIABLES: Record<string, string[]> = {
  demoConfirmedCustomer: ["{{leadName}}", "{{leadEmail}}", "{{leadPhone}}", "{{leadWebsite}}", "{{meetingSlot}}", "{{meetLink}}"],
  demoPendingCustomer: ["{{leadName}}", "{{leadEmail}}", "{{leadPhone}}", "{{leadWebsite}}"],
  demoAdminAction: ["{{leadName}}", "{{leadEmail}}", "{{leadPhone}}", "{{leadWebsite}}", "{{slotButtonsHtml}}", "{{baseUrl}}"],
  welcomeUser: ["{{userName}}", "{{userEmail}}", "{{baseUrl}}"],
  paymentSuccess: ["{{userName}}", "{{planName}}", "{{amount}}", "{{baseUrl}}"],
  scriptInstalledUser: ["{{userName}}", "{{domainUrl}}", "{{baseUrl}}"],
};

export default function AdminEmailTemplatesEditor() {
  const [templates, setTemplates] = useState<TemplatesState>({});
  const [activeKey, setActiveKey] = useState<string>("demoAdminAction");
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/admin/email-templates");
      if (res.ok) {
        const data = await res.json();
        setTemplates(data.templates || {});
      }
    } catch (e) {
      console.error("Failed to fetch email templates", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const defaultForActive = DEFAULT_TEMPLATES[activeKey] || DEFAULT_TEMPLATES["demoAdminAction"];
  const activeData = templates[activeKey];

  const currentTemplate: TemplateItem = {
    subject: activeData?.subject || defaultForActive.subject,
    bannerText: activeData?.bannerText || defaultForActive.bannerText,
    greetingText: activeData?.greetingText || defaultForActive.greetingText,
    messageContent: activeData?.messageContent || defaultForActive.messageContent,
    ctaText: activeData?.ctaText !== undefined ? activeData.ctaText : defaultForActive.ctaText,
    ctaLink: activeData?.ctaLink || defaultForActive.ctaLink,
    footerNote: activeData?.footerNote || defaultForActive.footerNote,
    body: activeData?.body || defaultForActive.body,
  };

  const updateField = (field: keyof TemplateItem, val: string) => {
    setTemplates(prev => {
      const existing = prev[activeKey] || defaultForActive;
      const updated = { ...existing, [field]: val };
      
      // Auto-recompile body HTML if editing in visual mode
      if (editorMode === "visual") {
        const banner = updated.bannerText || defaultForActive.bannerText;
        const greeting = updated.greetingText || defaultForActive.greetingText;
        const message = updated.messageContent || defaultForActive.messageContent;
        const ctaText = updated.ctaText !== undefined ? updated.ctaText : defaultForActive.ctaText;
        const ctaLink = updated.ctaLink || defaultForActive.ctaLink;
        const footer = updated.footerNote || defaultForActive.footerNote;

        let clientDetailsBlock = "";
        if (activeKey === "demoAdminAction" || activeKey === "demoConfirmedCustomer") {
          clientDetailsBlock = `
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
    <h4 style="margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">📋 CLIENT DETAILS</h4>
    <div><strong>Name:</strong> {{leadName}}</div>
    <div><strong>Email:</strong> <a href="mailto:{{leadEmail}}" style="color: #004bff;">{{leadEmail}}</a></div>
    <div><strong>Phone:</strong> {{leadPhone}}</div>
    <div><strong>Website:</strong> <a href="{{leadWebsite}}" target="_blank" style="color: #004bff;">{{leadWebsite}}</a></div>
  </div>`;
        }

        let paymentDetailsBlock = "";
        if (activeKey === "paymentSuccess") {
          paymentDetailsBlock = `
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
    <div style="margin-bottom: 6px;"><strong>Plan:</strong> {{planName}}</div>
    <div style="margin-bottom: 6px;"><strong>Amount Paid:</strong> $\${amount} USD</div>
    <div><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">SUCCESSFUL</span></div>
  </div>`;
        }

        let adminSlotButtonsBlock = "";
        if (activeKey === "demoAdminAction") {
          adminSlotButtonsBlock = `
  <div style="background-color: #eef2ff; border: 1px solid #c7d2fe; border-radius: 14px; padding: 18px; margin: 24px 0;">
    <h4 style="margin: 0 0 12px 0; color: #1e1b4b; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em;">⚡ 1-Click Meeting Slot Assignment (Select below to auto-email client)</h4>
    <div style="display: block;">
      {{slotButtonsHtml}}
    </div>
  </div>`;
        }

        updated.body = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
    <h2 style="color: #004bff; margin: 0; font-size: 22px;">2all.ai</h2>
    <span style="font-size: 11px; font-weight: bold; background-color: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">${banner}</span>
  </div>
  <p style="font-size: 15px; font-weight: bold; color: #0f172a; margin-top: 0;">${greeting}</p>
  <p style="font-size: 14px; line-height: 1.6; color: #475569;">
    ${message}
  </p>
  ${clientDetailsBlock}
  ${paymentDetailsBlock}
  ${adminSlotButtonsBlock}
  ${ctaText ? `
  <div style="margin: 24px 0; text-align: center;">
    <a href="${ctaLink}" style="background-color: #004bff; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">${ctaText}</a>
  </div>
  ` : ''}
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin: 20px 0; font-size: 12px; color: #64748b;">
    ${footer}
  </div>
  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-top: 24px; margin-bottom: 16px;" />
  <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
    &copy; 2026 2all.ai Inc. All rights reserved.
  </p>
</div>`.trim();
      }

      return { ...prev, [activeKey]: updated as TemplateItem };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/email-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templates }),
      });
      if (res.ok) {
        setToast({ text: "All email templates saved dynamically!", type: "success" });
        setTimeout(() => setToast(null), 4000);
      } else {
        setToast({ text: "Failed to save email templates", type: "error" });
      }
    } catch (e) {
      setToast({ text: "Network error saving templates", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6 text-left font-sans">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`p-4 rounded-2xl text-xs font-black flex items-center gap-2 ${
          toast.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          {toast.text}
        </div>
      )}

      {/* Top Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Interactive Email Card Editor</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">Click and edit email text directly inside the actual visual email card format below.</p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-none uppercase tracking-wider disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save All Templates"}
        </button>
      </div>

      {/* Template Selector Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
          Select Email Template to Edit ({TEMPLATE_KEYS.length} System Emails):
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TEMPLATE_KEYS.map((item) => {
            const isActive = activeKey === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveKey(item.id)}
                className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-slate-50/80 border-slate-200 text-slate-700 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}>{item.category}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Mode Switch */}
      <div className="flex items-center justify-between border-y border-slate-200 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Mode:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setEditorMode("visual")}
              className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                editorMode === "visual" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Type className="w-3.5 h-3.5" /> In-Card Visual Editor (Direct Text)
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("html")}
              className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                editorMode === "html" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code className="w-3.5 h-3.5" /> Raw HTML Mode (Advanced)
            </button>
          </div>
        </div>

        {/* Dynamic Variable Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider shrink-0">+ Insert Token:</span>
          {(AVAILABLE_VARIABLES[activeKey] || []).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => updateField("messageContent", (currentTemplate.messageContent || "") + " " + v)}
              className="px-2 py-0.5 bg-blue-50 border border-blue-200 hover:bg-blue-600 hover:text-white text-blue-700 font-mono text-[10px] font-bold rounded-md shrink-0 transition-all cursor-pointer"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Line Field */}
      <div className="space-y-1">
        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
          Email Subject Line
        </label>
        <input
          type="text"
          value={currentTemplate.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          placeholder="Enter subject line..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>

      {/* IN-PLACE VISUAL CARD EDITOR (EXACT EMAIL FORMAT MATCH) */}
      {editorMode === "visual" ? (
        <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 flex justify-center">
          
          {/* Real Email Card Container */}
          <div className="w-full max-w-[600px] bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5 text-left font-sans">
            
            {/* Header: Brand Name + Editable Badge */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-blue-600 tracking-tight">2all.ai</h2>
              <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                <span className="text-[10px] font-black text-blue-500 uppercase mr-1">Badge:</span>
                <input
                  type="text"
                  value={currentTemplate.bannerText}
                  onChange={(e) => updateField("bannerText", e.target.value)}
                  className="bg-transparent text-[11px] font-extrabold text-blue-700 uppercase tracking-wider focus:outline-none w-36 border-b border-blue-300 focus:border-blue-600"
                  placeholder="e.g. ENTERPRISE DEMO ALERT"
                />
              </div>
            </div>

            {/* Editable Greeting Line */}
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Greeting Headline:</span>
              <input
                type="text"
                value={currentTemplate.greetingText}
                onChange={(e) => updateField("greetingText", e.target.value)}
                className="w-full text-base font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="e.g. Hello {{leadName}} & 2all.ai Team,"
              />
            </div>

            {/* Editable Message Content Paragraph */}
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Main Message Body Text:</span>
              <textarea
                rows={5}
                value={currentTemplate.messageContent}
                onChange={(e) => updateField("messageContent", e.target.value)}
                className="w-full text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Enter email message body text here..."
              />
            </div>

            {/* Structured Client/Details Card Preview Block */}
            {(activeKey === "demoAdminAction" || activeKey === "demoConfirmedCustomer") && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-700">
                <div className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  📋 CLIENT DETAILS (Auto-Populated at runtime)
                </div>
                <div className="space-y-1 font-mono text-[11px] pt-1">
                  <div><strong>Name:</strong> {"{{leadName}}"}</div>
                  <div><strong>Email:</strong> {"{{leadEmail}}"}</div>
                  <div><strong>Phone:</strong> {"{{leadPhone}}"}</div>
                  <div><strong>Website:</strong> {"{{leadWebsite}}"}</div>
                </div>
              </div>
            )}

            {/* Payment Details Preview Block */}
            {activeKey === "paymentSuccess" && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 text-xs text-slate-700">
                <div><strong>Plan:</strong> {"{{planName}}"}</div>
                <div><strong>Amount Paid:</strong> ${"{{amount}}"} USD</div>
                <div><strong>Status:</strong> <span className="text-emerald-600 font-bold">SUCCESSFUL</span></div>
              </div>
            )}

            {/* 1-Click Slot Assignment Buttons Preview Block (For Admin Action) */}
            {activeKey === "demoAdminAction" && (
              <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="font-extrabold text-indigo-950 uppercase tracking-wider text-[11px]">
                  ⚡ 1-Click Meeting Slot Buttons (Generated in Admin Email)
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="bg-white border border-indigo-300 text-indigo-800 p-2.5 rounded-xl font-bold text-xs shadow-2xs">
                    👉 Assign: Tomorrow, 10:00 AM & Auto-Email Customer
                  </div>
                  <div className="bg-white border border-indigo-300 text-indigo-800 p-2.5 rounded-xl font-bold text-xs shadow-2xs">
                    👉 Assign: Tomorrow, 02:00 PM & Auto-Email Customer
                  </div>
                </div>
              </div>
            )}

            {/* Editable Action Button (CTA) */}
            <div className="pt-2 text-center space-y-2">
              <div className="inline-block bg-blue-600 text-white rounded-xl p-3 shadow-md shadow-blue-500/20 max-w-sm w-full">
                <span className="text-[9px] font-black uppercase tracking-wider block text-blue-200 mb-1">Button Text:</span>
                <input
                  type="text"
                  value={currentTemplate.ctaText || ""}
                  onChange={(e) => updateField("ctaText", e.target.value)}
                  className="w-full bg-blue-700 text-white font-extrabold text-xs text-center rounded-lg px-2 py-1 uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-white border-none"
                  placeholder="e.g. GO TO DASHBOARD"
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Target URL:</span>
                <input
                  type="text"
                  value={currentTemplate.ctaLink || ""}
                  onChange={(e) => updateField("ctaLink", e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono text-blue-600 focus:outline-none w-72"
                  placeholder="e.g. {{baseUrl}}/dashboard"
                />
              </div>
            </div>

            {/* Editable Footer Support Note */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Footer Support Note:</span>
              <input
                type="text"
                value={currentTemplate.footerNote || ""}
                onChange={(e) => updateField("footerNote", e.target.value)}
                className="w-full text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="e.g. Need support? Contact support@2all.ai."
              />
            </div>

            <div className="border-t border-slate-100 pt-3 text-center">
              <p className="text-[11px] text-slate-400 font-medium">&copy; 2026 2all.ai Inc. All rights reserved.</p>
            </div>

          </div>

        </div>
      ) : (
        /* RAW HTML MODE */
        <div className="space-y-1.5">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            Raw HTML Body Code Editor
          </label>
          <textarea
            rows={16}
            value={currentTemplate.body || ""}
            onChange={(e) => updateField("body", e.target.value)}
            className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 leading-relaxed"
            placeholder="<html>...</html>"
          />
        </div>
      )}

    </div>
  );
}
