"use client";

import { motion } from "framer-motion";
import { CheckCircle2, IndianRupee, ShieldCheck, Clock } from "lucide-react";

const steps = [
  { id: 1, title: "Gold Balance", desc: "Select from your digital vault", icon: <ShieldCheck className="w-6 h-6 text-brand-secondary" /> },
  { id: 2, title: "Instant Verify", desc: "No physical checks needed", icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" /> },
  { id: 3, title: "NBFC Partner", desc: "Best rates secured instantly", icon: <Clock className="w-6 h-6 text-brand-accent" /> },
  { id: 4, title: "Money In Bank", desc: "Disbursed in minutes", icon: <IndianRupee className="w-6 h-6 text-green-500" /> },
];

// Pre-computed stable values — no Math.random() at render time (prevents hydration mismatch)
const NOTES = [
  { left: 8,  r0: 12,  r1: 180, dur: 5.2, delay: 0.0 },
  { left: 18, r0: 55,  r1: 270, dur: 4.8, delay: 0.8 },
  { left: 28, r0: 30,  r1: 90,  dur: 6.1, delay: 1.5 },
  { left: 38, r0: 70,  r1: 320, dur: 5.5, delay: 0.3 },
  { left: 48, r0: 5,   r1: 200, dur: 4.3, delay: 2.1 },
  { left: 57, r0: 45,  r1: 140, dur: 6.4, delay: 0.6 },
  { left: 65, r0: 80,  r1: 260, dur: 5.0, delay: 1.9 },
  { left: 73, r0: 20,  r1: 330, dur: 4.6, delay: 1.2 },
  { left: 82, r0: 60,  r1: 100, dur: 5.8, delay: 2.7 },
  { left: 91, r0: 35,  r1: 215, dur: 6.0, delay: 0.4 },
  { left: 14, r0: 15,  r1: 75,  dur: 4.9, delay: 1.7 },
  { left: 33, r0: 50,  r1: 295, dur: 5.3, delay: 2.3 },
  { left: 52, r0: 25,  r1: 160, dur: 6.2, delay: 0.9 },
  { left: 70, r0: 65,  r1: 240, dur: 4.7, delay: 1.4 },
  { left: 88, r0: 40,  r1: 310, dur: 5.6, delay: 2.6 },
];

export function InstantLoans() {
  return (
    <section id="loans" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
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
                    viewport={{ once: false }}
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

            <button className="cursor-pointer bg-brand-primary text-white hover:bg-slate-800 px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(10,37,64,0.2)]">
                Check Loan Eligibility
              </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl border border-slate-200 bg-gradient-to-b from-brand-secondary/5 to-transparent overflow-hidden flex items-center justify-center p-8 shadow-[0_20px_40px_rgba(0,102,255,0.05)]"
          >
            {/* Animated Money Flying Effect Simulation */}
            <div className="absolute inset-0 z-0">
            {NOTES.map((n, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-6 bg-green-50 rounded shadow-[0_4px_10px_rgba(74,222,128,0.1)] border border-green-200 flex items-center justify-center"
                  initial={{ top: "110%", left: `${n.left}%`, rotate: n.r0 }}
                  animate={{ top: "-10%", rotate: n.r1 }}
                  transition={{ duration: n.dur, repeat: Infinity, delay: n.delay, ease: "linear" }}
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
