'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { STRATEGIES, type StrategyKey } from '@/lib/constants/strategyRules';
import { Sparkles, Infinity as InfinityIcon, Gem } from "lucide-react";

const InvestmentGrowthIcon = ({ className, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
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

const STRATEGY_ICONS: Record<StrategyKey, any> = {
  investment: InvestmentGrowthIcon,
  investment_experience: Sparkles,
  enrol_experience: InfinityIcon,
  experience_only: Gem,
};

interface StrategySelectorProps {
  selected: StrategyKey;
  onChange: (key: StrategyKey) => void;
}

export function StrategySelector({ selected, onChange }: StrategySelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-1.5">
      <p className="text-[9px] font-bold uppercase tracking-widest px-0.5" style={{ color: '#94a3b8' }}>
        Investment Strategy
      </p>

      {/* Scrollable tab strip */}
      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {STRATEGIES.map((s) => {
          const isActive = selected === s.key;
          return (
            <button
              key={s.key}
              id={`strategy-tab-${s.key}`}
              onClick={() => onChange(s.key)}
              className="relative flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-center transition-all duration-200 focus:outline-none"
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg,#0B62D6,#002771)',
                      color: '#fff',
                      boxShadow: '0 4px 14px rgba(11,98,214,0.45)',
                      minWidth: 72,
                    }
                  : {
                      background: 'rgba(11,98,214,0.05)',
                      color: '#475569',
                      border: '1px solid rgba(11,98,214,0.12)',
                      minWidth: 72,
                    }
              }
              aria-pressed={isActive}
              aria-label={`Select ${s.label} strategy`}
            >
              {/* Icon */}
              <span className="flex items-center justify-center mb-0.5">
                {(() => {
                  const Icon: any = STRATEGY_ICONS[s.key];
                  return <Icon className="w-[18px] h-[18px]" style={{ color: isActive ? '#F4C430' : '#D4AF37' }} strokeWidth={2} />;
                })()}
              </span>

              {/* Label */}
              <span className="text-[10px] font-black leading-tight whitespace-nowrap">
                {s.shortLabel}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.span
                  layoutId="strategy-active-dot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active strategy description */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
        style={{
          background: 'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        <span className="text-base leading-none">
          {STRATEGIES.find((s) => s.key === selected)?.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black leading-tight" style={{ color: '#7A5E00' }}>
            {STRATEGIES.find((s) => s.key === selected)?.label}
            {STRATEGIES.find((s) => s.key === selected)?.badge && (
              <span
                className="ml-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-black"
                style={{ background: 'rgba(212,175,55,0.2)', color: '#92692a' }}
              >
                {STRATEGIES.find((s) => s.key === selected)?.badge}
              </span>
            )}
          </p>
          <p className="text-[9px] font-medium mt-0.5" style={{ color: '#94a3b8' }}>
            {STRATEGIES.find((s) => s.key === selected)?.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
