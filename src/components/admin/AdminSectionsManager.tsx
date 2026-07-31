"use client";

import { useState, useEffect, useRef } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Search,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Video,
  Palette,
  Type,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Upload,
  Copy,
  ExternalLink
} from "lucide-react";

export interface WebsiteSectionItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Hero & Presentation" | "Solutions & Platform" | "Pricing & Subscriptions" | "Industries & Use Cases" | "Compliance & Legal" | "Footer & Layout";
  badgeText: string;
  primaryCta: string;
  primaryCtaLink: string;
  secondaryCta: string;
  secondaryCtaLink: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  imageUrl: string;
  videoUrl: string;
  enabled: boolean;
  isCustom?: boolean;
  order: number;
}

const COLOR_PRESETS = [
  { label: "Clean White", bg: "bg-white", text: "text-slate-900" },
  { label: "Soft Light Slate", bg: "bg-slate-50", text: "text-slate-900" },
  { label: "Deep Navy Blue", bg: "bg-[#0a1e3f]", text: "text-white" },
  { label: "Royal Blue Gradient", bg: "bg-gradient-to-r from-[#0a1e3f] via-[#042868] to-[#004bff]", text: "text-white" },
  { label: "Emerald Non-Profit", bg: "bg-[#042825]", text: "text-emerald-100" },
  { label: "Dark Midnight", bg: "bg-slate-950", text: "text-slate-100" },
  { label: "Sky Soft Blue", bg: "bg-sky-50/80", text: "text-blue-950" },
];

const FONT_PRESETS = [
  { label: "Inter (Modern Sans)", value: "font-sans" },
  { label: "Outfit (Brand Display)", value: "font-bold font-sans tracking-tight" },
  { label: "Georgia (Serif Elegant)", value: "font-serif" },
  { label: "Monospace (Technical)", value: "font-mono" },
];

const FONT_SIZE_PRESETS = [
  { label: "Medium (18px)", value: "text-lg" },
  { label: "Large (24px)", value: "text-xl" },
  { label: "Extra Large (30px)", value: "text-2xl" },
  { label: "Hero Display (36px)", value: "text-3xl" },
];

