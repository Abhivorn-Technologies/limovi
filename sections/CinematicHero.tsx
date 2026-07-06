"use client";

import { useRef, useEffect, useCallback, useState } from "react";
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
    <defs>
      <g id="usdBundle">
        {/* Right Face (Pages) */}
        <polygon points="40,10 55,0 55,8 40,18" fill="#D6D6D6" stroke="#9E9E9E" strokeWidth="0.5" />
        <line x1="40" y1="12" x2="55" y2="2" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="40" y1="14" x2="55" y2="4" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="40" y1="16" x2="55" y2="6" stroke="#BDBDBD" strokeWidth="0.5" />

        {/* Left Face (Pages) */}
        <polygon points="0,10 40,10 40,18 0,18" fill="#F4F4F4" stroke="#9E9E9E" strokeWidth="0.5" />
        <line x1="0" y1="12" x2="40" y2="12" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="0" y1="14" x2="40" y2="14" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="0" y1="16" x2="40" y2="16" stroke="#BDBDBD" strokeWidth="0.5" />

        {/* Top Face */}
        <polygon points="0,10 15,0 55,0 40,10" fill="#E8EBCF" stroke="#8A9A70" strokeWidth="0.5" />
        
        {/* Projected Details (Matrix projects 100x45 rect onto 3D top face) */}
        <g transform="matrix(0.4, 0, -0.3333, 0.2222, 15, 0)">
          {/* Outer Border */}
          <rect x="3" y="3" width="94" height="39" fill="none" stroke="#2B462C" strokeWidth="1.5" rx="1" />
          <rect x="5" y="5" width="90" height="35" fill="none" stroke="#2B462C" strokeWidth="0.5" />
          
          {/* Center Portrait Circle */}
          <circle cx="50" cy="22.5" r="14" fill="#D9DEC0" stroke="#2B462C" strokeWidth="1" />
          <path d="M42,32 C42,16 58,16 58,32 Z" fill="#4B6349" opacity="0.8" />
          
          {/* Left and Right circular seals */}
          <circle cx="24" cy="22.5" r="7" fill="none" stroke="#2B462C" strokeWidth="1" />
          <circle cx="76" cy="22.5" r="7" fill="none" stroke="#1B5E20" strokeWidth="1" />
          
          {/* 100 Numbers in Corners */}
          <text x="6" y="13" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>
          <text x="71" y="13" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>
          <text x="6" y="41" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>
          <text x="71" y="41" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>

          {/* Random decorative lines */}
          <line x1="33" y1="14" x2="67" y2="14" stroke="#2B462C" strokeWidth="0.5" />
          <line x1="33" y1="31" x2="67" y2="31" stroke="#2B462C" strokeWidth="0.5" />
        </g>

        {/* White Strap with Yellow Edges */}
        <polygon points="16,10 24,10 24,18 16,18" fill="#FFFFFF" stroke="#9E9E9E" strokeWidth="0.5" />
        <polygon points="16,10 24,10 39,0 31,0" fill="#F8F9FA" stroke="#9E9E9E" strokeWidth="0.5" />
        <line x1="16" y1="10" x2="31" y2="0" stroke="#FBC02D" strokeWidth="0.75" />
        <line x1="24" y1="10" x2="39" y2="0" stroke="#FBC02D" strokeWidth="0.75" />
        <line x1="16" y1="18" x2="16" y2="10" stroke="#FBC02D" strokeWidth="0.75" />
        <line x1="24" y1="18" x2="24" y2="10" stroke="#FBC02D" strokeWidth="0.75" />
      </g>
    </defs>

    {/* Stack Assembly (Messy Tumbling Pile) */}
    <g transform="translate(6, 38) rotate(-5) scale(0.9)">
      <use href="#usdBundle" />
    </g>
    <g transform="translate(12, 30) rotate(8) scale(0.9)">
      <use href="#usdBundle" />
    </g>
    <g transform="translate(4, 21) rotate(-12) scale(0.9)">
      <use href="#usdBundle" />
    </g>
    <g transform="translate(10, 12) rotate(4) scale(0.9)">
      <use href="#usdBundle" />
    </g>
  </svg>
);

const CoinsSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    <defs>
      <g id="scatteredCoin">
        {/* Side edge (ribbed) */}
        <path d="M-14,0 v5 c0,2.5 6,5 14,5 c8,0 14,-2.5 14,-5 v-5" fill="#F4C430" stroke="#0A1929" strokeWidth="1.5" />
        {/* Ribbing lines */}
        <line x1="-12" y1="2" x2="-12" y2="7" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="-8" y1="3" x2="-8" y2="8" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="-4" y1="4" x2="-4" y2="9" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="0" y1="4.5" x2="0" y2="9.5" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="4" x2="4" y2="9" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="8" y1="3" x2="8" y2="8" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="12" y1="2" x2="12" y2="7" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        {/* Top face */}
        <ellipse cx="0" cy="0" rx="14" ry="5" fill="#FFF176" stroke="#0A1929" strokeWidth="1.5" />
        <ellipse cx="0" cy="0" rx="10" ry="3" fill="none" stroke="#F4C430" strokeWidth="1" />
      </g>
    </defs>
    
    {/* Base Messy Pile */}
    <g transform="translate(20, 52) rotate(-15)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(44, 48) rotate(10)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(32, 56) rotate(-5)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(34, 44) rotate(5)">
      <use href="#scatteredCoin" />
    </g>

    {/* Falling/Tumbling Coins */}
    <g transform="translate(16, 28) rotate(-40)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(50, 20) rotate(30)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(32, 10) rotate(-15)">
      <use href="#scatteredCoin" />
    </g>
  </svg>
);

const GoldBarsSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    <defs>
      <g id="goldBar">
        {/* Base trapezoid (front face) */}
        <polygon points="4,12 36,12 40,24 0,24" fill="#F4C430" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Top face */}
        <polygon points="4,12 12,2 44,2 36,12" fill="#FFF176" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Side face */}
        <polygon points="36,12 44,2 48,12 40,24" fill="#D4AF37" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Metallic edge highlight */}
        <line x1="5" y1="13" x2="35" y2="13" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        <line x1="37" y1="12" x2="43" y2="4" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      </g>
      <g id="goldBarEngraved">
        <use href="#goldBar" />
        {/* Engravings on Top Face */}
        {/* Stamp / Logo */}
        <circle cx="20" cy="7" r="2.5" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
        <path d="M19,6 L21,8 M21,6 L19,8" stroke="#D4AF37" strokeWidth="0.5" />
        {/* Weight / Purity text representation */}
        <line x1="26" y1="6" x2="30" y2="6" stroke="#D4AF37" strokeWidth="1" />
        <line x1="26" y1="8" x2="34" y2="8" stroke="#D4AF37" strokeWidth="1" />
      </g>
    </defs>

    {/* Back Peeking Bar */}
    <g transform="translate(18, 14) rotate(-5)">
      <use href="#goldBar" />
    </g>
    
    {/* Front Base Bar */}
    <g transform="translate(-2, 32) rotate(10)">
      <use href="#goldBar" />
    </g>
    
    {/* Middle Bar */}
    <g transform="translate(14, 24) rotate(-15)">
      <use href="#goldBar" />
    </g>
    
    {/* Top Bar (Engraved) */}
    <g transform="translate(6, 6) rotate(5)">
      <use href="#goldBarEngraved" />
    </g>
  </svg>
);

const JewellerySVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    {/* Jhumkas on the left */}
    <g transform="translate(0, 16) scale(1.6)">
      {/* Top Earring */}
      <g transform="translate(0, 0)">
        <circle cx="6" cy="2" r="1.5" fill="#F4C430" />
        <path d="M2,8 Q6,4 10,8 Z" fill="#D4AF37" />
        <circle cx="4" cy="9" r="0.8" fill="#F4C430" />
        <circle cx="6" cy="10" r="0.8" fill="#F4C430" />
        <circle cx="8" cy="9" r="0.8" fill="#F4C430" />
      </g>
      {/* Bottom Earring */}
      <g transform="translate(12, 6)">
        <circle cx="6" cy="2" r="1.5" fill="#F4C430" />
        <path d="M2,8 Q6,4 10,8 Z" fill="#D4AF37" />
        <circle cx="4" cy="9" r="0.8" fill="#F4C430" />
        <circle cx="6" cy="10" r="0.8" fill="#F4C430" />
        <circle cx="8" cy="9" r="0.8" fill="#F4C430" />
      </g>
    </g>

    {/* Necklace on the right */}
    <g transform="translate(30, 16)">
      {/* Outer chain */}
      <path d="M0,0 Q10,40 16,40 Q22,40 32,0" fill="none" stroke="#F4C430" strokeWidth="1.25" strokeLinecap="round" />
      {/* Middle chain */}
      <path d="M3,0 Q10,34 16,34 Q22,34 29,0" fill="none" stroke="#D4AF37" strokeWidth="1.25" strokeLinecap="round" />
      {/* Inner chain */}
      <path d="M6,0 Q10,28 16,28 Q22,28 26,0" fill="none" stroke="#F4C430" strokeWidth="1.25" strokeLinecap="round" />
      {/* Diamond Pendant */}
      <g transform="translate(16, 40)">
        <polygon points="0,0 4,6 0,12 -4,6" fill="none" stroke="#F4C430" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="0,2 2.5,6 0,10 -2.5,6" fill="#D4AF37" />
      </g>
    </g>
  </svg>
);

const DigitalGoldSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    {/* Glowing background arrow (from image) */}
    <path d="M12,48 L32,28 L42,38 L60,10 M50,10 L60,10 L60,20" stroke="#F4C430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    
    {/* Phone Frame */}
    <g transform="translate(14, 2)">
      <rect x="0" y="0" width="36" height="60" rx="4" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
      {/* Notch */}
      <path d="M12,2.5 L12,4 Q12,6 14,6 L22,6 Q24,6 24,4 L24,2.5" fill="#D4AF37" />
    </g>

    {/* Floating Coin 1 (Back/Right) */}
    <g transform="translate(32, 28) rotate(15)">
      {/* Coin thickness */}
      <ellipse cx="0" cy="4" rx="16" ry="12" fill="#B8860B" />
      <path d="M-16,4 L-16,0 A16,12 0 0,0 16,0 L16,4 A16,12 0 0,1 -16,4" fill="#8B6508" />
      {/* Coin face */}
      <ellipse cx="0" cy="0" rx="16" ry="12" fill="#F4C430" stroke="#FFF176" strokeWidth="1" />
      {/* Inner ring */}
      <ellipse cx="0" cy="0" rx="13" ry="9" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1,1" />
      {/* Rupee Symbol */}
      <text x="0" y="4" fontSize="14" fontWeight="900" fontFamily="sans-serif" fill="#8B6508" textAnchor="middle" transform="scale(1, 0.75)">₹</text>
    </g>

    {/* Floating Coin 2 (Front/Left) */}
    <g transform="translate(20, 42) rotate(-10)">
      {/* Coin thickness */}
      <ellipse cx="0" cy="5" rx="18" ry="14" fill="#B8860B" />
      <path d="M-18,5 L-18,0 A18,14 0 0,0 18,0 L18,5 A18,14 0 0,1 -18,5" fill="#8B6508" />
      {/* Ribbed edge lines */}
      <line x1="-16" y1="2" x2="-16" y2="7" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="-12" y1="4" x2="-12" y2="9" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="-8" y1="5" x2="-8" y2="10" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="-4" y1="5" x2="-4" y2="10" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="0" y1="5" x2="0" y2="10" stroke="#6B4E00" strokeWidth="0.5" />
      
      {/* Coin face */}
      <ellipse cx="0" cy="0" rx="18" ry="14" fill="#FFD700" stroke="#FFF8E7" strokeWidth="1" />
      {/* Inner ring */}
      <ellipse cx="0" cy="0" rx="14" ry="10.5" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="1.5,1.5" />
      {/* Glowing highlight */}
      <path d="M-12,-4 Q-6,-8 0,-6 Q-4,-2 -12,-4" fill="#FFFFFF" opacity="0.6" />
      {/* Rupee Symbol */}
      <text x="0" y="5" fontSize="18" fontWeight="900" fontFamily="sans-serif" fill="#6B4E00" textAnchor="middle" transform="scale(1, 0.75)">₹</text>
    </g>
  </svg>
);

// ─── SCENE 1 ──────────────────────────────────────────────────────────────────

