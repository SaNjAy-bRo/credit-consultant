'use client';

import { useParams, Navigate } from "./routerShim";
import { HubPage } from "./HubPage";
import { SpokePage } from "./SpokePage";

const HUB_SLUG = "cibil-score";
const HUB_TITLE = "CIBIL Score Guide";

const SPOKES = [
  { slug: "check-free-online",  title: "Check CIBIL Score Free",    desc: "How to get your free annual CIBIL report from all 4 bureaus.", tag: "Free" },
  { slug: "how-to-improve",     title: "How to Improve CIBIL Score", desc: "Proven steps to raise your score 100+ points in 6 months.",   tag: "+100 pts" },
  { slug: "score-range",        title: "CIBIL Score Range Chart",    desc: "What 300–900 means — Excellent, Good, Fair, Poor explained.", tag: "Guide" },
  { slug: "raise-dispute",      title: "Raise a CIBIL Dispute",      desc: "Step-by-step: file disputes with CIBIL & all 4 bureaus.",     tag: "How-To" },
];

const RELATED_HUBS = [
  { slug: "credit-repair", title: "Credit Repair Guide" },
  { slug: "loans",         title: "Loan Products" },
  { slug: "services",      title: "Our Services" },
];

/* ── Hub ──────────────────────────────────────────────────── */
export function CibilScoreHubPage() {
  return (
    <HubPage
      hubSlug={HUB_SLUG}
      title={HUB_TITLE}
      metaTitle="CIBIL Score — Complete Guide: Check, Improve & Dispute | Credit Consultant"
      metaDescription="Everything about your CIBIL score in one place — how to check it free, improve it, understand the score range, and raise disputes. India's most comprehensive CIBIL guide."
      keywords="CIBIL score guide India, check CIBIL score free, improve CIBIL score, CIBIL score range, raise CIBIL dispute"
      headline="CIBIL Score — The Complete Guide for Indians"
      subheadline="Your CIBIL score controls your financial life. Learn everything about it — from checking your score free to raising disputes and improving by 100+ points."
      intro="The CIBIL score is a three-digit number between 300 and 900 assigned by TransUnion CIBIL — one of India's four licensed credit bureaus. It is the single most important factor lenders use to decide whether to approve your loan application and at what interest rate. A score of 750+ typically gets you the best rates; below 650, most banks will decline your application outright."
      keyPoints={[
        "CIBIL score range: 300 (lowest) to 900 (highest) — 750+ is considered excellent",
        "Payment history accounts for 35% of your score — never miss an EMI",
        "You can check your score free once a year from each of the 4 bureaus",
        "Errors in your CIBIL report can be disputed online — resolution within 30 days",
        "A 50-point improvement can save you ₹2–5 lakh in interest on a home loan",
        "Soft enquiries (checking your own score) do NOT affect your score",
      ]}
      spokes={SPOKES}
      relatedHubs={RELATED_HUBS}
      accentColor="blue"
      faqs={[
        { q: "What is a good CIBIL score in India?", a: "750 and above is considered Excellent and qualifies you for the best loan rates. 700–749 is Good, 650–699 is Fair, and below 650 needs significant improvement. Most banks require at least 700 for home loan approval." },
        { q: "How often does CIBIL update my score?", a: "CIBIL updates your score every 30–45 days as lenders report your repayment data monthly. Major changes like dispute resolutions or loan closures take 30–60 days to reflect." },
        { q: "Does checking my own CIBIL score reduce it?", a: "No. Self-checks are 'soft enquiries' and have zero impact on your score. Only hard enquiries (when lenders check your score for a loan application) can temporarily lower your score by 5–10 points." },
        { q: "How many bureaus are there in India?", a: "India has four RBI-licensed credit bureaus: TransUnion CIBIL, Equifax, Experian and CRIF High Mark. All four collect the same data but may compute scores slightly differently. Lenders may check one or more bureaus." },
        { q: "Can I improve my CIBIL score after a default?", a: "Yes. After resolving the default, consistently paying all dues on time gradually rebuilds your score over 12–24 months. Our credit repair specialists help accelerate this process." },
      ]}
    />
  );
}

