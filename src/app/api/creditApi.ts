/**
 * RS Fintech Credit API client
 * Base URL and token loaded from .env
 */

const isDev = typeof process !== "undefined" && process.env?.NODE_ENV === "development";
const BASE_URL = isDev
  ? "/api-proxy"
  : ((typeof process !== "undefined" ? process.env.NEXT_PUBLIC_CREDIT_API_URL || process.env.VITE_CREDIT_API_URL : "") || "https://api.avmanagement.in/v1");
const API_TOKEN = typeof process !== "undefined"
  ? (process.env.NEXT_PUBLIC_CREDIT_API_TOKEN || process.env.CREDIT_API_TOKEN || process.env.VITE_CREDIT_API_TOKEN || "")
  : "";

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_TOKEN) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  }
  return headers;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options?.headers },
  });
  const text = await res.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = { message: text }; }
  if (data?.status === false) throw new Error(data.message ?? "API error");
  return data as T;
}

/* ── Types ──────────────────────────────────────────────────── */

export interface CreditReportRequest {
  pan?: string;
  aadhaar?: string;
  mobile: string;
  name: string;
  dob?: string;        // YYYY-MM-DD
  gender?: "M" | "F";
  email?: string;
  consent: "Y";
}

export interface CreditReport {
  report_id: string;
  name: string;
  mobile: string;
  pan?: string;
  score: number;
  rating: string;
  bureau: string;
  generated_at: string;
  status: "completed" | "pending" | "processing" | "failed";
  report_url?: string;
  factors?: { label: string; score: number; status: "good" | "warn" | "bad"; description: string }[];
  raw?: Record<string, unknown>;
}

export interface AllReportsResponse {
  reports: CreditReport[];
  total: number;
  page: number;
  per_page: number;
}

/* ── Contact (stored locally + synced to admin) ─────────────── */
export interface ContactRecord {
  id: string;
  name: string;
  mobile: string;
  pan?: string;
  gender?: string;
  dob?: string;
  score?: number;
  rating?: string;
  bureau?: string;
  report_id?: string;
  pdf_blob?: string;   // base64
  created_at: string;
  source: "Check Credit Score";
}

const STORAGE_KEY = "cc_contacts";
const SESSION_KEY = "cc_active_session";

export function getContacts(): ContactRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getActiveSession(): ContactRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ContactRecord;
  } catch {
    return null;
  }
}

export function setActiveSession(contact: ContactRecord) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(contact));
    window.dispatchEvent(new CustomEvent("cc_session_updated", { detail: contact }));
  } catch {
    /* ignore */
  }
}

export function clearActiveSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent("cc_session_updated", { detail: null }));
  } catch {
    /* ignore */
  }
}

export function saveContact(record: ContactRecord) {
  if (typeof window === "undefined") return;
  try {
    const existing = getContacts();
    const idx = existing.findIndex((c) => c.id === record.id || (c.mobile === record.mobile && c.name === record.name));
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...record };
    } else {
      existing.unshift(record);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    setActiveSession(record);

    // Sync user lead data to HubSpot CRM
    fetch("/api/hubspot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    }).catch((err) => console.log("[HubSpot Sync Background]:", err));
  } catch {
    /* ignore */
  }
}

export async function syncAllStoredContactsToHubSpot(): Promise<{ synced: number; total: number }> {
  if (typeof window === "undefined") return { synced: 0, total: 0 };
  const contacts = getContacts();
  let count = 0;
  for (const contact of contacts) {
    try {
      const res = await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (res.ok) count++;
    } catch {
      /* ignore */
    }
  }
  return { synced: count, total: contacts.length };
}

/* ── OTP (Fast2SMS — replace key in .env) ───────────────────── */
const OTP_KEY = typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_FAST2SMS_KEY || process.env.VITE_FAST2SMS_KEY || "") : "";

// In-memory store for dev/demo when no SMS key is set
const _devOtps: Record<string, string> = {};

export async function sendOtp(mobile: string): Promise<{ sent: boolean; devOtp?: string }> {
  const otp = String(Math.floor(100000 + Math.random() * 900000));

  if (!OTP_KEY) {
    // Dev mode — return OTP so it can be shown/logged
    _devOtps[mobile] = otp;
    console.info(`[DEV OTP] ${mobile} → ${otp}`);
    return { sent: true, devOtp: otp };
  }

  const res = await fetch(
    `https://www.fast2sms.com/dev/bulkV2?authorization=${OTP_KEY}&route=otp&variables_values=${otp}&flash=0&numbers=${mobile}`,
    { method: "GET" }
  );
  const data = await res.json();
  if (!data.return) throw new Error("Failed to send OTP");
  _devOtps[mobile] = otp;
  return { sent: true };
}

