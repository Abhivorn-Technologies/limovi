"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Crown, Gem, Sparkles, TrendingUp, ArrowRight, CheckCircle2, XCircle, X, ChevronRight } from "lucide-react";

// ── Journey Moments ──────────────────────────────────────────────
const JOURNEY = [
  {
    number: "01",
    eyebrow: "Foundation",
    headline: "Your Gold, Your Balance",
    body: "Convert any form of gold—cash, jewellery, coins or bars—into a unified Gold Balance. This becomes the key that unlocks the entire LIMOVI ecosystem.",
    visual: "bg-gradient-to-br from-[#D4AF37]/20 via-[#B8860B]/10 to-transparent",
    accent: "#D4AF37",
    tag: "50g min · 24K equivalent",
  },
  {
    number: "02",
    eyebrow: "Discovery",
    headline: "A Cloud Full of Luxury",
    body: "Browse an exclusive catalogue of premium jewellery—bridal sets, temple pieces, everyday elegance, and custom designs—stored in LIMOVI's secure Jewellery Cloud.",
    visual: "bg-gradient-to-br from-[#005CB9]/20 via-[#1a56db]/10 to-transparent",
    accent: "#4DA3FF",
    tag: "Hundreds of designs · Updated every season",
  },
  {
    number: "03",
    eyebrow: "Experience",
    headline: "One Tap. Your Door. Your Occasion.",
    body: "Select any design, request it through the app. LIMOVI retrieves it from the vault, verifies its quality, fully insures it, and delivers it straight to you. No paperwork. No hassle.",
    visual: "bg-gradient-to-br from-purple-600/20 via-purple-800/10 to-transparent",
    accent: "#A78BFA",
    tag: "Insured delivery · Quality verified",
  },
  {
    number: "04",
    eyebrow: "The Cycle",
    headline: "Return. Refresh. Repeat.",
    body: "Worn it. Loved it. Return it. Your Gold Balance stays intact, ready for your next occasion—a different design, a different season, a different you.",
    visual: "bg-gradient-to-br from-emerald-600/20 via-emerald-800/10 to-transparent",
    accent: "#34D399",
    tag: "Unlimited cycles · Balance never expires",
  },
];

// ── Plans ────────────────────────────────────────────────────────
type Benefit = { label: string; desc: string; eligible: boolean };

const BENEFITS_LABELS = [
  "Jewellery Experience",
  "Instant Loans",
  "Instant Liquidity",
  "Gift Gold Balance",
  "Jewellery as an Asset",
];

