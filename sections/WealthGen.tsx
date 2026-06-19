"use client";

import { motion } from "framer-motion";
import { TrendingUp, Plus, ArrowRight } from "lucide-react";

export function WealthGen() {
  return (
    <section id="wealth" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-brand-secondary/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
            Turn Jewellery Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">Income 📈</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Don&apos;t just store your gold. Let it generate yield while you enjoy the luxury of wearing it.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
          
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-[28%] bg-slate-50 border border-slate-200 rounded-2xl p-6 relative z-10 text-center shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-4 border border-brand-gold/20">
              <span className="text-3xl">🪙</span>
            </div>
            <h4 className="text-slate-800 font-bold mb-2">Gold Asset</h4>
            <p className="text-sm text-slate-500 font-medium">Digital or Physical</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-lg">
              <Plus className="w-5 h-5" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-[28%] bg-slate-50 border border-slate-200 rounded-2xl p-6 relative z-10 text-center shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
              <span className="text-3xl">💎</span>
            </div>
            <h4 className="text-slate-800 font-bold mb-2">Jewellery Experience</h4>
            <p className="text-sm text-slate-500 font-medium">Wear on demand</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-white shadow-lg">
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="w-full md:w-[28%] bg-gradient-to-br from-white to-brand-secondary/5 border border-brand-secondary/30 rounded-2xl p-6 relative z-10 text-center shadow-[0_20px_40px_rgba(0,102,255,0.1)]"
          >
            <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center mx-auto mb-4 border border-brand-secondary/20">
              <TrendingUp className="w-8 h-8 text-brand-secondary" />
            </div>
            <h4 className="text-brand-primary font-bold mb-2">Revenue Generation</h4>
            <p className="text-sm text-brand-secondary font-bold">Earn up to 11% p.a.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
