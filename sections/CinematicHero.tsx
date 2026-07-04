"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate, useSpring } from "framer-motion";
import { Play, Sparkles, ArrowRight, Zap, TrendingUp, Gift, Infinity as InfinityIcon, Gem, Landmark } from "lucide-react";
import { useLenis } from "lenis/react";

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

// ─── CUSTOM COLORFUL SVGS (Mimicking references) ──────────────────────────────

const CashSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    <g transform="translate(6, 16) rotate(-15)">
      {/* Bottom bills */}
      <rect x="0" y="10" width="48" height="20" rx="2" fill="#1b5e20" />
      <rect x="0" y="5" width="48" height="20" rx="2" fill="#2e7d32" />
      {/* Top bill */}
      <rect x="0" y="0" width="48" height="20" rx="2" fill="#4caf50" />
      <rect x="4" y="4" width="40" height="12" rx="1" fill="#81c784" />
      {/* Band */}
      <rect x="20" y="-2" width="12" height="26" rx="1" fill="#fbc02d" />
      <rect x="20" y="-2" width="12" height="4" fill="#f57f17" />
    </g>
  </svg>
);

const CoinsSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    {/* Bottom coin */}
    <ellipse cx="32" cy="44" rx="22" ry="10" fill="#fbc02d" />
    <path d="M10 44 v6 c0 5.5 9.8 10 22 10 s22 -4.5 22 -10 v-6" fill="#f57f17" />
    <ellipse cx="32" cy="44" rx="22" ry="10" fill="#fbc02d" />
    <ellipse cx="32" cy="44" rx="17" ry="7" fill="#fff59d" />
    
    {/* Top coin */}
    <ellipse cx="28" cy="26" rx="22" ry="10" fill="#fbc02d" />
    <path d="M6 26 v6 c0 5.5 9.8 10 22 10 s22 -4.5 22 -10 v-6" fill="#f57f17" />
    <ellipse cx="28" cy="26" rx="22" ry="10" fill="#fbc02d" />
    <ellipse cx="28" cy="26" rx="17" ry="7" fill="#fff59d" />
    <text x="28" y="32" fontSize="18" fontWeight="900" fill="#f57f17" textAnchor="middle" fontFamily="sans-serif">$</text>
  </svg>
);

const GoldBarsSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    {/* Bottom bar */}
    <g transform="translate(18, 30) rotate(20)">
      <path d="M0 12 L32 12 L40 0 L8 0 Z" fill="#fbc02d" />
      <path d="M0 12 L0 20 L32 20 L32 12 Z" fill="#f57f17" />
      <path d="M32 20 L40 8 L40 0 L32 12 Z" fill="#f9a825" />
      <circle cx="20" cy="6" r="3" fill="#fff59d" />
    </g>
    {/* Top bar */}
    <g transform="translate(8, 16) rotate(-10)">
      <path d="M0 12 L32 12 L40 0 L8 0 Z" fill="#fbc02d" />
      <path d="M0 12 L0 20 L32 20 L32 12 Z" fill="#f57f17" />
      <path d="M32 20 L40 8 L40 0 L32 12 Z" fill="#f9a825" />
      <circle cx="20" cy="6" r="3" fill="#fff59d" />
    </g>
    {/* Sparkles */}
    <path d="M46 8 L50 2 M52 10 L58 6 M44 16 L52 16" stroke="#ef5350" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const NecklaceBustSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    {/* Bust Base */}
    <path d="M32 14 L20 28 C12 38 10 48 16 58 L48 58 C54 48 52 38 44 28 Z" fill="#111" />
    {/* Neck */}
    <path d="M24 0 L40 0 L40 18 L24 18 Z" fill="#111" />
    <path d="M24 16 Q32 24 40 16" fill="#fff" opacity="0.1" />
    
    {/* Pearls Outer */}
    <circle cx="21" cy="30" r="2.5" fill="#fff" />
    <circle cx="23" cy="35" r="3" fill="#fff" />
    <circle cx="27" cy="40" r="3.5" fill="#fff" />
    <circle cx="32" cy="43" r="4.5" fill="#fff" />
    <circle cx="37" cy="40" r="3.5" fill="#fff" />
    <circle cx="41" cy="35" r="3" fill="#fff" />
    <circle cx="43" cy="30" r="2.5" fill="#fff" />
    
    {/* Pearls Inner */}
    <circle cx="25" cy="25" r="2" fill="#fff" />
    <circle cx="28" cy="30" r="2.5" fill="#fff" />
    <circle cx="32" cy="33" r="3" fill="#fff" />
    <circle cx="36" cy="30" r="2.5" fill="#fff" />
    <circle cx="39" cy="25" r="2" fill="#fff" />
  </svg>
);

