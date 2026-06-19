"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Wallet } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Dashboard() {
  return (
    <section id="platform" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="text-brand-secondary w-6 h-6" />
              <span className="text-brand-secondary font-bold uppercase tracking-widest text-sm">Total Control 📊</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
              Your Gold,<br />Digitized & Liquid
            </h2>
            <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
              Track real-time valuations, earn yield, request loans, or order physical delivery — all from an intuitive, bank-grade secure dashboard.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Real-time 24K 99.99% gold pricing",
                "Instant liquidation to bank account",
                "Automated yield compounding (up to 11% p.a.)",
                "Zero storage or insurance fees"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-brand-secondary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <MagneticButton>
              <button className="bg-brand-primary hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(10,37,64,0.2)]">
                Explore The App
              </button>
            </MagneticButton>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full lg:w-1/2 perspective-1000"
          >
            {/* Dashboard Mockup */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 shadow-[0_30px_60px_rgba(10,37,64,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
                <div>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Gold Balance</p>
                  <h3 className="text-4xl font-black text-brand-primary">145.50 g</h3>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Current Value</p>
                  <h3 className="text-2xl font-bold text-slate-800">₹ 10,45,200</h3>
                  <p className="text-green-600 text-sm flex items-center justify-end gap-1 font-medium mt-1">
                    <TrendingUp className="w-4 h-4" /> +12.4% All Time
                  </p>
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="h-48 mb-8 relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0066FF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,100 L0,50 Q25,20 50,40 T100,10 L100,100 Z" 
                    fill="url(#chartGrad)" 
                  />
                  <path 
                    d="M0,50 Q25,20 50,40 T100,10" 
                    fill="none" 
                    stroke="#0066FF" 
                    strokeWidth="3" 
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-brand-secondary text-white py-4 rounded-xl font-bold shadow-md hover:bg-blue-600 transition-colors">
                  Take Loan
                </button>
                <button className="bg-slate-100 text-brand-primary py-4 rounded-xl font-bold border border-slate-200 hover:bg-slate-200 transition-colors">
                  Withdraw Gold
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
