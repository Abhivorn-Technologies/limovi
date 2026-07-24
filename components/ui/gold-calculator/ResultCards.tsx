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

function giftCard(result: CalculationResult): CardData {
  return {
    id: 'gift-ecosystem',
    icon: Gift,
    title: 'Gift Ecosystem',
    primary: result.isGiftEligible ? 'Eligible' : 'Locked',
    secondary: result.isGiftEligible ? 'Full benefits unlocked (≥50g)' : 'Requires min 50g gold',
    accent: result.isGiftEligible ? '#16a34a' : '#94a3b8',
    bg: result.isGiftEligible ? 'rgba(22,163,74,0.07)' : 'rgba(148,163,184,0.07)',
  };
}

function experienceTierCard(result: CalculationResult): CardData {
  return {
    id: 'experience-tier',
    icon: Gem,
    title: 'Jewellery Cloud',
    primary: result.experienceTier.label,
    secondary: result.experienceTier.tagline,
    accent: result.experienceTier.color,
    bg: `${result.experienceTier.color}12`,
  };
}

function loanCard(result: CalculationResult, label = 'Instant Loan Eligibility'): CardData {
  return {
    id: 'loan',
    icon: CreditCard,
    title: label,
    primary: `Up to ${formatINR(result.loanEligibility, true)}`,
    secondary: `75% LTV on ${formatGrams(result.goldBalance)} balance`,
    accent: '#0B62D6',
    bg: 'rgba(11,98,214,0.07)',
  };
}

function totalEcosystemCard(result: CalculationResult): CardData {
  const years = result.yearsTimeline;
  return {
    id: 'total-ecosystem-value',
    icon: Crown,
    title: `⭐ Total Strategy Benefit (${years}Y Horizon)`,
    primary: `${formatINR(result.totalEcosystemValue, true)} (${formatPercent(result.returnPct)})`,
    secondary: `Combined Making Charge Savings + Dividend Earnings over ${years}Y`,
    accent: '#D4AF37',
    bg: 'linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(244,196,48,0.06) 100%)',
    highlight: true,
    wide: true,
  };
}

// ─── Strategy card builders ───────────────────────────────────────────────────

function buildInvestmentOnly(result: CalculationResult): CardData[] {
  const years = result.yearsTimeline;
  return [
    goldBalanceCard(result),
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: `${years}Y Making Charge Savings`,
      primary: formatINR(result.experienceSavings, true),
      secondary: '14% savings on every jewellery experienced',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
    loanCard(result),
    giftCard(result),
    totalEcosystemCard(result),
  ];
}

function buildInvestmentExperience(result: CalculationResult): CardData[] {
  const years = result.yearsTimeline;
  const allocationCard: CardData = {
    id: 'allocation-breakdown',
    icon: PieChart,
    title: '80 / 20 Smart Allocation',
    primary: `80% Jewellery (${formatINR(result.jewelleryAllocation, true)})`,
    secondary: `20% Membership (${formatINR(result.membershipFeeAllocation, true)}) — 0% Making Charges`,
    accent: '#0B62D6',
    bg: 'rgba(11,98,214,0.07)',
    wide: true,
  };

  return [
    goldBalanceCard(result),
    allocationCard,
    {
      id: 'wealth-growth',
      icon: HandCoins,
      title: `${years}Y Wealth Generation Earning`,
      primary: formatINR(result.experienceEarnings, true),
      secondary: '25% commercial dividend when experienced by others',
      accent: '#7C3AED',
      bg: 'rgba(124,58,237,0.07)',
      highlight: true,
    },
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: `${years}Y Making Charge Savings`,
      primary: formatINR(result.experienceSavings, true),
      secondary: '28% coverage + 0% fee on 1st two experiences/yr',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
    loanCard(result, 'Instant Loan Limit'),
    giftCard(result),
    totalEcosystemCard(result),
  ];
}

function buildEnrolExperience(result: CalculationResult): CardData[] {
  const years = result.yearsTimeline;
  const earningsCard: CardData = {
    id: 'wealth-generation',
    icon: HandCoins,
    title: `💎 ${years}Y Wealth Generation Dividends`,
    primary: formatINR(result.experienceEarnings, true),
    secondary: '25% passive income earned from enrolled gold',
    accent: '#7C3AED',
    bg: 'rgba(124,58,237,0.09)',
    highlight: true,
    wide: true,
  };

  return [
    {
      id: 'enrolled-balance',
      icon: Coins,
      title: 'Current Gold Balance',
      primary: formatGrams(result.goldBalance),
      secondary: `24K Enrolled Gold (${formatINR(result.currentValue, true)})`,
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
    experienceTierCard(result),
    earningsCard,
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: `${years}Y Making Charge Savings`,
      primary: formatINR(result.experienceSavings, true),
      secondary: '14% savings on every jewellery experienced',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
    loanCard(result, 'Loan Eligibility'),
    giftCard(result),
    totalEcosystemCard(result),
  ];
}

function buildExperienceOnly(result: CalculationResult): CardData[] {
  const years = result.yearsTimeline;
  return [
    goldBalanceCard(result),
    experienceTierCard(result),
    loanCard(result, 'Loan Eligibility'),
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: `${years}Y Luxury Access Savings`,
      primary: formatINR(result.experienceSavings, true),
      secondary: '14% savings vs purchasing luxury jewellery',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
    {
      id: 'gift-locked',
      icon: ShieldCheck,
      title: 'Gift Ecosystem & Wealth Gen',
      primary: 'Not Eligible',
      secondary: 'Experience-only tier excludes passive earning & gifting',
      accent: '#94a3b8',
      bg: 'rgba(148,163,184,0.07)',
      wide: true,
    },
    totalEcosystemCard(result),
  ];
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResultCards({ result, strategy }: ResultCardsProps) {
  let cards: CardData[];
  switch (strategy) {
    case 'investment':
      cards = buildInvestmentOnly(result);
      break;
    case 'investment_experience':
      cards = buildInvestmentExperience(result);
      break;
    case 'enrol_experience':
      cards = buildEnrolExperience(result);
      break;
    case 'experience_only':
      cards = buildExperienceOnly(result);
      break;
    default:
      cards = buildInvestmentExperience(result);
  }

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
