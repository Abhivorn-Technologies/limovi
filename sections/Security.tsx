"use client";

import { motion } from "framer-motion";
import { Shield, Building2, Fingerprint, Award, Scale, BookOpen } from "lucide-react";

const compliances = [
  { icon: <Scale className="w-8 h-8 text-brand-primary" />, title: "SEBI Compliance", desc: "Regulated framework" },
  { icon: <Building2 className="w-8 h-8 text-brand-secondary" />, title: "RBI Partnership Model", desc: "For secure lending" },
  { icon: <Fingerprint className="w-8 h-8 text-pink-500" />, title: "Aadhaar & PAN", desc: "Bank-grade KYC" },
  { icon: <Award className="w-8 h-8 text-green-500" />, title: "BIS Hallmark", desc: "Certified purity" },
  { icon: <Shield className="w-8 h-8 text-brand-accent" />, title: "Trust Deed", desc: "Legal protection" },
  { icon: <BookOpen className="w-8 h-8 text-purple-500" />, title: "Regulatory Framework", desc: "100% transparent" },
];

export function Security() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-secondary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-brand-primary w-6 h-6" />
              <span className="text-brand-primary font-bold uppercase tracking-widest text-sm">Enterprise Grade 🛡️</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">Uncompromising Trust</h2>
            <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
              We operate with the highest standards of regulatory compliance and security. Your assets are protected by law and stored in bank-grade vaults.
            </p>
          </motion.div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compliances.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 bg-slate-50 inline-flex p-3 rounded-xl border border-slate-100">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
