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
                  <p className="text-sm text-slate-600">Your gold powers our <strong className="text-slate-800">Jewellery Experience platform</strong> securely.</p>
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
            <div className="relative z-10 w-full max-w-sm bg-white border border-slate-100 rounded-2xl p-5 sm:p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-[#005CB9]/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <HandCoins className="w-7 h-7 text-[#005CB9]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Dividend Payout</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-sm leading-tight">Registered Date</span>
                  <span className="font-bold text-slate-800 text-sm text-right">15 Jan 2026</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-sm leading-tight">Gold Asset</span>
                  <span className="font-bold text-[#D4AF37] text-sm text-right">100.00g (24K)</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-sm leading-tight">Experience Value</span>
                  <span className="font-bold text-slate-800 text-sm text-right">₹ 12,000</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-sm leading-tight">Your Dividend (25%)</span>
                  <span className="font-bold text-green-600 text-sm text-right">+ ₹ 3,000</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-sm leading-tight">Status</span>
                  <span className="font-bold text-slate-800 text-sm flex items-center gap-1 justify-end">
                    <CheckCircle2 size={14} className="text-green-500" />
                    Credited
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 text-sm leading-tight flex-1">Total Wealth Generated (Till Today)</span>
                  <span className="font-bold text-green-600 text-sm text-right whitespace-nowrap mt-0.5">₹ 45,000</span>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
