"use client";

import { useState, useEffect } from "react";
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
  Mail
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import DomainOnboarding from "@/components/dashboard/DomainOnboarding";
import AdminApiKeysPanel from "@/components/admin/AdminApiKeysPanel";
import AdminAccessibilityMenuManager from "@/components/admin/AdminAccessibilityMenuManager";
import { useAccessibility } from "@/context/AccessibilityContext";

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

interface ConfigType {
  brandName: string;
  notificationAdminEmail?: string;
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
  showBenefitCards?: boolean;
  demoFormTitle?: string;
  demoFormSuccessMsg?: string;
  requirePhoneNumber?: boolean;
  allowGoogleOAuth?: boolean;
  allowCredentialsLogin?: boolean;
  requireEmailVerification?: boolean;
  customCss: string;
  customJs: string;
  trackingScripts: string;
  whiteLabelEnabled?: boolean;
  agencyName?: string;
  customFooterLogo?: string;
  heroBannerImage?: string;
  widgetIconImage?: string;
  defaultLanguage?: string;
  enableAutoTranslate?: boolean;
}

interface DashboardProps {
  initialUsers: UserType[];
  initialProjects: ProjectType[];
  initialDomains?: any[];
  initialConfig: ConfigType;
  currentUser?: { name?: string | null; email?: string | null };
  initialTab?: string;
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
    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl transition-all">
      {(label || description) && (
        <div className="pr-3 text-left">
          {label && <h4 className="text-xs font-bold text-slate-800">{label}</h4>}
          {description && <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5">{description}</p>}
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

export default function AdminDashboard({
  initialUsers,
  initialProjects,
  initialDomains = [],
  initialConfig,
  currentUser,
  initialTab = "overview"
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

  // Universal Add Item / Page Modal State
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemPath, setNewItemPath] = useState("");
  const [newItemContent, setNewItemContent] = useState("");

  const handleAddItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) {
      showToast("Title is required", "error");
      return;
    }
    const currentLinks = editConfig.navLinks || [];
    const updatedLinks = [...currentLinks, { label: newItemTitle.trim(), href: newItemPath.trim() || `/${newItemTitle.toLowerCase().replace(/\s+/g, "-")}` }];
    const updatedConfig = { ...editConfig, navLinks: updatedLinks };
    setEditConfig(updatedConfig);
    setIsAddItemModalOpen(false);
    setNewItemTitle("");
    setNewItemPath("");
    setNewItemContent("");
    
    // Save to server
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedConfig),
      });
      if (res.ok) {
        showToast(`New item/page "${newItemTitle}" added and saved!`);
      }
    } catch (e) {
      showToast("Added locally, click Save Changes to persist", "success");
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

  useEffect(() => {
    if (activeTab === "form") {
      const fetchDemos = async () => {
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
      fetchDemos();
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
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
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

          {/* Navigation Links Group 1: System Panel */}
          <div className="p-4 space-y-1">

            {[
              { id: "overview", label: "Overview Panel", icon: LayoutGrid },
              { id: "accessibility", label: "Accessibility Suite Console", icon: Accessibility },
              { id: "users", label: "User Database", icon: UserCog },
              { id: "license-owner", label: "License Owner Info", icon: FileText },
              { id: "payments", label: "Payments Gateway", icon: CreditCard },
              { id: "domains", label: "Customer Workspace", icon: Globe },
              { id: "api-keys", label: "API Keys Console", icon: KeyRound },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabChange(tab.id);
                    setIsSidebarOpen(false);
                  }}
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

          {/* Navigation Links Group 2: Platform Builder Modules */}
          <div className="p-4 pt-1 space-y-1">
            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-3 leading-none">Platform Builder Modules</span>
            {[
              { id: "branding", label: "Branding Manager", icon: Award },
              { id: "theme", label: "Theme Manager", icon: Palette },
              { id: "website", label: "Website Builder", icon: Globe },
              { id: "navigation", label: "Navigation Builder", icon: Layers },
              { id: "landing", label: "Landing Page Builder", icon: Layout },
              { id: "cms", label: "CMS (Content Management)", icon: Sliders },
              { id: "features", label: "Feature Manager", icon: Settings },
              { id: "dashboard", label: "Dashboard Builder", icon: LayoutGrid },
              { id: "form", label: "Form Builder", icon: FileText },
              { id: "auth", label: "Auth Configuration", icon: ShieldCheck },
              { id: "cssjs", label: "Custom CSS/JS", icon: Code },
              { id: "whitelabel", label: "White-Label Manager", icon: UserCog },
              { id: "media", label: "Media Library", icon: FolderOpen },
              { id: "translation", label: "Translation Config", icon: Languages }
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

          {/* TOAST TO NOTIFY SUCCESS/ERROR */}
          {statusMessage && (
            <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-black transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                : "bg-red-50 text-red-800 border border-red-100"
              }`}>
              <Check className="w-4 h-4 stroke-[3]" />
              {statusMessage.text}
            </div>
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
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${a11yState.voiceNavigation ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div>
                        <h4 className="text-base font-black text-slate-900">Voice Command Navigation</h4>
                        <p className="text-xs text-slate-500 font-medium mt-1">Control website by speaking any word (Pricing, VPAT, Footer, Solutions)</p>
                      </div>
                      <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${a11yState.voiceNavigation ? 'bg-blue-600' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${a11yState.voiceNavigation ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    {/* Text-To-Speech Toggle */}
                    <div 
                      onClick={() => updateA11ySetting("textToSpeech", !a11yState.textToSpeech)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${a11yState.textToSpeech ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div>
                        <h4 className="text-base font-black text-slate-900">Read Aloud (Text-to-Speech Engine)</h4>
                        <p className="text-xs text-slate-500 font-medium mt-1">Hover or click elements to listen to spoken narration</p>
                      </div>
                      <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${a11yState.textToSpeech ? 'bg-blue-600' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${a11yState.textToSpeech ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
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

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200 text-left">

              {/* Telemetry Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Accounts", value: users.length, icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
                  { label: "Active Domains", value: projects.length, icon: Globe, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                  { label: "Sandbox Licenses", value: users.filter(u => u.role === "ADMIN").length + projects.length, icon: Award, color: "text-purple-600 bg-purple-50 border-purple-100" },
                  { label: "Virtual Trial Yield", value: `$${users.length * 49}`, icon: DollarSign, color: "text-amber-600 bg-amber-50 border-amber-100" },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{card.label}</span>
                        <span className="block text-2xl font-black text-slate-800 tracking-tight leading-none">{card.value}</span>
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.color}`}>
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Data Lists Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Users Table */}
                <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase">Recent Registrations</h3>
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-xs font-medium text-slate-600">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200/60">
                        <tr>
                          <th className="px-4 md:px-6 py-3 text-left whitespace-nowrap">User</th>
                          <th className="px-4 md:px-6 py-3 text-left whitespace-nowrap">Role</th>
                          <th className="px-4 md:px-6 py-3 text-left whitespace-nowrap">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.slice(0, 5).map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 md:px-6 py-3.5 whitespace-nowrap">
                              <span className="block font-black text-slate-800">{user.name || "Unnamed"}</span>
                              <span className="block text-[10px] text-slate-400 font-bold">{user.email}</span>
                            </td>
                            <td className="px-4 md:px-6 py-3.5 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider ${user.role === "ADMIN" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                                }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 md:px-6 py-3.5 text-slate-400 font-bold whitespace-nowrap">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Projects Table */}
                <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase">Active Projects</h3>
                    <Globe className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px] text-xs font-medium text-slate-600">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200/60">
                        <tr>
                          <th className="px-6 py-3 text-left">Domain</th>
                          <th className="px-6 py-3 text-left">Owner</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {projects.slice(0, 5).map((project) => (
                          <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-3.5">
                              <span className="block font-black text-slate-800">{project.name}</span>
                              <span className="block text-[9px] text-slate-400 font-bold truncate max-w-[150px]">{project.url}</span>
                            </td>
                            <td className="px-6 py-3.5">
                              <span className="block text-[11px] font-black text-slate-700">{project.user?.name || "Unnamed"}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
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

                <form onSubmit={handleSaveConfig} className="space-y-4">
                  {/* Dynamic Admin Notification Email Receiver */}
                  <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-2">
                    <label className="block text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Notification Admin Email (All Leads & System Alerts Receiver)
                    </label>
                    <input
                      type="email"
                      value={editConfig.notificationAdminEmail || "nancythomasselva@gmail.com"}
                      onChange={(e) => setEditConfig({ ...editConfig, notificationAdminEmail: e.target.value })}
                      placeholder="nancythomasselva@gmail.com"
                      className="w-full bg-white border border-blue-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-sm"
                    />
                    <p className="text-[11px] text-blue-700 font-medium">
                      All demo requests, contact form messages, user signup alerts, and license updates are dynamically dispatched to this email address.
                    </p>
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
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Theme Color Accent</label>
                  <div className="flex gap-3 items-center py-1">
                    {["blue", "purple", "emerald", "indigo", "orange"].map((color) => {
                      const bgClass = color === "blue" ? "bg-blue-600"
                        : color === "purple" ? "bg-purple-600"
                          : color === "emerald" ? "bg-emerald-600"
                            : color === "indigo" ? "bg-indigo-600"
                              : "bg-orange-600";
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setEditConfig({ ...editConfig, primaryColor: color })}
                          className={`w-8 h-8 rounded-full border-2 ${bgClass} cursor-pointer transition-all ${editConfig.primaryColor === color ? "border-slate-800 scale-110 shadow-lg" : "border-transparent opacity-80 hover:opacity-100"
                            }`}
                        />
                      );
                    })}
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
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Navigation Builder & Link Hierarchy</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Customize global site navbar links, call-to-action buttons, and header layout.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add Nav Link / Page
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Header Call-To-Action Button Text</label>
                  <input
                    type="text"
                    value={editConfig.trialButtonText || "START FREE TRIAL"}
                    onChange={(e) => setEditConfig({ ...editConfig, trialButtonText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <FormalToggle
                  checked={editConfig.showNavCta ?? true}
                  onChange={(val) => setEditConfig({ ...editConfig, showNavCta: val })}
                  label="Show Header CTA Buttons"
                  description="Toggle visibility of Login, Book Demo, and Start Trial in top navigation bar"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Navigation Settings"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: LANDING PAGE BUILDER */}
          {activeTab === "landing" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Landing Page Section Builder</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Edit hero title copy and toggle visibility of homepage presentation blocks.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Section / Page
                </button>
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

                <div className="space-y-3 pt-2">
                  {[
                    { key: "showHeroSection", label: "Show Hero Presentation Section", desc: "Main introductory header section" },
                    { key: "showShowcaseSection", label: "Show Interactive Widget Showcase", desc: "Live accessibility widget demonstration card" },
                    { key: "showProfilesSection", label: "Show Accessibility Profiles Grid", desc: "Dyslexia, ADHD, Vision Impairment profile cards" },
                    { key: "showPricingSection", label: "Show Subscription Pricing Section", desc: "Monthly and annual subscription tier grid" },
                    { key: "showVpatBanner", label: "Show VPAT Conformance Banner", desc: "Legal VPAT 2.4 compliance certificate banner" },
                  ].map((sec) => (
                    <FormalToggle
                      key={sec.key}
                      checked={Boolean(editConfig[sec.key as keyof ConfigType] ?? true)}
                      onChange={(val) => setEditConfig({ ...editConfig, [sec.key]: val })}
                      label={sec.label}
                      description={sec.desc}
                    />
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

          {/* TAB 6: PAYMENTS */}
          {activeTab === "payments" && (
            <div className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-200 text-left">
              {/* Stripe Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">Stripe Gateway</h3>
                      <span className="text-xs text-slate-500 font-medium">Standard card checkout payments</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditConfig({ ...editConfig, stripeActive: !editConfig.stripeActive })}
                    className="p-0 border-none bg-transparent cursor-pointer"
                  >
                    {editConfig.stripeActive ? <ToggleRight className="w-9 h-9 text-blue-600" /> : <ToggleLeft className="w-9 h-9 text-slate-400" />}
                  </button>
                </div>

                <div className="space-y-4 opacity-90">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Stripe Public Key</label>
                    <input
                      type="text"
                      value="pk_test_51Mz2allAiSecretPublicKeyExample12345"
                      disabled
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* PayPal Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M7.076 2.136C7.79 1.48 8.79 1 10.05 1h6.63c.69 0 1.25.5 1.34 1.18l1.94 13.62c.07.5-.3.94-.8.94h-4.3l-.22-1.57c-.1-.7-.7-.12-1.3-.12H9.01c-.56 0-1.02-.45-1.12-1.01L6.15 2.17a1 1 0 0 1 .92-1.03zm-1.8 4.2l-.76 5.3c-.1.55.33 1.01.89 1.01h2.24l.58-4.08a.5.5 0 0 1 .49-.43h3.58c.84 0 1.5-.32 1.97-.75.48-.43.76-1.1.66-1.85-.12-.86-.88-1.51-1.74-1.51H7.81c-.55 0-1.01.44-1.11.99L5.27 6.34z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">PayPal Gateway</h3>
                      <span className="text-xs text-slate-500 font-medium">Standard alternative payments checkout</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditConfig({ ...editConfig, paypalActive: !editConfig.paypalActive })}
                    className="p-0 border-none bg-transparent cursor-pointer"
                  >
                    {editConfig.paypalActive ? <ToggleRight className="w-9 h-9 text-blue-600" /> : <ToggleLeft className="w-9 h-9 text-slate-400" />}
                  </button>
                </div>

                <div className="space-y-4 opacity-90">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">PayPal Client ID</label>
                    <input
                      type="text"
                      value="Af_2allAiPayPalClientIdMockExample998877"
                      disabled
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold text-slate-600"
                    />
                  </div>
                </div>
              </div>
            </div>
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
                            {new Date(user.createdAt).toLocaleDateString()}
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
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      {users.filter(u => u.role === "CUSTOMER").length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400 font-semibold">
                            No customers registered yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 8: FORM BUILDER (DEMO REQUESTS MANAGER) */}
          {activeTab === "form" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col space-y-2">
                <h3 className="text-base font-black text-slate-800 tracking-tight">Form Submissions: Demo Schedule Requests</h3>
                <p className="text-xs text-slate-400 font-bold">Review and contact customer accounts that scheduled accessibility platform walkthroughs.</p>
              </div>

              {loadingDemoRequests ? (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-xs text-slate-400 font-bold flex items-center justify-center gap-2 shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  Loading demo requests...
                </div>
              ) : demoRequests.length === 0 ? (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-xs text-slate-400 font-bold shadow-sm">
                  No demo requests scheduled yet.
                </div>
              ) : (
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px] text-xs font-medium text-slate-600">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200/60">
                        <tr>
                          <th className="px-6 py-3.5 text-left">Customer Name</th>
                          <th className="px-6 py-3.5 text-left">Business Email</th>
                          <th className="px-6 py-3.5 text-left">Phone Number</th>
                          <th className="px-6 py-3.5 text-left">Website URL</th>
                          <th className="px-6 py-3.5 text-left">Submitted</th>
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
                                href={req.website} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-slate-500 hover:text-blue-600 font-bold underline"
                              >
                                {req.website}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-slate-400 font-bold">
                              {new Date(req.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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

          {/* TAB: NAVIGATION BUILDER */}
          {activeTab === "navigation" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div>
                <h3 className="text-base font-black text-slate-800 tracking-tight">Navigation Builder & Link Hierarchy</h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Customize global site navbar links, call-to-action buttons, and header layout.</p>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Header Call-To-Action Button Text</label>
                  <input
                    type="text"
                    value={editConfig.trialButtonText || "START FREE TRIAL"}
                    onChange={(e) => setEditConfig({ ...editConfig, trialButtonText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Show Header CTA Buttons</h4>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Toggle visibility of Login, Book Demo, and Start Trial in top navigation bar</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditConfig({ ...editConfig, showNavCta: !(editConfig.showNavCta ?? true) })}
                    className="p-0 border-none bg-transparent cursor-pointer"
                  >
                    {(editConfig.showNavCta ?? true) ? <ToggleRight className="w-8 h-8 text-blue-600" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Navigation Settings"}
                </button>
              </form>
            </div>
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
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Accessibility Feature Manager</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Enable or disable core accessibility features provided to end users.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
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

          {/* TAB: DASHBOARD BUILDER */}
          {activeTab === "dashboard" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Customer Dashboard Builder</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Customize default layout, banner cards, and greeting text for customer accounts.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer border-none uppercase tracking-wider shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" /> Add Dashboard Card
                </button>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Welcome Greeting Header</label>
                  <input
                    type="text"
                    value={editConfig.welcomeGreeting || "Welcome to 2all.ai Accessibility Workspace"}
                    onChange={(e) => setEditConfig({ ...editConfig, welcomeGreeting: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <FormalToggle
                  checked={editConfig.showTrialCard ?? true}
                  onChange={(val) => setEditConfig({ ...editConfig, showTrialCard: val })}
                  label="Show Free Trial Progress Card"
                  description="Display 7-day trial progress banner in customer dashboard header"
                />

                <FormalToggle
                  checked={editConfig.showBenefitCards ?? true}
                  onChange={(val) => setEditConfig({ ...editConfig, showBenefitCards: val })}
                  label="Show Benefit Cards Grid"
                  description="Display Expert Services, Tax Credit, SEO, and WCAG article cards"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer border-none uppercase tracking-wider"
                >
                  <Save className="w-4.5 h-4.5" />
                  {loading ? "Saving..." : "Save Dashboard Layout"}
                </button>
              </form>
            </div>
          )}

          {/* TAB: AUTH CONFIGURATION */}
          {activeTab === "auth" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl text-left animate-in fade-in duration-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-800 tracking-tight">Authentication & Security Policy</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Configure login providers, OAuth settings, and password requirements.</p>
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
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Manage image paths and graphic assets used across landing page & widgets.</p>
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
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Hero Banner Image Path</label>
                  <input
                    type="text"
                    value={editConfig.heroBannerImage || "/images/dashboard/expert_services.png"}
                    onChange={(e) => setEditConfig({ ...editConfig, heroBannerImage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Widget Icon Badge Image Path</label>
                  <input
                    type="text"
                    value={editConfig.widgetIconImage || "/icon.jpeg"}
                    onChange={(e) => setEditConfig({ ...editConfig, widgetIconImage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>

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

        </main>
      </div>

    </div>
  );
}
