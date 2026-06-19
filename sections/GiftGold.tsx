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
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative order-2 lg:order-1"
          >
            {/* Interactive Premium Gift Card */}
            <div className="relative w-full max-w-md mx-auto aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-[#0B1A2C] via-[#0A2540] to-[#051120] p-8 shadow-[0_30px_60px_rgba(10,37,64,0.4)] border border-[#D4AF37]/30 overflow-hidden group cursor-pointer">
              
              {/* Subtle metallic texture/noise */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
              
              {/* Animated luxury glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-gold/20 rounded-full blur-[60px] group-hover:bg-brand-gold/30 transition-colors duration-700" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#00D4FF]/10 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-1000" />

              {/* Glassmorphism inner sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-[#B8860B] flex items-center justify-center shadow-[0_4px_15px_rgba(212,175,55,0.4)] border border-yellow-200/50">
                      <Gift className="w-5 h-5 text-[#0A2540]" />
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#FFF2CD] to-brand-gold font-bold tracking-[0.2em] text-sm">
                      LIMOVI GOLD
                    </span>
                  </div>
                  <Sparkles className="text-brand-gold w-6 h-6 animate-pulse" />
                </div>
                
                {/* Body / Value */}
                <div>
                  <p className="text-slate-400 text-xs mb-1 uppercase tracking-[0.3em] font-medium">Gift Value</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
                      10.00g
                    </span>
                    <span className="text-brand-gold font-bold text-lg tracking-wide">24K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-[1px] bg-brand-gold/50" />
                    <p className="text-slate-300 text-sm font-medium tracking-wide">To: Priya Sharma</p>
                  </div>
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
            viewport={{ once: false }}
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
