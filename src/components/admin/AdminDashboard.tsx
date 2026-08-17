"use client";

import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Users,
  Globe,
  Award,
  DollarSign,
  LayoutGrid,
  Sliders,
  CreditCard,
  UserCog,
  Check,
  Trash2,
  Edit,
  Search,
  LogOut,
  Save,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Sparkles,
  Code,
  Palette,
  Layout,
  Layers,
  Settings,
  AlertTriangle,
  FileText,
  FolderOpen,
  Languages,
  FileCode,
  Eye,
  Menu,
  Loader2,
  KeyRound,
  Accessibility,
  Mic,
  Volume2,
  Type,
  RefreshCcw,
  Crown,
  Plus,
  X,
  Mail,
  BellRing,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import DomainOnboarding from "@/components/dashboard/DomainOnboarding";
import AdminApiKeysPanel from "@/components/admin/AdminApiKeysPanel";
import AdminAccessibilityMenuManager from "./AdminAccessibilityMenuManager";
import AdminDemoRequestsManager from "./AdminDemoRequestsManager";
import AdminNotificationCenter from "./AdminNotificationCenter";
import AdminEmailTemplatesEditor from "./AdminEmailTemplatesEditor";
import AdminSectionsManager from "./AdminSectionsManager";
import AdminPlansManager from "./AdminPlansManager";
import { useAccessibility } from "@/context/AccessibilityContext";
import AdminDashboardPage from "./AdminDashboardPage";

interface UserType {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  phone?: string | null;
  plan?: string | null;
  paymentStatus?: string | null;
  createdAt: string;
}

interface ProjectType {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
  } | null;
}

export interface FormFieldType {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required: boolean;
  enabled: boolean;
}

export interface SEOPageData {
  seoTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  seoSlug: string;
  robotsIndex: string;
  robotsFollow: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  twitterHandle?: string;
  imageAltAttr?: string;
  imageTitleAttr?: string;
  imageCaptionAttr?: string;
  schemaType?: string;
  schemaJsonPayload?: string;
  includeInSitemap?: boolean;
  sitemapPriority?: string;
  sitemapChangefreq?: string;
}

interface ConfigType {
  brandName: string;
  notificationAdminEmail?: string;
  smtpFromEmail?: string;
  smtpFromName?: string;
  tagline: string;
  logoText?: string;
  footerCopyrightText?: string;
  showDemoButton: boolean;
  showTrialButton: boolean;
  trialButtonText: string;
  demoButtonText: string;
  stripeActive: boolean;
  paypalActive: boolean;
  trialPeriodDays: number;
  primaryColor: string;
  proPrice: number;
  auditBannerTitle: string;
  orbitIcon: string;
  heroTitle?: string;
  heroSubtitle?: string;
  showHeroCTA?: boolean;
  navLinks?: { label: string; href: string }[];
  showNavCta?: boolean;
  showHeroSection?: boolean;
  showShowcaseSection?: boolean;
  showProfilesSection?: boolean;
  showPricingSection?: boolean;
  showVpatBanner?: boolean;
  aboutUsText?: string;
  vpatSummary?: string;
  privacyPolicyText?: string;
  enableVoiceNavigation?: boolean;
  enableDyslexiaSimulation?: boolean;
  enableReadingRuler?: boolean;
  enableScreenReader?: boolean;
  welcomeGreeting?: string;
  showTrialCard?: boolean;
  demoFormTitle?: string;
  demoFormSuccessMsg?: string;
  licenseFormTitle?: string;
  licenseFormSubtitle?: string;
  licenseRequirePhone?: boolean;
  licenseRequireCompany?: boolean;
  requirePhoneNumber?: boolean;
  requireWebsiteUrl?: boolean;
  allowGoogleOAuth?: boolean;
  allowCredentialsLogin?: boolean;
  requireEmailVerification?: boolean;
  whiteLabelEnabled?: boolean;
  agencyName?: string;
  customFooterLogo?: string;
  heroBannerImage?: string;
  widgetIconImage?: string;
  customCss?: string;
  customJs?: string;
  trackingScripts?: string;
  defaultLanguage?: string;
  enableAutoTranslate?: boolean;
  customAssets?: { name: string; url: string }[];
  brandPresets?: { name: string; logo: string }[];
  supportedLanguages?: string[];
  formFields?: FormFieldType[];
  seoPagesConfig?: Record<string, SEOPageData>;
}

interface DashboardProps {
  initialUsers: UserType[];
  initialProjects: ProjectType[];
  initialDomains?: any[];
  initialConfig: ConfigType;
  currentUser?: { name?: string | null; email?: string | null };
  initialTab?: string;
  isSuperAdminView?: boolean;
}

function FormalToggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl transition-all hover:bg-slate-50">
      {(label || description) && (
        <div className="pr-3 text-left">
          {label && <h4 className="font-bold text-slate-800 uppercase tracking-wider" style={{ fontSize: "11px", fontFamily: '"Times New Roman", Times, serif' }}>{label}</h4>}
          {description && <p className="text-slate-600 font-normal mt-0.5 leading-normal" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.35", fontWeight: 400 }}>{description}</p>}
        </div>
      )}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? "bg-blue-600 shadow-sm shadow-blue-500/30" : "bg-slate-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  description?: string;
}

