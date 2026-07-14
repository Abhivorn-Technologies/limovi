"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Shield, Gem, Smartphone, CreditCard, Gift, Users, Landmark, Zap } from "lucide-react";

const milestones = [
  {
    title: "Your Gold. Reimagined.",
    desc: "From a dead asset in lockers to a living ecosystem that works for you.",
    icon: <Gem className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600",
    image: "/images/journey-1.png"
  },
  {
    title: "Enrol Your Gold",
    desc: "Convert your jewellery, coins or cash into digital gold balance in a few simple steps.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "bg-emerald-100 text-emerald-600",
    image: "/images/journey-2.png"
  },
  {
    title: "Jewellery Cloud",
    desc: "Access hundreds of designs. Wear, enjoy and return. It's jewellery, without ownership.",
    icon: <Gem className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600",
    image: "/images/journey-3.png"
  },
  {
    title: "Instant Liquidity",
    desc: "Get instant loans or liquidity against your gold balance. No paperwork. No waiting.",
    icon: <CreditCard className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-600",
    image: "/images/journey-4.png"
  },
  {
    title: "Wealth Generation",
    desc: "Your gold earns for you. Get rental income when your jewellery is used by others.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-600",
    image: "/images/journey-5.png"
  },
  {
    title: "Gift Gold Balance",
    desc: "Gift wealth. Not just things. Send digital gold balance to your loved ones.",
    icon: <Gift className="w-6 h-6" />,
    color: "bg-pink-100 text-pink-600",
    image: "/images/journey-6.png"
  },
  {
    title: "One Dashboard. All Access.",
    desc: "Manage investment, experience, loans, liquidity and earnings from one intelligent dashboard.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "bg-indigo-100 text-indigo-600",
    image: "/images/journey-7.png"
  },
  {
    title: "Secure. Compliant. Trusted.",
    desc: "Built on strong regulatory framework with SEBI, RBI, BIS and certified vault partners.",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-slate-100 text-slate-800",
    image: "/images/journey-8.png"
  },
  {
    title: "How It Works",
    desc: "Simple steps. Powerful impact. Enrol, balance, choose services, earn & grow.",
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "bg-teal-100 text-teal-600",
    image: "/images/journey-9.png"
  },
  {
    title: "Built For Everyone",
    desc: "For investors, dreamers, planners and achievers. Families, professionals, and next gen.",
    icon: <Users className="w-6 h-6" />,
    color: "bg-rose-100 text-rose-600",
    image: "/images/journey-10.png"
  },
  {
    title: "Backed By Strong Partners",
    desc: "Vaulting partners, NBFCs, fintech rails and technology leaders.",
    icon: <Landmark className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-800",
    image: "/images/journey-11.png"
  },
  {
    title: "India's First 360° Gold Ecosystem",
    desc: "Investment. Experience. Liquidity. Wealth. All in one place.",
    icon: <Gem className="w-6 h-6" />,
    color: "bg-brand-gold/20 text-brand-gold-luxury",
    image: "/images/journey-12.png"
  }
];

export function EcosystemJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Smooth out the scroll progress for drawing the line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
    
    // Update on resize
    const handleResize = () => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-slate-50 relative overflow-x-hidden">
      <div className="container mx-auto px-6 mb-24 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 tracking-tight"
        >
          The 360° Gold Journey ️
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
        >
          Follow the path to see how Limovi transforms your physical gold into a lifetime of financial utilities and luxury experiences.
        </motion.p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        
        {/* The SVG Path Background */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 h-full pointer-events-none hidden md:block">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <path 
              d="M50,0 L50,1000" 
              stroke="#E2E8F0" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="10 10" 
            />
            <motion.path 
              ref={pathRef}
              d="M50,0 L50,1000" 
              stroke="url(#journeyGradient)" 
              strokeWidth="8" 
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
              }}
            />
            <defs>
              <linearGradient id="journeyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="50%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#0A2540" />
              </linearGradient>
            </defs>
          </svg>

          {/* The walking avatar */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-brand-secondary shadow-[0_0_20px_rgba(0,102,255,0.4)] flex items-center justify-center z-20"
            style={{
              top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
              marginTop: "-24px" // offset to center
            }}
          >
            <span className="text-xl"></span>
          </motion.div>
        </div>

        {/* Mobile vertical line */}
        <div className="absolute top-0 bottom-0 left-8 w-1 bg-slate-200 md:hidden z-0" />
        <motion.div 
          className="absolute top-0 bottom-0 left-8 w-1 bg-brand-secondary md:hidden z-0 origin-top" 
          style={{ scaleY: smoothProgress }}
        />

        {/* Milestones */}
        <div className="space-y-24 md:space-y-48 pb-24 relative z-10">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${milestone.color} ${isEven ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                      {milestone.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">{milestone.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-lg">{milestone.desc}</p>
                  </motion.div>
                </div>

                {/* Node / Checkpoint (Mobile only) */}
                <div className="absolute left-8 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-slate-300 md:hidden" />

                {/* Image Side */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 pr-2 md:pr-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3, delay: 0.1 }}
                    className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(10,37,64,0.1)] border border-slate-200 group"
                  >
                    <Image 
                      src={milestone.image} 
                      alt={milestone.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Decorative overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
