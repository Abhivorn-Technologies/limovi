"use client";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export function JewelleryExperience() {
  return (
    <section id="jewellery-experience" className="bg-[#040F1D] relative overflow-hidden">
      {/* ── AMBIENT GLOWS ───────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#D4AF37]/4 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#005CB9]/6 blur-[150px] rounded-full" />

      {/* ── EDITORIAL HERO ──────────────────────────────────────── */}
      <div className="relative border-b border-white/5 px-6 md:px-16 lg:px-24 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <Crown size={16} className="text-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37]">
                Jewellery Experience
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-8"
            >
              Wear Luxury.
              <br />
              <span style={{
                background: "linear-gradient(100deg,#D4AF37 30%,#F4C430 60%,#D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Own Nothing.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium max-w-xl"
            >
              Your Gold Balance is a key to an entire world of premium jewellery. 
              Every occasion, a new design. Every design, delivered to your door. 
              No purchase. No regret. Just pure luxury.
            </motion.p>
          </div>

          {/* Stat column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 lg:items-end"
          >
            {[
              { value: "500+", label: "Exclusive Designs" },
              { value: "5 min", label: "Request to Confirm" },
              { value: "100%", label: "Insured Delivery" },
            ].map((s, i) => (
              <div key={i} className="text-left lg:text-right">
                <div
                  className="text-3xl font-black"
                  style={{
                    background: "linear-gradient(90deg,#D4AF37,#F4C430)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
