"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Crown, Sparkles, ChevronLeft, ChevronRight, X, BadgeCheck, Percent, Coins, Lock } from "lucide-react";
import Image from "next/image";

interface JewelleryItem {
  id: number;
  name: string;
  category: string;
  image: string;
  accent: string;
  purity?: string;
  balanceReq?: string;
  makingSavings?: string;
  description?: string;
}

const celebrationCollections: JewelleryItem[] = [
  { id: 1, name: "Royal Long Haram",    category: "Traditional",       image: "/images/long_haram.png",     accent: "#E8A020", purity: "22K / 24K BIS Hallmarked", balanceReq: "50g+ Gold Balance", makingSavings: "18% Saved on Making Charges", description: "A magnificent royal long haram handcrafted for weddings and grand heritage celebrations." },
  { id: 2, name: "Heritage Necklace",   category: "Signature",         image: "/images/necklace.png",       accent: "#D4AF37", purity: "22K Fine Gold", balanceReq: "40g+ Gold Balance", makingSavings: "15% Saved on Making Charges", description: "Exquisite signature temple necklace showcasing intricate traditional Indian artistry." },
  { id: 3, name: "Bridal Nose Ring",    category: "Bridal",            image: "/images/nose_piercing.png",  accent: "#9b2c2c", purity: "22K Certified Gold", balanceReq: "15g+ Gold Balance", makingSavings: "20% Saved on Making Charges", description: "Ornate bridal nath/nose ring crafted with precision for sacred wedding rituals." },
  { id: 4, name: "Temple Jhumkas",     category: "Heritage",          image: "/images/ear_piercing.png",   accent: "#b7791f", purity: "22K Antique Gold", balanceReq: "25g+ Gold Balance", makingSavings: "16% Saved on Making Charges", description: "Classic heritage temple jhumkas featuring authentic gold bead detailing." },
  { id: 5, name: "Bridal Wedding Set",  category: "Grand Collection",  image: "/images/jewellery-wedding.png",accent: "#ed8936", purity: "22K/24K Royal Gold", balanceReq: "100g+ Gold Balance", makingSavings: "22% Saved on Making Charges", description: "Complete grand bridal ensemble for brides wanting the ultimate royal luxury experience." },
];

const dailyCollections: JewelleryItem[] = [
  { id: 1, name: "Pendant & Chain",     category: "Minimalist", image: "/images/minimal_pendant_v2.png",   accent: "#D4AF37", purity: "22K Everyday Gold", balanceReq: "10g+ Gold Balance", makingSavings: "14% Saved on Making Charges", description: "Sleek minimalist gold pendant designed for daily elegance and effortless styling." },
  { id: 2, name: "Classic Bracelet",    category: "Classic",    image: "/images/minimal_bracelet_v2.png",  accent: "#D4AF37", purity: "22K Fine Gold", balanceReq: "15g+ Gold Balance", makingSavings: "12% Saved on Making Charges", description: "Timeless handcrafted gold bracelet featuring a smooth comfortable fit." },
  { id: 3, name: "Solitaire Studs",     category: "Everyday",   image: "/images/minimal_studs_v2.png",     accent: "#D4AF37", purity: "18K / 22K Fine Gold", balanceReq: "10g+ Gold Balance", makingSavings: "14% Saved on Making Charges", description: "Chic everyday solitaire gold ear studs for office, leisure, and daily wear." },
  { id: 4, name: "Subtle Nose Pin",     category: "Subtle",     image: "/images/minimal_nose_stud_v4.png", accent: "#D4AF37", purity: "22K Handcrafted", balanceReq: "5g+ Gold Balance", makingSavings: "15% Saved on Making Charges", description: "Delicate handcrafted nose pin offering subtle modern elegance." },
  { id: 5, name: "Elegant Gold Ring",  category: "Elegance",   image: "/images/minimal_ring_v2.png",      accent: "#D4AF37", purity: "22K Certified Gold", balanceReq: "8g+ Gold Balance", makingSavings: "14% Saved on Making Charges", description: "Modern polished gold band designed for stackable or solo everyday luxury." },
];

const AUTO_INTERVAL = 2500; // ms

function normalizeOffset(raw: number, N: number): number {
  let o = ((raw % N) + N) % N;
  if (o > Math.floor(N / 2)) o -= N;
  return o;
}

