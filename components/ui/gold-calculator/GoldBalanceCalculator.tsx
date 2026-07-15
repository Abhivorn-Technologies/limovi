'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ChevronDown, AlertCircle } from 'lucide-react';

import { InvestmentSlider } from './InvestmentSlider';
import { GramsSlider, ENROL_DEFAULT_GRAMS } from './GramsSlider';
import { TimelineSelector, type TimelineKey, TIMELINE_YEARS } from './TimelineSelector';
import { GoldBalanceCoin } from './GoldBalanceCoin';
import { ResultCards } from './ResultCards';
import { StrategySelector } from './StrategySelector';

import {
  fetchGoldPrice,
  type GoldPriceData,
} from '@/lib/services/goldService';
import {
  calculateFutureProjection,
  calculateForEnrolledGrams,
  type CalculationResult,
} from '@/lib/utils/calculator';
import type { StrategyKey } from '@/lib/constants/strategyRules';

// ─── Animated counter ──────────────────────────────────────────────────────
function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  formatter,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  formatter?: (v: number) => string;
}) {
  const [displayed, setDisplayed] = useState(value);
  const raf = useRef<number>(0);
  const start = useRef(value);
  const target = useRef(value);

  useEffect(() => {
    start.current = displayed;
    target.current = value;
    const t0 = performance.now();
    const dur = 550;
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplayed(start.current + (target.current - start.current) * e);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (formatter) return <>{formatter(displayed)}</>;
  return <>{`${prefix}${new Intl.NumberFormat('en-IN').format(Math.round(Math.abs(displayed)))}${suffix}`}</>;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────
function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{ background: 'rgba(11,98,214,0.09)', ...style }}
    />
  );
}

