'use client';

import type { LucideProps } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Coins,
  Gem,
  CreditCard,
  Sparkles,
  HandCoins,
  Infinity as InfinityIcon,
  Plus,
  Equal,
  ArrowRight,
  Crown,
  Landmark,
  Gift,
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
  /** Custom render override — if set, renders instead of standard layout */
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
  /** For Strategy 3: pre-owned gold grams (used for display label) */
  enrolledGrams?: number;
}

// ─── Shared base cards ────────────────────────────────────────────────────────

function goldBalanceCard(result: CalculationResult): CardData {
  return {
    id: 'gold-balance',
    icon: Coins,
    title: 'Gold Balance',
    primary: formatGrams(result.goldBalance),
    secondary: '24K Pure Gold',
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
    secondary: result.isGiftEligible ? 'Full benefits unlocked' : 'Unlocks at 50g',
    accent: result.isGiftEligible ? '#16a34a' : '#94a3b8',
    bg: result.isGiftEligible ? 'rgba(22,163,74,0.07)' : 'rgba(148,163,184,0.07)',
  };
}

function experienceTierCard(result: CalculationResult): CardData {
  return {
    id: 'experience-tier',
    icon: Gem,
    title: 'Jewellery Experience',
    primary: result.experienceTier.label,
    secondary: result.experienceTier.tagline,
    accent: result.experienceTier.color,
    bg: `${result.experienceTier.color}12`,
  };
}

function loanCard(result: CalculationResult, label = 'Loan Eligibility'): CardData {
  return {
    id: 'loan',
    icon: CreditCard,
    title: label,
    primary: `Up to ${formatINR(result.loanEligibility, true)}`,
    secondary: `At ${Math.round(LTV_RATIO * 100)}% LTV`,
    accent: '#059669',
    bg: 'rgba(5,150,105,0.07)',
  };
}

// ─── Strategy card builders ───────────────────────────────────────────────────

function buildInvestmentOnly(result: CalculationResult): CardData[] {
  return [
    goldBalanceCard(result),

    loanCard(result),
    giftCard(result),
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: 'Experience Savings',
      primary: formatINR(result.experienceSavings, true),
      secondary: 'Amount saved on luxury jewellery experience',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
  ];
}

function buildInvestmentExperience(result: CalculationResult): CardData[] {
  return [
    goldBalanceCard(result),
    experienceTierCard(result),
    loanCard(result, 'Instant Loan Limit'),
    giftCard(result),
    {
      id: 'wealth-growth',
      icon: HandCoins,
      title: 'Wealth Generation',
      primary: formatINR(result.experienceEarnings, true),
      secondary: '25% commercial dividend',
      accent: '#0B62D6',
      bg: 'rgba(11,98,214,0.07)',
    },
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: 'Experience Savings',
      primary: formatINR(result.experienceSavings, true),
      secondary: 'Amount saved on luxury jewellery experience',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
  ];
}

function buildEnrolExperience(result: CalculationResult): CardData[] {
  const earningsCard: CardData = {
    id: 'wealth-generation',
    icon: HandCoins,
    title: '💎 Wealth Generation',
    primary: formatINR(result.experienceEarnings, true),
    secondary: 'Est. total income from enrolled gold',
    accent: '#7C3AED',
    bg: 'rgba(124,58,237,0.07)',
    highlight: true,
    wide: true,
  };

  return [
    {
      id: 'enrolled-balance',
      icon: Coins,
      title: 'Current Gold Balance',
      primary: formatGrams(result.goldBalance),
      secondary: '24K enrolled gold',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
    experienceTierCard(result),
    loanCard(result, 'Loan Eligibility'),
    giftCard(result),
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: 'Experience Savings',
      primary: formatINR(result.experienceSavings, true),
      secondary: 'Amount saved on luxury jewellery experience',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
    earningsCard,
  ];
}

function buildExperienceOnly(result: CalculationResult): CardData[] {
  return [
    goldBalanceCard(result),
    experienceTierCard(result),
    loanCard(result, 'Loan Eligibility'),
    {
      id: 'exp-savings',
      icon: Sparkles,
      title: 'Experience Savings',
      primary: formatINR(result.experienceSavings, true),
      secondary: 'Amount saved on luxury jewellery experience',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.07)',
    },
  ];
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResultCards({ result, strategy, enrolledGrams }: ResultCardsProps) {
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
        key={strategy}
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
              {/* Custom layout override */}
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