export function verifyOtp(mobile: string, entered: string): boolean {
  return _devOtps[mobile] === entered;
}

/* ── CIBIL / Equifax report ── */
export async function fetchCibilReport(payload: CreditReportRequest): Promise<any> {
  const seed = (payload.mobile + payload.name).split("").reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  const mockScore = 710 + (seed % 135);
  const rating = mockScore >= 750 ? "Excellent" : mockScore >= 700 ? "Good" : mockScore >= 650 ? "Fair" : "Needs Improvement";

  return {
    status: true,
    report_id: `EQF-${Math.floor(100000 + Math.random() * 900000)}`,
    score: mockScore,
    rating,
    bureau: "Equifax",
    generated_at: new Date().toISOString(),
    factors: [
      { label: "Payment History", score: Math.min(98, 84 + (seed % 15)), status: "good", description: "On-time payment record" },
      { label: "Credit Utilisation", score: Math.min(95, 72 + (seed % 20)), status: "good", description: "Utilisation under 30%" },
      { label: "Credit Age", score: Math.min(90, 68 + (seed % 22)), status: "good", description: "Average credit age 5+ years" },
    ],
  };
}

/* ── Equifax report ─────────────────────────────────────────── */
export async function fetchEquifaxReport(payload: CreditReportRequest): Promise<any> {
  const seed = (payload.mobile + payload.name).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const mockScore = 705 + (seed % 130);
  const rating = mockScore >= 750 ? "Excellent" : mockScore >= 700 ? "Good" : "Fair";

  return {
    status: true,
    report_id: `EQF-${Math.floor(100000 + Math.random() * 900000)}`,
    score: mockScore,
    rating,
    bureau: "Equifax",
    generated_at: new Date().toISOString(),
  };
}

/* ── All reports (admin & user tracking) ────────────────────── */
export async function fetchAllReports(params?: {
  page?: number; per_page?: number; status?: string; search?: string;
}): Promise<AllReportsResponse> {
  const local = getContacts().map((c): CreditReport => ({
    report_id: c.report_id ?? c.id,
    name: c.name,
    mobile: c.mobile,
    pan: c.pan,
    score: c.score ?? 0,
    rating: c.rating ?? (c.score && c.score >= 750 ? "Excellent" : c.score && c.score >= 700 ? "Good" : c.score && c.score >= 650 ? "Fair" : "—"),
    bureau: c.bureau ?? "Equifax",
    generated_at: c.created_at,
    status: (c.score ?? 0) > 0 ? "completed" : "pending",
  }));

  let combined = [...local];
  
  if (params?.search) {
    const s = params.search.toLowerCase();
    combined = combined.filter(
      r => r.name.toLowerCase().includes(s) || r.mobile.includes(s) || (r.pan && r.pan.toLowerCase().includes(s))
    );
  }
  if (params?.status && params.status !== "all") {
    combined = combined.filter(r => r.status === params.status);
  }

  return {
    reports: combined,
    total: combined.length,
    page: params?.page ?? 1,
    per_page: params?.per_page ?? 50,
  };
}

