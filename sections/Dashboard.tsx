"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Crown, 
  Gem, 
  Sparkles, 
  ArrowRightLeft,
  Banknote,
  Gift,
  Coins,
  ShieldCheck,
  Landmark,
  Zap,
  Infinity as InfinityIcon
} from "lucide-react";

const STRATEGIES = [
  { icon: <TrendingUp className="text-brand-gold w-6 h-6" />, title: "Investment Only", desc: "Pure capital appreciation", highlights: [1, 2, 3] },
  { icon: <InfinityIcon className="text-brand-gold w-6 h-6" />, title: "Enrol & Experience", desc: "Bring your existing jewellery", highlights: [0, 1, 2, 3, 4] },
  { icon: <Sparkles className="text-brand-gold w-6 h-6" />, title: "Investment & Experience", desc: "Buy new gold & access luxury", highlights: [0, 1, 2, 3, 4] },
  { icon: <Gem className="text-brand-gold w-6 h-6" />, title: "Experience Only", desc: "Access without ownership", highlights: [0] },
];

const SERVICES = [
  { 
    icon: <Sparkles className="text-brand-secondary w-7 h-7" />, 
    title: "Jewellery Experience", 
    desc: "Free for 'Investment & Experience'. Chargeable otherwise."
  },
  { 
    icon: <Landmark className="text-brand-secondary w-7 h-7" />, 
    title: "Instant Loans", 
    desc: "Backed instantly by your Gold Balance."
  },
  { 
    icon: <Zap className="text-brand-secondary w-7 h-7" />, 
    title: "Instant Liquidity", 
    desc: "Convert your gold balance to cash in 5 minutes."
  },
  { 
    icon: <Gift className="text-brand-secondary w-7 h-7" />, 
    title: "Gift Gold Balance", 
    desc: "Zero ownership transfer charges or hidden fees."
  },
  { 
    icon: <TrendingUp className="text-brand-secondary w-7 h-7" />, 
    title: "Wealth Generation", 
    desc: "Jewellery as an asset. Owners get 25% of experience fees."
  }
];

