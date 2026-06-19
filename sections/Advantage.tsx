"use client";

import { motion } from "framer-motion";

export function Advantage() {
  return (
    <section className="py-32 bg-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">
          Investment + Experience + Liquidity 🏆
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          The only platform where these three elements intersect perfectly.
        </p>
      </div>

      <div className="relative w-full max-w-2xl aspect-square mx-auto">
        {/* Investment Circle */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute top-0 left-1/4 w-[50%] aspect-square rounded-full border border-brand-gold bg-brand-gold/10 backdrop-blur-sm flex items-start justify-center pt-8 shadow-[0_10px_30px_rgba(255,215,0,0.1)]"
        >
          <span className="text-brand-primary font-bold text-xl drop-shadow-md">Investment</span>
        </motion.div>

        {/* Experience Circle */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", delay: 0.2 }}
          className="absolute top-0 right-1/4 w-[50%] aspect-square rounded-full border border-brand-secondary bg-brand-secondary/10 backdrop-blur-sm flex items-start justify-center pt-8 shadow-[0_10px_30px_rgba(0,102,255,0.1)]"
        >
          <span className="text-brand-primary font-bold text-xl drop-shadow-md">Experience</span>
        </motion.div>

        {/* Liquidity Circle */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", delay: 0.4 }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[50%] aspect-square rounded-full border border-brand-accent bg-brand-accent/10 backdrop-blur-sm flex items-end justify-center pb-8 shadow-[0_10px_30px_rgba(0,212,255,0.1)]"
        >
          <span className="text-brand-primary font-bold text-xl drop-shadow-md">Liquidity</span>
        </motion.div>

        {/* Center Intersection - LIMOVI */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20"
        >
          <div className="w-24 h-24 rounded-full bg-brand-primary shadow-[0_10px_30px_rgba(10,37,64,0.3)] flex items-center justify-center mb-2 border-4 border-white">
            <span className="text-white font-black text-xl tracking-tighter">LIMOVI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
