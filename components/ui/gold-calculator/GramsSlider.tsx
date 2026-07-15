'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { ENROL_MIN_GRAMS, ENROL_MAX_GRAMS, ENROL_DEFAULT_GRAMS, MIN_INVEST_GRAMS } from '@/lib/constants/strategyRules';

interface GramsSliderProps {
  value: number;
  onChange: (grams: number) => void;
}

const PRESETS = [
  { label: '50g', value: 50 },
  { label: '100g', value: 100 },
  { label: '200g', value: 200 },
  { label: '500g', value: 500 },
];

export { ENROL_DEFAULT_GRAMS };

export function GramsSlider({ value, onChange }: GramsSliderProps) {
  const pct = ((value - ENROL_MIN_GRAMS) / (ENROL_MAX_GRAMS - ENROL_MIN_GRAMS)) * 100;

  const handleRange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
    [onChange]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
      if (!isNaN(n)) onChange(Math.min(ENROL_MAX_GRAMS, Math.max(ENROL_MIN_GRAMS, n)));
    },
    [onChange]
  );

  return (
    <div className="space-y-3">
      {/* Input display */}
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleInput}
          className="w-full pr-10 pl-3 py-2.5 text-xl font-black rounded-xl border-2 outline-none transition-all"
          style={{
            background: 'rgba(212,175,55,0.06)',
            borderColor: 'rgba(212,175,55,0.35)',
            color: '#7A5E00',
            caretColor: '#D4AF37',
          }}
          aria-label="Gold balance in grams"
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold"
          style={{ color: '#D4AF37' }}
        >
          g
        </span>
      </div>

      {/* Slider */}
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.15)' }} />
        <div
          className="absolute h-1.5 rounded-full transition-all duration-100"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#D4AF37,#B8860B)' }}
        />
        <input
          type="range"
          min={ENROL_MIN_GRAMS}
          max={ENROL_MAX_GRAMS}
          step={1}
          value={value}
          onChange={handleRange}
          className="absolute w-full h-5 opacity-0 cursor-pointer z-10"
          aria-label="Gold balance grams slider"
        />
        <div
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none transition-all duration-100"
          style={{
            left: `calc(${pct}% - 10px)`,
            background: 'linear-gradient(135deg,#D4AF37,#B8860B)',
            boxShadow: '0 2px 10px rgba(212,175,55,0.6)',
          }}
        />
      </div>

      {/* Range hints */}
      <div className="flex justify-between text-[10px] font-semibold" style={{ color: '#94a3b8' }}>
        <span>{ENROL_MIN_GRAMS}g</span>
        <span>{ENROL_MAX_GRAMS}g</span>
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((p) => {
          const active = value === p.value;
          return (
            <button
              key={p.value}
              onClick={() => onChange(p.value)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all duration-150"
              style={
                active
                  ? { background: 'linear-gradient(135deg,#D4AF37,#B8860B)', color: '#3D2800', boxShadow: '0 3px 10px rgba(212,175,55,0.5)' }
                  : { background: 'rgba(212,175,55,0.1)', color: '#92692a', border: '1px solid rgba(212,175,55,0.25)' }
              }
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Minimum grams warning */}
      <AnimatePresence>
        {value < MIN_INVEST_GRAMS && (
          <motion.div
            key="min-warning"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div
              className="flex items-start gap-2 px-3 py-2.5 rounded-xl"
              style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.35)',
              }}
            >
              <AlertTriangle size={13} color="#D97706" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black" style={{ color: '#92400e' }}>
                  Minimum {MIN_INVEST_GRAMS}g required
                </p>
                <p className="text-[10px] font-medium mt-0.5" style={{ color: '#B45309' }}>
                  Selected {value}g is below the minimum gold balance.
                </p>
              </div>
              <button
                onClick={() => onChange(MIN_INVEST_GRAMS)}
                className="flex-shrink-0 px-2 py-1 rounded-lg text-[10px] font-black transition-all duration-150"
                style={{
                  background: 'rgba(245,158,11,0.2)',
                  color: '#92400e',
                  border: '1px solid rgba(245,158,11,0.4)',
                }}
                aria-label={`Set to minimum ${MIN_INVEST_GRAMS}g`}
              >
                Set {MIN_INVEST_GRAMS}g
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
