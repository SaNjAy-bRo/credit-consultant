import { useState, useRef, useEffect } from "react";
import { X, Phone, ShieldCheck, ChevronDown, Loader2, FileDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import cibilLogo from "@/imports/CIBIL_Logo.png";

type Step = "mobile" | "otp" | "details";

const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;
const ID_TYPES = ["PAN", "Aadhaar"] as const;

/* ── OTP digit boxes ─────────────────────────────────────── */
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const next = digits.map((d, idx) => (idx === i ? "" : d)).join("");
      onChange(next);
      if (i > 0) inputs.current[i - 1]?.focus();
    }
  };

  const handleChange = (i: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, idx) => (idx === i ? char : d)).join("").trim();
    onChange(next);
    if (char && i < 5) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, 5);
    inputs.current[focusIdx]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all
            ${d ? "border-teal-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-gray-50 text-gray-900"}
            focus:border-blue-500 focus:bg-white`}
        />
      ))}
    </div>
  );
}

/* ── Main modal ──────────────────────────────────────────── */
interface Props {
  open: boolean;
  onClose: () => void;
}

export function GetStartedModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [form, setForm] = useState({
    name: "",
    idType: "PAN" as typeof ID_TYPES[number],
    idNumber: "",
    formMobile: "",
    gender: "" as typeof GENDER_OPTIONS[number] | "",
    consent: false,
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  /* countdown for resend */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  if (!open) return null;

  /* ── handlers ── */
  const handleSendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number");
      return;
    }
    setMobileError("");
    setOtpLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setOtpLoading(false);
    setOtpSent(true);
    setResendTimer(30);
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setOtpError("Enter the 6-digit OTP");
      return;
    }
    setOtpError("");
    setVerifyLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setVerifyLoading(false);
    setForm((f) => ({ ...f, formMobile: mobile }));
    setStep("details");
  };

  const validateForm = () => {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    const panRe = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const aadhaarRe = /^\d{12}$/;
    if (form.idType === "PAN" && !panRe.test(form.idNumber.toUpperCase()))
      e.idNumber = "Enter a valid PAN (e.g. ABCDE1234F)";
    if (form.idType === "Aadhaar" && !aadhaarRe.test(form.idNumber))
      e.idNumber = "Enter a valid 12-digit Aadhaar number";
    if (!/^[6-9]\d{9}$/.test(form.formMobile)) e.formMobile = "Enter a valid 10-digit mobile number";
    if (!form.gender) e.gender = "Please select your gender";
    if (!form.consent) e.consent = "Consent is required to proceed";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSubmitLoading(false);
    setSubmitted(true);
  };

  const handleFetchEquifax = async () => {
    setPdfLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    setPdfLoading(false);
    setPdfReady(true);

    // In production: replace with real API call that returns a signed PDF URL
    // const res = await fetch("/api/equifax-report", { method: "POST", body: JSON.stringify({ pan: form.idNumber, mobile: form.formMobile }) });
    // const { url } = await res.json();
    // window.open(url, "_blank");

    // Demo: generate a minimal downloadable PDF blob
    const content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 220>>
stream
BT /F1 18 Tf 72 750 Td (Equifax Credit Report) Tj
0 -30 Td /F1 12 Tf (Name: ${form.name}) Tj
0 -20 Td (Mobile: +91 ${form.formMobile}) Tj
0 -20 Td (ID Type: ${form.idType}) Tj
0 -20 Td (ID Number: ${form.idNumber}) Tj
0 -20 Td (Report generated by Credit Consultant) Tj ET
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
trailer<</Size 6/Root 1 0 R>>
startxref 0
%%EOF`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Equifax_Report_${form.name.replace(/\s+/g, "_")}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("mobile");
      setMobile("");
      setOtp("");
      setOtpSent(false);
      setMobileError("");
      setOtpError("");
      setResendTimer(0);
      setForm({ name: "", idType: "PAN", idNumber: "", formMobile: "", gender: "", consent: false });
      setFormErrors({});
      setSubmitted(false);
      setPdfReady(false);
      setPdfLoading(false);
    }, 300);
  };

  /* ── shared header ── */
  const Header = ({ subtitle }: { subtitle: string }) => (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-white p-1.5 rounded-lg shadow-sm">
          <img src={cibilLogo} alt="Credit Consultant" className="h-7 w-auto object-contain" />
        </div>
        <div className="border-l border-white/30 pl-3">
          <p className="text-white font-bold text-base leading-none">Get Started</p>
          <p className="text-teal-200 text-xs mt-0.5">{subtitle}</p>
        </div>
      </div>
      <button onClick={handleClose} className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>
  );

  /* ── step indicators ── */
  const steps = [
    { key: "mobile", label: "Mobile" },
    { key: "otp",    label: "OTP" },
    { key: "details",label: "Details" },
  ];
  const stepIdx = steps.findIndex((s) => s.key === step);

  const StepBar = () => (
    <div className="flex items-center gap-0 px-6 pt-5 pb-1">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${i < stepIdx ? "bg-green-500 text-white" : i === stepIdx ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-400"}`}>
              {i < stepIdx ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] font-medium ${i === stepIdx ? "text-teal-600" : "text-gray-400"}`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mb-4 mx-1 rounded-full transition-all ${i < stepIdx ? "bg-green-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <Header subtitle={
          step === "mobile" ? "Step 1 — Verify your mobile" :
          step === "otp"    ? "Step 2 — Enter OTP" :
                             "Step 3 — Your details"
        } />

        <StepBar />

        {/* ── STEP 1: MOBILE ── */}
        {step === "mobile" && (
          <div className="px-6 pb-7 pt-4 space-y-5">
            <div>
              <p className="text-gray-700 text-sm mb-4">
                Enter your registered mobile number to receive a one-time password.
              </p>
              <Label htmlFor="gs-mobile">Mobile Number *</Label>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-sm text-gray-500 font-medium">
                  +91
                </span>
                <Input
                  id="gs-mobile"
                  placeholder="Enter 10-digit number"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "")); setMobileError(""); }}
                  className={`rounded-l-none ${mobileError ? "border-red-400" : ""}`}
                  onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                />
              </div>
              {mobileError && <p className="text-xs text-red-500 mt-1">{mobileError}</p>}
            </div>

            <Button onClick={handleSendOtp} disabled={otpLoading} className="w-full bg-teal-600 hover:bg-teal-700 h-11">
              {otpLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending OTP…</> : <>
                <Phone className="w-4 h-4 mr-2" /> Send OTP
              </>}
            </Button>
          </div>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === "otp" && (
          <div className="px-6 pb-7 pt-4 space-y-5">
            <p className="text-gray-600 text-sm text-center">
              OTP sent to <span className="font-semibold text-gray-800">+91 {mobile}</span>.
              <button onClick={() => setStep("mobile")} className="ml-1 text-blue-600 underline text-xs">Change</button>
            </p>

            <div className="space-y-3">
              <Label className="block text-center text-sm">Enter 6-digit OTP</Label>
              <OtpInput value={otp} onChange={(v) => { setOtp(v); setOtpError(""); }} />
              {otpError && <p className="text-xs text-red-500 text-center">{otpError}</p>}
            </div>

            <Button onClick={handleVerifyOtp} disabled={verifyLoading || otp.length < 6} className="w-full bg-teal-600 hover:bg-teal-700 h-11">
              {verifyLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Verifying…</> : <>
                <ShieldCheck className="w-4 h-4 mr-2" /> Verify OTP
              </>}
            </Button>

            <p className="text-center text-xs text-gray-400">
              {resendTimer > 0
                ? <>Resend OTP in <span className="text-blue-600 font-semibold">{resendTimer}s</span></>
                : <button onClick={handleSendOtp} className="text-blue-600 underline font-medium">Resend OTP</button>}
            </p>
          </div>
        )}

        {/* ── STEP 3: DETAILS ── */}
        {step === "details" && !submitted && (
          <form onSubmit={handleSubmit} className="px-6 pb-7 pt-4 space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="gs-name">Name *</Label>
              <Input
                id="gs-name"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`mt-1 ${formErrors.name ? "border-red-400" : ""}`}
              />
              {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
            </div>

            {/* ID Type + ID Number side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="gs-idtype">ID Type *</Label>
                <div className="relative mt-1">
                  <select
                    id="gs-idtype"
                    value={form.idType}
                    onChange={(e) => setForm({ ...form, idType: e.target.value as typeof ID_TYPES[number], idNumber: "" })}
                    className="w-full appearance-none border border-gray-300 rounded-xl px-3 py-2 pr-8 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {ID_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label htmlFor="gs-idnumber">ID Number *</Label>
                <Input
                  id="gs-idnumber"
                  placeholder={form.idType === "PAN" ? "ABCDE1234F" : "12-digit number"}
                  maxLength={form.idType === "PAN" ? 10 : 12}
                  value={form.idNumber}
                  onChange={(e) => setForm({ ...form, idNumber: form.idType === "PAN" ? e.target.value.toUpperCase() : e.target.value.replace(/\D/g, "") })}
                  className={`mt-1 ${formErrors.idNumber ? "border-red-400" : ""}`}
                />
                {formErrors.idNumber && <p className="text-xs text-red-500 mt-1">{formErrors.idNumber}</p>}
              </div>
            </div>

            {/* Mobile */}
            <div>
              <Label htmlFor="gs-formmobile">Mobile *</Label>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-sm text-gray-500 font-medium">
                  +91
                </span>
                <Input
                  id="gs-formmobile"
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.formMobile}
                  onChange={(e) => setForm({ ...form, formMobile: e.target.value.replace(/\D/g, "") })}
                  className={`rounded-l-none ${formErrors.formMobile ? "border-red-400" : ""}`}
                />
              </div>
              {formErrors.formMobile && <p className="text-xs text-red-500 mt-1">{formErrors.formMobile}</p>}
            </div>

            {/* Gender */}
            <div>
              <Label>Gender *</Label>
              <div className="flex gap-3 mt-2">
                {GENDER_OPTIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, gender: g })}
                    className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.gender === g
                        ? "border-teal-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-blue-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {formErrors.gender && <p className="text-xs text-red-500 mt-1">{formErrors.gender}</p>}
            </div>

            {/* Consent */}
            <div>
              <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl border-2 transition-all ${
                form.consent ? "border-blue-500 bg-blue-50" : formErrors.consent ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-blue-300"
              }`}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-teal-600 flex-shrink-0 cursor-pointer"
                />
                <span className="text-xs text-gray-700 leading-snug">
                  I give consent (Hard Pull) * — I authorise Credit Consultant to fetch my full credit report from the bureau. This may appear as an inquiry on my credit profile.
                </span>
              </label>
              {formErrors.consent && <p className="text-xs text-red-500 mt-1">{formErrors.consent}</p>}
            </div>

            <Button type="submit" disabled={submitLoading} className="w-full bg-teal-600 hover:bg-teal-700 h-11 mt-1">
              {submitLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting…</> : "Submit & Get Report"}
            </Button>
          </form>
        )}

        {/* ── SUCCESS ── */}
        {submitted && (
          <div className="px-6 pb-8 pt-6 space-y-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">You're all set!</h3>
              <p className="text-sm text-gray-600">
                Thank you, <span className="font-semibold">{form.name}</span>. Our advisor will contact you on{" "}
                <span className="font-semibold">+91 {form.formMobile}</span> within 24 hours with your full credit report.
              </p>
            </div>

            {/* Equifax PDF button */}
            <div className="rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FileDown className="w-5 h-5 text-orange-500" />
                <p className="text-sm font-semibold text-gray-800">Equifax Credit Report</p>
                {pdfReady && (
                  <span className="ml-auto text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Downloaded</span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Fetch your official Equifax credit report PDF instantly. This uses the details you just submitted.
              </p>
              <Button
                onClick={handleFetchEquifax}
                disabled={pdfLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-10 text-sm"
              >
                {pdfLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Fetching Equifax Report…</>
                ) : pdfReady ? (
                  <><FileDown className="w-4 h-4 mr-2" /> Download Again</>
                ) : (
                  <><FileDown className="w-4 h-4 mr-2" /> Fetch Equifax PDF</>
                )}
              </Button>
            </div>

            <Button variant="outline" onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
