'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

export type TimelineKey = '1Y' | '3Y' | '5Y' | '10Y';

export const TIMELINE_YEARS: Record<TimelineKey, number> = {
  '1Y': 1,
  '3Y': 3,
  '5Y': 5,
  '10Y': 10,
};

interface TimelineSelectorProps {
  selected: TimelineKey | null;
  onSelect: (key: TimelineKey | null) => void;
}

const PRESETS: { label: string; sub: string; key: TimelineKey }[] = [
  { label: '1 Year', sub: '1Y Ahead', key: '1Y' },
  { label: '3 Years', sub: '3Y Ahead', key: '3Y' },
  { label: '5 Years', sub: '5Y Ahead', key: '5Y' },
  { label: '10 Years', sub: '10Y Ahead', key: '10Y' },
];

const minDate = '2000-01-01';
export function TimelineSelector({ selected, onSelect }: TimelineSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
        Investment Timeline (Projection)
      </p>

      <div className="grid grid-cols-4 gap-1.5">
        {PRESETS.map((p) => {
          const active = selected === p.key;
          return (
            <button
              key={p.key}
              onClick={() => { active ? onSelect(null) : onSelect(p.key); }}
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
    </div>
  );
}
