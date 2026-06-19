"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PhoneCall } from "lucide-react";
import { HeroParticles } from "@/components/3d/HeroParticles";

export function FinalCTA() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-32 overflow-hidden bg-brand-primary">
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
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-4xl mx-auto bg-white/10 border border-white/20 p-12 md:p-20 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 opacity-50 pointer-events-none" />
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 relative z-10">
            💰 Your Gold Is More Powerful Than You Think
          </h2>
          <p className="text-2xl text-white/80 mb-12 relative z-10 font-medium">
            Join India&apos;s First Living Gold Ecosystem today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <MagneticButton>
              <button className="bg-white hover:bg-slate-100 text-brand-primary px-10 py-5 rounded-full text-lg font-bold shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center w-full sm:w-auto">
                🚀 Get Started
              </button>
            </MagneticButton>
            
            <MagneticButton>
              <button className="bg-transparent hover:bg-white/10 border border-white/30 text-white px-10 py-5 rounded-full text-lg font-medium transition-all flex items-center justify-center w-full sm:w-auto gap-2">
                <PhoneCall size={20} /> Book A Demo
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
