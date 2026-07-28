"use client";

import { useMemo } from "react";
import { 
  Crown, 
  Landmark, 
  IndianRupee, 
  HandCoins, 
  Gem, 
  Sparkles, 
  TrendingUp, 
  Infinity as InfinityIcon, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Gift 
} from "lucide-react";

// Deterministic pseudo-random number generator to prevent React SSR hydration mismatches
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function DoodleIconBackground() {
  const icons = [
    Crown, 
    Landmark, 
    IndianRupee, 
    HandCoins, 
    Gem, 
    Sparkles, 
    TrendingUp, 
    InfinityIcon, 
    ShieldCheck, 
    Clock, 
    Zap, 
    Gift 
  ];

  // Pre-generate 950 densely packed jumbled doodle items with zero gaps
  const jumbledItems = useMemo(() => {
    const items = [];
    let seed = 98765;

    for (let i = 0; i < 950; i++) {
      seed += 1;
      const iconIndex = Math.floor(pseudoRandom(seed) * icons.length);
      seed += 1;
      const rotate = Math.floor(pseudoRandom(seed) * 130) - 65; // -65deg to +65deg
      seed += 1;
      const size = Math.floor(pseudoRandom(seed) * 14) + 18; // 18px to 32px
      seed += 1;
      const offsetX = Math.floor(pseudoRandom(seed) * 16) - 8; // tight -8px to +8px
      seed += 1;
      const offsetY = Math.floor(pseudoRandom(seed) * 16) - 8; // tight -8px to +8px
      seed += 1;
      const isDot = pseudoRandom(seed) > 0.75; // ~25% accent dots
      seed += 1;
      const dotSize = Math.floor(pseudoRandom(seed) * 4) + 3;

      items.push({
        id: i,
        Icon: icons[iconIndex],
        rotate,
        size,
        offsetX,
        offsetY,
        isDot,
        dotSize,
      });
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.08] z-0 w-full h-full min-h-full">
      <div 
        className="w-full h-full min-h-full grid grid-cols-10 sm:grid-cols-14 md:grid-cols-18 lg:grid-cols-24 xl:grid-cols-28 gap-1 sm:gap-1.5 p-1 items-center justify-items-center auto-rows-min"
      >
        {jumbledItems.map((item, idx) => {
          const Icon = item.Icon;
          const rowShift = (Math.floor(idx / 18) % 2 === 0) ? "translate-x-2" : "-translate-x-2";
          
          if (item.isDot) {
            return (
              <div
                key={item.id}
                className={`flex items-center justify-center ${rowShift}`}
                style={{
                  transform: `translate(${item.offsetX}px, ${item.offsetY}px)`,
                }}
              >
                <div 
                  className="rounded-full bg-slate-600 opacity-60" 
                  style={{ width: item.dotSize, height: item.dotSize }} 
                />
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`flex items-center justify-center text-slate-600 ${rowShift}`}
              style={{
                transform: `translate(${item.offsetX}px, ${item.offsetY}px) rotate(${item.rotate}deg)`,
                padding: "1px",
              }}
            >
              <Icon size={item.size} strokeWidth={1.2} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
