'use client';

import { useState, useEffect } from "react";
import {
  TrendingUp, FileText, Phone, Download, CheckCircle,
  Clock, AlertCircle, Star, Shield,
  ArrowUpRight, RefreshCw, Bell, LogOut, Home, WifiOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "./routerShim";
import cibilLogo from "@/imports/CIBIL_Logo.png";
import { fetchAllReports, downloadEquifaxPdf, type CreditReport } from "../api/creditApi";

/* ── Mock user data ─────────────────────────────────────────── */
const user = {
  name: "Rajesh Kumar",
  mobile: "+91 98765 43210",
  pan: "ABCDE1234F",
  score: 742,
  prevScore: 618,
  rating: "Good",
  ringColor: "#3b82f6",
  lastUpdated: "22 Jun 2026",
};

const reports = [
  { id: "RPT001", type: "CIBIL Report",   date: "22 Jun 2026", score: 742, status: "ready",   source: "Equifax" },
  { id: "RPT002", type: "Credit Summary", date: "10 May 2026", score: 718, status: "ready",   source: "CIBIL"   },
  { id: "RPT003", type: "CIBIL Report",   date: "03 Mar 2026", score: 692, status: "ready",   source: "Equifax" },
  { id: "RPT004", type: "Credit Summary", date: "14 Jan 2026", score: 660, status: "expired", source: "CIBIL"   },
];

const factors = [
  { label: "Payment History",   score: 92, status: "good",  tip: "All payments made on time" },
  { label: "Credit Utilisation", score: 68, status: "warn",  tip: "Try to keep below 30%" },
  { label: "Credit Age",        score: 80, status: "good",  tip: "6+ years average age" },
  { label: "Credit Mix",        score: 75, status: "good",  tip: "Good mix of secured & unsecured" },
  { label: "New Enquiries",     score: 55, status: "warn",  tip: "2 hard pulls in last 6 months" },
];

const timeline = [
  { date: "Jun 2026", score: 742, note: "Credit card limit increased" },
  { date: "May 2026", score: 718, note: "Personal loan closed" },
  { date: "Mar 2026", score: 692, note: "New credit card opened" },
  { date: "Jan 2026", score: 660, note: "Missed EMI rectified" },
  { date: "Nov 2025", score: 618, note: "Starting score" },
];

/* ── Score ring ─────────────────────────────────────────────── */
function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 56;
  const circ = 2 * Math.PI * r;
  const pct = (score - 300) / (900 - 300);
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute -rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="72" cy="72" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${circ * pct} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s ease" }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-3xl font-black text-gray-900">{score}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest">out of 900</div>
      </div>
    </div>
  );
}

