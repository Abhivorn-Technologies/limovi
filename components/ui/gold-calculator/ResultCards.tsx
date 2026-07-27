'use client';

import type { LucideProps } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coins,
  Gem,
  CreditCard,
  Sparkles,
  HandCoins,
  Gift,
  PieChart,
  Crown,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import type { CalculationResult } from '@/lib/utils/calculator';
import { formatINR, formatGrams, formatPercent } from '@/lib/utils/calculator';
import type { StrategyKey } from '@/lib/constants/strategyRules';
import { LTV_RATIO } from '@/lib/constants/experienceRules';

import { VALUE_ADDED_BENEFITS } from '@/lib/constants/strategyRules';

type LucideIcon = React.FC<LucideProps>;

interface CardData {
  id: string;
  icon: LucideIcon;
  title: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  highlight?: boolean;
  /** Full-width card (spans 2 columns) */
  wide?: boolean;
  /** Custom render override */
  custom?: React.ReactNode;
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 290, damping: 24 } },
};

interface ResultCardsProps {
  result: CalculationResult;
  strategy: StrategyKey;
  enrolledGrams?: number;
}

// ─── Shared base cards ────────────────────────────────────────────────────────

function goldBalanceCard(result: CalculationResult): CardData {
  return {
    id: 'gold-balance',
    icon: Coins,
    title: 'Gold Balance Value',
    primary: formatGrams(result.goldBalance),
    secondary: `Current Value: ${formatINR(result.currentValue, true)}`,
    accent: '#D4AF37',
    bg: 'rgba(212,175,55,0.07)',
  };
}

/** Section 7: Financial Returns Breakdown Card */
function moneyEarnedSavedCard(result: CalculationResult): CardData {
  const isWealthEligible = result.wealthGenTotal > 0;

  return {
    id: 'money-earned-saved',
    icon: TrendingUp,
    title: `Financial Returns (${result.yearsTimeline}Y Horizon)`,
    primary: formatINR(result.totalMoneyEarnedSaved),
    secondary: `Luxury: ${formatINR(result.luxurySavingsTotal, true)} · Lifestyle: ${formatINR(result.lifestyleSavingsTotal, true)} · Wealth Gen: ${isWealthEligible ? formatINR(result.wealthGenTotal, true) : '₹0'}`,
    accent: '#10B981',
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.03) 100%)',
    highlight: true,
    wide: true,
    custom: (
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp size={11} className="text-emerald-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Financial Returns
            </span>
          </div>
          <span className="text-[9px] font-bold text-slate-500">
            {result.yearsTimeline}Y Horizon
          </span>
        </div>

        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span>On Luxury Jewellery ({result.luxuryExperiencesPerYear} exp @ 14% savings):</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatINR(result.luxurySavingsTotal)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span>On Lifestyle Jewellery ({result.lifestyleExperiencesPerYear} exp @ 7% savings):</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatINR(result.lifestyleSavingsTotal)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <div>
              <div>Wealth Generated (25% dividend payout on every experience charge):</div>
              {isWealthEligible && (
                <div className="text-[8.5px] text-slate-400 font-medium">*Calculated with a minimum of 5 experiences per year</div>
              )}
            </div>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {isWealthEligible ? formatINR(result.wealthGenTotal) : 'Not Eligible'}
            </span>
          </div>
          <div className="pt-1.5 mt-1 border-t border-emerald-500/20 flex justify-between items-center text-xs font-black text-slate-900 dark:text-white">
            <span>TOTAL FINANCIAL BENEFIT:</span>
            <span className="text-sm text-emerald-600 dark:text-emerald-400">{formatINR(result.totalMoneyEarnedSaved)}</span>
          </div>
        </div>
      </div>
    ),
  };
}

/** Exclusive Ecosystem Benefits Comparison Card */
function valueAddedComparisonCard(result: CalculationResult): CardData {
  return {
    id: 'value-added-comparison',
    icon: Crown,
    title: 'Exclusive Ecosystem Benefits',
    primary: 'LIMOVI vs Traditional Gold Loans',
    secondary: 'Privately access liquidity & luxury experiences without repayment stress or interest.',
    accent: '#D4AF37',
    bg: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(11,98,214,0.04) 100%)',
    wide: true,
    custom: (
      <div className="space-y-2.5 pt-0.5">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center">
              <Crown size={11} className="text-amber-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
              Exclusive Ecosystem Benefits
            </span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300">
            With LIMOVI
          </span>
        </div>

        {/* Value add features list */}
        <div className="space-y-1.5">
          {VALUE_ADDED_BENEFITS.map((benefit, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[9.5px]">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">✓</span>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">{benefit.title}: </span>
                <span className="text-slate-500 dark:text-slate-400">{benefit.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ecosystem badges */}
        <div className="grid grid-cols-3 gap-1 pt-1 border-t border-amber-500/15 text-[8.5px]">
          <div className="p-1 rounded bg-blue-500/10 text-center">
            <div className="font-bold text-blue-600 dark:text-blue-400">Instant Loans</div>
            <div className="text-[8px] text-slate-500">{formatINR(result.loanEligibility, true)}</div>
          </div>
          <div className="p-1 rounded bg-emerald-500/10 text-center">
            <div className="font-bold text-emerald-600 dark:text-emerald-400">Instant Liquidity</div>
            <div className="text-[8px] text-slate-500">{formatINR(result.currentValue)}</div>
          </div>
          <div className="p-1 rounded bg-amber-500/10 text-center">
            <div className="font-bold text-amber-600 dark:text-amber-400">Gift Ecosystem</div>
            <div className="text-[8px] text-slate-500">{result.isGiftEligible ? 'Unlocked' : '≥50g Required'}</div>
          </div>
        </div>
      </div>
    ),
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResultCards({ result, strategy }: ResultCardsProps) {
  const cards: CardData[] = [
    moneyEarnedSavedCard(result),
    valueAddedComparisonCard(result),
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${strategy}-${result.yearsTimeline}`}
        variants={list}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
        className="grid grid-cols-2 gap-2"
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              variants={item}
              whileHover={{ y: -2, transition: { duration: 0.12 } }}
              className={`rounded-2xl p-3 cursor-default ${card.wide ? 'col-span-2' : ''}`}
              style={{
                background: card.bg,
                border: card.highlight
                  ? `1.5px solid ${card.accent}55`
                  : '1px solid rgba(0,0,0,0.055)',
                boxShadow: card.highlight ? `0 4px 16px ${card.accent}18` : undefined,
              }}
            >
              {card.custom ? (
                card.custom
              ) : (
                <>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: `${card.accent}1A` }}
                  >
                    <Icon size={13} color={card.accent} />
                  </div>
                  <p
                    className="text-sm font-black leading-tight"
                    style={{ color: card.highlight ? card.accent : '#1e293b' }}
                  >
                    {card.primary}
                  </p>
                  <p
                    className="text-[9px] font-bold uppercase tracking-wide mt-0.5 mb-0.5"
                    style={{ color: '#94a3b8' }}
                  >
                    {card.title}
                  </p>
                  <p className="text-[10px] font-medium" style={{ color: '#64748b' }}>
                    {card.secondary}
                  </p>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