// ─── SCENE 1 ──────────────────────────────────────────────────────────────────

function Scene1_Item({ item, i, progress }: { item: any, i: number, progress: any }) {
  const itemOp = useTransform(progress, [0.08, 0.12, 0.20, 0.25], [0, 1, 1, 0]);
  const itemX  = useTransform(progress, [0.12, 0.20], [item.x, "0vw"], { clamp: true });
  const itemY  = useTransform(progress, [0.12, 0.20], [item.y, "0vh"], { clamp: true });
  return (
    <motion.div className="absolute z-10" style={{ x: itemX, y: itemY, opacity: itemOp }}>
      <motion.div
        className="flex flex-col items-center justify-center gap-2 lg:gap-3 origin-center"
        whileHover={{ scale: 1.06 }}
        animate={item.animate}
        transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
      >
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(212,175,55,0.18)] border-2" style={{ borderColor: "rgba(212,175,55,0.3)" }}>
          <item.icon size={44} />
        </div>
        <span className="text-[10px] lg:text-[11px] font-bold tracking-widest uppercase text-slate-700 bg-white/70 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-200">
          {item.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

function Scene1_Problem({ progress }: { progress: any }) {
  const textLayerOp = useTransform(progress, [0, 0.05, 0.10], [1, 1, 0], { clamp: true });
  const textInnerOp = useTransform(progress, [0, 0.04, 0.08], [1, 1, 0], { clamp: true });
  const textScale   = useTransform(progress, [0, 0.10],  [1, 0.90], { clamp: true });
  const textBlur    = useTransform(progress, [0.06, 0.10], ["blur(0px)", "blur(8px)"], { clamp: true });
  const fragOp      = useTransform(progress, [0.08, 0.12, 0.20, 0.25], [0, 1, 1, 0], { clamp: true });
  const textVisibility = useTransform(progress, [0.10, 0.11], ["visible", "hidden"]);
  const fragVisibility = useTransform(progress, [0.25, 0.26], ["visible", "hidden"]);

  const items = [
    { label: "Cash",       icon: CashSVG,         x: "-35vw", y: "-22vh", animate: { y: [0, -12, 0], rotate: [0, -3, 3, 0] }, duration: 5 },
    { label: "Gold Coins", icon: CoinsSVG,        x:  "35vw", y: "-22vh", animate: { y: [0, 10, 0],  scale: [1, 1.05, 1]   }, duration: 4 },
    { label: "Gold Bars",  icon: GoldBarsSVG,     x: "-35vw", y:  "22vh", animate: { x: [0, -8, 8, 0], y: [0, 8, -8, 0]    }, duration: 6 },
    { label: "Jewellery",  icon: NecklaceBustSVG, x:  "35vw", y:  "22vh", animate: { rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }, duration: 4.5 },
  ];

  const metrics = [
    { value: "₹500Cr+", label: "Gold Managed",   grad: `linear-gradient(135deg,${C.goldBright},${C.gold})` },
    { value: "50K+",    label: "Customers",       grad: `linear-gradient(135deg,${C.primary},${C.secondary})` },
    { value: "100%",    label: "Insured & Secure", grad: `linear-gradient(135deg,${C.primary},${C.secondary})` },
  ];

  return (
    <>
      {/* Layer 1: Hero text */}
      <motion.div
        style={{ opacity: textLayerOp, scale: textScale, filter: textBlur, visibility: textVisibility }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 pb-12 md:pb-20 overflow-hidden pointer-events-none"
      >
        <motion.div
          className="w-full flex flex-col items-center text-center z-10 flex-shrink-0 pointer-events-auto"
          style={{ opacity: textInnerOp }}
        >
          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full" style={{ background: "rgba(0,92,185,0.06)", border: "1px solid rgba(0,92,185,0.18)" }}>
            <motion.span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full" style={{ background: C.gold }} animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
            <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: C.primary }}>India&apos;s 1st Living Gold Ecosystem</span>
          </div>

          <h1 className="font-black tracking-tight leading-[1.08] mb-3 lg:mb-5 w-full" style={{ fontSize: "clamp(2.2rem, 5.2vw, 5rem)", color: C.textDark }}>
            Turn Gold Into{" "}
            <motion.span
              style={{ background: `linear-gradient(135deg,${C.goldBright} 0%,${C.gold} 45%,${C.goldDeep} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline" }}
              animate={{ filter: ["drop-shadow(0 2px 8px rgba(212,175,55,0.15))", "drop-shadow(0 2px 24px rgba(212,175,55,0.55))", "drop-shadow(0 2px 8px rgba(212,175,55,0.15))"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Wealth, Experiences
            </motion.span>{" "}
            &amp; Instant Liquidity
          </h1>

          <p className="leading-relaxed mb-5 lg:mb-7 max-w-2xl text-sm lg:text-[1.05rem]" style={{ color: C.textMid }}>
            Convert cash, jewellery, coins or bars into a <span style={{ color: C.gold, fontWeight: 700 }}>Gold Balance</span> and unlock premium financial benefits.
          </p>


          <div className="flex items-stretch gap-2 lg:gap-4 flex-nowrap justify-center">
            {metrics.map((m) => (
              <div key={m.value} className="flex flex-col items-center justify-center px-4 py-2.5 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(0,92,185,0.1)", backdropFilter: "blur(12px)", boxShadow: "0 3px 14px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)", minWidth: 90 }}>
                <div className="font-black mb-0.5 text-base sm:text-lg lg:text-xl whitespace-nowrap" style={{ background: m.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{m.value}</div>
                <div className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold tracking-wide whitespace-nowrap" style={{ color: C.textFaint }}>{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Layer 2: Fragmented cinematic */}
      <motion.div style={{ opacity: fragOp, visibility: fragVisibility }} className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.div className="absolute text-center z-20 pointer-events-none">
            <p className="text-[10px] lg:text-[11px] font-bold tracking-[0.2em] uppercase mb-2 lg:mb-3 text-slate-400">You have wealth.</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
              But it&apos;s <br /><span style={{ color: C.goldDeep }}>fragmented.</span>
            </h2>
          </motion.div>
          {items.map((item, i) => (
            <Scene1_Item key={i} item={item} i={i} progress={progress} />
          ))}
        </div>
      </motion.div>
    </>
  );
}

// ─── SCENE 2: GOLD BALANCE SPHERE ─────────────────────────────────────────────

function Scene2_GoldBalance({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0], { clamp: true });
  const scale   = useTransform(progress, [0.20, 0.25, 0.40, 0.45], [0.6, 1, 1.15, 1.45], { clamp: true });
  const blur    = useTransform(progress, [0.40, 0.45], ["blur(0px)", "blur(24px)"], { clamp: true });
  const visibility = useTransform(progress, [0.19, 0.20, 0.45, 0.46], ["hidden", "visible", "visible", "hidden"]);
  return (
    <motion.div style={{ opacity, scale, filter: blur, visibility }} className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{ width: 360, height: 360, background: `radial-gradient(circle at 35% 35%, ${C.goldBright} 0%, ${C.gold} 45%, ${C.goldDeep} 80%, transparent 100%)`, boxShadow: `0 0 100px rgba(212,175,55,0.6), 0 0 200px rgba(212,175,55,0.2)` }}
        animate={{ boxShadow: ["0 0 80px rgba(212,175,55,0.5), 0 0 160px rgba(212,175,55,0.15)", "0 0 140px rgba(212,175,55,0.8), 0 0 280px rgba(212,175,55,0.3)", "0 0 80px rgba(212,175,55,0.5), 0 0 160px rgba(212,175,55,0.15)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_10s_linear_infinite]" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg)" }} />
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_15s_linear_infinite_reverse]" style={{ transformStyle: "preserve-3d", transform: "rotateY(60deg)" }} />
        <div className="text-center z-10 select-none">
          <p className="text-sm font-bold tracking-[0.4em] text-black/50 mb-2">INTRODUCING</p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-black leading-[0.95]">GOLD<br />BALANCE</h2>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── SCENE 3: STRATEGIES ──────────────────────────────────────────────────────

function Scene3_Item({ strat, i, progress }: { strat: any; i: number; progress: any }) {
  const op = useTransform(progress, [0.40 + i * 0.015, 0.45 + i * 0.015, 0.60, 0.65], [0, 1, 1, 0], { clamp: true });
  const y  = useTransform(progress, [0.40 + i * 0.015, 0.45 + i * 0.015], [22, 0], { clamp: true });
  const Icon = strat.icon;
  return (
    <motion.div className={`absolute flex flex-col items-center text-center max-w-[120px] sm:max-w-[180px] lg:max-w-xs ${strat.pos}`} style={{ opacity: op, y }}>
      <div className="w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center mb-1.5 lg:mb-2.5 shadow-md text-slate-700">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
      </div>
      <div className="text-sm sm:text-lg lg:text-2xl font-black text-slate-900 mb-1 leading-tight">{strat.title}</div>
      <div className="text-[9px] sm:text-xs lg:text-sm text-slate-500 font-medium leading-snug">{strat.desc}</div>
    </motion.div>
  );
}

function Scene3_Strategies({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.40, 0.45, 0.60, 0.65], [0, 1, 1, 0], { clamp: true });
  const visibility = useTransform(progress, [0.39, 0.40, 0.65, 0.66], ["hidden", "visible", "visible", "hidden"]);
  const strategies = [
    { title: "Investment",          desc: "Gold bars grow into a mountain.", pos: "-translate-x-[100px] sm:-translate-x-[190px] lg:-translate-x-[280px] -translate-y-[130px] sm:-translate-y-[155px] lg:-translate-y-[190px]", icon: TrendingUp },
    { title: "Enroll & Experience", desc: "Join and unlock luxury.",         pos: "translate-x-[100px] sm:translate-x-[190px] lg:translate-x-[280px] -translate-y-[130px] sm:-translate-y-[155px] lg:-translate-y-[190px]",  icon: InfinityIcon },
    { title: "Invest & Experience", desc: "Grow wealth while you wear.",     pos: "-translate-x-[100px] sm:-translate-x-[190px] lg:-translate-x-[280px] translate-y-[130px] sm:translate-y-[155px] lg:translate-y-[190px]",   icon: Sparkles },
    { title: "Experience",          desc: "Wear and return.",                pos: "translate-x-[100px] sm:translate-x-[190px] lg:translate-x-[280px] translate-y-[130px] sm:translate-y-[155px] lg:translate-y-[190px]",    icon: Gem },
  ];
  return (
    <motion.div style={{ opacity, visibility }} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Gold Balance Ripples */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute z-10 rounded-full border border-[#D4AF37]/40"
            style={{ width: "100px", height: "100px" }}
            animate={{ scale: [1, 3], opacity: [0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
          />
        ))}

        <motion.div
          className="absolute z-20 flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white/30"
          style={{ background: `linear-gradient(135deg, ${C.goldBright} 0%, ${C.goldDeep} 100%)`, boxShadow: `inset 0 0 20px rgba(255,255,255,0.4)` }}
          animate={{ 
            scale: [1, 1.05, 1], 
            boxShadow: ["0 0 40px rgba(212,175,55,0.4), inset 0 0 20px rgba(255,255,255,0.4)", "0 0 80px rgba(212,175,55,0.8), inset 0 0 20px rgba(255,255,255,0.4)", "0 0 40px rgba(212,175,55,0.4), inset 0 0 20px rgba(255,255,255,0.4)"] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="text-white/90 mb-0.5 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[7px] sm:text-[9px] font-black text-white tracking-[0.2em] text-center leading-tight">GOLD<br />BALANCE</span>
        </motion.div>

        {/* Animated Connecting Lines */}
        {[45, 135, 225, 315].map((angle, idx) => (
          <div key={angle} className="absolute top-1/2 left-1/2 origin-left overflow-hidden" style={{ width: "clamp(100px, 22vw, 260px)", height: 1.5, background: "linear-gradient(to left, rgba(212,175,55,0.05), rgba(212,175,55,0.3))", transform: `rotate(${angle}deg)`, marginTop: -0.75 }}>
            <motion.div 
              className="absolute top-0 h-full rounded-full" 
              style={{ width: "30%", background: "linear-gradient(to left, transparent, #F4C430, transparent)", boxShadow: "0 0 8px #F4C430" }} 
              animate={{ left: ["100%", "-30%"] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: idx * 0.5 }}
            />
          </div>
        ))}
        
        {strategies.map((strat, i) => (
          <Scene3_Item key={i} strat={strat} i={i} progress={progress} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── SCENE 4: FIVE PORTALS ────────────────────────────────────────────────────

function Scene4_Item({ p, i, progress }: { p: any; i: number; progress: any }) {
  const op = useTransform(progress, [0.62 + i * 0.015, 0.67 + i * 0.015, 0.80, 0.85], [0, 1, 1, 0], { clamp: true });
  const y  = useTransform(progress, [0.62 + i * 0.015, 0.67 + i * 0.015], [38, 0], { clamp: true });
  const Icon = p.icon;
  return (
    <motion.div style={{ opacity: op, y }} className="relative w-[60px] h-[130px] sm:w-24 sm:h-44 lg:w-32 lg:h-60 rounded-full overflow-hidden flex flex-col items-center justify-end pb-3 lg:pb-7 border border-slate-200/80 bg-white shadow-xl flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-t from-[#B8860B]/35 via-transparent to-transparent" />
      <div className="absolute -bottom-4 lg:-bottom-8 w-12 h-12 lg:w-32 lg:h-32 bg-[#F4C430] blur-2xl opacity-70" />
      <div className="relative z-10 w-6 h-6 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-1 lg:mb-2 text-[#B8860B]">
        <Icon className="w-3.5 h-3.5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
      </div>
      <div className="relative z-10 h-6 sm:h-10 lg:h-12 flex items-start justify-center px-1 w-full">
        <span className="text-slate-800 text-center font-bold text-[6.5px] sm:text-[9px] lg:text-[11px] leading-tight">{p.title}</span>
      </div>
    </motion.div>
  );
}

function Scene4_Benefits({ progress }: { progress: any }) {
  const opacity  = useTransform(progress, [0.60, 0.65, 0.80, 0.85], [0, 1, 1, 0], { clamp: true });
  const titleOp  = useTransform(progress, [0.60, 0.65], [0, 1], { clamp: true });
  const titleY   = useTransform(progress, [0.60, 0.65], [20, 0], { clamp: true });
  const visibility = useTransform(progress, [0.59, 0.60, 0.85, 0.86], ["hidden", "visible", "visible", "hidden"]);
  const portals  = [
    { title: "Luxury Jewellery Experience", icon: Sparkles },
    { title: "Instant Loan",                icon: Landmark },
    { title: "Instant Liquidity",           icon: Zap },
    { title: "Gift Gold Ecosystem",         icon: Gift },
    { title: "Wealth Generation",           icon: TrendingUp },
  ];
  return (
    <motion.div style={{ opacity, visibility }} className="absolute inset-0 flex flex-col items-center justify-center pt-4 sm:pt-8">
      <motion.h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 sm:mb-10 lg:mb-14 tracking-tight text-center px-4" style={{ opacity: titleOp, y: titleY }}>
        Five Infinite Portals
      </motion.h2>
      <div className="flex flex-nowrap sm:flex-wrap justify-center gap-1.5 sm:gap-5 lg:gap-7 px-2 max-w-5xl w-full">
        {portals.map((p, i) => (
          <Scene4_Item key={i} p={p} i={i} progress={progress} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── SCENE 5: ENDING ──────────────────────────────────────────────────────────

function Scene5_Ending({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.80, 0.85, 1], [0, 1, 1]);
  const scale   = useTransform(progress, [0.84, 1.0], [0.85, 1], { clamp: true });

  const rings = [
    { size: "w-[360px] h-[360px] lg:w-[580px] lg:h-[580px]", duration: 40, reverse: false, color: "border-slate-300", items: ["Instant Loan", "Instant Liquidity"] },
    { size: "w-[280px] h-[280px] lg:w-[440px] lg:h-[440px]", duration: 25, reverse: true, color: "border-[#D4AF37]/50", items: ["Investment", "Wealth Generation"] },
    { size: "w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]", duration: 15, reverse: false, color: "border-[#D4AF37]/80", items: ["Luxury Jewellery Experience", "Gift Gold Ecosystem"] },
  ];

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div className="relative w-full h-full flex items-center justify-center max-w-[500px] mx-auto pointer-events-auto">
        
        {rings.map((ring, i) => (
          <motion.div 
            key={i} 
            className={`absolute rounded-full border-[1px] border-dashed ${ring.color} ${ring.size}`}
            animate={{ rotate: ring.reverse ? [0, -360] : [0, 360] }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          >
            {/* Top Planet */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div 
                animate={{ rotate: ring.reverse ? [0, 360] : [0, -360] }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="px-3 py-1 rounded-full border border-slate-200 bg-white shadow-[0_6px_16px_rgba(212,175,55,0.15)] text-[9px] lg:text-xs font-bold text-slate-700 whitespace-nowrap"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                >
                  {ring.items[0]}
                </motion.div>
              </motion.div>
            </div>
            {/* Bottom Planet */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <motion.div 
                animate={{ rotate: ring.reverse ? [0, 360] : [0, -360] }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="px-3 py-1 rounded-full border border-slate-200 bg-white shadow-[0_6px_16px_rgba(212,175,55,0.15)] text-[9px] lg:text-xs font-bold text-slate-700 whitespace-nowrap"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 + 1 }}
                >
                  {ring.items[1]}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        <div className="z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl w-32 h-32 lg:w-40 lg:h-40 rounded-full shadow-[0_10px_40px_rgba(212,175,55,0.2)] border border-white/90">
          <h1 className="text-xl lg:text-3xl font-black text-slate-900 tracking-widest mb-0.5 mt-2">LIMOVI</h1>
          <p className="tracking-[0.2em] text-[5.5px] lg:text-[7px] font-bold uppercase text-[#B8860B]">The Gold Ecosystem</p>
        </div>

      </div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const lenis = useLenis();
  
  useEffect(() => {
    let scrolled = false;
    const handleScroll = () => { scrolled = true; };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timeout = setTimeout(() => {
      if (!scrolled && window.scrollY < 10) {
        if (lenis) {
          lenis.scrollTo(window.innerHeight * 0.96, { duration: 3.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          window.scrollTo({ top: window.innerHeight * 0.96, behavior: "smooth" });
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  
  return (
    <section ref={containerRef} className="relative h-[800vh]" style={{ background: "linear-gradient(145deg,#FFFFFF 0%,#F8FAFC 25%,#EEF4FF 60%,#DCEBFF 100%)" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,92,185,0.07) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)" }} />

        <Scene1_Problem     progress={scrollYProgress} />
        <Scene2_GoldBalance progress={scrollYProgress} />
        <Scene3_Strategies  progress={scrollYProgress} />
        <Scene4_Benefits    progress={scrollYProgress} />
        <Scene5_Ending      progress={scrollYProgress} />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 lg:w-64 h-[3px] bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <motion.div className="h-full rounded-full" style={{ backgroundColor: C.goldDeep, scaleX: scrollYProgress, transformOrigin: "left" }} />
        </div>
        <div className="absolute bottom-4 w-max left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">
          Scroll to explore the journey
        </div>
      </div>
    </section>
  );
}