function PieceModal({ item, onClose }: { item: JewelleryItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md my-auto max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#0B1F3A] via-[#0A2540] to-[#051120] text-white rounded-3xl p-5 sm:p-7 border border-[#D4AF37]/35 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
        >
          {/* Metallic sheen */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Image & Header - Full view without cutoff */}
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-gradient-to-b from-[#061220] via-[#0A1F38] to-[#061220] flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-2 hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute top-3 left-3 bg-[#0B1F3A]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30 flex items-center gap-1.5 text-[11px] font-bold text-[#D4AF37] z-10">
              <Sparkles size={12} />
              {item.category}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5">{item.name}</h3>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed font-medium">
            {item.description}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-start gap-2">
              <BadgeCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Purity</span>
                <span className="font-bold text-slate-200 text-[11px]">{item.purity}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-start gap-2">
              <Percent className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Limovi Privilege</span>
                <span className="font-bold text-emerald-400 text-[11px]">{item.makingSavings}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-start gap-2">
              <Coins className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Access Level</span>
                <span className="font-bold text-slate-200 text-[11px]">{item.balanceReq}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-start gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Vaulting</span>
                <span className="font-bold text-slate-200 text-[11px]">100% BIS Certified</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function CarouselSlider({
  collections,
  title,
  subtitle,
  isMobile,
  onViewPiece,
}: {
  collections: JewelleryItem[];
  title: string;
  subtitle: string;
  isMobile: boolean;
  onViewPiece: (item: JewelleryItem) => void;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const N = collections.length;

  const step = isMobile ? 220 : 300;
  const activeW = isMobile ? 310 : 370;
  const activeH = isMobile ? 420 : 510;
  const normalW = isMobile ? 180 : 250;
  const normalH = isMobile ? 280 : 400;

  const prev = useCallback(() => setActive((a) => (a - 1 + N) % N), [N]);
  const next = useCallback(() => setActive((a) => (a + 1) % N), [N]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className="mb-24">
      {/* ── Carousel Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-20"
          style={{ background: "linear-gradient(to right,#F8F9FC 30%,transparent)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-20"
          style={{ background: "linear-gradient(to left,#F8F9FC 30%,transparent)" }}
        />

        {/* Cards */}
        {collections.map((item, i) => {
          const offset = normalizeOffset(i - active, N);
          const absOff = Math.abs(offset);
          const isActive = offset === 0;

          const opacity = absOff > 2 ? 0 : isActive ? 1 : 0.5 - absOff * 0.05;
          const zIndex = 20 - absOff * 5;
          const w = isActive ? activeW : normalW;
          const h = isActive ? activeH : normalH;
          const xOffset = offset * step;
          const filter = isActive ? "brightness(1.05) saturate(1.15)" : `brightness(0.7) saturate(0.85)`;

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
                src={item.image}
                alt={item.name}
                fill
                sizes={`${activeW}px`}
                className="object-cover"
                priority={absOff <= 1}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top,rgba(11,31,58,0.85) 0%,rgba(11,31,58,0.0) 35%,transparent 100%)",
                }}
              />
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg,${item.accent},transparent)` }}
                />
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
                <div className="flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPiece(item);
                    }}
                    className="px-5 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.28)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    View
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 4px 20px rgba(11,31,58,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: "#0B1F3A" }} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 4px 20px rgba(11,31,58,0.15)",
            backdropFilter: "blur(8px)",
          }}
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
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === active ? 28 : 8,
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
  const [selectedPiece, setSelectedPiece] = useState<JewelleryItem | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="jewellery-experience" className="relative py-20 bg-white overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle,#D4AF37 0%,transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle,#0B1F3A 0%,transparent 70%)" }}
      />

      {/* ── Text header ── */}
      <div className="px-10 md:px-20 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-5">
            <Crown className="w-5 h-5" style={{ color: "#D4AF37" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D4AF37" }}>
              Luxury Jewellery Cloud
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight"
            style={{ color: "#0B1F3A" }}
          >
            Experience Luxury.<br />
            <span
              style={{
                background: "linear-gradient(90deg,#D4AF37,#FFE066,#D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Unlock More From Your Gold.
            </span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
            Your <strong className="text-slate-700">Gold Balance</strong> opens the door to the LIMOVI Jewellery Cloud. As your eligible Gold Balance grows, so can your access to a wider range of jewellery experiences—from everyday elegance to grand celebrations. Explore premium collections for different moments without having to purchase a new piece every time.
          </p>
        </motion.div>
      </div>

      <div id="heritage-collection">
        <CarouselSlider
          collections={celebrationCollections}
          title="Luxury Jewellery"
          subtitle="Exquisitely crafted for weddings and significant life milestones."
          isMobile={isMobile}
          onViewPiece={setSelectedPiece}
        />
      </div>

      <div id="minimalist-elegance">
        <CarouselSlider
          collections={dailyCollections}
          title="Lifestyle Jewellery"
          subtitle="Refined jewellery for every moment."
          isMobile={isMobile}
          onViewPiece={setSelectedPiece}
        />
      </div>

      {/* Piece Details Modal */}
      <PieceModal item={selectedPiece} onClose={() => setSelectedPiece(null)} />
    </section>
  );
}
