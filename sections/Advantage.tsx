"use client";

import { motion } from "framer-motion";

export function Advantage() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-brand-secondary/5 via-brand-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-24 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">
          Investment + Experience + Liquidity 🏆
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          The only platform where these three elements intersect perfectly.
        </p>
      </div>

      <div className="relative w-full max-w-[750px] aspect-square mx-auto">
        
        {/* Investment Circle */}
        <motion.div
          initial={{ opacity: 0, x: -80, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
          transition={{ 
            opacity: { duration: 1 }, x: { duration: 1, type: "spring" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-[5%] left-[5%] w-[60%] aspect-square rounded-full border border-brand-gold/50 bg-gradient-to-br from-brand-gold/30 to-brand-gold/5 backdrop-blur-xl flex flex-col items-center justify-start pt-16 md:pt-24 pr-12 md:pr-24 text-center shadow-[0_20px_50px_rgba(212,175,55,0.15)] group z-30"
        >
          <span className="text-[#0A2540] font-extrabold text-xl md:text-2xl tracking-wide group-hover:scale-110 transition-transform mb-3 drop-shadow-sm">Investment</span>
          <p className="text-xs md:text-sm text-[#0A2540] font-semibold leading-relaxed max-w-[180px]">Secure 24K digital gold starting at just ₹10. Watch your wealth grow.</p>
        </motion.div>

        {/* Experience Circle */}
        <motion.div
          initial={{ opacity: 0, x: 80, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          animate={{ y: [0, 10, 0], rotate: [0, -1, 0] }}
          transition={{ 
            opacity: { duration: 1 }, x: { duration: 1, type: "spring", delay: 0.2 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
            rotate: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="absolute top-[5%] right-[-2%] w-[60%] aspect-square rounded-full border border-brand-secondary/40 bg-gradient-to-bl from-brand-secondary/20 to-brand-secondary/5 backdrop-blur-xl flex flex-col items-center justify-start pt-16 md:pt-24 pl-12 md:pl-24 text-center shadow-[0_20px_50px_rgba(0,102,255,0.15)] group z-10"
        >
          <span className="text-brand-primary font-extrabold text-xl md:text-2xl tracking-wide group-hover:scale-110 transition-transform mb-3">Experience</span>
          <p className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed max-w-[180px]">A seamless app designed for modern wealth building. No paperwork.</p>
        </motion.div>

        {/* Liquidity Circle */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            opacity: { duration: 1 },
            y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[60%] aspect-square rounded-full border border-brand-accent/40 bg-gradient-to-t from-brand-accent/20 to-brand-accent/5 backdrop-blur-xl flex flex-col items-center justify-end pb-12 md:pb-20 px-6 text-center shadow-[0_20px_50px_rgba(0,212,255,0.15)] group z-20"
        >
          <p className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed max-w-[220px] mb-3">Instantly convert your gold to cash in bank, or physical jewellery to your door.</p>
          <span className="text-brand-primary font-extrabold text-xl md:text-2xl tracking-wide group-hover:scale-110 transition-transform">Liquidity</span>
        </motion.div>

        {/* Center Intersection - Animated Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 150 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
        >
          <div className="relative flex items-center justify-center cursor-pointer group">
            {/* Spinning Outer Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-15px] rounded-full border-[2px] border-dashed border-brand-gold/60 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
            {/* Pulsing Middle Ring */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-5px] rounded-full border border-brand-secondary/50 bg-brand-secondary/10 blur-sm"
            />
            
            {/* Core Dark Orb */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#0A2540] to-[#051120] shadow-[0_0_40px_rgba(10,37,64,0.4)] flex items-center justify-center border border-white/20 relative overflow-hidden">
              {/* Glass sheen on the orb */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold font-black text-2xl tracking-[0.1em] drop-shadow-lg relative z-10">
                LIMOVI
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
