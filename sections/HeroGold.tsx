"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Gem,
  Banknote,
  Droplets,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary:    "#005CB9",
  secondary:  "#2B7FE8",
  gold:       "#D4AF37",
  goldBright: "#F4C430",
  goldDeep:   "#B8860B",
  textDark:   "#0A1929",
  textMid:    "#334155",
  textFaint:  "#64748B",
};

// ─── Benefit cards ────────────────────────────────────────────────────────────
const BENEFITS: {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  iconColor: string;
}[] = [
  { id: "experiences", icon: Gem,        title: "Experiences", desc: "Luxury that\nyou deserve",      iconColor: C.primary },
  { id: "loans",       icon: Banknote,   title: "Loans",       desc: "Instant gold\nbacked loans",    iconColor: C.primary },
  { id: "wealth",      icon: TrendingUp, title: "Wealth",      desc: "Grow and protect\nyour wealth", iconColor: C.primary },
  { id: "liquidity",   icon: Droplets,   title: "Liquidity",   desc: "Instant access\nto your gold",  iconColor: C.primary },
];

// Card positions as % of right-column container — match image 1 layout
// [0]=top-left, [1]=top-right, [2]=bottom-left, [3]=bottom-right
const CARD_POS = [
  { top: "14%",    left:  "3%"  },
  { top: "14%",    right: "3%"  },
  { bottom: "22%", left:  "3%"  },
  { bottom: "22%", right: "3%"  },
];

// ─── Trust metrics ────────────────────────────────────────────────────────────
const METRICS = [
  { value: "₹500Cr+", label: "Gold Managed",    grad: `linear-gradient(135deg,${C.goldBright},${C.gold})` },
  { value: "50K+",    label: "Customers",        grad: `linear-gradient(135deg,${C.primary},${C.secondary})` },
  { value: "100%",    label: "Insured & Secure", grad: `linear-gradient(135deg,${C.primary},${C.secondary})` },
];

// ─── Floating particle (DOM) ──────────────────────────────────────────────────
function Particle({ x, y, size, delay, color }: { x: string; y: string; size: number; delay: number; color: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, opacity: 0.6 }}
    />
  );
}

// ─── Sphere SVG ───────────────────────────────────────────────────────────────
// CX/CY/SR are in viewBox units (0 0 600 500)
const VW = 600, VH = 500;
const CX = 300, CY = 240, SR = 100;