// ─── Input label ─────────────────────────────────────────────────────────
function InputLabel({ strategy }: { strategy: StrategyKey }) {
  const labels: Record<StrategyKey, string> = {
    investment: 'Gold Balance (grams)',
    investment_experience: 'Gold Balance (grams)',
    enrol_experience: 'Current Gold Balance (grams)',
    experience_only: 'Membership Plan',
  };
  return (
    <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#94a3b8' }}>
      {labels[strategy]}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
interface GoldBalanceCalculatorProps {
  timeline: TimelineKey | null;
  setTimeline: (val: TimelineKey | null) => void;
  strategy: StrategyKey;
  setStrategy: (val: StrategyKey) => void;
  /** Unified grams input — used for ALL strategies that involve gold */
  enrolledGrams: number;
  setEnrolledGrams: (val: number) => void;
  onMinimize?: () => void;
}

export function GoldBalanceCalculator({
  timeline,
  setTimeline,
  strategy,
  setStrategy,
  enrolledGrams,
  setEnrolledGrams,
  onMinimize,
}: GoldBalanceCalculatorProps) {

  const [livePrice, setLivePrice] = useState<GoldPriceData | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const [priceLoading, setPriceLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [coinTrigger, setCoinTrigger] = useState(0);

  // Derive years from timeline key (for future projection)
  const years = timeline ? (TIMELINE_YEARS[timeline] ?? 1) : 0;

  // ── Load live price
  const loadLivePrice = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setIsRefreshing(true);
    try {
      const p = await fetchGoldPrice(forceRefresh);
      setLivePrice(p);
      setError(null);
    } catch (e) {
      setError('Could not fetch live gold price. Showing demo data.');
      console.error(e);
    } finally {
      setPriceLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // ── Boot: load live price once, refresh every 5 min
  useEffect(() => {
    loadLivePrice();
    const iv = setInterval(() => loadLivePrice(), 5 * 60 * 1000);
    return () => clearInterval(iv);
  }, [loadLivePrice]);


  // ── Recalculate whenever any input or price changes
  useEffect(() => {
    if (!livePrice) return;

    if (strategy === 'experience_only' || strategy === 'enrol_experience') {
      const next = calculateForEnrolledGrams(enrolledGrams, livePrice.price, years, strategy === 'experience_only');
      setResult(next);
      setCoinTrigger((n) => n + 1);
      return;
    }


    // Strategies 1 & 2: FUTURE projection (buy today, grow for `years`)
    const next = calculateFutureProjection({
      goldBalanceGrams: enrolledGrams,
      currentPricePerGram: livePrice.price,
      years,
    });
    setResult(next);
    setCoinTrigger((n) => n + 1);
  }, [enrolledGrams, strategy, livePrice, years]);

  const needsTimeline = true; // All strategies now use the timeline
  const isLoading = priceLoading;

  return (
    <div className="flex flex-col flex-1 min-h-0 select-none">

      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <div
        className="px-4 pt-3 pb-3 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg,rgba(11,98,214,0.05) 0%,rgba(0,39,113,0.03) 100%)',
          borderBottom: '1px solid rgba(11,98,214,0.09)',
        }}
      >
        <div className="flex items-start justify-between gap-2">
          {/* Title block */}
          <div className="flex-1 min-w-0">
            {/* LIVE badge */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: '#22c55e' }}>
                Live
              </span>
            </div>
            <h2
              className="text-sm font-black leading-tight"
              style={{
                background: 'linear-gradient(135deg,#002771,#0B62D6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Gold Balance Calculator
            </h2>
            <p className="text-[10px] mt-0.5 leading-snug font-medium" style={{ color: '#64748b' }}>
              Estimate your returns using live 24K gold prices.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-1.5 flex-shrink-0 pt-0.5">
            <button
              onClick={() => loadLivePrice(true)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-150"
              style={{ background: 'rgba(11,98,214,0.08)' }}
              aria-label="Refresh gold price"
              title="Refresh live price"
            >
              <RefreshCw size={12} color="#0B62D6" className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onMinimize}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-150"
              style={{ background: 'rgba(11,98,214,0.08)' }}
              aria-label="Minimize calculator"
            >
              <ChevronDown size={13} color="#0B62D6" />
            </button>
          </div>
        </div>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-semibold"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#92400e' }}
            >
              <AlertCircle size={11} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SCROLLABLE BODY ────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 space-y-3"
        style={{ scrollbarWidth: 'thin' }}
        data-lenis-prevent="true"
      >

        {/* ── STRATEGY SELECTOR ──────────────────────────────────────── */}
        <StrategySelector selected={strategy} onChange={setStrategy} />

        {/* ── INPUT + LIVE PRICE PANEL ───────────────────────────────── */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-start">

          {/* LEFT: slider (swaps based on strategy) */}
          <div className="min-w-0">
            <InputLabel strategy={strategy} />

              {/* All strategies use grams-based input now */}
              <motion.div
                key="strategy-grams"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <GramsSlider value={enrolledGrams} onChange={setEnrolledGrams} />
              </motion.div>
          </div>

          {/* DIVIDER */}
          <div className="w-px self-stretch mt-5" style={{ background: 'rgba(11,98,214,0.1)' }} />

          {/* RIGHT: live price */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[90px]">
            <div
              className="rounded-xl px-2.5 py-2 text-center"
              style={{
                background: 'linear-gradient(135deg,rgba(212,175,55,0.12),rgba(212,175,55,0.05))',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
            >
              <div className="flex items-center gap-1 justify-center mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: '#22c55e' }} />
                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: '#22c55e' }}>
                  {livePrice?.isLive ? 'LIVE' : 'DEMO'}
                </span>
              </div>
              <p className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#92692a' }}>
                24K Gold Price
              </p>
              {priceLoading ? (
                <Skeleton className="h-5 w-16 mt-1 mx-auto" />
              ) : (
                <p className="text-sm font-black mt-0.5" style={{ color: '#7A5E00' }}>
                  ₹{new Intl.NumberFormat('en-IN').format(livePrice?.price ?? 9850)}
                </p>
              )}
              <p className="text-[8px] mt-0.5" style={{ color: '#94a3b8' }}>per gram</p>
            </div>
          </div>
        </div>

        {/* ── TIMELINE (only for investment strategies) ──────────────── */}
        <AnimatePresence>
          {needsTimeline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <TimelineSelector
                selected={timeline}
                onSelect={setTimeline}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── DIVIDER ───────────────────────────────────────────────── */}
        <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(11,98,214,0.12),transparent)' }} />

        {/* CENTER coin */}
        <div
          className="rounded-2xl py-4 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center,rgba(212,175,55,0.1) 0%,rgba(212,175,55,0.02) 70%)',
            border: '1px solid rgba(212,175,55,0.18)',
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Skeleton style={{ width: 80, height: 80, borderRadius: '50%' }} />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          ) : (
            <GoldBalanceCoin
              grams={enrolledGrams}
              amount={result?.currentValue ?? 0}
              size="sm"
              trigger={coinTrigger}
            />
          )}
        </div>

        {/* Strategy-aware result cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className={`h-20 rounded-2xl ${i === 3 ? 'col-span-2' : ''}`} />
            ))}
          </div>
        ) : result ? (
          <ResultCards
            result={result}
            strategy={strategy}
            enrolledGrams={enrolledGrams}
          />
        ) : null}
      </div>
    </div>
  );
}
