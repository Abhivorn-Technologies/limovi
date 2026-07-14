import { NextRequest } from 'next/server';

const GOLD_API_KEY = process.env.GOLD_API_KEY;

/**
 * Returns the 24K gold price per gram (INR) for a given date.
 *
 * Query params:
 *   date  — ISO date string, e.g. "2023-07-14"  (required)
 *
 * Fallback historical prices (approximate INR/gram) are used when
 * GOLD_API_KEY is not set.
 */

export interface GoldHistoryResponse {
  date: string;
  price: number;        // ₹ per gram (24K) on that date
  currency: 'INR';
  isLive: boolean;
  error?: string;
}

// Approximate INR per gram at various points in time (for demo / fallback).
// Derived from public IBJA data. Update periodically.
const FALLBACK_PRICES: Record<string, number> = {
  '1Y': 8_600,   // ~1 year ago
  '3Y': 5_900,   // ~3 years ago
  '5Y': 4_800,   // ~5 years ago
  '10Y': 2_950,  // ~10 years ago
};

function formatDateForAPI(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${dd}`;
}

function pricePerGram(troyOzPrice: number): number {
  return troyOzPrice / 31.1035;
}

/**
 * Resolve which fallback key to use given a date ISO string vs. today.
 */
function fallbackForDate(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const yearsAgo = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  if (yearsAgo >= 8) return FALLBACK_PRICES['10Y'];
  if (yearsAgo >= 4) return FALLBACK_PRICES['5Y'];
  if (yearsAgo >= 2) return FALLBACK_PRICES['3Y'];
  return FALLBACK_PRICES['1Y'];
}

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = req.nextUrl;
  const dateParam = searchParams.get('date');

  if (!dateParam) {
    return Response.json({ error: 'Missing required query param: date' }, { status: 400 });
  }

  const targetDate = new Date(dateParam);
  if (isNaN(targetDate.getTime())) {
    return Response.json({ error: `Invalid date: ${dateParam}` }, { status: 400 });
  }

  const isoDate = targetDate.toISOString().split('T')[0];

  if (!GOLD_API_KEY) {
    console.warn(`[gold-history] GOLD_API_KEY not set — returning fallback for ${isoDate}.`);
    return Response.json({
      date: isoDate,
      price: fallbackForDate(isoDate),
      currency: 'INR',
      isLive: false,
    } satisfies GoldHistoryResponse);
  }

  try {
    const apiDate = formatDateForAPI(targetDate);
    const res = await fetch(`https://www.goldapi.io/api/XAU/INR/${apiDate}`, {
      headers: {
        'x-access-token': GOLD_API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 86400 }, // cache historical prices for 24h
    });

    if (!res.ok) throw new Error(`GoldAPI ${res.status}`);

    const data = await res.json();
    const price = Math.round(pricePerGram(data.price));

    return Response.json(
      {
        date: isoDate,
        price,
        currency: 'INR',
        isLive: true,
      } satisfies GoldHistoryResponse,
      { headers: { 'Cache-Control': 's-maxage=86400' } }
    );
  } catch (err) {
    console.error(`[gold-history] Error fetching ${isoDate}:`, err);
    return Response.json({
      date: isoDate,
      price: fallbackForDate(isoDate),
      currency: 'INR',
      isLive: false,
      error: String(err),
    } satisfies GoldHistoryResponse);
  }
}
