"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Crown, Gem, Sparkles, TrendingUp, CheckCircle2, XCircle, X, ChevronRight, Infinity as InfinityIcon } from "lucide-react";

const InvestmentGrowthIcon = ({ className, size = 24, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path d="M23 2h-7l3.3 3.3-7.6 7.6-4.3-4.3-5.7 5.7 1.4 1.4 4.3-4.3 4.3 4.3 9-9L23 9V2Z" />
    <ellipse cx="5" cy="18" rx="3" ry="1.5" />
    <path d="M2 18.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <ellipse cx="12" cy="15" rx="3" ry="1.5" />
    <path d="M9 15.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M9 18v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5V18c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <ellipse cx="19" cy="12" rx="3" ry="1.5" />
    <path d="M16 12.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M16 15v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5V15c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M16 17.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
  </svg>
);

type Benefit = { label: string; desc: React.ReactNode; eligible: boolean };

const BENEFITS_LABELS = [
  "Jewellery Experience",
  "Instant Loans",
  "Instant Liquidity",
  "Gift Gold Ecosystem",
  "Jewellery as an Asset",
];

const PLANS = [
  {
    id: "investment-only",
    name: "Investment Only",
    tagline: "Pure capital appreciation backed by 24K gold.",
    shortDesc: "Grow your gold, experience luxury on your terms.",
    icon: InvestmentGrowthIcon,
    accent: "#D4AF37",
    entryLabel: "Invest",
    entryDetail: "Min. 50g of 24K gold equivalent",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee per occasion",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Experience", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Experience Charges</div>
              <div className="text-slate-400 mt-0.5">= 0.9% of Selected Jewellery Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Service Charges</div>
              <div className="text-slate-400 mt-0.5">= ₹1,099</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Amount Saved on this Experience</div>
              <div className="text-slate-400 mt-0.5">= 13.1% of Selected Jewellery Value</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Loan Eligibility</div>
              <div className="text-slate-400 mt-0.5">= 85% of Gold Balance Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Gold Loan + Luxury Jewellery Experience</div>
              <div className="text-slate-400 mt-0.5">= 25-50% of Gold Balance Loan + 25% of Gold Balance Jewellery Experience</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Liquidity</div>
              <div className="text-slate-400 mt-0.5">= Value Equal to Gold Balance According to Current Market Price</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Gift Gold Ecosystem", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Minimum Gift Card for Benefits of Limovi Gold Ecosystem</div>
              <div className="text-slate-400 mt-0.5">= 50gm 24K Value</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Jewellery as an Asset", desc: "Not eligible — Investment Only holds pure 24K gold, not a jewellery asset", eligible: false },
    ] as Benefit[],
  },
  {
    id: "investment-experience",
    name: "Investment & Experience",
    tagline: "The complete luxury membership — zero experience charges.",
    shortDesc: "Invest, wear endlessly, and earn when others choose your piece.",
    icon: Sparkles,
    accent: "#D4AF37",
    entryLabel: "Invest",
    entryDetail: <>Min. 50g of 24K <br/> 20% experience + 14% making charges at onboarding</>,
    fee: "₹1,499",
    feeLabel: "service fee per occasion · 0% experience charge on jewellery",
    highlight: true,
    benefits: [
      { 
        label: "Luxury Jewellery Experience", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Experience Charges</div>
              <div className="text-slate-400 mt-0.5">= 0% of Selected Jewellery Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Service Charges</div>
              <div className="text-slate-400 mt-0.5">= ₹1,499</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Amount Saved on this Experience</div>
              <div className="text-slate-400 mt-0.5">= 14% of Selected Jewellery Value</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Loan Eligibility</div>
              <div className="text-slate-400 mt-0.5">= 85% of Gold Balance Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Gold Loan + Luxury Jewellery Experience</div>
              <div className="text-slate-400 mt-0.5">= 25-50% of Gold Balance Loan + 25% of Gold Balance Jewellery Experience</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Liquidity</div>
              <div className="text-slate-400 mt-0.5">= Value Equal to Gold Balance According to Current Market Price</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Gift Gold Ecosystem", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Minimum Gift Card for Benefits of Limovi Gold Ecosystem</div>
              <div className="text-slate-400 mt-0.5">= 50gm 24K Value</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Jewellery as an Asset", desc: "Earn 25% of experience charges whenever another customer selects your jewellery", eligible: true },
    ] as Benefit[],
  },
  {
    id: "enrol-experience",
    name: "Enrol & Experience",
    tagline: "Bring your existing jewellery. Wear new. Earn in return.",
    shortDesc: "Turn your locked jewellery into a living, earning asset.",
    icon: InfinityIcon,
    accent: "#A78BFA",
    entryLabel: "Enrol",
    entryDetail: "Existing jewellery worth ≥ 50g of 24K gold",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee · earn 25% back",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Experience", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Experience Charges</div>
              <div className="text-slate-400 mt-0.5">= 0.9% of Selected Jewellery Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Service Charges</div>
              <div className="text-slate-400 mt-0.5">= ₹1,099</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Amount Saved on this Experience</div>
              <div className="text-slate-400 mt-0.5">= 13.1% of Selected Jewellery Value</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Loan Eligibility</div>
              <div className="text-slate-400 mt-0.5">= 85% of Gold Balance Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Gold Loan + Luxury Jewellery Experience</div>
              <div className="text-slate-400 mt-0.5">= 25-50% of Gold Balance Loan + 25% of Gold Balance Jewellery Experience</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Liquidity</div>
              <div className="text-slate-400 mt-0.5">= Value Equal to Gold Balance According to Current Market Price</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Gift Gold Ecosystem", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Minimum Gift Card for Benefits of Limovi Gold Ecosystem</div>
              <div className="text-slate-400 mt-0.5">= 50gm 24K Value</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Jewellery as an Asset", desc: "Earn 25% of experience charges whenever another customer selects your enrolled jewellery", eligible: true },
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
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee · short duration",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Experience", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Experience Charges</div>
              <div className="text-slate-400 mt-0.5">= 0.9% of Selected Jewellery Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Service Charges</div>
              <div className="text-slate-400 mt-0.5">= ₹1,099</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Amount Saved on this Experience</div>
              <div className="text-slate-400 mt-0.5">= 13.1% of Selected Jewellery Value</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Loan Eligibility</div>
              <div className="text-slate-400 mt-0.5">= 85% of Gold Balance Value</div>
            </li>
            <li>
              <div className="font-bold text-white/80">Gold Loan + Luxury Jewellery Experience</div>
              <div className="text-slate-400 mt-0.5">= 25-50% of Gold Balance Loan + 25% of Gold Balance Jewellery Experience</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="font-bold text-white/80">Maximum Liquidity</div>
              <div className="text-slate-400 mt-0.5">= Value Equal to Gold Balance According to Current Market Price</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Gift Gold Ecosystem", desc: "Not eligible — short-duration investment window does not support gifting", eligible: false },
      { label: "Jewellery as an Asset", desc: "Not eligible — short-duration investment window does not qualify for asset earning", eligible: false },
    ] as Benefit[],
  },
];

