"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Diamond, Crown, Sparkles } from "lucide-react";
import Image from "next/image";

const collections = [
  { id: 1, name: "Wedding Collection", category: "Bridal", value: "₹5L - ₹20L", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80" },
  { id: 2, name: "Everyday Minimal", category: "Daily Wear", value: "₹50K - ₹2L", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80" },
  { id: 3, name: "Royal Heritage", category: "Traditional", value: "₹10L - ₹50L", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80" },
  { id: 4, name: "Diamond Solitaires", category: "Luxury", value: "₹2L - ₹15L", image: "https://images.unsplash.com/photo-1605100804763-247f66154ce5?auto=format&fit=crop&q=80" },
  { id: 5, name: "Temple Jewellery", category: "Antique", value: "₹8L - ₹25L", image: "https://images.unsplash.com/photo-1599643478514-4a46db27f806?auto=format&fit=crop&q=80" },
];

export function JewelleryCloud() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-slate-50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Crown className="text-brand-secondary w-6 h-6" />
              <span className="text-brand-secondary font-bold uppercase tracking-widest text-sm">Netflix for Jewellery 💍</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight">
              Wear Luxury.<br />Own The Asset.
            </h2>
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Why buy expensive jewellery for one occasion? Use your gold balance to access thousands of premium designs through our Jewellery Cloud.
            </p>
          </motion.div>
        </div>

        <div className="w-full overflow-hidden pl-6">
          <motion.div style={{ x }} className="flex gap-8 pb-20 w-max pr-32">
            {collections.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={item.id} 
                className="relative w-[300px] md:w-[400px] h-[400px] md:h-[500px] flex-shrink-0 rounded-3xl overflow-hidden group cursor-pointer shadow-[0_20px_40px_rgba(10,37,64,0.08)] border border-slate-200"
              >
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    <span className="text-white/80 text-sm font-medium tracking-wider uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-gold font-medium">{item.value}</span>
                    <button className="px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-bold hover:bg-brand-secondary hover:text-white transition-colors shadow-sm">
                      View Pieces
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
