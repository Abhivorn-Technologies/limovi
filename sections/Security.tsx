"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, ChevronRight } from "lucide-react";

const ecosystemNodes = [
  {
    id: 1,
    title: "Jewellery Cloud",
    partner: "Sequel Logistics",
    domain: "sequelglobal.com",
    desc: "Custom on-demand jewellery catalogs. Manufactured and stored securely via Sequel Vaults.",
    color: "from-blue-400 to-blue-600",
    border: "border-blue-500/30",
    // Desktop orbital positions using calc() to bypass Framer Motion transform override
    position: { left: "calc(20% - 160px)", top: "calc(15% - 50px)" }
  },
  {
    id: 2,
    title: "Physical Gold Loans",
    partner: "Top NBFCs",
    domain: "rbi.org.in", 
    desc: "Partnered with trusted NBFCs to provide secure and flexible physical gold-backed loans.",
    color: "from-green-400 to-green-600",
    border: "border-green-500/30",
    position: { left: "calc(80% - 160px)", top: "calc(15% - 50px)" }
  },
  {
    id: 3,
    title: "Instant Liquidity",
    partner: "Powered by LIMOVI",
    domain: "google.com", // Fallback for no icon
    desc: "Ensuring you have instant, seamless access to your wealth whenever you need it.",
    color: "from-cyan-400 to-cyan-600",
    border: "border-cyan-500/30",
    position: { left: "calc(85% - 160px)", top: "calc(60% - 50px)" }
  },
  {
    id: 4,
    title: "Digital Gold",
    partner: "SafeGold & MMTC",
    domain: "safegold.com",
    desc: "A secure, 24K pure digital gold balance powered by our partners SafeGold and MMTC-PAMP.",
    color: "from-yellow-400 to-yellow-600",
    border: "border-yellow-500/30",
    position: { left: "calc(50% - 160px)", top: "calc(85% - 50px)" }
  },
  {
    id: 5,
    title: "Digital Gold Loans",
    partner: "Rupeek",
    domain: "rupeek.com",
    desc: "Instant credit against your digital gold balance, partnered seamlessly with Rupeek.",
    color: "from-purple-400 to-purple-600",
    border: "border-purple-500/30",
    position: { left: "calc(15% - 160px)", top: "calc(60% - 50px)" }
  }
];

