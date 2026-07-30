"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Sliders,
  ShieldCheck,
  Save,
  Mic,
  Volume2,
  Eye,
  Moon,
  Sparkles,
  Focus,
  Ruler,
  Type,
  Loader2,
  Info
} from "lucide-react";

export interface AccessibilityFeatureItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  enabled: boolean;
  isCustom?: boolean;
}

export default function AdminAccessibilityMenuManager() {
  const [features, setFeatures] = useState<AccessibilityFeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AccessibilityFeatureItem | null>(null);

  // Form State for Add / Edit
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("Visual & Color");
  const [formIcon, setFormIcon] = useState("Sparkles");

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch current menu config
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/accessibility-config");
      if (res.ok) {
        const data = await res.json();
        setFeatures(data.features || []);
      }
    } catch (err) {
      console.error("Failed to load accessibility menu config", err);
    } finally {
      setLoading(false);
    }
  };

  // Save Config to Server
  const saveConfigToServer = async (updatedFeatures: AccessibilityFeatureItem[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/accessibility-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: updatedFeatures }),
      });
      if (res.ok) {
        setFeatures(updatedFeatures);
        showToast("Accessibility Menu updated and saved successfully!");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("a11y-config-updated", { detail: updatedFeatures }));
        }
      } else {
        showToast("Failed to save changes.", "error");
      }
    } catch (err) {
      showToast("Network error while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Toggle Feature Enabled/Disabled
  const handleToggleEnabled = (id: string) => {
    const updated = features.map(item =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    saveConfigToServer(updated);
  };

  // Delete Feature
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this tool from the Accessibility Menu?")) return;
    const updated = features.filter(item => item.id !== id);
    saveConfigToServer(updated);
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormTitle("");
    setFormDescription("");
    setFormCategory("Visual & Color");
    setFormIcon("Sparkles");
    setIsAddModalOpen(true);
  };

  // Submit Add Feature
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Please enter a title for the accessibility tool.");
      return;
    }
    const newItem: AccessibilityFeatureItem = {
      id: `custom_${Date.now()}`,
      title: formTitle.trim(),
      description: formDescription.trim() || "Custom accessibility enhancement tool",
      category: formCategory,
      icon: formIcon,
      enabled: true,
      isCustom: true,
    };

    const updated = [...features, newItem];
    saveConfigToServer(updated);
    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (item: AccessibilityFeatureItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormCategory(item.category);
    setFormIcon(item.icon);
  };

  // Submit Edit Feature
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const updated = features.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            title: formTitle.trim(),
            description: formDescription.trim(),
            category: formCategory,
            icon: formIcon,
          }
        : item
    );
    saveConfigToServer(updated);
    setEditingItem(null);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Mic": return <Mic className="w-4 h-4 text-blue-600" />;
      case "Volume2": return <Volume2 className="w-4 h-4 text-purple-600" />;
      case "Eye": return <Eye className="w-4 h-4 text-emerald-600" />;
      case "Moon": return <Moon className="w-4 h-4 text-amber-500" />;
      case "Focus": return <Focus className="w-4 h-4 text-cyan-600" />;
      case "Ruler": return <Ruler className="w-4 h-4 text-indigo-600" />;
      case "Type": return <Type className="w-4 h-4 text-rose-600" />;
      default: return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Speech & Reading", "Typography", "Visual & Color", "Focus & Reading"];

  const filteredFeatures = features.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-black transition-all animate-in fade-in slide-in-from-top-4 ${
          toastMessage.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <Check className="w-4 h-4 stroke-[3]" />
          {toastMessage.text}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black text-cyan-300 border border-white/10 uppercase tracking-widest">
              <Sliders className="w-3.5 h-3.5" /> Menu Customizer & Feature Manager
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Accessibility Menu Manager
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-2xl leading-relaxed">
              Add new accessibility tools, delete existing features, edit titles, or toggle active tools in the Accessibility Panel widget.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Tool
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search tools by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Features List Table / Grid */}
      {loading ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-400 font-bold text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> Loading Accessibility Tools...
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Configured Accessibility Tools ({filteredFeatures.length} / {features.length})
            </h3>
            {saving && <span className="text-sm font-bold text-blue-600 flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</span>}
          </div>

          <div className="divide-y divide-slate-100">
            {filteredFeatures.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-black text-slate-900 truncate">{item.title}</h4>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                      {item.isCustom && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                          Custom Added
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed truncate">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  {/* Enable/Disable Toggle */}
                  <button
                    onClick={() => handleToggleEnabled(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                      item.enabled
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-400 border-slate-200"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${item.enabled ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {item.enabled ? "Enabled" : "Disabled"}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer border-none"
                    title="Edit Feature Details"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border-none"
                    title="Delete Tool"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW FEATURE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Add New Accessibility Tool
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                  Tool Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Highlight Headings"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Outlines all major section titles for quick scanning"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Visual & Color">Visual & Color</option>
                    <option value="Speech & Reading">Speech & Reading</option>
                    <option value="Focus & Reading">Focus & Reading</option>
                    <option value="Typography">Typography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                    Icon
                  </label>
                  <select
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Sparkles">Sparkles</option>
                    <option value="Mic">Mic</option>
                    <option value="Volume2">Volume2</option>
                    <option value="Eye">Eye</option>
                    <option value="Moon">Moon</option>
                    <option value="Focus">Focus</option>
                    <option value="Ruler">Ruler</option>
                    <option value="Type">Type</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl border-none transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Add Tool to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT FEATURE */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-600" /> Edit Tool: {editingItem.title}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                  Tool Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Visual & Color">Visual & Color</option>
                    <option value="Speech & Reading">Speech & Reading</option>
                    <option value="Focus & Reading">Focus & Reading</option>
                    <option value="Typography">Typography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-wider mb-1">
                    Icon
                  </label>
                  <select
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Sparkles">Sparkles</option>
                    <option value="Mic">Mic</option>
                    <option value="Volume2">Volume2</option>
                    <option value="Eye">Eye</option>
                    <option value="Moon">Moon</option>
                    <option value="Focus">Focus</option>
                    <option value="Ruler">Ruler</option>
                    <option value="Type">Type</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl border-none transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
