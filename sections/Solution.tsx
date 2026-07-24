"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Infinity as InfinityIcon, Sparkles, Landmark, Zap, Gift } from "lucide-react";

export function Solution() {
  const strategies = [
    {
      icon: <TrendingUp className="w-5 h-5 text-amber-500" />,
      title: "Investment Only",
      desc: "Pure capital appreciation"
    },
    {
      icon: <InfinityIcon className="w-5 h-5 text-amber-500" />,
      title: "Enrol & Experience",
      desc: "Bring your existing jewellery"
    }
  ];

  const benefits = [
    {
      icon: <Sparkles className="w-5 h-5 text-blue-500" />,
      title: "Luxury Jewellery Cloud",
      desc: "Unlock premium jewellery experiences through your Gold Balance."
    },
    {
      icon: <Landmark className="w-5 h-5 text-blue-500" />,
      title: "Instant Loans",
      desc: "Backed instantly by your Gold Balance."
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      title: "Instant Liquidity",
      desc: "Convert eligible Gold Balance into cash when needed."
    },
    {
      icon: <Gift className="w-5 h-5 text-blue-500" />,
      title: "Gift Gold Ecosystem",
      desc: "Share your Gold Balance and its ecosystem benefits with loved ones."
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden" id="solution">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-700 tracking-widest uppercase">The Solution</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#005CB9] mb-6 tracking-tight"
          >
            Your Gold. One Connected Ecosystem.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Bring together cash, digital gold, coins, bars and eligible jewellery through one unified Gold Balance—designed to connect investment strategies, jewellery experiences, financial access and broader ecosystem benefits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Column 1: Investment Strategies */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:mt-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-[#005CB9]">Investment Strategies</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strategies.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Services & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-[#005CB9]">Services & Benefits</h3>
            </div>
            <div className="flex flex-col gap-4">
              {benefits.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