export function AccessStrategies() {
  const [activePlan, setActivePlan] = useState<number | null>(null);

  return (
    <section id="access-strategies" className="bg-[#040F1D] relative overflow-hidden py-24 lg:py-32">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
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
                className={"group relative rounded-3xl border flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 " + (p.highlight ? "border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.1)]" : "border-white/8 hover:border-white/16")}
                style={{ background: p.highlight ? "linear-gradient(160deg,rgba(212,175,55,0.08) 0%,rgba(4,15,29,1) 60%)" : "rgba(255,255,255,0.02)" }}
              >
                {p.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: p.accent + "18", border: "1px solid " + p.accent + "30" }}>
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

                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: p.accent + "80" }}>
                    {p.entryLabel} Required
                  </div>
                  <div className="text-xs text-slate-500 mb-5 pb-5 border-b border-white/5">{p.entryDetail}</div>

                  <div className="flex items-center gap-1 flex-wrap mt-auto">
                    {p.benefits.map((b, bi) => (
                      <span key={bi} className={"w-5 h-5 rounded-full flex items-center justify-center " + (b.eligible ? "bg-emerald-500/20" : "bg-white/5")}>
                        {b.eligible
                          ? <CheckCircle2 size={12} className="text-emerald-400" />
                          : <XCircle size={12} className="text-slate-700" />
                        }
                      </span>
                    ))}
                    <span className="text-[10px] text-slate-500 ml-1">{eligibleCount}/5 benefits</span>
                  </div>
                </div>

                <button
                  onClick={() => setActivePlan(activePlan === i ? null : i)}
                  className="flex items-center justify-between px-6 py-4 border-t border-white/5 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-white/3"
                  style={{ color: p.accent }}
                >
                  <span>Explore Strategy</span>
                  <ChevronRight
                    size={14}
                    className={"transition-transform duration-300 " + (activePlan === i ? "rotate-90" : "")}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {activePlan !== null && (
            <motion.div
              key={"desktop-panel-" + activePlan}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block rounded-3xl border border-white/10 overflow-hidden mt-4"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5"
                style={{ background: PLANS[activePlan].accent + "08" }}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = PLANS[activePlan].icon;
                    return (
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: PLANS[activePlan].accent + "20", border: "1px solid " + PLANS[activePlan].accent + "30" }}>
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

                  <button
                    onClick={() => setActivePlan(null)}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 divide-x divide-white/5">
                {PLANS[activePlan].benefits.map((b, bi) => (
                  <div key={bi} className={"p-6 flex flex-col gap-3 " + (!b.eligible ? "opacity-40" : "")}>
                    <div className="flex items-center gap-2">
                      {b.eligible
                        ? <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                        : <XCircle size={15} className="text-slate-600 flex-shrink-0" />
                      }
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{bi + 1}</span>
                    </div>
                    <div className="font-bold text-sm text-white leading-tight">{b.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{b.desc}</div>
                    {!b.eligible && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold uppercase tracking-wide self-start">Not Eligible</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activePlan !== null && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePlan(null)}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
              />

              <motion.div
                key={"sheet-" + activePlan}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 280 }}
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl flex flex-col md:hidden"
                style={{ background: "#0A1628", border: "1px solid rgba(255,255,255,0.08)", height: "85vh", maxHeight: "85vh" }}
              >
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = PLANS[activePlan].icon;
                      return (
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: PLANS[activePlan].accent + "20", border: "1px solid " + PLANS[activePlan].accent + "30" }}>
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



                <div
                  className="overflow-y-scroll flex-1 min-h-0 py-2"
                  style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {PLANS[activePlan].benefits.map((b, bi) => (
                    <div
                      key={bi}
                      className={"flex items-start gap-4 px-6 py-4 border-b border-white/5 last:border-b-0 " + (!b.eligible ? "opacity-35" : "")}
                    >
                      <div className={"flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 " + (b.eligible ? "bg-emerald-500/15" : "bg-white/5")}>
                        {b.eligible
                          ? <CheckCircle2 size={15} className="text-emerald-400" />
                          : <XCircle size={15} className="text-slate-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{bi + 1}</span>
                          <span className={"font-bold text-sm leading-tight " + (b.eligible ? "text-white" : "text-slate-500")}>{b.label}</span>
                          {!b.eligible && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold uppercase tracking-wide flex-shrink-0">Not Eligible</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 leading-relaxed">{b.desc}</div>
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