function ImageUploadInput({ label, value, onChange, placeholder = "/images/sample.png", description }: ImageUploadInputProps) {
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
    <div className="space-y-2 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-left">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">{label}</label>
        {description && <span className="text-[10px] text-slate-400 font-bold">{description}</span>}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        {/* Live Image Thumbnail Preview */}
        {value ? (
          <div className="w-16 h-16 rounded-xl border border-slate-200 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-sm relative group">
            <img src={value} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute inset-0 bg-slate-900/80 text-white text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-lg border-none"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 bg-white shrink-0 flex flex-col items-center justify-center text-slate-400 text-[9px] font-black">
            <ImageIcon className="w-5 h-5 mb-0.5 text-slate-300" />
            No Photo
          </div>
        )}

        <div className="flex-grow space-y-2">
          {/* File path or Data URL input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
          />

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Upload Image Photo Button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider"
            >
              <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
              Upload Image Photo
            </button>

            <span className="text-[11px] font-bold text-slate-400">
              Pick photo from computer or enter URL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({
  initialUsers,
  initialProjects,
  initialDomains = [],
  initialConfig,
  currentUser,
  initialTab = "overview",
  isSuperAdminView = false
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const { state: a11yState, updateSetting: updateA11ySetting, applyProfile: applyA11yProfile, resetSettings: resetA11ySettings } = useAccessibility();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tabId === "overview") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tabId);
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && tab !== activeTab) {
        setActiveTab(tab);
      }
    }
  }, []);

  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [config, setConfig] = useState<ConfigType>(initialConfig);

  // Customizer local edits state
  const [editConfig, setEditConfig] = useState<ConfigType>(initialConfig);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [demoRequests, setDemoRequests] = useState<any[]>([]);
  const [loadingDemoRequests, setLoadingDemoRequests] = useState(false);

  // Universal Add Item / Page / Asset Modal State
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemPath, setNewItemPath] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Banners & Headers");
  const [newItemColor, setNewItemColor] = useState("#004bff");

  // Form Field Builder State
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<FormFieldType | null>(null);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState("");
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  const defaultFormFields: FormFieldType[] = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true, enabled: true },
    { id: "email", label: "Business Email", type: "email", placeholder: "name@company.com", required: true, enabled: true },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "9876543210", required: true, enabled: true },
    { id: "website", label: "Website URL", type: "url", placeholder: "https://company.com", required: true, enabled: true },
    { id: "company", label: "Company / Organization", type: "text", placeholder: "Acme Inc.", required: false, enabled: true },
    { id: "notes", label: "Project Notes & WCAG Goals", type: "textarea", placeholder: "Tell us about your website accessibility goals...", required: false, enabled: true },
  ];

  const handleToggleFormField = (fieldId: string, property: "required" | "enabled", val: boolean) => {
    const currentFields = editConfig.formFields || defaultFormFields;
    const updated = currentFields.map(f => f.id === fieldId ? { ...f, [property]: val } : f);
    setEditConfig({ ...editConfig, formFields: updated });
  };

  const handleAddFieldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldLabel.trim()) return;
    const fieldId = newFieldLabel.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const currentFields = editConfig.formFields || defaultFormFields;
    const updated = [
      ...currentFields,
      {
        id: fieldId,
        label: newFieldLabel.trim(),
        type: newFieldType,
        placeholder: newFieldPlaceholder.trim(),
        required: newFieldRequired,
        enabled: true,
      }
    ];
    setEditConfig({ ...editConfig, formFields: updated });
    setIsAddFieldModalOpen(false);
    setNewFieldLabel("");
    setNewFieldPlaceholder("");
    showToast(`Custom field "${newFieldLabel}" added to form template!`);
  };

  const handleEditFieldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingField) return;
    const currentFields = editConfig.formFields || defaultFormFields;
    const updated = currentFields.map(f => f.id === editingField.id ? editingField : f);
    setEditConfig({ ...editConfig, formFields: updated });
    setEditingField(null);
    showToast(`Field "${editingField.label}" updated!`);
  };

  const handleDeleteField = (fieldId: string) => {
    const currentFields = editConfig.formFields || defaultFormFields;
    const updated = currentFields.filter(f => f.id !== fieldId);
    setEditConfig({ ...editConfig, formFields: updated });
    showToast("Field removed from form template!");
  };

  // SEO Management State & Helper Functions
  const [selectedSeoPage, setSelectedSeoPage] = useState<string>("/");
  const [seoSubTab, setSeoSubTab] = useState<"general" | "social" | "image" | "schema" | "sitemap">("general");

  const defaultSeoPageData: SEOPageData = {
    seoTitle: "2all.ai | Enterprise AI Web Accessibility & Compliance Platform",
    metaDescription: "Automate WCAG 2.1 AA & ADA compliance scanning, remediation, and live accessibility widgets for enterprise websites in under 48 hours.",
    metaKeywords: "web accessibility, WCAG 2.1 AA, ADA compliance, automated remediation, AI accessibility widget, VPAT",
    canonicalUrl: "https://2all.ai",
    seoSlug: "/",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "2all.ai | Enterprise Web Accessibility & Compliance",
    ogDescription: "Automate web accessibility and legal compliance with AI-powered remediation.",
    ogImage: "https://2all.ai/images/dashboard/expert_services.png",
    ogUrl: "https://2all.ai",
    ogType: "website",
    twitterTitle: "2all.ai | Enterprise Web Accessibility & Compliance",
    twitterDescription: "Automate web accessibility and legal compliance with AI-powered remediation.",
    twitterImage: "https://2all.ai/images/dashboard/expert_services.png",
    twitterCard: "summary_large_image",
    twitterHandle: "@2all_ai",
    imageAltAttr: "2all.ai Enterprise Software & Accessibility Suite",
    imageTitleAttr: "2all.ai Brand Logo",
    imageCaptionAttr: "Powering platforms that scale your business.",
    schemaType: "Organization",
    schemaJsonPayload: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "2all.ai",
      "url": "https://2all.ai",
      "logo": "https://2all.ai/icon.jpeg",
      "sameAs": ["https://linkedin.com/company/2allai", "https://twitter.com/2all_ai"]
    }, null, 2),
    includeInSitemap: true,
    sitemapPriority: "1.0",
    sitemapChangefreq: "daily"
  };

  const getSeoDataForPage = (path: string): SEOPageData => {
    const existing = editConfig.seoPagesConfig?.[path];
    if (existing) return { ...defaultSeoPageData, ...existing };
    return {
      ...defaultSeoPageData,
      seoSlug: path,
      canonicalUrl: `https://2all.ai${path === "/" ? "" : path}`,
      seoTitle: path === "/" ? defaultSeoPageData.seoTitle : `${path.replace("/", "").replace(/-/g, " ").toUpperCase()} | 2all.ai Compliance`,
      ogTitle: path === "/" ? defaultSeoPageData.ogTitle : `${path.replace("/", "").replace(/-/g, " ").toUpperCase()} | 2all.ai Compliance`,
      twitterTitle: path === "/" ? defaultSeoPageData.twitterTitle : `${path.replace("/", "").replace(/-/g, " ").toUpperCase()} | 2all.ai Compliance`,
    };
  };

  const handleUpdateSeoPageField = (path: string, field: keyof SEOPageData, value: string) => {
    const currentSeoMap = editConfig.seoPagesConfig || {};
    const pageData = currentSeoMap[path] || getSeoDataForPage(path);
    const updatedMap = {
      ...currentSeoMap,
      [path]: {
        ...pageData,
        [field]: value
      }
    };
    setEditConfig({
      ...editConfig,
      seoPagesConfig: updatedMap
    });
  };

  const handleGenerateAiSeo = (path: string) => {
    const pageNames: Record<string, string> = {
      "/": "Homepage (Home)",
      "/about-us": "About Us & Enterprise Accessibility Mission",
      "/pricing": "Pricing Plans & Licensing Options",
      "/services": "Accessibility Remediation & Training Services",
      "/vpat": "VPAT 2.4 WCAG Level AA Conformance Report",
      "/small-business": "Small Business Web Accessibility Compliance",
      "/mid-large-business": "Enterprise & Mid-Large Corporate Accessibility",
      "/demo": "Schedule Live Accessibility Platform Walkthrough",
      "/contact-us": "Contact Support & Compliance Experts",
      "/login": "User Account Portal Login",
      "/register": "Create Free Accessibility Account",
    };
    const title = `${pageNames[path] || path} | 2all.ai Web Accessibility`;
    const desc = `Optimize digital accessibility and compliance for ${pageNames[path] || path} with 2all.ai automated WCAG 2.1 AA & ADA compliance scanning, real-time remediation, and VPAT reporting.`;
    const keywords = `accessibility, WCAG 2.1 AA, ADA compliance, ${path.replace("/", "") || "home"}, 2all.ai, audit, remediation`;
    
    handleUpdateSeoPageField(path, "seoTitle", title);
    handleUpdateSeoPageField(path, "metaDescription", desc);
    handleUpdateSeoPageField(path, "metaKeywords", keywords);
    showToast(`AI SEO generated for page "${path}"!`);
  };

  const handleResetSeo = (path: string) => {
    const currentSeoMap = { ...(editConfig.seoPagesConfig || {}) };
    delete currentSeoMap[path];
    setEditConfig({
      ...editConfig,
      seoPagesConfig: currentSeoMap
    });
    showToast(`SEO settings reset for "${path}"!`);
  };

  // Edit License Owner User State
  const [licenseSubTab, setLicenseSubTab] = useState<"users" | "template">("users");
  const [editingLicenseUser, setEditingLicenseUser] = useState<any | null>(null);
  const [licenseEditName, setLicenseEditName] = useState("");
  const [licenseEditEmail, setLicenseEditEmail] = useState("");
  const [licenseEditPhone, setLicenseEditPhone] = useState("");
  const [licenseEditPlan, setLicenseEditPlan] = useState("");
  const [isSavingLicenseUser, setIsSavingLicenseUser] = useState(false);

  const handleUpdateLicenseUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLicenseUser) return;
    setIsSavingLicenseUser(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingLicenseUser.id,
          name: licenseEditName,
          email: licenseEditEmail,
          phone: licenseEditPhone,
          plan: licenseEditPlan,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.map(u => u.id === editingLicenseUser.id ? {
          ...u,
          name: licenseEditName,
          email: licenseEditEmail,
          phone: licenseEditPhone,
          plan: licenseEditPlan,
        } : u));
        showToast("License owner info updated successfully!");
        setEditingLicenseUser(null);
      } else {
        showToast(data.message || "Failed to update license owner info", "error");
      }
    } catch (err) {
      showToast("Network error updating license owner info", "error");
    } finally {
      setIsSavingLicenseUser(false);
    }
  };

  // Edit Lead Modal State
  const [editingLead, setEditingLead] = useState<any | null>(null);

  const handleEditLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    try {
      const res = await fetch("/api/admin/demo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLead),
      });
      if (res.ok) {
        showToast(`Submission for "${editingLead.name}" updated!`);
        fetchDemoRequests();
        setEditingLead(null);
      }
    } catch (e) {
      showToast("Failed to update lead", "error");
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the submission for "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/demo?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`Submission for "${name}" deleted!`);
        fetchDemoRequests();
      }
    } catch (e) {
      showToast("Failed to delete submission", "error");
    }
  };

  const handleAddItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) {
      showToast("Title / Name field is required", "error");
      return;
    }

    if (activeTab === "form") {
      try {
        const res = await fetch("/api/admin/demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newItemTitle.trim(),
            email: newItemPath.trim() || "client@example.com",
            phone: newItemCategory.trim() || "+1 555 0199",
            website: newItemContent.trim() || "https://example.com",
          }),
        });
        if (res.ok) {
          showToast(`Form Submission for "${newItemTitle}" added!`);
          fetchDemoRequests();
        }
      } catch (e) {
        console.error("Error adding demo request", e);
      }

      setIsAddItemModalOpen(false);
      setNewItemTitle("");
      setNewItemPath("");
      setNewItemContent("");
      setNewItemCategory("Banners & Headers");
      setNewItemColor("#004bff");
      return;
    }

    let updatedConfig = { ...editConfig };

    if (activeTab === "media") {
      const currentAssets = editConfig.customAssets || [];
      updatedConfig.customAssets = [
        ...currentAssets,
        { name: newItemTitle.trim(), url: newItemPath.trim() || "/images/dashboard/custom_banner.png" }
      ];
      showToast(`Media Asset "${newItemTitle}" added successfully!`);
    } else if (activeTab === "whitelabel") {
      const presets = editConfig.brandPresets || [];
      updatedConfig.brandPresets = [
        ...presets,
        { name: newItemTitle.trim(), logo: newItemPath.trim() || "/images/agency_logo.png" }
      ];
      showToast(`Agency Brand Preset "${newItemTitle}" created!`);
    } else if (activeTab === "cssjs") {
      const existingJs = editConfig.customJs || "";
      updatedConfig.customJs = `${existingJs}\n/* [${newItemCategory}] ${newItemTitle} */\n${newItemContent}`;
      showToast(`Custom script snippet "${newItemTitle}" injected!`);
    } else if (activeTab === "translation") {
      const langs = editConfig.supportedLanguages || ["en", "es", "fr", "de", "ta"];
      const code = newItemPath.trim() || "ja";
      if (!langs.includes(code)) {
        updatedConfig.supportedLanguages = [...langs, code];
      }
      showToast(`New Language "${newItemTitle} (${code})" enabled!`);
    } else if (activeTab === "branding") {
      showToast(`Brand identity asset "${newItemTitle}" saved!`);
    } else {
      const currentLinks = editConfig.navLinks || [];
      updatedConfig.navLinks = [
        ...currentLinks,
        { label: newItemTitle.trim(), href: newItemPath.trim() || `/${newItemTitle.toLowerCase().replace(/\s+/g, "-")}` }
      ];
      showToast(`New Page / Link "${newItemTitle}" created and saved!`);
    }

    setEditConfig(updatedConfig);
    setIsAddItemModalOpen(false);
    setNewItemTitle("");
    setNewItemPath("");
    setNewItemContent("");
    setNewItemCategory("Banners & Headers");
    setNewItemColor("#004bff");

    // Persist changes to server API
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedConfig),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.config) setConfig(data.config);
      }
    } catch (e) {
      console.error("Error saving updated config", e);
    }
  };

  // Create Admin State (Super Admin exclusive)
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("ADMIN");
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  const handleCreateAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      showToast("Email and password are required.", "error");
      return;
    }
    setCreatingAdmin(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAdminName,
          email: newAdminEmail,
          password: newAdminPassword,
          role: newAdminRole,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUsers([data.user, ...users]);
        showToast(`New ${newAdminRole} account created for ${data.user.email}!`);
        setIsCreateAdminModalOpen(false);
        setNewAdminName("");
        setNewAdminEmail("");
        setNewAdminPassword("");
      } else {
        showToast(data.message || "Failed to create admin account", "error");
      }
    } catch (err) {
      showToast("Network error creating admin account", "error");
    } finally {
      setCreatingAdmin(false);
    }
  };

  const fetchDemoRequests = async () => {
    setLoadingDemoRequests(true);
    try {
      const res = await fetch("/api/admin/demo");
      if (res.ok) {
        const data = await res.json();
        setDemoRequests(data.requests || []);
      }
    } catch (e) {
      console.error("Failed to load demo requests", e);
    } finally {
      setLoadingDemoRequests(false);
    }
  };

  useEffect(() => {
    if (activeTab === "form") {
      fetchDemoRequests();
    }
  }, [activeTab]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Save UI Configuration API Call
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editConfig),
      });
      const data = await res.json();
      if (res.ok) {
        setConfig(data.config);
        showToast("Configuration saved successfully!");
      } else {
        showToast(data.message || "Failed to update configuration", "error");
      }
    } catch (err) {
      showToast("A network error occurred while saving configuration", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update User Role API Call
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        showToast(`User role updated to ${newRole}!`);
      } else {
        showToast(data.message || "Failed to update role", "error");
      }
    } catch (err) {
      showToast("Network error updating role", "error");
    }
  };

  // Delete User API Call
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action is irreversible.")) return;
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
        setProjects(projects.filter(p => p.user?.email !== users.find(u => u.id === userId)?.email));
        showToast("User deleted successfully!");
      } else {
        const data = await res.json();
        showToast(data.message || "Failed to delete user", "error");
      }
    } catch (err) {
      showToast("Network error deleting user", "error");
    }
  };

  const filteredUsers = users.filter(u =>
    (u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800 super-admin-typography">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR: BLUE & WHITE STYLING */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[294px] bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 select-none transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="overflow-y-auto flex-grow max-h-[calc(100vh-70px)]">
          {/* Logo */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Logo height={36} className="self-center" />
              <span className="text-xs font-black text-slate-400 tracking-wider uppercase mt-2.5 block leading-none">Console</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links Group 1: Main Management */}
          <div className="p-4 space-y-1">
            <span className="block text-[11px] font-black text-blue-600 uppercase tracking-widest mb-2 px-3 leading-none">Main Management</span>
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutGrid, essential: true },
              { id: "notification", label: "Notification", icon: BellRing, essential: true, badge: (users.length + projects.length) || 7 },
              { id: "users", label: "User Database", icon: UserCog, essential: true },
              { id: "domains", label: "Customer Workspace", icon: Globe, essential: true },
              { id: "api-keys", label: "API Keys Console", icon: KeyRound, essential: true },
              { id: "license-owner", label: "License Owner Info", icon: FileText, essential: true },
              { id: "accessibility", label: "Accessibility Suite Console", icon: Accessibility, essential: false },
              { id: "payments", label: "Payments Gateway", icon: CreditCard, essential: false },
              { id: "plans", label: "Plans & Feature Matrix", icon: Sliders, essential: false },
            ]
              .filter((tab) => isSuperAdminView || tab.essential)
              .map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      handleTabChange(tab.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-black transition-all cursor-pointer border-none ${isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
                      {tab.label}
                    </span>

                    {tab.badge && (
                      <span className={`px-2 py-0.5 text-[10px] font-black rounded-full transition-all ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm"
                          : "bg-red-500 text-white shadow-sm animate-pulse"
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>

          {/* Navigation Links Group 2: Platform Builder Modules (Super Admin Only) */}
          {isSuperAdminView && (
            <div className="p-4 pt-1 space-y-1">
              <span className="block text-[11px] font-black text-blue-600 uppercase tracking-widest mb-2 px-3 leading-none">Platform Builder Modules</span>
              {[
                { id: "sections", label: "Sections Builder (Dynamic)", icon: Layers },
                { id: "branding", label: "Branding & Email Config", icon: Mail },
                { id: "templates", label: "Dynamic Email Templates", icon: FileCode },
                { id: "theme", label: "Theme Manager", icon: Palette },
                { id: "website", label: "Website Builder", icon: Globe },
                { id: "navigation", label: "Navigation Builder", icon: Layers },
                { id: "landing", label: "Landing Page Builder", icon: Layout },
                { id: "cms", label: "CMS (Content Management)", icon: Sliders },
                { id: "features", label: "Feature Manager", icon: Settings },

                { id: "form", label: "Form Builder", icon: FileText },
                { id: "auth", label: "Auth Configuration", icon: ShieldCheck },
                { id: "cssjs", label: "Custom CSS/JS", icon: Code },
                { id: "whitelabel", label: "White-Label Manager", icon: UserCog },
                { id: "media", label: "Media Library", icon: FolderOpen },
                { id: "translation", label: "Translation Config", icon: Languages },
                { id: "seo", label: "SEO Management", icon: Search }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-black transition-all cursor-pointer border-none ${activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                      }`}
                  >
                    <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-extrabold text-sm rounded-xl transition-all cursor-pointer uppercase tracking-wider text-center"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            User Area
          </Link>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">

        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xs md:text-sm font-black text-slate-700 tracking-wider uppercase truncate">
            {activeTab === "sections" && "Universal Website Sections Builder"}
            {activeTab === "overview" && "Telemetry Overview Panel"}
            {activeTab === "accessibility" && "Accessibility Suite Control Console"}
            {activeTab === "users" && "System User Profiles Registry"}
            {activeTab === "license-owner" && "License Owner Info Registry"}
            {activeTab === "payments" && "Backend Payment Systems Integrations"}
            {activeTab === "branding" && "Branding Identity Manager"}
            {activeTab === "theme" && "Global Theme & Color manager"}
            {activeTab === "cssjs" && "Custom CSS / JS / Tracking script manager"}
            {["website", "navigation", "landing", "cms", "features", "dashboard", "form", "auth", "whitelabel", "media", "translation"].includes(activeTab) && `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module`}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <span className="text-xs md:text-sm font-extrabold text-slate-500 whitespace-nowrap bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">● Admin Console Active</span>
          </div>
        </header>

        {/* CONTENT VIEW */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">

          {/* UNIVERSAL ADD ITEM / ASSET / PAGE / LINK MODAL */}
          {isAddItemModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600" />
                    {activeTab === "media" && "Add New Media Asset"}
                    {activeTab === "whitelabel" && "Add New Agency Brand Preset"}
                    {activeTab === "branding" && "Add Identity Branding Asset"}
                    {activeTab === "navigation" && "Add Navigation Link / Menu Item"}
                    {activeTab === "cssjs" && "Inject Custom Script / CSS Tag"}
                    {activeTab === "translation" && "Add New Supported Language"}
                    {activeTab === "website" && "Add New Website Page"}
                    {activeTab === "landing" && "Add New Landing Section"}
                    {activeTab === "cms" && "Add CMS Content Page"}
                    {activeTab === "form" && "Add New Form Submission Lead"}
                    {!["media", "whitelabel", "branding", "navigation", "cssjs", "translation", "website", "landing", "cms", "form"].includes(activeTab) && "Add Custom Page / Item"}
                  </h3>
                  <button
                    onClick={() => setIsAddItemModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer border-none bg-transparent"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddItemSubmit} className="space-y-4">
                  {/* FORM TAB SPECIFIC FIELDS */}
                  {activeTab === "form" ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Customer Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Thomas Selva"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Business Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. thomas@company.com"
                          value={newItemPath}
                          onChange={(e) => setNewItemPath(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Phone Number</label>
                        <input
                          type="text"
                          placeholder="e.g. +91 9876543210"
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Website URL</label>
                        <input
                          type="text"
                          placeholder="e.g. https://company.com"
                          value={newItemContent}
                          onChange={(e) => setNewItemContent(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </>
                  ) : activeTab === "media" ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Title / Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Header Hero Banner Dark"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Category</label>
                        <select
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        >
                          <option value="Banners & Headers">Banners & Headers</option>
                          <option value="Logos & Badges">Logos & Badges</option>
                          <option value="Icons & Graphics">Icons & Graphics</option>
                          <option value="Widgets & Overlays">Widgets & Overlays</option>
                          <option value="General Assets">General Assets</option>
                        </select>
                      </div>

                      <ImageUploadInput
                        label="Asset Photo / Image File"
                        value={newItemPath}
                        onChange={(val) => setNewItemPath(val)}
                        placeholder="/images/dashboard/custom_banner.png"
                        description="Upload photo from computer or enter URL"
                      />
                    </>
                  ) : activeTab === "whitelabel" ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Agency / Brand Preset Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Apex Media Reseller"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <ImageUploadInput
                        label="Agency Custom Logo Photo"
                        value={newItemPath}
                        onChange={(val) => setNewItemPath(val)}
                        placeholder="/images/agency_logo.png"
                        description="Upload agency logo photo"
                      />

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Accent Color (Hex)</label>
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                          <input
                            type="color"
                            value={newItemColor.startsWith("#") ? newItemColor : "#004bff"}
                            onChange={(e) => setNewItemColor(e.target.value)}
                            className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                          />
                          <input
                            type="text"
                            value={newItemColor}
                            onChange={(e) => setNewItemColor(e.target.value)}
                            placeholder="#004bff"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </>
                  ) : activeTab === "translation" ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Language Display Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Japanese (日本語)"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">ISO 639-1 Language Code</label>
                        <input
                          type="text"
                          placeholder="e.g. ja"
                          value={newItemPath}
                          onChange={(e) => setNewItemPath(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                    </>
                  ) : activeTab === "cssjs" ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Script / Tag Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Google Tag Manager Script"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Injection Position</label>
                        <select
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        >
                          <option value="Head Tag (<head>)">Head Tag (&lt;head&gt;)</option>
                          <option value="Body Start (<body>)">Body Start (&lt;body&gt;)</option>
                          <option value="Body End (</body>)">Body End (&lt;/body&gt;)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Custom JS / CSS Code Snippet</label>
                        <textarea
                          rows={4}
                          placeholder="// Enter JavaScript / CSS snippet here"
                          value={newItemContent}
                          onChange={(e) => setNewItemContent(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-emerald-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  ) : activeTab === "navigation" ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Navigation Link Text</label>
                        <input
                          type="text"
                          placeholder="e.g. Enterprise Pricing"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Target URL / HREF Link</label>
                        <input
                          type="text"
                          placeholder="e.g. /pricing#enterprise"
                          value={newItemPath}
                          onChange={(e) => setNewItemPath(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Page / Section Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Accessibility Audit Calculator"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">URL Slug / Path</label>
                        <input
                          type="text"
                          placeholder="e.g. /audit-calculator"
                          value={newItemPath}
                          onChange={(e) => setNewItemPath(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <ImageUploadInput
                        label="Featured Header Image Photo (Optional)"
                        value={newItemContent}
                        onChange={(val) => setNewItemContent(val)}
                        placeholder="/images/dashboard/custom_page_header.png"
                        description="Upload page header photo"
                      />
                    </>
                  )}

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddItemModalOpen(false)}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border-none transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      {activeTab === "form" && "Add Form Submission"}
                      {activeTab === "media" && "Save Media Asset"}
                      {activeTab === "whitelabel" && "Add Brand Preset"}
                      {activeTab === "translation" && "Add Language"}
                      {activeTab === "cssjs" && "Inject Script Tag"}
                      {activeTab === "navigation" && "Add Navigation Link"}
                      {activeTab === "branding" && "Save Brand Asset"}
                      {["website", "landing", "cms"].includes(activeTab) && "Create New Page"}
                      {!["form", "media", "whitelabel", "translation", "cssjs", "navigation", "branding", "website", "landing", "cms"].includes(activeTab) && "Save Item"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB: WEBSITE SECTIONS BUILDER */}
          {activeTab === "sections" && (
            <AdminSectionsManager />
          )}

          {/* TAB: ACCESSIBILITY SUITE ADMIN CONSOLE */}
          {activeTab === "accessibility" && (
            <div className="space-y-8 animate-in fade-in duration-200 text-left">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-[#0a1e3f] via-[#042868] to-[#004bff] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-black text-cyan-300 border border-white/20 uppercase tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5" /> WCAG 2.1 AA Admin Control Panel
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Accessibility Suite Admin Console</h2>
                    <p className="text-sm text-blue-100 font-medium max-w-2xl leading-relaxed">
                      Control and configure all web accessibility tools, voice navigation engines, contrast profiles, reading tools, and compliance standards globally from this console.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl text-white border border-white/30">
                      100
                    </div>
                    <div>
                      <span className="block text-sm font-black uppercase tracking-widest text-cyan-300">Global Score</span>
                      <span className="block text-sm font-bold text-white">WCAG 2.1 AA Compliant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Links Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2 font-bold text-blue-950">
                  <KeyRound className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Direct Admin Link: <code className="bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-700 font-mono text-sm">/admin/dashboard?tab=accessibility</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/admin/login" className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors">
                    Admin Login
                  </Link>
                  <Link href="/dashboard" className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                    Customer Workspace
                  </Link>
                </div>
              </div>

              {/* Grid 1: Voice & Contrast Admin Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Voice & Speech Controls */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-slate-900 font-black text-base">
                      <Mic className="w-5 h-5 text-blue-600" />
                      Voice & Speech Navigation Admin
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md">Live Engine</span>
                  </div>

                  <div className="space-y-3">
                    {/* Voice Navigation Toggle */}
                    <div 
                      onClick={() => updateA11ySetting("voiceNavigation", !a11yState.voiceNavigation)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${a11yState.voiceNavigation ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div>
                        <h4 className="text-base font-black text-slate-900">Voice Command Navigation</h4>
                        <p className="text-xs text-slate-500 font-medium mt-1">Control website by speaking any word (Pricing, VPAT, Footer, Solutions)</p>
                      </div>
                      <button
                        type="button"
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          a11yState.voiceNavigation ? "bg-blue-600 shadow-sm shadow-blue-500/30" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            a11yState.voiceNavigation ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Text-To-Speech Toggle */}
                    <div 
                      onClick={() => updateA11ySetting("textToSpeech", !a11yState.textToSpeech)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${a11yState.textToSpeech ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div>
                        <h4 className="text-base font-black text-slate-900">Read Aloud (Text-to-Speech Engine)</h4>
                        <p className="text-xs text-slate-500 font-medium mt-1">Hover or click elements to listen to spoken narration</p>
                      </div>
                      <button
                        type="button"
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          a11yState.textToSpeech ? "bg-blue-600 shadow-sm shadow-blue-500/30" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            a11yState.textToSpeech ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <button 
                      onClick={() => updateA11ySetting("isVoiceSettingsOpen", true)}
                      className="w-full py-3 px-4 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" /> Open Voice Parameter Settings
                    </button>
                  </div>
                </div>

                {/* Color & Contrast Admin Controls */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-slate-900 font-black text-base">
                      <Eye className="w-5 h-5 text-blue-600" />
                      Color & Contrast Control Suite
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md">Visual Engine</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Dark Contrast",
                        isActive: a11yState.isDarkMode || a11yState.isHighContrast,
                        toggle: () => {
                          const next = !(a11yState.isDarkMode || a11yState.isHighContrast);
                          updateA11ySetting("isDarkMode", next);
                          updateA11ySetting("isHighContrast", next);
                        }
                      },
                      {
                        label: "Monochrome",
                        isActive: a11yState.saturationMode === "monochrome",
                        toggle: () => updateA11ySetting("saturationMode", a11yState.saturationMode === "monochrome" ? "normal" : "monochrome")
                      },
                      {
                        label: "High Saturation",
                        isActive: a11yState.saturationMode === "high",
                        toggle: () => updateA11ySetting("saturationMode", a11yState.saturationMode === "high" ? "normal" : "high")
                      },
                      {
                        label: "Low Saturation",
                        isActive: a11yState.saturationMode === "low",
                        toggle: () => updateA11ySetting("saturationMode", a11yState.saturationMode === "low" ? "normal" : "low")
                      }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.toggle}
                        className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${item.isActive ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-300'}`}
                      >
                        <span className="text-sm font-bold">{item.label}</span>
                        <div className={`w-3 h-3 rounded-full border ${item.isActive ? 'bg-white border-white' : 'border-slate-400'}`} />
                      </button>
                    ))}
                  </div>

                  {/* Reset Suite */}
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={resetA11ySettings}
                      className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" /> Reset Suite Settings
                    </button>
                  </div>
                </div>

              </div>

              {/* Grid 2: Smart Profiles & Assistive Reading Presets */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Admin Presets & Assistive Reading Profiles
                  </div>
                  <span className="text-sm font-extrabold uppercase px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md">Quick Presets</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { id: "dyslexia", label: "Dyslexia Friendly" },
                    { id: "adhd", label: "ADHD Mode" },
                    { id: "low-vision", label: "Visually Impaired" },
                    { id: "blind", label: "Screen Reader" },
                    { id: "cognitive", label: "Cognitive Focus" },
                    { id: "seizure", label: "Seizure Safe" },
                  ].map((p) => {
                    const isActive = a11yState.activeProfile === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => applyA11yProfile(isActive ? "none" : p.id as any)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer select-none ${isActive ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300 font-semibold'}`}
                      >
                        <span className="text-sm">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: ACCESSIBILITY MENU CUSTOMIZER & BUILDER */}
              <AdminAccessibilityMenuManager />

            </div>
          )}
{/* TAB 0: DASHBOARD & OVERVIEW */}
{(activeTab === "dashboard" || activeTab === "overview") && <AdminDashboardPage users={users} projects={projects} domains={initialDomains} />}


          {/* TAB 1: UNIFIED NOTIFICATION CENTER */}
          {activeTab === "notification" && (
            <AdminNotificationCenter users={users} projects={projects} />
          )}

          {/* TAB 2: BRANDING MANAGER */}
          {activeTab === "branding" && (
            <div className="grid lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200 text-left">
              {/* Form settings */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Identity & Branding Copy</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Customize global site text tags and button copy elements.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddItemModalOpen(true)}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer border-none uppercase tracking-wider shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Item / Page
                  </button>
                </div>

                <form onSubmit={handleSaveConfig} className="space-y-6">
                  {/* Dynamic Email System Manager Card */}
                  <div className="p-4 bg-blue-50/50 border border-blue-200/80 rounded-2xl space-y-4">
                    <div className="flex items-start gap-2.5 border-b border-blue-200/60 pb-3.5">
                      <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-black text-slate-900 tracking-tight" style={{ fontSize: "17px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.3" }}>
                          Dynamic Email Engine &amp; SMTP Dispatcher
                        </h4>
                        <p className="text-slate-600 font-normal" style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.7", marginTop: "8px" }}>
                          Configure dynamic FROM sender email, display name, and TO admin receiver address for all site forms, login, demo, and support scripts.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* FROM Sender Email */}
                      <div className="space-y-1.5">
                        <label className="block font-black text-slate-700 uppercase tracking-wider" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>
                          Outbound FROM Email Sender
                        </label>
                        <input
                          type="email"
                          value={editConfig.smtpFromEmail || "aachinancy@gmail.com"}
                          onChange={(e) => setEditConfig({ ...editConfig, smtpFromEmail: e.target.value })}
                          placeholder="aachinancy@gmail.com"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-xs"
                          style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                        />
                        <p className="text-slate-500 font-normal" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.6", marginTop: "5px" }}>
                          Address used in the 'From' header for all dispatched emails.
                        </p>
                      </div>

                      {/* FROM Display Name */}
                      <div className="space-y-1.5">
                        <label className="block font-black text-slate-700 uppercase tracking-wider" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>
                          Outbound FROM Sender Name
                        </label>
                        <input
                          type="text"
                          value={editConfig.smtpFromName || "2all.ai Team"}
                          onChange={(e) => setEditConfig({ ...editConfig, smtpFromName: e.target.value })}
                          placeholder="2all.ai Team"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-xs"
                          style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                        />
                        <p className="text-slate-500 font-normal" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.6", marginTop: "5px" }}>
                          Brand display name shown in user email inboxes.
                        </p>
                      </div>
                    </div>

                    {/* TO Admin Notification Email Receiver */}
                    <div className="space-y-1.5 pt-2 border-t border-blue-200/50">
                      <label className="block font-black text-blue-900 uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        Inbound TO Admin Notification Email Receiver
                      </label>
                      <input
                        type="email"
                        value={editConfig.notificationAdminEmail || "nancythomasselva@gmail.com"}
                        onChange={(e) => setEditConfig({ ...editConfig, notificationAdminEmail: e.target.value })}
                        placeholder="nancythomasselva@gmail.com"
                        className="w-full bg-white border border-blue-300 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-xs"
                        style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                      />
                      <p className="text-blue-600 font-normal" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.6", marginTop: "5px" }}>
                        All demo requests, contact form entries, user signup alerts, login activity, and script support inquiries are dynamically delivered to this email address.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Brand Name</label>
                      <input
                        type="text"
                        value={editConfig.brandName}
                        onChange={(e) => setEditConfig({ ...editConfig, brandName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Trial Button CTA</label>
                      <input
                        type="text"
                        value={editConfig.trialButtonText}
                        onChange={(e) => setEditConfig({ ...editConfig, trialButtonText: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Tagline / Subheading</label>
                    <input
                      type="text"
                      value={editConfig.tagline}
                      onChange={(e) => setEditConfig({ ...editConfig, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Demo Button CTA</label>
                      <input
                        type="text"
                        value={editConfig.demoButtonText}
                        onChange={(e) => setEditConfig({ ...editConfig, demoButtonText: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Trial Duration (Days)</label>
                      <input
                        type="number"
                        value={editConfig.trialPeriodDays}
                        onChange={(e) => setEditConfig({ ...editConfig, trialPeriodDays: parseInt(e.target.value) || 7 })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Formal Toggle switches */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <FormalToggle
                      checked={editConfig.showTrialButton}
                      onChange={(val) => setEditConfig({ ...editConfig, showTrialButton: val })}
                      label="Show Trial CTA"
                      description="Display Start Free Trial button in hero banner"
                    />
                    <FormalToggle
                      checked={editConfig.showDemoButton}
                      onChange={(val) => setEditConfig({ ...editConfig, showDemoButton: val })}
                      label="Show Demo CTA"
                      description="Display Book A Demo button in hero banner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                  >
                    <Save className="w-4.5 h-4.5" />
                    {loading ? "Saving Changes..." : "Save Branding Config"}
                  </button>

                </form>
              </div>

              {/* Real-time Hero Preview Block */}
              <div className="lg:col-span-5 space-y-3">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Homepage Preview</span>
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 relative overflow-hidden flex flex-col justify-center items-center text-center h-[280px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />

                  {(() => {
                    const previewColorMap = {
                      blue: { bg: "bg-blue-600", text: "text-blue-500", border: "border-blue-100", lightBg: "bg-blue-50" },
                      purple: { bg: "bg-purple-600", text: "text-purple-500", border: "border-purple-100", lightBg: "bg-purple-50" },
                      emerald: { bg: "bg-emerald-600", text: "text-emerald-500", border: "border-emerald-100", lightBg: "bg-emerald-50" },
                      indigo: { bg: "bg-indigo-600", text: "text-indigo-500", border: "border-indigo-100", lightBg: "bg-indigo-50" },
                      orange: { bg: "bg-orange-600", text: "text-orange-500", border: "border-orange-100", lightBg: "bg-orange-50" },
                    };
                    const theme = previewColorMap[editConfig.primaryColor as keyof typeof previewColorMap] || previewColorMap.blue;

                    return (
                      <>
                        <span className={`px-2.5 py-0.5 ${theme.lightBg} border ${theme.border} rounded-full text-[9px] font-black ${theme.text} uppercase tracking-wider mb-4`}>
                          Hero Section
                        </span>

                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">
                          {editConfig.brandName}
                        </h2>
                        <p className="text-xs text-slate-400 font-bold max-w-xs leading-relaxed mb-6">
                          {editConfig.tagline}
                        </p>

                        <div className="flex gap-3">
                          {editConfig.showTrialButton && (
                            <span className={`px-4 py-2 ${theme.bg} text-white font-extrabold text-[9px] rounded-lg tracking-wider uppercase select-none shadow-sm`}>
                              {editConfig.trialButtonText}
                            </span>
                          )}
                          {editConfig.showDemoButton && (
                            <span className="px-4 py-2 border border-slate-200 text-slate-500 font-extrabold text-[9px] rounded-lg tracking-wider uppercase select-none">
                              {editConfig.demoButtonText}
                            </span>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

            </div>
          )}

          {/* TAB: DYNAMIC EMAIL TEMPLATES */}
          {activeTab === "templates" && (
            <AdminEmailTemplatesEditor />
          )}

          {/* TAB 3: THEME MANAGER */}
          {activeTab === "theme" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-2xl text-left animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Theme & Visual Elements</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Customize global site colors and widgets iconography.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Item / Page
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-6 mt-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Theme Color Accent (Custom Hex Color Picker)</label>
                  
                  {/* Preset Swatches */}
                  <div className="flex flex-wrap gap-2.5 items-center py-1">
                    {[
                      { name: "blue", hex: "#004bff", bg: "bg-blue-600" },
                      { name: "purple", hex: "#9333ea", bg: "bg-purple-600" },
                      { name: "emerald", hex: "#059669", bg: "bg-emerald-600" },
                      { name: "indigo", hex: "#4f46e5", bg: "bg-indigo-600" },
                      { name: "orange", hex: "#ea580c", bg: "bg-orange-600" },
                      { name: "rose", hex: "#e11d48", bg: "bg-rose-600" },
                      { name: "red", hex: "#dc2626", bg: "bg-red-600" },
                      { name: "gold", hex: "#d97706", bg: "bg-amber-600" },
                    ].map((item) => {
                      const isSelected = editConfig.primaryColor === item.name || editConfig.primaryColor === item.hex;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          title={item.name}
                          onClick={() => setEditConfig({ ...editConfig, primaryColor: item.hex })}
                          className={`w-8 h-8 rounded-full border-2 ${item.bg} cursor-pointer transition-all ${isSelected ? "border-slate-900 scale-110 shadow-lg ring-2 ring-slate-400" : "border-transparent opacity-80 hover:opacity-100"}`}
                        />
                      );
                    })}
                  </div>

                  {/* Custom Hex Picker Input */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <input
                      type="color"
                      value={editConfig.primaryColor.startsWith("#") ? editConfig.primaryColor : "#004bff"}
                      onChange={(e) => setEditConfig({ ...editConfig, primaryColor: e.target.value })}
                      className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <div className="flex-grow space-y-0.5">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Custom Hex Color Code</span>
                      <input
                        type="text"
                        value={editConfig.primaryColor}
                        onChange={(e) => setEditConfig({ ...editConfig, primaryColor: e.target.value })}
                        placeholder="#004bff"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div
                      className="w-10 h-10 rounded-xl border border-slate-300 shadow-sm shrink-0 flex items-center justify-center font-mono text-[9px] font-black text-white"
                      style={{ backgroundColor: editConfig.primaryColor.startsWith("#") ? editConfig.primaryColor : "#004bff" }}
                    >
                      Preview
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Orbit Center Icon Widget</label>
                  <select
                    value={editConfig.orbitIcon}
                    onChange={(e) => setEditConfig({ ...editConfig, orbitIcon: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer"
                  >
                    <option value="globe">Globe (Icon)</option>
                    <option value="shield">Shield (Icon)</option>
                    <option value="sparkles">Sparkles (Icon)</option>
                    <option value="award">Award (Icon)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving Changes..." : "Save Theme Config"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: CUSTOM CSS/JS (MATCHES THE SCREENSHOT EXACTLY) */}
          {activeTab === "cssjs" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-4xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Custom CSS / JS / Tracking script manager</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Inject styling and client analytics tags globally onto head/body.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Script / Page
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Inject Custom CSS</label>
                  <textarea
                    rows={4}
                    value={editConfig.customCss}
                    onChange={(e) => setEditConfig({ ...editConfig, customCss: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[11px] font-mono text-emerald-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Inject Custom Javascript</label>
                  <textarea
                    rows={4}
                    value={editConfig.customJs}
                    onChange={(e) => setEditConfig({ ...editConfig, customJs: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[11px] font-mono text-emerald-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Analytics/Tracking scripts (Google Analytics / Pixel)</label>
                  <textarea
                    rows={4}
                    value={editConfig.trackingScripts}
                    onChange={(e) => setEditConfig({ ...editConfig, trackingScripts: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[11px] font-mono text-emerald-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-[#00a88f] hover:bg-[#009680] disabled:bg-teal-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-teal-500/10 transition-all cursor-pointer border-none uppercase tracking-wider flex items-center gap-2"
                >
                  <FileCode className="w-4.5 h-4.5" />
                  {loading ? "Injecting..." : "Inject Code scripts"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: WEBSITE BUILDER */}
          {activeTab === "website" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Website Builder Configuration</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Customize global site titles, hero banners, theme accents, and audit callouts.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Page
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Site Brand Name</label>
                    <input
                      type="text"
                      value={editConfig.brandName}
                      onChange={(e) => setEditConfig({ ...editConfig, brandName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Site Tagline</label>
                    <input
                      type="text"
                      value={editConfig.tagline}
                      onChange={(e) => setEditConfig({ ...editConfig, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Hero Banner Heading Title</label>
                  <input
                    type="text"
                    value={editConfig.heroTitle || "Empower Every User with AI Web Accessibility"}
                    onChange={(e) => setEditConfig({ ...editConfig, heroTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Hero Banner Subtitle</label>
                  <textarea
                    rows={2}
                    value={editConfig.heroSubtitle || "Automatically align your website with WCAG 2.1 AA & ADA compliance in under 48 hours."}
                    onChange={(e) => setEditConfig({ ...editConfig, heroSubtitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Audit Banner Title</label>
                  <input
                    type="text"
                    value={editConfig.auditBannerTitle}
                    onChange={(e) => setEditConfig({ ...editConfig, auditBannerTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <FormalToggle
                    checked={editConfig.showTrialButton}
                    onChange={(val) => setEditConfig({ ...editConfig, showTrialButton: val })}
                    label="Show Free Trial CTA"
                    description="Display Start Free Trial button on homepage"
                  />
                  <FormalToggle
                    checked={editConfig.showDemoButton}
                    onChange={(val) => setEditConfig({ ...editConfig, showDemoButton: val })}
                    label="Show Book Demo CTA"
                    description="Display Book A Demo button on homepage"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving Changes..." : "Save Website Config"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: NAVIGATION BUILDER */}
          {activeTab === "navigation" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-5xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-slate-900 tracking-tight" style={{ fontSize: "17px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.3" }}>Navigation Builder &amp; Link Hierarchy</h3>
                  <p className="text-slate-600 font-normal" style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.7", marginTop: "8px" }}>Customize global site navbar links, megamenu items, call-to-action buttons, and header/footer link layout.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                  style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add Nav Link / Page
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/40 p-4 border border-blue-100 rounded-2xl">
                  <div className="space-y-1.5">
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>Header Call-To-Action Button Text</label>
                    <input
                      type="text"
                      value={editConfig.trialButtonText || "START FREE TRIAL"}
                      onChange={(e) => setEditConfig({ ...editConfig, trialButtonText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                      style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                    />
                  </div>

                  <div className="pt-6">
                    <FormalToggle
                      checked={editConfig.showNavCta ?? true}
                      onChange={(val) => setEditConfig({ ...editConfig, showNavCta: val })}
                      label="Show Header CTA Buttons"
                      description="Toggle visibility of Login, Book Demo, and Start Trial in top navigation bar"
                    />
                  </div>
                </div>

                {/* Global Navigation Links Directory & Editor */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900 tracking-tight" style={{ fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                      Active Site Navigation Links ({((editConfig.navLinks && editConfig.navLinks.length > 0) ? editConfig.navLinks : [
                        { label: "Solutions", href: "/solutions", type: "Header Megamenu" },
                        { label: "Company", href: "/company", type: "Header Megamenu" },
                        { label: "Partners", href: "/partners", type: "Header Megamenu" },
                        { label: "Pricing", href: "/pricing", type: "Header Link" },
                        { label: "Book Demo", href: "/demo", type: "Header Link" },
                        { label: "Agency Workspace", href: "/agency", type: "Header Link" },
                        { label: "Accessibility Suite", href: "/compliance", type: "Footer Link" },
                        { label: "Privacy Policy", href: "/privacy", type: "Footer Link" },
                        { label: "Terms of Service", href: "/terms", type: "Footer Link" },
                      ]).length})
                    </h4>
                    <span className="text-slate-500 font-normal" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>
                      Edit labels or URL paths directly below
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100/80 border-b border-slate-200/80 text-slate-700">
                            <th className="py-3 px-4 font-black uppercase tracking-wider" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>Link Label</th>
                            <th className="py-3 px-4 font-black uppercase tracking-wider" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>URL Path / Href</th>
                            <th className="py-3 px-4 font-black uppercase tracking-wider" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>Menu Type</th>
                            <th className="py-3 px-4 font-black uppercase tracking-wider text-right" style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {((editConfig.navLinks && editConfig.navLinks.length > 0) ? editConfig.navLinks : [
                            { label: "Solutions", href: "/solutions", type: "Header Megamenu" },
                            { label: "Company", href: "/company", type: "Header Megamenu" },
                            { label: "Partners", href: "/partners", type: "Header Megamenu" },
                            { label: "Pricing", href: "/pricing", type: "Header Link" },
                            { label: "Book Demo", href: "/demo", type: "Header Link" },
                            { label: "Agency Workspace", href: "/agency", type: "Header Link" },
                            { label: "Accessibility Suite", href: "/compliance", type: "Footer Link" },
                            { label: "Privacy Policy", href: "/privacy", type: "Footer Link" },
                            { label: "Terms of Service", href: "/terms", type: "Footer Link" },
                          ]).map((link: any, idx: number) => {
                            const currentLinks = (editConfig.navLinks && editConfig.navLinks.length > 0) ? editConfig.navLinks : [
                              { label: "Solutions", href: "/solutions", type: "Header Megamenu" },
                              { label: "Company", href: "/company", type: "Header Megamenu" },
                              { label: "Partners", href: "/partners", type: "Header Megamenu" },
                              { label: "Pricing", href: "/pricing", type: "Header Link" },
                              { label: "Book Demo", href: "/demo", type: "Header Link" },
                              { label: "Agency Workspace", href: "/agency", type: "Header Link" },
                              { label: "Accessibility Suite", href: "/compliance", type: "Footer Link" },
                              { label: "Privacy Policy", href: "/privacy", type: "Footer Link" },
                              { label: "Terms of Service", href: "/terms", type: "Footer Link" },
                            ];
                            return (
                              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-2.5 px-4">
                                  <input
                                    type="text"
                                    value={link.label}
                                    onChange={(e) => {
                                      const updated = [...currentLinks];
                                      updated[idx] = { ...updated[idx], label: e.target.value };
                                      setEditConfig({ ...editConfig, navLinks: updated });
                                    }}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                    style={{ fontSize: "14px", fontFamily: '"Times New Roman", Times, serif' }}
                                  />
                                </td>
                                <td className="py-2.5 px-4">
                                  <input
                                    type="text"
                                    value={link.href}
                                    onChange={(e) => {
                                      const updated = [...currentLinks];
                                      updated[idx] = { ...updated[idx], href: e.target.value };
                                      setEditConfig({ ...editConfig, navLinks: updated });
                                    }}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                    style={{ fontSize: "14px", fontFamily: '"Times New Roman", Times, serif' }}
                                  />
                                </td>
                                <td className="py-2.5 px-4 whitespace-nowrap">
                                  <span className={`inline-block px-2.5 py-1 rounded-md font-bold ${
                                    (link.type || "Header Link").includes("Megamenu")
                                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                                      : (link.type || "Header Link").includes("Footer")
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                      : "bg-blue-50 text-blue-700 border border-blue-200"
                                  }`} style={{ fontSize: "12px", fontFamily: '"Times New Roman", Times, serif' }}>
                                    {link.type || "Header Link"}
                                  </span>
                                </td>
                                <td className="py-2.5 px-4 text-right whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = currentLinks.filter((_: any, i: number) => i !== idx);
                                      setEditConfig({ ...editConfig, navLinks: updated });
                                    }}
                                    className="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors border border-red-200 cursor-pointer"
                                    title="Delete Navigation Link"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                  style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save All Navigation Settings"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: LANDING PAGE BUILDER & WEBSITE CONFIGURATION */}
          {(activeTab === "landing" || activeTab === "website") && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-4xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-slate-900 tracking-tight" style={{ fontSize: "17px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.3" }}>Website Builder Configuration</h3>
                  <p className="text-slate-600 font-normal" style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif', lineHeight: "1.7", marginTop: "8px" }}>Customize global site titles, hero banners, theme accents, and audit callouts.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                  style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Page
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>Site Brand Name</label>
                    <input
                      type="text"
                      value={editConfig.brandName || "2all.ai"}
                      onChange={(e) => setEditConfig({ ...editConfig, brandName: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>Site Tagline</label>
                    <input
                      type="text"
                      value={editConfig.tagline || "Intelligence that scans & remediates web accessibility"}
                      onChange={(e) => setEditConfig({ ...editConfig, tagline: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>Hero Banner Heading Title</label>
                  <input
                    type="text"
                    value={editConfig.heroTitle || "Empower Every User with AI Web Accessibility"}
                    onChange={(e) => setEditConfig({ ...editConfig, heroTitle: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>Hero Banner Subtitle</label>
                  <textarea
                    rows={2}
                    value={editConfig.heroSubtitle || "Automatically align your website with WCAG 2.1 AA & ADA compliance in under 48 hours."}
                    onChange={(e) => setEditConfig({ ...editConfig, heroSubtitle: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5" style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}>Audit Banner Title</label>
                  <input
                    type="text"
                    value={editConfig.auditBannerTitle || "Put your website to the accessibility test"}
                    onChange={(e) => setEditConfig({ ...editConfig, auditBannerTitle: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    style={{ fontSize: "15px", fontFamily: '"Times New Roman", Times, serif' }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <FormalToggle
                    checked={editConfig.showTrialButton ?? true}
                    onChange={(val) => setEditConfig({ ...editConfig, showTrialButton: val })}
                    label="Show Free Trial CTA"
                    description="Display Start Free Trial button on homepage"
                  />
                  <FormalToggle
                    checked={editConfig.showDemoButton ?? true}
                    onChange={(val) => setEditConfig({ ...editConfig, showDemoButton: val })}
                    label="Show Book Demo CTA"
                    description="Display Book A Demo button on homepage"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                  style={{ fontSize: "13px", fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Website Configuration"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: PAYMENTS */}
          {activeTab === "payments" && (
            <div className="grid md:grid-cols-2 gap-6 animate-in fade-in duration-200 text-left">
              {/* Stripe Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0a1e3f] tracking-tight">Stripe Gateway</h3>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">Standard card checkout payments</p>
                    </div>
                  </div>
                </div>

                <FormalToggle
                  checked={editConfig.stripeActive}
                  onChange={(val) => setEditConfig({ ...editConfig, stripeActive: val })}
                  label="Enable Stripe Credit Card Gateway"
                  description="Accept Visa, Mastercard, AMEX, and Apple Pay payments"
                />

                <div className="space-y-1.5 pt-2">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Stripe Public Key</label>
                  <input
                    type="text"
                    value="pk_test_51Mz2allAiSecretPublicKeyExample12345"
                    disabled
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-medium text-slate-600"
                  />
                </div>
              </div>

              {/* PayPal Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M7.076 2.136C7.79 1.48 8.79 1 10.05 1h6.63c.69 0 1.25.5 1.34 1.18l1.94 13.62c.07.5-.3.94-.8.94h-4.3l-.22-1.57c-.1-.7-.7-.12-1.3-.12H9.01c-.56 0-1.02-.45-1.12-1.01L6.15 2.17a1 1 0 0 1 .92-1.03zm-1.8 4.2l-.76 5.3c-.1.55.33 1.01.89 1.01h2.24l.58-4.08a.5.5 0 0 1 .49-.43h3.58c.84 0 1.5-.32 1.97-.75.48-.43.76-1.1.66-1.85-.12-.86-.88-1.51-1.74-1.51H7.81c-.55 0-1.01.44-1.11.99L5.27 6.34z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0a1e3f] tracking-tight">PayPal Gateway</h3>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">Standard alternative payments checkout</p>
                    </div>
                  </div>
                </div>

                <FormalToggle
                  checked={editConfig.paypalActive}
                  onChange={(val) => setEditConfig({ ...editConfig, paypalActive: val })}
                  label="Enable PayPal Express Checkout"
                  description="Accept PayPal balance and Venmo transactions"
                />

                <div className="space-y-1.5 pt-2">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">PayPal Client ID</label>
                  <input
                    type="text"
                    value="Af_2allAiPayPalClientIdMockExample998877"
                    disabled
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-medium text-slate-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: SUBSCRIPTION PLANS & FEATURE MATRIX MANAGER */}
          {activeTab === "plans" && (
            <AdminPlansManager />
          )}

          {/* TAB 7: USERS DATABASE */}
          {activeTab === "users" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">

              {/* Search filter and Create Admin Header */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl px-5 py-4 shadow-sm">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider hidden sm:inline">
                    {filteredUsers.length} of {users.length} Users
                  </span>
                  <button
                    onClick={() => setIsCreateAdminModalOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider shrink-0"
                  >
                    <UserCog className="w-4 h-4 stroke-[2.5]" /> Create Admin Account
                  </button>
                </div>
              </div>

              {/* MODAL: CREATE ADMIN ACCOUNT */}
              {isCreateAdminModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <UserCog className="w-4.5 h-4.5 text-blue-600" /> Create New Admin Account
                      </h3>
                      <button
                        onClick={() => setIsCreateAdminModalOpen(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateAdminSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Alex Harrison"
                          value={newAdminName}
                          onChange={(e) => setNewAdminName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          placeholder="admin.alex@2all.ai"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Assigned Security Role</label>
                        <select
                          value={newAdminRole}
                          onChange={(e) => setNewAdminRole(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        >
                          <option value="ADMIN">ADMIN (Operations & Content)</option>
                          <option value="SUPER_ADMIN">SUPER_ADMIN (Master Platform Access)</option>
                        </select>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setIsCreateAdminModalOpen(false)}
                          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border-none transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={creatingAdmin}
                          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                          {creatingAdmin ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Admin Account"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Users registry list */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-sm font-medium text-slate-600">
                    <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500 tracking-wider border-b border-slate-200/60">
                      <tr>
                        <th className="px-4 md:px-6 py-3.5 text-left whitespace-nowrap">User details</th>
                        <th className="px-4 md:px-6 py-3.5 text-left whitespace-nowrap">Security Role</th>
                        <th className="px-4 md:px-6 py-3.5 text-left whitespace-nowrap">Date registered</th>
                        <th className="px-4 md:px-6 py-3.5 text-center whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <span className="block text-base font-black text-slate-900">{user.name || "Unnamed"}</span>
                            <span className="block text-xs text-slate-500 font-medium">{user.email}</span>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                              user.role === "SUPER_ADMIN"
                                ? "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm"
                                : user.role === "ADMIN"
                                ? "bg-purple-50 text-purple-700 border border-purple-200 shadow-sm"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 text-xs text-slate-600 font-bold whitespace-nowrap">
                            {new Date(user.createdAt).toLocaleDateString("en-US")}
                          </td>
                          <td className="px-4 md:px-6 py-4 text-center whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all cursor-pointer border-none bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB: LICENSE OWNER INFO */}
          {activeTab === "license-owner" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">

              {/* Header card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl px-6 py-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-black text-slate-800 tracking-tight">License Owner Info</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Contact details entered by each user in their dashboard under &quot;License owner info&quot;.</p>
                </div>
                <span className="shrink-0 text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 rounded-xl px-3 py-1.5">
                  {users.filter(u => u.role === "CUSTOMER").length} customer{users.filter(u => u.role === "CUSTOMER").length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Subtab Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  type="button"
                  onClick={() => setLicenseSubTab("users")}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    licenseSubTab === "users"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Registered Customers ({users.filter(u => u.role === "CUSTOMER").length})
                </button>
                <button
                  type="button"
                  onClick={() => setLicenseSubTab("template")}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    licenseSubTab === "template"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  License Form Template Editor
                </button>
              </div>

              {licenseSubTab === "template" ? (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-blue-600" />
                      Customize License Owner Form Template
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Customize the form headings, copy, and mandatory contact fields displayed to customers when filling out their License Owner Info in their dashboard.
                    </p>
                  </div>

                  <form onSubmit={handleSaveConfig} className="space-y-5">
                    {/* Form Title */}
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Form Heading Title
                      </label>
                      <input
                        type="text"
                        value={editConfig.licenseFormTitle || "License Owner Information & Legal Compliance Contact"}
                        onChange={(e) => setEditConfig({ ...editConfig, licenseFormTitle: e.target.value })}
                        placeholder="Form Heading Title..."
                        className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Form Subtitle */}
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Form Help / Subtitle Description
                      </label>
                      <textarea
                        rows={3}
                        value={editConfig.licenseFormSubtitle || "Contact details required for your accessibility license statement & WCAG compliance badge."}
                        onChange={(e) => setEditConfig({ ...editConfig, licenseFormSubtitle: e.target.value })}
                        placeholder="Form Description..."
                        className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* Toggles - Clean unboxed layout */}
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between py-2 border-b border-slate-100/80">
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Require Phone Number</h4>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">Require customer to provide phone number</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={editConfig.licenseRequirePhone !== false}
                          onChange={(e) => setEditConfig({ ...editConfig, licenseRequirePhone: e.target.checked })}
                          className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Require Company / Org Name</h4>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">Require company/organization name</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={editConfig.licenseRequireCompany !== false}
                          onChange={(e) => setEditConfig({ ...editConfig, licenseRequireCompany: e.target.checked })}
                          className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 uppercase tracking-wider"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save License Form Template
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {/* Search */}
                  <div className="relative max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-all"
                    />
                  </div>

              {/* Users table */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm font-medium text-slate-600">
                    <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500 tracking-wider border-b border-slate-200/60">
                      <tr>
                        <th className="px-6 py-3.5 text-left whitespace-nowrap">Owner Name</th>
                        <th className="px-6 py-3.5 text-left whitespace-nowrap">Email Address</th>
                        <th className="px-6 py-3.5 text-left whitespace-nowrap">Phone Number</th>
                        <th className="px-6 py-3.5 text-left whitespace-nowrap">Plan</th>
                        <th className="px-6 py-3.5 text-left whitespace-nowrap">Registered</th>
                        <th className="px-6 py-3.5 text-right whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users
                        .filter(u => u.role === "CUSTOMER")
                        .filter(u => {
                          const q = searchQuery.toLowerCase();
                          return (
                            !q ||
                            (u.name || "").toLowerCase().includes(q) ||
                            (u.email || "").toLowerCase().includes(q) ||
                            (u.phone || "").toLowerCase().includes(q)
                          );
                        })
                        .map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="block font-black text-slate-800">{user.name || <span className="text-slate-400 font-medium italic">Not set</span>}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-slate-600">{user.email || "—"}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.phone ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                                  {user.phone}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic text-xs">Not provided</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                                user.plan === "PRO" ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : user.plan === "ENTERPRISE" ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-slate-100 text-slate-500 border border-slate-200"
                              }`}>
                                {user.plan || "None"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap">
                              {new Date(user.createdAt).toLocaleDateString("en-US")}
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingLicenseUser(user);
                                  setLicenseEditName(user.name || "");
                                  setLicenseEditEmail(user.email || "");
                                  setLicenseEditPhone(user.phone || "");
                                  setLicenseEditPlan(user.plan || "NONE");
                                }}
                                className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                Edit Info
                              </button>
                            </td>
                          </tr>
                        ))}
                      {users.filter(u => u.role === "CUSTOMER").length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-xs text-slate-400 font-semibold">
                            No customers registered yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* EDIT LICENSE OWNER INFO MODAL */}
              {editingLicenseUser && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <UserCog className="w-5 h-5 text-blue-600" />
                          Edit License Owner Info
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">Modify owner profile and contact fields</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingLicenseUser(null)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleUpdateLicenseUser} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Owner Full Name
                        </label>
                        <input
                          type="text"
                          value={licenseEditName}
                          onChange={(e) => setLicenseEditName(e.target.value)}
                          placeholder="e.g. Aaron Isaac Sam"
                          className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={licenseEditEmail}
                          onChange={(e) => setLicenseEditEmail(e.target.value)}
                          placeholder="e.g. user@example.com"
                          className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={licenseEditPhone}
                          onChange={(e) => setLicenseEditPhone(e.target.value)}
                          placeholder="e.g. +91 7904327211"
                          className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      {/* Plan Tier */}
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Subscription Plan Tier
                        </label>
                        <select
                          value={licenseEditPlan}
                          onChange={(e) => setLicenseEditPlan(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="NONE">NONE (Default)</option>
                          <option value="FREE">FREE</option>
                          <option value="PRO">PRO</option>
                          <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setEditingLicenseUser(null)}
                          className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSavingLicenseUser}
                          className="px-5 py-2.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSavingLicenseUser ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          {isSavingLicenseUser ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

            </div>
          )}

          {/* TAB 8: FORM BUILDER (DEMO REQUESTS & FORM CUSTOMIZER) */}
          {activeTab === "form" && (
            <div className="space-y-8 animate-in fade-in duration-200 text-left">
              
              {/* ADD CUSTOM FIELD MODAL */}
              {isAddFieldModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Plus className="w-5 h-5 text-blue-600" />
                        Add New Custom Form Field
                      </h3>
                      <button
                        onClick={() => setIsAddFieldModalOpen(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddFieldSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Field Display Label</label>
                        <input
                          type="text"
                          placeholder="e.g. Job Title / Role"
                          value={newFieldLabel}
                          onChange={(e) => setNewFieldLabel(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Input Element Type</label>
                        <select
                          value={newFieldType}
                          onChange={(e) => setNewFieldType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        >
                          <option value="text">Single Line Text Input</option>
                          <option value="email">Email Input</option>
                          <option value="tel">Phone Number Input</option>
                          <option value="url">Website URL Input</option>
                          <option value="textarea">Multi-line Text Area</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Placeholder Hint Text</label>
                        <input
                          type="text"
                          placeholder="e.g. Enter your company role"
                          value={newFieldPlaceholder}
                          onChange={(e) => setNewFieldPlaceholder(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">Mandatory Required Field</p>
                          <p className="text-[10px] text-slate-500 font-medium">Require customer to fill out this field</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={newFieldRequired}
                          onChange={(e) => setNewFieldRequired(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                        />
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddFieldModalOpen(false)}
                          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border-none transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" /> Add Field to Form
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* EDIT FIELD MODAL */}
              {editingField && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Edit className="w-5 h-5 text-blue-600" />
                        Edit Form Field ({editingField.id})
                      </h3>
                      <button
                        onClick={() => setEditingField(null)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleEditFieldSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Field Label</label>
                        <input
                          type="text"
                          value={editingField.label}
                          onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Input Element Type</label>
                        <select
                          value={editingField.type}
                          onChange={(e) => setEditingField({ ...editingField, type: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        >
                          <option value="text">Single Line Text Input</option>
                          <option value="email">Email Input</option>
                          <option value="tel">Phone Number Input</option>
                          <option value="url">Website URL Input</option>
                          <option value="textarea">Multi-line Text Area</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Placeholder Hint</label>
                        <input
                          type="text"
                          value={editingField.placeholder || ""}
                          onChange={(e) => setEditingField({ ...editingField, placeholder: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <label className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingField.required}
                            onChange={(e) => setEditingField({ ...editingField, required: e.target.checked })}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-800">Required Field</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingField.enabled}
                            onChange={(e) => setEditingField({ ...editingField, enabled: e.target.checked })}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-800">Enabled Field</span>
                        </label>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingField(null)}
                          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border-none transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4" /> Save Field Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* EDIT LEAD MODAL */}
              {editingLead && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-left animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Edit className="w-5 h-5 text-blue-600" />
                        Edit Lead / Form Submission
                      </h3>
                      <button
                        onClick={() => setEditingLead(null)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleEditLeadSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Customer Name</label>
                        <input
                          type="text"
                          value={editingLead.name || ""}
                          onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Business Email Address</label>
                        <input
                          type="email"
                          value={editingLead.email || ""}
                          onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Phone Number</label>
                        <input
                          type="text"
                          value={editingLead.phone || ""}
                          onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Website URL</label>
                        <input
                          type="text"
                          value={editingLead.website || ""}
                          onChange={(e) => setEditingLead({ ...editingLead, website: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingLead(null)}
                          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border-none transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl border-none transition-colors cursor-pointer shadow-md shadow-blue-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4" /> Save Lead Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* FORM BUILDER & FIELD CUSTOMIZER CARD */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0a1e3f] tracking-tight">Form Customizer & Lead Schedule Settings</h3>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">Customize public demo request form headings, confirmation copy, and field requirements</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSaveConfig}
                    disabled={loading}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-extrabold rounded-xl border-none transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Form Config"}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Demo Form Title Heading</label>
                    <input
                      type="text"
                      value={editConfig.demoFormTitle || "Schedule a Live Accessibility Demo"}
                      onChange={(e) => setEditConfig({ ...editConfig, demoFormTitle: e.target.value })}
                      placeholder="e.g. Schedule a Live Walkthrough"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Form Success Confirmation Copy</label>
                    <input
                      type="text"
                      value={editConfig.demoFormSuccessMsg || "Thank you! Our accessibility team will email your meeting slot details."}
                      onChange={(e) => setEditConfig({ ...editConfig, demoFormSuccessMsg: e.target.value })}
                      placeholder="e.g. Thank you! We will email you shortly."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <FormalToggle
                    checked={Boolean(editConfig.requirePhoneNumber ?? true)}
                    onChange={(val) => setEditConfig({ ...editConfig, requirePhoneNumber: val })}
                    label="Require Phone Number Field"
                    description="Make customer phone number mandatory on schedule form"
                  />
                  <FormalToggle
                    checked={Boolean(editConfig.requireWebsiteUrl ?? true)}
                    onChange={(val) => setEditConfig({ ...editConfig, requireWebsiteUrl: val })}
                    label="Require Website URL Field"
                    description="Make customer target website domain mandatory"
                  />
                </div>
              </div>

              {/* INTERACTIVE FORM TEMPLATE & FIELDS BUILDER CARD */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0a1e3f] tracking-tight">Form Template Fields Builder</h3>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">Customize, reorder, edit labels, placeholders, or add new custom fields to the live form template</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsAddFieldModalOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl border-none transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" /> Add New Custom Field
                  </button>
                </div>

                {/* FIELDS LIST TABLE */}
                <div className="overflow-x-auto border border-slate-200/80 rounded-2xl shadow-sm">
                  <table className="w-full min-w-[700px] text-xs font-medium text-slate-600">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200/60">
                      <tr>
                        <th className="px-6 py-3.5 text-left">Field ID / Key</th>
                        <th className="px-6 py-3.5 text-left">Display Label</th>
                        <th className="px-6 py-3.5 text-left">Input Type</th>
                        <th className="px-6 py-3.5 text-left">Placeholder</th>
                        <th className="px-6 py-3.5 text-center">Required</th>
                        <th className="px-6 py-3.5 text-center">Enabled</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(editConfig.formFields || defaultFormFields).map((field) => (
                        <tr key={field.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-slate-700">{field.id}</td>
                          <td className="px-6 py-4 font-black text-slate-900">{field.label}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-mono font-bold uppercase">
                              {field.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-medium italic">{field.placeholder || "—"}</td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => handleToggleFormField(field.id, "required", e.target.checked)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={field.enabled}
                              onChange={(e) => handleToggleFormField(field.id, "enabled", e.target.checked)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingField(field)}
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                                title="Edit Field Settings"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {!["name", "email"].includes(field.id) && (
                                <button
                                  onClick={() => handleDeleteField(field.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                                  title="Delete Custom Field"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSaveConfig}
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-extrabold rounded-xl border-none transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Form Template & Fields"}
                  </button>
                </div>
              </div>

              {/* FORM SUBMISSIONS TABLE */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-black text-slate-800 tracking-tight">Form Submissions: Demo Schedule Requests</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Review, edit, add, or manage customer accounts that submitted accessibility platform walkthroughs</p>
                  </div>
                  <button
                    onClick={() => setIsAddItemModalOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl border-none transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" /> Add Form Submission
                  </button>
                </div>

                {loadingDemoRequests ? (
                  <div className="p-12 text-center text-xs text-slate-400 font-bold flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    Loading demo requests...
                  </div>
                ) : demoRequests.length === 0 ? (
                  <div className="p-12 text-center text-xs text-slate-400 font-bold">
                    No demo requests scheduled yet. Click "+ ADD FORM SUBMISSION" to add one manually.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-xs font-medium text-slate-600">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200/60">
                        <tr>
                          <th className="px-6 py-3.5 text-left">Customer Name</th>
                          <th className="px-6 py-3.5 text-left">Business Email</th>
                          <th className="px-6 py-3.5 text-left">Phone Number</th>
                          <th className="px-6 py-3.5 text-left">Website URL</th>
                          <th className="px-6 py-3.5 text-left">Submitted</th>
                          <th className="px-6 py-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {demoRequests.map((req: any) => (
                          <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-black text-slate-800">{req.name}</td>
                            <td className="px-6 py-4 font-bold text-blue-600">{req.email}</td>
                            <td className="px-6 py-4 text-slate-700 font-semibold">{req.phone}</td>
                            <td className="px-6 py-4">
                              <a 
                                href={req.website.startsWith("http") ? req.website : `https://${req.website}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-slate-500 hover:text-blue-600 font-bold underline"
                              >
                                {req.website}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-slate-400 font-bold">
                              {new Date(req.createdAt).toLocaleString("en-US")}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setEditingLead(req)}
                                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                                  title="Edit Lead Details"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(req.id, req.name)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                                  title="Delete Form Submission"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: DOMAINS (CUSTOMER WORKSPACE INVENTORY) */}
          {activeTab === "domains" && (
            <DomainOnboarding initialDomains={initialDomains} userName={currentUser?.name || "Admin"} isAdmin={true} />
          )}

          {/* TAB: API KEYS CONSOLE */}
          {activeTab === "api-keys" && (
            <AdminApiKeysPanel />
          )}


          {/* TAB: LANDING PAGE BUILDER */}
          {activeTab === "landing" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div>
                <h3 className="text-base font-black text-slate-800 tracking-tight">Landing Page Section Builder</h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Edit hero title copy and toggle visibility of homepage presentation blocks.</p>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Main Hero Heading Title</label>
                  <input
                    type="text"
                    value={editConfig.heroTitle || "Empower Every User with AI Web Accessibility"}
                    onChange={(e) => setEditConfig({ ...editConfig, heroTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Hero Subtitle / Description</label>
                  <textarea
                    rows={2}
                    value={editConfig.heroSubtitle || "Automatically align your website with WCAG 2.1 AA & ADA compliance in under 48 hours."}
                    onChange={(e) => setEditConfig({ ...editConfig, heroSubtitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {[
                    { key: "showHeroSection", label: "Show Hero Presentation Section" },
                    { key: "showShowcaseSection", label: "Show Interactive Widget Showcase" },
                    { key: "showProfilesSection", label: "Show Accessibility Profiles Grid" },
                    { key: "showPricingSection", label: "Show Subscription Pricing Section" },
                    { key: "showVpatBanner", label: "Show VPAT Conformance Banner" },
                  ].map((sec) => (
                    <div key={sec.key} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                      <span className="text-xs font-bold text-slate-700">{sec.label}</span>
                      <button
                        type="button"
                        onClick={() => setEditConfig({ ...editConfig, [sec.key]: !(editConfig[sec.key as keyof ConfigType] ?? true) })}
                        className="p-0 border-none bg-transparent cursor-pointer"
                      >
                        {(editConfig[sec.key as keyof ConfigType] ?? true) ? <ToggleRight className="w-7 h-7 text-blue-600" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Landing Page Config"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: CMS (CONTENT MANAGEMENT) */}
          {activeTab === "cms" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">CMS & Legal Text Content Manager</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Manage copy for About Us, VPAT Statement, and Security Policy pages.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add CMS Page / Item
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">About Us Hero Mission Text</label>
                  <textarea
                    rows={3}
                    value={editConfig.aboutUsText || "2all.ai is dedicated to creating a truly inclusive web for everyone through automated AI & human remediation."}
                    onChange={(e) => setEditConfig({ ...editConfig, aboutUsText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">VPAT Conformance Summary Copy</label>
                  <textarea
                    rows={3}
                    value={editConfig.vpatSummary || "WCAG 2.1 Level AA VPAT 2.4 Voluntary Product Accessibility Template Conformance Report."}
                    onChange={(e) => setEditConfig({ ...editConfig, vpatSummary: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Security & Privacy Assurance Statement</label>
                  <textarea
                    rows={3}
                    value={editConfig.privacyPolicyText || "We enforce 256-bit AES encryption and strict SOC2 security standards."}
                    onChange={(e) => setEditConfig({ ...editConfig, privacyPolicyText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save CMS Copy"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: FEATURE MANAGER */}
          {activeTab === "features" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-4xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0a1e3f] tracking-tight">Accessibility Feature Manager</h3>
                  <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed mt-1">Enable or disable core accessibility features provided to end users.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add Custom Feature
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "enableVoiceNavigation", label: "Voice Navigation Engine", desc: "Allows users to speak commands like 'Go to About Us'" },
                    { key: "enableDyslexiaSimulation", label: "Dyslexia Reader & Simulation", desc: "Applies OpenDyslexic font and letter spacing" },
                    { key: "enableReadingRuler", label: "Reading Ruler / Focus Guide", desc: "Injects a horizontal reading mask over page text" },
                    { key: "enableScreenReader", label: "Read Aloud / Text-To-Speech", desc: "Reads page content using Web Speech Synthesis" },
                  ].map((feat) => (
                    <FormalToggle
                      key={feat.key}
                      checked={Boolean(editConfig[feat.key as keyof ConfigType] ?? true)}
                      onChange={(val) => setEditConfig({ ...editConfig, [feat.key]: val })}
                      label={feat.label}
                      description={feat.desc}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Feature Settings"}
                </button>
              </form>
            </div>
          )}


          {/* TAB: AUTH CONFIGURATION */}
          {activeTab === "auth" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Authentication & Security Policy</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">Configure login providers, OAuth settings, and password requirements.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add Auth Provider
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <FormalToggle
                  checked={editConfig.allowGoogleOAuth ?? true}
                  onChange={(val) => setEditConfig({ ...editConfig, allowGoogleOAuth: val })}
                  label="Enable Google OAuth One-Click Login"
                  description="Allow users to sign in with their Google accounts"
                />

                <FormalToggle
                  checked={editConfig.allowCredentialsLogin ?? true}
                  onChange={(val) => setEditConfig({ ...editConfig, allowCredentialsLogin: val })}
                  label="Enable Email & Password Credentials Login"
                  description="Allow standard email and password authentication"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Auth Config"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: WHITE-LABEL MANAGER */}
          {activeTab === "whitelabel" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">White-Label & Agency Customizer</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Remove 2all.ai branding and rebrand the entire platform for your agency or enterprise client.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add Brand Preset
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <FormalToggle
                  checked={Boolean(editConfig.whiteLabelEnabled)}
                  onChange={(val) => setEditConfig({ ...editConfig, whiteLabelEnabled: val })}
                  label="Enable Full White-Label Mode"
                  description="Rebrands widget footer and user dashboard with agency details"
                />

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Agency / Organization Name</label>
                  <input
                    type="text"
                    value={editConfig.agencyName || "2all.ai Enterprise Suite"}
                    onChange={(e) => setEditConfig({ ...editConfig, agencyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save White-Label Config"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: MEDIA LIBRARY */}
          {activeTab === "media" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Media Library & Asset URLs</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Upload image files directly from your computer or manage asset paths used across landing page & widgets.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add Media Asset
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <ImageUploadInput
                  label="Primary Hero Banner Image Photo"
                  value={editConfig.heroBannerImage || "/images/dashboard/expert_services.png"}
                  onChange={(val) => setEditConfig({ ...editConfig, heroBannerImage: val })}
                  placeholder="/images/dashboard/expert_services.png"
                  description="Main header presentation banner image"
                />

                <ImageUploadInput
                  label="Widget Icon Badge Image Photo"
                  value={editConfig.widgetIconImage || "/icon.jpeg"}
                  onChange={(val) => setEditConfig({ ...editConfig, widgetIconImage: val })}
                  placeholder="/icon.jpeg"
                  description="Floating accessibility widget icon badge"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Media Assets"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: TRANSLATION CONFIG */}
          {activeTab === "translation" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Translation & Multi-Language Config</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Configure default platform language and automated AI translation for global visitors.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Language
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Default Platform Language</label>
                  <select
                    value={editConfig.defaultLanguage || "en"}
                    onChange={(e) => setEditConfig({ ...editConfig, defaultLanguage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer"
                  >
                    <option value="en">English (US)</option>
                    <option value="es">Spanish (Español)</option>
                    <option value="fr">French (Français)</option>
                    <option value="de">German (Deutsch)</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                  </select>
                </div>

                <FormalToggle
                  checked={editConfig.enableAutoTranslate ?? true}
                  onChange={(val) => setEditConfig({ ...editConfig, enableAutoTranslate: val })}
                  label="Enable AI Auto-Translation"
                  description="Automatically detect browser language and offer instant translation widget"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Translation Config"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: SEO MANAGEMENT SYSTEM */}
          {activeTab === "seo" && (() => {
            const seoData = getSeoDataForPage(selectedSeoPage);
            const titleLen = seoData.seoTitle?.length || 0;
            const descLen = seoData.metaDescription?.length || 0;

            // Compute Real-Time SEO Score (0-100)
            let score = 0;
            if (seoData.seoTitle) score += 20;
            if (titleLen >= 10 && titleLen <= 60) score += 15;
            if (seoData.metaDescription) score += 20;
            if (descLen >= 100 && descLen <= 160) score += 15;
            if (seoData.metaKeywords) score += 10;
            if (seoData.canonicalUrl) score += 10;
            if (seoData.ogImage) score += 10;

            const radius = 64;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (score / 100) * circumference;

            return (
              <div className="space-y-6 text-left animate-in fade-in duration-200">
                
                {/* EDIT SECTION HEADER CARD */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                        <Search className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">EDIT SECTION</span>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">seo management</h2>
                        <p className="text-xs text-slate-500 font-medium mt-1">Configure search engine optimization, canonicals, social meta cards, structured schema markup, and sitemaps dynamically.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleResetSeo(selectedSeoPage)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer border-none"
                      >
                        Reset All
                      </button>

                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 no-underline"
                      >
                        <Globe className="w-4 h-4 text-blue-600" />
                        Download Sitemap
                      </a>

                      <button
                        type="button"
                        onClick={handleSaveConfig}
                        disabled={loading}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer border-none uppercase tracking-wider"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Page SEO"}
                      </button>
                    </div>
                  </div>

                  {/* 2-COLUMN LAYOUT GRID */}
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: MAIN FORM (8 COLS) */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* SELECT WEBSITE PAGE BAR */}
                      <div className="p-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <div className="flex-grow space-y-1.5">
                          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider">Select Website Page</label>
                          <select
                            value={selectedSeoPage}
                            onChange={(e) => setSelectedSeoPage(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
                          >
                            <option value="/">Homepage (Home)</option>
                            <option value="/about-us">About Us Page (/about-us)</option>
                            <option value="/pricing">Pricing Plans Page (/pricing)</option>
                            <option value="/services">Services & Consulting (/services)</option>
                            <option value="/vpat">VPAT Conformance Report (/vpat)</option>
                            <option value="/small-business">Small Business Suite (/small-business)</option>
                            <option value="/mid-large-business">Enterprise Mid-Large Business (/mid-large-business)</option>
                            <option value="/demo">Schedule Demo Page (/demo)</option>
                            <option value="/contact-us">Contact Us Page (/contact-us)</option>
                            <option value="/login">User Account Login (/login)</option>
                            <option value="/register">User Account Register (/register)</option>
                          </select>
                        </div>

                        <div className="sm:self-end">
                          <button
                            type="button"
                            onClick={() => handleGenerateAiSeo(selectedSeoPage)}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                          >
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            Generate SEO
                          </button>
                        </div>
                      </div>

                      {/* SUB-TABS NAVIGATION */}
                      <div className="flex border-b border-slate-200/80 gap-2 overflow-x-auto pt-2">
                        {[
                          { id: "general", label: "General Settings" },
                          { id: "social", label: "Social Meta Tags" },
                          { id: "image", label: "Image Alt/SEO" },
                          { id: "schema", label: "Structured Schema" },
                          { id: "sitemap", label: "Sitemap Config" },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setSeoSubTab(tab.id as any)}
                            className={`px-5 py-3 text-xs font-black transition-all cursor-pointer bg-transparent border-none ${
                              seoSubTab === tab.id
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "border-b-2 border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* SUB-TAB 1: GENERAL SETTINGS */}
                      {seoSubTab === "general" && (
                        <div className="space-y-6 animate-in fade-in duration-150 pt-2">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">SEO Title *</label>
                              <span className={`text-[11px] font-black ${titleLen > 60 ? "text-amber-600 font-bold" : "text-emerald-600"}`}>
                                {titleLen} / 60 chars
                              </span>
                            </div>
                            <input
                              type="text"
                              value={seoData.seoTitle}
                              onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "seoTitle", e.target.value)}
                              placeholder="e.g. 2all.ai | Enterprise Software Engineering & Web Accessibility"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Meta Description *</label>
                              <span className={`text-[11px] font-black ${descLen > 160 ? "text-amber-600 font-bold" : "text-emerald-600"}`}>
                                {descLen} / 160 chars
                              </span>
                            </div>
                            <textarea
                              rows={3}
                              value={seoData.metaDescription}
                              onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "metaDescription", e.target.value)}
                              placeholder="e.g. 2all.ai delivers enterprise-grade software engineering, web accessibility remediation, and security audit systems."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Meta Keywords</label>
                            <input
                              type="text"
                              value={seoData.metaKeywords}
                              onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "metaKeywords", e.target.value)}
                              placeholder="e.g. accessibility, WCAG 2.1 AA, ADA compliance, security audit, React, Next.js"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Canonical URL</label>
                              <input
                                type="text"
                                value={seoData.canonicalUrl}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "canonicalUrl", e.target.value)}
                                placeholder="https://2all.ai"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">SEO Slug (URL Path)</label>
                              <input
                                type="text"
                                value={seoData.seoSlug}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "seoSlug", e.target.value)}
                                placeholder="/"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Robots Indexing</label>
                              <select
                                value={seoData.robotsIndex || "index"}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "robotsIndex", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value="index">Index (Recommended - show in Google & search engines)</option>
                                <option value="noindex">Noindex (Hide page from search engines)</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Robots Links Follow</label>
                              <select
                                value={seoData.robotsFollow || "follow"}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "robotsFollow", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value="follow">Follow (Follow all links on this page)</option>
                                <option value="nofollow">Nofollow (Do not follow links on page)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 2: SOCIAL META TAGS (EXACT SCREENSHOT 2) */}
                      {seoSubTab === "social" && (
                        <div className="space-y-6 animate-in fade-in duration-150 pt-2">
                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                              <Globe className="w-4 h-4 text-blue-600" />
                              OPEN GRAPH (OG) FACEBOOK CONFIGURATION
                            </h4>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">OG Title</label>
                                <input
                                  type="text"
                                  value={seoData.ogTitle || seoData.seoTitle}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "ogTitle", e.target.value)}
                                  placeholder="2all.ai | Enterprise Software & Accessibility"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">OG Image URL</label>
                                <input
                                  type="text"
                                  value={seoData.ogImage || "https://2all.ai/images/dashboard/expert_services.png"}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "ogImage", e.target.value)}
                                  placeholder="https://2all.ai/images/logo.png"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">OG Page URL</label>
                                <input
                                  type="text"
                                  value={seoData.ogUrl || seoData.canonicalUrl}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "ogUrl", e.target.value)}
                                  placeholder="https://2all.ai"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">OG Content Type</label>
                                <input
                                  type="text"
                                  value={seoData.ogType || "website"}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "ogType", e.target.value)}
                                  placeholder="website"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">OG Description</label>
                              <textarea
                                rows={2}
                                value={seoData.ogDescription || seoData.metaDescription}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "ogDescription", e.target.value)}
                                placeholder="Enterprise-grade software engineering, DevOps automation, and security audits."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                              <Search className="w-4 h-4 text-blue-600" />
                              TWITTER CARD INTEGRATION
                            </h4>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Twitter Card Title</label>
                                <input
                                  type="text"
                                  value={seoData.twitterTitle || seoData.seoTitle}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "twitterTitle", e.target.value)}
                                  placeholder="2all.ai | Enterprise Software"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Twitter Preview Image URL</label>
                                <input
                                  type="text"
                                  value={seoData.twitterImage || seoData.ogImage}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "twitterImage", e.target.value)}
                                  placeholder="https://2all.ai/images/logo.png"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Twitter Card Type</label>
                                <select
                                  value={seoData.twitterCard || "summary_large_image"}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "twitterCard", e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                >
                                  <option value="summary_large_image">Summary Card with Large Image</option>
                                  <option value="summary">Summary Card</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Twitter Card Description</label>
                                <textarea
                                  rows={2}
                                  value={seoData.twitterDescription || seoData.metaDescription}
                                  onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "twitterDescription", e.target.value)}
                                  placeholder="Enterprise-grade software engineering..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 3: IMAGE ALT/SEO (EXACT SCREENSHOT 1) */}
                      {seoSubTab === "image" && (
                        <div className="space-y-6 animate-in fade-in duration-150 pt-2">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            DYNAMIC PAGE IMAGE ALT & TITLE CONFIGURATION
                          </h4>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Global Image Alt Attribute</label>
                              <input
                                type="text"
                                value={seoData.imageAltAttr || "2all.ai Enterprise Software Solutions"}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "imageAltAttr", e.target.value)}
                                placeholder="e.g. 2all.ai Enterprise Solutions"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Global Image Title Attribute</label>
                              <input
                                type="text"
                                value={seoData.imageTitleAttr || "2all.ai Brand Logo"}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "imageTitleAttr", e.target.value)}
                                placeholder="e.g. 2all.ai Logo"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Global Image Caption / Tooltip</label>
                            <textarea
                              rows={3}
                              value={seoData.imageCaptionAttr || "Powering platforms that scale your business."}
                              onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "imageCaptionAttr", e.target.value)}
                              placeholder="Powering platforms that scale your business."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 4: STRUCTURED SCHEMA (EXACT SCREENSHOT 3) */}
                      {seoSubTab === "schema" && (
                        <div className="space-y-6 animate-in fade-in duration-150 pt-2">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                              <Code className="w-4 h-4 text-blue-600" />
                              JSON-LD STRUCTURED DATA SCHEMA
                            </h4>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200/80 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 stroke-[3]" /> JSON SYNTAX VALID
                            </span>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                            <div className="flex-grow space-y-1.5">
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">SELECT SCHEMA TEMPLATE</label>
                              <select
                                value={seoData.schemaType || "Organization"}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "schemaType", e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value="Organization">Organization Schema (Logo, Social links)</option>
                                <option value="WebSite">WebSite Schema (Search Box & Identity)</option>
                                <option value="SoftwareApplication">SoftwareApplication Schema (App & SaaS)</option>
                              </select>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const payload = JSON.stringify({
                                  "@context": "https://schema.org",
                                  "@type": seoData.schemaType || "Organization",
                                  "name": editConfig.brandName || "2all.ai",
                                  "url": seoData.canonicalUrl,
                                  "logo": "https://2all.ai/icon.jpeg",
                                  "sameAs": ["https://linkedin.com/company/2allai"]
                                }, null, 2);
                                handleUpdateSeoPageField(selectedSeoPage, "schemaJsonPayload", payload);
                                showToast("Schema template payload loaded!");
                              }}
                              className="sm:self-end px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl border-none cursor-pointer transition-colors"
                            >
                              Load Template
                            </button>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Custom JSON-LD Payload Editor</label>
                            <textarea
                              rows={10}
                              value={seoData.schemaJsonPayload || defaultSeoPageData.schemaJsonPayload}
                              onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "schemaJsonPayload", e.target.value)}
                              className="w-full bg-[#0B1528] text-emerald-400 font-mono text-xs p-4 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed shadow-inner"
                            />
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 5: SITEMAP CONFIG (EXACT SCREENSHOT 4) */}
                      {seoSubTab === "sitemap" && (
                        <div className="space-y-6 animate-in fade-in duration-150 pt-2">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            SITEMAP XML & CRAWLER SETTINGS
                          </h4>

                          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-black text-slate-800">Include in Sitemap.xml</p>
                              <p className="text-[11px] text-slate-500 font-normal mt-0.5">Toggle whether search bots are directed to this page in sitemaps.</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={seoData.includeInSitemap !== false}
                              onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "includeInSitemap", e.target.checked as any)}
                              className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer accent-blue-600"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Sitemap Priority Score</label>
                                <span className="text-xs font-black text-blue-600">{seoData.sitemapPriority || "1.0"}</span>
                              </div>
                              <input
                                type="range"
                                min="0.1"
                                max="1.0"
                                step="0.1"
                                value={seoData.sitemapPriority || "1.0"}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "sitemapPriority", e.target.value)}
                                className="w-full cursor-pointer accent-blue-600"
                              />
                              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                <span>0.1 (Low)</span>
                                <span>0.5</span>
                                <span>1.0 (High)</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Change Frequency</label>
                              <select
                                value={seoData.sitemapChangefreq || "daily"}
                                onChange={(e) => handleUpdateSeoPageField(selectedSeoPage, "sitemapChangefreq", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value="daily">Daily Crawl</option>
                                <option value="weekly">Weekly (Standard static content)</option>
                                <option value="monthly">Monthly Crawl</option>
                                <option value="always">Always (Real-time updates)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* RIGHT COLUMN: SIDEBAR WIDGETS (4 COLS - EXACT SCREENSHOTS) */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* WIDGET 1: REAL-TIME SEO SCORE GAUGE (HIGH-TECH MODERN REDESIGN) */}
                      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-xl shadow-indigo-950/20 text-center space-y-5 relative overflow-hidden group hover:border-slate-700/80 transition-all">
                        
                        {/* Background Aura Glow Effect */}
                        <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
                        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />

                        {/* Widget Header with Live Indicator */}
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            REAL-TIME SEO SCORE
                          </span>
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            LIVE ANALYTICS
                          </span>
                        </div>
                        
                        {/* Circular Score Gauge with Glow & Gradient */}
                        <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-2">
                          <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]" viewBox="0 0 140 140">
                            <defs>
                              <linearGradient id="seoScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="50%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#3b82f6" />
                              </linearGradient>
                            </defs>
                            <circle
                              cx="70"
                              cy="70"
                              r={radius}
                              stroke="#1e293b"
                              strokeWidth="11"
                              fill="transparent"
                            />
                            <circle
                              cx="70"
                              cy="70"
                              r={radius}
                              stroke="url(#seoScoreGrad)"
                              strokeWidth="11"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              fill="transparent"
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>

                          <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent tracking-tight leading-none drop-shadow-sm font-mono">
                              {score}
                            </span>
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50">
                              / 100 SCORE
                            </span>
                          </div>
                        </div>

                        {/* Breakdown Chips */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase block">TITLE</span>
                            <span className="text-xs font-black text-emerald-400">{titleLen > 0 && titleLen <= 60 ? "100%" : "80%"}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase block">META</span>
                            <span className="text-xs font-black text-emerald-400">{descLen >= 100 ? "100%" : "75%"}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase block">SCHEMA</span>
                            <span className="text-xs font-black text-cyan-400">100%</span>
                          </div>
                        </div>

                        {/* Glowing Status Badge Pill */}
                        <div className="pt-2">
                          <span className={`w-full py-2.5 px-4 rounded-2xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg border border-white/10 ${
                            score >= 80 
                              ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-emerald-500/30" 
                              : score >= 50 
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/30" 
                              : "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/30"
                          }`}>
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                            {score >= 80 ? "EXCELLENT SEO HEALTH" : score >= 50 ? "MODERATE SEO HEALTH" : "NEEDS OPTIMIZATION"}
                          </span>
                        </div>

                      </div>

                      {/* WIDGET 2: ACTIONABLE RECOMMENDATIONS */}
                      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          ACTIONABLE RECOMMENDATIONS
                        </h4>

                        <div className="space-y-3">
                          {titleLen > 60 && (
                            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1">
                              <p className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                Title is too long
                              </p>
                              <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                                Shorten title length below 60 characters to prevent search engine truncation.
                              </p>
                            </div>
                          )}

                          {descLen < 100 && (
                            <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-1">
                              <p className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                Expand Meta Description
                              </p>
                              <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                                Provide 120-160 characters describing the page value proposition.
                              </p>
                            </div>
                          )}

                          {titleLen <= 60 && descLen >= 100 && (
                            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-1">
                              <p className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                Meta Tags Well Formatted
                              </p>
                              <p className="text-[11px] text-emerald-700 font-medium leading-relaxed">
                                SEO Title and Meta Description lengths are within optimal search engine limits!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            );
          })()}

        </main>
      </div>

    </div>
  );
}
