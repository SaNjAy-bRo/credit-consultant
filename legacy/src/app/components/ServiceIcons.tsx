import { useState, useEffect } from "react";

/* ── shared wrapper ─────────────────────────────────────────── */
function IconWrap({
  children,
  bg = "#eff6ff",
  hoverBg = "#dbeafe",
  size = 72,
}: {
  children: React.ReactNode;
  bg?: string;
  hoverBg?: string;
  size?: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size,
        height: size,
        borderRadius: 20,
        background: hover ? hoverBg : bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: hover ? "scale(1.08) translateY(-2px)" : "scale(1)",
        boxShadow: hover ? "0 8px 24px rgba(37,99,235,0.18)" : "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}

/* ── 1. Credit Repair — cracked card being fixed ─────────────── */
export function CreditRepairIcon({ size = 72 }: { size?: number }) {
  const [hover, setHover] = useState(false);
  const s = size;
  return (
    <IconWrap size={s}>
      <svg
        width={s * 0.62}
        height={s * 0.62}
        viewBox="0 0 44 44"
        fill="none"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ overflow: "visible" }}
      >
        {/* Card body */}
        <rect x="2" y="8" width="36" height="24" rx="4" fill="#2563eb" />
        <rect x="2" y="14" width="36" height="5" fill="#1d4ed8" />
        {/* Chip */}
        <rect x="7" y="19" width="7" height="5" rx="1" fill="#fbbf24" />
        {/* Crack lines — fade out on hover */}
        <path
          d="M22 10 L19 20 L23 20 L20 30"
          stroke="#93c5fd"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ opacity: hover ? 0 : 1, transition: "opacity 0.4s" }}
        />
        {/* Check mark — appears on hover */}
        <circle
          cx="32"
          cy="30"
          r="7"
          fill="#22c55e"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "scale(1)" : "scale(0.4)",
            transformOrigin: "32px 30px",
            transition: "opacity 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
        <path
          d="M29 30 L31.5 32.5 L35.5 27.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: hover ? 1 : 0,
            transition: "opacity 0.3s 0.1s",
          }}
        />
      </svg>
    </IconWrap>
  );
}

/* ── 2. Credit Analysis — bar chart rising ───────────────────── */
export function CreditAnalysisIcon({ size = 72 }: { size?: number }) {
  const [hover, setHover] = useState(false);
  const bars = [
    { x: 4, h: 14, color: "#60a5fa" },
    { x: 14, h: 20, color: "#3b82f6" },
    { x: 24, h: 16, color: "#2563eb" },
    { x: 34, h: 26, color: "#1d4ed8" },
  ];
  return (
    <IconWrap size={size}>
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 44 44"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Axes */}
        <line x1="2" y1="36" x2="42" y2="36" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="4" x2="2" y2="36" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bars */}
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={36 - (hover ? b.h + 6 : b.h)}
            width="8"
            height={hover ? b.h + 6 : b.h}
            rx="2"
            fill={b.color}
            style={{ transition: `y 0.35s ${i * 0.07}s ease, height 0.35s ${i * 0.07}s ease` }}
          />
        ))}
        {/* Trend line on hover */}
        <polyline
          points="8,28 18,20 28,23 38,10"
          stroke="#fbbf24"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: hover ? 1 : 0, transition: "opacity 0.3s 0.25s" }}
        />
      </svg>
    </IconWrap>
  );
}

/* ── 3. Debt Management — balance scale tipping to balance ───── */
export function DebtManagementIcon({ size = 72 }: { size?: number }) {
  const [hover, setHover] = useState(false);
  return (
    <IconWrap size={size} bg="#f0fdf4" hoverBg="#dcfce7">
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 44 44"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ overflow: "visible" }}
      >
        {/* Pole */}
        <line x1="22" y1="6" x2="22" y2="36" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        {/* Base */}
        <rect x="14" y="36" width="16" height="3" rx="1.5" fill="#16a34a" />
        {/* Beam — rotates on hover */}
        <g
          style={{
            transformOrigin: "22px 12px",
            transform: hover ? "rotate(0deg)" : "rotate(-12deg)",
            transition: "transform 0.5s cubic-bezier(0.34,1.3,0.64,1)",
          }}
        >
          <line x1="4" y1="12" x2="40" y2="12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
          {/* Left pan */}
          <ellipse cx="8" cy="22" rx="6" ry="3" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
          <line x1="4" y1="12" x2="8" y2="22" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Right pan */}
          <ellipse cx="36" cy="22" rx="6" ry="3" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
          <line x1="40" y1="12" x2="36" y2="22" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Coins */}
          <circle cx="8" cy="20" r="2" fill="#fbbf24" style={{ opacity: hover ? 1 : 0.3, transition: "opacity 0.3s" }} />
          <circle cx="36" cy="20" r="2" fill="#fbbf24" style={{ opacity: hover ? 1 : 0.3, transition: "opacity 0.3s" }} />
        </g>
      </svg>
    </IconWrap>
  );
}

