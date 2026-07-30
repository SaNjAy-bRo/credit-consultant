'use client';

import { useParams, Navigate } from "./routerShim";
import { HubPage } from "./HubPage";
import { SpokePage } from "./SpokePage";

const HUB_SLUG = "credit-repair";
const HUB_TITLE = "Credit Repair Guide";

const SPOKES = [
  { slug: "remove-write-off",   title: "Remove Write-Off from CIBIL",   desc: "Step-by-step guide to resolving a write-off entry on your report.", tag: "Critical" },
  { slug: "settled-loan-repair", title: "Repair After Loan Settlement",  desc: "How to rebuild your CIBIL score after a settled loan account.",     tag: "Recovery" },
  { slug: "cheque-bounce",       title: "Cheque Bounce & CIBIL Impact",  desc: "What actually happens to your score when a cheque bounces.",        tag: "Facts" },
  { slug: "dispute-errors",      title: "Dispute Credit Report Errors",  desc: "How to identify and dispute inaccurate entries across all 4 bureaus.", tag: "How-To" },
];

const RELATED_HUBS = [
  { slug: "cibil-score", title: "CIBIL Score Guide" },
  { slug: "loans",       title: "Loan Products" },
  { slug: "services",    title: "Our Services" },
];

/* ── Hub ──────────────────────────────────────────────────── */
export function CreditRepairHubPage() {
  return (
    <HubPage
      hubSlug={HUB_SLUG}
      title={HUB_TITLE}
      metaTitle="Credit Repair India — Complete Guide: Remove Write-Offs, Settle Disputes | Credit Consultant"
      metaDescription="India's complete credit repair guide — remove write-offs, repair settled loan damage, dispute errors across all 4 bureaus. Expert-verified, RBI-compliant process."
      keywords="credit repair India, CIBIL repair guide, remove write-off CIBIL, credit report dispute India, settled loan CIBIL repair"
      headline="Credit Repair India — The Complete Expert Guide"
      subheadline="From write-offs and settled loans to cheque bounce impact and error disputes — everything you need to repair your CIBIL score and get loan-ready."
      intro="Credit repair is the structured process of identifying and removing inaccurate, outdated or disputable negative information from your credit report — and strategically rebuilding positive credit history. In India, this process follows the RBI-mandated dispute framework across four bureaus: CIBIL, Equifax, Experian and CRIF High Mark."
      keyPoints={[
        "Write-off entries can be resolved — 'Post Write-Off Closed' status available since Jan 2025 (RBI)",
        "Settled loan accounts can be upgraded to 'Closed' by paying the full outstanding amount",
        "Credit report errors affect 25%+ of Indians — disputing them is the fastest way to improve scores",
        "Professional credit repair achieves 80–150 point improvements in 3–6 months",
        "RBI mandates bureau resolution within 30 days — non-compliance can be escalated",
        "All credit repair in India is 100% legal under consumer protection and RBI guidelines",
      ]}
      spokes={SPOKES}
      relatedHubs={RELATED_HUBS}
      accentColor="purple"
      faqs={[
        { q: "Is credit repair legal in India?", a: "Yes, completely legal. Credit repair involves disputing inaccurate information, negotiating with lenders for correct reporting, and strategically managing credit behaviour. All steps are permitted under RBI guidelines and the Credit Information Companies (Regulation) Act." },
        { q: "How long does professional credit repair take?", a: "Error removal through disputes: 30–60 days. Behaviour-based score improvement: 3–6 months. Recovery from a default or write-off: 12–24 months with consistent effort." },
        { q: "Can a write-off be completely removed from my CIBIL report?", a: "A write-off cannot be deleted before 7 years. However, once you pay the outstanding amount, the status changes to 'Post Write-Off Closed' (new RBI 2025 rule) — significantly less damaging and viewed far more favourably by lenders." },
        { q: "What is the difference between settled and closed on a credit report?", a: "'Settled' means you paid less than the full amount — lenders see this as a partial default. 'Closed' means you paid the full outstanding amount — treated as a clean closure. Always negotiate to pay the full amount for a 'Closed' status." },
        { q: "Can I do credit repair myself?", a: "Yes, for straightforward errors. For complex cases (write-offs, settlements, multiple bureau errors, identity mix-ups), professional credit repair advisors are significantly faster and more effective." },
      ]}
    />
  );
}