export function Security() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-secondary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Globe className="text-brand-primary w-4 h-4" />
            <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">Our Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">The LIMOVI Ecosystem</h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            A dynamic, interconnected network of industry leaders providing you a seamless end-to-end gold experience.
          </p>
        </div>

        {/* Animated Network Graph (Desktop) / Stacked Cards (Mobile) */}
        {/* We use a fixed 1000x700 box on desktop and scale it down if needed to ensure perfect layout */}
        <div className="hidden lg:flex relative w-[1000px] h-[700px] mx-auto items-center justify-center">
          
          {/* Connecting SVG Lines (Desktop only) */}
          <div className="absolute inset-0 pointer-events-none">
             <svg className="w-full h-full">
                {/* Lines from Center (50%, 50%) to Nodes */}
                <path d="M 50% 50% L 20% 15%" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 50% 50% L 80% 15%" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 50% 50% L 85% 60%" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 50% 50% L 50% 85%" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 50% 50% L 15% 60%" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
                {/* Animated overlay pulses */}
                <path d="M 50% 50% L 20% 15%" stroke="#3B82F6" strokeWidth="3" strokeDasharray="15 15" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                <path d="M 50% 50% L 80% 15%" stroke="#22C55E" strokeWidth="3" strokeDasharray="15 15" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                <path d="M 50% 50% L 85% 60%" stroke="#06B6D4" strokeWidth="3" strokeDasharray="15 15" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                <path d="M 50% 50% L 50% 85%" stroke="#EAB308" strokeWidth="3" strokeDasharray="15 15" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                <path d="M 50% 50% L 15% 60%" stroke="#A855F7" strokeWidth="3" strokeDasharray="15 15" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
             </svg>
          </div>

          {/* Central LIMOVI Hub (Desktop only) */}
          <motion.div 
            className="absolute top-[50%] left-[50%] z-10 w-32 h-32 rounded-full bg-white shadow-[0_0_50px_rgba(10,37,64,0.1)] border-4 border-slate-50 flex flex-col items-center justify-center"
            style={{ marginLeft: "-64px", marginTop: "-64px" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
             <div className="absolute inset-0 rounded-full bg-brand-primary/5 animate-ping" style={{ animationDuration: '3s' }} />
             <div className="text-center">
               <div className="font-black text-2xl text-brand-primary tracking-tighter">LIMOVI</div>
               <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Core Engine</div>
             </div>
          </motion.div>

          {/* Nodes Container */}
          <div className="w-full h-full">
            {ecosystemNodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring", damping: 15 }}
                onHoverStart={() => setActiveNode(node.id)}
                onHoverEnd={() => setActiveNode(null)}
                className={`
                  absolute w-[320px] 
                  bg-white/80 backdrop-blur-xl border ${node.border} 
                  rounded-3xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.04)]
                  transition-all duration-300 z-20 cursor-default
                  ${activeNode === node.id ? 'scale-105 z-30 shadow-[0_25px_50px_rgba(0,0,0,0.1)]' : 'scale-100'}
                  hover:bg-white
                `}
                style={{ ...node.position }}
              >
                {/* Glow behind card on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${node.color} opacity-0 transition-opacity duration-300 -z-10 blur-xl ${activeNode === node.id ? 'md:opacity-10' : ''}`} />

                <div className="flex items-start gap-4">
                  {/* Icon/Logo */}
                  <div className={`w-14 h-14 rounded-2xl flex-shrink-0 bg-gradient-to-br ${node.color} p-[2px] shadow-sm`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img 
                          src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${node.domain}&size=64`}
                          alt={node.partner}
                          className={`h-8 w-8 object-contain ${node.title === 'Instant Liquidity' ? 'hidden' : ''}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {node.title === 'Instant Liquidity' && <span className="font-black text-brand-primary text-xl">L</span>}
                    </div>
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{node.title}</h3>
                    <h4 className="text-lg font-black text-slate-800 leading-tight flex items-center gap-1">
                      {node.partner} 
                      <ChevronRight size={16} className={`transition-transform duration-300 ${activeNode === node.id ? 'translate-x-1 text-slate-800' : 'text-slate-300'}`} />
                    </h4>
                  </div>
                </div>

                {/* Expanding Description */}
                <div className={`
                  overflow-hidden transition-all duration-300
                  h-0 opacity-0 mt-0 pt-0 border-transparent
                  ${activeNode === node.id ? '!h-auto !opacity-100 !mt-4 !pt-4 !border-slate-100' : ''}
                `}>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Stacked Layout (Hidden on LG) */}
        <div className="flex lg:hidden flex-col gap-6 w-full">
            {ecosystemNodes.map((node, i) => (
              <div
                key={`mob-${node.id}`}
                className={`w-full bg-white border ${node.border} rounded-3xl p-5 shadow-sm relative`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex-shrink-0 bg-gradient-to-br ${node.color} p-[2px] shadow-sm`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img 
                          src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${node.domain}&size=64`}
                          alt={node.partner}
                          className={`h-8 w-8 object-contain ${node.title === 'Instant Liquidity' ? 'hidden' : ''}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {node.title === 'Instant Liquidity' && <span className="font-black text-brand-primary text-xl">L</span>}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{node.title}</h3>
                    <h4 className="text-lg font-black text-slate-800 leading-tight">
                      {node.partner} 
                    </h4>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {node.desc}
                </p>
              </div>
            ))}
        </div>

        {/* Partners Marquee / List */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-24 pt-12 border-t border-slate-200 overflow-hidden relative"
        >
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Backed by India&apos;s most trusted ecosystem partners</h3>
          </div>
          
          <div className="relative flex overflow-hidden group">
            {/* Left and right gradient masks for smooth fade */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

            <div 
              className="flex w-max animate-marquee-infinite opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
              {[1, 2].map((set) => (
                <div key={set} className="flex items-center pr-16 gap-16">
                  {[
                    { name: "SafeGold", domain: "safegold.com" },
                    { name: "MMTC-PAMP", domain: "mmtcpamp.com" },
                    { name: "Rupeek", domain: "rupeek.com" },
                    { name: "Sequel Logistics", domain: "sequelglobal.com" },
                    { name: "Brink's", domain: "us.brinks.com" },
                    { name: "Razorpay", domain: "razorpay.com" },
                    { name: "Cashfree", domain: "cashfree.com" }
                  ].map((partner, i) => (
                    <div key={i} className="flex items-center justify-center gap-3 relative whitespace-nowrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${partner.domain}&size=128`}
                        alt={partner.name}
                        className="h-8 w-8 object-contain rounded-md"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="text-xl font-bold text-slate-800">{partner.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
