"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Crown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const celebrationCollections = [
  { id: 1, name: "Long Haram",    category: "Traditional",  value: "₹5L – ₹25L", image: "/images/long_haram.png",     accent: "#E8A020" },
  { id: 2, name: "Necklace",      category: "Signature",    value: "₹2L – ₹10L", image: "/images/necklace.png",       accent: "#D4AF37" },
  { id: 3, name: "Nose Piercing", category: "Bridal",       value: "₹50K – ₹2L", image: "/images/nose_piercing.png",  accent: "#9b2c2c" },
  { id: 4, name: "Ear Piercing",  category: "Heritage",     value: "₹1L – ₹3L",  image: "/images/ear_piercing.png",   accent: "#b7791f" },
  { id: 5, name: "Wedding Set",   category: "Grand",        value: "₹15L – ₹50L",image: "/images/jewellery-wedding.png",accent: "#ed8936" },
];

const dailyCollections = [
  { id: 1, name: "Gold Chain",        category: "Minimal",  value: "₹15K – ₹80K", image: "/images/minimal_pendant.png",   accent: "#D4AF37" },
  { id: 2, name: "Bracelet",          category: "Classic",  value: "₹20K – ₹1L",  image: "/images/minimal_bracelet.png",  accent: "#D4AF37" },
  { id: 3, name: "Ear Studs",         category: "Everyday", value: "₹10K – ₹50K", image: "/images/minimal_studs.png",     accent: "#D4AF37" },
  { id: 4, name: "Nose Stud",         category: "Subtle",   value: "₹5K – ₹30K",  image: "/images/minimal_nose_stud.png", accent: "#D4AF37" },
  { id: 5, name: "Ring",              category: "Elegant",  value: "₹12K – ₹60K", image: "/images/minimal_ring.png",      accent: "#D4AF37" },
];

const AUTO_INTERVAL = 2500; // ms

function normalizeOffset(raw: number, N: number): number {
  let o = ((raw % N) + N) % N;
  if (o > Math.floor(N / 2)) o -= N;
  return o;
}

function CarouselSlider({ collections, title, subtitle, isMobile }: { collections: any[], title: string, subtitle: string, isMobile: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const N = collections.length;

  const step = isMobile ? 220 : 300;
  const activeW = isMobile ? 310 : 370;
  const activeH = isMobile ? 420 : 510;
  const normalW = isMobile ? 180 : 250;
  const normalH = isMobile ? 280 : 400;

  const prev = useCallback(() => setActive(a => (a - 1 + N) % N), [N]);
  const next = useCallback(() => setActive(a => (a + 1) % N), [N]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className="mb-24">
      {/* ── Carousel Title ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="text-center mb-8 relative z-10"
      >
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium mt-2 text-sm md:text-base">{subtitle}</p>
      </motion.div>

      {/* ── Spotlight carousel ── */}
      <div
        className="relative mx-auto"
        style={{ height: activeH + 40, maxWidth: "100vw" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left/right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-20"
          style={{ background: "linear-gradient(to right,#F8F9FC 30%,transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-20"
          style={{ background: "linear-gradient(to left,#F8F9FC 30%,transparent)" }} />

        {/* Cards */}
        {collections.map((item, i) => {
          const offset   = normalizeOffset(i - active, N);
          const absOff   = Math.abs(offset);
          const isActive = offset === 0;

          const opacity  = absOff > 2 ? 0 : isActive ? 1 : 0.5 - absOff * 0.05;
          const zIndex   = 20 - absOff * 5;
          const w        = isActive ? activeW : normalW;
          const h        = isActive ? activeH : normalH;
          const xOffset  = offset * step;
          const filter   = isActive ? "brightness(1) saturate(1)" : `brightness(0.65) saturate(0.8)`;

          return (
            <motion.div
              key={item.id}
              onClick={() => setActive(i)}
              animate={{ opacity, zIndex, filter, x: xOffset, width: w, height: h }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-1/2 left-1/2 cursor-pointer rounded-3xl overflow-hidden"
              style={{
                translateY: "-50%",
                translateX: "-50%",
                width: w,
                height: h,
                boxShadow: isActive
                  ? "0 24px 60px rgba(11,31,58,0.22), 0 0 0 2px rgba(212,175,55,0.3)"
                  : "0 10px 30px rgba(11,31,58,0.10)",
                willChange: "transform, opacity, width, height",
              }}
            >
              <Image
                src={item.image} alt={item.name} fill sizes={`${activeW}px`}
                className="object-cover" priority={absOff <= 1}
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top,rgba(11,31,58,0.92) 0%,rgba(11,31,58,0.3) 50%,transparent 100%)",
              }} />
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg,${item.accent},transparent)` }} />
              )}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-0 left-0 w-full p-8"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" style={{ color: item.accent }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: item.accent }}>
                    {item.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-snug">{item.name}</h3>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-semibold" style={{ color: item.accent }}>{item.value}</span>
                  <button
                    className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.15)", color: "#fff",
                      border: "1px solid rgba(255,255,255,0.28)", backdropFilter: "blur(8px)",
                    }}
                  >
                    View Pieces
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Prev / Next buttons */}
        <button onClick={prev}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 4px 20px rgba(11,31,58,0.15)", backdropFilter: "blur(8px)" }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: "#0B1F3A" }} />
        </button>
        <button onClick={next}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 4px 20px rgba(11,31,58,0.15)", backdropFilter: "blur(8px)" }}
        >
          <ChevronRight className="w-5 h-5" style={{ color: "#0B1F3A" }} />
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-2.5 mt-10">
        {collections.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === active ? 28 : 8,
              height: 8,
              background: i === active ? "#D4AF37" : "rgba(212,175,55,0.35)",
              boxShadow: i === active ? "0 0 8px rgba(212,175,55,0.6)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function JewelleryCloud() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="jewellery-experience" className="relative py-20 bg-[#F8F9FC] overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-32 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle,#D4AF37 0%,transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle,#0B1F3A 0%,transparent 70%)" }} />

      {/* ── Text header ── */}
      <div className="px-10 md:px-20 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-5">
            <Crown className="w-5 h-5" style={{ color: "#D4AF37" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D4AF37" }}>
              Luxury Jewellery Cloud 
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight" style={{ color: "#0B1F3A" }}>
            Experience Luxury.<br />
            <span style={{
              background: "linear-gradient(90deg,#D4AF37,#FFE066,#D4AF37)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Own The Asset.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
            Your <strong className="text-slate-700">Gold Balance</strong> is the key to the LIMOVI Jewellery Cloud. The more Gold Balance you build, the greater the value and variety of jewellery you can experience. From everyday elegance to grand celebrations, unlock premium collections whenever you need them—without buying a new piece every time.
              
          </p>
        </motion.div>
      </div>

      <div id="heritage-collection">
        <CarouselSlider 
          collections={celebrationCollections} 
          title="The Heritage Collection" 
          subtitle="Bridal pieces, heavy heritage sets, and premium neckwear." 
          isMobile={isMobile} 
        />
      </div>

      <div id="minimalist-elegance">
        <CarouselSlider 
          collections={dailyCollections} 
          title="Minimalist Elegance" 
          subtitle="Simple gold studs, chains, bracelets, and rings for a subtle touch." 
          isMobile={isMobile} 
        />
      </div>

    </section>
  );
}
