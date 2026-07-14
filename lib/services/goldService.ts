/**
 * LIMOVI Gold Service — client-side only.
 * Communicates with our Next.js Route Handlers (never the external API directly).
 */

export interface GoldPriceData {
  price: number;
  change?: number;
  currency: string;
  metal: string;
  purity: string;
  timestamp: string;
  isLive: boolean;
  error?: string;
}

export interface GoldHistoryData {
  date: string;
  price: number;
  currency: string;
  isLive: boolean;
  error?: string;
}

// In-memory cache keyed by date string
const historyCache: Map<string, GoldHistoryData> = new Map();
let priceCache: { data: GoldPriceData; fetchedAt: number } | null = null;
const PRICE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches the live 24K gold price in INR.
 * Result is cached in-memory for 5 minutes.
 */
export async function fetchGoldPrice(force = false): Promise<GoldPriceData> {
  const now = Date.now();
  if (!force && priceCache && now - priceCache.fetchedAt < PRICE_TTL_MS) {
    return priceCache.data;
  }
  const res = await fetch('/api/gold-price');
  if (!res.ok) throw new Error(`Failed to fetch gold price: ${res.status}`);
  const data: GoldPriceData = await res.json();
  priceCache = { data, fetchedAt: now };
  return data;
}

/**
 * Fetches the 24K gold price per gram (INR) for a specific date.
 * Uses the `?date=YYYY-MM-DD` endpoint. Cached for the session.
 */
export async function fetchGoldPriceOnDate(isoDate: string): Promise<GoldHistoryData> {
  if (historyCache.has(isoDate)) {
    return historyCache.get(isoDate)!;
  }
  const res = await fetch(`/api/gold-history?date=${encodeURIComponent(isoDate)}`);
  if (!res.ok) throw new Error(`Failed to fetch history for ${isoDate}: ${res.status}`);
  const data: GoldHistoryData = await res.json();
  historyCache.set(isoDate, data);
  return data;
}

/**
 * Returns an ISO date string for N years ago from today.
 */
export function dateYearsAgo(years: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d.toISOString().split('T')[0];
}
