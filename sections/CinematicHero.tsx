"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Coins, Gem, Landmark, Wallet, Box, Play, Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, Gift, Infinity as InfinityIcon } from "lucide-react";

const C = {
  primary:    "#005CB9",
  secondary:  "#2B7FE8",
  gold:       "#D4AF37",
  goldBright: "#F4C430",
  goldDeep:   "#B8860B",
  dark:       "#050505",
  darkSurface:"#111111",
  textLight:  "#F8FAFC",
  textMuted:  "#94A3B8",
  textDark:   "#0A1929",
  textMid:    "#334155",
  textFaint:  "#64748B",
};

// ─── SCENE COMPONENTS ─────────────────────────────────────────────────────────

function Scene1_Item({ item, i, progress }: { item: any, i: number, progress: any }) {
  const itemX = useTransform(progress, [0, 0.1, 0.16, 1], [item.x, item.x, 0, 0]);
  const itemY = useTransform(progress, [0, 0.1, 0.16, 1], [item.y, item.y, 0, 0]);
  const itemOp = useTransform(progress, [0, 0.15, 0.18, 1], [1, 1, 0, 0]);

  return (
    <motion.div
      className="absolute z-10"
      style={{ x: itemX, y: itemY, opacity: itemOp }}
    >
      <motion.div
        className="flex flex-col items-center justify-center gap-3 origin-center"
        whileHover={{ scale: 1.05 }}
        animate={item.animate}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.2,
        }}
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(212,175,55,0.15)] border-2" style={{ borderColor: 'rgba(212,175,55,0.3)' }}>
          <item.icon size={36} strokeWidth={1.8} style={{ color: C.textDark }} />
        </div>
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-700 bg-white/70 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-200">{item.label}</span>
      </motion.div>
    </motion.div>
  );
}

