"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { AdvancedHeroBackground } from "@/components/3d/AdvancedHeroBackground";

// ─── LIMOVI Design System — Dark Charcoal + Deep Navy ─────────────────────────
const C = {
  // Backgrounds
  bg:           "#050505",              // deep charcoal black
  bgNav:        "#06101F",              // rich navy
  bgCard:       "rgba(8,18,36,0.82)",   // midnight navy card
  bgCardHov:    "rgba(11,35,74,0.96)",  // hover card
  // Blues — LIMOVI brand
  primary:      "#005CB9",
  secondary:    "#2B7FE8",
  electric:     "#5BABFF",              // electric blue for connection lines & dots
  blueBorder:   "rgba(43,127,232,0.28)",
  blueBorderHov:"rgba(91,171,255,0.75)",
  // Gold — sphere, wealth highlights, CTA accent only
  gold:         "#D4AF37",
  goldBright:   "#FFD54F",
  goldDark:     "#B8860B",
  goldGlow:     "rgba(212,175,55,0.7)",
  // Typography
  textWhite:    "#FFFFFF",              // pure white headings
  textMid:      "rgba(255,255,255,0.62)",
  textFaint:    "rgba(200,215,240,0.42)",
};

// ─── Layout Constants ──────────────────────────────────────────────────────────
const CW = 600;
const CH = 620;
const CX = CW / 2;       // 300
const CY = CH / 2 + 10;  // 320

const R_ASSET   = 118;
const R_STRAT   = 182;
const R_BENEFIT = 292;
const SPHERE_R  = 68;
const STRAT_W   = 118;  const STRAT_H = 90;
const BEN_W     = 82;   const BEN_H   = 82;

// ─── Data ──────────────────────────────────────────────────────────────────────
const GOLD_ASSETS = [
  { id: "coin",     emoji: "🪙", label: "Gold Coin",       from: { x: -230, y: -130 }, orbit: 0   },
  { id: "bar",      emoji: "🏅", label: "Gold Bar",        from: { x:  230, y: -130 }, orbit: 90  },
  { id: "necklace", emoji: "💍", label: "Gold Jewellery",  from: { x:  230, y:  130 }, orbit: 180 },
  { id: "cash",     emoji: "💵", label: "Cash Investment", from: { x: -230, y:  130 }, orbit: 270 },
];

const STRATEGIES = [
  { id: "invest",     label: "Investment Only",         angle: 315, benefits: ["jewellery", "loans", "liquidity", "gift"],       color: C.gold, icon: "📈", tag: "Returns",   desc: "Ideal for Gold Investors" },
  { id: "enroll",     label: "Enroll & Experience",     angle: 45,  benefits: ["jewellery", "loans", "liquidity", "gift", "wealth"], color: C.gold, icon: "✨", tag: "Lifestyle", desc: "Turn Existing Jewellery Into Income" },
  { id: "both",       label: "Investment & Experience", angle: 135, benefits: ["jewellery", "loans", "liquidity", "gift", "wealth"], color: C.gold, icon: "🏆", tag: "Premium",   desc: "Premium Lifetime Membership" },
  { id: "experience", label: "Experience Only",         angle: 225, benefits: ["jewellery", "loans", "liquidity"],               color: C.gold, icon: "💎", tag: "Access",    desc: "Perfect for weddings and events" },
];

// All benefit nodes — blue only, gold is sphere-only
const BENEFITS = [
  { id: "jewellery", label: "Jewellery\nExperience", icon: "💍", angle: 0   },
  { id: "loans",     label: "Gold\nLoans",           icon: "⚡", angle: 72  },
  { id: "liquidity", label: "Instant\nLiquidity",    icon: "💧", angle: 144 },
  { id: "gift",      label: "Gift Gold\nBalance",    icon: "🎁", angle: 216 },
  { id: "wealth",    label: "Wealth\nGeneration",    icon: "🌱", angle: 288 },
];

const TOOLTIP_BENEFIT_LABELS: Record<string, string> = {
  jewellery: "Jewellery Experience",
  loans:     "Instant Gold Loans",
  liquidity: "Instant Liquidity",
  gift:      "Gift Gold Balance",
  wealth:    "Wealth Generation",
};

