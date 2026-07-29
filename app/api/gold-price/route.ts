import { NextRequest } from 'next/server';

const GOLD_API_KEY = process.env.GOLD_API_KEY;

export interface GoldPriceResponse {
  price: number;    // ₹ per gram (24K)
  currency: 'INR';
  metal: 'XAU';
  purity: '24K';
  timestamp: string;
  isLive: boolean;
  change?: number;  // ₹ change from previous close per gram
  provider?: string;
  error?: string;
}

const FALLBACK: GoldPriceResponse = {
  price: 14400,
  currency: 'INR',
  metal: 'XAU',
  purity: '24K',
  timestamp: new Date().toISOString(),
  isLive: false,
};

// Indian Market Multiplier: ~12.5% Import Duty + 3% GST + local jeweller premium ≈ 15.96% (1.1596x)
const INDIAN_MARKET_MULTIPLIER = 1.1596;

function pricePerGram(troyOzPrice: number): number {
  // 1 troy oz = 31.1035 g
  return (troyOzPrice / 31.1035) * INDIAN_MARKET_MULTIPLIER;
}

/** Primary Provider: goldapi.io (requires GOLD_API_KEY) */
async function fetchFromGoldAPIio(): Promise<{ price: number; change: number } | null> {
  if (!GOLD_API_KEY) return null;
  const res = await fetch('https://www.goldapi.io/api/XAU/INR', {
    headers: {
      'x-access-token': GOLD_API_KEY,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`GoldAPI.io returned HTTP ${res.status}`);
  const data = await res.json();
  const price = Math.round(pricePerGram(data.price));
  const prevGram = pricePerGram(data.prev_close_price ?? data.price);
  const change = Math.round(price - prevGram);
  return { price, change };
}

/** Secondary Fallback Provider: gold-api.com (free open endpoint) */
async function fetchFromGoldAPIcom(): Promise<{ price: number; change: number }> {
  const res = await fetch('https://api.gold-api.com/price/XAU/INR', {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`gold-api.com returned HTTP ${res.status}`);
  const data = await res.json();
  if (typeof data.price !== 'number' || data.price <= 0) {
    throw new Error('Invalid price data from gold-api.com');
  }
  const price = Math.round(pricePerGram(data.price));
  return { price, change: 0 };
}

export async function GET(_req: NextRequest): Promise<Response> {
  // 1. Try Primary Provider (goldapi.io with GOLD_API_KEY)
  if (GOLD_API_KEY) {
    try {
      const primaryData = await fetchFromGoldAPIio();
      if (primaryData) {
        return Response.json(
          {
            price: primaryData.price,
            change: primaryData.change,
            currency: 'INR',
            metal: 'XAU',
            purity: '24K',
            timestamp: new Date().toISOString(),
            isLive: true,
            provider: 'goldapi.io',
          } satisfies GoldPriceResponse,
          { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' } }
        );
      }
    } catch (err) {
      console.warn('[gold-price] Primary provider (goldapi.io) failed:', String(err));
    }
  }

  // 2. Try Secondary Fallback Provider (gold-api.com)
  try {
    const secondaryData = await fetchFromGoldAPIcom();
    return Response.json(
      {
        price: secondaryData.price,
        change: secondaryData.change,
        currency: 'INR',
        metal: 'XAU',
        purity: '24K',
        timestamp: new Date().toISOString(),
        isLive: true,
        provider: 'gold-api.com',
      } satisfies GoldPriceResponse,
      { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' } }
    );
  } catch (err) {
    console.warn('[gold-price] Secondary provider (gold-api.com) failed:', String(err));
  }

  // 3. Static Benchmark Rate Fallback
  return Response.json(
    {
      ...FALLBACK,
      timestamp: new Date().toISOString(),
      error: 'All live providers unavailable. Using benchmark rate.',
    } satisfies GoldPriceResponse,
    { headers: { 'Cache-Control': 's-maxage=60' } }
  );
}
