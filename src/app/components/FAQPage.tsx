'use client';

import { useState } from "react";
import { Link } from "./routerShim";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { SEOHead, faqSchema, breadcrumbSchema, ORG_SCHEMA } from "./SEOHead";
import { CheckScoreButton } from "./CheckScoreModal";

const BASE_URL = "https://creditconsultant.in";

const faqCategories = [
  {
    id: "cibil",
    label: "CIBIL Score",
    faqs: [
      { q: "What is a CIBIL score and how is it calculated?", a: "A CIBIL score is a 3-digit number between 300–900 assigned by TransUnion CIBIL based on your credit history. It is calculated using five factors: payment history (35%), credit utilisation (30%), credit age (15%), credit mix (10%), and new enquiries (10%)." },
      { q: "What is a good CIBIL score in India?", a: "750 and above is Excellent, 700–749 is Good, 650–699 is Fair, and below 650 needs improvement. For home loans, most banks require 700+ for the best interest rates." },
      { q: "How often is the CIBIL score updated?", a: "CIBIL updates your credit score every 30–45 days as lenders report your payment data monthly. Major changes like loan closures or dispute resolutions can take 30–60 days to reflect." },
      { q: "Does checking my CIBIL score reduce it?", a: "No. Checking your own credit score is a soft inquiry and has zero impact on your score. Only hard inquiries (when lenders check your score for a loan application) can slightly reduce it." },
      { q: "How many CIBIL enquiries are too many?", a: "More than 3–4 hard enquiries in a 6-month period is considered excessive and can negatively impact your score. Each hard enquiry can reduce your score by 5–10 points." },
      { q: "Can I have a CIBIL score of -1 or 0?", a: "Yes. A CIBIL score of -1 means 'No History' — you have no credit products in your name. A score of 0 means your credit history is less than 6 months old. Both indicate you are a 'new to credit' borrower." },
    ],
  },
  {
    id: "credit-repair",
    label: "Credit Repair",
    faqs: [
      { q: "How long does professional credit repair take?", a: "Dispute-based improvements (removing errors) typically show in 30–60 days. Behaviour-based improvements (on-time payments, reduced utilisation) take 3–6 months. A comprehensive recovery from a default can take 12–24 months." },
      { q: "Is credit repair legal in India?", a: "Yes, completely legal. Credit repair involves disputing inaccurate information, negotiating with lenders, and strategically managing credit behaviour — all permitted under consumer protection laws and RBI guidelines." },
      { q: "Can a settled loan be removed from my CIBIL report?", a: "A settled loan remains on your credit report for 7 years. However, once you pay the full outstanding amount (converting it from 'Settled' to 'Closed'), lenders view it more favourably even before it ages off the report." },
      { q: "What is the difference between 'Settled' and 'Written Off' on a credit report?", a: "'Settled' means you paid less than the full amount owed and the bank agreed to close the account. 'Written Off' means the bank has given up on collecting — it's even more damaging. Both are serious negative marks but can be recovered from with time and professional help." },
      { q: "Can I dispute a CIBIL entry myself?", a: "Yes. You can file disputes directly at dispute.cibil.com. However, complex disputes — especially involving multiple lenders or settlement entries — benefit from professional handling as the process requires follow-up and documentation." },
    ],
  },
  {
    id: "home-loan",
    label: "Home Loan",
    faqs: [
      { q: "What is the minimum CIBIL score for a home loan?", a: "Most banks require a minimum CIBIL score of 700–720 for home loans. Some NBFCs may approve at 650+ but at higher interest rates. Scores above 750 typically qualify for the best available rates." },
      { q: "How much home loan can I get on a ₹1 lakh salary?", a: "Typically 55–60 times your net monthly salary, assuming 40–50% FOIR. On ₹1 lakh net salary with no existing EMIs, you may qualify for approximately ₹55–60 lakh home loan at current rates. This varies significantly by lender and city." },
      { q: "What are the tax benefits on a home loan?", a: "Under Section 80C: up to ₹1.5 lakh deduction on principal repayment. Under Section 24(b): up to ₹2 lakh deduction on interest for self-occupied property. First-time buyers: additional ₹50,000 under Section 80EEA for loans below ₹45 lakh." },
      { q: "Can I get a home loan with a CIBIL score below 700?", a: "It's challenging but not impossible. NBFCs and housing finance companies (HFCs) are more flexible than banks. We help clients improve their scores quickly and then match them with the right lender. In some cases, we negotiate with lenders directly for borderline cases." },
      { q: "What is the difference between fixed and floating home loan rates?", a: "Fixed rates remain constant for a specified period (typically 2–5 years) regardless of market changes. Floating rates change with the lender's benchmark rate (linked to RBI repo rate). Floating rates are usually 0.5–1.5% lower initially but carry rate risk." },
    ],
  },
  {
    id: "personal-loan",
    label: "Personal Loan",
    faqs: [
      { q: "Can I get a personal loan with a low CIBIL score?", a: "Some NBFCs and digital lenders approve personal loans for scores as low as 650, but at significantly higher interest rates (18–36%). It's almost always better to spend 2–3 months improving your score before applying rather than paying high interest rates." },
      { q: "What is the maximum personal loan amount I can get?", a: "Personal loan amounts range from ₹50,000 to ₹40 lakh depending on the lender. The amount you qualify for is based on your income, existing EMIs (FOIR), employer profile, and credit score. Top lenders offer up to ₹40 lakh for salaried professionals in good companies." },
      { q: "Does a personal loan affect my CIBIL score?", a: "Taking a personal loan initially causes a small dip due to the hard inquiry and increased debt load. However, regular on-time repayments improve your score over time. A personal loan can also improve your credit mix, which has a small positive impact." },
      { q: "Can I prepay a personal loan?", a: "Yes, but most lenders charge a prepayment penalty of 2–5% of the outstanding amount if you prepay within 12 months. After 12 months, many lenders allow penalty-free prepayment. Check your loan agreement for specific terms." },
    ],
  },
  {
    id: "business-loan",
    label: "Business Loan",
    faqs: [
      { q: "What credit score do I need for a business loan?", a: "For banks, you typically need a personal CIBIL score of 700+ and a CIBIL MSME Rank of 1–4. NBFCs may approve at 650+ but at higher rates. Your business's GSTIN history, ITR and bank statement health are equally important." },
      { q: "Can I get a business loan without ITR?", a: "It's difficult for formal bank loans, but some NBFCs offer bank-statement-based loans without ITR for businesses with 12+ months of healthy bank statement history. The interest rates are typically higher." },
      { q: "What is the Mudra loan and how do I apply?", a: "Pradhan Mantri Mudra Yojana provides loans up to ₹10 lakh for micro enterprises. Shishu (up to ₹50K), Kishore (₹50K–₹5L), Tarun (₹5L–₹10L). Apply through any bank, NBFC or MFI with basic KYC and business proof documents." },
      { q: "How long does business loan approval take?", a: "Banks typically take 7–21 working days. NBFCs and fintech lenders can approve in 24–72 hours for small ticket loans. Having all documents ready and a clean credit profile speeds up approval significantly." },
    ],
  },
  {
    id: "general",
    label: "General Finance",
    faqs: [
      { q: "What is FOIR and how does it affect loan eligibility?", a: "FOIR (Fixed Obligation to Income Ratio) is the percentage of your monthly income committed to existing EMIs and fixed obligations. Most banks cap this at 40–55%. If your FOIR is already at 50%, you may not qualify for additional loans regardless of your credit score." },
      { q: "What is the difference between CIBIL, Equifax, Experian and CRIF?", a: "India has four licensed credit bureaus: TransUnion CIBIL, Equifax, Experian and CRIF High Mark. They all collect the same data from lenders but may compute scores slightly differently. All four are equally valid; lenders may check one or more bureaus." },
      { q: "How do I get my free credit report in India?", a: "Under RBI guidelines, each bureau must provide one free report per year. Get yours from: cibil.com/freecreditreport, equifax.co.in, experian.in, and crifhighmark.com. Additional reports cost ₹399–₹550 per bureau." },
      { q: "What is the difference between a hard and soft credit inquiry?", a: "A hard inquiry occurs when a lender checks your credit for a loan application — it temporarily reduces your score by 5–10 points. A soft inquiry (checking your own score, pre-approval checks) has zero impact on your score." },
      { q: "Does being a credit card holder with no dues improve my CIBIL score?", a: "Having a credit card and never using it has minimal benefit. Using it for 10–20% of your credit limit and paying the full bill on time each month optimally builds your credit score through consistent positive payment history and low utilisation." },
    ],
  },
];

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("cibil");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqs = faqCategories.flatMap((c) => c.faqs);
  const activeFaqs = faqCategories.find((c) => c.id === activeCategory)?.faqs ?? [];
  const filtered = searchQuery.trim()
    ? allFaqs.filter(
        (f) =>
          f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeFaqs;

  const allFaqsForSchema = allFaqs;

  return (
    <div className="w-full">
      <SEOHead
        title="FAQs — Credit Score, Home Loan, Business Loan & Debt Management | Credit Consultant"
        description="Answers to the most common questions about CIBIL scores, credit repair, home loans, personal loans, business loans and debt management in India. Expert-verified answers."
        keywords="CIBIL score FAQ, credit repair FAQ, home loan FAQ India, personal loan questions, business loan FAQ India"
        canonical={`${BASE_URL}/faq`}
        schema={[faqSchema(allFaqsForSchema), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faq" }]), ORG_SCHEMA]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Knowledge Base
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight">Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Questions</span></h1>
          <p className="text-base lg:text-lg text-teal-100/90 mb-8 max-w-xl mx-auto font-normal">
            Expert-verified answers to India's most common credit and loan questions
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search any question…"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-slate-900 text-sm font-medium bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/30 shadow-2xl border border-white/20"
            />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Category tabs */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2.5 mb-10 justify-center">
            {faqCategories.map((c) => (
              <button key={c.id} onClick={() => { setActiveCategory(c.id); setOpenIndex(null); }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCategory === c.id 
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 scale-105" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}>
                {c.label} <span className="opacity-70 text-[10px] ml-1">({faqCategories.find(x => x.id === c.id)?.faqs.length})</span>
              </button>
            ))}
          </div>
        )}

        {/* Search results header */}
        {searchQuery && (
          <p className="text-sm text-slate-500 mb-6 font-medium">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<strong>{searchQuery}</strong>"
            <button onClick={() => setSearchQuery("")} className="ml-2 text-teal-600 hover:underline font-bold">Clear</button>
          </p>
        )}

        {/* FAQ accordion */}
        <div className="space-y-3.5" itemScope itemType="https://schema.org/FAQPage">
          {filtered.length === 0 && (
            <p className="text-slate-400 text-center py-12 text-base font-medium">No questions found. Try a different search term.</p>
          )}
          {filtered.map((f, i) => (
            <div key={i} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i ? "border-teal-300 bg-teal-50/20 shadow-md" : "border-slate-200/80 bg-white hover:border-slate-300 shadow-sm"}`}
              itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <span className="font-bold text-slate-900 text-base pr-4" itemProp="name">{f.q}</span>
                {openIndex === i
                  ? <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-200/60 pt-3.5" itemProp="text">
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 rounded-3xl p-10 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 tracking-tight">Still have questions?</h3>
          <p className="text-teal-100/90 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Our credit advisors are available Mon–Fri 9 AM–6 PM and Saturday 9 AM–2 PM to answer any question personally.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact">
              <button className="bg-white hover:bg-teal-50 text-teal-900 text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-lg">
                Ask an Advisor
              </button>
            </Link>
            <CheckScoreButton variant="white" className="text-sm px-6 py-3 rounded-xl" />
          </div>
        </div>

        {/* Link to blogs */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Looking for in-depth guides?{" "}
            <Link to="/blogs" className="text-teal-600 hover:underline font-bold">
              Browse our Financial Blog →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