/* ── Spoke data ───────────────────────────────────────────── */
const spokeData: Record<string, any> = {
  "remove-write-off": {
    title: "Remove Write-Off from CIBIL Report",
    metaTitle: "How to Remove Write-Off from CIBIL Report — Complete Guide 2026 | Credit Consultant",
    metaDescription: "Step-by-step guide to removing a write-off from your CIBIL report. Covers Post Write-Off Closed (RBI 2025 rule), negotiating with lenders, and timeline to score recovery.",
    keywords: "remove write-off CIBIL, written off CIBIL India, post write-off closed RBI 2025, CIBIL write-off removal",
    category: "Credit Repair",
    readTime: "7 min read",
    updatedDate: "2026-06-22",
    headline: "How to Remove a Write-Off from Your CIBIL Report",
    intro: "A 'Written Off' entry is one of the most damaging marks on a credit report — it signals that a lender gave up trying to collect your debt. But it is not the end. With the right process, you can get the status updated, rebuild your score, and become loan-eligible again.",
    sections: [
      { heading: "What Does 'Written Off' Actually Mean?", body: <><p>When a loan remains unpaid for 90+ days (classified as NPA), the lender may internally write off the loan as a bad debt for their accounting. This does NOT cancel the debt — you still legally owe every rupee. The write-off is simply the lender removing it from their active books while continuing collection efforts.</p></> },
      { heading: "New RBI Rule (Jan 2025): Post Write-Off Closed", body: <><p>Since January 2025, the RBI introduced a new credit reporting status: <strong>'Post Write-Off Closed'</strong>. When you pay the full outstanding amount on a written-off account, the lender must update CIBIL with this status — clearly indicating that while the account was written off, you have since paid it in full. This is significantly less damaging than a plain 'Written Off' entry.</p></> },
      { heading: "Step-by-Step Process to Resolve", body: <><p>1. Pull your CIBIL report and identify all write-off entries</p><p className="mt-1">2. Contact the original lender — get the exact outstanding amount in writing</p><p className="mt-1">3. Negotiate a payment plan or pay the full outstanding immediately</p><p className="mt-1">4. Pay in full — obtain a No Objection Certificate (NOC)</p><p className="mt-1">5. Request the lender update CIBIL to 'Post Write-Off Closed'</p><p className="mt-1">6. Wait 30–45 days for the update to reflect on your CIBIL report</p><p className="mt-1">7. Raise a CIBIL dispute if the lender delays beyond 45 days</p></> },
    ],
    keyTakeaways: [
      "Write-off doesn't cancel your debt — pay the full outstanding to get 'Post Write-Off Closed' status",
      "New RBI 2025 rule: 'Post Write-Off Closed' is significantly better than plain 'Written Off'",
      "Always get a No Objection Certificate (NOC) after payment — keep it permanently",
      "Allow 30–45 days for CIBIL to reflect the lender's update",
      "After resolution, score can recover by 40–80 points over 6–12 months of clean payments",
    ],
    faqs: [
      { q: "How long does a write-off stay on CIBIL report?", a: "A write-off entry stays on your CIBIL report for 7 years from the date of last activity. However, once updated to 'Post Write-Off Closed', lenders view it far more favourably even before the 7 years expire." },
      { q: "Can I get a loan after a write-off?", a: "Most banks will not approve loans immediately after a write-off resolution. However, 12–24 months of consistent clean payment history after the resolution enables many clients to qualify for loans — especially from NBFCs and housing finance companies initially." },
      { q: "Should I settle or pay the full write-off amount?", a: "Always pay the full outstanding amount. A 'Settlement' status (partial payment) is nearly as damaging as a write-off. Only paying in full results in 'Closed' or 'Post Write-Off Closed' status — which is treated far better by lenders." },
    ],
  },

  "settled-loan-repair": {
    title: "Repair Your CIBIL Score After a Loan Settlement",
    metaTitle: "CIBIL Score Recovery After Loan Settlement — How to Repair | Credit Consultant",
    metaDescription: "Complete guide to repairing your CIBIL score after a loan settlement. Learn how to convert 'Settled' to 'Closed', how long recovery takes, and fastest repair strategies.",
    keywords: "CIBIL score after loan settlement, settled account CIBIL repair India, convert settled to closed CIBIL",
    category: "Credit Repair",
    readTime: "6 min read",
    updatedDate: "2026-06-22",
    headline: "How to Repair Your CIBIL Score After a Loan Settlement",
    intro: "A 'Settled' account on your CIBIL report — where you paid less than the full outstanding amount — is viewed by lenders as a partial default. While it is less severe than a write-off, it significantly impacts your loan eligibility. Here is how to repair the damage.",
    sections: [
      { heading: "Why 'Settled' Is So Damaging", body: <><p>When you settle a loan, the lender reports it to CIBIL as 'Settled' — a flag that you did not honour your full repayment obligation. This stays on your report for 7 years and can drop your score by 50–80 points. Most banks will not approve loans for borrowers with recent settled accounts.</p></> },
      { heading: "Can You Convert 'Settled' to 'Closed'?", body: <><p>Yes — by paying the remaining outstanding amount (the difference between what you settled for and the original full amount). Once paid, the lender can update the status from 'Settled' to 'Closed'. This requires negotiation with the lender and written confirmation before and after payment.</p></> },
      { heading: "CIBIL Score Recovery Timeline After Settlement", body: <><p><strong>Months 1–3:</strong> Pay all current dues on time, keep utilisation below 30%, avoid new applications</p><p className="mt-1"><strong>Months 4–6:</strong> Score starts recovering — 20–40 point improvement typical</p><p className="mt-1"><strong>Months 7–12:</strong> 40–80 point recovery possible with clean payment history</p><p className="mt-1"><strong>Year 2+:</strong> If full outstanding was paid and account closed, lenders may consider applications</p></> },
    ],
    keyTakeaways: [
      "'Settled' stays on your CIBIL report for 7 years — convert to 'Closed' by paying the remaining balance",
      "After conversion to 'Closed', score recovery of 40–80 points is typical over 12 months",
      "Consistent on-time payments on other accounts accelerate recovery significantly",
      "Never take new loans until your score has recovered — high rates worsen the cycle",
      "Consider a credit builder loan or secured credit card to rebuild positive history",
    ],
    faqs: [
      { q: "How long does a settled loan stay on CIBIL?", a: "A settled account remains on your CIBIL report for 7 years from the date of settlement. However, converting it to 'Closed' by paying the balance, and building positive history on other accounts, reduces its impact significantly over time." },
      { q: "Can I get a home loan after settling a personal loan?", a: "It becomes very difficult immediately after settlement. Most lenders require at least 2 years of clean payment history post-settlement and prefer the account to show as 'Closed' rather than 'Settled' before approving home loans." },
      { q: "Is it worth paying more to convert 'Settled' to 'Closed'?", a: "Almost always yes. The interest savings from qualifying for a home loan at 8.5% instead of 11%+ (or being approved at all) far exceed the cost of clearing the remaining settlement balance." },
    ],
  },

  "cheque-bounce": {
    title: "Cheque Bounce Impact on CIBIL Score",
    metaTitle: "Does Cheque Bounce Affect CIBIL Score? — Complete Fact Check | Credit Consultant",
    metaDescription: "Fact-checked guide on how cheque bounce affects your CIBIL score in India. Separates direct from indirect impact, legal consequences under NI Act, and how to protect your score.",
    keywords: "cheque bounce CIBIL score India, does cheque bounce affect credit score, NI Act cheque bounce, ECS bounce CIBIL",
    category: "Credit Repair",
    readTime: "5 min read",
    updatedDate: "2026-06-22",
    headline: "Cheque Bounce and Your CIBIL Score — What Actually Happens",
    intro: "A cheque bounce is one of the most misunderstood financial events in India. Many believe it automatically destroys their CIBIL score. The truth is more nuanced — the direct impact depends entirely on why the cheque bounced and what payment it was meant for.",
    sections: [
      { heading: "Direct vs Indirect CIBIL Impact", body: <><p><strong>Direct impact: None.</strong> A cheque bounce itself is not reported to CIBIL. Credit bureaus do not receive data about cheque clearances.</p><p className="mt-2"><strong>Indirect impact: Potentially severe.</strong> If the bounced cheque was for a loan EMI or credit card payment, and that payment remains unpaid, the missed payment IS reported to CIBIL — dropping your score by 50–100 points.</p></> },
      { heading: "How to Prevent CIBIL Impact After a Bounce", body: <><p>1. Make the payment immediately via NEFT/UPI/RTGS — same day if possible</p><p className="mt-1">2. Notify your lender proactively about the bounce and alternate payment</p><p className="mt-1">3. Verify with the lender that no 'missed payment' flag will be reported</p><p className="mt-1">4. Check your CIBIL report 45 days later to confirm no negative entry</p><p className="mt-1">5. Switch to NACH auto-debit mandates for all future EMIs</p></> },
      { heading: "Legal Consequences Under Section 138 NI Act", body: <><p>Beyond the credit score impact, cheque bounce is a criminal offence under Section 138 of the Negotiable Instruments Act, 1881. The payee can file a complaint within 30 days of bounce notice. Consequences include imprisonment up to 2 years and/or a fine up to twice the cheque amount.</p></> },
    ],
    keyTakeaways: [
      "Cheque bounce alone does NOT directly reduce your CIBIL score",
      "If the bounced cheque was for an EMI/credit card and payment isn't made, your score drops 50–100 pts",
      "Pay missed dues immediately via NEFT/UPI to prevent bureau reporting",
      "Cheque bounce is a criminal offence under Section 138 NI Act — up to 2 years imprisonment",
      "Switch to NACH auto-debit mandates to avoid future bounces on loan EMIs",
    ],
    faqs: [
      { q: "Does ECS/NACH bounce affect CIBIL score?", a: "Yes — indirectly. If an ECS or NACH debit for a loan EMI bounces and the EMI is not paid by alternate means before the lender's reporting cycle, the missed payment is reported to CIBIL." },
      { q: "Can multiple cheque bounces lead to loan rejection?", a: "Yes. Even if no CIBIL entry exists, many lenders check your bank statement for bounce history during loan processing. Multiple ECS/cheque bounces in bank statements can lead to rejection regardless of CIBIL score." },
      { q: "Is one cheque bounce enough to get a criminal case?", a: "Yes. Under Section 138 of the NI Act, even a single cheque bounce is sufficient for the payee to file a criminal complaint. The drawer is given a 15-day notice period to make the payment before the complaint is filed." },
    ],
  },

  "dispute-errors": {
    title: "Dispute Credit Report Errors Across All 4 Bureaus",
    metaTitle: "How to Dispute Credit Report Errors in India — All 4 Bureaus | Credit Consultant",
    metaDescription: "Complete guide to identifying and disputing credit report errors across CIBIL, Equifax, Experian and CRIF. RBI-mandated 30-day resolution, step-by-step process.",
    keywords: "dispute credit report errors India, CIBIL Equifax Experian error dispute, credit report wrong information India",
    category: "Credit Repair",
    readTime: "6 min read",
    updatedDate: "2026-06-22",
    headline: "How to Dispute Credit Report Errors Across All 4 Bureaus",
    intro: "A 2024 study found that over 25% of Indian credit reports contain at least one error that negatively affects the borrower's score. These errors can cost you loan rejections and higher interest rates for years — but every single one can be disputed and corrected.",
    sections: [
      { heading: "Most Common Credit Report Errors in India", body: <><p>• Accounts belonging to another person (identity mix-up — same name/DOB)</p><p className="mt-1">• Loans you closed years ago still showing as 'Active'</p><p className="mt-1">• Payments marked 'Missed' that were actually paid on time</p><p className="mt-1">• Wrong outstanding balances or loan amounts</p><p className="mt-1">• Duplicate accounts listed twice under different loan numbers</p><p className="mt-1">• Incorrect personal information (wrong PAN, address, employer)</p></> },
      { heading: "Dispute Portals for All 4 Bureaus", body: <><p><strong>CIBIL:</strong> Official CIBIL Dispute Portal</p><p className="mt-1"><strong>Equifax:</strong> Official Equifax Dispute Centre</p><p className="mt-1"><strong>Experian:</strong> Official Experian Consumer Dispute Portal</p><p className="mt-1"><strong>CRIF:</strong> Official CRIF High Mark Dispute Portal</p><p className="mt-2">File disputes with all relevant bureaus simultaneously — or let Credit Consultant handle multi-bureau disputes on your behalf for faster turnaround.</p></> },
      { heading: "What Happens After Filing", body: <><p>The bureau notifies the lender within 5–7 days. The lender has 30 days to respond with correct information. If the lender confirms the error, the bureau updates your report. If the lender doesn't respond within 30 days, RBI mandates the bureau resolve in your favour.</p></> },
    ],
    keyTakeaways: [
      "25%+ of Indian credit reports contain errors — check all 4 bureaus annually",
      "File disputes simultaneously across CIBIL, Equifax, Experian and CRIF",
      "RBI mandates 30-day resolution — escalate to RBI's SCORES portal if bureaus delay",
      "Upload supporting documents (receipts, NOC, statements) to strengthen your dispute",
      "Dispute resolution can add 20–80 points to your score within 45 days",
    ],
    faqs: [
      { q: "What if the same error appears on all 4 bureaus?", a: "File disputes with all four bureaus simultaneously. The error is sourced from the lender's data feed, so it may appear on all bureaus. Resolving with the lender directly (with a written request to update all bureaus) is the fastest approach." },
      { q: "What if CIBIL doesn't resolve my dispute in 30 days?", a: "Escalate to the RBI's SCORES (Structured Centralised Online Resolution) portal at scores.rbi.org.in. You can also file a complaint with the Banking Ombudsman. Under RBI guidelines, non-compliance is a reportable offence." },
      { q: "Can I dispute a valid negative entry (e.g., a genuinely missed payment)?", a: "You can only dispute inaccurate information — you cannot remove valid negative entries. Genuinely missed payments must age off your report (7 years) while you rebuild positive history through on-time payments." },
    ],
  },
};

/* ── Spoke page router ────────────────────────────────────── */
export function CreditRepairSpokePage() {
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
      accentColor="purple"
      {...data}
    />
  );
}
