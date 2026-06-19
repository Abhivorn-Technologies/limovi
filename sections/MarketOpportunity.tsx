"use client";

import { motion } from "framer-motion";

const markets = [
  { label: "$1.3T Gold Market", value: 100, color: "bg-brand-primary" },
  { label: "$80B Jewellery Market", value: 40, color: "bg-brand-secondary" },
  { label: "$60B Gold Loan Market", value: 25, color: "bg-brand-accent" },
];

export function MarketOpportunity() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">Massive Addressable Market 🌍</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Targeting the rapidly growing middle class, millennials, and Gen Z who demand liquid, transparent, and experiential assets.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl shadow-sm">
          <div className="space-y-10">
            {markets.map((market, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-800 font-bold">{market.label}</span>
                </div>
                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${market.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${market.value}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-slate-200">
            <div className="text-center">
              <h4 className="text-3xl font-black text-brand-primary mb-1">400M+</h4>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Middle Class</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-black text-brand-primary mb-1">65%</h4>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Under 35 (Gen Z & Millennials)</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-black text-brand-primary mb-1">820M</h4>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Smartphone Users</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-black text-brand-primary mb-1">#1</h4>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Gold Consumer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
