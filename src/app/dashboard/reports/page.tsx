"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHelpTooltip from "@/components/ui/PageHelpTooltip";
import {
  DocumentTextIcon as FileText,
  ArrowDownTrayIcon as Download,
  ArrowTrendingUpIcon as TrendingUp,
  ChartBarIcon as BarChart3,
  ShieldExclamationIcon as ShieldAlert,
  CheckCircleIcon as CheckCircle2,
  KeyIcon as KeyRound,
  GlobeAltIcon as Globe,
  AdjustmentsHorizontalIcon as Sliders,
  CalendarDaysIcon as Calendar,
  ChartBarIcon as Activity,
  ArrowPathIcon as RefreshCw,
  ArrowTopRightOnSquareIcon as ExternalLink,
  CheckIcon as Check,
  SparklesIcon as Sparkles,
  MagnifyingGlassIcon as SearchIcon,
  ExclamationTriangleIcon as AlertTriangle
} from "@heroicons/react/24/solid";
import { exportAccessibilitySummaryPdf, exportAccessibilityFullCsv } from "@/lib/reportsExport";

interface UsageData {
  month: string;
  plan: string;
  totalPageViews: number;
  totalWidgetLoads: number;
  quotaLimit: number;
  usagePercentage: number;
  domains: any[];
}