export function Dashboard() {
  const [hoveredStrategy, setHoveredStrategy] = useState<number | null>(null);

  return (
    <section id="platform" className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">The Solution</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
            A Full Stack <br className="md:hidden" />Gold Ecosystem
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Digitising physical assets (coins, bars, jewellery) or cash into a live, highly fluid dashboard.
          </p>
        </div>

        {/* Content Flow */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch max-w-6xl mx-auto relative">
          
          {/* Connector Line Desktop */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center pointer-events-none">
             
             {/* Left Flow Line (Strategy -> Center) */}
             <div className="absolute top-1/2 left-[-100px] w-[100px] h-[3px] -translate-y-1/2 -z-10 overflow-hidden">
               <div className="absolute inset-0 border-t-2 border-dashed border-slate-300" />
               {hoveredStrategy !== null && (
                 <motion.div 
                   key={`left-${hoveredStrategy}`}
                   initial={{ left: "-100%" }}
                   animate={{ left: "100%" }}
                   transition={{ duration: 0.6, ease: "linear" }}
                   className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#F4C430] to-transparent opacity-80"
                 />
               )}
             </div>

             <motion.div 
               key={hoveredStrategy !== null ? hoveredStrategy : 'default'} 
               initial={{ scale: 0.95, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
               animate={{ 
                 scale: hoveredStrategy !== null ? 1.05 : 1, 
                 boxShadow: hoveredStrategy !== null ? "0 0 40px rgba(212, 175, 55, 0.5)" : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
               }}
               transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: 0.5 }}
               className={`w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center border-[3px] z-20 relative transition-colors ${hoveredStrategy !== null ? 'border-[#F4C430]/40' : 'border-slate-100'}`}
             >
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Central</span>
               <span className="text-sm font-bold text-brand-gold uppercase tracking-wider text-center">Gold<br/>Balance</span>
             </motion.div>

             {/* Right Flow Line (Center -> Benefits) */}
             <div className="absolute top-1/2 right-[-100px] w-[100px] h-[3px] -translate-y-1/2 -z-10 overflow-hidden">
               <div className="absolute inset-0 border-t-2 border-dashed border-slate-300" />
               {hoveredStrategy !== null && (
                 <motion.div 
                   key={`right-${hoveredStrategy}`}
                   initial={{ left: "-100%" }}
                   animate={{ left: "100%" }}
                   transition={{ duration: 0.6, ease: "linear", delay: 0.7 }}
                   className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#005CB9] to-transparent opacity-80"
                 />
               )}
             </div>
          </div>

          {/* Left Column: Strategies */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h3 className="text-2xl font-bold text-brand-primary mb-8 flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold text-sm font-black">1</span>
              Investment Strategies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STRATEGIES.map((s, i) => (
                <div 
                  key={i} 
                  onMouseEnter={() => setHoveredStrategy(i)}
                  onMouseLeave={() => setHoveredStrategy(null)}
                  onClick={() => setHoveredStrategy(hoveredStrategy === i ? null : i)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-start ${
                    hoveredStrategy === i 
                      ? 'bg-white border-[#F4C430] shadow-[0_8px_30px_rgba(212,175,55,0.15)]' 
                      : hoveredStrategy !== null 
                        ? 'bg-white/50 border-slate-100 opacity-60' 
                        : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-[#F4C430]/30'
                  }`}
                >
                  <div className="mb-4 p-3 rounded-xl bg-slate-50 inline-block group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{s.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mobile Central Node */}
          <div className="lg:hidden flex justify-center py-6 relative pointer-events-none">
             {/* Vertical Mobile Flow Line */}
             <div className="absolute top-[-50px] bottom-[-50px] left-1/2 w-[3px] -translate-x-1/2 overflow-hidden -z-10">
               <div className="absolute inset-0 border-l-2 border-dashed border-slate-300" />
               {hoveredStrategy !== null && (
                 <motion.div 
                   key={`mobile-${hoveredStrategy}`}
                   initial={{ top: "-10%" }}
                   animate={{ top: "110%" }}
                   transition={{ duration: 1.5, ease: "linear" }}
                   className="absolute w-full h-[80px] bg-gradient-to-b from-transparent via-[#F4C430] to-transparent opacity-80"
                 />
               )}
             </div>

             <motion.div 
               key={hoveredStrategy !== null ? hoveredStrategy : 'default-mobile'}
               initial={{ scale: 0.95, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
               animate={{ 
                 scale: hoveredStrategy !== null ? 1.05 : 1, 
                 boxShadow: hoveredStrategy !== null ? "0 0 30px rgba(212, 175, 55, 0.5)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
               }}
               transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: 0.6 }}
               className={`w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center border-[3px] z-20 relative transition-colors ${hoveredStrategy !== null ? 'border-[#F4C430]/40' : 'border-slate-100'}`}
             >
               <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Central</span>
               <span className="text-xs font-bold text-brand-gold uppercase tracking-wider text-center">Gold<br/>Balance</span>
             </motion.div>
          </div>

          {/* Right Column: Services */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <h3 className="text-2xl font-bold text-brand-primary mb-8 flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary text-sm font-black">2</span>
              Services & Benefits
            </h3>
            <div className="space-y-4">
              {SERVICES.map((s, i) => {
                const isHighlighted = hoveredStrategy !== null ? STRATEGIES[hoveredStrategy].highlights.includes(i) : false;
                const isDimmed = hoveredStrategy !== null && !isHighlighted;

                return (
                  <div 
                    key={i} 
                    className={`flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 ${
                      isHighlighted 
                        ? 'bg-white border-[#005CB9] shadow-[0_8px_30px_rgba(0,92,185,0.15)]' 
                        : isDimmed 
                          ? 'bg-white/50 border-slate-100 opacity-30 grayscale-[50%]' 
                          : 'bg-white border-slate-200 shadow-sm hover:border-[#005CB9]/30 hover:shadow-md'
                    }`}
                  >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-slate-50 group-hover:bg-brand-secondary/5 transition-colors">
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{s.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
