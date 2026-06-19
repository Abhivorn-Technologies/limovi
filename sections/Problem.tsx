"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/ui/counter";
import { Lock, TrendingDown, Hourglass, AlertTriangle } from "lucide-react";

const stats = [
  {
    icon: <Lock className="w-8 h-8 text-brand-gold" />,
    value: 1.3,
    suffix: "T",
    prefix: "$",
    label: "Gold Locked in Lockers",
    description: "Sitting idle, depreciating against inflation, and generating zero yield.",
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-brand-secondary" />,
    value: 80,
    suffix: "%",
    label: "Idle Assets",
    description: "Most physical gold is never utilized for financial growth.",
  },
  {
    icon: <TrendingDown className="w-8 h-8 text-red-400" />,
    value: 20,
    suffix: "%",
    label: "Making Charges Loss",
    description: "Traditional jewellery purchases result in immediate capital loss.",
  },
  {
    icon: <Hourglass className="w-8 h-8 text-brand-accent" />,
    value: 48,
    suffix: "hrs+",
    label: "Slow Loan Processes",
    description: "Traditional gold loans involve physical verification and massive paperwork.",
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
            The Dead Asset Problem 📉
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            India holds the world&apos;s largest private gold reserves. Yet, it sits idle in lockers, generating zero wealth and costing money to store safely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
