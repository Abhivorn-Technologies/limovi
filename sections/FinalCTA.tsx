"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PhoneCall, Crown, Rocket } from "lucide-react";
import { HeroParticles } from "@/components/3d/HeroParticles";

export function FinalCTA() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-16 md:py-32 overflow-hidden bg-brand-primary">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <HeroParticles />
      </div>

      {/* Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-secondary/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-4xl mx-auto bg-white/10 border border-white/20 p-6 md:p-12 lg:p-20 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 opacity-50 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 relative z-10">
            <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_40px_rgba(234,179,8,0.4)] border-2 border-yellow-200/50 flex-shrink-0">
              <Crown size={40} className="text-white drop-shadow-md" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center md:text-left leading-tight">
              Your Gold Is More<br className="hidden md:block" /> Powerful Than You Think
            </h2>
          </div>
          <p className="text-lg md:text-2xl text-white/80 mb-10 md:mb-12 relative z-10 font-medium">
            Join India&apos;s First Living Gold Ecosystem today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <MagneticButton className="w-full sm:w-auto">
              <button className="bg-white hover:bg-slate-100 text-brand-primary px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center w-full whitespace-nowrap">
                <Rocket className="mr-2" size={18} /> Get Started
              </button>
            </MagneticButton>
            
            <MagneticButton className="w-full sm:w-auto">
              <button className="bg-transparent hover:bg-white/10 border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-medium transition-all flex items-center justify-center w-full gap-2 whitespace-nowrap">
                <PhoneCall size={18} /> Book A Demo
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
