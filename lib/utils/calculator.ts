/**
 * LIMOVI Gold Balance Calculator — Strategy Earnings & Benefits Engine
 *
 * CALCULATES DIRECT STRATEGY BENEFITS OVER TIMELINE (1Y, 3Y, 5Y, 10Y):
 *   Gold Balance Value = grams × livePrice (pure 24K gold balance value)
 *   Loan & Cloud Limit = goldBalanceValue × LTV_RATIO (75%)
 *
 * Strategy Benefits (over N years):
 *   1. Making Charge / VA Savings (14% or 28% of gold value per year × years)
 *   2. Wealth Generation Dividends (25% commercial dividend earned on gold experienced by others)
 *   3. Total Strategy Benefit = Cumulative Savings + Cumulative Dividends
 */

import { LTV_RATIO, GIFT_MIN_GRAMS, getExperienceTier, type ExperienceTier } from '@/lib/constants/experienceRules';
import {
  INVESTMENT_EXP_JEWELLERY_ALLOC_PCT,
  INVESTMENT_EXP_MEMBERSHIP_FEE_PCT,
  EXPERIENCE_SAVINGS_PCT,
  INVESTMENT_EXP_SAVINGS_PCT,
  EXPERIENCE_DIVIDEND_PCT,
  EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
  EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
  type StrategyKey,
} from '@/lib/constants/strategyRules';

export interface CalculationInput {
  investmentAmount: number;       // ₹
  historicalPricePerGram: number; // ₹ / gram at investment start date
  currentPricePerGram: number;    // ₹ / gram live
}

export interface CalculationResult {
  goldPurchased: number;          // grams
  currentValue: number;           // ₹ (gold balance value at live price)
  projectedGoldValue: number;     // ₹ (same as currentValue, no gold price inflation)
  profit: number;                 // ₹ (direct strategy benefit = savings + dividends)
  returnPct: number;              // % (total strategy return on gold value)
  loanEligibility: number;        // ₹ (75% LTV of gold balance)
  goldBalance: number;            // same as goldPurchased (alias for UI)
  giftableGrams: number;          // grams (0 if below minimum)
  isGiftEligible: boolean;
  experienceTier: ExperienceTier;
  investmentRequired: number;     // ₹ today
  yearsTimeline: number;          // Years (1, 3, 5, 10)

  // ── Strategy 2 Allocations ──────────────────────────────────────────────────
  jewelleryAllocation: number;   // ₹ (80% of investment converted to jewellery)
  membershipFeeAllocation: number;// ₹ (20% membership fee)

  // ── Strategy-specific cumulative benefit fields over timeline (years) ───────
  /** Cumulative estimated savings from jewellery experience (14% or 28% × years) */
  experienceSavings: number;
  /** Total Strategy Net Benefit = cumulative experience savings + cumulative dividends */
  totalEcosystemValue: number;
  /** Cumulative estimated earnings from dividend (25% × experience charge × years) */
  experienceEarnings: number;
  /** Flat annual savings estimate from luxury access (Strategy 4) */
  luxuryAccessSavings: number;
  /** Annual membership/subscription cost (Strategy 4) */
  membershipCost: number;
}

/**
 * Primary Strategy Benefits Calculation Engine for all 4 strategies based on selected timeline.
 */