const PHASE_TIMINGS = [0, 1600, 2900, 4200, 5800];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function polar(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

// ─── Light sweep across background ───────────────────────────────────────────
function LightSweep() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(105deg, transparent 30%, rgba(91,171,255,0.025) 48%, rgba(255,255,255,0.018) 50%, rgba(91,171,255,0.015) 52%, transparent 70%)",
        zIndex: 1,
      }}
      animate={{ x: ["-110%", "210%"] }}
      transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 7, ease: "easeInOut" }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroGold() {
  const [phase, setPhase]                     = useState(0);
  const [hoveredStrategy, setHoveredStrategy] = useState<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ─── Interactive Parallax Hooks ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 60 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const sphereX = useTransform(parallaxX, [-1, 1], [-12, 12]);
  const sphereY = useTransform(parallaxY, [-1, 1], [-12, 12]);
  
  const canvasX = useTransform(parallaxX, [-1, 1], [-6, 6]);
  const canvasY = useTransform(parallaxY, [-1, 1], [-6, 6]);

  const pX = useTransform(parallaxX, [-1, 1], [-25, 25]);
  const pY = useTransform(parallaxY, [-1, 1], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 2); // -1 to 1
    mouseY.set(y * 2);
  };

  const runSequence = useCallback(() => {
    setPhase(0);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    PHASE_TIMINGS.forEach((t, i) => {
      if (i === 0) return;
      timersRef.current.push(setTimeout(() => setPhase(i), t));
    });
  }, []);

  useEffect(() => {
    const init = setTimeout(runSequence, 300);
    return () => { clearTimeout(init); timersRef.current.forEach(clearTimeout); };
  }, [runSequence]);

  const activeBenefitIds = hoveredStrategy
    ? STRATEGIES.find((s) => s.id === hoveredStrategy)?.benefits ?? []
    : [];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden flex flex-col lg:flex-row"
      style={{ background: "transparent" }}
    >
      <AdvancedHeroBackground />
      {/* ── Layered background depth ── */}
      {/* Far back: very subtle warm-center spotlight so sphere pops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 45% 40% at 70% 55%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        zIndex: 0,
      }} />
      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2,2,2,0.65) 100%)",
        zIndex: 0,
      }} />

      {/* ── Animated grid (extremely low opacity) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(91,171,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(91,171,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
        zIndex: 1,
      }} />

      {/* ── Animated grid fade-in ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{
          width: "100%", height: "100%",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "240px 240px",
        }} />
      </motion.div>

      {/* ── Light sweep ── */}
      <LightSweep />

      {/* ════════════════════════════════════════════════════
          LEFT COLUMN — Hero Text & CTAs
      ════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center
                      w-full lg:w-[44%]
                      pt-32 pb-10 lg:pt-24 lg:pb-0
                      px-8 md:px-14 lg:pl-16 xl:pl-24 lg:pr-8
                      text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border mx-auto lg:mx-0"
            style={{
              background: "rgba(43,127,232,0.1)",
              borderColor: "rgba(91,171,255,0.35)",
            }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.electric }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: C.electric }}>
              India&apos;s 1st Living Gold Ecosystem
            </span>
          </div>

          {/* Headline — pure white */}
          <h1 className="font-black tracking-tighter leading-[1.06] mb-4
                         text-4xl sm:text-5xl lg:text-5xl xl:text-[3.6rem]"
            style={{ color: C.textWhite }}>
            Turn Gold Into{" "}
            <span style={{
              background: `linear-gradient(135deg, ${C.goldBright} 0%, ${C.gold} 45%, ${C.goldDark} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: `drop-shadow(0 0 18px rgba(212,175,55,0.45))`,
            }}>
              Wealth &amp;<br />Experiences
            </span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}><br />&amp; Instant Liquidity</span>
          </h1>

          {/* Sub */}
          <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
            style={{ color: C.textFaint }}>
            Convert cash, jewellery, coins or bars into a{" "}
            <span style={{ color: C.gold, fontWeight: 600 }}>Gold Balance</span> and unlock
            luxury experiences, instant loans, liquidity and passive income.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
            {/* Primary */}
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide text-white"
              style={{
                background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                boxShadow: `0 8px 28px rgba(0,92,185,0.5), 0 2px 8px rgba(43,127,232,0.35)`,
              }}>
              Explore Strategies <ArrowRight size={15} />
            </motion.button>

            {/* Secondary */}
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide"
              style={{
                background: "rgba(43,127,232,0.07)",
                border: "1px solid rgba(91,171,255,0.28)",
                color: "rgba(255,255,255,0.75)",
              }}>
              <Play size={13} className="fill-current" /> How It Works
            </motion.button>
          </div>

          {/* Flow strip */}
          <motion.div
            className="hidden lg:flex items-center gap-2 mt-10 flex-wrap"
            initial={{ opacity: 0 }} animate={{ opacity: phase >= 4 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {["Invest", "→", "Gold Balance", "→", "Choose Strategy", "→", "Benefits"].map((s, i) => (
              <span key={i} className="text-xs font-semibold tracking-wider"
                style={{
                  color: s === "Gold Balance" ? C.gold : s === "→" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.45)",
                }}>
                {s}
              </span>
            ))}
          </motion.div>

          {/* Trust stats — gold values on charcoal */}
          <div className="hidden lg:flex items-center gap-8 mt-8 flex-wrap">
            {[
              { val: "₹500Cr+", label: "Gold Managed" },
              { val: "50K+",    label: "Customers"    },
              { val: "100%",    label: "Insured"       },
            ].map((stat) => (
              <div key={stat.val} className="flex flex-col">
                <span className="font-black text-lg" style={{ color: C.gold, filter: "drop-shadow(0 0 8px rgba(212,175,55,0.5))" }}>
                  {stat.val}
                </span>
                <span className="text-xs font-medium" style={{ color: C.textFaint }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════
          RIGHT COLUMN — Ecosystem Diagram
      ════════════════════════════════════════════════════ */}
      <motion.div className="relative z-10 flex-1 flex items-center justify-center pb-12 lg:pb-0 min-h-[500px] lg:min-h-screen"
                  style={{ x: canvasX, y: canvasY }}>
        <div className="hero-canvas relative flex-shrink-0"
          style={{ width: CW, height: CH, transformOrigin: "center center" }}>

          <style>{`
            @media (max-width: 600px)                         { .hero-canvas { transform: scale(0.56); } }
            @media (min-width: 600px)  and (max-width: 768px) { .hero-canvas { transform: scale(0.70); } }
            @media (min-width: 768px)  and (max-width: 1024px){ .hero-canvas { transform: scale(0.80); } }
            @media (min-width: 1024px) and (max-width: 1200px){ .hero-canvas { transform: scale(0.86); } }
          `}</style>

          {/* ── SVG: rings + connection lines ── */}
          <svg className="absolute inset-0 pointer-events-none overflow-visible"
            width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`}>

            {/* Strategy ring */}
            {phase >= 3 && (
              <circle cx={CX} cy={CY} r={R_STRAT + 8}
                fill="none" stroke="rgba(91,171,255,0.1)" strokeWidth="1" strokeDasharray="5 8" />
            )}
            {/* Benefit ring */}
            {phase >= 4 && (
              <circle cx={CX} cy={CY} r={R_BENEFIT + 8}
                fill="none" stroke="rgba(91,171,255,0.06)" strokeWidth="1" strokeDasharray="4 10" />
            )}

            {/* Connection lines: center → benefit nodes — electric blue */}
            {phase >= 4 && BENEFITS.map((ben, idx) => {
              const pos      = polar(ben.angle, R_BENEFIT);
              const isActive = activeBenefitIds.includes(ben.id) || hoveredStrategy === null;
              return (
                <motion.line key={ben.id}
                  x1={CX} y1={CY} x2={CX + pos.x} y2={CY + pos.y}
                  stroke={isActive ? C.electric : "rgba(91,171,255,0.09)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isActive ? 0.8 : 0.15 }}
                  transition={{ duration: 0.9, delay: idx * 0.09, ease: "easeOut" }}
                  style={{ filter: isActive ? `drop-shadow(0 0 4px ${C.electric}90)` : "none" }}
                />
              );
            })}

            {/* Energy Pulses along connection lines */}
            {phase >= 4 && BENEFITS.map((ben, idx) => {
              const pos      = polar(ben.angle, R_BENEFIT);
              const isActive = activeBenefitIds.includes(ben.id) || hoveredStrategy === null;
              if (!isActive) return null;
              const lineLength = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
              return (
                <motion.line key={`pulse-${ben.id}`}
                  x1={CX} y1={CY} x2={CX + pos.x} y2={CY + pos.y}
                  stroke={C.electric}
                  strokeWidth="2.5"
                  strokeDasharray={`15 ${lineLength}`}
                  initial={{ strokeDashoffset: lineLength }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: idx * 0.2 }}
                  style={{ filter: `drop-shadow(0 0 6px ${C.electric})` }}
                />
              );
            })}

            {/* Soft lines center → strategy cards */}
            {phase >= 3 && STRATEGIES.map((strat, idx) => {
              const pos      = polar(strat.angle, R_STRAT - 12);
              const isHovered = hoveredStrategy === strat.id;
              return (
                <motion.line key={`sl-${strat.id}`}
                  x1={CX} y1={CY} x2={CX + pos.x} y2={CY + pos.y}
                  stroke={isHovered ? strat.color : "rgba(91,171,255,0.08)"}
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 0.7 : 0.22 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                />
              );
            })}
          </svg>

          {/* ── Scene 1 & 2: Gold Asset Cards ── */}
          {GOLD_ASSETS.map((asset, i) => {
            const orbitPos = polar(asset.orbit, R_ASSET);
            return (
              <motion.div key={asset.id} className="absolute"
                style={{ left: CX - 35, top: CY - 35 }}
                initial={{ x: asset.from.x, y: asset.from.y, opacity: 0, scale: 0.55 }}
                animate={
                  phase === 0 ? { x: asset.from.x, y: asset.from.y, opacity: 1, scale: 1 }
                  : phase === 1 ? { x: orbitPos.x - 35, y: orbitPos.y - 35, opacity: 1, scale: 0.88 }
                  : { x: 0, y: 0, opacity: 0, scale: 0.1 }
                }
                transition={
                  phase === 0 ? { duration: 1.3, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }
                  : phase === 1 ? { duration: 1.1, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }
                  : { duration: 0.45, delay: i * 0.06, ease: "easeIn" }
                }>
                <div className="relative flex flex-col items-center justify-center rounded-2xl"
                  style={{
                    width: 70, height: 70,
                    background: "rgba(6,16,31,0.85)",
                    border: `1px solid ${C.blueBorder}`,
                    backdropFilter: "blur(18px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(91,171,255,0.15)",
                  }}>
                  <div className="absolute inset-0 rounded-2xl" style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(91,171,255,0.08), transparent 70%)",
                  }} />
                  <span className="text-2xl relative z-10">{asset.emoji}</span>
                  {phase < 2 && (
                    <span className="relative z-10 font-semibold mt-0.5 whitespace-nowrap"
                      style={{ color: C.electric, fontSize: "8px", letterSpacing: "0.05em" }}>
                      {asset.label}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* ── Scene 3: The Gold Balance Sphere (Breathing + Parallax) ── */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div key="sphere" className="absolute"
                style={{ left: CX - SPHERE_R, top: CY - SPHERE_R, x: sphereX, y: sphereY }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}>

                {/* Wide gold halo — most visible on dark bg */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ inset: -55, background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.06) 45%, transparent 70%)" }}
                  animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0.2, 0.7] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Mid gold pulse */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ inset: -28, background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 65%)" }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.8, 0.25, 0.8] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Thin electric-blue orbit ring around sphere (tech-wealth fusion) */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ inset: -12, border: "1px solid rgba(91,171,255,0.35)" }}
                  animate={{ scale: [1, 1.14, 1], opacity: [0.8, 0.1, 0.8] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                {/* Sphere itself with breathing glow */}
                <motion.div className="relative rounded-full flex flex-col items-center justify-center"
                  style={{
                    width: SPHERE_R * 2, height: SPHERE_R * 2,
                    background: `radial-gradient(circle at 36% 30%, ${C.goldBright} 0%, ${C.gold} 35%, #9A7B1A 68%, #4A3A08 100%)`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 80px rgba(212,175,55,0.75), 0 0 160px rgba(212,175,55,0.28), 0 0 30px rgba(43,127,232,0.2), inset 0 -20px 40px rgba(0,0,0,0.42), inset 0 8px 22px rgba(255,228,120,0.38)`,
                      `0 0 110px rgba(212,175,55,0.95), 0 0 190px rgba(212,175,55,0.4), 0 0 45px rgba(43,127,232,0.3), inset 0 -20px 40px rgba(0,0,0,0.42), inset 0 8px 22px rgba(255,228,120,0.38)`,
                      `0 0 80px rgba(212,175,55,0.75), 0 0 160px rgba(212,175,55,0.28), 0 0 30px rgba(43,127,232,0.2), inset 0 -20px 40px rgba(0,0,0,0.42), inset 0 8px 22px rgba(255,228,120,0.38)`
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Specular highlight */}
                  <div className="absolute rounded-full" style={{
                    top: "9%", left: "15%", width: "38%", height: "28%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
                  }} />
                  <span className="font-black tracking-widest uppercase relative z-10"
                    style={{ color: "#1A0E00", fontSize: "8px", letterSpacing: "0.14em" }}>GOLD</span>
                  <span className="font-black tracking-widest uppercase relative z-10"
                    style={{ color: "#1A0E00", fontSize: "12px", letterSpacing: "0.09em" }}>BALANCE</span>

                  {/* Light rays — enhanced on dark bg */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <motion.div key={deg} className="absolute pointer-events-none"
                      style={{
                        width: 1.5, height: 65, bottom: "50%", left: "50%",
                        transformOrigin: "bottom center", rotate: deg,
                        background: `linear-gradient(transparent, rgba(212,175,55,0.55))`,
                        filter: "blur(1.5px)",
                      }}
                      animate={{ opacity: [0.25, 0.9, 0.25], scaleY: [0.55, 1.15, 0.55] }}
                      transition={{ duration: 2.2 + (deg / 360) * 2, repeat: Infinity, ease: "easeInOut", delay: (deg / 360) * 2.2 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Scene 3: Strategy Cards ── */}
          <AnimatePresence>
            {phase >= 3 && STRATEGIES.map((strat, i) => {
              const pos          = polar(strat.angle, R_STRAT);
              const isHovered    = hoveredStrategy === strat.id;
              const isOtherHov   = hoveredStrategy !== null && !isHovered;
              const left         = CX + pos.x - STRAT_W / 2;
              const top          = CY + pos.y - STRAT_H / 2;
              const cardColor    = strat.color;
              const cardBorder   = isHovered ? "rgba(212,175,55,0.7)" : C.blueBorder;

              return (
                <motion.div key={strat.id} className="absolute cursor-pointer"
                  style={{ left, top, width: STRAT_W, height: STRAT_H, zIndex: isHovered ? 20 : 10 }}
                  initial={{ opacity: 0, scale: 0.25 }}
                  animate={{ opacity: isOtherHov ? 0.38 : 1, scale: isHovered ? 1.07 : 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.11, ease: [0.25, 0.46, 0.45, 0.94], opacity: { duration: 0.22 } }}
                  onMouseEnter={() => setHoveredStrategy(strat.id)}
                  onMouseLeave={() => setHoveredStrategy(null)}>

                  <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center text-center relative"
                    style={{
                      padding: "10px 8px",
                      background: isHovered ? C.bgCardHov : C.bgCard,
                      backdropFilter: "blur(24px)",
                      border: `1px solid ${cardBorder}`,
                      boxShadow: isHovered
                        ? `0 20px 55px rgba(0,0,0,0.75), 0 0 30px ${cardColor}38, inset 0 1px 0 ${cardColor}22`
                        : "0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(91,171,255,0.07)",
                      transition: "all 0.28s ease",
                    }}>
                    {/* Shimmer line */}
                    <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                      style={{ background: isHovered ? `linear-gradient(90deg, transparent, ${cardColor}65, transparent)` : "transparent" }} />
                    {/* Tag */}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full"
                      style={{ background: `${cardColor}18`, border: `1px solid ${cardColor}30`,
                               fontSize: "7px", fontWeight: 700, color: cardColor, letterSpacing: "0.06em" }}>
                      {strat.tag}
                    </div>
                    <span className="text-xl mb-1 leading-none">{strat.icon}</span>
                    <span className="font-bold leading-snug"
                      style={{ color: isHovered ? cardColor : "rgba(255,255,255,0.6)", fontSize: "10px", letterSpacing: "0.03em", maxWidth: STRAT_W - 16, transition: "color 0.25s" }}>
                      {strat.label}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: strat.angle < 90 || strat.angle > 270 ? -8 : 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.16 }}
                        className="absolute pointer-events-none rounded-xl p-4"
                        style={{
                          ...(strat.angle < 90 || strat.angle > 270 
                              ? { top: "calc(100% + 12px)" } 
                              : { bottom: "calc(100% + 12px)" }),
                          left: "50%", transform: "translateX(-50%)",
                          width: 220, zIndex: 50,
                          background: "rgba(3,8,18,0.97)",
                          border: `1px solid ${cardColor}30`,
                          backdropFilter: "blur(24px)",
                          boxShadow: `0 24px 64px rgba(0,0,0,0.85), 0 0 20px ${cardColor}15`,
                        }}>
                        <p className="font-bold mb-1" style={{ color: cardColor, fontSize: "13px" }}>
                          {strat.label}
                        </p>
                        <p className="mb-3" style={{ color: "rgba(255,255,255,0.7)", fontSize: "10.5px", lineHeight: 1.3 }}>
                          {strat.desc}
                        </p>

                        <div className="flex flex-col gap-1.5">
                          {strat.id === "both" && (
                            <div className="flex items-center gap-2 mb-1">
                              <span style={{ fontSize: "12px" }}>⭐</span>
                              <span style={{ color: C.gold, fontSize: "11px", fontWeight: 700 }}>Zero Experience Charges</span>
                            </div>
                          )}

                          {Object.entries(TOOLTIP_BENEFIT_LABELS).map(([id, label]) => {
                            const isIncluded = strat.benefits.includes(id);
                            if (!isIncluded) return null;
                            return (
                              <div key={id} className="flex items-center gap-2">
                                <span style={{ color: "#10B981", fontSize: "12px", fontWeight: "bold", width: 12 }}>
                                  ✓
                                </span>
                                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "11px" }}>
                                  {label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* ── Scene 4: Benefit Nodes ── */}
          <AnimatePresence>
            {phase >= 4 && BENEFITS.map((ben, i) => {
              const pos      = polar(ben.angle, R_BENEFIT);
              const isActive = activeBenefitIds.includes(ben.id) || hoveredStrategy === null;
              const left     = CX + pos.x - BEN_W / 2;
              const top      = CY + pos.y - BEN_H / 2;
              const border   = isActive ? "rgba(91,171,255,0.5)" : "rgba(91,171,255,0.1)";

              return (
                <motion.div key={ben.id} className="absolute"
                  style={{ left, top, width: BEN_W, height: BEN_H }}
                  initial={{ opacity: 0, scale: 0.18 }}
                  animate={{ opacity: isActive ? 1 : 0.18, scale: isActive ? 1 : 0.84 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.72, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94], opacity: { duration: 0.28 } }}>

                  <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center relative"
                    style={{
                      background: isActive ? C.bgCard : "rgba(4,10,22,0.55)",
                      border: `1px solid ${border}`,
                      backdropFilter: "blur(18px)",
                      boxShadow: isActive
                        ? `0 10px 40px rgba(0,0,0,0.65), 0 0 22px rgba(91,171,255,0.18)`
                        : "0 4px 14px rgba(0,0,0,0.45)",
                      transition: "all 0.32s ease",
                    }}>
                    {/* Top glow line */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                        style={{ background: `linear-gradient(90deg, transparent, ${C.electric}55, transparent)` }} />
                    )}
                    {/* Pulse */}
                    {isActive && (
                      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{ opacity: [0, 0.45, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.28 }}
                        style={{ background: "radial-gradient(circle, rgba(91,171,255,0.1) 0%, transparent 70%)" }}
                      />
                    )}
                    <span className="text-xl relative z-10 leading-none mb-1">{ben.icon}</span>
                    <span className="relative z-10 font-semibold text-center leading-tight whitespace-pre-line"
                      style={{
                        color: isActive ? C.electric : "rgba(91,171,255,0.25)",
                        fontSize: "8.5px", letterSpacing: "0.04em",
                        transition: "color 0.3s", maxWidth: BEN_W - 8,
                      }}>
                      {ben.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>{/* /canvas */}
      </motion.div>{/* /right col */}

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(transparent, ${C.bg})` }} />
    </section>
  );
}
