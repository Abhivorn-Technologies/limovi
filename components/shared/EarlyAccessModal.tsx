"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";

// Admin WhatsApp configuration - reads from environment variable (NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER) with fallback
const ADMIN_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "919000360109"; 

export function EarlyAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goldBalance, setGoldBalance] = useState("50 grams");
  const [interest, setInterest] = useState("Jewellery Cloud (Wear & Experience)");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSubmitted(false);
    };
    window.addEventListener("open-early-access-modal", handleOpen);
    return () => window.removeEventListener("open-early-access-modal", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Formulate professional WhatsApp message text
    const messageText = `Hello LIMOVI Team! 👋\nI would like to request Early Access to India's First Living Gold Ecosystem.\n\n📋 *Applicant Details:*\n- *Name:* ${name.trim()}\n- *WhatsApp:* ${phone.trim()}\n- *Gold Balance:* ${goldBalance}\n- *Primary Interest:* ${interest}\n\nPlease share early access onboarding details. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setSubmitted(true);

    // Open WhatsApp directly in new tab
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#0B1F3A] via-[#0A2540] to-[#051120] text-white rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/35 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Metallic sheen */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-30 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          >
            <X size={14} />
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={11} /> LIMOVI VIP Access
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">
                Get Early Access
              </h3>
              <p className="text-[11px] text-slate-300 mb-4 font-medium leading-relaxed">
                Fill in your details. Submitting sends your Early Access request directly to the Admin on WhatsApp.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>

                {/* Gold Balance - Text Input Format with 50g Minimum */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center justify-between">
                    <span>Estimated Gold Balance *</span>
                    <span className="text-[9px] text-[#D4AF37] font-extrabold uppercase tracking-wider">Min. 50g Starting</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50 grams 24K Gold"
                    value={goldBalance}
                    onChange={(e) => setGoldBalance(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                  <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                    <span className="text-[9px] text-slate-400 font-semibold mr-0.5">Quick fill:</span>
                    {["50 grams (Min)", "100 grams", "250 grams", "500+ grams"].map((preset) => {
                      const actualVal = preset.replace(" (Min)", "");
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setGoldBalance(actualVal)}
                          className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all cursor-pointer ${
                            goldBalance === actualVal
                              ? "bg-[#D4AF37]/25 border border-[#D4AF37] text-[#D4AF37]"
                              : "bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 text-slate-300 hover:text-white"
                          }`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Access Strategy - Compact Cards */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Preferred Access Strategy (Select One)
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: "Investment & Experience", value: "Strategy: Investment & Experience (Best Value)", tag: "Best Value" },
                      { label: "Enroll & Experience", value: "Strategy: Enroll & Experience (Existing Ornaments)", tag: "Zero Outlay" },
                      { label: "Investment Only", value: "Strategy: Investment Only" },
                      { label: "Experience Only", value: "Strategy: Experience Only" },
                    ].map((item) => {
                      const isSelected = interest === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setInterest(item.value)}
                          className={`px-2.5 py-1.5 rounded-lg border text-[10.5px] font-semibold flex items-center justify-between transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-[#005CB9]/30 border-[#005CB9] text-white shadow-[0_0_10px_rgba(0,92,185,0.3)]"
                              : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          <div className="min-w-0 pr-1">
                            <span className="block truncate text-[10.5px] font-bold leading-tight">{item.label}</span>
                            {item.tag && (
                              <span className="text-[7.5px] font-black uppercase text-[#D4AF37] block mt-0.5">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          {isSelected && <CheckCircle2 size={13} className="text-[#00D4FF] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_8px_20px_rgba(37,211,102,0.3)] cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    Send
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 pt-0.5">
                  <ShieldCheck size={11} className="text-emerald-400" />
                  <span>100% Confidential & Direct Connection</span>
                </div>
              </form>
            </>
          ) : (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border-2 border-[#25D366] text-[#25D366] flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Redirecting to WhatsApp...</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mb-6 leading-relaxed font-medium">
                Your Early Access application has been prepared and is opening directly in WhatsApp to message the LIMOVI Admin.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