const DEFAULT_SECTIONS: WebsiteSectionItem[] = [
  {
    id: "hero",
    title: "Empower Every User with AI Web Accessibility",
    subtitle: "Automatically align your website with WCAG 2.1 AA & ADA compliance in under 48 hours.",
    category: "Hero & Presentation",
    badgeText: "AI AUTOMATED REMEDIATION ENGINE",
    primaryCta: "START FREE TRIAL →",
    primaryCtaLink: "/register",
    secondaryCta: "SCHEDULE A DEMO",
    secondaryCtaLink: "/demo",
    backgroundColor: "bg-gradient-to-r from-[#0a1e3f] via-[#042868] to-[#004bff]",
    textColor: "text-white",
    fontFamily: "font-sans",
    fontSize: "text-2xl",
    imageUrl: "/images/dashboard/hero_preview.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    enabled: true,
    order: 1
  },
  {
    id: "showcase",
    title: "Live Interactive Widget Showcase",
    subtitle: "Test real-time typography scaling, contrast profiles, and voice navigation engine.",
    category: "Hero & Presentation",
    badgeText: "INTERACTIVE DEMO",
    primaryCta: "TRY WIDGET NOW",
    primaryCtaLink: "#widget-demo",
    secondaryCta: "VIEW FEATURES",
    secondaryCtaLink: "/platform",
    backgroundColor: "bg-white",
    textColor: "text-slate-900",
    fontFamily: "font-sans",
    fontSize: "text-xl",
    imageUrl: "/icon.jpeg",
    videoUrl: "",
    enabled: true,
    order: 2
  },
  {
    id: "solutions_platform",
    title: "Complete Web Accessibility & Compliance Platform",
    subtitle: "Everything you need to scan, audit, remediate, and maintain 100% ADA & WCAG 2.1 AA compliance.",
    category: "Solutions & Platform",
    badgeText: "ENTERPRISE PLATFORM",
    primaryCta: "EXPLORE PLATFORM",
    primaryCtaLink: "/platform",
    secondaryCta: "VIEW SPECIFICATIONS",
    secondaryCtaLink: "/compliance",
    backgroundColor: "bg-slate-50",
    textColor: "text-slate-900",
    fontFamily: "font-sans",
    fontSize: "text-xl",
    imageUrl: "/images/dashboard/expert_services.png",
    videoUrl: "",
    enabled: true,
    order: 3
  },
  {
    id: "pricing_tiers",
    title: "Simple, Transparent Compliance Pricing",
    subtitle: "Choose the perfect plan for your business size with standard 7-day risk-free trial.",
    category: "Pricing & Subscriptions",
    badgeText: "FLEXIBLE PRICING",
    primaryCta: "START 7-DAY FREE TRIAL",
    primaryCtaLink: "/pricing",
    secondaryCta: "TALK TO SALES",
    secondaryCtaLink: "/contact-us",
    backgroundColor: "bg-white",
    textColor: "text-slate-900",
    fontFamily: "font-sans",
    fontSize: "text-xl",
    imageUrl: "",
    videoUrl: "",
    enabled: true,
    order: 4
  },
  {
    id: "nonprofit_grant",
    title: "501(c)(3) Emerald Grant & Non-Profit Program",
    subtitle: "100% Free full-suite accessibility licenses for eligible non-profits and community organizations.",
    category: "Industries & Use Cases",
    badgeText: "501(c)(3) EMERALD GRANT",
    primaryCta: "APPLY FOR FREE LICENSE →",
    primaryCtaLink: "/non-profit",
    secondaryCta: "LEARN MORE",
    secondaryCtaLink: "/community",
    backgroundColor: "bg-[#042825]",
    textColor: "text-emerald-100",
    fontFamily: "font-sans",
    fontSize: "text-2xl",
    imageUrl: "",
    videoUrl: "",
    enabled: true,
    order: 5
  },
  {
    id: "community_hub",
    title: "Community & Accessibility Advocacy Portal",
    subtitle: "Free tools, dyslexia simulations, accessible code tutorials, and inclusion resources.",
    category: "Industries & Use Cases",
    badgeText: "ADVOCACY PORTAL",
    primaryCta: "EXPLORE COMMUNITY",
    primaryCtaLink: "/community",
    secondaryCta: "SIMULATION TOOL",
    secondaryCtaLink: "/dyslexia-simulation",
    backgroundColor: "bg-white",
    textColor: "text-slate-900",
    fontFamily: "font-sans",
    fontSize: "text-xl",
    imageUrl: "",
    videoUrl: "",
    enabled: true,
    order: 6
  },
  {
    id: "vpat_conformance",
    title: "VPAT 2.4 & Legal Litigation Protection Guarantee",
    subtitle: "Official Voluntary Product Accessibility Template documentation and $10k lawsuit protection.",
    category: "Compliance & Legal",
    badgeText: "LEGAL PROTECTION",
    primaryCta: "DOWNLOAD VPAT CERTIFICATE",
    primaryCtaLink: "/vpat",
    secondaryCta: "LITIGATION SUPPORT",
    secondaryCtaLink: "/litigation-support",
    backgroundColor: "bg-[#0a1e3f]",
    textColor: "text-white",
    fontFamily: "font-sans",
    fontSize: "text-xl",
    imageUrl: "",
    videoUrl: "",
    enabled: true,
    order: 7
  },
  {
    id: "global_footer",
    title: "Global Navigation & Footer Links",
    subtitle: "Manage site-wide footer links, copyright notice, agency white-label details, and social icons.",
    category: "Footer & Layout",
    badgeText: "GLOBAL FOOTER",
    primaryCta: "MANAGE FOOTER LINKS",
    primaryCtaLink: "#footer-links",
    secondaryCta: "PRIVACY POLICY",
    secondaryCtaLink: "/privacy",
    backgroundColor: "bg-slate-950",
    textColor: "text-slate-100",
    fontFamily: "font-sans",
    fontSize: "text-lg",
    imageUrl: "",
    videoUrl: "",
    enabled: true,
    order: 8
  }
];

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