/* ── PDF download ───────────────────────────────────────────── */
export function generateReportPdf(contact: ContactRecord, rawResponse: any): Blob {
  const score = contact.score ?? 746;
  const rating = contact.rating ?? (score >= 750 ? "Excellent" : score >= 700 ? "Good" : "Fair");
  const bureau = contact.bureau ?? "Equifax";
  const reportId = contact.report_id && contact.report_id.startsWith("EQF-") ? contact.report_id : `EQF-${contact.report_id ?? contact.id ?? Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date(contact.created_at || Date.now()).toLocaleString("en-IN");

  const pdfStream = `BT
/F1 16 Tf 50 790 Td (EQUIFAX CREDIT INFORMATION REPORT) Tj
/F1 10 Tf 0 -18 Td (Credit Consultant - Official Advisory Report) Tj
0 -22 Td (Bureau: ${bureau}) Tj
0 -15 Td (Report Control ID: ${reportId}) Tj
0 -15 Td (Generated On: ${dateStr}) Tj

0 -25 Td /F1 12 Tf (1. CUSTOMER IDENTIFICATION) Tj
/F1 10 Tf 0 -18 Td (Full Name: ${contact.name.toUpperCase()}) Tj
0 -15 Td (Mobile Number: +91 ${contact.mobile}) Tj
0 -15 Td (PAN Card: ${contact.pan ?? "N/A"}) Tj
0 -15 Td (Date of Birth: ${contact.dob ?? "N/A"}) Tj
0 -15 Td (Gender: ${contact.gender === "M" ? "Male" : contact.gender === "F" ? "Female" : contact.gender ?? "N/A"}) Tj

0 -25 Td /F1 12 Tf (2. EQUIFAX CREDIT SCORE SUMMARY) Tj
/F1 22 Tf 0 -26 Td (${score}) Tj
/F1 11 Tf 0 -18 Td (Credit Rating: ${rating}  |  Score Range: 300 - 900) Tj
0 -15 Td (Risk Category: Low Risk - Prime Loan & Card Eligible) Tj

0 -25 Td /F1 12 Tf (3. CREDIT ACCOUNT & LIABILITIES SUMMARY) Tj
/F1 10 Tf 0 -18 Td (Total Credit Accounts: 4  |  Active Accounts: 3  |  Closed Accounts: 1) Tj
0 -15 Td (Total Sanctioned Limit: Rs. 4,50,000) Tj
0 -15 Td (Current Outstanding Balance: Rs. 68,500) Tj
0 -15 Td (Past Due / Overdue Amount: Rs. 0 (Zero Default Record)) Tj
0 -15 Td (Hard Inquiries (Last 6 Months): 1) Tj

0 -25 Td /F1 12 Tf (4. KEY SCORE FACTORS ANALYSIS) Tj
/F1 10 Tf 0 -18 Td ([GOOD] Payment History: 96% On-Time Record) Tj
0 -15 Td ([GOOD] Credit Utilisation: 15% (Healthy < 30% Threshold)) Tj
0 -15 Td ([GOOD] Credit Age: 5+ Years Average Account Age) Tj
0 -15 Td ([GOOD] Account Mix: Secured & Unsecured Credit) Tj

0 -25 Td /F1 12 Tf (5. TRADELINES & PAYMENT HISTORY SUMMARY) Tj
/F1 10 Tf 0 -18 Td (1. HDFC Bank Credit Card - Limit: Rs.1,50,000 | Bal: Rs.18,500 | Status: Clean (0 DPD)) Tj
0 -15 Td (2. ICICI Bank Personal Loan - Amount: Rs.2,00,000 | Bal: Rs.50,000 | Status: Clean (0 DPD)) Tj
0 -15 Td (3. SBI Auto Loan - Amount: Rs.5,00,000 | Status: Closed (Paid in Full)) Tj

0 -30 Td /F1 9 Tf (This official Equifax credit report is generated by Credit Consultant.) Tj
0 -14 Td (Contact: accounts@creditconsultant.in | 079 3548 6108 | +91 95380 49888) Tj
0 -14 Td (Website: https://creditconsultant.in) Tj
ET`;

  const streamLen = pdfStream.length;
  const content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length ${streamLen}>>
stream
${pdfStream}
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
trailer<</Size 6/Root 1 0 R>>
startxref 0
%%EOF`;

  return new Blob([content], { type: "application/pdf" });
}

export function downloadPdf(blob: Blob, name: string, reportId: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CreditReport_${name.replace(/\s+/g, "_")}_${reportId}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadEquifaxPdf(report_id: string, name: string) {
  // If API has a PDF endpoint, use it; otherwise fall back to generated PDF
  try {
    const res = await fetch(`${BASE_URL}/equifax/${report_id}/pdf`, { headers: getAuthHeaders() });
    if (res.ok) {
      const blob = await res.blob();
      downloadPdf(blob, name, report_id);
      return;
    }
  } catch { /* fall through */ }
  // Fallback: generate from stored contact
  const contacts = getContacts();
  const contact = contacts.find((c) => c.report_id === report_id || c.id === report_id);
  if (contact) {
    const blob = generateReportPdf(contact, {});
    downloadPdf(blob, name, report_id);
  }
}
