"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function GiftGold() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative order-2 lg:order-1"
          >
            {/* Interactive Gift Card */}
            <div className="relative w-full max-w-md mx-auto aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold-luxury p-8 shadow-[0_30px_60px_rgba(255,215,0,0.3)] border border-yellow-200 overflow-hidden group cursor-pointer">
              
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-sm">
                      <Gift className="w-4 h-4 text-brand-primary" />
                    </div>
                    <span className="text-brand-primary font-bold tracking-wider">LIMOVI GIFT</span>
                  </div>
                  <Sparkles className="text-brand-primary/80 w-6 h-6" />
                </div>
                
                <div>
                  <p className="text-brand-primary/70 text-sm mb-1 uppercase tracking-widest font-bold">Value</p>
                  <div className="text-4xl font-black text-brand-primary mb-2">10.00g <span className="text-lg font-bold">24K Gold</span></div>
                  <p className="text-brand-primary/90 text-sm font-medium">To: Priya Sharma</p>
                </div>
              </div>
            </div>
            
            {/* Particle Explosion decorative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-brand-gold rounded-full shadow-[0_0_10px_#FFD700] animate-ping" />
                <div className="absolute top-[80%] left-[80%] w-3 h-3 bg-brand-accent rounded-full shadow-[0_0_10px_#00D4FF] animate-pulse" />
                <div className="absolute top-[10%] left-[90%] w-1.5 h-1.5 bg-brand-secondary rounded-full shadow-[0_0_10px_#0066FF] animate-ping" style={{ animationDelay: "1s" }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Gift className="text-pink-500 w-6 h-6" />
              <span className="text-pink-500 font-bold uppercase tracking-widest text-sm">Future of Gifting 🎁</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
              Gift Wealth, Not Objects 💝
            </h2>
            <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
              Send digital gold instantly to your loved ones on weddings, birthdays, or festivals. They receive a beautiful digital gift card that appreciates in value over time.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-brand-gold shadow-sm" />
                Instant transfer via phone number
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-brand-gold shadow-sm" />
                Receiver can convert to physical jewellery anytime
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-brand-gold shadow-sm" />
                Zero making charges on the gifted value
              </li>
            </ul>

            <MagneticButton>
              <button className="bg-gradient-to-r from-brand-gold to-brand-gold-luxury text-brand-primary px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform">
                Send a Gold Gift ✨
              </button>
            </MagneticButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
