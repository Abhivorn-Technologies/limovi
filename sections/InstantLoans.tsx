"use client";

import { motion } from "framer-motion";
import { CheckCircle2, IndianRupee, ShieldCheck, Clock } from "lucide-react";

const BankWithAtIcon = ({ className, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <defs>
      <mask id="at-mask">
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
    
    <g mask="url(#at-mask)">
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

const steps = [
  { id: 1, title: "Gold Balance", desc: "Select from your digital vault", icon: <ShieldCheck className="w-6 h-6 text-brand-secondary" /> },
  { id: 2, title: "Instant Verify", desc: "No physical checks needed", icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" /> },
  { id: 3, title: "NBFC Partner", desc: "Best rates secured instantly", icon: <Clock className="w-6 h-6 text-brand-accent" /> },
  { id: 4, title: "Money In Bank", desc: "Disbursed in minutes", icon: <IndianRupee className="w-6 h-6 text-green-500" /> },
];

// Pre-computed stable values — no Math.random() at render time (prevents hydration mismatch)
const NOTES = [
  { left: 8,  r0: 12,  r1: 180, dur: 5.2, delay: 0.0 },
  { left: 18, r0: 55,  r1: 270, dur: 4.8, delay: 0.8 },
  { left: 28, r0: 30,  r1: 90,  dur: 6.1, delay: 1.5 },
  { left: 38, r0: 70,  r1: 320, dur: 5.5, delay: 0.3 },
  { left: 48, r0: 5,   r1: 200, dur: 4.3, delay: 2.1 },
  { left: 57, r0: 45,  r1: 140, dur: 6.4, delay: 0.6 },
  { left: 65, r0: 80,  r1: 260, dur: 5.0, delay: 1.9 },
  { left: 73, r0: 20,  r1: 330, dur: 4.6, delay: 1.2 },
  { left: 82, r0: 60,  r1: 100, dur: 5.8, delay: 2.7 },
  { left: 91, r0: 35,  r1: 215, dur: 6.0, delay: 0.4 },
  { left: 14, r0: 15,  r1: 75,  dur: 4.9, delay: 1.7 },
  { left: 33, r0: 50,  r1: 295, dur: 5.3, delay: 2.3 },
  { left: 52, r0: 25,  r1: 160, dur: 6.2, delay: 0.9 },
  { left: 70, r0: 65,  r1: 240, dur: 4.7, delay: 1.4 },
  { left: 88, r0: 40,  r1: 310, dur: 5.6, delay: 2.6 },
];

export function InstantLoans() {
  return (
    <>
      {/* ── Instant Loans Section ── */}
      <section id="loans" className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BankWithAtIcon className="text-brand-secondary w-6 h-6" />
                <span className="text-brand-secondary font-bold uppercase tracking-widest text-sm">INSTANT LOANS </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">
                Digital & physical gold backed loans.
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                Take a loan against your gold balance instantly without physical visits. We partner with RBI-regulated NBFCs like <strong className="text-brand-secondary">Rupeek</strong> as our primary lending rail.
              </p>

              {/* HOW GOLD CONVERTS TO LOAN */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">How your Gold converts to a Loan:</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-slate-600">Your <strong className="text-slate-800">eligible Gold Balance</strong> is securely marked as collateral for the loan.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-slate-600">Our NBFC partner calculates eligibility based on strict <strong className="text-slate-800">RBI LTV (Loan-to-Value) limits</strong>.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-slate-600">Funds move <strong className="text-slate-800">directly from the regulated bank</strong> to your account. Your gold balance remains yours.</p>
                  </div>
                </div>
              </div>

              <button className="cursor-pointer bg-brand-primary text-white hover:bg-slate-800 px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(10,37,64,0.2)]">
                Check Loan Eligibility
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[500px] sm:min-h-[600px] py-12 rounded-3xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-xl"
            >
              <div className="relative z-10 w-full max-w-sm bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Loan Approved</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Available Gold Balance</span>
                    <span className="font-bold text-slate-800 text-right">150.00g</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Max. Loan Eligibility</span>
                    <span className="font-bold text-slate-800 text-right">₹ 7,50,000</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Required Loan Amount</span>
                    <span className="font-bold text-brand-primary text-right border-b-2 border-brand-primary/30 px-1">₹ 2,50,000</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Gold Pledged</span>
                    <span className="font-bold text-brand-gold-luxury text-right">50.00g</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Loan Amount</span>
                    <span className="font-bold text-right">₹ 2,50,000</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Lending Partner</span>
                    <span className="font-bold text-brand-secondary text-right">Rupeek (NBFC)</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Instant Liquidity Section ── */}
      <section id="liquidity" className="py-16 md:py-32 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
            
            {/* Swapped order for visual balance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative min-h-[500px] sm:min-h-[600px] py-12 rounded-3xl border border-brand-secondary/20 bg-gradient-to-br from-slate-50 to-brand-secondary/5 overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-xl"
            >
              <div className="relative z-10 w-full max-w-sm bg-white border border-slate-100 rounded-2xl p-5 sm:p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-brand-secondary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                    <IndianRupee className="w-7 h-7 text-brand-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Instant Cash Out</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Available Gold Balance</span>
                    <span className="font-bold text-slate-800 text-right">150.00g</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Today Gold Price/Gram</span>
                    <span className="font-bold text-slate-800 text-right">₹ 7,500</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Eligible Value</span>
                    <span className="font-bold text-slate-800 text-right">₹ 11,25,000</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Required Liquidity</span>
                    <span className="font-bold text-brand-secondary text-right border-b-2 border-brand-secondary/30 px-1">₹ 85,000</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Gold Liquidated</span>
                    <span className="font-bold text-brand-gold-luxury text-right">-10.00g</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Liquidation Value</span>
                    <span className="font-bold text-green-600 text-right">₹ 85,000</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
                    <span className="text-slate-500 leading-tight">Settlement Rail</span>
                    <span className="font-bold text-right">IMPS / UPI</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 gap-4">
                    <span className="text-slate-500 leading-tight">Gateway</span>
                    <span className="font-bold text-slate-700 text-right">Razorpay / Cashfree</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-brand-accent w-6 h-6" />
                <span className="text-brand-accent font-bold uppercase tracking-widest text-sm">INSTANT LIQUIDITY ️</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">
                Instant Liquidity on Gold Balances
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                Liquidate your digital gold  or physical gold into transparent cash value instantly. Connected via secure IMPS/UPI banking APIs through certified payment gateways.
              </p>

              {/* HOW GOLD CONVERTS TO CASH */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">How your Gold converts to Cash:</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-secondary/10 text-brand-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-slate-600">Select the exact <strong className="text-slate-800">grams of Digital Gold</strong> you wish to liquidate from your balance.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-secondary/10 text-brand-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-slate-600">The equivalent cash value is locked in using <strong className="text-slate-800">transparent wholesale spot prices (MCX)</strong>.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-slate-600">Cash is settled immediately via <strong className="text-slate-800">Razorpay/Cashfree IMPS rails</strong> directly to your bank.</p>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
