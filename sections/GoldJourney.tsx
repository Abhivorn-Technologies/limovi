"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

// ─── Brand colours ─────────────────────────────────────────────────────────────
const GOLD       = "#D4AF37";
const GOLD_LIGHT = "#FFE066";
const BLUE_DARK  = "#003D80";
const BLUE_MID   = "#005CB9";
const BLUE_LIGHT = "#2B7FE8";

// ─── Milestones ────────────────────────────────────────────────────────────────
const milestones = [
  {
    step: "01",
    image: "/images/journey-1.png",
    alt: "Your Gold Reimagined",
    title: "Your Gold. Reimagined.",
    description:
      "Transform your gold from a dead asset sitting in lockers into a living, working ecosystem that earns, experiences, and grows — all from one intelligent platform.",
    tag: "Foundation",
  },
  {
    step: "02",
    image: "/images/journey-2.png",
    alt: "Enrol Your Gold",
    title: "Enrol Your Gold",
    description:
      "Convert your jewellery, coins, or cash into a verified digital gold balance in a few simple steps. Choose your strategy — Investment Only, Enrol & Experience, or both.",
    tag: "Onboarding",
  },
  {
    step: "03",
    image: "/images/journey-3.png",
    alt: "Jewellery Cloud",
    title: "Jewellery Cloud",
    description:
      "Access hundreds of curated jewellery designs. Wear, enjoy, and return — it's jewellery without ownership. Rotate your collection endlessly with your gold balance.",
    tag: "Experience",
  },
  {
    step: "04",
    image: "/images/journey-4.png",
    alt: "Instant Liquidity",
    title: "Instant Liquidity",
    description:
      "Get instant loans against your gold balance through our NBFC partners. No paperwork, no waiting — fast, digital access to funds whenever you need them.",
    tag: "Liquidity",
  },
  {
    step: "05",
    image: "/images/journey-5.png",
    alt: "Wealth Generation",
    title: "Wealth Generation",
    description:
      "Your gold earns for you. Receive rental income when your jewellery is worn by others. Turn a static asset into a recurring revenue stream — passively and securely.",
    tag: "Earnings",
  },
  {
    step: "06",
    image: "/images/journey-6.png",
    alt: "Gift Gold Balance",
    title: "Gift Gold Balance",
    description:
      "Gift wealth, not just things. Send digital gold balance to your loved ones instantly — perfect for birthdays, weddings, and festivals. Meaningful giving, done digitally.",
    tag: "Gifting",
  },
  {
    step: "07",
    image: "/images/journey-7.png",
    alt: "One Dashboard",
    title: "One Dashboard. All Access.",
    description:
      "Manage investments, jewellery experiences, loans, liquidity, and earnings — all from one intelligent dashboard. Total visibility, total control, one place.",
    tag: "Control",
  },
  {
    step: "08",
    image: "/images/journey-8.png",
    alt: "Secure & Trusted",
    title: "Secure. Compliant. Trusted.",
    description:
      "Built on SEBI, RBI, and BIS compliance with certified vault partners and enterprise-grade security. Your gold is always protected — no exceptions.",
    tag: "Security",
  },
];

// ─── Per-card stacking animation ──────────────────────────────────────────────
interface StackCardProps {
  m: (typeof milestones)[0];
  i: number;
  total: number;
  progress: MotionValue<number>;
}

