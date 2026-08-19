"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Counter } from "@/components/ui/counter";
import { Lock, TrendingDown, Hourglass, ArrowRight, ArrowDown, Smartphone, Gem, AlertCircle } from "lucide-react";
import { DoodleIconBackground } from "@/components/shared/DoodleIconBackground";


export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div style={{ y, opacity }} className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-slate-200 bg-white shadow-sm"
          >
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span className="text-sm md:text-base font-bold text-slate-700 tracking-widest uppercase">The Problem</span>
          </motion.div>
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
          className="mb-16 md:mb-24 w-full max-w-7xl mx-auto px-4 md:px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative items-stretch">
            
            {/* Digital Gold Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-slate-200 hover:shadow-[0_10px_30px_rgba(10,37,64,0.08)] transition-all relative flex flex-col justify-between min-h-[450px]">
              <div>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-[18px] overflow-hidden shadow-sm flex-shrink-0 border border-amber-200/60 relative bg-[#FFFBEA]">
                    <Image
                      src="/images/digital_gold_app_icon.png"
                      alt="Digital Gold Icon"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Digital Gold</h3>
                    <p className="text-sm text-slate-500">Convenient, but limited to value holding</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-6">
                  {[
                    "Cannot be worn, displayed or experienced as jewellery",
                    "Buying and selling may involve spreads, taxes and provider-specific charges",
                    "Physical redemption or delivery may involve additional costs and conditions",
                    "Offers limited connection to jewellery and lifestyle experiences",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 p-1 bg-amber-50 rounded-full text-amber-500 flex-shrink-0">
                        <AlertCircle size={14} strokeWidth={2.5} />
                      </span>
                      <span className="text-slate-600 font-medium text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-5 border-t border-slate-100">
                <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-center flex flex-col justify-center min-h-[72px]">
                  <h4 className="text-red-700 font-bold text-sm mb-0.5">Value Without Experience</h4>
                  <p className="text-red-600/80 text-xs font-medium">Digital gold preserves your capital, but lacks any physical or lifestyle utility.</p>
                </div>
              </div>
            </div>

            {/* Physical Jewellery Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-slate-200 hover:shadow-[0_10px_30px_rgba(10,37,64,0.08)] transition-all relative flex flex-col justify-between min-h-[450px]">
              <div>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-[18px] overflow-hidden shadow-sm flex-shrink-0 border border-amber-200/60 relative bg-[#FFFBEA]">
                    <Image
                      src="/images/jewellry.png"
                      alt="Physical Jewellery Icon"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Physical Jewellery</h3>
                    <p className="text-sm text-slate-500">Meaningful to own, but less flexible</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-6">
                  {[
                    "Making and wastage charges can increase the overall cost of ownership",
                    "Often remains stored when not being worn, limiting everyday utility",
                    "Accessing liquidity may involve valuation, documentation or additional processes",
                    "Every style change may involve value depreciation, exchange deductions and new making charges",
                    "Value remains tied to a specific piece, design and ownership journey",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 p-1 bg-amber-50 rounded-full text-amber-500 flex-shrink-0">
                        <AlertCircle size={14} strokeWidth={2.5} />
                      </span>
                      <span className="text-slate-600 font-medium text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-5 border-t border-slate-100">
                <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-center flex flex-col justify-center min-h-[72px]">
                  <h4 className="text-red-700 font-bold text-sm mb-0.5">One Experience With Limited Flexibility</h4>
                  <p className="text-red-600/80 text-xs font-medium">You enjoy one jewellery, and its broader financial utility may remain constrained.</p>
                </div>
              </div>
            </div>
            
          </div>

        </motion.div>
      </div>
    </section>
  );
}
