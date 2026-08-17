"use client";

import { motion } from "framer-motion";
import {
  Coins,
  Infinity as InfinityIcon,
  ShieldCheck,
  Zap,
  TrendingUp,
  Gift,
  Smile,
  Frown,
  Lock,
  Percent,
  ShoppingCart,
  Calendar,
  Banknote,
  HandCoins,
  TrendingDown,
  KeyRound,
  Gem,
  DoorOpen,
} from "lucide-react";

// ─── CUSTOM SVG ICONS MATCHING REFERENCE GRAPHIC EXACTLY ─────────────────────

// Coins Stack with Down Arrow Icon for Step 1 Outcome
function CoinsStackDownIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <ellipse cx="10" cy="14" rx="6" ry="2.5" stroke="#334155" strokeWidth="1.5" fill="#E2E8F0" />
      <path d="M4 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" stroke="#334155" strokeWidth="1.5" />
      <path d="M4 18v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" stroke="#334155" strokeWidth="1.5" />
      <path d="M19 10l6 6m0 0h-5m5 0v-5" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Vector Gold Balance SVG Icon in Limovi Brand Blue (#005CB9)
function BlueGoldBalanceIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <ellipse cx="16" cy="22" rx="9" ry="3.5" stroke="#005CB9" strokeWidth="1.8" fill="#EBF5FF" />
      <path d="M7 16v6c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-6" stroke="#005CB9" strokeWidth="1.8" />
      <ellipse cx="16" cy="16" rx="9" ry="3.5" stroke="#005CB9" strokeWidth="1.8" fill="#EBF5FF" />
      <path d="M7 10v6c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-6" stroke="#005CB9" strokeWidth="1.8" />
      <ellipse cx="16" cy="10" rx="9" ry="3.5" fill="#005CB9" />
    </svg>
  );
}

// Rupee / Instant Cash Icon for Milestone 4
function RupeeCoinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="12" fill="#005CB9" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#FFFFFF"
        fontFamily="sans-serif"
      >
        ₹
      </text>
    </svg>
  );
}

// ─── DATA DEFINITIONS MATCHING REFERENCE GRAPHIC EXACTLY ──────────────────────

const existingSteps = [
  {
    num: "1",
    title: "BUY GOLD JEWELLERY",
    desc: "Pay 15% – 20% making charges on every purchase.",
    icon: <ShoppingCart className="w-5.5 h-5.5 text-[#334155]" />,
    rightTag: {
      icon: <CoinsStackDownIcon className="w-6 h-6" />,
      text: "High cost every time.",
    },
  },
  {
    num: "2",
    title: "KEEP IT LOCKED",
    desc: "Jewellery stays idle in the locker. No returns. No use.",
    icon: <Lock className="w-5.5 h-5.5 text-[#334155]" />,
    rightTag: {
      icon: <Lock className="w-5 h-5 text-[#334155]" />,
      text: "Dead asset. Zero utility.",
    },
  },
  {
    num: "3",
    title: "ONE JEWELLERY EXPERIENCE",
    desc: "Limited to enjoying just one piece of jewellery.",
    icon: <Gem className="w-5.5 h-5.5 text-[#334155]" />,
    rightTag: {
      icon: <Frown className="w-5 h-5 text-[#334155]" />,
      text: "One jewellery experience.",
    },
  },
  {
    num: "4",
    title: "NEED MONEY?",
    desc: "Go for a gold loan. Limited loan value.",
    icon: <HandCoins className="w-5.5 h-5.5 text-[#334155]" />,
    rightTag: {
      icon: <Frown className="w-5 h-5 text-[#334155]" />,
      text: "Interest & fees. Financial stress.",
    },
  },
  {
    num: "5",
    title: "REPAY LOAN",
    desc: "EMI, Interest & repayment create ongoing burden.",
    icon: <Calendar className="w-5.5 h-5.5 text-[#334155]" />,
    rightTag: {
      icon: <Frown className="w-5 h-5 text-[#334155]" />,
      text: "Long process. Stress & obligation.",
    },
  },
  {
    num: "6",
    title: "REDEEM OR SELL",
    desc: "Sell jewellery or redeem gold after deductions.",
    icon: <Banknote className="w-5.5 h-5.5 text-[#334155]" />,
    rightTag: {
      icon: <Frown className="w-5 h-5 text-[#334155]" />,
      text: "Deductions, wastage & emotional loss.",
    },
  },
  {
    num: "7",
    title: "GIFT OLD JEWELLERY TO NEXT GENERATION",
    desc: "Pass down old jewellery designs to next generation.",
    icon: <Gift className="w-5.5 h-5.5 text-[#334155]" />,
    rightTag: {
      icon: <Frown className="w-5 h-5 text-[#334155]" />,
      text: "Outdated designs. High remaking costs.",
    },
  },
];


