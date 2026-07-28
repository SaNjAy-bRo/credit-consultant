import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner, Bengaluru",
    score: { before: 541, after: 762 },
    text: "Credit Consultant helped me remove a settled loan entry and two wrong missed-payment records. My score jumped from 541 to 762 in just 5 months. I got my business loan approved at 10.5% — the best rate I could have hoped for.",
    avatar: "RK",
    color: "bg-teal-600",
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
    text: "I had applied to 6 lenders in one go — completely destroying my score with hard enquiries. Credit Consultant cleaned up the enquiry damage and helped me build my score from 623 to 798 in 4 months. Outstanding service.",
    avatar: "AP",
    color: "bg-purple-600",
  },
  {
    name: "Sunita Reddy",
    role: "Government Employee, Hyderabad",
    score: { before: 560, after: 741 },
    text: "There were two loan accounts in my CIBIL report that I had never taken — someone else's accounts had mixed with mine. The team resolved the dispute in 45 days and my score shot up. Professional and prompt throughout.",
    avatar: "SR",
    color: "bg-cyan-600",
  },
  {
    name: "Vikram Mehta",
    role: "CA, Pune",
    score: { before: 672, after: 801 },
    text: "As a CA, I knew what needed to be done but didn't have the time to chase the bureaus. Credit Consultant handled everything — dispute filing, lender follow-ups, score monitoring. Went from 672 to 801 in 6 months.",
    avatar: "VM",
    color: "bg-green-600",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
  };
  const stop = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => { start(); return stop; }, []);

  const prev = () => { stop(); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); start(); };
  const next = () => { stop(); setCurrent((c) => (c + 1) % testimonials.length); start(); };

  const t = testimonials[current];

  return (
    <section
      className="py-16 bg-gray-50"
      onMouseEnter={() => { stop(); setPaused(true); }}
      onMouseLeave={() => { start(); setPaused(false); }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">What Our Clients Say</h2>
          <div className="flex justify-center gap-0.5 mt-3">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            <span className="text-sm text-gray-500 ml-2">4.9 · 500+ Reviews</span>
          </div>
        </div>

        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10">
          <Quote className="w-10 h-10 text-teal-100 mb-4" />

          <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                {t.avatar}
              </div>
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </div>

            {/* Score badge */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-3">
              <div className="text-center">
                <p className="text-xl font-black text-red-500">{t.score.before}</p>
                <p className="text-[10px] text-gray-400">Before</p>
              </div>
              <div className="text-green-500 font-bold text-xl">→</div>
              <div className="text-center">
                <p className="text-xl font-black text-green-600">{t.score.after}</p>
                <p className="text-[10px] text-gray-400">After</p>
              </div>
              <div className="ml-1">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  +{t.score.after - t.score.before}
                </span>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <button onClick={prev} aria-label="Previous testimonial"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full flex items-center justify-center transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} aria-label="Next testimonial"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-100 hover:bg-teal-600 hover:text-white rounded-full flex items-center justify-center transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => { stop(); setCurrent(i); start(); }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-teal-600" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {!paused && (
          <div className="mt-3 h-0.5 bg-gray-100 rounded-full max-w-xs mx-auto overflow-hidden">
            <div key={current} className="h-full bg-blue-400 rounded-full" style={{ animation: "progress 5s linear forwards" }} />
          </div>
        )}
      </div>
    </section>
  );
}
