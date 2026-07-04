"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/ui/counter";
import { Lock, TrendingDown, Hourglass, ArrowRight, ArrowDown, Smartphone, Gem, X } from "lucide-react";

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
    <section ref={containerRef} className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div style={{ y, opacity }} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
            The Dead Asset Problem 
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Whether you hold digital gold that offers zero tangible experience, or physical jewellery that costs money to store and restricts you to a single style—both are dead assets generating zero wealth.
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
                  "Offers zero lifestyle experience",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 bg-red-50 p-1 rounded-full text-red-500 flex-shrink-0">
                      <X size={14} strokeWidth={3} />
                    </span>
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
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
                  "High wastage & making charges",
                  "Stuck with one jewellery style for a lifetime",
                  "Sits idle in lockers with high security risks",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 bg-red-50 p-1 rounded-full text-red-500 flex-shrink-0">
                      <X size={14} strokeWidth={3} />
                    </span>
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>

          {/* Combined Conclusion */}
          <div className="mt-8 relative flex flex-col items-center">
            <div className="w-px h-8 border-l-2 border-dashed border-slate-300 relative mb-2">
              <ArrowDown size={14} className="absolute -bottom-3 -left-[8px] text-slate-400" />
            </div>
            <div className="mt-4 px-8 py-5 bg-red-50 border border-red-100 rounded-2xl shadow-sm text-center">
              <h4 className="text-red-700 font-black text-xl mb-1">Both lead to Zero Wealth Generation</h4>
              <p className="text-red-600/80 text-sm font-medium">A dead asset with no compound growth.</p>
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
