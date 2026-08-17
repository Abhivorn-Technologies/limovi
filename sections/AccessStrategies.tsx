"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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

interface Plan {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  icon: any;
  accent: string;
  entryLabel: string;
  entryDetail: React.ReactNode;
  exitPolicy: React.ReactNode;
  fee: string;
  feeLabel: string;
  highlight: boolean;
  benefits: Benefit[];
}

const PLANS: Plan[] = [
  {
    id: "investment-only",
    name: "Investment Only",
    tagline: "Pure capital appreciation backed by 24K gold.",
    shortDesc: "Build long-term wealth with the flexibility to access luxury whenever you choose.",
    icon: InvestmentGrowthIcon,
    accent: "#D4AF37",
    entryLabel: "Investment",
    entryDetail: "Minimum 50 grams 24K gold for Limovi membership benefits.",
    exitPolicy: "Redeem your gold balance as pure 24K gold or equivalent funds at prevailing market rates.",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee per-experience",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3 text-xs">
            <div>
              <div className="font-bold text-slate-800">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: 0.9% of selected jewellery value per-experience.</li>
                <li>Service Charges: ₹1,099 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-800">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 text-xs font-bold text-slate-800">
            <li>
              <div className="text-slate-600 mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-slate-800">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-slate-600 mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="text-slate-600 mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
              
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
              <div className="text-slate-600 mt-0.5">Minimum gold balance to unlock the Limovi Gold Ecosystem is 50 grams 24K gold.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Wealth Generation", desc: "Not eligible — Holds pure 24K gold investment", eligible: false },
    ],
  },
  {
    id: "investment-experience",
    name: "Investment & Experience",
    tagline: "The complete luxury membership — zero experience charges.",
    shortDesc: "Invest once, experience luxury, and unlock additional earning potential.",
    icon: Sparkles,
    accent: "#D4AF37",
    entryLabel: "Investment",
    entryDetail: (
      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[9.5px]">
        <li>Minimum 50 grams 24K gold for Limovi membership benefits.</li>
        <li>Convert 80% of your investment into jewellery of your choice (includes gold weight rate + stone rate + GST = 80%), zero-making charge.</li>
        <li>20% membership fee = lifetime Luxury Jewellery Cloud access + 14% making charge coverage.</li>
      </ul>
    ),
    exitPolicy: (
      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[9.5px]">
        <li>Redeem your gold balance as pure 24K gold subject to a 14% making charge deduction on the selected ornament.</li>
        <li>Exit with the selected ornament.</li>
      </ul>
    ),
    fee: "₹1,499",
    feeLabel: "service fee per-experience · 0% fee on 1st two experiences",
    highlight: true,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3 text-xs">
            <div>
              <div className="font-bold text-slate-800">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: Zero for first two experiences every year (0.5% of selected jewellery value from 3rd experience).</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-800">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 text-xs font-bold text-slate-800">
            <li>
              <div className="text-slate-600 mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-slate-800">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-slate-600 mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="text-slate-600 mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
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
              <div className="text-slate-600 mt-0.5">Minimum gold balance to unlock the Limovi Gold Ecosystem is 50 grams 24K gold.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Wealth Generation", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              
              <div className="text-slate-600 mt-0.5">Turn your jewellery into an earning asset by receiving 25% of its experience value on every experience by others.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
    ],
  },
  {
    id: "enrol-experience",
    name: "Enroll & Experience",
    tagline: "Bring your existing jewellery. Wear new. Earn in return.",
    shortDesc: "Keep your treasured jewellery exactly as it is. Experience unlimited designer jewellery, earn passive income from your enrolled pieces, and save significantly on remodelling and making charges.",
    icon: InfinityIcon,
    accent: "#A78BFA",
    entryLabel: "Investment",
    entryDetail: "Unlock lifetime Limovi membership benefits by enrolling your existing ornament worth the equivalent of 50 grams 24K gold.",
    exitPolicy: "Reclaim your enrolled ornament and seamlessly exit the Limovi Gold Ecosystem.",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee per-experience · earn 25% back",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3 text-xs">
            <div>
              <div className="font-bold text-slate-800">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: 0.9% of selected jewellery value per-experience.</li>
                <li>Service Charges: ₹1,099 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-800">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 text-xs font-bold text-slate-800">
            <li>
              <div className="text-slate-600 mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-slate-800">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-slate-600 mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="text-slate-600 mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
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
              <div className="text-slate-600 mt-0.5">Minimum gold balance to unlock the Limovi Gold Ecosystem is 50 grams 24K gold.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Wealth Generation", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              
              <div className="text-slate-600 mt-0.5">Turn your jewellery into an earning asset by receiving 25% of its experience value on every experience by others.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
    ],
  },
  {
    id: "experience-only",
    name: "Experience Only",
    tagline: "Short-duration access. Pure luxury on demand.",
    shortDesc: "Access premium jewellery whenever you need it—without ownership",
    icon: Gem,
    accent: "#4DA3FF",
    entryLabel: "Investment",
    entryDetail: "Unlock a world of Limovi benefits with a gold balance valued at 50 grams 24K gold.",
    exitPolicy: "Redeem your gold balance as pure 24K gold or equivalent funds at onboarding market rates.",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee per-experience",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3 text-xs">
            <div>
              <div className="font-bold text-slate-800">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: 0.9% of selected jewellery value per-experience.</li>
                <li>Service Charges: ₹1,099 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-800">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 text-xs font-bold text-slate-800">
            <li>
              <div className="text-slate-600 mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-slate-800">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-slate-600 mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
            <li>
              <div className="text-slate-600 mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Gift Gold Ecosystem", desc: "Not eligible — Experience Only strategy does not qualify for Gift Gold Ecosystem", eligible: false },
      { label: "Wealth Generation", desc: "Not eligible — Experience Only strategy does not qualify for Wealth Generation", eligible: false },
    ],
  },
];

