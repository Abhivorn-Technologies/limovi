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
            The Dead Asset Problem 
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Gold investment and the jewellery experience don&apos;t go hand in hand. You are forced to choose between building wealth for the future or enjoying it today. Both traditional paths leave you with dead assets.
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
                  <p className="text-sm text-slate-500">Modern but intangible</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "No physical utility or tangible value",
                  "Cannot wear, display, or enjoy it",
                  "High spread charges (buy/sell) & 3% GST",
                  "Offers zero lifestyle experience",
                  "Hidden platform fees & high physical delivery charges",
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
                  <h4 className="text-red-700 font-bold text-sm mb-0.5">Zero Wealth Generation</h4>
                  <p className="text-red-600/80 text-xs font-medium">A dead asset with no compound growth.</p>
                </div>
              </div>
            </div>

            {/* Physical Gold Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-[0_10px_30px_rgba(10,37,64,0.08)] transition-all relative">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="p-3 bg-yellow-500/10 rounded-2xl">
                  <Gem size={28} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Physical Gold</h3>
                  <p className="text-sm text-slate-500">Traditional but restricted</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "High wastage & making charges (20%+), leading to high cost-per-wear",
                  "Sits idle in lockers, providing no utility beyond price appreciation",
                  "Selling or getting a loan is a slow, manual, and stigmatised process",
                  "Stuck with one jewellery style for a lifetime",
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
                  <h4 className="text-red-700 font-bold text-sm mb-0.5">Zero Wealth Generation</h4>
                  <p className="text-red-600/80 text-xs font-medium">A dead asset with no compound growth.</p>
                </div>
              </div>
            </div>
            
          </div>

        </motion.div>
      </div>
    </section>
  );
}
