"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/ui/counter";
import { Lock, TrendingDown, Hourglass, ArrowRight, ArrowDown, Smartphone, Gem, X } from "lucide-react";


export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div style={{ y, opacity }} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
            The Gold Ownership Gap
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Gold has always been a store of value and a symbol of experience—but rarely both at the same time. You either invest for the future or own jewellery to enjoy today. This fragmented approach limits your gold to a single purpose, leaving its broader potential untapped.
          </p>
        </motion.div>

        {/* ── Clean Comparison UI ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 w-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* Digital Gold Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-[0_10px_30px_rgba(10,37,64,0.08)] transition-all relative">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="p-3 bg-brand-primary/10 rounded-2xl">
                  <Smartphone size={28} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Digital Gold</h3>
                  <p className="text-sm text-slate-500">Convenient, but limited to value holding</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Cannot be worn, displayed or experienced as jewellery",
                  "Buying and selling may involve spreads, taxes and provider-specific charges",
                  "Physical redemption or delivery may involve additional costs and conditions",
                  "Offers limited connection to jewellery and lifestyle experiences",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 bg-red-50 p-1 rounded-full text-red-500 flex-shrink-0">
                      <X size={14} strokeWidth={3} />
                    </span>
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-center">
                  <h4 className="text-red-700 font-bold text-sm mb-0.5">Value Without Experience</h4>
                  <p className="text-red-600/80 text-xs font-medium">Your gold may hold value, but its everyday utility remains limited.</p>
                </div>
              </div>
            </div>

            {/* Physical Jewellery Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-[0_10px_30px_rgba(10,37,64,0.08)] transition-all relative">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="p-3 bg-yellow-500/10 rounded-2xl">
                  <Gem size={28} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Physical Jewellery</h3>
                  <p className="text-sm text-slate-500">Meaningful to own, but less flexible</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Making and wastage charges can increase the overall cost of ownership",
                  "Often remains stored when not being worn, limiting everyday utility",
                  "Accessing liquidity may involve valuation, documentation or additional processes",
                  "Every style change may involve value depreciation, exchange deductions and new making charges",
                  "Value remains tied to a specific piece, design and ownership journey",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 bg-red-50 p-1 rounded-full text-red-500 flex-shrink-0">
                      <X size={14} strokeWidth={3} />
                    </span>
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-center">
                  <h4 className="text-red-700 font-bold text-sm mb-0.5">Limited Experience With Limited Flexibility</h4>
                  <p className="text-red-600/80 text-xs font-medium">You enjoy limited jewellery, and its broader financial utility may remain constrained.</p>
                </div>
              </div>
            </div>
            
          </div>

        </motion.div>
      </div>
    </section>
  );
}