export function calculateFutureProjection({
  goldBalanceGrams,
  currentPricePerGram,
  years = 1,
  strategy = 'investment_experience',
}: {
  goldBalanceGrams: number;
  currentPricePerGram: number;
  years: number;
  strategy?: StrategyKey;
}): CalculationResult {
  const effectiveYears = Math.max(1, years);
  const isGiftEligible = strategy !== 'experience_only' && goldBalanceGrams >= GIFT_MIN_GRAMS;
  const experienceTier = getExperienceTier(goldBalanceGrams);

  if (currentPricePerGram <= 0) {
    return {
      goldPurchased: goldBalanceGrams,
      currentValue: 0,
      projectedGoldValue: 0,
      profit: 0,
      returnPct: 0,
      loanEligibility: 0,
      goldBalance: goldBalanceGrams,
      giftableGrams: 0,
      isGiftEligible: false,
      experienceTier,
      investmentRequired: 0,
      yearsTimeline: effectiveYears,
      jewelleryAllocation: 0,
      membershipFeeAllocation: 0,
      experienceSavings: 0,
      totalEcosystemValue: 0,
      experienceEarnings: 0,
      luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
      membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
    };
  }

  // 1. Current Gold Balance Value at Live Price
  const investmentRequired = goldBalanceGrams * currentPricePerGram;
  const currentValue = investmentRequired;

  // 2. Strategy 2 Allocation (80% Physical Jewellery / 20% Lifetime Access & Protection)
  const jewelleryAllocation = investmentRequired * INVESTMENT_EXP_JEWELLERY_ALLOC_PCT;
  const membershipFeeAllocation = investmentRequired * INVESTMENT_EXP_MEMBERSHIP_FEE_PCT;

  // 3. Instant Loan Eligibility (75% LTV of Gold Balance Value)
  const loanEligibility = currentValue * LTV_RATIO;

  // 4. Cumulative Making Charge Savings over N Years
  // Strategy 2 gives 28% savings on making charges; Strategy 1, 3, 4 give 14% savings
  const savingsPctPerYear = strategy === 'investment_experience' ? INVESTMENT_EXP_SAVINGS_PCT : EXPERIENCE_SAVINGS_PCT;
  const experienceSavings = currentValue * savingsPctPerYear * effectiveYears;

  // 5. Cumulative Wealth Generation Dividends over N Years (Strategies 2 & 3 only)
  // Earn 25% dividend when others experience your gold
  const isDividendEligible = strategy === 'investment_experience' || strategy === 'enrol_experience';
  const experienceEarnings = isDividendEligible
    ? (currentValue * EXPERIENCE_SAVINGS_PCT) * EXPERIENCE_DIVIDEND_PCT * effectiveYears
    : 0;

  // 6. Total Net Strategy Benefit Created over N Years
  const totalEcosystemValue = experienceSavings + experienceEarnings;
  const returnPct = currentValue > 0 ? (totalEcosystemValue / currentValue) * 100 : 0;

  return {
    goldPurchased: goldBalanceGrams,
    currentValue,
    projectedGoldValue: currentValue,
    profit: totalEcosystemValue,
    returnPct,
    loanEligibility,
    goldBalance: goldBalanceGrams,
    giftableGrams: isGiftEligible ? goldBalanceGrams : 0,
    isGiftEligible,
    experienceTier,
    investmentRequired,
    yearsTimeline: effectiveYears,
    jewelleryAllocation,
    membershipFeeAllocation,
    experienceSavings,
    totalEcosystemValue,
    experienceEarnings,
    luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL * effectiveYears,
    membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST * effectiveYears,
  };
}

/**
 * Backward compatibility alias for calculateForEnrolledGrams
 */
export function calculateForEnrolledGrams(
  goldBalanceGrams: number,
  currentPricePerGram: number,
  years: number = 1,
  isExperienceOnly: boolean = false
): CalculationResult {
  return calculateFutureProjection({
    goldBalanceGrams,
    currentPricePerGram,
    years,
    strategy: isExperienceOnly ? 'experience_only' : 'enrol_experience',
  });
}

/**
 * Backward compatibility alias for calculateFromGrams
 */
export function calculateFromGrams({
  goldBalanceGrams,
  historicalPricePerGram,
  currentPricePerGram,
}: {
  goldBalanceGrams: number;
  historicalPricePerGram: number;
  currentPricePerGram: number;
}): CalculationResult {
  return calculateFutureProjection({
    goldBalanceGrams,
    currentPricePerGram,
    years: 1,
    strategy: 'investment',
  });
}

export function calculateAll(input: CalculationInput): CalculationResult {
  const { investmentAmount, currentPricePerGram } = input;
  const grams = currentPricePerGram > 0 ? investmentAmount / currentPricePerGram : 0;
  return calculateFutureProjection({
    goldBalanceGrams: grams,
    currentPricePerGram,
    years: 1,
    strategy: 'investment',
  });
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