/* ── Factor bar ─────────────────────────────────────────────── */
function FactorBar({ label, score, status, tip }: { label: string; score: number; status: string; tip: string }) {
  const [hover, setHover] = useState(false);
  const barColor = status === "good" ? "bg-green-500" : status === "warn" ? "bg-yellow-400" : "bg-red-400";
  const icon = status === "good"
    ? <CheckCircle className="w-4 h-4 text-green-500" />
    : <AlertCircle className="w-4 h-4 text-yellow-500" />;

  return (
    <div className="space-y-1.5 relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">{icon} <span className="text-gray-700">{label}</span></div>
        <span className="font-semibold text-gray-800">{score}/100</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      {hover && (
        <div className="absolute right-0 -top-8 bg-gray-800 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap z-10 shadow-lg">
          {tip}
        </div>
      )}
    </div>
  );
}

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "history">("overview");
  const [liveReports, setLiveReports] = useState<CreditReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await fetchAllReports({ per_page: 10 });
      setLiveReports(res.reports);
      setIsLive(true);
    } catch {
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReports(); }, []);

  const handleDownload = async (report_id: string, name: string) => {
    setPdfLoading(report_id);
    try {
      await downloadEquifaxPdf(report_id, name);
    } catch {
      alert("PDF not available yet.");
    } finally {
      setPdfLoading(null);
    }
  };

  // Use live data if available, else fall back to static demo
  const latestReport = liveReports[0];
  const displayScore  = latestReport?.score  ?? user.score;
  const displayRating = latestReport?.rating ?? user.rating;
  const displayReports = liveReports.length > 0 ? liveReports : reports;
  const improvement = user.score - user.prevScore;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-full z-30">
        <div className="p-5 border-b border-gray-100">
          <img src={cibilLogo.src ?? (cibilLogo as any)} alt="Credit Consultant" className="h-8 w-auto" />
          <p className="text-gray-400 text-xs mt-2">My Dashboard</p>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</p>
              <p className="text-xs text-gray-400">{user.mobile}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: "Overview",   icon: TrendingUp, tab: "overview" },
            { label: "My Reports", icon: FileText,   tab: "reports"  },
            { label: "Score History", icon: Star,    tab: "history"  },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-teal-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition-all">
              <Home className="w-4 h-4" /> Back to Site
            </button>
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="ml-60 flex-1">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {activeTab === "overview" ? "My Credit Overview" : activeTab === "reports" ? "My Reports" : "Score History"}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              {isLive ? (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live data
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-yellow-600 font-medium">
                  <WifiOff className="w-3 h-3" /> Demo data
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <Button size="sm" onClick={loadReports} disabled={loading} className="bg-teal-600 hover:bg-teal-700 gap-1.5">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Loading…" : "Refresh Score"}
            </Button>
          </div>
        </header>

        <main className="px-8 py-6 space-y-6">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <>
              {/* Score hero */}
              <div className="bg-gradient-to-r from-teal-600 to-teal-900 rounded-3xl p-8 text-white flex flex-col lg:flex-row items-center gap-8">
                <ScoreRing score={displayScore} color="#93c5fd" />
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-teal-200 text-sm mb-1">Your CIBIL Score {latestReport && <span className="text-xs opacity-70">· {latestReport.bureau}</span>}</p>
                  <h2 className="text-4xl font-black mb-1">{displayScore} — {displayRating}</h2>
                  <div className="flex items-center gap-2 justify-center lg:justify-start mt-2">
                    <ArrowUpRight className="w-5 h-5 text-green-300" />
                    <span className="text-green-300 font-semibold">+{improvement} pts improved</span>
                    <span className="text-blue-300 text-sm">since Jan 2026</span>
                  </div>
                  <p className="text-teal-200 text-sm mt-3 max-w-md">
                    Your score is in the Good range. A few improvements in credit utilisation can push you to Excellent.
                  </p>
                </div>
                <div className="hidden lg:flex flex-col gap-3 text-sm">
                  {[
                    { label: "Range", value: "300–900" },
                    { label: "Percentile", value: "Top 35%" },
                    { label: "PAN", value: user.pan },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/10 rounded-xl px-4 py-2.5 flex justify-between gap-8">
                      <span className="text-teal-200">{m.label}</span>
                      <span className="font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Reports",    value: "4",      icon: FileText,   color: "blue"   },
                  { label: "Score Improvement", value: "+124",  icon: TrendingUp, color: "green"  },
                  { label: "Active Loans",      value: "2",     icon: Shield,     color: "indigo" },
                  { label: "Pending Actions",   value: "1",     icon: Clock,      color: "yellow" },
                ].map((s) => {
                  const Icon = s.icon;
                  const colMap: Record<string, string> = {
                    blue: "bg-blue-50 text-teal-600", green: "bg-green-50 text-green-600",
                    indigo: "bg-indigo-50 text-indigo-600", yellow: "bg-yellow-50 text-yellow-600",
                  };
                  return (
                    <Card key={s.label} className="border-0 shadow-sm">
                      <CardContent className="pt-5 pb-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                            <p className="text-2xl font-black text-gray-900">{s.value}</p>
                          </div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colMap[s.color]}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Factors */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Score Factors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {factors.map((f) => (
                    <FactorBar key={f.label} {...f} />
                  ))}
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Want to improve faster?</p>
                  <p className="text-sm text-gray-500">Talk to a Credit Consultant advisor — free session, no obligations.</p>
                </div>
                <a href="tel:+919538049888">
                  <Button className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap gap-2">
                    <Phone className="w-4 h-4" /> Call Advisor
                  </Button>
                </a>
              </div>
            </>
          )}

          {/* ── REPORTS TAB ── */}
          {activeTab === "reports" && (
            <div className="space-y-4">
              {displayReports.map((r) => {
                const id = (r as any).report_id ?? (r as any).id;
                const isReady = r.status === "completed" || r.status === "ready";
                return (
                  <Card key={id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isReady ? "bg-teal-100" : "bg-gray-100"}`}>
                            <FileText className={`w-6 h-6 ${isReady ? "text-teal-600" : "text-gray-400"}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{(r as any).type ?? "Credit Report"}</p>
                            <p className="text-xs text-gray-400">{r.bureau ?? (r as any).source} · {new Date((r as any).generated_at ?? (r as any).date).toLocaleDateString("en-IN")}</p>
                            <p className="text-sm font-bold text-blue-600 mt-0.5">Score: {r.score}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isReady ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {isReady ? "Ready" : r.status}
                          </span>
                          {isReady && (
                            <Button
                              size="sm" variant="outline"
                              className="gap-1.5 text-sm h-8"
                              disabled={pdfLoading === id}
                              onClick={() => handleDownload(id, r.name)}
                            >
                              {pdfLoading === id
                                ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Fetching</>
                                : <><Download className="w-3.5 h-3.5" /> PDF</>}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === "history" && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Score Journey</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Simple visual timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[72px] top-0 bottom-0 w-0.5 bg-gray-100" />

                  <div className="space-y-6">
                    {timeline.map((t, i) => {
                      const isLatest = i === 0;
                      const prev = timeline[i + 1];
                      const delta = prev ? t.score - prev.score : 0;
                      return (
                        <div key={t.date} className="flex items-start gap-6">
                          {/* Date label */}
                          <div className="w-16 text-right text-xs text-gray-400 pt-1 flex-shrink-0">{t.date}</div>

                          {/* Dot */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                              isLatest ? "bg-teal-600 border-teal-600" : "bg-white border-gray-300"
                            }`} />
                          </div>

                          {/* Content */}
                          <div className={`flex-1 rounded-2xl p-4 ${isLatest ? "bg-blue-50 border border-blue-100" : "bg-gray-50"}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-2xl font-black ${isLatest ? "text-blue-700" : "text-gray-700"}`}>{t.score}</span>
                              {delta !== 0 && (
                                <span className={`text-sm font-semibold flex items-center gap-1 ${delta > 0 ? "text-green-600" : "text-red-500"}`}>
                                  {delta > 0 ? "↑" : "↓"} {Math.abs(delta)} pts
                                </span>
                              )}
                              {isLatest && <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded-full">Current</span>}
                            </div>
                            <p className="text-xs text-gray-500">{t.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
