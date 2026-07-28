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

async function fetchFromGoldAPI(path: string): Promise<Response> {
  return fetch(`https://www.goldapi.io/api${path}`, {
    headers: {
      'x-access-token': GOLD_API_KEY!,
      'Content-Type': 'application/json',
    },
  });
}

function pricePerGram(troyOzPrice: number): number {
  // 1 troy oz = 31.1035 g
  return troyOzPrice / 31.1035;
}

export async function GET(_req: NextRequest): Promise<Response> {
  if (!GOLD_API_KEY) {
    console.warn('[gold-price] GOLD_API_KEY not set — returning fallback.');
    return Response.json(FALLBACK);
  }

  try {
    const res = await fetchFromGoldAPI('/XAU/INR');
    if (!res.ok) {
      console.warn(`[gold-price] GoldAPI HTTP ${res.status} — using static benchmark rate (₹14,400).`);
      return Response.json(FALLBACK);
    }

    const data = await res.json();
    // Indian Market Multiplier: ~12.5% Import Duty + 3% GST + local jeweller premium ≈ 15.95% (1.1595x)
    const INDIAN_MARKET_MULTIPLIER = 1.1596;
    const price = Math.round(pricePerGram(data.price) * INDIAN_MARKET_MULTIPLIER);
    const prevGram = pricePerGram(data.prev_close_price ?? data.price) * INDIAN_MARKET_MULTIPLIER;
    const change = Math.round(price - prevGram);

    return Response.json(
      {
        price,
        change,
        currency: 'INR',
        metal: 'XAU',
        purity: '24K',
        timestamp: new Date().toISOString(),
        isLive: true,
      } satisfies GoldPriceResponse,
      { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' } }
    );
  } catch (err) {
    console.warn('[gold-price] Network error — using static benchmark rate (₹14,400):', String(err));
    return Response.json({ ...FALLBACK, error: String(err) });
  }
}
