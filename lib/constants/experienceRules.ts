/**
 * LIMOVI Gold Experience Rules
 * Configurable tiers that determine Jewellery Experience eligibility.
 * Adjust these without touching any UI or calculation logic.
 */

export interface ExperienceTier {
  /** Minimum gold balance in grams (inclusive) */
  minGrams: number;
  /** Maximum gold balance in grams (exclusive). Use Infinity for the top tier. */
  maxGrams: number;
  /** Display label */
  label: string;
  /** Short marketing tagline */
  tagline: string;
  /** Colour accent for the badge */
  color: string;
}

export const EXPERIENCE_TIERS: ExperienceTier[] = [
  {
    minGrams: 0,
    maxGrams: 1,
    label: 'Not Yet Eligible',
    tagline: 'Reach 1g to start your Gold Journey',
    color: '#94a3b8',
  },
  {
    minGrams: 1,
    maxGrams: 10,
    label: 'Starter Collection',
    tagline: 'Begin your jewellery journey',
    color: '#0B62D6',
  },
  {
    minGrams: 10,
    maxGrams: 25,
    label: 'Premium Collection',
    tagline: 'Premium Collection Eligible',
    color: '#D4AF37',
  },
  {
    minGrams: 25,
    maxGrams: Infinity,
    label: 'Heritage Collection',
    tagline: 'Exclusive Heritage Collection Eligible',
    color: '#7C3AED',
  },
];

/** Loan-to-Value ratio used for loan eligibility. Configurable. */
export const LTV_RATIO = 0.85;

/** Minimum gold balance (grams) required to gift gold */
export const GIFT_MIN_GRAMS = 50;

/**
 * Returns the experience tier for a given gold balance.
 */
export function getExperienceTier(grams: number): ExperienceTier {
  return (
    EXPERIENCE_TIERS.find((t) => grams >= t.minGrams && grams < t.maxGrams) ??
    EXPERIENCE_TIERS[EXPERIENCE_TIERS.length - 1]
  );
}
