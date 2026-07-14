'use client';

import type { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrendingUp, Coins, Gem, CreditCard, Gift, BarChart3 } from 'lucide-react';
import type { CalculationResult } from '@/lib/utils/calculator';
import { formatINR, formatGrams, formatPercent } from '@/lib/utils/calculator';

type LucideIcon = React.FC<LucideProps>;

interface CardData {
  icon: LucideIcon;
  title: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  highlight?: boolean;
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 22 } },
};

interface ResultCardsProps {
  result: CalculationResult;
}

export function ResultCards({ result }: ResultCardsProps) {
  const cards: CardData[] = [
    {
      icon: TrendingUp,
      title: 'Current Gold Value',
      primary: formatINR(result.currentValue),
      secondary: formatPercent(result.returnPct),
      accent: '#0B62D6',
      bg: 'rgba(11,98,214,0.06)',
      highlight: true,
    },
    {
      icon: Coins,
      title: 'Gold Balance',
      primary: formatGrams(result.goldBalance),
      secondary: '24K Pure Gold',
      accent: '#D4AF37',
      bg: 'rgba(212,175,55,0.06)',
    },
    {
      icon: Gem,
      title: 'Jewellery Experience',
      primary: result.experienceTier.label,
      secondary: result.experienceTier.tagline,
      accent: result.experienceTier.color,
      bg: `${result.experienceTier.color}0E`,
    },
    {
      icon: CreditCard,
      title: 'Loan Eligibility',
      primary: `Up to ${formatINR(result.loanEligibility, true)}`,
      secondary: 'At 75% LTV',
      accent: '#059669',
      bg: 'rgba(5,150,105,0.06)',
    },
    {
      icon: Gift,
      title: 'Gift Gold Balance',
      primary: result.isGiftEligible ? `${formatGrams(result.giftableGrams)} Available` : 'Not Eligible',
      secondary: result.isGiftEligible ? 'Giftable Gold Balance' : 'Reach 0.1g to gift',
      accent: '#F59E0B',
      bg: 'rgba(245,158,11,0.06)',
    },
    {
      icon: BarChart3,
      title: 'Wealth Growth',
      primary: formatPercent(result.returnPct),
      secondary: `${formatINR(result.profit, true)} profit`,
      accent: result.returnPct >= 0 ? '#16a34a' : '#dc2626',
      bg: result.returnPct >= 0 ? 'rgba(22,163,74,0.06)' : 'rgba(220,38,38,0.06)',
    },
  ];

  return (
    <motion.div variants={list} initial="hidden" animate="show" className="grid grid-cols-2 gap-2">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            variants={item}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="rounded-2xl p-3 cursor-default"
            style={{
              background: card.bg,
              border: card.highlight
                ? `1.5px solid ${card.accent}55`
                : '1px solid rgba(0,0,0,0.055)',
              boxShadow: card.highlight ? `0 4px 16px ${card.accent}18` : undefined,
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center mb-2"
              style={{ background: `${card.accent}1A` }}
            >
              <Icon size={13} color={card.accent} />
            </div>
            <p className="text-sm font-black leading-tight" style={{ color: card.highlight ? card.accent : '#1e293b' }}>
              {card.primary}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-wide mt-0.5 mb-0.5" style={{ color: '#94a3b8' }}>
              {card.title}
            </p>
            <p className="text-[10px] font-medium" style={{ color: '#64748b' }}>
              {card.secondary}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