const PLANS = [
  {
    id: "investment-only",
    name: "Investment Only",
    tagline: "Pure capital appreciation backed by 24K gold.",
    shortDesc: "Grow your gold, experience luxury on your terms.",
    icon: TrendingUp,
    accent: "#D4AF37",
    entryLabel: "Invest",
    entryDetail: "Min. 50g of 24K gold equivalent",
    fee: "0.9% + ₹1,099",
    feeLabel: "per jewellery experience",
    highlight: false,
    benefits: [
      { label: "Jewellery Experience", desc: "0.9% of selected jewellery value + ₹1,099 service fee per occasion", eligible: true },
      { label: "Instant Loans", desc: "Gold Balance-backed loans deposited to your bank within minutes", eligible: true },
      { label: "Instant Liquidity", desc: "Sell your Gold Balance instantly, credited to your bank account", eligible: true },
      { label: "Gift Gold Balance", desc: "Transfer your Gold Balance to family or loved ones for all 5 benefits", eligible: true },
      { label: "Jewellery as an Asset", desc: "Not eligible — Investment Only holds pure 24K gold, not a jewellery asset", eligible: false },
    ] as Benefit[],
  },
  {
    id: "investment-experience",
    name: "Investment & Experience",
    tagline: "The complete luxury membership — zero experience charges.",
    shortDesc: "Invest, wear endlessly, and earn when others choose your piece.",
    icon: Crown,
    accent: "#D4AF37",
    entryLabel: "Invest",
    entryDetail: "Min. 50g of 24K · 20% experience charge + 14% making charges at onboarding",
    fee: "₹1,499",
    feeLabel: "per experience · zero % charges",
    highlight: true,
    benefits: [
      { label: "Jewellery Experience", desc: "No experience percentage charges — only ₹1,499 per occasion, unlimited rotations", eligible: true },
      { label: "Instant Loans", desc: "Gold Balance-backed loans deposited to your bank within minutes", eligible: true },
      { label: "Instant Liquidity", desc: "Sell your Gold Balance instantly, credited to your bank account", eligible: true },
      { label: "Gift Gold Balance", desc: "Transfer your Gold Balance to family or loved ones for all 5 benefits", eligible: true },
      { label: "Jewellery as an Asset", desc: "Earn 35% of experience charges whenever another customer selects your jewellery", eligible: true },
    ] as Benefit[],
  },
  {
    id: "enrol-experience",
    name: "Enrol & Experience",
    tagline: "Bring your existing jewellery. Wear new. Earn in return.",
    shortDesc: "Turn your locked jewellery into a living, earning asset.",
    icon: Sparkles,
    accent: "#A78BFA",
    entryLabel: "Enrol",
    entryDetail: "Existing jewellery worth ≥ 50g of 24K gold",
    fee: "0.9% + ₹1,099",
    feeLabel: "per experience · earn 35% back",
    highlight: false,
    benefits: [
      { label: "Jewellery Experience", desc: "0.9% of selected jewellery value + ₹1,099 service fee per occasion", eligible: true },
      { label: "Instant Loans", desc: "Gold Balance-backed loans deposited to your bank within minutes", eligible: true },
      { label: "Instant Liquidity", desc: "Sell your Gold Balance instantly, credited to your bank account", eligible: true },
      { label: "Gift Gold Balance", desc: "Transfer your Gold Balance to family or loved ones for all 5 benefits", eligible: true },
      { label: "Jewellery as an Asset", desc: "Earn 35% of experience charges whenever another customer selects your enrolled jewellery", eligible: true },
    ] as Benefit[],
  },
  {
    id: "experience-only",
    name: "Experience Only",
    tagline: "Short-duration access. Pure luxury on demand.",
    shortDesc: "Ideal for one-time occasions — experience without long-term commitment.",
    icon: Gem,
    accent: "#4DA3FF",
    entryLabel: "Invest",
    entryDetail: "Min. 50g of 24K · 24–30 hour experience window",
    fee: "0.9% + ₹1,099",
    feeLabel: "per experience · short duration",
    highlight: false,
    benefits: [
      { label: "Jewellery Experience", desc: "0.9% of selected jewellery value + ₹1,099 service fee for a 24–30 hour experience", eligible: true },
      { label: "Instant Loans", desc: "Gold Balance-backed loans deposited to your bank within minutes", eligible: true },
      { label: "Instant Liquidity", desc: "Sell your Gold Balance instantly, credited to your bank account", eligible: true },
      { label: "Gift Gold Balance", desc: "Not eligible — short-duration investment window does not support gifting", eligible: false },
      { label: "Jewellery as an Asset", desc: "Not eligible — short-duration investment window does not qualify for asset earning", eligible: false },
    ] as Benefit[],
  },
];

