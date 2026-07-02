"use client";

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
  { icon: <TrendingUp className="text-brand-gold w-6 h-6" />, title: "Investment Only", desc: "Pure capital appreciation" },
  { icon: <InfinityIcon className="text-brand-gold w-6 h-6" />, title: "Enrol & Experience", desc: "Bring your existing jewellery" },
  { icon: <Sparkles className="text-brand-gold w-6 h-6" />, title: "Investment & Experience", desc: "Buy new gold & access luxury" },
  { icon: <Gem className="text-brand-gold w-6 h-6" />, title: "Experience Only", desc: "Access without ownership" },
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
    desc: "Jewellery as an asset. Owners get 35% of experience fees."
  }
];

export function Dashboard() {
  return (
    <section id="platform" className="py-32 bg-slate-50 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
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
             <div className="w-32 h-32 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-4 border-slate-50 z-20 relative">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Central</span>
               <span className="text-sm font-bold text-brand-gold uppercase tracking-wider text-center">Gold<br/>Balance</span>
             </div>
             <div className="absolute top-1/2 left-[-80px] w-[80px] border-t-2 border-dashed border-slate-300 -z-10" />
             <div className="absolute top-1/2 right-[-80px] w-[80px] border-t-2 border-dashed border-slate-300 -z-10" />
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
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-start">
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
          <div className="lg:hidden flex justify-center py-4 relative pointer-events-none">
             <div className="w-28 h-28 rounded-full bg-white shadow-lg flex flex-col items-center justify-center border-4 border-slate-50 z-20 relative">
               <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Central</span>
               <span className="text-xs font-bold text-brand-gold uppercase tracking-wider text-center">Gold<br/>Balance</span>
             </div>
             <div className="absolute top-0 bottom-0 left-1/2 w-px border-l-2 border-dashed border-slate-300 -z-10" />
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
              {SERVICES.map((s, i) => (
                <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-secondary/30 hover:shadow-md transition-all group">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-slate-50 group-hover:bg-brand-secondary/5 transition-colors">
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{s.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
