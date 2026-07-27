'use client';

import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

interface JewelleryExperiencesSelectorProps {
  luxuryCount: number;
  setLuxuryCount: (val: number) => void;
  lifestyleCount: number;
  setLifestyleCount: (val: number) => void;
}

const COUNTS = [1, 2, 3, 4, 5];

export function JewelleryExperiencesSelector({
  luxuryCount,
  setLuxuryCount,
  lifestyleCount,
  setLifestyleCount,
}: JewelleryExperiencesSelectorProps) {
  return (
    <div className="space-y-2 rounded-2xl p-2.5" style={{ background: 'rgba(11,98,214,0.03)', border: '1px solid rgba(11,98,214,0.08)' }}>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
          Jewellery Experiences Per Year
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Luxury Jewellery Experiences */}
        <div className="rounded-xl p-2 bg-white/40 dark:bg-slate-900/40 border border-amber-500/20">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <Crown size={11} className="text-amber-500" />
              <span className="text-[9.5px] font-bold text-slate-700 dark:text-slate-200">
                Luxury Jewellery
              </span>
            </div>
            <span className="text-[8.5px] font-semibold text-amber-600 dark:text-amber-400">
              14% / exp
            </span>
          </div>

          <div className="flex items-center gap-1 justify-between">
            {COUNTS.map((num) => {
              const active = luxuryCount === num;
              return (
                <button
                  key={`lux-${num}`}
                  type="button"
                  onClick={() => setLuxuryCount(num)}
                  className={`flex-1 h-6 rounded-md text-[10px] font-black transition-all ${
                    active
                      ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-amber-500/10'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lifestyle Jewellery Experiences */}
        <div className="rounded-xl p-2 bg-white/40 dark:bg-slate-900/40 border border-blue-500/20">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <Sparkles size={11} className="text-blue-500" />
              <span className="text-[9.5px] font-bold text-slate-700 dark:text-slate-200">
                Lifestyle Jewellery
              </span>
            </div>
            <span className="text-[8.5px] font-semibold text-blue-600 dark:text-blue-400">
              7% / exp
            </span>
          </div>

          <div className="flex items-center gap-1 justify-between">
            {COUNTS.map((num) => {
              const active = lifestyleCount === num;
              return (
                <button
                  key={`life-${num}`}
                  type="button"
                  onClick={() => setLifestyleCount(num)}
                  className={`flex-1 h-6 rounded-md text-[10px] font-black transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-blue-500/10'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
