"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── Brand colours ──────────────────────────────────────────────────────────
const GOLD       = "#D4AF37";
const GOLD_LIGHT = "#F4C430";
const BLUE_DARK  = "#003D80";
const BLUE_MID   = "#005CB9";

// ─── Milestones ─────────────────────────────────────────────────────────────
const milestones = [
  {
    step: "01",
    image: "/images/journey-1.png",
    alt: "Your Gold Reimagined",
  },
  {
    step: "02",
    image: "/images/journey-2-strategy.png",
    alt: "Enroll by choosing strategy",
  },
  {
    step: "03",
    image: "/images/journey-3.png",
    alt: "Jewellery Cloud",
  },
  {
    step: "04",
    image: "/images/journey-4.png",
    alt: "Instant Loans & Instant Liquidity",
  },
  {
    step: "05",
    image: "/images/journey-5-v2.png",
    alt: "Wealth Generation",
  },
  {
    step: "06",
    image: "/images/journey-6-v2.png",
    alt: "Gift Gold Balance",
  },
  {
    step: "07",
    image: "/images/journey-7-v2.png",
    alt: "One Dashboard",
  },
  {
    step: "08",
    image: "/images/journey-8-v2.png",
    alt: "Secure & Trusted",
  },
];

// ─── Single timeline card ────────────────────────────────────────────────────
function TimelineCard({
  m,
  i,
  isLast,
}: {
  m: (typeof milestones)[0];
  i: number;
  isLast: boolean;
}) {
  const isLeft = i % 2 === 0; // even → card on left, odd → card on right
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  return (
    <div ref={ref} className="relative flex items-start" style={{ minHeight: 180 }}>

      {/* ── Left half ── */}
      <div className="flex-1 flex justify-end pr-4 md:pr-10 pt-2">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[440px]"
          >
            <Card m={m} isLast={isLast} />
          </motion.div>
        )}
      </div>

      {/* ── Centre line + dot ── */}
      <div className="flex flex-col items-center z-10" style={{ width: 44, flexShrink: 0 }}>
        {/* Dot with step number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.1, type: "spring", bounce: 0.5 }}
          className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs text-[#003D80] shadow-md"
          style={{
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
            boxShadow: `0 0 0 4px ${GOLD}30, 0 4px 14px ${GOLD}50`,
            marginTop: 14,
          }}
        >
          {parseInt(m.step)}
        </motion.div>
      </div>

      {/* ── Right half ── */}
      <div className="flex-1 flex justify-start pl-4 md:pl-10 pt-2">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[440px]"
          >
            <Card m={m} isLast={isLast} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Card content (Zero cropping, seamless fit) ──────────────────────────────
function Card({
  m,
  isLast,
}: {
  m: (typeof milestones)[0];
  isLast: boolean;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-[#FDFBF7] border border-amber-100/60"
      style={{
        boxShadow: isLast
          ? `0 8px 40px rgba(212,175,55,0.25), 0 2px 12px rgba(0,0,0,0.06)`
          : `0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`,
      }}
    >
      <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#FDFBF7]">
        <Image
          src={m.image}
          alt={m.alt}
          fill
          sizes="(max-width:768px) 90vw, 440px"
          className="object-contain p-2"
        />
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function GoldJourney() {
  return (
    <section className="relative bg-[#FAFAF8] overflow-hidden py-20 md:py-24">
      {/* Subtle background blobs */}
      <div
        className="pointer-events-none absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD}30 0%, transparent 65%)` }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-48 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE_MID}30 0%, transparent 65%)` }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 text-center mb-16 md:mb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: `${GOLD}18`,
              color: GOLD,
              border: `1px solid ${GOLD}35`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: GOLD }}
            />
            The Gold Ecosystem
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Your{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gold Journey
            </span>
          </h2>

          <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            Eight simple steps that transform your idle gold into a complete living ecosystem.
          </p>
        </motion.div>
      </div>

      {/* ── Timeline ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6">
        {/* Vertical centre line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${GOLD}60 6%, ${GOLD}50 94%, transparent)`,
          }}
        />

        <div className="flex flex-col gap-10 md:gap-14">
          {milestones.map((m, i) => (
            <TimelineCard
              key={i}
              m={m}
              i={i}
              isLast={i === milestones.length - 1}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