function SphereSvg({ parallaxX, parallaxY }: { parallaxX: MotionValue<number>; parallaxY: MotionValue<number> }) {
  const sX = useTransform(parallaxX, [-1, 1], [-10, 10]);
  const sY = useTransform(parallaxY, [-1, 1], [-10, 10]);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="absolute inset-0 w-full h-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* ── Sphere gradient — rich gold, image-1 style ── */}
        <radialGradient id="sg" cx="30%" cy="30%" r="70%" fx="25%" fy="25%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="20%"  stopColor="#FFF7C2" />
          <stop offset="45%"  stopColor="#FFE566" />
          <stop offset="70%"  stopColor="#F2C94C" />
          <stop offset="90%"  stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>

        {/* Specular #1 */}
        <radialGradient id="sp1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.6)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Wide gold ambient */}
        <radialGradient id="ga" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(212,175,55,0.22)" />
          <stop offset="55%" stopColor="rgba(212,175,55,0.07)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </radialGradient>

        {/* Equatorial ring gradient */}
        <linearGradient id="eqRing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(212,175,55,0)" />
          <stop offset="25%"  stopColor="rgba(244,196,48,0.7)" />
          <stop offset="50%"  stopColor="rgba(255,220,60,0.95)" />
          <stop offset="75%"  stopColor="rgba(212,175,55,0.7)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>

        {/* Podium gradients */}
        <radialGradient id="podShadow" cx="50%" cy="30%" r="50%">
          <stop offset="0%"  stopColor="rgba(180,140,30,0.25)" />
          <stop offset="100%" stopColor="rgba(180,140,30,0)" />
        </radialGradient>
        <linearGradient id="podBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#E5E5E0" />
          <stop offset="15%"  stopColor="#FFFFFF" />
          <stop offset="85%"  stopColor="#F0F0EA" />
          <stop offset="100%" stopColor="#C8C8C0" />
        </linearGradient>
        <linearGradient id="podTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F0" />
        </linearGradient>
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#D17B0F" />
          <stop offset="25%"  stopColor="#FFD700" />
          <stop offset="75%"  stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B27300" />
        </linearGradient>

        {/* Blue warp ring gradient */}
        <linearGradient id="blueRing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(43,127,232,0)" />
          <stop offset="40%"  stopColor="rgba(43,127,232,0.4)" />
          <stop offset="100%" stopColor="rgba(43,127,232,0)" />
        </linearGradient>

        {/* Blur filter for shadow */}
        <filter id="blurSm">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="blurMd">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* ── Background ambient glow ── */}
      <ellipse cx={CX} cy={CY} rx={VW * 0.42} ry={VH * 0.45}
        fill="rgba(235,244,255,0.7)" />
      <ellipse cx={CX} cy={CY} rx={210} ry={200}
        fill="rgba(220,235,255,0.5)" />

      {/* ── Warm golden halo behind sphere ── */}
      <ellipse
        cx={CX} cy={CY} rx={SR + 90} ry={SR + 75}
        fill="url(#ga)"
        opacity={0.8}
      />

      {/* ── Gold light wisps (curved paths) ── */}
      <path
        d={`M ${CX - 200} ${CY - 100} Q ${CX + 60} ${CY - 230} ${CX + 220} ${CY - 50}`}
        fill="none"
        stroke="rgba(212,175,55,0.25)"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d={`M ${CX - 180} ${CY + 110} Q ${CX + 40} ${CY + 260} ${CX + 200} ${CY + 90}`}
        fill="none"
        stroke="rgba(212,175,55,0.2)"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.55}
      />
      <path
        d={`M ${CX + 160} ${CY - 120} Q ${CX + 240} ${CY + 20} ${CX + 140} ${CY + 140}`}
        fill="none"
        stroke="rgba(212,175,55,0.18)"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* ── Outer thin orbit ring (tilted perspective) ── */}
      <ellipse
        cx={CX} cy={CY}
        rx={SR + 50} ry={24}
        fill="none"
        stroke="url(#blueRing)"
        strokeWidth={1}
        opacity={0.55}
      />

      {/* ── Subtle grid lines (concentric) behind sphere ── */}
      {[SR + 30, SR + 55].map((r, i) => (
        <circle key={i} cx={CX} cy={CY} r={r}
          fill="none"
          stroke="rgba(43,127,232,0.06)"
          strokeWidth={0.8}
          strokeDasharray="3 8"
        />
      ))}

      {/* ── Sphere floating group ── */}
      <g>
        {/* Podium drop shadow */}
        <ellipse
          cx={CX} cy={CY + SR + 48}
          rx={125} ry={18}
          fill="url(#podShadow)"
          filter="url(#blurMd)"
          opacity={0.8}
        />

        {/* ── Podium — Two layered luxury cylinders ── */}
        
        {/* 1. Bottom cylinder bottom gold rim */}
        <ellipse cx={CX} cy={CY + SR + 44} rx={117} ry={16.5} fill="url(#goldRim)" />
        <rect x={CX - 117} y={CY + SR + 41} width={234} height={3} fill="url(#goldRim)" />
        <ellipse cx={CX} cy={CY + SR + 41} rx={117} ry={16.5} fill="url(#goldRim)" />

        {/* 2. Bottom cylinder body */}
        <rect x={CX - 115} y={CY + SR + 20} width={230} height={22} fill="url(#podBody)" />
        <ellipse cx={CX} cy={CY + SR + 20} rx={115} ry={16} fill="url(#podTop)" />

        {/* 3. Top cylinder bottom gold rim */}
        <ellipse cx={CX} cy={CY + SR + 20} rx={87} ry={12.5} fill="url(#goldRim)" />
        <rect x={CX - 87} y={CY + SR + 17} width={174} height={3} fill="url(#goldRim)" />
        <ellipse cx={CX} cy={CY + SR + 17} rx={87} ry={12.5} fill="url(#goldRim)" />

        {/* 4. Top cylinder body */}
        <rect x={CX - 85} y={CY + SR} width={170} height={18} fill="url(#podBody)" />
        <ellipse cx={CX} cy={CY + SR} rx={85} ry={12} fill="url(#podTop)" />

        {/* 5. Top gold rim (where sphere sits) */}
        <ellipse cx={CX} cy={CY + SR} rx={85} ry={12} fill="none" stroke="url(#goldRim)" strokeWidth={2.5} />
        <ellipse cx={CX} cy={CY + SR} rx={75} ry={10} fill="url(#goldRim)" opacity={0.6} /> {/* shadow under sphere */}

        {/* ── Sphere main body ── */}
        <circle
          cx={CX} cy={CY} r={SR}
          fill="url(#sg)"
          opacity={0.92}
          filter="drop-shadow(0 8px 40px rgba(212,175,55,0.45)) drop-shadow(0 20px 80px rgba(212,175,55,0.2))"
        />

        {/* Primary large specular */}
        <ellipse
          cx={CX - SR * 0.25} cy={CY - SR * 0.32}
          rx={SR * 0.35} ry={SR * 0.2}
          fill="url(#sp1)" opacity={0.65}
        />
        {/* Bottom warm reflection */}
        <ellipse
          cx={CX + SR * 0.28} cy={CY + SR * 0.42}
          rx={SR * 0.2} ry={SR * 0.1}
          fill="rgba(255,220,100,0.25)"
        />

        {/* ── Equatorial gold ring ── */}
        <ellipse
          cx={CX} cy={CY}
          rx={SR + 14} ry={22}
          fill="none"
          stroke="url(#eqRing)"
          strokeWidth={3}
          opacity={0.85}
        />
        {/* Inner equatorial line */}
        <ellipse
          cx={CX} cy={CY}
          rx={SR + 4} ry={14}
          fill="none"
          stroke="rgba(212,175,55,0.4)"
          strokeWidth={1}
        />

        {/* ── Gold light rays ── */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = ((deg - 90) * Math.PI) / 180;
          const cos = Math.cos(rad), sin = Math.sin(rad);
          return (
            <line key={deg}
              x1={CX + cos * SR}       y1={CY + sin * SR}
              x2={CX + cos * (SR + 55)} y2={CY + sin * (SR + 55)}
              stroke="rgba(212,175,55,0.5)"
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity={0.65}
            />
          );
        })}

        {/* ── GOLD BALANCE text ── */}
        <text x={CX} y={CY - 7}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={12} fontWeight={700} letterSpacing={4}
          fill="rgba(20,10,2,0.52)" fontFamily="Inter,system-ui,sans-serif">
          GOLD
        </text>
        <text x={CX} y={CY + 13}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={16} fontWeight={900} letterSpacing={3}
          fill="rgba(20,10,2,0.48)" fontFamily="Inter,system-ui,sans-serif">
          BALANCE
        </text>
      </g>

      {/* ── SVG particles ── */}
      {[
        { x: 48,  y: 48,  r: 2.8, c: "rgba(212,175,55,0.55)", d: 0 },
        { x: 548, y: 42,  r: 2.2, c: "rgba(43,127,232,0.4)",  d: 1.3 },
        { x: 30,  y: 450, r: 3,   c: "rgba(43,127,232,0.4)",  d: 0.7 },
        { x: 565, y: 455, r: 2.4, c: "rgba(212,175,55,0.5)",  d: 2 },
        { x: 295, y: 18,  r: 2,   c: "rgba(212,175,55,0.4)",  d: 1.6 },
        { x: 300, y: 478, r: 2,   c: "rgba(0,92,185,0.35)",   d: 0.4 },
      ].map((p, i) => (
        <circle key={i}
          cx={p.x} cy={p.y} r={p.r} fill={p.c}
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

// ─── Benefit Card (pure HTML — no SVG clipping issues) ────────────────────────
function BenefitCard({ benefit, pos, delay }: {
  benefit: typeof BENEFITS[0];
  pos: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "absolute", ...pos, zIndex: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: "default",
        }}
      >
        {/* Circular icon — transparent background card style */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderColor: hovered ? "rgba(212,175,55,0.8)" : "rgba(255,215,0,0.6)",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(212,175,55,0.08)",
            transition: "all 0.3s ease",
            ...(hovered ? { transform: "scale(1.08)", boxShadow: "0 8px 24px rgba(212,175,55,0.15)" } : {}),
          }}
        >
          <Icon size={24} color={C.textDark} strokeWidth={1.8} />
        </div>

        {/* Text */}
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.textDark,
              lineHeight: 1.25,
              letterSpacing: "0.01em",
              marginBottom: 4,
            }}
          >
            {benefit.title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: C.textMid,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              fontWeight: 500,
            }}
          >
            {benefit.desc}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export function HeroGold() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 28, stiffness: 55 };
  const parallaxX = useSpring(mouseX, springCfg);
  const parallaxY = useSpring(mouseY, springCfg);

  const panelX = useTransform(parallaxX, [-1, 1], [-8, 8]);
  const panelY = useTransform(parallaxY, [-1, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    mouseY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden flex flex-col pt-[60px]"
      style={{ background: "linear-gradient(145deg,#FFFFFF 0%,#F8FAFC 25%,#EEF4FF 60%,#DCEBFF 100%)" }}
    >
      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 55% at 70% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 40% 50% at 25% 50%, rgba(43,127,232,0.05) 0%, transparent 70%)",
      }} />

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,92,185,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* ── Left-side DOM particles ── */}
      {[
        { x: "5%",  y: "18%", size: 3,   delay: 0,   color: "rgba(212,175,55,0.5)"  },
        { x: "11%", y: "72%", size: 3.5, delay: 1.4, color: "rgba(43,127,232,0.4)"  },
        { x: "38%", y: "7%",  size: 2.5, delay: 1.7, color: "rgba(212,175,55,0.4)"  },
        { x: "32%", y: "91%", size: 2,   delay: 2.3, color: "rgba(0,92,185,0.3)"    },
      ].map((p, i) => <Particle key={i} {...p} />)}

      {/* ══════════════════════════════════════════
          HERO BODY
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center min-h-screen">

        {/* ══ LEFT COLUMN ══ */}
        <div className="w-full lg:w-[46%] flex flex-col justify-center
                        pt-36 pb-12 lg:pt-0 lg:pb-0
                        px-8 md:px-12 lg:pl-16 xl:pl-24 lg:pr-6
                        text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full mx-auto lg:mx-0"
              style={{ background: "rgba(0,92,185,0.06)", border: "1px solid rgba(0,92,185,0.18)" }}>
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: C.gold }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: C.primary }}>
                India&apos;s 1st Living Gold Ecosystem
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black tracking-tight leading-[1.06] mb-6"
              style={{ fontSize: "clamp(2.5rem, 4.2vw, 4rem)", color: C.textDark }}
            >
              Turn Gold Into
              <br />
              <motion.span
                style={{
                  background: `linear-gradient(135deg,${C.goldBright} 0%,${C.gold} 45%,${C.goldDeep} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
                animate={{
                  filter: [
                    "drop-shadow(0 2px 8px rgba(212,175,55,0.2))",
                    "drop-shadow(0 2px 22px rgba(212,175,55,0.55))",
                    "drop-shadow(0 2px 8px rgba(212,175,55,0.2))",
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Wealth,<br />Experiences
              </motion.span>
              <br />
              & Instant Liquidity
            </h1>

            {/* Description */}
            <p className="leading-relaxed mb-9 max-w-md mx-auto lg:mx-0"
              style={{ fontSize: "1.05rem", color: C.textMid }}>
              Convert cash, jewellery, coins or bars into a{" "}
              <span style={{ color: C.gold, fontWeight: 700 }}>Gold Balance</span>{" "}
              and unlock premium financial benefits.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start mb-10">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide text-white"
                style={{
                  background: `linear-gradient(135deg,${C.primary},${C.secondary})`,
                  boxShadow: "0 8px 28px rgba(0,92,185,0.42)",
                }}>
                Explore Strategies
                <ArrowRight size={15} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm tracking-wide"
                style={{
                  background: "rgba(0,92,185,0.05)",
                  border: "1.5px solid rgba(0,92,185,0.22)",
                  color: C.primary,
                }}>
                <div className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 22, height: 22, background: `linear-gradient(135deg,${C.primary},${C.secondary})` }}>
                  <Play size={9} className="fill-white text-white" style={{ marginLeft: 1 }} />
                </div>
                How It Works
              </motion.button>
            </div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-stretch gap-3 flex-wrap justify-center lg:justify-start mb-5"
            >
              {METRICS.map((m) => (
                <motion.div
                  key={m.value}
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center lg:items-start px-5 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.82)",
                    border: "1px solid rgba(0,92,185,0.1)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 3px 14px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                    minWidth: 100,
                    transition: "transform 0.2s ease",
                  }}>
                  <div className="font-black mb-0.5"
                    style={{
                      fontSize: "1.25rem",
                      background: m.grad,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                    {m.value}
                  </div>
                  <div className="text-[10px] font-semibold tracking-wide" style={{ color: C.textFaint }}>
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Compliance */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="flex items-center gap-1.5 justify-center lg:justify-start"
            >
              <ShieldCheck size={13} style={{ color: "#16A34A" }} />
              <span className="text-[11px] font-semibold" style={{ color: C.textFaint }}>
                RBI Compliant · SEBI Registered · 100% Insured Gold Vault
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <motion.div
          className="w-full lg:w-[54%] relative"
          style={{ minHeight: "100vh", x: panelX, y: panelY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* SVG sphere + background (fills entire right column) */}
          <SphereSvg parallaxX={parallaxX} parallaxY={parallaxY} />

          {/* ── Benefit cards — pure HTML, % positioned ── */}
          {BENEFITS.map((b, i) => (
            <BenefitCard
              key={b.id}
              benefit={b}
              pos={CARD_POS[i]}
              delay={0.75 + i * 0.14}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Bottom gradient ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(transparent,rgba(238,244,255,0.5))", zIndex: 8 }} />
    </section>
  );
}
