"use client";

import { motion } from "framer-motion";
import { HandCoins, CheckCircle2 } from "lucide-react";

export function WealthGen() {
  return (
    <section id="wealth" className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HandCoins className="text-[#005CB9] w-5 h-5" />
              <span className="text-[#005CB9] font-bold uppercase tracking-widest text-sm">Wealth Generation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#005CB9] mb-6 tracking-tight leading-tight">
              Grow Wealth, Not Just Grams
            </h2>
            <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
              Your gold shouldn't just sit in a locker. Turn a passive ornament into a dividend-paying asset with our Circular Economy, earning up to a <strong className="text-[#005CB9]">25% commercial dividend</strong>.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">How your Gold generates wealth:</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#005CB9]/10 text-[#005CB9] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                  <p className="text-sm text-slate-600">Your gold powers our <strong className="text-slate-800">Luxury Jewellery Cloud</strong> securely.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <p className="text-sm text-slate-600">Receive a <strong className="text-slate-800">25% commercial dividend</strong> on every experience charge generated.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: IMAGE/CARD UI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[460px] sm:h-[550px] py-10 sm:py-0 rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-xl"
          >
            <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-13 h-13 bg-[#005CB9]/10 rounded-full mx-auto flex items-center justify-center mb-3">
                  <HandCoins className="w-7 h-7 text-[#005CB9]" />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Dividend Payout</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Commercial Dividend Example</p>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {/* 1. Registered Date */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
                  <span className="text-slate-600 font-medium leading-tight">1. Registered Date</span>
                  <span className="font-bold text-slate-900 text-right">27 July 2026</span>
                </div>

                {/* 2. Gold Asset */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
                  <span className="text-slate-600 font-medium leading-tight">2. Gold Asset</span>
                  <span className="font-bold text-[#B8860B] text-right">50.00g (24K) Necklace</span>
                </div>

                {/* 3. Gold Asset Value */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
                  <span className="text-slate-600 font-medium leading-tight">3. Gold Asset Value</span>
                  <span className="font-bold text-slate-900 text-right">₹ 7,20,000</span>
                </div>

                {/* 4. Experience Value (0.9% of Gold Asset Value) */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-blue-50/60 px-3 py-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-tight flex-1">
                    4. Experience Value <span className="text-[10px] text-slate-500 font-normal leading-snug block sm:inline">(0.9% of Gold Asset Value)</span>
                  </span>
                  <span className="font-bold text-[#003D80] text-xs text-right whitespace-nowrap">₹ 6,480 / Exp</span>
                </div>

                {/* 5. Your Dividend (25% of Gold Experience Value) */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-emerald-50/80 px-3 py-2 rounded-lg border border-emerald-200/40">
                  <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-tight flex-1">
                    5. Your Dividend <span className="text-[10px] text-emerald-700/80 font-normal leading-snug block sm:inline">(25% of Gold Experience Value)</span>
                  </span>
                  <span className="font-extrabold text-emerald-700 text-xs text-right whitespace-nowrap">+ ₹ 1,620 / Exp</span>
                </div>

                {/* 6. Total Wealth Generated Per Year (Minimum 5 Experiences) */}
                <div className="flex items-center justify-between pt-1 gap-3 px-1">
                  <span className="text-xs sm:text-sm text-slate-600 font-bold leading-tight flex-1">
                    6. Total Wealth Generated <span className="text-[10px] text-slate-500 font-normal leading-snug block sm:inline">(Minimum 5 Experiences)</span>
                  </span>
                  <span className="font-black text-emerald-600 text-xs sm:text-sm text-right whitespace-nowrap">₹ 8,100 / Year</span>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
