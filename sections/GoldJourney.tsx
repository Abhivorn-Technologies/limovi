"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";

// ─── Journey Milestones ───────────────────────────────────────────────────────
const milestones = [
  { image: "/images/journey-1.png", alt: "Physical Gold" },
  { 
    image: "/images/journey-2.png", 
    alt: "Gold Verification",
    contentOverlay: (
      <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-white via-white to-transparent/10 p-5 flex flex-col justify-center rounded-l-[20px]">
        <h3 className="font-bold text-[#1a237e] text-[16px] leading-tight mb-3">Enrol by choosing strategy</h3>
        <ul className="text-[10px] text-[#1a237e]/80 font-semibold space-y-1.5 z-10 relative">
          <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />Investment Only</li>
          <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />Enrol & Experience</li>
          <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />Investment & Experience</li>
          <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />Experience Only</li>
        </ul>
        {/* Extra solid block to guarantee text cover on the far left */}
        <div className="absolute inset-y-0 left-0 w-[80%] bg-white -z-10" />
      </div>
    )
  },
  { image: "/images/journey-3.png", alt: "Digital Gold Wallet" },
  { image: "/images/journey-4.png", alt: "Gold Loan" },
  { image: "/images/journey-5.png", alt: "Gold Investment" },
  { image: "/images/journey-6.png", alt: "Rewards & Benefits" },
  { image: "/images/journey-7.png", alt: "Luxury Experiences" },
  { image: "/images/journey-8.png", alt: "Wealth Growth" },
];

// ─── SVG layout ───────────────────────────────────────────────────────────────
const VBOX_W = 900;
const VBOX_H = 1700;
const NODE_SPACING = 215;
const nodeX = (i: number) => (i % 2 === 0 ? 200 : 700);
const nodeY = (i: number) => 160 + i * NODE_SPACING;

const IMG_W = 280;
const IMG_H = 182;
const IMG_OFFSET = 36;

