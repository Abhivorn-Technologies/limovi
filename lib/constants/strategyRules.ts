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
    desc: 'Pure capital appreciation',
    emoji: '📈',
  },
  {
    key: 'investment_experience',
    label: 'Investment + Experience',
    badge: '⭐ Best Value',
    shortLabel: 'Invest + Exp',
    desc: 'Buy gold & access luxury',
    emoji: '💫',
  },
  {
    key: 'enrol_experience',
    label: 'Enrol & Experience',
    shortLabel: 'Enrol',
    desc: 'Bring your existing jewellery',
    emoji: '💎',
  },
  {
    key: 'experience_only',
    label: 'Experience Only',
    shortLabel: 'Experience',
    desc: 'Access without ownership',
    emoji: '✨',
  },
];

// ─── Strategy 2: Investment + Experience ────────────────────────────────────

/**
 * Amount Saved on this Experience = 14% of Selected Jewellery Value.
 * Since Selected Jewellery Value = Gold Balance Value, the savings is 14% of the gold value per year.
 */
export const EXPERIENCE_SAVINGS_PCT = 0.14; // 14%

// ─── Strategy 3: Enrol & Experience ─────────────────────────────────────────

/**
 * Amount Saved on this Experience = 13.1% of Selected Jewellery Value.
 * For Enrol & Experience, the user pays a 0.9% fee, so they save 13.1% (compared to the standard 14%).
 */
export const ENROL_EXPERIENCE_SAVINGS_PCT = 0.131; // 13.1%

/**
 * Earn 25% of experience charges whenever another customer selects your jewellery.
 * The experience charge is 14%, so the dividend earned is 25% of that 14%.
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


