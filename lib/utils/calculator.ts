/**
 * LIMOVI Gold Balance Calculator — Pure Calculation Utilities
 *
 * Key insight: gold is *purchased* at the historical price (price at investment start),
 * and the *current value* is gold × current live price.
 *
 * Formulas:
 *   goldPurchased   = investmentAmount ÷ historicalPricePerGram
 *   currentValue    = goldPurchased × currentPricePerGram
 *   profit          = currentValue − investmentAmount
 *   returnPct       = (profit ÷ investmentAmount) × 100
 *   loanEligibility = currentValue × LTV_RATIO
 */

import { LTV_RATIO, GIFT_MIN_GRAMS, getExperienceTier, type ExperienceTier } from '@/lib/constants/experienceRules';

export interface CalculationInput {
  investmentAmount: number;       // ₹
  historicalPricePerGram: number; // ₹ / gram at investment start date
  currentPricePerGram: number;    // ₹ / gram live
}

export interface CalculationResult {
  goldPurchased: number;          // grams bought at historical price
  currentValue: number;           // ₹ (at current price)
  profit: number;                 // ₹
  returnPct: number;              // %
  loanEligibility: number;        // ₹
  goldBalance: number;            // same as goldPurchased (alias for UI)
  giftableGrams: number;          // grams (0 if below minimum)
  isGiftEligible: boolean;
  experienceTier: ExperienceTier;
}

export function calculateAll(input: CalculationInput): CalculationResult {
  const { investmentAmount, historicalPricePerGram, currentPricePerGram } = input;

  if (historicalPricePerGram <= 0 || currentPricePerGram <= 0) {
    return {
      goldPurchased: 0,
      currentValue: 0,
      profit: 0,
      returnPct: 0,
      loanEligibility: 0,
      goldBalance: 0,
      giftableGrams: 0,
      isGiftEligible: false,
      experienceTier: getExperienceTier(0),
    };
  }

  const goldPurchased = investmentAmount / historicalPricePerGram;
  const currentValue = goldPurchased * currentPricePerGram;
  const profit = currentValue - investmentAmount;
  const returnPct = (profit / investmentAmount) * 100;
  const loanEligibility = currentValue * LTV_RATIO;
  const isGiftEligible = goldPurchased >= GIFT_MIN_GRAMS;

  return {
    goldPurchased,
    currentValue,
    profit,
    returnPct,
    loanEligibility,
    goldBalance: goldPurchased,
    giftableGrams: isGiftEligible ? goldPurchased : 0,
    isGiftEligible,
    experienceTier: getExperienceTier(goldPurchased),
  };
}

// ─── Formatters ──────────────────────────────────────────────────────────────

export function formatINR(value: number, compact = false): string {
  if (compact) {
    if (Math.abs(value) >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)}Cr`;
    if (Math.abs(value) >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)}L`;
    if (Math.abs(value) >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatGrams(grams: number, decimals = 2): string {
  return `${grams.toFixed(decimals)} g`;
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}