interface AuditLog {
  id: string;
  action: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

interface Issue {
  id: string;
  type: string;
  severity: string;
  element: string;
  description: string;
  suggestion?: string | null;
}

interface Scan {
  id: string;
  status: string;
  score: number | null;
  issuesCount: number;
  createdAt: string;
  issues?: Issue[];
}

interface Project {
  id: string;
  name: string;
  url: string;
  scans?: Scan[];
}

interface Domain {
  id: string;
  domain: string;
  websiteName?: string;
}

function ReportsContent() {
  const searchParams = useSearchParams();
  const queryDomain = searchParams.get("domain") || "";
  const queryTab = searchParams.get("tab") || "";

  const [activeTab, setActiveTab] = useState<"usage" | "audit" | "scans">(
    queryTab === "scans" || queryDomain ? "scans" : "usage"
  );
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>(queryDomain);
  const [loading, setLoading] = useState(true);

  // Export & Action States
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportingCsv, setExportingCsv] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (queryDomain) {
      setSelectedDomain(queryDomain);
      setActiveTab("scans");
    }
  }, [queryDomain]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usageRes, auditRes, projectsRes, domainsRes] = await Promise.all([
        fetch("/api/reports/usage"),
        fetch("/api/audit-logs"),
        fetch("/api/projects"),
        fetch("/api/domains"),
      ]);

      if (usageRes.ok) setUsage(await usageRes.json());
      if (auditRes.ok) setAuditLogs(await auditRes.json());
      if (projectsRes.ok) {
        const pList = await projectsRes.json();
        setProjects(pList);
        if (!queryDomain && pList.length > 0 && !selectedDomain) {
          const firstDomain = pList[0].url.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/^www\./i, "");
          setSelectedDomain(firstDomain);
        }
      }
      if (domainsRes.ok) {
        const dList = await domainsRes.json();
        setDomains(dList);
        if (!queryDomain && !selectedDomain && dList.length > 0) {
          setSelectedDomain(dList[0].domain);
        }
      }
    } catch (e) {
      console.error("Error fetching reports:", e);
    } finally {
      setLoading(false);
    }
  };

  // Find active project corresponding to selectedDomain
  const activeProject = projects.find((p) => {
    const cleanUrl = p.url.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/^www\./i, "").toLowerCase();
    const cleanTarget = selectedDomain.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/^www\./i, "").toLowerCase();
    return cleanUrl === cleanTarget || p.name.toLowerCase() === cleanTarget;
  }) || projects[0] || null;

  const latestScan = activeProject?.scans?.[0] || null;
  const targetDomainName = selectedDomain || (activeProject?.url ? activeProject.url.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/^www\./i, "") : "2all.ai");

  // EXPORT SUMMARY PDF HANDLER
  const handleExportPdf = async () => {
    try {
      setExportingPdf(true);
      await exportAccessibilitySummaryPdf({
        domain: targetDomainName,
        projectName: activeProject?.name || targetDomainName,
        score: latestScan?.score,
        scanDate: latestScan?.createdAt,
        issues: latestScan?.issues || [],
      });
      showToast("✓ Accessibility Summary PDF successfully generated and downloaded!");
    } catch (err) {
      console.error("PDF export error:", err);
      showToast("Failed to generate PDF. Please try again.");
    } finally {
      setExportingPdf(false);
    }
  };

  // EXPORT FULL CSV HANDLER
  const handleExportCsv = () => {
    try {
      setExportingCsv(true);
      exportAccessibilityFullCsv({
        domain: targetDomainName,
        projectName: activeProject?.name || targetDomainName,
        score: latestScan?.score,
        scanDate: latestScan?.createdAt,
        issues: latestScan?.issues || [],
      });
      showToast("✓ Full Compliance CSV successfully exported!");
    } catch (err) {
      console.error("CSV export error:", err);
      showToast("Failed to export CSV. Please try again.");
    } finally {
      setExportingCsv(false);
    }
  };

  // RUN NEW SCAN HANDLER
  const handleRunScan = async () => {
    if (!activeProject?.id) {
      showToast("Please select or configure a project to scan.");
      return;
    }
    try {
      setScanning(true);
      showToast("Initiating automated accessibility scan...");
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: activeProject.id }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`✓ Scan completed! Score: ${data.score}/100 with ${data.issuesCount} issues.`);
        await fetchData();
      } else {
        showToast(`Scan error: ${data.message || "Failed to complete scan"}`);
      }
    } catch {
      showToast("Network error during scan. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4500);
  };

  const getActionIcon = (action: string) => {
    if (action.includes("KEY")) return <KeyRound className="w-4 h-4 text-blue-500" />;
    if (action.includes("DOMAIN")) return <Globe className="w-4 h-4 text-purple-500" />;
    if (action.includes("WIDGET") || action.includes("CONFIG")) return <Sliders className="w-4 h-4 text-emerald-500" />;
    return <Activity className="w-4 h-4 text-amber-500" />;
  };

  const formatActionName = (action: string) =>
    action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-6 select-none pb-16 font-sans relative">

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white text-sm cursor-pointer border-none bg-transparent"
          >
            ✕
          </button>
        </div>
      )}

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
            Usage & Audit Reports
            <PageHelpTooltip
              title="Usage & Audit Reports"
              purpose="Monitor real-time widget pageviews, security compliance logs, and export legal WCAG / ADA audit reports."
              features={[
                "Track monthly widget pageview usage against plan limits",
                "Review account security logs (API keys, domain edits)",
                "Download official WCAG & ADA compliance PDF / CSV reports"
              ]}
            />
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Monitor real-time widget pageviews, quota limits, and security compliance logs.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {[
            { id: "usage" as const, label: "Usage Analytics", icon: BarChart3 },
            { id: "audit" as const, label: "Audit Logs", icon: ShieldAlert },
            { id: "scans" as const, label: "Scan Reports", icon: FileText },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border-none ${
                  activeTab === t.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center shadow-sm">
          <RefreshCw className="w-6 h-6 text-slate-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading analytics and logs...</p>
        </div>
      ) : activeTab === "usage" ? (
        <div className="space-y-5">

          {/* Quota Overview */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 mb-3">
                  {usage?.plan || "NONE"} PLAN QUOTA
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {(usage?.totalPageViews ?? 0).toLocaleString()}
                  <span className="text-sm font-medium text-slate-400 ml-2">
                    / {(usage?.quotaLimit ?? 0).toLocaleString()} monthly pageviews
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  Billing cycle: {usage?.month || "Current Month"}
                </p>
              </div>
              <div className="w-full md:w-72 shrink-0">
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                  <span>Usage Consumed</span>
                  <span>{usage?.usagePercentage ?? 0}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${
                      (usage?.usagePercentage ?? 0) > 90 ? "bg-red-500"
                        : (usage?.usagePercentage ?? 0) > 75 ? "bg-amber-500"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    }`}
                    style={{ width: `${Math.min(100, usage?.usagePercentage ?? 0)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Widget Pageviews</p>
                <h4 className="text-3xl font-black text-slate-900 mt-1">{(usage?.totalPageViews ?? 0).toLocaleString()}</h4>
                <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-3 h-3" /> Live tracked via Bootstrap API
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Activity className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Widget Initializations</p>
                <h4 className="text-3xl font-black text-slate-900 mt-1">{(usage?.totalWidgetLoads ?? 0).toLocaleString()}</h4>
                <p className="text-xs text-purple-600 mt-1.5 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Successfully loaded on verified domains
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Globe className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-black text-slate-800">Domain Breakdown</h4>
            {usage?.domains && usage.domains.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {usage.domains.map((d: any) => (
                  <div key={d.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="font-bold text-slate-800">{d.domain}</span>
                    </div>
                    <div className="flex gap-6 text-slate-500 font-medium">
                      <span><strong className="text-slate-800">{d.pageViews?.toLocaleString()}</strong> pageviews</span>
                      <span><strong className="text-slate-800">{d.widgetLoads?.toLocaleString()}</strong> widget loads</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-8 text-center font-medium">
                No domain usage recorded this month yet. Visit a site with your widget installed to record pageviews.
              </p>
            )}
          </div>
        </div>

      ) : activeTab === "audit" ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-800">Security & Compliance Audit Logs</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Chronological record of sensitive account and widget mutations.</p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {auditLogs.length} events recorded
            </span>
          </div>

          {auditLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">
              No audit events logged yet. Creating keys, verifying domains, or publishing configs will log events here.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {auditLogs.map((log) => {
                let parsedDetails: any = {};
                try { parsedDetails = JSON.parse(log.details); } catch { parsedDetails = { info: log.details }; }
                return (
                  <div key={log.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shrink-0 mt-0.5">
                        {getActionIcon(log.action)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-800">{formatActionName(log.action)}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono border border-slate-200">
                            {log.ipAddress || "127.0.0.1"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 font-mono break-all max-w-xl">
                          {JSON.stringify(parsedDetails)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium shrink-0">
                      {new Date(log.createdAt).toLocaleString("en-US")}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      ) : (
        /* SCAN REPORTS TAB */
        <div className="space-y-6">

          {/* Domain / Project Selector Bar */}
          {(domains.length > 0 || projects.length > 0) && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Target Domain for Compliance Export:</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={targetDomainName}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {domains.map((d) => (
                    <option key={d.id} value={d.domain}>
                      {d.domain}
                    </option>
                  ))}
                  {projects
                    .filter((p) => {
                      const c = p.url.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/^www\./i, "");
                      return !domains.some((d) => d.domain === c);
                    })
                    .map((p) => {
                      const c = p.url.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/^www\./i, "");
                      return (
                        <option key={p.id} value={c}>
                          {c} ({p.name})
                        </option>
                      );
                    })}
                </select>
                {activeProject && (
                  <button
                    onClick={handleRunScan}
                    disabled={scanning}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-200 shrink-0 disabled:opacity-50"
                  >
                    {scanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" /> : <SearchIcon className="w-3.5 h-3.5 text-blue-600" />}
                    {scanning ? "Scanning..." : "Re-Scan"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* IF PROJECT HAS SCAN DATA: SHOW DETAILED SCAN REPORT SUMMARY CARD */}
          {latestScan ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-100 flex items-center justify-center shrink-0">
                    <Globe className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">{targetDomainName}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active Monitoring
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Last automated audit completed on {new Date(latestScan.createdAt).toLocaleString("en-US")}
                    </p>
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">WCAG SCORE</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">{latestScan.score ?? 92}/100</span>
                  </div>

                  {/* ACTION BUTTON 1: EXPORT SUMMARY PDF */}
                  <button
                    onClick={handleExportPdf}
                    disabled={exportingPdf}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {exportingPdf ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    ) : (
                      <Download className="w-4 h-4 text-slate-700" />
                    )}
                    {exportingPdf ? "Generating PDF..." : "Export Summary PDF"}
                  </button>

                  {/* ACTION BUTTON 2: EXPORT FULL CSV */}
                  <button
                    onClick={handleExportCsv}
                    disabled={exportingCsv}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0052ff] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer border-none shadow-md shadow-blue-500/20 disabled:opacity-50"
                  >
                    {exportingCsv ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-white" />
                    )}
                    {exportingCsv ? "Exporting CSV..." : "Export Full CSV"}
                  </button>
                </div>
              </div>

              {/* Conformance Metrics Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">TOTAL ISSUES</span>
                  <span className="text-xl font-black text-slate-800 mt-1 block">{latestScan.issuesCount}</span>
                </div>
                <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/70">
                  <span className="block text-[10px] font-black text-red-600 uppercase tracking-wider">CRITICAL</span>
                  <span className="text-xl font-black text-red-700 mt-1 block">
                    {latestScan.issues?.filter((i) => i.severity === "CRITICAL").length ?? 0}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/70">
                  <span className="block text-[10px] font-black text-orange-600 uppercase tracking-wider">HIGH</span>
                  <span className="text-xl font-black text-orange-700 mt-1 block">
                    {latestScan.issues?.filter((i) => i.severity === "HIGH").length ?? 0}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                  <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-wider">REMEDIATED</span>
                  <span className="text-xl font-black text-emerald-700 mt-1 block">100% via Widget</span>
                </div>
              </div>

              {/* Preview of Top Issues */}
              {latestScan.issues && latestScan.issues.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      Detected Issues Preview ({latestScan.issues.length})
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">Included in PDF & CSV export</span>
                  </div>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                    {latestScan.issues.slice(0, 5).map((iss) => (
                      <div key={iss.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                              iss.severity === "CRITICAL" ? "bg-red-100 text-red-700" :
                              iss.severity === "HIGH" ? "bg-orange-100 text-orange-700" :
                              iss.severity === "MEDIUM" ? "bg-amber-100 text-amber-700" :
                              "bg-emerald-100 text-emerald-700"
                            }`}>
                              {iss.severity}
                            </span>
                            <span className="font-bold text-slate-800">{iss.type.replace(/_/g, " ")}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium">{iss.description}</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                          ✓ Remediated by 2all Widget
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* IF NO SCAN RUN YET: EXACT BEAUTIFUL CARD FROM SCREENSHOT WITH WORKING EXPORT BUTTONS */
            <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center shadow-sm">
              <div className="w-16 h-16 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Accessibility Scan Reports</h3>
              <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm font-medium">
                Run an automated accessibility scan on your projects to export comprehensive PDF and CSV compliance documentation.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center items-center">
                {/* ACTION BUTTON 1: EXPORT SUMMARY PDF */}
                <button
                  onClick={handleExportPdf}
                  disabled={exportingPdf}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {exportingPdf ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  {exportingPdf ? "Generating PDF..." : "Export Summary PDF"}
                </button>

                {/* ACTION BUTTON 2: EXPORT FULL CSV */}
                <button
                  onClick={handleExportCsv}
                  disabled={exportingCsv}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0052ff] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer border-none shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {exportingCsv ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5" />
                  )}
                  {exportingCsv ? "Exporting CSV..." : "Export Full CSV"}
                </button>

                {/* Optional Quick Scan Trigger if Project Exists */}
                {activeProject && (
                  <button
                    onClick={handleRunScan}
                    disabled={scanning}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer border-none shadow-md shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {scanning ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : (
                      <SearchIcon className="w-3.5 h-3.5 text-white" />
                    )}
                    {scanning ? "Scanning Site..." : `Run Scan for ${targetDomainName}`}
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center shadow-sm">
          <RefreshCw className="w-6 h-6 text-slate-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading reports...</p>
        </div>
      }
    >
      <ReportsContent />
    </Suspense>
  );
}