function buildPath(): string {
  const pts = milestones.map((_, i) => ({ x: nodeX(i), y: nodeY(i) }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}
const SNAKE_PATH = buildPath();

// ─── Mobile path ──────────────────────────────────────────────────────────────
const MOB_SPACING = 222; // 190 (img) + 32 (space-y-8)
const MOB_START_Y = 111; // 16 (py-4 top) + 190 / 2
const MOBILE_VBOX_H = 1776; // total container height
function buildMobilePath(): string {
  let d = `M 60 ${MOB_START_Y}`;
  for (let i = 1; i < milestones.length; i++) {
    d += ` L 60 ${MOB_START_Y + i * MOB_SPACING}`;
  }
  return d;
}
const MOBILE_PATH = buildMobilePath();

// ─── Component ────────────────────────────────────────────────────────────────
export function GoldJourney() {
  const sectionRef  = useRef<HTMLElement>(null);
  const svgWrapRef  = useRef<HTMLDivElement>(null);  // ← scroll target for coin
  const mobWrapRef  = useRef<HTMLDivElement>(null);
  const pathRef     = useRef<SVGPathElement>(null);
  const mobPathRef  = useRef<SVGPathElement>(null);

  const [pathLen,    setPathLen]    = useState(0);
  const [mobPathLen, setMobPathLen] = useState(0);

  // Coin SVG coordinates, initialised at node 1
  const coinX    = useMotionValue(nodeX(0) - 24);
  const coinY    = useMotionValue(nodeY(0) - 24);
  const mobCoinX = useMotionValue(60 - 18);
  const mobCoinY = useMotionValue(60 - 18);

  const measurePaths = useCallback(() => {
    if (pathRef.current)    setPathLen(pathRef.current.getTotalLength());
    if (mobPathRef.current) setMobPathLen(mobPathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    measurePaths();
    window.addEventListener("resize", measurePaths);
    return () => window.removeEventListener("resize", measurePaths);
  }, [measurePaths]);

  // ── Scroll: target the SVG wrapper so range = SVGHeight + viewportHeight ──
  // offset ["start end","end start"] = full time SVG is in/around the viewport
  const { scrollYProgress: desktopProg } = useScroll({
    target: svgWrapRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: mobileProg } = useScroll({
    target: mobWrapRef,
    offset: ["start end", "end start"],
  });

  const smoothDesktop = useSpring(desktopProg, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const smoothMobile  = useSpring(mobileProg,  { stiffness: 80, damping: 25, restDelta: 0.001 });

  // Map scroll % → distance along path.
  // 0.10 = roughly when node 1 enters viewport from bottom
  // 0.88 = roughly when node 8 is centred
  const distAlongPath    = useTransform(smoothDesktop, [0.10, 0.88], [0, pathLen],    { clamp: true });
  const mobDistAlongPath = useTransform(smoothMobile,  [0.10, 0.88], [0, mobPathLen], { clamp: true });

  // ── Map distance → exact SVG x,y ──────────────────────────────────────────
  useEffect(() => {
    const unsub = distAlongPath.on("change", (dist) => {
      if (!pathRef.current) return;
      try {
        const pt = pathRef.current.getPointAtLength(Math.max(0, Math.min(dist, pathLen)));
        coinX.set(pt.x - 24);
        coinY.set(pt.y - 24);
      } catch (_) {}
    });
    // Snap coin to node 1 on mount
    if (pathRef.current) {
      try { const pt = pathRef.current.getPointAtLength(0); coinX.set(pt.x - 24); coinY.set(pt.y - 24); } catch (_) {}
    }
    return unsub;
  }, [distAlongPath, pathLen, coinX, coinY]);

  useEffect(() => {
    const unsub = mobDistAlongPath.on("change", (dist) => {
      if (!mobPathRef.current) return;
      try {
        const pt = mobPathRef.current.getPointAtLength(Math.max(0, Math.min(dist, mobPathLen)));
        mobCoinX.set(pt.x - 18);
        mobCoinY.set(pt.y - 18);
      } catch (_) {}
    });
    return unsub;
  }, [mobDistAlongPath, mobPathLen, mobCoinX, mobCoinY]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "#F8F9FC" }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #0B1F3A 0%, transparent 70%)" }} />

      {/* Header */}
      <div className="relative z-10 text-center mb-14 px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.7 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ background: "linear-gradient(135deg,#D4AF3720,#D4AF3740)", color: "#9A7B1A", border: "1px solid #D4AF3750" }}>
            The Gold Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: "#0B1F3A" }}>
            Your{" "}
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#FFE066,#D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Gold Journey
            </span>
          </h2>
        </motion.div>
      </div>

      {/* ════════════════════ DESKTOP (md+) ════════════════════ */}
      <div ref={svgWrapRef} className="relative hidden md:block max-w-5xl mx-auto px-4">
        <svg viewBox={`-150 0 1200 1800`} className="w-full" style={{ overflow: "visible" }}>
          <defs>
            <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="avatarGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="coinFill" cx="38%" cy="32%" r="65%">
              <stop offset="0%"   stopColor="#FFE066" />
              <stop offset="60%"  stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9A7B1A" />
            </radialGradient>
          </defs>

          {/* Gold dashed path */}
          <path
            ref={pathRef}
            d={SNAKE_PATH}
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray="10 7"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* Milestone nodes + images */}
          {milestones.map((m, i) => {
            const nx = nodeX(i);
            const ny = nodeY(i);
            const isLeft = i % 2 === 0;
            const imgX = isLeft ? nx - IMG_W - IMG_OFFSET : nx + IMG_OFFSET;
            const imgY = ny - IMG_H / 2;
            return (
              <g key={i}>
                <line x1={nx} y1={ny} x2={isLeft ? imgX + IMG_W : imgX} y2={ny}
                  stroke="#D4AF3745" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx={nx} cy={ny} r="22" fill="#D4AF3712" stroke="#D4AF37"
                  strokeWidth="1.5" filter="url(#nodeGlow)" opacity="0.55" />
                <circle cx={nx} cy={ny} r="13" fill="#D4AF37" stroke="#FFE066" strokeWidth="2" />
                <text x={nx} y={ny + 5} textAnchor="middle" fontSize="10"
                  fontWeight="bold" fill="#0B1F3A" fontFamily="sans-serif">{i + 1}</text>

                <foreignObject x={imgX} y={imgY} width={IMG_W} height={IMG_H} style={{ overflow: "visible" }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.82, x: isLeft ? -28 : 28 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: false, margin: "-70px" }}
                    transition={{ duration: 0.65, type: "spring", bounce: 0.28, delay: i * 0.06 }}
                    whileHover={{ scale: 1.06 }}
                    style={{
                      width: IMG_W, height: IMG_H, borderRadius: 20, overflow: "hidden",
                      position: "relative", background: "rgba(255,255,255,0.72)",
                      backdropFilter: "blur(14px)", border: "none",
                      boxShadow: "0 10px 36px rgba(11,31,58,0.12), 0 2px 8px rgba(11,31,58,0.06)",
                    }}
                  >
                    <Image src={m.image} alt={m.alt} fill sizes="280px"
                      className="object-cover" style={{ borderRadius: 20 }} />
                    {m.contentOverlay}
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
                      background: "linear-gradient(135deg,rgba(212,175,55,0.08) 0%,transparent 50%)",
                    }} />
                  </motion.div>
                </foreignObject>
              </g>
            );
          })}

          {/* ── Gold coin — moves with scroll ── */}
          <motion.g style={{ x: coinX, y: coinY }}>
            {/* Pulse halo */}
            <circle cx="24" cy="24" r="30" fill="rgba(212,175,55,0.15)" filter="url(#avatarGlow)">
              <animate attributeName="r"       values="24;38;24" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="24" cy="24" r="22" fill="url(#coinFill)" />
            <circle cx="24" cy="24" r="17" fill="none" stroke="#FFE8A0" strokeWidth="1.5" opacity="0.6" />
            <text x="24" y="29.5" textAnchor="middle" fontSize="15"
              fontWeight="bold" fill="#7A5C0A" fontFamily="serif">₹</text>
          </motion.g>
        </svg>
      </div>

      {/* ════════════════════ MOBILE (< md) ════════════════════ */}
      <div ref={mobWrapRef} className="relative md:hidden px-2">
        <svg viewBox={`0 0 120 ${MOBILE_VBOX_H}`} className="absolute left-0 top-0"
          style={{ width: "120px", height: `${MOBILE_VBOX_H}px`, overflow: "visible" }}>
          <defs>
            <radialGradient id="coinFillMob" cx="38%" cy="32%" r="65%">
              <stop offset="0%"   stopColor="#FFE066" />
              <stop offset="60%"  stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9A7B1A" />
            </radialGradient>
          </defs>

          <path ref={mobPathRef} d={MOBILE_PATH}
            stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="10 6"
            fill="none" strokeLinecap="round" opacity="0.55" />

          {milestones.map((_, i) => (
            <g key={i}>
              <circle cx={60} cy={MOB_START_Y + i * MOB_SPACING} r={13}
                fill="#D4AF37" stroke="#FFE066" strokeWidth="2" />
              <text x={60} y={MOB_START_Y + i * MOB_SPACING + 4} textAnchor="middle"
                fontSize="10" fontWeight="bold" fill="#0B1F3A" fontFamily="sans-serif">{i + 1}</text>
            </g>
          ))}

          <motion.g style={{ x: mobCoinX, y: mobCoinY }}>
            <circle cx="18" cy="18" r="24" fill="rgba(212,175,55,0.2)">
              <animate attributeName="r"       values="20;30;20" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="18" cy="18" r="17" fill="url(#coinFillMob)" />
            <circle cx="18" cy="18" r="13" fill="none" stroke="#FFE8A0" strokeWidth="1.2" opacity="0.6" />
            <text x="18" y="22" textAnchor="middle" fontSize="11"
              fontWeight="bold" fill="#7A5C0A" fontFamily="serif">₹</text>
          </motion.g>
        </svg>

        <div className="ml-[110px] space-y-8 py-4 pr-2">
          {milestones.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.55, type: "spring", bounce: 0.25, delay: i * 0.04 }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: 190, background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(12px)", border: "none",
                boxShadow: "0 8px 24px rgba(11,31,58,0.10)",
              }}
            >
              <Image src={m.image} alt={m.alt} fill sizes="80vw" className="object-cover" />
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(135deg,rgba(212,175,55,0.08) 0%,transparent 60%)",
              }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom dot trail */}
      <div className="flex justify-center gap-3 mt-14">
        {milestones.map((_, i) => (
          <motion.div key={i}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }} transition={{ delay: i * 0.07, type: "spring", bounce: 0.5 }}
            className="rounded-full"
            style={{
              width:  i === 0 || i === milestones.length - 1 ? 12 : 7,
              height: i === 0 || i === milestones.length - 1 ? 12 : 7,
              background: i === 0 || i === milestones.length - 1 ? "#D4AF37" : "rgba(212,175,55,0.4)",
              boxShadow: i === 0 || i === milestones.length - 1 ? "0 0 8px rgba(212,175,55,0.6)" : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
}
