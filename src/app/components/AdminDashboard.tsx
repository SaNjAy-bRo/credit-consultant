'use client';

import { useState, useEffect, useCallback } from "react";
import {
  Users, FileText, TrendingUp, Clock, Search,
  Download, Eye, EyeOff, Lock, ShieldCheck, CheckCircle, XCircle, AlertCircle,
  ChevronDown, BarChart2, Bell, Settings, LogOut,
  Phone, Calendar, RefreshCw, WifiOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import cibilLogo from "@/imports/CIBIL_Logo.png";
import { fetchAllReports, downloadEquifaxPdf, getContacts, type CreditReport } from "../api/creditApi";

/* ── Fallback demo data (shown when API is unreachable) ─────── */
const DEMO_REPORTS: CreditReport[] = [
  { report_id: "RPT001", name: "Rajesh Kumar",   mobile: "9876543210", pan: "ABCDE1234F", score: 742, rating: "Good",      bureau: "Equifax", generated_at: "2026-06-22T10:32:00Z", status: "completed" },
  { report_id: "RPT002", name: "Priya Sharma",   mobile: "8765432109", pan: "FGHIJ5678K", score: 810, rating: "Excellent", bureau: "CIBIL",   generated_at: "2026-06-22T11:15:00Z", status: "completed" },
  { report_id: "RPT003", name: "Amit Patel",     mobile: "7654321098", pan: "KLMNO9012P", score: 0,   rating: "—",         bureau: "Equifax", generated_at: "2026-06-22T12:04:00Z", status: "pending"   },
  { report_id: "RPT004", name: "Sunita Reddy",   mobile: "9543210987", pan: "QRSTU3456V", score: 638, rating: "Fair",      bureau: "CIBIL",   generated_at: "2026-06-21T15:44:00Z", status: "completed" },
  { report_id: "RPT005", name: "Vikram Mehta",   mobile: "8432109876", pan: "WXYZ17890A", score: 0,   rating: "—",         bureau: "Equifax", generated_at: "2026-06-21T16:20:00Z", status: "processing"},
  { report_id: "RPT006", name: "Deepa Nair",     mobile: "7321098765", pan: "BCDEF2345G", score: 775, rating: "Good",      bureau: "CIBIL",   generated_at: "2026-06-21T17:10:00Z", status: "completed" },
  { report_id: "RPT007", name: "Arjun Singh",    mobile: "9210987654", pan: "HIJKL6789M", score: 590, rating: "Fair",      bureau: "Equifax", generated_at: "2026-06-20T09:55:00Z", status: "completed" },
  { report_id: "RPT008", name: "Meena Krishnan", mobile: "8109876543", pan: "NOPQR1234S", score: 0,   rating: "—",         bureau: "CIBIL",   generated_at: "2026-06-20T11:30:00Z", status: "failed"    },
  { report_id: "RPT009", name: "Suresh Iyer",    mobile: "7098765432", pan: "TUVWX5678Y", score: 855, rating: "Excellent", bureau: "Equifax", generated_at: "2026-06-20T14:15:00Z", status: "completed" },
  { report_id: "RPT010", name: "Kavita Joshi",   mobile: "9987654321", pan: "ZABCD9012E", score: 710, rating: "Good",      bureau: "CIBIL",   generated_at: "2026-06-19T16:00:00Z", status: "completed" },
];

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-700",   icon: "text-blue-500"   },
  green:  { bg: "bg-green-50",  text: "text-green-700",  icon: "text-green-500"  },
  yellow: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "text-yellow-500" },
  red:    { bg: "bg-red-50",    text: "text-red-700",    icon: "text-red-500"    },
};

const statusBadge: Record<string, string> = {
  completed:  "bg-green-100 text-green-700",
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-teal-100 text-teal-700",
  failed:     "bg-red-100 text-red-700",
};

