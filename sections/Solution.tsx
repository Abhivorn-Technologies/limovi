"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft, CreditCard, Gem, RefreshCw, Smartphone, Vault } from "lucide-react";

export function Solution() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50"
          >
            <RefreshCw className="w-4 h-4 text-brand-secondary animate-spin-slow" />
            <span className="text-sm font-medium text-slate-800">The Living Ecosystem ⚡️</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-brand-primary mb-6"
          >
            A 360° Gold Asset Platform 🌐
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
          >
            Deposit your physical gold once. Unlock a lifetime of financial utilities and luxury experiences.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto h-[600px] md:h-[500px]">
          
          {/* Animated connections SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: "drop-shadow(0px 4px 10px rgba(0,102,255,0.1))" }}>
            <motion.path
              d="M 50% 20% Q 80% 50% 50% 80% Q 20% 50% 50% 20%"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0A2540" />
                <stop offset="50%" stopColor="#0066FF" />
                <stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Core App / Digital Vault */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ type: "spring", bounce: 0.4, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-40 h-40 rounded-full bg-white border-4 border-slate-100 shadow-[0_20px_50px_rgba(10,37,64,0.1)] flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-brand-secondary/30 animate-ping" style={{ animationDuration: '3s' }} />
              <Vault className="w-10 h-10 text-brand-secondary mb-2" />
              <span className="font-bold text-brand-primary">Digital Vault</span>
            </div>
          </motion.div>

          {/* Nodes */}
          {[
            { icon: <Gem />, label: "Jewellery Cloud", top: "0%", left: "50%", delay: 0.5, color: "text-brand-accent", bg: "bg-white" },
            { icon: <CreditCard />, label: "Instant Loans", top: "50%", left: "100%", delay: 0.7, color: "text-brand-secondary", bg: "bg-white" },
            { icon: <ArrowRightLeft />, label: "Gift Gold", top: "100%", left: "50%", delay: 0.9, color: "text-brand-gold-luxury", bg: "bg-white" },
            { icon: <Smartphone />, label: "Yield Generation", top: "50%", left: "0%", delay: 1.1, color: "text-brand-primary", bg: "bg-white" },
          ].map((node, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
              whileInView={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              viewport={{ once: false }}
              transition={{ type: "spring", bounce: 0.4, duration: 1, delay: node.delay }}
              className="absolute z-10 flex flex-col items-center"
              style={{ top: node.top, left: node.left }}
            >
              <div className={`w-20 h-20 rounded-2xl ${node.bg} border border-slate-200 shadow-xl flex items-center justify-center mb-3 transform hover:scale-110 transition-transform cursor-pointer`}>
                <div className={`w-8 h-8 ${node.color}`}>{node.icon}</div>
              </div>
              <span className="font-bold text-slate-800 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-slate-100">{node.label}</span>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
