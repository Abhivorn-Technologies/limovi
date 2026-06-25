"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

import Image from "next/image";

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    image:   "/images/icon_invest.png",
    step:    "01",
    title:   "Invest",
    desc:    "Cash, Jewellery,\nCoins or Bars",
    accentBg: "#FFFFFF",
    accentBorder: "rgba(212,175,55,0.25)",
  },
  {
    image:   "/images/icon_vault.png",
    step:    "02",
    title:   "Choose Strategy",
    desc:    "Pick the strategy\nthat suits you",
    accentBg: "#FFFFFF",
    accentBorder: "rgba(43,127,232,0.2)",
  },
  {
    image:   "/images/icon_gold_balance.png",
    step:    "03",
    title:   "Gold Balance",
    desc:    "Convert into a\nGold Balance",
    accentBg: "#FFFFFF",
    accentBorder: "rgba(212,175,55,0.3)",
  },
  {
    image:   "/images/icon_gift.png",
    step:    "04",
    title:   "Unlock Benefits",
    desc:    "Access loans, liquidity,\nexperiences & more",
    accentBg: "#FFFFFF",
    accentBorder: "rgba(0,92,185,0.2)",
  },
];

// ─── Mini Gold Sphere ─────────────────────────────────────────────────────────
function MiniGoldSphere() {
  return (
    <motion.div
      className="relative rounded-full flex items-center justify-center select-none"
      style={{
        width: 64,
        height: 64,
        background: `radial-gradient(circle at 34% 28%, #FFF8DC 0%, ${C.goldBright} 18%, ${C.gold} 44%, #9A7B1A 70%, #3E2C06 100%)`,
        boxShadow: `0 0 0 1px rgba(212,175,55,0.3), 0 4px 20px rgba(212,175,55,0.5), inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 4px 10px rgba(255,240,160,0.5)`,
      }}
      animate={{
        boxShadow: [
          `0 0 0 1px rgba(212,175,55,0.3), 0 4px 20px rgba(212,175,55,0.45), inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 4px 10px rgba(255,240,160,0.5)`,
          `0 0 0 1px rgba(212,175,55,0.55), 0 6px 32px rgba(212,175,55,0.7), inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 4px 10px rgba(255,240,160,0.5)`,
          `0 0 0 1px rgba(212,175,55,0.3), 0 4px 20px rgba(212,175,55,0.45), inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 4px 10px rgba(255,240,160,0.5)`,
        ],
        y: [0, -4, 0],
      }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute rounded-full" style={{
        top: "12%", left: "18%", width: "30%", height: "20%",
        background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 70%)",
        filter: "blur(1px)",
      }} />
      <span className="relative z-10 font-black text-[8px] tracking-widest" style={{ color: "rgba(30,16,2,0.5)" }}>GB</span>
    </motion.div>
  );
}

// ─── Dashed arrow connector ───────────────────────────────────────────────────
function Arrow({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="hidden lg:flex items-center justify-center self-center" style={{ minWidth: 40, flexShrink: 0 }}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
        style={{ transformOrigin: "left center" }}
        className="flex items-center"
      >
        {/* Dashed line */}
        <motion.div
          style={{
            width: 28,
            height: 0,
            borderTop: "1.5px dashed",
            borderImage: `linear-gradient(90deg, rgba(212,175,55,0.5), rgba(43,127,232,0.5)) 1`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        />
        {/* Arrow head */}
        <div style={{
          width: 0, height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: "8px solid rgba(212,175,55,0.55)",
          marginLeft: -1,
          flexShrink: 0,
        }} />
      </motion.div>
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({ step, title, desc, image, accentBg, accentBorder, delay }: (typeof STEPS)[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="flex flex-col items-center text-center flex-1"
      style={{ minWidth: 120, maxWidth: 180 }}
    >
      {/* Icon container */}
      <div
        className="relative mb-4 flex items-center justify-center rounded-[20px] overflow-hidden"
        style={{
          width: 86,
          height: 86,
          background: accentBg,
          border: `1.5px solid ${accentBorder}`,
          boxShadow: "0 6px 20px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.02)",
        }}
      >
        <Image src={image} alt={title} width={64} height={64} style={{ objectFit: "contain" }} className="w-16 h-16 pointer-events-none" />
      </div>

      {/* Title */}
      <h3 className="font-bold mb-1" style={{ fontSize: "0.9rem", color: C.textDark }}>
        {title}
      </h3>
      {/* Description */}
      <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: C.textFaint }}>
        {desc}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: "linear-gradient(180deg, #EEF4FF 0%, #F8FAFC 45%, #FFFFFF 100%)",
      }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,92,185,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-5">
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: C.primary }}>
              How Limovi Works
            </span>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
          </div>

          <h2 className="font-black tracking-tight mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: C.textDark }}>
            Simple Steps.{" "}
            <span style={{
              background: `linear-gradient(135deg, ${C.goldBright}, ${C.gold}, ${C.goldDeep})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Limitless Benefits.
            </span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: C.textFaint }}>
            Five elegant steps from your gold asset to a fully active wealth ecosystem.
          </p>
        </motion.div>

        {/* Steps row */}
        <div
          className="flex flex-col items-center gap-8 lg:gap-0 lg:flex-row lg:items-start lg:justify-center"
          style={{ maxWidth: 960, margin: "0 auto" }}
        >
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex flex-row lg:flex-row items-center flex-1">
              <StepCard {...s} delay={0.1 + i * 0.12} />
              {i < STEPS.length - 1 && <Arrow delay={0.18 + i * 0.12} />}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full font-bold text-sm tracking-wide text-white"
            style={{
              background: `linear-gradient(135deg, ${C.primary} 0%, ${C.secondary} 100%)`,
              boxShadow: "0 8px 28px rgba(0,92,185,0.38), 0 2px 8px rgba(43,127,232,0.22)",
            }}
          >
            Start Your Gold Journey
          </motion.button>
          <p className="text-xs" style={{ color: C.textFaint }}>
            No fees to start · 100% Insured · RBI Compliant
          </p>
        </motion.div>
      </div>
    </section>
  );
}
