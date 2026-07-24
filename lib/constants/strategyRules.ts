/**
 * LIMOVI Strategy Business Rules
 *
 * These are "business-rule" values that are NOT available from the gold price API.
 * They represent LIMOVI's internal commercial model and should be maintained by the
 * product/finance team. Adjust freely — no UI or calculation logic needs to change.
 *
 * ─── How values are used ────────────────────────────────────────────────────────
 *
 *  Investment + Experience
 *    experienceSavings = goldBalance × EXPERIENCE_SAVINGS_PER_GRAM_PER_YEAR
 *    totalEcosystemValue = profit + experienceSavings
 *
 *  Enrol & Experience (customer already owns gold)
 *    experienceEarnings = goldBalanceGrams × EXPERIENCE_EARNINGS_PER_GRAM_PER_YEAR
 *    (loan eligibility is still calculated at live gold price × LTV_RATIO)
 *
 *  Experience Only (no gold ownership)
 *    membershipCost = EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST
 *    luxuryAccessSavings = EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL
 */

export type StrategyKey =
  | 'investment'            // Strategy 1 — Investment Only
  | 'investment_experience' // Strategy 2 — Investment + Experience ⭐
  | 'enrol_experience'      // Strategy 3 — Enrol & Experience
  | 'experience_only';      // Strategy 4 — Experience Only

export interface StrategyMeta {
  key: StrategyKey;
  label: string;
  badge?: string;
  shortLabel: string;
  desc: string;
  emoji: string;
}

export const STRATEGIES: StrategyMeta[] = [
  {
    key: 'investment',
    label: 'Investment Only',
    shortLabel: 'Invest',
    desc: 'Build long-term wealth with the flexibility to access luxury whenever you choose.',
    emoji: '📈',
  },
  {
    key: 'investment_experience',
    label: 'Investment + Experience',
    badge: '⭐ Best Value',
    shortLabel: 'Invest + Exp',
    desc: 'Invest once, experience luxury, and unlock additional earning potential.',
    emoji: '💫',
  },
  {
    key: 'enrol_experience',
    label: 'Enrol & Experience',
    shortLabel: 'Enrol',
    desc: 'Keep your treasured jewellery. Experience designer pieces and earn passive income.',
    emoji: '💎',
  },
  {
    key: 'experience_only',
    label: 'Experience Only',
    shortLabel: 'Experience',
    desc: 'Access premium jewellery whenever you need it—without ownership',
    emoji: '✨',
  },
];

// ─── Commercial Business Constants ──────────────────────────────────────────

/** Estimated annual compound growth rate for 24K gold in INR (10.5% p.a.) */
export const GOLD_ESTIMATED_CAGR = 0.105; // 10.5% p.a.

/** Strategy 2: Percentage of gold investment converted directly into 24K jewellery (80%) */
export const INVESTMENT_EXP_JEWELLERY_ALLOC_PCT = 0.80; // 80%

/** Strategy 2: Percentage of investment allocated for membership & making charge protection (20%) */
export const INVESTMENT_EXP_MEMBERSHIP_FEE_PCT = 0.20; // 20%

/** Standard Experience Charge (0.9% of Selected Jewellery Value) */
export const STANDARD_EXPERIENCE_FEE_PCT = 0.009; // 0.9%

/** Service Fee per experience for Investment Only, Enrol, and Experience Only (₹) */
export const STANDARD_SERVICE_FEE = 1099; // ₹1,099

/** Service Fee per experience for Investment & Experience (₹) */
export const INVESTMENT_EXP_SERVICE_FEE = 1499; // ₹1,499

/** Making Charge / VA Savings for Investment Only, Enrol, & Experience Only (14%) */
export const EXPERIENCE_SAVINGS_PCT = 0.14; // 14%

/** Enrol & Experience savings percentage on making charges (14%) */
export const ENROL_EXPERIENCE_SAVINGS_PCT = 0.14; // 14%

/** Making / Remodelling Charge Savings for Investment & Experience (28%) */
export const INVESTMENT_EXP_SAVINGS_PCT = 0.28; // 28%

/** Experience charge for Investment & Experience strategy after 2nd experience per year (0.5%) */
export const INVESTMENT_EXP_FEE_AFTER_2ND_PCT = 0.005; // 0.5%

/**
 * Earn 25% of experience charges whenever another customer selects your jewellery / enrolled ornament.
 */
export const EXPERIENCE_DIVIDEND_PCT = 0.25; // 25%

// ─── Strategy 4: Experience Only ─────────────────────────────────────────────

/** Annual membership / subscription cost for Experience Only tier */
export const EXPERIENCE_ONLY_MEMBERSHIP_ANNUAL_COST = 12_000; // ₹

/** Estimated annual savings from luxury jewellery access vs. buying/renting */
export const EXPERIENCE_ONLY_LUXURY_SAVINGS_ANNUAL = 1_50_000; // ₹

// ─── Enrol & Experience: Gold balance slider defaults ───────────────────────

/** Default pre-owned gold balance (grams) for Enrol & Experience strategy */
export const ENROL_DEFAULT_GRAMS = 50;

/** Min / max gold grams for the Enrol & Experience grams slider */
export const ENROL_MIN_GRAMS = 1;
export const ENROL_MAX_GRAMS = 500;

/**
 * Minimum gold balance in grams required for an active investment strategy.
 * If a user selects fewer than this, show a validation notice.
 */
export const MIN_INVEST_GRAMS = 50;




