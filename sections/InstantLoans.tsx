"use client";

import { motion } from "framer-motion";
import { CheckCircle2, IndianRupee, ShieldCheck, Clock } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const steps = [
  { id: 1, title: "Gold Balance", desc: "Select from your digital vault", icon: <ShieldCheck className="w-6 h-6 text-brand-secondary" /> },
  { id: 2, title: "Instant Verify", desc: "No physical checks needed", icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" /> },
  { id: 3, title: "NBFC Partner", desc: "Best rates secured instantly", icon: <Clock className="w-6 h-6 text-brand-accent" /> },
  { id: 4, title: "Money In Bank", desc: "Disbursed in minutes", icon: <IndianRupee className="w-6 h-6 text-green-500" /> },
];

export function InstantLoans() {
  return (
    <section id="loans" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee className="text-brand-secondary w-6 h-6" />
              <span className="text-brand-secondary font-bold uppercase tracking-widest text-sm">Instant Liquidity 💸</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
              One Click Gold Loans ⚡
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium leading-relaxed">
              Skip the branch visits and paperwork. Convert your digital gold balance into cash instantly, directly to your bank account at the lowest market rates.
            </p>

            <div className="relative mb-12 ml-2">
              <div className="absolute top-6 bottom-6 left-[23px] w-[2px] bg-slate-200" />
              <div className="space-y-8 relative">
                {steps.map((step, i) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center relative z-10 shadow-sm shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-lg">{step.title}</h4>
                      <p className="text-slate-500 font-medium">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <MagneticButton>
              <button className="bg-brand-primary text-white hover:bg-slate-800 px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(10,37,64,0.2)]">
                Check Loan Eligibility
              </button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl border border-slate-200 bg-gradient-to-b from-brand-secondary/5 to-transparent overflow-hidden flex items-center justify-center p-8 shadow-[0_20px_40px_rgba(0,102,255,0.05)]"
          >
            {/* Animated Money Flying Effect Simulation */}
            <div className="absolute inset-0 z-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-6 bg-green-50 rounded shadow-[0_4px_10px_rgba(74,222,128,0.1)] border border-green-200 flex items-center justify-center"
                  initial={{ 
                    top: "110%", 
                    left: `${Math.random() * 100}%`,
                    rotate: Math.random() * 90 
                  }}
                  animate={{ 
                    top: "-10%",
                    rotate: Math.random() * 360 
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 3, 
                    repeat: Infinity, 
                    delay: Math.random() * 3,
                    ease: "linear"
                  }}
                >
                  <span className="text-[10px] text-green-600 font-bold">₹₹</span>
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-4 border border-green-100 shadow-inner">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Loan Approved</h3>
                <p className="text-slate-500 font-medium">Funds are being transferred</p>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between pb-4 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Amount</span>
                  <span className="text-brand-primary font-bold text-lg">₹ 5,00,000</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Interest Rate</span>
                  <span className="text-brand-primary font-bold text-lg">0.89% p.m.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">To Account</span>
                  <span className="text-brand-primary font-bold">HDFC **** 4567</span>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-full h-2 bg-slate-100">
                <motion.div 
                  className="h-full bg-green-500"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
