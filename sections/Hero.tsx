"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { HeroParticles } from "@/components/3d/HeroParticles";

const cycleWords = [
  "Liquidity ",
  "Jewellery ",
  "Yield ",
  "Legacy "
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50">
      {/* 3D Particle Background - Subdued for Light Theme */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-multiply filter invert">
        <HeroParticles />
      </div>
      
      {/* Radial Gradient overlay for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,1)_90%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
            <span className="text-brand-primary font-medium text-sm">India&apos;s 1st Living Gold Ecosystem </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
            Turn Your Gold Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent drop-shadow-sm">
              Income & Luxury 
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Seamlessly transition between physical jewellery, digital investment, and instant cash flow—all from one premium platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <MagneticButton>
              <Button size="lg" className="bg-brand-primary hover:bg-slate-800 text-white px-8 py-6 rounded-full text-lg shadow-[0_10px_40px_rgba(10,37,64,0.3)] transition-all">
                <ArrowRight className="mr-2 h-5 w-5" /> Explore Ecosystem
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-100 text-slate-900 px-8 py-6 rounded-full text-lg bg-white shadow-sm">
                <Calculator className="mr-2 h-5 w-5 text-brand-secondary" /> Calculate Yield 
              </Button>
            </MagneticButton>
          </div>

          {/* Animated Cycle Words */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">From Physical Gold To</p>
            <div className="h-[40px] overflow-hidden relative w-full flex justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="text-2xl md:text-3xl font-bold text-brand-secondary absolute"
                >
                  {cycleWords[wordIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