function Scene1_Problem({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.16, 0.22, 1], [1, 1, 0, 0]);
  const scale = useTransform(progress, [0, 0.16, 0.22, 1], [1, 1, 0.8, 0.8]);
  const filter = useTransform(progress, [0, 0.15, 0.22, 1], ["blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)"]);
  const leftOpacity = useTransform(progress, [0, 0.04, 1], [1, 0, 0]);
  const mobileRightOpacity = useTransform(progress, [0, 0.05, 0.08, 1], [0, 0, 1, 1]);

  const items = [
    { label: "Cash", icon: Wallet, x: -160, y: -160, animate: { y: [0, -12, 0], rotate: [0, -3, 3, 0] }, duration: 5 },
    { label: "Gold Coins", icon: Coins, x: 160, y: -160, animate: { y: [0, 10, 0], scale: [1, 1.05, 1] }, duration: 4 },
    { label: "Gold Bars", icon: Box, x: -160, y: 160, animate: { x: [0, -8, 8, 0], y: [0, 8, -8, 0] }, duration: 6 },
    { label: "Jewellery", icon: Gem, x: 160, y: 160, animate: { rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }, duration: 4.5 },
  ];

  const metrics = [
    { value: "₹500Cr+", label: "Gold Managed", grad: `linear-gradient(135deg,${C.goldBright},${C.gold})` },
    { value: "50K+", label: "Customers", grad: `linear-gradient(135deg,${C.primary},${C.secondary})` },
    { value: "100%", label: "Insured & Secure", grad: `linear-gradient(135deg,${C.primary},${C.secondary})` }
  ];

  return (
    <motion.div style={{ opacity, scale, filter }} className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 pt-28 lg:pt-32 pb-20 lg:pb-4">
      {/* Left Text */}
      <motion.div 
        className="w-full lg:w-[48%] flex flex-col justify-center text-left z-10 flex-shrink-0"
        style={{ opacity: leftOpacity }}
      >
        <div className="inline-flex items-center gap-2 mb-4 lg:mb-7 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full w-max"
          style={{ background: "rgba(0,92,185,0.06)", border: "1px solid rgba(0,92,185,0.18)" }}>
          <motion.span
            className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full"
            style={{ background: C.gold }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: C.primary }}>
            India&apos;s 1st Living Gold Ecosystem
          </span>
        </div>

        <h1 className="font-black tracking-tight leading-[1.1] lg:leading-[1.06] mb-4 lg:mb-6" style={{ fontSize: "clamp(2.2rem, 4.2vw, 4rem)", color: C.textDark }}>
          Turn Gold Into
          <br />
          <motion.span
            style={{
              background: `linear-gradient(135deg,${C.goldBright} 0%,${C.gold} 45%,${C.goldDeep} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
            animate={{ filter: ["drop-shadow(0 2px 8px rgba(212,175,55,0.2))", "drop-shadow(0 2px 22px rgba(212,175,55,0.55))", "drop-shadow(0 2px 8px rgba(212,175,55,0.2))"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Wealth,<br className="hidden lg:block" /> Experiences
          </motion.span>
          <br />
          & Instant Liquidity
        </h1>

        <p className="leading-relaxed mb-6 lg:mb-9 max-w-md text-sm lg:text-[1.05rem]" style={{ color: C.textMid }}>
          Convert cash, jewellery, coins or bars into a{" "}
          <span style={{ color: C.gold, fontWeight: 700 }}>Gold Balance</span>{" "}
          and unlock premium financial benefits.
        </p>

        <div className="flex items-center gap-3 lg:gap-4 flex-wrap mb-6 lg:mb-10">
          <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3.5 rounded-full font-bold text-xs lg:text-sm tracking-wide text-white" style={{ background: `linear-gradient(135deg,${C.primary},${C.secondary})`, boxShadow: "0 8px 28px rgba(0,92,185,0.42)" }}>
            Explore Strategies
            <ArrowRight size={14} strokeWidth={2.5} />
          </motion.button>

          <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3.5 rounded-full font-bold text-xs lg:text-sm tracking-wide" style={{ background: "rgba(0,92,185,0.05)", border: "1.5px solid rgba(0,92,185,0.22)", color: C.primary }}>
            <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 20, height: 20, background: `linear-gradient(135deg,${C.primary},${C.secondary})` }}>
              <Play size={8} className="fill-white text-white" style={{ marginLeft: 1 }} />
            </div>
            How It Works
          </motion.button>
        </div>

        <div className="flex items-stretch gap-1 sm:gap-2 lg:gap-3 flex-nowrap mb-2 lg:mb-5 w-full">
          {metrics.map((m) => (
            <div key={m.value} className="flex flex-col items-center justify-center px-1.5 py-2 sm:px-3 sm:py-2 lg:px-5 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl flex-1 text-center" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(0,92,185,0.1)", backdropFilter: "blur(12px)", boxShadow: "0 3px 14px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
              <div className="font-black mb-0.5 text-[13px] sm:text-lg lg:text-xl whitespace-nowrap" style={{ background: m.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{m.value}</div>
              <div className="text-[7.5px] sm:text-[9px] lg:text-[10px] font-semibold tracking-wide whitespace-nowrap" style={{ color: C.textFaint }}>{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Effect (Desktop) */}
      <div className="hidden lg:flex relative w-full lg:w-[48%] flex-1 lg:h-[500px] items-center justify-center lg:mt-0">
        <div className="absolute inset-0 flex items-center justify-center scale-100 origin-center lg:mt-0">
          <motion.div className="absolute text-center z-20">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3 text-slate-500">You have wealth.</p>
            <h2 className="text-5xl font-black text-slate-900 leading-[1.1]">
              But it's <br/>
              <span style={{ color: C.goldDeep }}>fragmented.</span>
            </h2>
          </motion.div>
          {items.map((item, i) => (
            <Scene1_Item key={i} item={item} i={i} progress={progress} />
          ))}
        </div>
      </div>

      {/* Right Effect (Mobile/Tablet) */}
      <motion.div style={{ opacity: mobileRightOpacity }} className="absolute inset-0 flex lg:hidden items-center justify-center z-20 pointer-events-none pb-20">
        <div className="relative w-full h-[300px] flex items-center justify-center scale-[0.85] sm:scale-[0.9] origin-center mt-20">
          <motion.div className="absolute text-center z-20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-slate-500">You have wealth.</p>
            <h2 className="text-3xl font-black text-slate-900 leading-[1.1]">
              But it's <br/>
              <span style={{ color: C.goldDeep }}>fragmented.</span>
            </h2>
          </motion.div>
          {items.map((item, i) => (
            <Scene1_Item key={`mobile-${i}`} item={item} i={i} progress={progress} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Scene2_GoldBalance({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.15, 0.25, 0.35, 0.4, 1], [0, 1, 1, 0, 0]);
  const scale = useTransform(progress, [0.15, 0.25, 0.4, 1], [0.5, 1, 2, 2]);
  const blur = useTransform(progress, [0.35, 0.4, 1], ["blur(0px)", "blur(30px)", "blur(30px)"]);

  return (
    <motion.div style={{ opacity, scale, filter: blur }} className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.div 
        className="relative flex items-center justify-center rounded-full"
        style={{ 
          width: 400, height: 400,
          background: `radial-gradient(circle, ${C.goldBright} 0%, ${C.goldDeep} 60%, transparent 100%)`,
          boxShadow: `0 0 120px ${C.gold}`
        }}
      >
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_10s_linear_infinite]" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg)" }} />
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_15s_linear_infinite_reverse]" style={{ transformStyle: "preserve-3d", transform: "rotateY(60deg)" }} />
        <div className="text-center z-10">
          <p className="text-sm font-bold tracking-[0.4em] text-black/60 mb-2">INTRODUCING</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black">GOLD<br/>BALANCE</h2>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Scene3_Item({ strat, i, progress }: { strat: any, i: number, progress: any }) {
  const lineOp = useTransform(progress, [0.4 + i*0.02, 0.45 + i*0.02, 1], [0, 1, 1]);
  const Icon = strat.icon;
  return (
    <motion.div className={`absolute flex flex-col items-center text-center max-w-[130px] sm:max-w-[200px] lg:max-w-xs ${strat.pos}`} style={{ opacity: lineOp }}>
      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center mb-1 lg:mb-2 shadow-sm text-slate-700">
         <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
      </div>
      <div className="text-sm sm:text-lg lg:text-2xl font-black text-slate-900 mb-1 lg:mb-2 leading-tight">{strat.title}</div>
      <div className="text-[9px] sm:text-xs lg:text-base text-slate-600 font-medium leading-snug">{strat.desc}</div>
      <div className="absolute top-1/2 left-1/2 w-[140px] sm:w-[250px] lg:w-[400px] h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-x-1/2 -translate-y-1/2 -z-10 rotate-45" />
    </motion.div>
  );
}

function Scene3_Strategies({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.35, 0.45, 0.55, 0.6, 1], [0, 1, 1, 0, 0]);
  
  const strategies = [
    { title: "Investment", desc: "Gold bars grow into a mountain.", pos: "-translate-x-[110px] sm:-translate-x-[200px] lg:-translate-x-[300px] -translate-y-[140px] sm:-translate-y-[160px] lg:-translate-y-[200px]", icon: TrendingUp },
    { title: "Enroll & Experience", desc: "Join and unlock luxury.", pos: "translate-x-[110px] sm:translate-x-[200px] lg:translate-x-[300px] -translate-y-[140px] sm:-translate-y-[160px] lg:-translate-y-[200px]", icon: InfinityIcon },
    { title: "Investment & Experience", desc: "Grow wealth while you wear.", pos: "-translate-x-[110px] sm:-translate-x-[200px] lg:-translate-x-[300px] translate-y-[140px] sm:translate-y-[160px] lg:translate-y-[200px]", icon: Sparkles },
    { title: "Experience", desc: "Wear and return.", pos: "translate-x-[110px] sm:translate-x-[200px] lg:translate-x-[300px] translate-y-[140px] sm:translate-y-[160px] lg:translate-y-[200px]", icon: Gem },
  ];

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center origin-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full z-20 border-4 border-white/30"
          style={{ 
            background: `linear-gradient(135deg, ${C.goldBright} 0%, ${C.goldDeep} 100%)`, 
            boxShadow: `0 0 80px rgba(212,175,55,0.6), inset 0 0 20px rgba(255,255,255,0.5)` 
          }}
        >
          <Sparkles className="text-white/90 mb-0.5 sm:mb-1 w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[8px] sm:text-[10px] font-black text-white tracking-[0.2em] text-center leading-tight">GOLD<br/>BALANCE</span>
        </motion.div>
        
        {strategies.map((strat, i) => (
          <Scene3_Item key={i} strat={strat} i={i} progress={progress} />
        ))}
      </div>
    </motion.div>
  );
}

function Scene4_Item({ p, i, progress }: { p: any, i: number, progress: any }) {
  const pOp = useTransform(progress, [0.6 + i*0.02, 0.65 + i*0.02, 1], [0, 1, 1]);
  const pY = useTransform(progress, [0.6 + i*0.02, 0.65 + i*0.02, 1], [50, 0, 0]);
  const Icon = p.icon;
  return (
    <motion.div style={{ opacity: pOp, y: pY }} className="relative w-[68px] h-[140px] sm:w-28 sm:h-48 lg:w-32 lg:h-64 rounded-full overflow-hidden flex flex-col items-center justify-end pb-4 lg:pb-8 border border-slate-200 bg-white shadow-xl flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-t from-[#B8860B] via-transparent to-transparent opacity-10" />
      <div className="absolute -bottom-6 lg:-bottom-10 w-16 h-16 lg:w-40 lg:h-40 bg-[#F4C430] blur-[15px] lg:blur-[40px] opacity-20" />
      
      <div className="relative z-10 w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-1 lg:mb-3 text-[#B8860B]">
        <Icon className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </div>
      <span className="text-slate-800 text-center font-bold relative z-10 px-1 text-[7.5px] sm:text-xs lg:text-base leading-tight">{p.title}</span>
    </motion.div>
  );
}

function Scene4_Benefits({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.55, 0.65, 0.75, 0.8, 1], [0, 1, 1, 0, 0]);
  const portals = [
    { title: "Luxury Boutique", icon: Sparkles },
    { title: "Instant Loan", icon: Landmark },
    { title: "Liquidity", icon: Zap },
    { title: "Gift Gold", icon: Gift },
    { title: "Passive Income", icon: TrendingUp }
  ];

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center pt-4 sm:pt-8">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 sm:mb-10 lg:mb-16 tracking-tight text-center px-4">Five Infinite Portals</h2>
      <div className="flex flex-nowrap sm:flex-wrap justify-center gap-1 sm:gap-6 lg:gap-8 px-1 sm:px-2 max-w-5xl w-full">
        {portals.map((p, i) => (
          <Scene4_Item key={i} p={p} i={i} progress={progress} />
        ))}
      </div>
    </motion.div>
  );
}

function Scene5_Ending({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.75, 0.85, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0.75, 1], [0.8, 1]);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="relative w-96 h-96 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[0.5px] border-slate-300 border-dashed animate-[spin_30s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border-[0.5px] border-[#D4AF37]/50 animate-[spin_20s_linear_infinite_reverse]" />
        
        <div className="z-10 text-center bg-white/50 backdrop-blur-md p-8 rounded-full shadow-2xl border border-white">
          <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h1 className="text-5xl font-black text-slate-900 tracking-widest mb-2">LIMOVI</h1>
          <p className="tracking-[0.3em] text-sm font-bold uppercase" style={{ color: C.goldDeep }}>The Gold Ecosystem</p>
        </div>

        {/* Orbiting text elements */}
        {["Investment", "Experience", "Loans", "Liquidity", "Gift", "Income"].map((t, i) => (
          <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 60}deg)` }}>
            <div 
              className="absolute top-0 left-1/2 px-4 py-1 rounded-full border border-slate-200 bg-white shadow-md text-xs font-bold text-slate-700 whitespace-nowrap"
              style={{ transform: `translateX(-50%) translateY(-50%) rotate(${-i * 60}deg)` }}
            >
              {t}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[500vh]" style={{ background: "linear-gradient(145deg,#FFFFFF 0%,#F8FAFC 25%,#EEF4FF 60%,#DCEBFF 100%)" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient background particles/glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, rgba(212,175,55,0.07) 0%, transparent 70%)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(0,92,185,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />
        
        {/* Scenes */}
        <Scene1_Problem progress={scrollYProgress} />
        <Scene2_GoldBalance progress={scrollYProgress} />
        <Scene3_Strategies progress={scrollYProgress} />
        <Scene4_Benefits progress={scrollYProgress} />
        <Scene5_Ending progress={scrollYProgress} />

        {/* Global Progress Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-16 lg:right-24 w-40 lg:w-48 h-1 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="h-full"
            style={{ backgroundColor: C.goldDeep, scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
        <div className="absolute bottom-4 w-max left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-16 lg:right-24 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center md:text-right">
          Scroll to explore the journey
        </div>
      </div>
    </section>
  );
}