import { useLenis } from "lenis/react";

export function AccessStrategies() {
  const [activePlan, setActivePlan] = useState<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (activePlan !== null) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [activePlan, lenis]);

  return (
    <section id="access-strategies" className="bg-gradient-to-b from-[#F2F6FB] via-[#EBF2FA] to-[#F8FAFC] relative z-40 overflow-hidden py-24 lg:py-32 border-t border-b border-slate-200/80">
      {/* Soft Ambient Radial Luxury Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[#005CB9]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-[#005CB9] mb-4"
            >
              ACCESS STRATEGIES
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1929] tracking-tight"
            >
              Choose Your <span className="text-[#005CB9]">Strategy</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 text-xs sm:text-sm max-w-md font-medium leading-relaxed"
          >
            Select the strategy that best fits your lifestyle and financial goals.<br className="hidden sm:block" />
            Each option offers a tailored mix of ecosystem benefits and wealth-building opportunities.
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
                onClick={() => setActivePlan(activePlan === i ? null : i)}
                className={"group relative rounded-2xl border-2 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none " + (p.highlight ? "border-[#E5C158] shadow-[0_12px_32px_rgba(229,193,88,0.18)]" : "border-slate-300/90 hover:border-[#005CB9] shadow-sm hover:shadow-xl")}
                style={{ background: p.highlight ? "linear-gradient(160deg, rgba(255,254,248,1) 0%, rgba(255,255,255,1) 100%)" : "#FFFFFF" }}
              >
                {p.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F0D574] via-[#FFF3B0] to-[#F0D574]" />
                )}

                <div className="p-4 flex-1 flex flex-col">
                  <div className="relative mb-3 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mb-2"
                      style={{ background: "rgba(0,92,185,0.1)", border: "1.5px solid rgba(0,92,185,0.25)" }}>
                      <Icon size={18} style={{ color: "#005CB9" }} />
                    </div>
                    {p.highlight && (
                      <span className="absolute top-0 right-0 text-[8px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F0D574] text-slate-900 shadow-xs border border-[#D4AF37]/30">
                        Best Value
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-[#0A1929] text-sm mb-0.5 leading-tight text-center">{p.name}</h3>
                  <p className="text-slate-500 text-[10px] leading-snug mb-3 font-medium text-center">{p.shortDesc}</p>

                  <div className="mb-3 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-2 flex-1">
                    <div>
                      <div className="text-[8.5px] font-black uppercase tracking-wider mb-0.5 text-[#C59B27]">
                        Investment Required
                      </div>
                      <div className="text-[9.5px] text-slate-700 font-medium leading-snug">{p.entryDetail}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-200/70">
                      <div className="text-[8.5px] font-black uppercase tracking-wider mb-0.5 text-emerald-700">
                        Exit Policy
                      </div>
                      <div className="text-[9.5px] text-slate-700 font-medium leading-snug">{p.exitPolicy}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap mt-auto pt-1">
                    {p.benefits.map((b, bi) => (
                      <span key={bi} className={"w-4 h-4 rounded-full flex items-center justify-center " + (b.eligible ? "bg-emerald-100 border border-emerald-300/60" : "bg-slate-100 border border-slate-200")}>
                        {b.eligible
                          ? <CheckCircle2 size={10} className="text-emerald-600" />
                          : <XCircle size={10} className="text-slate-400" />
                        }
                      </span>
                    ))}
                    <span className="text-[9px] text-slate-600 ml-1 font-bold">{eligibleCount}/5 benefits</span>
                  </div>
                </div>

                <button
                  onClick={() => setActivePlan(activePlan === i ? null : i)}
                  className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 text-[9.5px] font-extrabold uppercase tracking-wider transition-all duration-300 bg-slate-50/80 hover:bg-[#005CB9]/10 text-[#005CB9]"
                >
                  <span>Explore Strategy</span>
                  <ChevronRight
                    size={12}
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
              className="hidden md:block rounded-3xl border border-slate-200 shadow-xl overflow-hidden mt-4 bg-white"
            >
              <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 bg-[#EBF5FF]">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = PLANS[activePlan].icon;
                    return (
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-[#005CB9]/20 shadow-xs">
                        <Icon size={16} style={{ color: "#005CB9" }} />
                      </div>
                    );
                  })()}
                  <div>
                    <div className="font-black text-[#0A1929]">{PLANS[activePlan].name}</div>
                    <div className="text-slate-600 text-xs mt-0.5 font-medium">{PLANS[activePlan].shortDesc}</div>
                  </div>
                </div>
                <button
                  onClick={() => setActivePlan(null)}
                  className="w-8 h-8 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-all cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-5 divide-x divide-slate-200/80 bg-white">
                {PLANS[activePlan].benefits.map((b, bi) => (
                  <div key={bi} className={"p-6 flex flex-col gap-3 " + (!b.eligible ? "opacity-50" : "")}>
                    <div className="flex items-center gap-2">
                      {b.eligible
                        ? <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                        : <XCircle size={15} className="text-slate-400 flex-shrink-0" />
                      }
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{bi + 1}</span>
                    </div>
                    <div className="font-bold text-sm text-[#0A1929] leading-tight">{b.label}</div>
                    <div className="text-xs text-slate-600 leading-relaxed font-medium">{b.desc}</div>
                    {!b.eligible && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold uppercase tracking-wide self-start">Not Eligible</span>
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
                className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs md:hidden"
              />

              <motion.div
                key={"sheet-" + activePlan}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 280 }}
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl flex flex-col md:hidden bg-white border-t border-slate-200 shadow-2xl"
                style={{ height: "85vh", maxHeight: "85vh" }}
              >
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 rounded-full bg-slate-300" />
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0 bg-[#EBF5FF]">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = PLANS[activePlan].icon;
                      return (
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-[#005CB9]/20 shadow-xs">
                          <Icon size={16} style={{ color: "#005CB9" }} />
                        </div>
                      );
                    })()}
                    <div>
                      <div className="font-black text-[#0A1929] text-sm">{PLANS[activePlan].name}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5 line-clamp-1 font-medium">{PLANS[activePlan].shortDesc}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePlan(null)}
                    className="w-8 h-8 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-all flex-shrink-0 ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div
                  className="overflow-y-scroll flex-1 min-h-0 py-2 bg-white"
                  style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {PLANS[activePlan].benefits.map((b, bi) => (
                    <div
                      key={bi}
                      className={"flex items-start gap-4 px-6 py-4 border-b border-slate-100 last:border-b-0 " + (!b.eligible ? "opacity-50" : "")}
                    >
                      <div className={"flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 " + (b.eligible ? "bg-emerald-100" : "bg-slate-100")}>
                        {b.eligible
                          ? <CheckCircle2 size={15} className="text-emerald-600" />
                          : <XCircle size={15} className="text-slate-400" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{bi + 1}</span>
                          <span className={"font-bold text-sm leading-tight " + (b.eligible ? "text-[#0A1929]" : "text-slate-400")}>{b.label}</span>
                          {!b.eligible && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold uppercase tracking-wide flex-shrink-0">Not Eligible</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed font-medium">{b.desc}</div>
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
