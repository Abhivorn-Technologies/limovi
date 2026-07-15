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
  Infinity as InfinityIcon,
  HandCoins,
  Clock,
  Lightbulb,
  IndianRupee
} from "lucide-react";

const BankWithAtIcon = ({ className, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <defs>
      <mask id="at-mask-dash">
        <rect width="24" height="24" fill="white" />
        <text 
          x="12" y="5.7" 
          fontSize="4" 
          fontFamily="system-ui, sans-serif" 
          fontWeight="900" 
          textAnchor="middle" 
          fill="black"
        >
          @
        </text>
      </mask>
    </defs>
    
    <g mask="url(#at-mask-dash)">
      <rect x="1" y="21" width="22" height="2" />
      <rect x="2" y="19" width="20" height="1.5" />
      <rect x="3.5" y="9" width="3" height="9.5" />
      <rect x="8" y="9" width="3" height="9.5" />
      <rect x="13" y="9" width="3" height="9.5" />
      <rect x="17.5" y="9" width="3" height="9.5" />
      <rect x="2" y="7" width="20" height="1.5" />
      <path d="M1 6L12 1l11 5H1z" />
    </g>
  </svg>
);

const InvestmentGrowthIcon = ({ className, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M23 2h-7l3.3 3.3-7.6 7.6-4.3-4.3-5.7 5.7 1.4 1.4 4.3-4.3 4.3 4.3 9-9L23 9V2Z" />
    <ellipse cx="5" cy="18" rx="3" ry="1.5" />
    <path d="M2 18.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <ellipse cx="12" cy="15" rx="3" ry="1.5" />
    <path d="M9 15.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M9 18v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5V18c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <ellipse cx="19" cy="12" rx="3" ry="1.5" />
    <path d="M16 12.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M16 15v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5V15c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M16 17.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
  </svg>
);

const STRATEGIES = [
  { icon: <InvestmentGrowthIcon className="text-brand-gold w-6 h-6" />, title: "Investment Only", desc: "Pure capital appreciation", highlights: [0, 1, 2, 3] },
  { icon: <InfinityIcon className="text-brand-gold w-6 h-6" />, title: "Enrol & Experience", desc: "Bring your existing jewellery", highlights: [0, 1, 2, 3, 4] },
  { icon: <Sparkles className="text-brand-gold w-6 h-6" />, title: "Investment & Experience", desc: "Buy new gold & access luxury", highlights: [0, 1, 2, 3, 4] },
  { icon: <Gem className="text-brand-gold w-6 h-6" />, title: "Experience Only", desc: "Access without ownership", highlights: [0, 1, 2] },
];

const SERVICES = [
  { 
    icon: <Crown className="text-brand-secondary w-7 h-7" />, 
    title: "Luxury Jewellery Cloud", 
    desc: "Unlock premium jewellery experiences through your Gold Balance."
  },
  { 
    icon: <BankWithAtIcon className="text-brand-secondary w-7 h-7" />, 
    title: "Instant Loans", 
    desc: "Backed instantly by your Gold Balance."
  },
  { 
    icon: <IndianRupee className="text-brand-secondary w-7 h-7" />, 
    title: "Instant Liquidity", 
    desc: "Convert eligible Gold Balance into cash when needed."
  },
  { 
    icon: <Gift className="text-brand-secondary w-7 h-7" />, 
    title: "Gift Gold Ecosystem", 
    desc: "Share your Gold Balance and its ecosystem benefits with loved ones."
  },
  { 
    icon: <HandCoins className="text-brand-secondary w-7 h-7" />, 
    title: "Wealth Generation", 
    desc: "Generate long-term value from your eligible gold assets."
  }
];

export function Dashboard() {
  const [hoveredStrategy, setHoveredStrategy] = useState<number | null>(null);

  return (
    <section id="platform" className="py-8 md:py-16 bg-slate-50 relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <Lightbulb className="w-4 h-4 text-brand-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">The Solution</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
            Your Gold. One Connected Ecosystem.
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Bring together cash, digital gold, coins, bars and eligible jewellery through one unified Gold Balance—designed to connect investment strategies, jewellery experiences, financial access and broader ecosystem benefits.
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
            className="flex-1 lg:mt-16"
          >
            <h3 className="text-2xl font-bold text-brand-primary mb-8 flex items-center justify-center lg:justify-start gap-3">
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