/* ── Spoke data ───────────────────────────────────────────── */
const spokeData: Record<string, any> = {
  "check-free-online": {
    title: "Check Your CIBIL Score Free Online",
    metaTitle: "How to Check CIBIL Score Free Online — All 4 Bureaus | Credit Consultant",
    metaDescription: "Step-by-step guide to check your CIBIL score free from all 4 credit bureaus in India — TransUnion CIBIL, Equifax, Experian and CRIF. Free once a year per bureau.",
    keywords: "check CIBIL score free India, free CIBIL report, check Equifax Experian free, credit score check India",
    category: "CIBIL Score",
    readTime: "4 min read",
    updatedDate: "2026-06-22",
    headline: "How to Check Your CIBIL Score Free Online in India",
    intro: "Under RBI guidelines, every Indian consumer is entitled to one free credit report per year from each of the four licensed credit bureaus. This means you can access up to four free credit reports annually — one each from CIBIL, Equifax, Experian and CRIF High Mark.",
    sections: [
      {
        heading: "Why You Should Check All 4 Bureaus",
        body: <><p>Different lenders report to different bureaus. A loan from SBI may be reported to CIBIL while a credit card from HDFC is reported to Equifax. Errors on any bureau can affect your loan eligibility, even if your CIBIL score is perfect. Check all four annually.</p></>
      },
      {
        heading: "Step-by-Step: Check Your Free CIBIL Score",
        body: <><p>1. Go to <strong>cibil.com/freecreditreport</strong> — click "Get Free Credit Report"</p><p className="mt-2">2. Create an account or log in with your PAN and Aadhaar</p><p className="mt-2">3. Verify your identity with an OTP sent to your registered mobile</p><p className="mt-2">4. Your full credit report and score are displayed — download and save the PDF</p><p className="mt-2">5. Repeat at <strong>equifax.co.in</strong>, <strong>experian.in</strong> and <strong>crifhighmark.com</strong></p></>
      },
      {
        heading: "What to Look for in Your Credit Report",
        body: <><p>Review: personal information (name, PAN, addresses), all loan accounts listed, payment history for each account, enquiry section (hard pulls), and the written remarks column. Flag anything unfamiliar — unknown accounts, incorrect payment statuses, or closed accounts showing as open.</p></>
      },
    ],
    keyTakeaways: [
      "You get 1 free report per year from each of the 4 bureaus — that's 4 free reports annually",
      "Checking your own score is a soft enquiry — zero impact on your CIBIL score",
      "Always check all 4 bureaus — errors may exist on one but not others",
      "Download and save your report PDF as evidence for any future disputes",
    ],
    faqs: [
      { q: "Is checking CIBIL score really free?", a: "Yes — once per year per bureau under RBI mandate. Additional checks cost ₹399–₹550. Many banks and apps offer free monthly score checks as a value-added service." },
      { q: "What documents are needed to check CIBIL score?", a: "PAN card (mandatory), Aadhaar or passport for identity verification, and access to your registered mobile number for OTP verification." },
      { q: "How long does it take to get the free CIBIL report?", a: "The free report is typically available instantly online after identity verification. A physical report by post takes 5–7 business days." },
    ],
  },

  "how-to-improve": {
    title: "How to Improve CIBIL Score",
    metaTitle: "How to Improve CIBIL Score Fast — Proven Steps 2026 | Credit Consultant",
    metaDescription: "Proven step-by-step guide to improve your CIBIL score by 100+ points. Covers payment history, credit utilisation, disputes, credit mix and more.",
    keywords: "how to improve CIBIL score fast, increase CIBIL score India, improve credit score tips",
    category: "CIBIL Score",
    readTime: "7 min read",
    updatedDate: "2026-06-22",
    headline: "How to Improve Your CIBIL Score — Proven 6-Month Strategy",
    intro: "A low CIBIL score doesn't have to be permanent. With a structured, disciplined approach — combining dispute resolution with positive credit behaviour — most people can improve their score by 80–150 points in six months.",
    sections: [
      { heading: "Step 1: Dispute All Errors First", body: <><p>Errors are the fastest path to improvement. File disputes for wrong payment statuses, unfamiliar accounts, incorrect balances and closed accounts still showing as open. Resolution typically takes 30–45 days and can add 20–50 points instantly.</p></> },
      { heading: "Step 2: Never Miss an EMI (35% of score)", body: <><p>Payment history is the single largest scoring factor. Set up NACH auto-debit for every loan EMI and credit card minimum due. One missed payment can drop your score by 50–100 points — even for a single month.</p></> },
      { heading: "Step 3: Keep Credit Utilisation Below 30%", body: <><p>If your total credit limit is ₹2 lakh and you use ₹1.6 lakh, your utilisation is 80% — severely impacting your score. Make mid-cycle payments or request a limit increase to bring utilisation below 30%.</p></> },
      { heading: "Step 4: Stop Applying for New Credit", body: <><p>Every loan or credit card application generates a hard enquiry, dropping your score 5–10 points. Multiple applications in a short window signal desperation. During your repair period, apply for credit only when essential.</p></> },
    ],
    keyTakeaways: [
      "Dispute inaccurate entries first — fastest improvement, often 20–50 points in 30–45 days",
      "Pay every EMI and credit card bill on time — most important factor (35% of score)",
      "Keep credit card utilisation below 30% of your total limit",
      "Avoid multiple loan applications — each hard enquiry drops score by 5–10 points",
      "Don't close old credit cards — they maintain your credit age and available limit",
    ],
    faqs: [
      { q: "How long does it take to improve CIBIL score by 100 points?", a: "With active dispute resolution and consistent positive behaviour, most clients see 80–150 point improvement within 3–6 months. Dispute-based gains can appear in 30–45 days." },
      { q: "What is the fastest way to improve CIBIL score?", a: "File disputes for inaccurate negative entries — this can add 20–50 points within 30–45 days without changing any financial behaviour. Combine with reducing credit card utilisation below 30% for the fastest compound effect." },
      { q: "Does closing a loan improve my CIBIL score?", a: "Yes, closing a loan account with a clean payment history is positive for your score. Ensure the account is updated as 'Closed' (not 'Settled') in your credit report after payment." },
    ],
  },

  "score-range": {
    title: "CIBIL Score Range Chart",
    metaTitle: "CIBIL Score Range India — 300 to 900 Explained | Credit Consultant",
    metaDescription: "Understand what your CIBIL score means — Excellent (750+), Good (700–749), Fair (650–699), Poor (below 650). Loan eligibility, interest rates and improvement tips by range.",
    keywords: "CIBIL score range India, CIBIL score 750 meaning, what is good CIBIL score, CIBIL score 300 to 900",
    category: "CIBIL Score",
    readTime: "5 min read",
    updatedDate: "2026-06-22",
    headline: "CIBIL Score Range 300–900 Explained — What Your Score Really Means",
    intro: "Your CIBIL score is a number between 300 and 900. Every range carries different implications for loan eligibility, interest rates you'll receive, and the actions you need to take. Here is a complete breakdown.",
    sections: [
      { heading: "Excellent: 750–900", body: <><p>You qualify for the best loan rates from all major banks. Home loan rates as low as 8.4%, personal loans at 10.5–12%, credit cards with the highest limits and best rewards. Lenders compete for your business.</p></> },
      { heading: "Good: 700–749", body: <><p>Most lenders will approve your application. Rates are slightly higher than Excellent — typically 0.25–0.5% more on home loans. Improving 30–50 more points moves you to Excellent.</p></> },
      { heading: "Fair: 650–699", body: <><p>Some lenders approve — typically NBFCs and private banks — but at interest rates 1–2% higher than Excellent. A structured 3–6 month credit repair plan can move you to Good range.</p></> },
      { heading: "Poor: Below 650", body: <><p>Most banks will reject your application. Only select NBFCs and digital lenders may approve — at significantly higher rates (18–36% for personal loans). Professional credit repair is strongly recommended before applying.</p></> },
    ],
    keyTakeaways: [
      "750+ (Excellent): Best rates, all lenders, credit card upgrades available",
      "700–749 (Good): Most approvals, slightly higher rates than Excellent",
      "650–699 (Fair): Limited lenders, 1–2% higher rates, improvement plan needed",
      "Below 650 (Poor): Professional credit repair recommended before applying",
      "A 50-point improvement from 700 to 750 can save ₹2–4 lakh on a ₹50L home loan",
    ],
    faqs: [
      { q: "What CIBIL score is needed for a home loan in India?", a: "Most banks require a minimum of 700–720 for home loan approval. 750+ qualifies you for the best available interest rates. NBFCs may approve at 650–699 but at 0.5–1% higher rates." },
      { q: "What CIBIL score is needed for a personal loan?", a: "720+ is recommended for the best personal loan rates. Some NBFCs approve at 650+ but with significantly higher interest (18–36% vs 10–14% for 750+ scores)." },
      { q: "Is a CIBIL score of 700 considered good?", a: "A score of 700 is in the 'Good' range — most lenders will approve your application. However, improving to 750+ gives access to the best rates and widest lender choice." },
    ],
  },

  "raise-dispute": {
    title: "Raise a CIBIL Dispute",
    metaTitle: "How to Raise a CIBIL Dispute Online — Step-by-Step Guide | Credit Consultant",
    metaDescription: "Step-by-step guide to raising a CIBIL dispute online in India. Covers what can be disputed, how long it takes, and what happens if the lender doesn't respond.",
    keywords: "how to raise CIBIL dispute, CIBIL dispute online India, dispute credit report India, CIBIL error correction",
    category: "CIBIL Score",
    readTime: "6 min read",
    updatedDate: "2026-06-22",
    headline: "How to Raise a CIBIL Dispute Online — Complete Step-by-Step Guide",
    intro: "Inaccurate information on your CIBIL report can silently block loan approvals and cost you higher interest rates. The good news: every inaccuracy can be disputed, and bureaus are legally required to resolve disputes within 30 days under RBI guidelines.",
    sections: [
      { heading: "What Can You Dispute with CIBIL?", body: <><p>You can dispute: wrong personal information (name, PAN, DOB, address), accounts that don't belong to you, incorrect payment status (showing missed when paid), closed accounts marked as open, wrong outstanding balances, and duplicate account entries.</p></> },
      { heading: "Step-by-Step: Filing a CIBIL Dispute", body: <><p>1. Go to <strong>dispute.cibil.com</strong> and log in or create an account</p><p className="mt-2">2. Navigate to "Raise a Dispute" and select the account or field you want to dispute</p><p className="mt-2">3. Select the type of dispute from the dropdown (e.g., "Amount in dispute", "Ownership dispute")</p><p className="mt-2">4. Upload supporting documents (bank statement, payment receipt, NOC from lender)</p><p className="mt-2">5. Submit — you'll receive a dispute reference number by email/SMS</p><p className="mt-2">6. CIBIL notifies the lender within 5–7 days. Lender has 30 days to respond.</p></> },
      { heading: "What If the Lender Doesn't Respond?", body: <><p>If the lender fails to respond within 30 days, CIBIL is required by RBI to close the dispute in your favour and update your report accordingly. Always keep your dispute reference number and follow up after 30 days if you haven't received resolution.</p></> },
    ],
    keyTakeaways: [
      "File disputes at dispute.cibil.com — free and available 24/7",
      "Upload supporting documents (payment receipts, NOC) to strengthen your dispute",
      "RBI mandates resolution within 30 days — escalate if it takes longer",
      "If lender doesn't respond in 30 days, CIBIL closes dispute in your favour",
      "File disputes with all 4 bureaus simultaneously — an error may exist on multiple reports",
    ],
    faqs: [
      { q: "How long does a CIBIL dispute take?", a: "CIBIL must resolve disputes within 30 days under RBI guidelines. Complex disputes involving lender verification may take up to 45 days. Simple data errors (name, DOB) are often resolved within 7–15 days." },
      { q: "What documents do I need to raise a CIBIL dispute?", a: "Bank statements showing the payment, loan closure certificate or NOC from the lender, receipts for disputed payments, and any written communication from the lender confirming correct account status." },
      { q: "Can I dispute multiple items at once?", a: "Yes. You can raise multiple disputes simultaneously across different accounts and fields on your CIBIL report. Our advisors typically file all disputes in a single batch to accelerate resolution." },
    ],
  },
};

/* ── Spoke page router ────────────────────────────────────── */
export function CibilScoreSpokePage() {
  const { topic } = useParams<{ topic: string }>();
  const data = topic ? spokeData[topic] : null;
  if (!data) return <Navigate to={`/${HUB_SLUG}`} replace />;

  return (
    <SpokePage
      hubSlug={HUB_SLUG}
      hubTitle={HUB_TITLE}
      spokeSlug={topic!}
      siblings={SPOKES}
      relatedHubs={RELATED_HUBS}
      accentColor="blue"
      {...data}
    />
  );
}
