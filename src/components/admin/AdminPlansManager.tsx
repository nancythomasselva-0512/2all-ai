"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  CreditCard,
  Save,
  CheckSquare,
  Square,
  Star,
  Sparkles,
  Loader2,
  Sliders,
  Type,
  Mic,
  Eye,
  Focus,
  Volume2
} from "lucide-react";

export interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  volume: string;
  isRecommended: boolean;
  badge?: string;
  bulletFeatures: string[];
  includedFeatureIds: string[];
}

export interface A11yFeature {
  id: string;
  title: string;
  category: string;
}

const ALL_A11Y_FEATURES: A11yFeature[] = [
  { id: "voiceNavigation", title: "Voice Command Navigation", category: "Speech & Voice" },
  { id: "textToSpeech", title: "Read Aloud (Text-to-Speech)", category: "Speech & Voice" },
  { id: "readEntirePage", title: "Read Entire Page Narrator", category: "Speech & Voice" },
  { id: "autoReadSelection", title: "Auto Read Selection", category: "Speech & Voice" },
  { id: "highlightWord", title: "Highlight Word Spoken", category: "Speech & Voice" },
  { id: "highlightSentence", title: "Highlight Sentence Spoken", category: "Speech & Voice" },
  { id: "autoScroll", title: "Auto Scroll Page Narrator", category: "Speech & Voice" },
  { id: "fontSize", title: "Content Scaling (Font Size)", category: "Typography" },
  { id: "textMagnifier", title: "Text Magnifier Bubble", category: "Typography" },
  { id: "readableFont", title: "Readable Font (Verdana)", category: "Typography" },
  { id: "dyslexiaFont", title: "OpenDyslexic Font", category: "Typography" },
  { id: "textAlignment", title: "Text Alignment Controls", category: "Typography" },
  { id: "letterSpacing", title: "Letter Spacing (Kerning)", category: "Typography" },
  { id: "wordSpacing", title: "Word Spacing Adjuster", category: "Typography" },
  { id: "lineHeight", title: "Line Height Multiplier", category: "Typography" },
  { id: "darkMode", title: "Dark Contrast Mode", category: "Visual & Color" },
  { id: "monochrome", title: "Monochrome Mode", category: "Visual & Color" },
  { id: "highSaturation", title: "High Saturation Mode", category: "Visual & Color" },
  { id: "lowSaturation", title: "Low Saturation Mode", category: "Visual & Color" },
  { id: "readingMask", title: "Reading Mask Spotlight", category: "Focus & Reading" },
  { id: "readingRuler", title: "Reading Guide Ruler", category: "Focus & Reading" },
  { id: "highlightLinks", title: "Highlight Links & Anchors", category: "Focus & Reading" },
  { id: "highlightHeadings", title: "Highlight Headings (H1-H6)", category: "Focus & Reading" },
  { id: "highlightButtons", title: "Highlight Action Buttons", category: "Focus & Reading" },
  { id: "reduceMotion", title: "Reduce Motion & Animations", category: "Focus & Reading" },
  { id: "cursorSize", title: "Big Pointer / Cursor Size", category: "Focus & Reading" },
  { id: "aiAssistant", title: "Anna AI Virtual Assistant", category: "Speech & Voice" }
];

