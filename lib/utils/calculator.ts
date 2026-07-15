/**
 * LIMOVI Gold Balance Calculator — Pure Calculation Utilities
 *
 * FUTURE PROJECTION MODEL (Strategies 1 & 2):
 *   User picks gold balance in grams + investment timeline (years ahead).
 *   Investment Required = grams × livePrice          (buying today)
 *   Projected Value     = grams × livePrice × (1 + rate/100)^years
 *   Projected Profit    = projectedValue − investmentRequired
 *   Return %            = (profit ÷ investmentRequired) × 100
 *   Loan Eligibility    = projectedValue × LTV_RATIO (projected)
 *
 * ENROL & EXPERIENCE MODEL (Strategy 3):
 *   User already owns gold. currentValue = grams × livePrice.
 *
 * Strategy-specific business-rule extras (from strategyRules.ts):
 *   experienceSavings   = projectedValue × EXPERIENCE_SAVINGS_PCT
 *   totalEcosystemValue = projectedProfit + experienceSavings
 *   experienceEarnings  = experienceSavings × EXPERIENCE_DIVIDEND_PCT
 */

import { LTV_RATIO, GIFT_MIN_GRAMS, getExperienceTier, type ExperienceTier } from '@/lib/constants/experienceRules';
import {
  EXPERIENCE_SAVINGS_PCT,
  ENROL_EXPERIENCE_SAVINGS_PCT,
  EXPERIENCE_DIVIDEND_PCT,
  EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
  EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
} from '@/lib/constants/strategyRules';

export interface CalculationInput {
  investmentAmount: number;       // ₹
  historicalPricePerGram: number; // ₹ / gram at investment start date
  currentPricePerGram: number;    // ₹ / gram live
}

export interface CalculationResult {
  goldPurchased: number;          // grams
  currentValue: number;           // ₹ (at current price)
  profit: number;                 // ₹
  returnPct: number;              // %
  loanEligibility: number;        // ₹
  goldBalance: number;            // same as goldPurchased (alias for UI)
  giftableGrams: number;          // grams (0 if below minimum)
  isGiftEligible: boolean;
  experienceTier: ExperienceTier;
  /** Investment required to buy this many grams at historical price */
  investmentRequired: number;     // ₹

  // ── Strategy-specific fields (business rule calculations) ───────────────────
  /** Annual estimated savings from jewellery experience (Strategy 2) */
  experienceSavings: number;
  /** Profit + experience savings combined (Strategy 2 total ecosystem value) */
  totalEcosystemValue: number;
  /** Annual estimated earnings from enrolled gold (Strategy 3) */
  experienceEarnings: number;
  /** Flat annual savings estimate from luxury access (Strategy 4) */
  luxuryAccessSavings: number;
  /** Annual membership/subscription cost (Strategy 4) */
  membershipCost: number;
}

/**
 * PRIMARY CALCULATION: user selects Gold Balance in grams.
 * Investment Required is derived as: grams × historicalPricePerGram.
 * Use this for Strategy 1 (Investment Only) and Strategy 2 (Investment + Experience).
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
  if (historicalPricePerGram <= 0 || currentPricePerGram <= 0) {
    const tier = getExperienceTier(0);
    return {
      goldPurchased: goldBalanceGrams,
      currentValue: 0,
      profit: 0,
      returnPct: 0,
      loanEligibility: 0,
      goldBalance: goldBalanceGrams,
      giftableGrams: 0,
      isGiftEligible: false,
      experienceTier: tier,
      investmentRequired: 0,
      experienceSavings: 0,
      totalEcosystemValue: 0,
      experienceEarnings: 0,
      luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
      membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
    };
  }

  const investmentRequired = goldBalanceGrams * historicalPricePerGram;
  const currentValue = goldBalanceGrams * currentPricePerGram;
  const profit = currentValue - investmentRequired;
  const returnPct = investmentRequired > 0 ? (profit / investmentRequired) * 100 : 0;
  const loanEligibility = currentValue * LTV_RATIO;
  const isGiftEligible = goldBalanceGrams >= GIFT_MIN_GRAMS;
  const experienceTier = getExperienceTier(goldBalanceGrams);

  // Experience rules are based on percentages of the current value
  const experienceSavings = currentValue * EXPERIENCE_SAVINGS_PCT;
  // Dividend is a percentage of the experience charge (savings)
  const experienceEarnings = experienceSavings * EXPERIENCE_DIVIDEND_PCT;
  const totalEcosystemValue = profit + experienceSavings;

  return {
    goldPurchased: goldBalanceGrams,
    currentValue,
    profit,
    returnPct,
    loanEligibility,
    goldBalance: goldBalanceGrams,
    giftableGrams: isGiftEligible ? goldBalanceGrams : 0,
    isGiftEligible,
    experienceTier,
    investmentRequired,
    experienceSavings,
    totalEcosystemValue,
    experienceEarnings,
    luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
    membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
  };
}

/**
 * FUTURE PROJECTION: primary calculation for Strategies 1 & 2.
 *
 * The user buys gold TODAY at livePrice, then holds for `years` years.
 * The projected future value is computed using compound appreciation.
 *
 *   investmentRequired = grams × livePrice
 *   projectedPrice     = livePrice × (1 + rate/100)^years
 *   projectedValue     = grams × projectedPrice
 *   profit             = projectedValue − investmentRequired
 */
