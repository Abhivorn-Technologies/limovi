'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

export type TimelineKey = '1Y' | '3Y' | '5Y' | '10Y' | 'custom';

export const TIMELINE_YEARS: Record<Exclude<TimelineKey, 'custom'>, number> = {
  '1Y': 1,
  '3Y': 3,
  '5Y': 5,
  '10Y': 10,
};

interface TimelineSelectorProps {
  selected: TimelineKey;
  customDate: string;
  onSelect: (key: TimelineKey) => void;
  onCustomDateChange: (isoDate: string) => void;
}

const PRESETS: { label: string; sub: string; key: Exclude<TimelineKey, 'custom'> }[] = [
  { label: '1 Year', sub: 'Short', key: '1Y' },
  { label: '3 Years', sub: 'Mid', key: '3Y' },
  { label: '5 Years', sub: 'Growth', key: '5Y' },
  { label: '10 Years', sub: 'Long', key: '10Y' },
];

const minDate = '2000-01-01';

const maxDate = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export function TimelineSelector({ selected, customDate, onSelect, onCustomDateChange }: TimelineSelectorProps) {
  const [showPicker, setShowPicker] = useState(selected === 'custom');

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
        Investment Timeline
      </p>

      <div className="grid grid-cols-4 gap-1.5">
        {PRESETS.map((p) => {
          const active = selected === p.key;
          return (
            <button
              key={p.key}
              onClick={() => { onSelect(p.key); setShowPicker(false); }}
              className="flex flex-col items-center py-2.5 rounded-xl text-center transition-all duration-200"
              style={
                active
                  ? {
                      background: 'linear-gradient(135deg,#D4AF37,#B8860B)',
                      color: '#fff',
                      boxShadow: '0 4px 14px rgba(212,175,55,0.5)',
                    }
                  : {
                      background: 'rgba(212,175,55,0.07)',
                      color: '#92692a',
                      border: '1px solid rgba(212,175,55,0.22)',
                    }
              }
            >
              <span className="text-[11px] font-black">{p.label}</span>
              <span className="text-[9px] opacity-70 font-medium">{p.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Custom date trigger */}
      <button
        onClick={() => { onSelect('custom'); setShowPicker(true); }}
        className="w-full flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200"
        style={
          selected === 'custom'
            ? { background: 'rgba(11,98,214,0.08)', border: '1.5px solid #0B62D6', color: '#0B62D6' }
            : { background: 'rgba(11,98,214,0.03)', border: '1px dashed rgba(11,98,214,0.25)', color: '#64748b' }
        }
      >
        <Calendar size={12} />
        <span>Custom Investment Date</span>
        {selected === 'custom' && customDate && (
          <span className="ml-auto font-bold opacity-80">
            {new Date(customDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        )}
      </button>

      {showPicker && (
        <input
          type="date"
          value={customDate}
          min={minDate}
          max={maxDate()}
          onChange={(e) => onCustomDateChange(e.target.value)}
          className="w-full px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold border outline-none"
          style={{ borderColor: 'rgba(11,98,214,0.25)', color: '#0B62D6', background: 'rgba(11,98,214,0.04)' }}
          aria-label="Custom investment date"
        />
      )}
    </div>
  );
}
