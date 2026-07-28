/**
 * RS Fintech Credit API client
 * Base URL and token loaded from .env
 */

const BASE_URL = import.meta.env.VITE_CREDIT_API_URL ?? "https://api.rsfintech.in/v1";
const API_TOKEN = import.meta.env.VITE_CREDIT_API_TOKEN ?? "rsf_81f8550480e63c146ea9b55fada8b717deeb342d";

const authHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...authHeaders, ...options?.headers },
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

const CONTACTS_KEY = "cc_contacts";

export function saveContact(c: ContactRecord) {
  const existing: ContactRecord[] = JSON.parse(localStorage.getItem(CONTACTS_KEY) ?? "[]");
  const idx = existing.findIndex((e) => e.id === c.id);
  if (idx >= 0) existing[idx] = c; else existing.unshift(c);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(existing));
}

export function getContacts(): ContactRecord[] {
  return JSON.parse(localStorage.getItem(CONTACTS_KEY) ?? "[]");
}

/* ── OTP (Fast2SMS — replace key in .env) ───────────────────── */
const OTP_KEY = import.meta.env.VITE_FAST2SMS_KEY ?? "";

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

/* ── CIBIL report ───────────────────────────────────────────── */
export async function fetchCibilReport(payload: CreditReportRequest): Promise<any> {
  return request<any>("/cibil", {
    method: "POST",
    body: JSON.stringify({ ...payload, consent: "Y" }),
  });
}

/* ── Equifax report ─────────────────────────────────────────── */
export async function fetchEquifaxReport(payload: CreditReportRequest): Promise<any> {
  return request<any>("/equifax", {
    method: "POST",
    body: JSON.stringify({ ...payload, consent: "Y" }),
  });
}

/* ── All reports (admin) ────────────────────────────────────── */
export async function fetchAllReports(params?: {
  page?: number; per_page?: number; status?: string; search?: string;
}): Promise<AllReportsResponse> {
  const q = new URLSearchParams();
  if (params?.page)     q.set("page",     String(params.page));
  if (params?.per_page) q.set("per_page", String(params.per_page));
  if (params?.status && params.status !== "all") q.set("status", params.status);
  if (params?.search)   q.set("search",   params.search);
  return request<AllReportsResponse>(`/reports?${q.toString()}`);
}

/* ── PDF download ───────────────────────────────────────────── */
export function generateReportPdf(contact: ContactRecord, rawResponse: any): Blob {
  const score = contact.score ?? 0;
  const rating = contact.rating ?? "—";
  const factors = rawResponse?.factors ?? rawResponse?.score_factors ?? [];

  const content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 600>>
stream
BT
/F1 20 Tf 72 800 Td (Credit Consultant - Credit Report) Tj
/F1 11 Tf 0 -30 Td (Bureau: ${contact.bureau ?? "CIBIL"}) Tj
0 -18 Td (Report ID: ${contact.report_id ?? contact.id}) Tj
0 -18 Td (Generated: ${new Date(contact.created_at).toLocaleString("en-IN")}) Tj
0 -30 Td /F1 14 Tf (Customer Details) Tj
/F1 11 Tf 0 -20 Td (Name: ${contact.name}) Tj
0 -18 Td (Mobile: +91 ${contact.mobile}) Tj
0 -18 Td (PAN: ${contact.pan ?? "N/A"}) Tj
0 -18 Td (DOB: ${contact.dob ?? "N/A"}) Tj
0 -18 Td (Gender: ${contact.gender ?? "N/A"}) Tj
0 -30 Td /F1 14 Tf (Credit Score Summary) Tj
/F1 28 Tf 0 -30 Td (${score}) Tj
/F1 14 Tf 0 -25 Td (Rating: ${rating}) Tj
/F1 11 Tf 0 -18 Td (Score Range: 300 - 900) Tj
0 -30 Td (This report was generated by Credit Consultant.) Tj
0 -18 Td (Contact: accounts@creditconsultant.in | +91 95380 49888) Tj
ET
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
    const res = await fetch(`${BASE_URL}/equifax/${report_id}/pdf`, { headers: authHeaders });
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