export function calculateFutureProjection({
  goldBalanceGrams,
  currentPricePerGram,
  years,
}: {
  goldBalanceGrams: number;
  currentPricePerGram: number;
  years: number;
}): CalculationResult {
  const experienceTier = getExperienceTier(goldBalanceGrams);
  const isGiftEligible = goldBalanceGrams >= GIFT_MIN_GRAMS;

  if (currentPricePerGram <= 0 || years < 0) {
    return {
      goldPurchased: goldBalanceGrams,
      currentValue: 0,
      profit: 0,
      returnPct: 0,
      loanEligibility: 0,
      goldBalance: goldBalanceGrams,
      giftableGrams: isGiftEligible ? goldBalanceGrams : 0,
      isGiftEligible,
      experienceTier,
      investmentRequired: goldBalanceGrams * currentPricePerGram,
      experienceSavings: 0,
      totalEcosystemValue: 0,
      experienceEarnings: 0,
      luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
      membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
    };
  }

  const investmentRequired = goldBalanceGrams * currentPricePerGram;
  const projectedValue = goldBalanceGrams * currentPricePerGram;
  const profit = 0; // Removed price appreciation forecasting
  const returnPct = 0;
  // Loan eligibility is projected at future value
  const loanEligibility = projectedValue * LTV_RATIO;

  // Business-rule extras scale with years of experience too
  // Total Savings = 13.1% of projected value per year * years
  const experienceSavings = projectedValue * ENROL_EXPERIENCE_SAVINGS_PCT * years;
  const experienceEarnings = experienceSavings * EXPERIENCE_DIVIDEND_PCT;
  const totalEcosystemValue = profit + experienceSavings;

  return {
    goldPurchased: goldBalanceGrams,
    currentValue: projectedValue,   // "currentValue" slot holds the projected future value
    profit,
    returnPct,
    loanEligibility,
    goldBalance: goldBalanceGrams,
    giftableGrams: isGiftEligible ? goldBalanceGrams : 0,
    isGiftEligible,
    experienceTier,
    investmentRequired,
    experienceSavings,
    totalEcosystemValue,
    experienceEarnings,
    luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
    membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
  };
}

export function calculateAll(input: CalculationInput): CalculationResult {
  const { investmentAmount, historicalPricePerGram, currentPricePerGram } = input;

  if (historicalPricePerGram <= 0 || currentPricePerGram <= 0) {
    const tier = getExperienceTier(0);
    return {
      goldPurchased: 0,
      currentValue: 0,
      profit: 0,
      returnPct: 0,
      loanEligibility: 0,
      goldBalance: 0,
      giftableGrams: 0,
      isGiftEligible: false,
      experienceTier: tier,
      investmentRequired: 0,
      experienceSavings: 0,
      totalEcosystemValue: 0,
      experienceEarnings: 0,
      luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
      membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
    };
  }

  const goldPurchased = investmentAmount / historicalPricePerGram;
  const currentValue = goldPurchased * currentPricePerGram;
  const profit = currentValue - investmentAmount;
  const returnPct = (profit / investmentAmount) * 100;
  const loanEligibility = currentValue * LTV_RATIO;
  const isGiftEligible = goldPurchased >= GIFT_MIN_GRAMS;
  const experienceTier = getExperienceTier(goldPurchased);

  // ── Business-rule calculations ────────────────────────────────────────────
  const experienceSavings = currentValue * EXPERIENCE_SAVINGS_PCT;
  const totalEcosystemValue = profit + experienceSavings;
  const experienceEarnings = experienceSavings * EXPERIENCE_DIVIDEND_PCT;

  return {
    goldPurchased,
    currentValue,
    profit,
    returnPct,
    loanEligibility,
    goldBalance: goldPurchased,
    giftableGrams: isGiftEligible ? goldPurchased : 0,
    isGiftEligible,
    experienceTier,
    investmentRequired: investmentAmount,
    experienceSavings,
    totalEcosystemValue,
    experienceEarnings,
    luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
    membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
  };
}

/**
 * Calculate result for the "Enrol & Experience" strategy where the user
 * already owns gold (input is in grams, not ₹).
 */
export function calculateForEnrolledGrams(
  goldBalanceGrams: number,
  currentPricePerGram: number,
  years: number = 1,
  isExperienceOnly: boolean = false
): CalculationResult {
  const currentValue = goldBalanceGrams * currentPricePerGram;
  const loanEligibility = currentValue * LTV_RATIO;
  const experienceTier = getExperienceTier(goldBalanceGrams);
  const isGiftEligible = isExperienceOnly ? false : goldBalanceGrams >= GIFT_MIN_GRAMS;

  // For Enrol & Experience AND Experience Only, user saves 13.1% (pays 0.9% fee) per year
  const experienceSavings = currentValue * ENROL_EXPERIENCE_SAVINGS_PCT * years;
  
  // They only earn the 25% dividend if they are Enrol & Experience. Experience Only does not qualify for asset earning.
  const experienceEarnings = isExperienceOnly 
    ? 0 
    : (currentValue * EXPERIENCE_SAVINGS_PCT) * EXPERIENCE_DIVIDEND_PCT * years;
  
  const totalEcosystemValue = experienceSavings + experienceEarnings;

  return {
    goldPurchased: goldBalanceGrams,
    currentValue,
    profit: 0,       // no investment baseline known
    returnPct: 0,
    loanEligibility,
    goldBalance: goldBalanceGrams,
    giftableGrams: isGiftEligible ? goldBalanceGrams : 0,
    isGiftEligible,
    experienceTier,
    investmentRequired: 0,
    experienceSavings,
    totalEcosystemValue: experienceEarnings,
    experienceEarnings,
    luxuryAccessSavings: EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL,
    membershipCost: EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST,
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