function Scene1_Item({ item, i, progress }: { item: any, i: number, progress: any }) {
  const itemOp = useTransform(progress, [0.08, 0.12, 0.20, 0.25], [0, 1, 1, 0]);
  const xUnit = typeof item.x === 'string' ? item.x.replace(/[-0-9.]/g, '') : "px";
  const yUnit = typeof item.y === 'string' ? item.y.replace(/[-0-9.]/g, '') : "px";
  const itemX  = useTransform(progress, [0.17, 0.22], [item.x, `0${xUnit}`], { clamp: true });
  const itemY  = useTransform(progress, [0.17, 0.22], [item.y, `0${yUnit}`], { clamp: true });
  return (
    <motion.div className="absolute z-10" style={{ x: itemX, y: itemY, opacity: itemOp }}>
      <motion.div
        className="flex flex-col items-center justify-center gap-2 lg:gap-3 origin-center"
        whileHover={{ scale: 1.06 }}
        animate={item.animate}
        transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
      >
        <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(212,175,55,0.18)] border-2" style={{ borderColor: "rgba(212,175,55,0.3)" }}>
          <item.icon size={52} />
        </div>
        <span className="text-[10px] lg:text-[11px] font-bold tracking-widest uppercase text-slate-700 bg-white/70 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-200">
          {item.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

function Scene1_Problem({ progress }: { progress: any }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const textLayerOp = useTransform(progress, [0, 0.05, 0.10], [1, 1, 0], { clamp: true });
  const textInnerOp = useTransform(progress, [0, 0.04, 0.08], [1, 1, 0], { clamp: true });
  const textScale   = useTransform(progress, [0, 0.10],  [1, 0.90], { clamp: true });
  const textBlur    = useTransform(progress, [0.06, 0.10], ["blur(0px)", "blur(8px)"], { clamp: true });
  const fragOp      = useTransform(progress, [0.08, 0.12, 0.16, 0.19], [0, 1, 1, 0], { clamp: true });
  const textVisibility = useTransform(progress, [0.10, 0.11], ["visible", "hidden"]);
  const fragVisibility = useTransform(progress, [0.25, 0.26], ["visible", "hidden"]);

  const items = [
    { label: "Digital Gold", icon: DigitalGoldSVG,  x:  "0px", y: isMobile ? "-190px" : "-25vh", animate: { y: [0, -10, 0], scale: [1, 1.06, 1] }, duration: 4.2 },
    { label: "Cash",         icon: CashSVG,         x: isMobile ? "-125px" : "-28vw", y: isMobile ? "-110px" : "-8vh",  animate: { y: [0, -12, 0], rotate: [0, -3, 3, 0] }, duration: 5 },
    { label: "Gold Coins",   icon: CoinsSVG,        x: isMobile ? "125px" : "28vw", y: isMobile ? "-110px" : "-8vh",  animate: { y: [0, 10, 0],  scale: [1, 1.05, 1]   }, duration: 4 },
    { label: "Gold Bars",    icon: GoldBarsSVG,     x: isMobile ? "-115px" : "-18vw", y: isMobile ? "160px" : "20vh", animate: { x: [0, -8, 8, 0], y: [0, 8, -8, 0]    }, duration: 6 },
    { label: "Jewellery",    icon: JewellerySVG,    x: isMobile ? "115px" : "18vw", y: isMobile ? "160px" : "20vh", animate: { rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }, duration: 4.5 },
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
      <motion.div style={{ visibility: fragVisibility }} className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.div style={{ opacity: fragOp }} className="absolute text-center z-20 pointer-events-none flex flex-col items-center">
            <p className="text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-1">YOU HAVE GOLD ASSETS.</p>
            <p className="text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-3 lg:mb-4">YOU HAVE GOLD INVESTMENTS.</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1]">
              But they&apos;re <br /><span style={{ color: C.goldDeep }}>fragmented.</span>
            </h2>
          </motion.div>
          {items.map((item, i) => (
            <Scene1_Item key={`${i}-${isMobile}`} item={item} i={i} progress={progress} />
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
    { title: "Investment Only",     desc: "Gold bars grow into a mountain.", pos: "-translate-x-[100px] sm:-translate-x-[190px] lg:-translate-x-[280px] -translate-y-[130px] sm:-translate-y-[155px] lg:-translate-y-[190px]", icon: TrendingUp },
    { title: "Enroll & Experience", desc: "Join and unlock luxury.",         pos: "translate-x-[100px] sm:translate-x-[190px] lg:translate-x-[280px] -translate-y-[130px] sm:-translate-y-[155px] lg:-translate-y-[190px]",  icon: InfinityIcon },
    { title: "Invest & Experience", desc: "Grow wealth while you wear.",     pos: "-translate-x-[100px] sm:-translate-x-[190px] lg:-translate-x-[280px] translate-y-[130px] sm:translate-y-[155px] lg:translate-y-[190px]",   icon: Sparkles },
    { title: "Experience Only",     desc: "Wear and return.",                pos: "translate-x-[100px] sm:translate-x-[190px] lg:translate-x-[280px] translate-y-[130px] sm:translate-y-[155px] lg:translate-y-[190px]",    icon: Gem },
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

        {/* Animated Connecting Lines with Triggering Dots */}
        {[45, 135, 225, 315].map((angle, idx) => (
          <div key={angle} className="absolute top-1/2 left-1/2 origin-left overflow-hidden" style={{ width: "clamp(100px, 22vw, 260px)", height: 2, background: "rgba(212,175,55,0.1)", transform: `rotate(${angle}deg)`, marginTop: -1 }}>
            {[0, 1, 2].map((dotIdx) => (
              <motion.div 
                key={dotIdx}
                className="absolute top-1/2 -translate-y-1/2 rounded-full" 
                style={{ width: "6px", height: "6px", background: "#FFFFFF", boxShadow: "0 0 12px 3px #F4C430" }} 
                animate={{ left: ["100%", "0%"], opacity: [0, 1, 0.2] }} 
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn", delay: dotIdx * 0.6 + idx * 0.15 }}
              />
            ))}
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
          <h1 className="text-xl lg:text-3xl font-black text-[#387ed1] tracking-widest mb-0.5 mt-2">LIMOVI</h1>
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