function ImageUploadInput({ label, value, onChange, placeholder = "/images/hero_banner.png" }: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold text-slate-600 uppercase">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-grow bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
        >
          <Upload className="w-3.5 h-3.5" /> Upload Photo
        </button>
      </div>

      {value && (
        <div className="mt-1 flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 w-fit">
          <img src={value} alt="Preview" className="w-8 h-8 object-contain rounded-lg border border-slate-200 bg-white" />
          <span className="text-[10px] font-bold text-slate-500 max-w-[140px] truncate">{value}</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] text-red-500 font-black hover:underline cursor-pointer border-none bg-transparent"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminSectionsManager() {
  const [sections, setSections] = useState<WebsiteSectionItem[]>(DEFAULT_SECTIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSection, setEditingSection] = useState<WebsiteSectionItem | null>(null);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [insertTargetOrder, setInsertTargetOrder] = useState<number | null>(null);

  // New Section Form State
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newCategory, setNewCategory] = useState<WebsiteSectionItem["category"]>("Solutions & Platform");
  const [newBadgeText, setNewBadgeText] = useState("");
  const [newPrimaryCta, setNewPrimaryCta] = useState("");
  const [newPrimaryCtaLink, setNewPrimaryCtaLink] = useState("");
  const [newBgColor, setNewBgColor] = useState("bg-white");
  const [newTextColor, setNewTextColor] = useState("text-slate-900");
  const [newFontFamily, setNewFontFamily] = useState("font-sans");
  const [newFontSize, setNewFontSize] = useState("text-xl");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const categories = [
    "All Categories",
    "Home Page",
    "Pricing Page",
    "About Us Page",
    "Compliance Page",
    "Enterprise Page",
    "Non-Profit Page",
    "Hero & Presentation",
    "Solutions & Platform",
    "Pricing & Subscriptions",
    "Industries & Use Cases",
    "Compliance & Legal",
    "Footer & Layout"
  ];

  // Fetch sections from API on mount
  useEffect(() => {
    fetch("/api/admin/sections")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.sections) && data.sections.length > 0) {
          setSections(data.sections);
        }
      })
      .catch((err) => console.warn("Could not load backend sections config:", err));
  }, []);

  const saveSectionsToBackend = (updatedSections: WebsiteSectionItem[]) => {
    fetch("/api/admin/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections: updatedSections }),
    }).catch((err) => console.error("Error saving sections:", err));
  };

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Section Enabled State
  const handleToggleSection = (id: string) => {
    setSections(prev => {
      const updated = prev.map(sec => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec));
      saveSectionsToBackend(updated);
      return updated;
    });
    showToast("Section visibility updated!");
  };

  // Move Section Position Up / Down
  const handleMoveSection = (id: string, direction: "up" | "down") => {
    const index = sections.findIndex(s => s.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sections.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newArr = [...sections];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    // Update orders
    const updated = newArr.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    setSections(updated);
    saveSectionsToBackend(updated);
    showToast(`Moved "${temp.title.slice(0, 20)}..." ${direction}!`);
  };

  // Open Add Modal specifying an optional target insertion point
  const handleOpenAddModal = (belowOrder?: number) => {
    if (belowOrder !== undefined) {
      setInsertTargetOrder(belowOrder);
    } else {
      setInsertTargetOrder(null);
    }
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (sec: WebsiteSectionItem) => {
    setEditingSection({ ...sec });
  };

  // Save Edit Section
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    setSections(prev => {
      const updated = prev.map(sec => (sec.id === editingSection.id ? editingSection : sec));
      saveSectionsToBackend(updated);
      return updated;
    });
    setEditingSection(null);
    showToast(`Section "${editingSection.title.slice(0, 25)}..." updated successfully!`);
  };

  // Add Custom Section
  const handleAddSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("Section title is required", "error");
      return;
    }

    const newSec: WebsiteSectionItem = {
      id: `custom_sec_${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || "Dynamic website section content.",
      category: newCategory,
      badgeText: newBadgeText.trim() || "CUSTOM SECTION",
      primaryCta: newPrimaryCta.trim() || "LEARN MORE",
      primaryCtaLink: newPrimaryCtaLink.trim() || "#",
      secondaryCta: "DISCOVER",
      secondaryCtaLink: "#",
      backgroundColor: newBgColor,
      textColor: newTextColor,
      fontFamily: newFontFamily,
      fontSize: newFontSize,
      imageUrl: newImageUrl.trim(),
      videoUrl: newVideoUrl.trim(),
      enabled: true,
      isCustom: true,
      order: insertTargetOrder !== null ? insertTargetOrder + 1 : sections.length + 1
    };

    let updated: WebsiteSectionItem[] = [];
    if (insertTargetOrder !== null) {
      const newArr = [...sections];
      newArr.splice(insertTargetOrder, 0, newSec);
      updated = newArr.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    } else {
      updated = [...sections, newSec];
    }

    setSections(updated);
    saveSectionsToBackend(updated);

    setIsAddModalOpen(false);
    setInsertTargetOrder(null);
    setNewTitle("");
    setNewSubtitle("");
    setNewBadgeText("");
    setNewPrimaryCta("");
    setNewPrimaryCtaLink("");
    setNewImageUrl("");
    setNewVideoUrl("");
    showToast(`New section "${newSec.title}" created successfully!`);
  };

  // Delete Section
  const handleDeleteSection = (id: string) => {
    setSections(prev => {
      const updated = prev.filter(sec => sec.id !== id);
      saveSectionsToBackend(updated);
      return updated;
    });
    showToast("Section deleted cleanly from platform!");
  };

  const filteredSections = sections.filter(sec => {
    const matchesCat = selectedCategory === "All Categories" || sec.category === selectedCategory;
    const matchesSearch =
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.badgeText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-black transition-all ${
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
      <div className="bg-gradient-to-r from-[#0a1e3f] via-[#042868] to-[#004bff] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-black text-cyan-300 border border-white/20 uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" /> Full Visual Sections & Page Builder
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Website Sections & Content Manager
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-2xl leading-relaxed">
              Dynamically control text content, font family, font size, background colors, text colors, photos, video embeds, button links, and section order across your entire platform!
            </p>
          </div>

          <button
            onClick={() => handleOpenAddModal()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Section
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search sections by title, subtitle, or badge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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

      {/* Sections Cards Grid */}
      <div className="space-y-4">
        {filteredSections.map((sec, idx) => {
          const isExpanded = expandedSectionId === sec.id;
          return (
            <div key={sec.id} className="space-y-3">
              <div
                className={`bg-white border rounded-2xl transition-all shadow-sm overflow-hidden ${
                  sec.enabled ? "border-slate-200/80" : "border-slate-200 bg-slate-50/50 opacity-80"
                }`}
              >
                <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-grow min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black uppercase tracking-wider px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>
                        {sec.badgeText}
                      </span>
                      <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>
                        {sec.category}
                      </span>
                      {sec.isCustom && (
                        <span className="font-black uppercase tracking-wider px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-md" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>
                          Custom Section
                        </span>
                      )}
                    </div>

                    {/* Section Title with Target Times New Roman Styling */}
                    <h3 className="font-black text-slate-900 tracking-tight" style={{ fontSize: "17px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.3" }}>
                      {sec.title}
                    </h3>
                    <p className="text-slate-600 font-normal" style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.7", marginTop: "8px" }}>
                      {sec.subtitle}
                    </p>
                  </div>

                  {/* Actions & Position Controls */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                    {/* Position Reordering Buttons */}
                    <button
                      onClick={() => handleMoveSection(sec.id, "up")}
                      disabled={idx === 0}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-lg cursor-pointer transition-colors"
                      title="Move Section Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveSection(sec.id, "down")}
                      disabled={idx === filteredSections.length - 1}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-lg cursor-pointer transition-colors"
                      title="Move Section Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Active Toggle */}
                    <button
                      onClick={() => handleToggleSection(sec.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        sec.enabled
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {sec.enabled ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                      {sec.enabled ? "Active" : "Hidden"}
                    </button>

                    {/* Full Edit Button */}
                    <button
                      onClick={() => handleOpenEdit(sec)}
                      className="p-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 rounded-xl transition-all cursor-pointer border border-blue-200 shadow-sm"
                      title="Edit Colors, Fonts, Text, Media & Buttons"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete Custom Section */}
                    {sec.isCustom && (
                      <button
                        onClick={() => handleDeleteSection(sec.id)}
                        className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-all cursor-pointer border border-red-200"
                        title="Delete Custom Section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Accordion Expand */}
                    <button
                      onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer border border-slate-200"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Accordion Expanded Preview Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/60 space-y-4 text-xs">
                    {/* Live Visual Card Preview */}
                    <div className={`p-5 rounded-2xl border border-slate-200/80 shadow-sm ${sec.backgroundColor} ${sec.textColor} ${sec.fontFamily}`}>
                      <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md mb-2">
                        {sec.badgeText}
                      </div>
                      <h4 className={`font-bold ${sec.fontSize}`}>{sec.title}</h4>
                      <p className="mt-1 opacity-90 leading-relaxed">{sec.subtitle}</p>

                      {/* Media Embed Previews */}
                      {(sec.imageUrl || sec.videoUrl) && (
                        <div className="mt-4 flex flex-wrap gap-4 items-center">
                          {sec.imageUrl && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider block flex items-center gap-1">
                                <ImageIcon className="w-3 h-3" /> Image Attachment
                              </span>
                              <img src={sec.imageUrl} alt="Section Image" className="w-32 h-20 object-cover rounded-xl border border-white/20 shadow-sm" />
                            </div>
                          )}
                          {sec.videoUrl && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider block flex items-center gap-1">
                                <Video className="w-3 h-3" /> Video Embed URL
                              </span>
                              <div className="text-[10px] font-mono bg-black/30 px-3 py-1.5 rounded-lg max-w-xs truncate">
                                {sec.videoUrl}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Buttons Preview */}
                      <div className="mt-4 flex items-center gap-2 pt-2 border-t border-white/10">
                        {sec.primaryCta && (
                          <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-xs shadow-sm">
                            {sec.primaryCta} ({sec.primaryCtaLink})
                          </span>
                        )}
                        {sec.secondaryCta && (
                          <span className="px-3 py-1 bg-white/20 text-current font-bold rounded-lg text-xs">
                            {sec.secondaryCta} ({sec.secondaryCtaLink})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 font-medium">
                      <span>Background: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[10px]">{sec.backgroundColor}</code></span>
                      <span>Font Style: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[10px]">{sec.fontFamily}</code></span>
                      <span>Font Size: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[10px]">{sec.fontSize}</code></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Add Section Directly Below Button */}
              <div className="flex justify-center pt-1 pb-2">
                <button
                  onClick={() => handleOpenAddModal(idx + 1)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold rounded-full border border-dashed border-slate-300 hover:border-blue-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <Plus className="w-3.5 h-3.5" /> Add Section Below Here
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL EDIT SECTION MODAL */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 text-left animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-[#0a1e3f]">Full Dynamic Section Editor</h3>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Category & Badge Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</label>
                  <select
                    value={editingSection.category}
                    onChange={(e) => setEditingSection({ ...editingSection, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="Hero & Presentation">Hero & Presentation</option>
                    <option value="Solutions & Platform">Solutions & Platform</option>
                    <option value="Pricing & Subscriptions">Pricing & Subscriptions</option>
                    <option value="Industries & Use Cases">Industries & Use Cases</option>
                    <option value="Compliance & Legal">Compliance & Legal</option>
                    <option value="Footer & Layout">Footer & Layout</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Badge / Tag Text</label>
                  <input
                    type="text"
                    value={editingSection.badgeText}
                    onChange={(e) => setEditingSection({ ...editingSection, badgeText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Section Heading Title</label>
                <input
                  type="text"
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Section Subtitle / Description</label>
                <textarea
                  rows={2}
                  value={editingSection.subtitle}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium text-slate-800"
                />
              </div>

              {/* Color & Typography Customizer Box */}
              <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-2xl space-y-3">
                <span className="block text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-blue-600" /> Color Theme & Typography Settings
                </span>

                {/* Color Presets */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase">Background Color Theme Presets</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setEditingSection({ ...editingSection, backgroundColor: preset.bg, textColor: preset.text })}
                        className={`p-2 rounded-xl text-[10px] font-bold text-left border transition-all cursor-pointer flex items-center justify-between ${
                          editingSection.backgroundColor === preset.bg ? "border-blue-600 ring-2 ring-blue-500/20 font-black shadow-sm" : "border-slate-200 bg-white"
                        }`}
                      >
                        <span className="truncate">{preset.label}</span>
                        <div className={`w-3 h-3 rounded-full border border-slate-300 ${preset.bg}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family & Font Size */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase">Font Family</label>
                    <select
                      value={editingSection.fontFamily}
                      onChange={(e) => setEditingSection({ ...editingSection, fontFamily: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
                    >
                      {FONT_PRESETS.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase">Font Size</label>
                    <select
                      value={editingSection.fontSize}
                      onChange={(e) => setEditingSection({ ...editingSection, fontSize: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
                    >
                      {FONT_SIZE_PRESETS.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Media Attachments (Photo & Video Upload / URL) */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-purple-600" /> Photo Upload & Video Embed URL
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <ImageUploadInput
                    label="Photo / Image URL"
                    value={editingSection.imageUrl}
                    onChange={(val) => setEditingSection({ ...editingSection, imageUrl: val })}
                    placeholder="/images/hero_banner.png"
                  />
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase">Video Embed URL (YouTube/MP4)</label>
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/embed/..."
                      value={editingSection.videoUrl}
                      onChange={(e) => setEditingSection({ ...editingSection, videoUrl: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons CTAs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Primary Button Text</label>
                  <input
                    type="text"
                    value={editingSection.primaryCta}
                    onChange={(e) => setEditingSection({ ...editingSection, primaryCta: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Primary Button URL</label>
                  <input
                    type="text"
                    value={editingSection.primaryCtaLink}
                    onChange={(e) => setEditingSection({ ...editingSection, primaryCtaLink: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Secondary Button Text</label>
                  <input
                    type="text"
                    value={editingSection.secondaryCta}
                    onChange={(e) => setEditingSection({ ...editingSection, secondaryCta: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Secondary Button URL</label>
                  <input
                    type="text"
                    value={editingSection.secondaryCtaLink}
                    onChange={(e) => setEditingSection({ ...editingSection, secondaryCtaLink: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Category Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Page / Category Assignment</label>
                <select
                  value={editingSection.category}
                  onChange={(e) => setEditingSection({ ...editingSection, category: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                >
                  <option value="Home Page">Home Page</option>
                  <option value="Pricing Page">Pricing Page</option>
                  <option value="About Us Page">About Us Page</option>
                  <option value="Compliance Page">Compliance Page</option>
                  <option value="Enterprise Page">Enterprise Page</option>
                  <option value="Non-Profit Page">Non-Profit Page</option>
                  <option value="Hero & Presentation">Hero & Presentation</option>
                  <option value="Solutions & Platform">Solutions & Platform</option>
                  <option value="Pricing & Subscriptions">Pricing & Subscriptions</option>
                  <option value="Industries & Use Cases">Industries & Use Cases</option>
                  <option value="Compliance & Legal">Compliance & Legal</option>
                  <option value="Footer & Layout">Footer & Layout</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 w-full shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer border-none shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  Save Section Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SECTION MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 text-left animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0a1e3f]">Add New Website Section</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSectionSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Section Heading Title</label>
                <input
                  type="text"
                  placeholder="e.g. AI Powered Voice & Screen Reader Engine"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Page / Category Assignment</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800"
                >
                  <option value="Home Page">Home Page</option>
                  <option value="Pricing Page">Pricing Page</option>
                  <option value="About Us Page">About Us Page</option>
                  <option value="Compliance Page">Compliance Page</option>
                  <option value="Enterprise Page">Enterprise Page</option>
                  <option value="Non-Profit Page">Non-Profit Page</option>
                  <option value="Hero & Presentation">Hero & Presentation</option>
                  <option value="Solutions & Platform">Solutions & Platform</option>
                  <option value="Pricing & Subscriptions">Pricing & Subscriptions</option>
                  <option value="Industries & Use Cases">Industries & Use Cases</option>
                  <option value="Compliance & Legal">Compliance & Legal</option>
                  <option value="Footer & Layout">Footer & Layout</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Section Subtitle</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Seamlessly read aloud text and navigate pages using natural voice recognition."
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Badge Copy</label>
                  <input
                    type="text"
                    placeholder="e.g. NEW FEATURE"
                    value={newBadgeText}
                    onChange={(e) => setNewBadgeText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Primary Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. TRY NOW"
                    value={newPrimaryCta}
                    onChange={(e) => setNewPrimaryCta(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ImageUploadInput
                  label="Photo / Image URL"
                  value={newImageUrl}
                  onChange={(val) => setNewImageUrl(val)}
                  placeholder="/images/hero_banner.png"
                />
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Video Embed URL</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/embed/..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 w-full shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer border-none shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  Create & Insert Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
