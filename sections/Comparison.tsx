"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const features = [
  "Investment",
  "Experience",
  "Liquidity",
  "Loans",
  "Gifting",
  "Yield Generation",
];

const competitors = [
  { name: "LIMOVI", isMain: true, checks: [true, true, true, true, true, true] },
  { name: "Traditional Banks", isMain: false, checks: [false, false, false, true, false, false] },
  { name: "Digital Gold", isMain: false, checks: [true, false, true, false, true, false] },
  { name: "Jewellers", isMain: false, checks: [false, true, false, false, false, false] },
  { name: "Gold Loan Apps", isMain: false, checks: [false, false, false, true, false, false] },
];

export function Comparison() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">Why LIMOVI Wins 🥇</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            The only platform providing a complete 360° ecosystem for your gold assets.
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto pb-8">
          <div className="min-w-[800px] grid grid-cols-6 gap-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            
            {/* Headers */}
            <div className="col-span-1" />
            {competitors.map((comp, i) => (
              <div key={i} className={`text-center font-bold p-4 rounded-t-2xl ${comp.isMain ? 'bg-brand-secondary/10 text-brand-secondary border-t border-x border-brand-secondary/20' : 'text-slate-600'}`}>
                {comp.name}
              </div>
            ))}

            {/* Rows */}
            {features.map((feature, rowIdx) => (
              <div key={rowIdx} className="col-span-6 grid grid-cols-6 gap-4 items-center">
                <div className="col-span-1 p-4 text-slate-700 font-bold border-b border-slate-100">
                  {feature}
                </div>
                {competitors.map((comp, colIdx) => (
                  <div 
                    key={colIdx} 
                    className={`col-span-1 p-4 flex justify-center items-center border-b ${comp.isMain ? 'bg-brand-secondary/5 border-brand-secondary/20 border-x' : 'border-slate-100'}`}
                  >
                    {comp.checks[rowIdx] ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${comp.isMain ? 'bg-brand-secondary text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300">
                        <Minus size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
            
            {/* Footer Bottom Border for Main Column */}
            <div className="col-span-1" />
            {competitors.map((comp, i) => (
              <div key={i} className={`col-span-1 ${comp.isMain ? 'h-4 bg-brand-secondary/5 border-b border-x border-brand-secondary/20 rounded-b-2xl' : ''}`} />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
