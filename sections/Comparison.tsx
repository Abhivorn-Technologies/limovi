"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Crown, Zap, Sparkles, TrendingUp, Infinity as InfinityIcon } from "lucide-react";

export function Comparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate Opacity for each graphic based on scroll progress
  // Item 1: 0 to 25% (fade out at 30%)
  const op1 = useTransform(scrollYProgress, [0, 0.25, 0.35, 1], [1, 1, 0, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.25, 0.35, 1], [1, 1, 0.8, 0.8]);

  // Item 2: 25% to 50%
  const op2 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5, 0.6, 1], [0, 0, 1, 1, 0, 0]);
  const scale2 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5, 0.6, 1], [0.8, 0.8, 1, 1, 0.8, 0.8]);

  // Item 3: 50% to 75%
  const op3 = useTransform(scrollYProgress, [0, 0.45, 0.55, 0.75, 0.85, 1], [0, 0, 1, 1, 0, 0]);
  const scale3 = useTransform(scrollYProgress, [0, 0.45, 0.55, 0.75, 0.85, 1], [0.8, 0.8, 1, 1, 0.8, 0.8]);

  // Item 4: 75% to 100%
  const op4 = useTransform(scrollYProgress, [0, 0.7, 0.8, 1], [0, 0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0, 0.7, 0.8, 1], [0.8, 0.8, 1, 1]);

  // Translate the text container upwards
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#040F1D]">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Ambient Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />
        
        {/* LEFT PANEL: Sticky Header */}
        <div className="w-full h-[35vh] md:h-screen md:w-1/2 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-br from-[#0A1F3D]/20 to-transparent overflow-hidden">
          
          {/* Header Title */}
          <div className="absolute top-28 md:top-32 left-6 md:left-12 z-20">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="text-[#D4AF37]" size={16} />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#D4AF37]">The LIMOVI Advantage</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Redefining{" "}
              <span style={{ background: "linear-gradient(90deg, #D4AF37, #F4C430)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Gold
              </span>
            </h2>
          </div>

          {/* Graphic 1: 360 Ecosystem */}
          <motion.div style={{ opacity: op1, scale: scale1 }} className="flex absolute inset-0 top-16 md:top-0 md:pt-16 items-center justify-end pr-4 md:pr-0 md:justify-center pointer-events-none">
            <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center scale-90 md:scale-100">
              <div className="absolute w-full h-full border border-[#D4AF37]/30 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[75%] h-[75%] md:w-48 md:h-48 border border-[#D4AF37]/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-full border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                <InfinityIcon className="text-[#D4AF37] w-6 h-6 md:w-10 md:h-10" />
              </div>
            </div>
          </motion.div>

          {/* Graphic 2: Liquidity */}
          <motion.div style={{ opacity: op2, scale: scale2 }} className="flex absolute inset-0 top-16 md:top-0 md:pt-16 items-center justify-end pr-4 md:pr-0 md:justify-center pointer-events-none">
            <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center scale-90 md:scale-100">
              <div className="absolute w-full h-full border border-[#005CB9]/30 rounded-full animate-pulse" />
              <div className="absolute w-[75%] h-[75%] md:w-48 md:h-48 border border-[#005CB9]/40 rounded-full rotate-45" />
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#005CB9]/20 to-[#005CB9]/5 rounded-xl rotate-12 border border-[#005CB9]/50 flex items-center justify-center shadow-[0_0_40px_rgba(0,92,185,0.3)]">
                <Zap className="text-[#4DA3FF] -rotate-12 w-6 h-6 md:w-10 md:h-10" />
              </div>
            </div>
          </motion.div>

          {/* Graphic 3: Experience */}
          <motion.div style={{ opacity: op3, scale: scale3 }} className="flex absolute inset-0 top-16 md:top-0 md:pt-16 items-center justify-end pr-4 md:pr-0 md:justify-center pointer-events-none">
            <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center scale-90 md:scale-100">
              <div className="absolute w-full h-full border border-purple-500/30 rounded-full border-dashed animate-[spin_30s_linear_infinite]" />
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-full border border-purple-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                <Sparkles className="text-purple-400 w-6 h-6 md:w-10 md:h-10" />
              </div>
            </div>
          </motion.div>

          {/* Graphic 4: Yield */}
          <motion.div style={{ opacity: op4, scale: scale4 }} className="flex absolute inset-0 top-16 md:top-0 md:pt-16 items-center justify-end pr-4 md:pr-0 md:justify-center pointer-events-none">
            <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center scale-90 md:scale-100">
              <div className="absolute w-full h-full flex items-end justify-center pb-4 md:pb-8 gap-2 md:gap-3">
                 <div className="w-2 md:w-3 bg-emerald-500/20 rounded-t-full animate-[bounce_2s_infinite]" style={{ height: '40%' }} />
                 <div className="w-2 md:w-3 bg-emerald-500/40 rounded-t-full animate-[bounce_2s_infinite_200ms]" style={{ height: '60%' }} />
                 <div className="w-2 md:w-3 bg-emerald-500/60 rounded-t-full animate-[bounce_2s_infinite_400ms]" style={{ height: '80%' }} />
                 <div className="w-2 md:w-3 bg-emerald-500/80 rounded-t-full animate-[bounce_2s_infinite_600ms]" style={{ height: '100%' }} />
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-full border border-emerald-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] z-10 mb-4 md:mb-8">
                <TrendingUp className="text-emerald-400 w-6 h-6 md:w-10 md:h-10" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* RIGHT PANEL: Scrolling Text */}
        <div className="w-full h-[65vh] md:h-screen md:w-1/2 overflow-hidden relative">
          <motion.div style={{ y: textY }} className="absolute top-0 left-0 w-full h-[400%]">
            
            {/* Section 1 */}
            <div className="h-[25%] flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 md:mb-6 border border-[#D4AF37]/20 md:hidden">
                <InfinityIcon className="text-[#D4AF37]" size={20} />
              </div>
              <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                The Unified <br/><span className="text-[#D4AF37]">360° Ecosystem</span>
              </h3>
              <p className="text-base md:text-xl text-slate-400 leading-relaxed font-medium">
                The only platform where you don't need five different apps. Invest, wear, and leverage your gold seamlessly in one place. Stop settling for fragmented financial services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="h-[25%] flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#005CB9]/10 flex items-center justify-center mb-4 md:mb-6 border border-[#005CB9]/20 md:hidden">
                <Zap className="text-[#4DA3FF]" size={20} />
              </div>
              <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                True Instant <br/><span className="text-[#4DA3FF]">Liquidity</span>
              </h3>
              <p className="text-base md:text-xl text-slate-400 leading-relaxed font-medium">
                Unlike traditional jewellers, unlock instant cash or loans against your digital balance in seconds, completely hassle-free. Your wealth is never locked away when you need it most.
              </p>
            </div>

            {/* Section 3 */}
            <div className="h-[25%] flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 md:mb-6 border border-purple-500/20 md:hidden">
                <Sparkles className="text-purple-400" size={20} />
              </div>
              <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                Experience & <br/><span className="text-purple-400">Wear Your Wealth</span>
              </h3>
              <p className="text-base md:text-xl text-slate-400 leading-relaxed font-medium">
                Digital gold shouldn't be invisible. LIMOVI is the first platform to let you physically experience your digital assets through our Jewellery Cloud. Wear luxury without buying it twice.
              </p>
            </div>

            {/* Section 4 */}
            <div className="h-[25%] flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 md:mb-6 border border-emerald-500/20 md:hidden">
                <TrendingUp className="text-emerald-400" size={20} />
              </div>
              <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                Unmatched <br/><span className="text-emerald-400">Yield Growth</span>
              </h3>
              <p className="text-base md:text-xl text-slate-400 leading-relaxed font-medium">
                Your gold doesn't just sit in a locker. It actively works and grows for you, outperforming standard digital gold platforms with passive income generation.
              </p>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
