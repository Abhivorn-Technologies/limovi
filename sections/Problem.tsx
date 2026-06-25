"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/ui/counter";
import { Lock, TrendingDown, Hourglass, ArrowRight, ArrowDown, Smartphone, Gem } from "lucide-react";

const stats = [
  {
    icon: <Lock className="w-8 h-8 text-brand-gold" />,
    value: 1.3,
    suffix: "T",
    prefix: "$",
    label: "Idleness",
    description: "Trillions worth of gold is kept in lockers, providing no utility beyond price appreciation.",
  },
  {
    icon: <TrendingDown className="w-8 h-8 text-red-400" />,
    value: 20,
    suffix: "%+",
    prefix: "",
    label: "The Jewellery Paradox",
    description: "Buying new jewellery is expensive (making charges, wastage, GST) leading to high cost-per-wear.",
  },
  {
    icon: <Hourglass className="w-8 h-8 text-brand-accent" />,
    value: 48,
    suffix: "hrs",
    prefix: ">",
    label: "Liquidity Friction",
    description: "Taking a gold loan or selling gold is still a slow, manual, and often stigmatised process.",
  },
];

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div style={{ y, opacity }} className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
            The Digital & Physical Gold Problem 📉
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            India holds the world&apos;s largest private gold reserves. Yet, it sits idle in lockers, generating zero wealth and costing money to store safely.
          </p>
        </motion.div>

        {/* ── Flowchart ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-col items-center"
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-2 lg:px-0">
            
            {/* Start Node */}
            <div className="px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm lg:text-base shadow-lg border border-brand-primary/20 z-10">
              High Value Investment
            </div>
            
            {/* Stem */}
            <div className="h-8 w-px border-l-2 border-dashed border-slate-300" />

            <div className="flex flex-row items-start justify-center w-full relative">
              
              {/* Left Branch: Digi Gold */}
              <div className="flex flex-col items-center flex-1 relative px-2 lg:px-6">
                {/* Horizontal connector line (spanning right to center) */}
                <div className="absolute top-0 right-0 w-[50%] border-t-2 border-dashed border-slate-300" />
                {/* Vertical line down */}
                <div className="h-8 w-px border-l-2 border-dashed border-slate-300 relative">
                   <ArrowDown size={14} className="absolute -bottom-3 -left-[8px] text-slate-400" />
                </div>
                
                <div className="mt-4 px-4 py-2 rounded-lg bg-white text-slate-700 font-semibold text-sm border border-slate-200 shadow-sm flex items-center gap-2">
                  <Smartphone size={16} className="text-brand-accent" />
                  Digi Gold
                </div>
                <div className="h-8 w-px border-l-2 border-dashed border-slate-300 relative my-1">
                   <ArrowDown size={14} className="absolute -bottom-3 -left-[8px] text-slate-400" />
                </div>
                <div className="mt-3 px-4 py-2 rounded-lg bg-red-50 text-red-700 font-bold text-sm border border-red-200 shadow-sm text-center">
                  Zero Experience
                </div>
              </div>

              {/* Right Branch: Physical Gold */}
              <div className="flex flex-col items-center flex-1 relative px-2 lg:px-6">
                {/* Horizontal connector line (spanning left to center) */}
                <div className="absolute top-0 left-0 w-[50%] border-t-2 border-dashed border-slate-300" />
                {/* Vertical line down */}
                <div className="h-8 w-px border-l-2 border-dashed border-slate-300 relative">
                   <ArrowDown size={14} className="absolute -bottom-3 -left-[8px] text-slate-400" />
                </div>
                
                <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 mb-4 text-center">
                  OR Physical Gold
                </span>

                {[
                  { text: "High Wastage", end: false },
                  { text: "One jewellery style for lifetime", end: false },
                  { text: "Idle in locker", end: false },
                  { text: "High security issue", end: false },
                  { text: "Zero wealth generation", end: true },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm shadow-sm border text-center ${
                      step.end ? "bg-red-50 text-red-700 font-bold border-red-200" : "bg-white text-slate-700 font-medium border-slate-200"
                    }`}>
                      {step.text}
                    </div>
                    {!step.end && (
                      <div className="h-6 lg:h-8 w-px border-l-2 border-dashed border-slate-300 relative my-1">
                         <ArrowDown size={14} className="absolute -bottom-3 -left-[8px] text-slate-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(10,37,64,0.06)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-3xl group-hover:bg-brand-secondary/5 transition-colors" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-brand-primary mb-2 flex items-baseline tracking-tighter">
                  <span className="text-2xl text-slate-400 mr-1">{stat.prefix}</span>
                  <Counter value={stat.value} direction="up" />
                  <span className="text-3xl text-brand-secondary ml-1">{stat.suffix}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{stat.label}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