// Right Column: 7 Milestones Circular Loop Positions
const circularMilestones = [
  {
    step: "1",
    title: "INVEST IN GOLD",
    desc: "Build your 24K gold balance at best value with zero wastage.",
    icon: <BlueGoldBalanceIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    iconPos: { left: '50%', top: '10%' },
    textPosClass: "bottom-full mb-1.5 sm:mb-3 left-1/2 -translate-x-1/2 text-center w-24 sm:w-36",
  },
  {
    step: "2",
    title: "UNLOCK ECOSYSTEM",
    desc: "Your gold balance unlocks lifetime membership benefits.",
    icon: <KeyRound className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#005CB9]" />,
    iconPos: { left: '68.8%', top: '30%' },
    textPosClass: "left-full ml-1.5 sm:ml-3 top-1/2 -translate-y-1/2 text-left w-20 sm:w-28",
  },
  {
    step: "3",
    title: "EXPERIENCE LUXURY",
    desc: "Wear premium jewellery anytime without paying making charges again.",
    icon: <Gem className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#005CB9]" />,
    iconPos: { left: '69.6%', top: '66.9%' },
    textPosClass: "left-full ml-1.5 sm:ml-3 top-1/2 -translate-y-1/2 text-left w-20 sm:w-28",
  },
  {
    step: "4",
    title: "LIQUIDITY / LOANS",
    desc: "Withdraw cash instantly against your gold balance at prevailing prices.",
    icon: <RupeeCoinIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    iconPos: { left: '50%', top: '90%' },
    textPosClass: "top-full mt-1.5 sm:mt-3 left-1/2 -translate-x-1/2 text-center w-24 sm:w-32",
  },
  {
    step: "5",
    title: "GROW YOUR WEALTH",
    desc: "Your gold grows in value and beats inflation over time + earn everytime with others experience on your jewellery.",
    icon: <HandCoins className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#005CB9]" />,
    iconPos: { left: '30.4%', top: '66.9%' },
    textPosClass: "right-full mr-1.5 sm:mr-3 top-1/2 -translate-y-1/2 text-right w-20 sm:w-32",
  },
  {
    step: "6",
    title: "GIFT & SHARE GOLD ECOSYSTEM",
    desc: "Gifting a luxury memory to next generation.",
    icon: <Gift className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#005CB9]" />,
    iconPos: { left: '29.1%', top: '39.6%' },
    textPosClass: "right-full mr-1.5 sm:mr-3 top-1/2 -translate-y-1/2 text-right w-20 sm:w-36",
  },
  {
    step: "7",
    title: "EXIT ON YOUR TERMS",
    desc: "Redeem as 24K gold or get money equivalent as per policy or exit with jewellery selected.",
    icon: <DoorOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#005CB9]" />,
    iconPos: { left: '36.1%', top: '19.4%' },
    textPosClass: "right-full mr-1.5 sm:mr-3 top-1/2 -translate-y-1/2 text-right w-20 sm:w-28",
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function GoldJourney() {
  return (
    <section className="relative w-full bg-[#F8FAFC] text-[#0A1929] py-12 sm:py-16 px-3 sm:px-6 lg:px-8 overflow-hidden select-none font-sans border-t border-slate-200">
      <div className="max-w-[1600px] mx-auto">

        {/* ─── 1. TOP HEADER ─── */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1929]">
            COMPARE <span className="text-[#005CB9]">YOUR JOURNEY</span>
          </h2>
          <p className="mt-2 text-sm sm:text-lg font-medium text-slate-600">
            Choose the smarter way to grow, enjoy & access your gold.
          </p>
        </div>

        {/* ─── 2. SUB-HEADERS BAR (DESKTOP ONLY) ─── */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center mb-8 px-1">

          {/* Left Subheader */}
          <div className="lg:col-span-6 flex flex-col items-center text-center">
            <div className="bg-[#0A1929] text-white font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest px-6 sm:px-8 py-2.5 rounded-full shadow-sm">
              THE EXISTING GOLD JOURNEY
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-500 mt-1">
              Traditional. Costly. Limited.
            </span>
          </div>

          {/* Right Subheader */}
          <div className="lg:col-span-6 flex flex-col items-center text-center">
            <div className="bg-[#005CB9] text-white font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest px-6 sm:px-8 py-2.5 rounded-full shadow-sm">
              LIMOVI – THE GOLD ECOSYSTEM
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-500 mt-1">
              Smart. Integrated. Limitless.
            </span>
          </div>
        </div>

        {/* ─── 3. MAIN 3-COLUMN LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN: DASHED S-CURVE TIMELINE WITH RESPONSIVE FLEX & ZERO TRUNCATION */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 relative">

            {/* MOBILE ONLY HEADER */}
            <div className="lg:hidden flex flex-col items-center text-center mb-2 mt-4">
              <div className="bg-[#0A1929] text-white font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest px-6 sm:px-8 py-2.5 rounded-full shadow-sm">
                THE EXISTING GOLD JOURNEY
              </div>
              <span className="text-sm sm:text-base font-semibold text-slate-500 mt-1">
                Traditional. Costly. Limited.
              </span>
            </div>

            {/* Timeline Steps Container */}
            <div className="relative space-y-3.5 pl-1 sm:pl-2">

              {/* DEEP S-CURVE DASHED LINE BENDING OUTWARD IN THE MIDDLE */}
              <svg
                className="absolute left-[12px] sm:left-[14px] top-5 bottom-5 w-20 sm:w-24 h-[88%] pointer-events-none z-0 overflow-visible"
                viewBox="0 0 96 380"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M14 18 C-35 48, 85 68, 52 88"
                  stroke="#CBD5E1"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
                <path
                  d="M14 108 C-35 138, 85 158, 52 178"
                  stroke="#CBD5E1"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
                <path
                  d="M14 198 C-35 228, 85 248, 52 268"
                  stroke="#CBD5E1"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
                <path
                  d="M14 288 C-35 318, 85 338, 52 358"
                  stroke="#CBD5E1"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
              </svg>

              {existingSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  className="relative flex items-center gap-0"
                >
                  {/* Step Number Dark Circle Badge */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#334155] text-white font-bold text-[11px] sm:text-xs flex items-center justify-center shadow-xs z-10 border-2 border-white shrink-0 mr-1.5 sm:mr-2.5">
                    {step.num}
                  </div>

                  {/* Main White Card */}
                  <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xs flex items-center justify-between gap-1.5 sm:gap-2 hover:shadow-md transition-shadow z-10 min-w-0">

                    {/* Left Icon & Text Details */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      {/* Outline Icon Circle */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center shrink-0 shadow-xs">
                        {step.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[10.5px] xs:text-[11px] xl:text-xs font-extrabold text-[#0A1929] uppercase tracking-wide leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-[9.5px] sm:text-[11px] text-slate-500 font-medium leading-snug">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* S-WAVE CONNECTOR PIPE */}
                  <svg className="w-4 xs:w-5 sm:w-8 h-11 shrink-0 pointer-events-none z-20" viewBox="0 0 32 45" fill="none">
                    <path
                      d="M 0 45 H 10 C 18 45, 20 24, 26 24 H 32"
                      stroke="#CBD5E1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Right Grey Outcome Sub-Card */}
                  <div className="bg-[#F1F5F9] border border-slate-200/80 rounded-xl p-1.5 xs:p-2 sm:p-2.5 w-[95px] xs:w-[115px] xl:w-[145px] shrink-0 flex items-center gap-1.5 sm:gap-2.5 z-10">
                    <div className="shrink-0">{step.rightTag.icon}</div>
                    <span className="text-[9px] xs:text-[9.5px] xl:text-[10.5px] font-semibold text-slate-700 leading-tight">
                      {step.rightTag.text}
                    </span>
                  </div>

                  {/* Far-Right Golden Pointer Chevron on Step 3 */}
                  {idx === 2 && (
                    <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30">
                      <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-[#D97706] drop-shadow-xs" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Left RESULT Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#EBF3FA] border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center gap-3 sm:gap-4 mt-auto"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-200/80 flex items-center justify-center shrink-0 border border-slate-300 text-slate-600">
                <Frown className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="flex-1">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block mb-0.5">
                  THE RESULT
                </span>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug">
                  High cost, Locked wealth, Limited access, Financial stress.
                </p>
                <p className="text-[11px] sm:text-xs font-extrabold text-[#0A1929] mt-0.5">
                  You own gold, but gold doesn't work for you.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: LIMOVI GOLD ECONOMY CIRCULAR MILESTONE LOOP */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 flex flex-col h-full">

            {/* MOBILE ONLY HEADER */}
            <div className="lg:hidden flex flex-col items-center text-center mb-6 mt-12">
              <div className="bg-[#005CB9] text-white font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest px-6 sm:px-8 py-2.5 rounded-full shadow-sm">
                LIMOVI – THE GOLD ECOSYSTEM
              </div>
              <span className="text-sm sm:text-base font-semibold text-slate-500 mt-1">
                Smart. Integrated. Limitless.
              </span>
            </div>

            {/* Main Circular Milestone Graphic Container */}
            <div className="relative w-full h-full min-h-[500px] lg:min-h-0 bg-white border border-slate-200/90 rounded-3xl shadow-xs">

              {/* Fluid Responsive Inner Wrapper */}
              <div className="absolute inset-4 sm:inset-16 md:inset-20 lg:inset-16">

                {/* SVG ELLIPTICAL LOOP CONNECTING ARROWS */}
                <svg
                  viewBox="0 0 600 700"
                  preserveAspectRatio="none"
                  fill="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                >
                  <defs>
                    <marker
                      id="blueArrow"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 Z" fill="#005CB9" />
                    </marker>
                  </defs>

                  {/* Ellipse Guide Path */}
                  <ellipse
                    cx="300"
                    cy="350"
                    rx="130"
                    ry="280"
                    stroke="#2B7FE8"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    opacity="0.35"
                    fill="none"
                  />

                  {/* Arcs */}
                  <path d="M 324.8 75.2 A 130 280 0 0 1 405.6 186.6" stroke="#005CB9" strokeWidth="2.5" fill="none" markerEnd="url(#blueArrow)" />
                  <path d="M 418.5 234.8 A 130 280 0 0 1 422.6 443.4" stroke="#005CB9" strokeWidth="2.5" fill="none" markerEnd="url(#blueArrow)" />
                  <path d="M 412.0 492.2 A 130 280 0 0 1 324.8 624.8" stroke="#005CB9" strokeWidth="2.5" fill="none" markerEnd="url(#blueArrow)" />
                  <path d="M 275.2 624.8 A 130 280 0 0 1 188.0 492.2" stroke="#005CB9" strokeWidth="2.5" fill="none" markerEnd="url(#blueArrow)" />
                  <path d="M 177.4 443.4 A 130 280 0 0 1 171.9 302.6" stroke="#005CB9" strokeWidth="2.5" fill="none" markerEnd="url(#blueArrow)" />
                  <path d="M 178.0 253.1 A 130 280 0 0 1 205.0 158.9" stroke="#005CB9" strokeWidth="2.5" fill="none" markerEnd="url(#blueArrow)" />
                  <path d="M 229.1 115.3 A 130 280 0 0 1 275.2 75.2" stroke="#005CB9" strokeWidth="2.5" fill="none" markerEnd="url(#blueArrow)" />

                </svg>

                {/* CENTER LIMOVI MEDALLION */}
                <div className="absolute z-10 w-32 h-32 rounded-full bg-white border-2 border-dashed border-[#005CB9]/40 shadow-md flex flex-col items-center justify-center p-2 text-center"
                     style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <span className="text-xs font-black tracking-widest text-[#0A1929] leading-none block">
                    LIMOVI
                  </span>
                  <span className="text-[7.5px] font-bold tracking-wider text-[#005CB9] uppercase block mb-1">
                    THE GOLD ECOSYSTEM
                  </span>
                  <p className="text-[8px] font-medium leading-tight text-slate-500 max-w-[90px]">
                    Invest Once. <br />
                    Experience for a Lifetime.
                  </p>
                </div>

                {/* 7 MILESTONE NODES */}
                {circularMilestones.map((m) => (
                  <div
                    key={m.step}
                    style={m.iconPos}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* ICON CIRCLE */}
                    <div className="relative z-20">
                      <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-[#005CB9] text-white font-extrabold text-[8.5px] flex items-center justify-center border border-white z-30 shadow-xs">
                        {m.step}
                      </div>

                      <div className="w-8.5 h-8.5 rounded-full bg-white border-2 border-[#005CB9]/30 shadow-sm flex items-center justify-center hover:scale-110 hover:border-[#005CB9] transition-all duration-300">
                        {m.icon}
                      </div>
                    </div>

                    {/* DIRECTIONALLY POSITIONED TEXT BOX */}
                    <div className={`absolute z-30 pointer-events-none ${m.textPosClass}`}>
                      <h4 className="text-[7.5px] sm:text-[9px] font-extrabold text-[#0A1929] uppercase leading-tight">
                        {m.title}
                      </h4>
                      <p className="text-[6.5px] sm:text-[7.5px] text-slate-500 leading-snug mt-0.5 font-medium">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Right RESULT Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#0A1929] via-[#005CB9] to-[#005CB9] text-white rounded-2xl p-3.5 sm:p-4 shadow-md flex items-center justify-between gap-3 sm:gap-4 mt-auto"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30 text-white">
                  <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-sky-200 block mb-0.5">
                    THE RESULT
                  </span>
                  <p className="text-[11px] sm:text-xs text-sky-100 font-medium leading-snug">
                    Zero wastage, Active wealth, Instant access, Financial freedom.
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-white mt-0.5">
                    Your gold works for you, every single day.
                  </p>
                </div>
              </div>
              <InfinityIcon className="w-7 h-7 text-white shrink-0 hidden sm:block opacity-80" />
            </motion.div>
          </div>
        </div>

        {/* ─── 4. BOTTOM COMPARISON STRIP (4 COMPARISON CARDS) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">

          {/* Card 1: COST vs ZERO WASTAGE */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#EBF5FF] flex items-center justify-center shrink-0">
                <Coins className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#005CB9]" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">
                  COST
                </span>
                <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                  15% – 20% making charges
                </p>
              </div>
            </div>

            <span className="text-[9.5px] sm:text-[10px] font-extrabold text-[#005CB9] bg-[#EBF5FF] px-2 py-0.5 rounded-md shrink-0">
              VS
            </span>

            <div className="min-w-0 text-right">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#005CB9] block uppercase">
                ZERO WASTAGE
              </span>
              <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                Save 15% – 20% every time
              </p>
            </div>
          </div>

          {/* Card 2: LIQUIDITY vs INSTANT ACCESS */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#EBF5FF] flex items-center justify-center shrink-0">
                <Lock className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#005CB9]" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">
                  LIQUIDITY
                </span>
                <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                  Locked or needs loan
                </p>
              </div>
            </div>

            <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#005CB9] text-white flex items-center justify-center shrink-0">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </div>

            <div className="min-w-0 text-right">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#005CB9] block uppercase">
                INSTANT ACCESS
              </span>
              <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                Instant liquidity anytime
              </p>
            </div>
          </div>

          {/* Card 3: RETURNS vs WEALTH GROWTH */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#EBF5FF] flex items-center justify-center shrink-0">
                <TrendingDown className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#005CB9]" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">
                  RETURNS
                </span>
                <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                  No returns, only expense
                </p>
              </div>
            </div>

            <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#005CB9] text-white flex items-center justify-center shrink-0">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>

            <div className="min-w-0 text-right">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#005CB9] block uppercase">
                WEALTH GROWTH
              </span>
              <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                Gold appreciates & multiplies
              </p>
            </div>
          </div>

          {/* Card 4: EXPERIENCE vs ENDLESS EXPERIENCE */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#EBF5FF] flex items-center justify-center shrink-0">
                <Frown className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#005CB9]" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">
                  EXPERIENCE
                </span>
                <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                  Own one, wear only that
                </p>
              </div>
            </div>

            <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#005CB9] text-white flex items-center justify-center shrink-0">
              <Smile className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>

            <div className="min-w-0 text-right">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#005CB9] block uppercase">
                ENDLESS EXPERIENCE
              </span>
              <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                Experience more, enjoy always
              </p>
            </div>
          </div>

          {/* Card 5: ONE vs UNLIMITED */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#EBF5FF] flex items-center justify-center shrink-0">
                <Lock className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#005CB9]" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">
                  ONE
                </span>
                <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                  Restricted to a single piece
                </p>
              </div>
            </div>

            <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#005CB9] text-white flex items-center justify-center shrink-0">
              <InfinityIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>

            <div className="min-w-0 text-right">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#005CB9] block uppercase">
                UNLIMITED
              </span>
              <p className="text-[10.5px] sm:text-[11px] font-semibold text-[#0A1929] leading-tight">
                Access the entire Jewellery Cloud
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