/* ── 4. Identity Protection — shield with lock ───────────────── */
export function IdentityProtectionIcon({ size = 72 }: { size?: number }) {
  const [hover, setHover] = useState(false);
  return (
    <IconWrap size={size} bg="#fef3c7" hoverBg="#fde68a">
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 44 44"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Shield */}
        <path
          d="M22 3 L38 9 L38 22 C38 31 22 41 22 41 C22 41 6 31 6 22 L6 9 Z"
          fill={hover ? "#f59e0b" : "#fbbf24"}
          style={{ transition: "fill 0.3s" }}
        />
        <path
          d="M22 7 L34 12 L34 22 C34 29 22 37 22 37 C22 37 10 29 10 22 L10 12 Z"
          fill={hover ? "#fde68a" : "#fef3c7"}
          style={{ transition: "fill 0.3s" }}
        />
        {/* Lock body */}
        <rect
          x="16" y="22" width="12" height="9" rx="2"
          fill={hover ? "#f59e0b" : "#fbbf24"}
          style={{ transition: "fill 0.3s" }}
        />
        {/* Lock shackle */}
        <path
          d="M18 22 L18 18 C18 15.2 26 15.2 26 18 L26 22"
          stroke={hover ? "#92400e" : "#b45309"}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{ transition: "stroke 0.3s" }}
        />
        {/* Keyhole */}
        <circle cx="22" cy="26" r="1.5" fill="white" />
        <rect x="21.2" y="26" width="1.6" height="2.5" rx="0.5" fill="white" />
        {/* Pulse ring on hover */}
        <circle
          cx="22"
          cy="22"
          r={hover ? "20" : "0"}
          stroke="#f59e0b"
          strokeWidth="1"
          fill="none"
          style={{ opacity: hover ? 0 : 0, transition: "r 0.6s, opacity 0.6s" }}
        />
      </svg>
    </IconWrap>
  );
}

/* ── 5. Credit Education — open book with rising graph ───────── */
export function CreditEducationIcon({ size = 72 }: { size?: number }) {
  const [hover, setHover] = useState(false);
  return (
    <IconWrap size={size} bg="#f5f3ff" hoverBg="#ede9fe">
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 44 44"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Left page */}
        <path d="M4 8 C4 8 14 6 22 10 L22 38 C14 34 4 36 4 36 Z" fill="#7c3aed" />
        {/* Right page */}
        <path d="M40 8 C40 8 30 6 22 10 L22 38 C30 34 40 36 40 36 Z" fill="#8b5cf6" />
        {/* Spine */}
        <rect x="21" y="10" width="2" height="28" rx="1" fill="#4c1d95" />
        {/* Lines on left page */}
        {[14, 18, 22, 26].map((y, i) => (
          <line key={i} x1="8" y1={y} x2="19" y2={y - 1} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
        ))}
        {/* Mini chart on right page — animates on hover */}
        <polyline
          points="25,30 28,24 31,26 34,18"
          stroke="#fbbf24"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: hover ? 1 : 0.4, transition: "opacity 0.3s" }}
        />
        {/* Graduation cap on hover */}
        <g style={{ opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(-4px)", transition: "opacity 0.35s, transform 0.35s" }}>
          <ellipse cx="22" cy="6" rx="9" ry="2.5" fill="#fbbf24" />
          <rect x="19" y="4.5" width="6" height="2" rx="1" fill="#f59e0b" />
        </g>
      </svg>
    </IconWrap>
  );
}

/* ── 6. Financial Planning — pie chart + arrow ───────────────── */
export function FinancialPlanningIcon({ size = 72 }: { size?: number }) {
  const [hover, setHover] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!hover) return;
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, [hover]);

  // Rotating highlight slice
  const slices = [
    { d: "M22 22 L22 4 A18 18 0 0 1 38 30 Z", fill: "#2563eb" },
    { d: "M22 22 L38 30 A18 18 0 0 1 10 36 Z", fill: "#3b82f6" },
    { d: "M22 22 L10 36 A18 18 0 0 1 6 16 Z", fill: "#60a5fa" },
    { d: "M22 22 L6 16 A18 18 0 0 1 22 4 Z",  fill: "#93c5fd" },
  ];

  return (
    <IconWrap size={size} bg="#eff6ff" hoverBg="#dbeafe">
      <svg
        width={size * 0.64}
        height={size * 0.64}
        viewBox="0 0 44 44"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ overflow: "visible" }}
      >
        {/* Pie slices */}
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill={s.fill}
            style={{
              transform: hover && tick % 4 === i ? "scale(1.07)" : "scale(1)",
              transformOrigin: "22px 22px",
              transition: "transform 0.3s, filter 0.3s",
              filter: hover && tick % 4 === i ? "drop-shadow(0 2px 6px rgba(37,99,235,0.4))" : "none",
            }}
          />
        ))}
        {/* Centre hole */}
        <circle cx="22" cy="22" r="7" fill="white" />
        {/* Up arrow inside */}
        <path
          d="M22 19 L22 25 M19.5 21.5 L22 19 L24.5 21.5"
          stroke={hover ? "#2563eb" : "#93c5fd"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 0.3s" }}
        />
      </svg>
    </IconWrap>
  );
}