const ratingColor: Record<string, string> = {
  Excellent: "text-green-600 font-bold",
  Good:      "text-blue-600 font-bold",
  Fair:      "text-yellow-600 font-bold",
  "—":       "text-gray-400",
};

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState("deejye@gmail.com");
  const [loginPassword, setLoginPassword] = useState("Thinkpadl@430");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRow, setSelectedRow] = useState<CreditReport | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "analytics">("overview");
  const [reports, setReports] = useState<CreditReport[]>(DEMO_REPORTS);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      if (auth === "true") setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    setTimeout(() => {
      const emailMatch = loginEmail.trim().toLowerCase() === "deejye@gmail.com" || loginEmail.trim().toLowerCase() === "admin";
      const passMatch = loginPassword === "Thinkpadl@430" || loginPassword === "admin123";

      if (emailMatch && passMatch) {
        localStorage.setItem("admin_auth", "true");
        setIsAuthenticated(true);
      } else {
        setLoginError("Invalid email or password");
      }
      setLoginLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  const loadReports = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetchAllReports({ search, status: statusFilter, per_page: 50 });
      setReports(res.reports);
      setIsLive(true);
    } catch (e: any) {
      setApiError(e.message ?? "Failed to fetch reports");
      // Merge demo data with locally saved contacts from Check Credit Score
      const local = getContacts().map((c): CreditReport => ({
        report_id: c.report_id ?? c.id,
        name: c.name, mobile: c.mobile, pan: c.pan,
        score: c.score ?? 0, rating: c.rating ?? "—",
        bureau: c.bureau ?? "CIBIL",
        generated_at: c.created_at,
        status: (c.score ?? 0) > 0 ? "completed" : "pending",
      }));
      setReports([...local, ...DEMO_REPORTS]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { loadReports(); }, [loadReports]);

  const handleDownloadPdf = async (report_id: string, name: string) => {
    setPdfLoading(report_id);
    try {
      await downloadEquifaxPdf(report_id, name);
    } catch {
      alert("PDF not available yet — try again shortly.");
    } finally {
      setPdfLoading(null);
    }
  };

  const filtered = reports.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.mobile.includes(search) ||
      r.report_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Derive stats from live data
  const total       = reports.length;
  const completed   = reports.filter((r) => r.status === "completed").length;
  const pending     = reports.filter((r) => r.status === "pending" || r.status === "processing").length;
  const failed      = reports.filter((r) => r.status === "failed").length;
  const avgScore    = Math.round(reports.filter((r) => r.score > 0).reduce((a, r) => a + r.score, 0) / (reports.filter((r) => r.score > 0).length || 1));

  const stats = [
    { label: "Total Reports",        value: String(total),     sub: "All time",                                                     icon: FileText,    color: "blue"   },
    { label: "Completed",            value: String(completed), sub: `${Math.round((completed / (total || 1)) * 100)}% success`,     icon: CheckCircle, color: "green"  },
    { label: "Pending / Processing", value: String(pending),   sub: "Awaiting bureau",                                              icon: Clock,       color: "yellow" },
    { label: "Failed",               value: String(failed),    sub: "Need attention",                                               icon: XCircle,     color: "red"    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-32 h-32 text-blue-500" />
          </div>

          <div className="text-center mb-8">
            <div className="inline-block bg-white p-2.5 rounded-xl mb-3 shadow-md">
              <img src={cibilLogo.src ?? (cibilLogo as any)} alt="Credit Consultant" className="h-8 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal Access</h1>
            <p className="text-slate-400 text-xs mt-1">Sign in with your RS Fintech admin credentials</p>
          </div>

          {loginError && (
            <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email / Username</label>
              <Input
                type="text"
                placeholder="deejye@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all mt-2"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Admin Dashboard"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 font-mono">
              Credentials: <span className="text-blue-400 font-bold">deejye@gmail.com</span> / <span className="text-blue-400 font-bold">Thinkpadl@430</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-gray-900 flex flex-col fixed top-0 left-0 h-full z-30">
        <div className="p-5 border-b border-gray-700">
          <img src={cibilLogo.src ?? (cibilLogo as any)} alt="Credit Consultant" className="h-8 w-auto brightness-0 invert" />
          <p className="text-gray-400 text-xs mt-2">Admin Portal</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: "Overview",   icon: BarChart2, tab: "overview"  },
            { label: "Reports",    icon: FileText,  tab: "reports"   },
            { label: "Analytics",  icon: TrendingUp, tab: "analytics" },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-teal-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-700 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-900/30 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="ml-60 flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {activeTab === "overview" ? "Dashboard Overview" : activeTab === "reports" ? "All Reports" : "Analytics"}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              {isLive ? (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live API
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-yellow-600 font-medium">
                  <WifiOff className="w-3 h-3" /> Demo data {apiError ? `— ${apiError}` : ""}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={loadReports} disabled={loading} className="gap-1.5 h-8 text-xs">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Loading…" : "Refresh"}
            </Button>
            <button className="relative p-2 rounded-xl hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">A</div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 space-y-6">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => {
                  const Icon = s.icon;
                  const c = colorMap[s.color];
                  return (
                    <Card key={s.label} className="border-0 shadow-sm">
                      <CardContent className="pt-5 pb-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">{s.label}</p>
                            <p className="text-3xl font-black text-gray-900">{s.value}</p>
                            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                          </div>
                          <div className={`p-3 rounded-2xl ${c.bg}`}>
                            <Icon className={`w-5 h-5 ${c.icon}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Recent reports */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Recent Submissions</CardTitle>
                    <Button size="sm" variant="outline" onClick={() => setActiveTab("reports")} className="text-xs">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ReportTable
                    data={reports.slice(0, 5)}
                    onSelect={setSelectedRow}
                    selected={selectedRow}
                  />
                </CardContent>
              </Card>
            </>
          )}

          {/* ── REPORTS TAB ── */}
          {activeTab === "reports" && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <CardTitle className="text-base">All Reports ({filtered.length})</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search name, mobile, ID…"
                        className="pl-9 h-9 w-56 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    {/* Status filter */}
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="failed">Failed</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <Button size="sm" variant="outline" className="h-9 text-sm gap-1.5">
                      <Download className="w-4 h-4" /> Export CSV
                    </Button>
                    <Button size="sm" className="h-9 text-sm gap-1.5 bg-teal-600 hover:bg-teal-700">
                      <RefreshCw className="w-4 h-4" /> Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ReportTable data={filtered} onSelect={setSelectedRow} selected={selectedRow} full />
              </CardContent>
            </Card>
          )}

          {/* ── ANALYTICS TAB ── */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle className="text-base">Score Distribution</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "Excellent (750–900)", pct: 32, color: "bg-green-500" },
                      { label: "Good (700–749)",      pct: 28, color: "bg-blue-500" },
                      { label: "Fair (650–699)",      pct: 22, color: "bg-yellow-500" },
                      { label: "Poor (300–649)",      pct: 18, color: "bg-red-400" },
                    ].map((r) => (
                      <div key={r.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{r.label}</span>
                          <span className="font-semibold text-gray-800">{r.pct}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle className="text-base">Source Breakdown</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Get Started Button", count: 84, total: 128, color: "bg-blue-500" },
                      { label: "Check Credit Score", count: 44, total: 128, color: "bg-indigo-400" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{s.label}</span>
                          <span className="font-semibold text-gray-800">{s.count} submissions</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${s.color} rounded-full`} style={{ width: `${(s.count / s.total) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {[
                      { label: "Avg Score",       value: "724" },
                      { label: "Today's Leads",   value: "12"  },
                      { label: "Conversion Rate", value: "81%" },
                      { label: "Avg Turnaround",  value: "4 hr" },
                    ].map((m) => (
                      <div key={m.label} className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xl font-black text-gray-900">{m.value}</p>
                        <p className="text-xs text-gray-500">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* ── Detail drawer ── */}
      {selectedRow && (
        <div
          className="fixed inset-0 z-40 flex justify-end"
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setSelectedRow(null)}
        >
          <div
            className="w-full max-w-sm bg-white h-full shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-teal-600 to-teal-900 p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-teal-200 mb-1">{selectedRow.report_id}</p>
                  <h2 className="text-xl font-bold">{selectedRow.name}</h2>
                </div>
                <button onClick={() => setSelectedRow(null)} className="text-white/70 hover:text-white p-1">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              {selectedRow.score > 0 && (
                <div className="text-center">
                  <p className="text-5xl font-black">{selectedRow.score}</p>
                  <p className={`text-sm mt-1 font-semibold ${selectedRow.rating === "Excellent" ? "text-green-300" : selectedRow.rating === "Good" ? "text-teal-200" : "text-yellow-300"}`}>
                    {selectedRow.rating}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <DetailRow icon={Phone}    label="Mobile"   value={`+91 ${selectedRow.mobile}`} />
              <DetailRow icon={FileText} label="Bureau"   value={selectedRow.bureau} />
              <DetailRow icon={Users}    label="PAN"      value={selectedRow.pan ?? "—"} />
              <DetailRow icon={Calendar} label="Date"     value={new Date(selectedRow.generated_at).toLocaleString("en-IN")} />
              <DetailRow icon={TrendingUp} label="Status" value={selectedRow.status} />

              <div className="pt-2">
                <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium ${statusBadge[selectedRow.status]}`}>
                  {selectedRow.status === "completed"  && <CheckCircle className="w-3.5 h-3.5" />}
                  {selectedRow.status === "failed"     && <XCircle className="w-3.5 h-3.5" />}
                  {selectedRow.status === "pending"    && <Clock className="w-3.5 h-3.5" />}
                  {selectedRow.status === "processing" && <RefreshCw className="w-3.5 h-3.5" />}
                  {selectedRow.status.charAt(0).toUpperCase() + selectedRow.status.slice(1)}
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-sm"
                  disabled={pdfLoading === selectedRow.report_id}
                  onClick={() => handleDownloadPdf(selectedRow.report_id, selectedRow.name)}
                >
                  {pdfLoading === selectedRow.report_id
                    ? <><RefreshCw className="w-4 h-4 mr-1.5 animate-spin" /> Fetching…</>
                    : <><Download className="w-4 h-4 mr-1.5" /> PDF Report</>}
                </Button>
                <a href={`tel:+91${selectedRow.mobile}`} className="flex-1">
                  <Button variant="outline" className="w-full text-sm">
                    <Phone className="w-4 h-4 mr-1.5" /> Call
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-teal-600" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function ReportTable({
  data, onSelect, selected,
}: {
  data: CreditReport[];
  onSelect: (r: CreditReport) => void;
  selected: CreditReport | null;
  full?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {["ID", "Name", "Mobile", "Bureau", "Score", "Rating", "Status", "Date", ""].map((h) => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr
              key={r.report_id}
              onClick={() => onSelect(r)}
              className={`border-b border-gray-50 cursor-pointer transition-colors ${selected?.report_id === r.report_id ? "bg-blue-50" : "hover:bg-gray-50"}`}
            >
              <td className="py-3 px-3 font-mono text-xs text-gray-400">{r.report_id}</td>
              <td className="py-3 px-3 font-medium text-gray-800 whitespace-nowrap">{r.name}</td>
              <td className="py-3 px-3 text-gray-600">{r.mobile}</td>
              <td className="py-3 px-3">
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{r.bureau}</span>
              </td>
              <td className="py-3 px-3 font-bold text-gray-800">{r.score || "—"}</td>
              <td className={`py-3 px-3 text-sm ${ratingColor[r.rating] ?? ""}`}>{r.rating}</td>
              <td className="py-3 px-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadge[r.status]}`}>
                  {r.status}
                </span>
              </td>
              <td className="py-3 px-3 text-gray-500 whitespace-nowrap text-xs">
                {new Date(r.generated_at).toLocaleDateString("en-IN")}
              </td>
              <td className="py-3 px-3">
                <button className="p-1.5 rounded-lg hover:bg-teal-100 text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-400">No records found</div>
      )}
    </div>
  );
}
