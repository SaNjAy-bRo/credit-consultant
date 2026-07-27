import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner, Bengaluru",
    score: { before: 541, after: 762 },
    text: "Credit Consultant helped me remove a settled loan entry and two wrong missed-payment records. My score jumped from 541 to 762 in just 5 months. I got my business loan approved at 10.5%.",
    avatar: "RK",
    color: "bg-blue-600",
  },
  {
    name: "Priya Sharma",
    role: "IT Professional, Mumbai",
    score: { before: 488, after: 714 },
    text: "I had a write-off from 2019 that was blocking every loan application. The team filed disputes with CIBIL and directly with the lender. Seven months later my score is 714 and I finally got my home loan approved.",
    avatar: "PS",
    color: "bg-indigo-600",
  },
  {
    name: "Amit Patel",
    role: "Entrepreneur, Delhi NCR",
    score: { before: 623, after: 798 },
    text: "I had applied to 6 lenders in one go — destroying my score with hard enquiries. Credit Consultant cleaned up the enquiry damage and helped me build my score from 623 to 798 in 4 months. Outstanding service.",
    avatar: "AP",
    color: "bg-purple-600",
  },
  {
    name: "Sunita Reddy",
    role: "Government Employee, Hyderabad",
    score: { before: 560, after: 741 },
    text: "There were two loan accounts in my CIBIL report that I had never taken — someone else's accounts had mixed with mine. The team resolved the dispute in 45 days and my score shot up. Professional and prompt.",
    avatar: "SR",
    color: "bg-cyan-600",
  },
  {
    name: "Vikram Mehta",
    role: "CA, Pune",
    score: { before: 672, after: 801 },
    text: "As a CA, I knew what needed to be done but didn't have the time to chase the bureaus. Credit Consultant handled everything — dispute filing, lender follow-ups, score monitoring. Went from 672 to 801 in 6 months.",
    avatar: "VM",
    color: "bg-emerald-600",
  },
  {
    name: "Ananya Deshmukh",
    role: "Doctor, Ahmedabad",
    score: { before: 580, after: 775 },
    text: "My credit card bill payment was incorrectly reported as delayed by 60 days. Credit Consultant verified my bank records, sent formal legal notices and corrected my CIBIL score in less than 60 days!",
    avatar: "AD",
    color: "bg-rose-600",
  },
];

export function TestimonialsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  const start = () => {
    timerRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, 4500);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    start();
    return stop;
  }, []);

  const prev = () => {
    stop();
    setStartIndex((prev) => (prev - 1 + total) % total);
    start();
  };

  const next = () => {
    stop();
    setStartIndex((prev) => (prev + 1) % total);
    start();
  };

  // Get 3 visible items wrapped around
  const visibleTestimonials = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % total],
    testimonials[(startIndex + 2) % total],
  ];

  return (
    <section
      className="py-16 bg-slate-50 border-t border-slate-200/80"
      onMouseEnter={() => { stop(); setPaused(true); }}
      onMouseLeave={() => { start(); setPaused(false); }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3">
            VERIFIED CLIENT REVIEWS
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">What Our Clients Say</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto font-normal">
            Real stories and CIBIL score improvements from clients across India
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-sm font-bold text-slate-800 ml-1">4.9 / 5.0</span>
            <span className="text-xs text-slate-500">· 500+ Verified Reviews</span>
          </div>
        </div>

        {/* Cards Container — 1 card on Mobile, 3 cards on Desktop */}
        <div className="relative">
          {/* Mobile View — Single Card (< md) */}
          <div className="md:hidden">
            {(() => {
              const t = testimonials[startIndex];
              return (
                <div
                  key={t.name}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-blue-200 opacity-60" />
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Client
                      </span>
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium italic">"{t.text}"</p>
                  </div>

                  <div>
                    {/* Score badge */}
                    <div className="flex items-center justify-between bg-blue-50/70 border border-blue-100 rounded-xl px-3.5 py-2 mb-4">
                      <span className="text-xs font-semibold text-slate-600">CIBIL Score:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-500 line-through opacity-80">{t.score.before}</span>
                        <span className="text-xs text-slate-400">→</span>
                        <span className="text-sm font-black text-emerald-600">{t.score.after}</span>
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          +{t.score.after - t.score.before}
                        </span>
                      </div>
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0`}>
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm leading-snug">{t.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Desktop View — 3 Cards Side-by-Side (>= md) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-blue-200 opacity-60" />
                    <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Client
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium italic">"{t.text}"</p>
                </div>

                <div>
                  {/* Score badge */}
                  <div className="flex items-center justify-between bg-blue-50/70 border border-blue-100 rounded-xl px-3.5 py-2 mb-4">
                    <span className="text-xs font-semibold text-slate-600">CIBIL Score:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-500 line-through opacity-80">{t.score.before}</span>
                      <span className="text-xs text-slate-400">→</span>
                      <span className="text-sm font-black text-emerald-600">{t.score.after}</span>
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        +{t.score.after - t.score.before}
                      </span>
                    </div>
                  </div>

                  {/* Author info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm leading-snug">{t.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                stop();
                setStartIndex(i);
                start();
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === startIndex ? "w-7 h-2.5 bg-blue-600" : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
