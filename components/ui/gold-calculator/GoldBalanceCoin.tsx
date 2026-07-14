'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

interface GoldBalanceCoinProps {
  grams: number;
  size?: 'sm' | 'md' | 'lg';
  trigger?: number; // increment to trigger pop animation
}

const sizeMap = {
  sm: { coin: 64, icon: 26, glyph: '✦' },
  md: { coin: 80, icon: 32, glyph: '✦' },
  lg: { coin: 100, icon: 40, glyph: '✦' },
};

export function GoldBalanceCoin({ grams, size = 'md', trigger = 0 }: GoldBalanceCoinProps) {
  const dims = sizeMap[size];
  const popScale = useMotionValue(1);
  const springScale = useSpring(popScale, { stiffness: 280, damping: 18 });

  useEffect(() => {
    if (trigger === 0) return;
    popScale.set(1.18);
    const t = setTimeout(() => popScale.set(1), 400);
    return () => clearTimeout(t);
  }, [trigger, popScale]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        {/* Outermost ambient glow */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: dims.coin * 1.9, height: dims.coin * 1.9 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Mid glow ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: dims.coin * 1.45, height: dims.coin * 1.45 }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(245,197,66,0.28) 0%, transparent 65%)`,
            }}
          />
        </motion.div>

        {/* Coin body — slow rotation */}
        <motion.div
          style={{ scale: springScale }}
          animate={{ rotateY: [0, 360] }}
          transition={{
            rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
          }}
          className="relative z-10"
        >
          <div
            style={{
              width: dims.coin,
              height: dims.coin,
              borderRadius: '50%',
              background:
                'conic-gradient(from 30deg, #B8860B 0deg, #D4AF37 40deg, #F5C542 80deg, #FFD700 100deg, #D4AF37 130deg, #B8860B 180deg, #D4AF37 210deg, #F5C542 250deg, #FFD700 280deg, #B8860B 330deg, #D4AF37 360deg)',
              boxShadow: `0 0 ${dims.coin * 0.4}px rgba(212,175,55,0.7), 0 0 ${dims.coin * 0.7}px rgba(212,175,55,0.25), inset 0 3px 10px rgba(255,255,255,0.45), inset 0 -3px 8px rgba(0,0,0,0.35)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Shine overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.5) 0%, transparent 55%)',
              }}
            />
            {/* L glyph */}
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: dims.icon * 0.6,
                fontWeight: 900,
                color: '#4A3000',
                letterSpacing: '-0.03em',
                fontFamily: 'serif',
                textShadow: '0 1px 3px rgba(0,0,0,0.35)',
                userSelect: 'none',
              }}
            >
              L
            </span>
          </div>
        </motion.div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: 'rgba(212,175,55,0.7)' }}
        >
          Gold Balance
        </p>
        <motion.p
          key={Math.round(grams * 100)}
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          className="text-2xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F5C542 45%, #B8860B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {grams.toFixed(2)} g
        </motion.p>
      </div>
    </div>
  );
}
