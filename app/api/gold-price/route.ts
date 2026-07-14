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
  price: 9850,
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
    if (!res.ok) throw new Error(`GoldAPI ${res.status}`);

    const data = await res.json();
    const price = Math.round(pricePerGram(data.price));
    const prevGram = pricePerGram(data.prev_close_price ?? data.price);
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
    console.error('[gold-price] Error:', err);
    return Response.json({ ...FALLBACK, error: String(err) });
  }
}