export function JewelleryExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePlan, setActivePlan] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineH = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section id="jewellery-experience" ref={sectionRef} className="bg-[#040F1D] relative overflow-hidden">

      {/* ── AMBIENT GLOWS ───────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#D4AF37]/4 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#005CB9]/6 blur-[150px] rounded-full" />

      {/* ── EDITORIAL HERO ──────────────────────────────────────── */}
      <div className="relative border-b border-white/5 px-6 md:px-16 lg:px-24 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <Crown size={16} className="text-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37]">
                Jewellery Experience
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-8"
            >
              Wear Luxury.
              <br />
              <span style={{
                background: "linear-gradient(100deg,#D4AF37 30%,#F4C430 60%,#D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Own Nothing.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium max-w-xl"
            >
              Your Gold Balance is a key to an entire world of premium jewellery. 
              Every occasion, a new design. Every design, delivered to your door. 
              No purchase. No regret. Just pure luxury.
            </motion.p>
          </div>

          {/* Stat column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 lg:items-end"
          >
            {[
              { value: "500+", label: "Exclusive Designs" },
              { value: "5 min", label: "Request to Confirm" },
              { value: "100%", label: "Insured Delivery" },
            ].map((s, i) => (
              <div key={i} className="text-left lg:text-right">
                <div
                  className="text-3xl font-black"
                  style={{
                    background: "linear-gradient(90deg,#D4AF37,#F4C430)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── THE JOURNEY (Editorial timeline) ───────────────────── */}
      <div className="px-6 md:px-16 lg:px-24 py-24 lg:py-32 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-20"
        >
          The Journey
        </motion.p>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 top-0 w-px h-full bg-white/5 hidden lg:block" />
          <motion.div
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#D4AF37] to-purple-500 origin-top hidden lg:block"
            style={{ height: lineH }}
          />

          <div className="flex flex-col gap-0">
            {JOURNEY.map((j, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="group relative flex flex-col lg:flex-row gap-8 lg:gap-20 py-12 lg:py-16 lg:pl-16 border-b border-white/5 last:border-b-0"
              >
                {/* Number + eyebrow */}
                <div className="flex-shrink-0 lg:w-48">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-1">
                    <span
                      className="font-black text-5xl lg:text-7xl leading-none opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ color: j.accent }}
                    >
                      {j.number}
                    </span>
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.25em] lg:mt-2"
                      style={{ color: j.accent }}
                    >
                      {j.eyebrow}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight group-hover:text-white/90 transition-colors">
                      {j.headline}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-lg">{j.body}</p>
                  </div>

                  {/* Tag pill */}
                  <div
                    className={`flex-shrink-0 self-start lg:self-center px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest whitespace-nowrap ${j.visual} border`}
                    style={{ borderColor: j.accent + "33", color: j.accent }}
                  >
                    {j.tag}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PLANS ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-16 lg:px-24 pb-24 lg:pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4"
            >
              Access Strategies
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-white leading-tight"
            >
              Choose Your{" "}
              <span style={{ background: "linear-gradient(90deg,#D4AF37,#F4C430)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Strategy
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm max-w-sm"
          >
            Every strategy unlocks the full Jewellery Cloud. Each comes with its own set of benefits and earning potential.
          </motion.p>
        </div>

        {/* 4-column plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {PLANS.map((p, i) => {
            const Icon = p.icon;
            const eligibleCount = p.benefits.filter(b => b.eligible).length;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative rounded-3xl border flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  p.highlight
                    ? "border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
                    : "border-white/8 hover:border-white/16"
                }`}
                style={{ background: p.highlight ? "linear-gradient(160deg,rgba(212,175,55,0.08) 0%,rgba(4,15,29,1) 60%)" : "rgba(255,255,255,0.02)" }}
              >
                {p.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: p.accent + "18", border: `1px solid ${p.accent}30` }}>
                      <Icon size={18} style={{ color: p.accent }} />
                    </div>
                    {p.highlight && (
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-[#D4AF37] text-[#040F1D]">
                        Best Value
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-white text-base mb-1 leading-tight">{p.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-5">{p.shortDesc}</p>

                  {/* Entry requirement */}
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: p.accent + "80" }}>
                    {p.entryLabel} Required
                  </div>
                  <div className="text-xs text-slate-500 mb-5 pb-5 border-b border-white/5">{p.entryDetail}</div>

                  {/* Quick benefit badges */}
                  <div className="flex items-center gap-1 flex-wrap mb-5">
                    {p.benefits.map((b, bi) => (
                      <span key={bi} className={`w-5 h-5 rounded-full flex items-center justify-center ${b.eligible ? "bg-emerald-500/20" : "bg-white/5"}`}>
                        {b.eligible
                          ? <CheckCircle2 size={12} className="text-emerald-400" />
                          : <XCircle size={12} className="text-slate-700" />
                        }
                      </span>
                    ))}
                    <span className="text-[10px] text-slate-500 ml-1">{eligibleCount}/5 benefits</span>
                  </div>

                  {/* Fee */}
                  <div className="mt-auto">
                    <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-0.5">Experience fee</div>
                    <div className="font-black text-xl text-white mb-0.5">{p.fee}</div>
                    <div className="text-[10px] text-slate-600">{p.feeLabel}</div>
                  </div>
                </div>

                {/* Explore More button */}
                <button
                  onClick={() => setActivePlan(activePlan === i ? null : i)}
                  className="flex items-center justify-between px-6 py-4 border-t border-white/5 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-white/3"
                  style={{ color: p.accent }}
                >
                  <span>Explore Strategy</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${activePlan === i ? "rotate-90" : ""}`}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ── DESKTOP: Inline expand panel (md+) ── */}
        <AnimatePresence>
          {activePlan !== null && (
            <motion.div
              key={`desktop-panel-${activePlan}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block rounded-3xl border border-white/10 overflow-hidden mt-4"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5"
                style={{ background: PLANS[activePlan].accent + "08" }}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = PLANS[activePlan].icon;
                    return (
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: PLANS[activePlan].accent + "20", border: `1px solid ${PLANS[activePlan].accent}30` }}>
                        <Icon size={16} style={{ color: PLANS[activePlan].accent }} />
                      </div>
                    );
                  })()}
                  <div>
                    <div className="font-black text-white">{PLANS[activePlan].name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{PLANS[activePlan].tagline}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-0.5">Experience Fee</div>
                    <div className="font-black text-white text-base">{PLANS[activePlan].fee}
                      <span className="text-slate-500 font-normal text-xs ml-1">{PLANS[activePlan].feeLabel}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePlan(null)}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* 5 benefits in a row */}
              <div className="grid grid-cols-5 divide-x divide-white/5">
                {PLANS[activePlan].benefits.map((b, bi) => (
                  <div key={bi} className={`p-6 flex flex-col gap-3 ${!b.eligible ? "opacity-40" : ""}`}>
                    <div className="flex items-center gap-2">
                      {b.eligible
                        ? <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                        : <XCircle size={15} className="text-slate-600 flex-shrink-0" />
                      }
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{bi + 1}</span>
                    </div>
                    <div className="font-bold text-sm text-white leading-tight">{b.label}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                    {!b.eligible && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold uppercase tracking-wide self-start">Not Eligible</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MOBILE: Bottom-sheet modal (below md) ── */}
        <AnimatePresence>
          {activePlan !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePlan(null)}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
              />

              {/* Sheet */}
              <motion.div
                key={`sheet-${activePlan}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 280 }}
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl flex flex-col md:hidden"
                style={{ background: "#0A1628", border: "1px solid rgba(255,255,255,0.08)", height: "85vh", maxHeight: "85vh" }}
              >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = PLANS[activePlan].icon;
                      return (
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: PLANS[activePlan].accent + "20", border: `1px solid ${PLANS[activePlan].accent}30` }}>
                          <Icon size={16} style={{ color: PLANS[activePlan].accent }} />
                        </div>
                      );
                    })()}
                    <div>
                      <div className="font-black text-white text-sm">{PLANS[activePlan].name}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{PLANS[activePlan].tagline}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePlan(null)}
                    className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-slate-400 hover:bg-white/15 hover:text-white transition-all flex-shrink-0 ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Fee summary */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 flex-shrink-0"
                  style={{ background: PLANS[activePlan].accent + "08" }}>
                  <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">Experience Fee</span>
                  <span className="font-black text-white text-sm">{PLANS[activePlan].fee}
                    <span className="text-slate-500 font-normal text-[11px] ml-1">{PLANS[activePlan].feeLabel}</span>
                  </span>
                </div>

                {/* Scrollable benefits list */}
                <div
                  className="overflow-y-scroll flex-1 min-h-0 py-2"
                  style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {PLANS[activePlan].benefits.map((b, bi) => (
                    <div
                      key={bi}
                      className={`flex items-start gap-4 px-6 py-4 border-b border-white/5 last:border-b-0 ${!b.eligible ? "opacity-35" : ""}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${b.eligible ? "bg-emerald-500/15" : "bg-white/5"}`}>
                        {b.eligible
                          ? <CheckCircle2 size={15} className="text-emerald-400" />
                          : <XCircle size={15} className="text-slate-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{bi + 1}</span>
                          <span className={`font-bold text-sm leading-tight ${b.eligible ? "text-white" : "text-slate-500"}`}>{b.label}</span>
                          {!b.eligible && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold uppercase tracking-wide flex-shrink-0">Not Eligible</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}

