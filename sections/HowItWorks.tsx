"use client";

import { motion } from "framer-motion";
import { Gem, Briefcase, Gift, Zap } from "lucide-react"; 

const cards = [
  { icon: <Gem className="w-8 h-8 text-brand-gold" />, title: "Enrol Existing Jewellery", desc: "Bring your gold to our partner branches or request home pickup. We value it using 24K standards.", emoji: "💍" },
  { icon: <Briefcase className="w-8 h-8 text-brand-secondary" />, title: "Digital Gold Balance", desc: "Your physical gold is vaulted, and equivalent 99.99% pure digital gold is credited to your Limovi account.", emoji: "💳" },
  { icon: <Zap className="w-8 h-8 text-brand-primary" />, title: "Earn Daily Yield", desc: "Your balance automatically generates up to 11% annual yield, compounding daily.", emoji: "⚡" },
  { icon: <Gift className="w-8 h-8 text-brand-accent" />, title: "Spend or Liquidate", desc: "Use balance to rent new jewellery, gift to family, or instantly withdraw cash to your bank.", emoji: "🎁" },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">How Limovi Works 🔄</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            A seamless transition from physical to digital, designed for maximum security and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(10,37,64,0.08)] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl group-hover:bg-brand-secondary/5 transition-colors" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{card.emoji}</div>
                <div className="mb-6 inline-flex p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                  {card.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">STEP 0{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