export default function AdminPlansManager() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Create Plan Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanTagline, setNewPlanTagline] = useState("");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [newMonthlyPrice, setNewMonthlyPrice] = useState("$99");
  const [newYearlyPrice, setNewYearlyPrice] = useState("$990");
  const [newVolume, setNewVolume] = useState("Under 50,000 pages");
  const [newIsRecommended, setNewIsRecommended] = useState(false);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/plans");
      if (res.ok) {
        const data = await res.json();
        setPlans(data.plans || []);
      }
    } catch (err) {
      console.error("Failed to load plans config", err);
    } finally {
      setLoading(false);
    }
  };

  const savePlansToServer = async (updatedPlans: PlanItem[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plans: updatedPlans }),
      });
      if (res.ok) {
        setPlans(updatedPlans);
        showToast("Subscription plans and feature checkboxes updated successfully!");
      } else {
        showToast("Failed to save plan changes", "error");
      }
    } catch (err) {
      showToast("Network error while saving plans", "error");
    } finally {
      setSaving(false);
    }
  };

  // Toggle Feature Checkbox for a specific plan
  const handleFeatureToggle = (planId: string, featureId: string) => {
    const updated = plans.map((plan) => {
      if (plan.id === planId) {
        const isIncluded = plan.includedFeatureIds.includes(featureId);
        const nextIncluded = isIncluded
          ? plan.includedFeatureIds.filter((f) => f !== featureId)
          : [...plan.includedFeatureIds, featureId];
        return { ...plan, includedFeatureIds: nextIncluded };
      }
      return plan;
    });
    setPlans(updated);
  };

  // Select All or Deselect All features for a plan
  const handleSelectAllFeatures = (planId: string, selectAll: boolean) => {
    const updated = plans.map((plan) => {
      if (plan.id === planId) {
        return {
          ...plan,
          includedFeatureIds: selectAll ? ALL_A11Y_FEATURES.map((f) => f.id) : []
        };
      }
      return plan;
    });
    setPlans(updated);
  };

  // Update text field in plan
  const handlePlanChange = (planId: string, field: keyof PlanItem, value: any) => {
    const updated = plans.map((plan) => {
      if (plan.id === planId) {
        return { ...plan, [field]: value };
      }
      return plan;
    });
    setPlans(updated);
  };

  // Delete Plan
  const handleDeletePlan = (planId: string) => {
    if (!confirm("Are you sure you want to delete this subscription plan?")) return;
    const updated = plans.filter((p) => p.id !== planId);
    savePlansToServer(updated);
  };

  // Create Plan Submit
  const handleCreatePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanName.trim()) {
      showToast("Plan name is required", "error");
      return;
    }
    const cleanId = newPlanName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newPlan: PlanItem = {
      id: cleanId,
      name: newPlanName.toUpperCase(),
      tagline: newPlanTagline || "Custom specialized accessibility tier",
      description: newPlanDesc || "Custom page volume",
      monthlyPrice: newMonthlyPrice,
      yearlyPrice: newYearlyPrice,
      volume: newVolume,
      isRecommended: newIsRecommended,
      badge: newIsRecommended ? "RECOMMENDED" : "",
      bulletFeatures: [
        "2all.ai Widget (AI-Powered Overlay)",
        "Automated Screen Reader adjustments",
        "Dedicated compliance support"
      ],
      includedFeatureIds: ALL_A11Y_FEATURES.map((f) => f.id)
    };

    const updated = [...plans, newPlan];
    savePlansToServer(updated);
    setIsCreateModalOpen(false);
    setNewPlanName("");
    setNewPlanTagline("");
    setNewPlanDesc("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-black transition-all animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
          {toastMessage.text}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black text-amber-300 border border-white/10 uppercase tracking-widest">
              <CreditCard className="w-3.5 h-3.5" /> Plans & Feature Checkboxes Manager
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Subscription Plans & Accessibility Feature Matrix
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-3xl leading-relaxed">
              Create new pricing plans, edit existing monthly/yearly prices, and check/uncheck included accessibility tools for each plan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => savePlansToServer(plans)}
              disabled={saving}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save All Plans
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-2xl shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Create New Plan
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-400 font-bold text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> Loading Subscription Plans...
        </div>
      ) : (
        <div className="space-y-6">
          {plans.map((plan) => {
            const allChecked = ALL_A11Y_FEATURES.every((f) => plan.includedFeatureIds.includes(f.id));

            return (
              <div
                key={plan.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative hover:border-slate-300 transition-all"
              >
                {/* Plan Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => handlePlanChange(plan.id, "name", e.target.value)}
                        className="text-xl font-black text-slate-900 uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                      {plan.isRecommended && (
                        <span className="bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-white" />
                          Recommended
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={plan.description}
                      onChange={(e) => handlePlanChange(plan.id, "description", e.target.value)}
                      className="w-full text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 focus:outline-none focus:border-blue-500"
                      placeholder="Plan volume description..."
                    />
                  </div>

                  {/* Pricing Inputs */}
                  <div className="flex items-center gap-3 shrink-0 flex-wrap">
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Monthly Price</span>
                      <input
                        type="text"
                        value={plan.monthlyPrice}
                        onChange={(e) => handlePlanChange(plan.id, "monthlyPrice", e.target.value)}
                        className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Yearly Price</span>
                      <input
                        type="text"
                        value={plan.yearlyPrice}
                        onChange={(e) => handlePlanChange(plan.id, "yearlyPrice", e.target.value)}
                        className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border-none mt-4"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Accessibility Feature Checkboxes Matrix */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-blue-600" />
                        Included Accessibility Tools & Features ({plan.includedFeatureIds.length} / {ALL_A11Y_FEATURES.length})
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                        Check the tools that are included for customers on this plan. Unchecked tools will be disabled.
                      </p>
                    </div>

                    {/* Check / Uncheck All Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectAllFeatures(plan.id, !allChecked)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-black rounded-xl transition-colors cursor-pointer border border-slate-200 uppercase tracking-wider flex items-center gap-1.5"
                      >
                        {allChecked ? <Square className="w-3.5 h-3.5" /> : <CheckSquare className="w-3.5 h-3.5 text-blue-600" />}
                        {allChecked ? "Deselect All" : "Select All"}
                      </button>
                    </div>
                  </div>

                  {/* Feature Checkboxes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                    {ALL_A11Y_FEATURES.map((feature) => {
                      const isChecked = plan.includedFeatureIds.includes(feature.id);

                      return (
                        <label
                          key={feature.id}
                          onClick={() => handleFeatureToggle(plan.id, feature.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all select-none ${
                            isChecked
                              ? "bg-white border-blue-500 shadow-sm text-slate-900 font-extrabold"
                              : "bg-white/50 border-slate-200/80 text-slate-400 font-medium hover:border-slate-300"
                          }`}
                        >
                          <span className="text-xs truncate">{feature.title}</span>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                              isChecked
                                ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                                : "bg-white border-slate-300"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE PLAN MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-left space-y-5 relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors border-none cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">Create New Subscription Plan</h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">Configure pricing tier and feature parameters</p>
            </div>

            <form onSubmit={handleCreatePlanSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Plan Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ULTIMATE"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Tagline / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. For high growth digital agencies"
                  value={newPlanTagline}
                  onChange={(e) => setNewPlanTagline(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Volume Description</label>
                <input
                  type="text"
                  placeholder="e.g. Under 50,000 pages"
                  value={newPlanDesc}
                  onChange={(e) => setNewPlanDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Monthly Price</label>
                  <input
                    type="text"
                    placeholder="$99"
                    value={newMonthlyPrice}
                    onChange={(e) => setNewMonthlyPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Yearly Price</label>
                  <input
                    type="text"
                    placeholder="$990"
                    value={newYearlyPrice}
                    onChange={(e) => setNewYearlyPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer border-none shadow-md shadow-blue-500/20"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
