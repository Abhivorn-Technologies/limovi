'use client';

import { useCallback } from 'react';

interface InvestmentSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const MIN = 10_000;
const MAX = 50_00_000;
const STEP = 10_000;

const PRESETS = [
  { label: '10K', value: 10_000 },
  { label: '1L', value: 1_00_000 },
  { label: '5L', value: 5_00_000 },
  { label: '10L', value: 10_00_000 },
  { label: '25L', value: 25_00_000 },
  { label: '50L', value: 50_00_000 },
];

function formatDisplay(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function InvestmentSlider({ value, onChange }: InvestmentSliderProps) {
  const pct = ((value - MIN) / (MAX - MIN)) * 100;

  const handleRange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
    [onChange]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(n)) onChange(Math.min(MAX, Math.max(MIN, n)));
    },
    [onChange]
  );

  return (
    <div className="space-y-3">
      {/* Input display */}
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold"
          style={{ color: '#0B62D6' }}
        >
          ₹
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={formatDisplay(value)}
          onChange={handleInput}
          className="w-full pl-7 pr-3 py-2.5 text-xl font-black rounded-xl border-2 outline-none transition-all"
          style={{
            background: 'rgba(11,98,214,0.04)',
            borderColor: 'rgba(11,98,214,0.25)',
            color: '#0B62D6',
            caretColor: '#0B62D6',
          }}
          aria-label="Investment amount in rupees"
        />
      </div>

      {/* Slider */}
      <div className="relative h-5 flex items-center">
        {/* Track BG */}
        <div className="absolute w-full h-1.5 rounded-full" style={{ background: 'rgba(11,98,214,0.12)' }} />
        {/* Filled track */}
        <div
          className="absolute h-1.5 rounded-full transition-all duration-100"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#0B62D6,#002771)' }}
        />
        {/* Native range (invisible, handles interaction) */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value}
          onChange={handleRange}
          className="absolute w-full h-5 opacity-0 cursor-pointer z-10"
          aria-label="Investment amount slider"
        />
        {/* Custom thumb */}
        <div
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none transition-all duration-100"
          style={{
            left: `calc(${pct}% - 10px)`,
            background: 'linear-gradient(135deg,#0B62D6,#002771)',
            boxShadow: '0 2px 10px rgba(11,98,214,0.55)',
          }}
        />
      </div>

      {/* Range hints */}
      <div className="flex justify-between text-[10px] font-semibold" style={{ color: '#94a3b8' }}>
        <span>₹10,000</span>
        <span>₹50,00,000</span>
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
                  ? { background: 'linear-gradient(135deg,#0B62D6,#002771)', color: '#fff', boxShadow: '0 3px 10px rgba(11,98,214,0.4)' }
                  : { background: 'rgba(11,98,214,0.07)', color: '#0B62D6', border: '1px solid rgba(11,98,214,0.2)' }
              }
            >
              ₹{p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