function StackCard({ m, i, total, progress }: StackCardProps) {
  const isEven = i % 2 === 0;

  // Build multi-point ranges so this card continuously shrinks as
  // each subsequent card slides on top of it.
  const remaining = total - i;
  const scalePts = Array.from({ length: remaining }, (_, j) =>
    Math.max(0.78, 1 - j * 0.046)
  );
  const yPts = Array.from({ length: remaining }, (_, j) => -j * 20);
  const inputPts = Array.from({ length: remaining }, (_, j) =>
    (i + j) / total
  );

  const scale   = useTransform(progress, inputPts, scalePts);
  const y       = useTransform(progress, inputPts, yPts);

  return (
    <div
      className="sticky flex items-center justify-center px-4 md:px-10"
      style={{
        top: "88px",
        height: "calc(100vh - 88px)",
        zIndex: i + 1,
      }}
    >
      <motion.div
        style={{ scale, y }}
        className={`
          w-full max-w-5xl rounded-2xl md:rounded-[28px] overflow-hidden
          flex flex-col md:flex-row
          ${!isEven ? "md:flex-row-reverse" : ""}
        `}
        whileHover={{
          boxShadow: `0 28px 80px rgba(0,0,0,0.38), 0 0 0 1.5px ${GOLD}50`,
          transition: { duration: 0.25 },
        }}
      >
        {/* ── Image panel ── */}
        <div
          className="relative w-full md:w-[46%] min-h-[200px] md:min-h-0 flex-shrink-0 overflow-hidden"
          style={{ background: "#F1F5F9" }}
        >
          <Image
            src={m.image}
            alt={m.alt}
            fill
            sizes="(max-width:768px) 100vw, 46vw"
            className="object-cover"
          />
          {/* Directional gold shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isEven
                ? "linear-gradient(to right, rgba(212,175,55,0.14) 0%, transparent 65%)"
                : "linear-gradient(to left,  rgba(212,175,55,0.14) 0%, transparent 65%)",
            }}
          />
          {/* Tag chip */}
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{
              background: BLUE_MID,
              color: "white",
              boxShadow: `0 3px 10px rgba(0,92,185,0.45)`,
            }}
          >
            {m.tag}
          </span>
        </div>

        {/* ── Text panel ── */}
        <div className="flex-1 flex items-center p-7 md:p-10 lg:p-14 bg-white relative overflow-hidden">
          {/* Faint step-number watermark */}
          <span
            className="absolute -bottom-4 right-4 font-black select-none pointer-events-none leading-none"
            style={{
              fontSize: "9rem",
              color: `${BLUE_MID}08`,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {m.step}
          </span>

          <div className="relative w-full">
            {/* Step label */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black"
                style={{ background: GOLD, color: BLUE_DARK }}
              >
                {parseInt(m.step)}
              </div>
              <span
                className="text-[11px] font-black tracking-[0.2em] uppercase"
                style={{ color: BLUE_MID }}
              >
                Step {m.step}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-2xl md:text-3xl lg:text-[2rem] font-bold leading-tight mb-3"
              style={{ color: BLUE_DARK }}
            >
              {m.title}
            </h3>

            {/* Gold divider */}
            <div
              className="h-[2.5px] w-10 rounded-full mb-5"
              style={{
                background: `linear-gradient(to right, ${GOLD}, ${GOLD_LIGHT})`,
              }}
            />

            {/* Description */}
            <p className="text-slate-500 text-[15px] md:text-base leading-relaxed max-w-md">
              {m.description}
            </p>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mt-8">
              {milestones.map((_, j) => (
                <div
                  key={j}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  j === i ? 22 : 6,
                    height: 6,
                    background:
                      j === i
                        ? GOLD
                        : j < i
                        ? BLUE_LIGHT
                        : "#E2E8F0",
                  }}
                />
              ))}
              <span
                className="ml-2 text-xs font-semibold"
                style={{ color: BLUE_MID }}
              >
                {i + 1} / {total}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
const SCROLL_PER_CARD = 680; // px of scroll range per card
const TOTAL_HEIGHT    = milestones.length * SCROLL_PER_CARD + 300;

export function GoldJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      style={{
        background: `linear-gradient(160deg, ${BLUE_DARK} 0%, ${BLUE_MID} 52%, ${BLUE_DARK} 100%)`,
      }}
    >
      {/* ── Ambient blobs ── */}
      <div
        className="pointer-events-none absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 65%)` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-64 w-[560px] h-[560px] rounded-full opacity-15 blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE_LIGHT} 0%, transparent 65%)` }}
      />
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 text-center pt-24 pb-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(212,175,55,0.15)",
              color: GOLD_LIGHT,
              border: "1px solid rgba(212,175,55,0.35)",
            }}
          >
            The Gold Ecosystem
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Your{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gold Journey
            </span>
          </h2>

          <p className="mt-4 text-white/60 max-w-xl mx-auto text-base md:text-lg">
            Scroll through eight steps that transform your idle gold into a
            complete living ecosystem.
          </p>

          {/* Scroll cue */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-1.5"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">
              Scroll to explore
            </span>
            <div
              className="w-px h-8 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stacked cards scroll container ── */}
      <div
        ref={sectionRef}
        className="relative z-10"
        style={{ height: `${TOTAL_HEIGHT}px` }}
      >
        {milestones.map((m, i) => (
          <StackCard
            key={i}
            m={m}
            i={i}
            total={milestones.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {/* ── Bottom progress dots ── */}
      <div className="relative z-10 flex justify-center gap-2.5 pb-16 pt-4">
        {milestones.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.06, type: "spring", bounce: 0.5 }}
            className="rounded-full"
            style={{
              width:
                i === 0 || i === milestones.length - 1 ? 12 : 7,
              height:
                i === 0 || i === milestones.length - 1 ? 12 : 7,
              background:
                i === 0 || i === milestones.length - 1
                  ? GOLD
                  : "rgba(212,175,55,0.38)",
              boxShadow:
                i === 0 || i === milestones.length - 1
                  ? "0 0 10px rgba(212,175,55,0.7)"
                  : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
}
