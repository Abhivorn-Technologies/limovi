"use client";

import { useState, useEffect } from "react";
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

// Default 24K Gold Rate per Gram
const DEFAULT_GOLD_RATE = 14400;

// ─── Instant Loans Interactive Widget matching notebook note ───────────────
function InstantLoansWidget() {
  const [goldRate] = useState<number>(DEFAULT_GOLD_RATE);
  const [availableGrams] = useState<number>(50);
  const [requiredLoan] = useState<number>(200000);

  const totalGoldValue = Math.round(availableGrams * goldRate);
  const maxLoanEligibility = Math.round(totalGoldValue * 0.75);
  const safeLoanAmount = Math.min(requiredLoan, maxLoanEligibility);

  // Gold pledged in grams = Loan amount / gold rate
  const goldPledgedGrams = (safeLoanAmount / goldRate).toFixed(2);
  const eligibleJewelleryGrams = Math.max(0, availableGrams - parseFloat(goldPledgedGrams)).toFixed(2);

  return (
    <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xl">
      <div className="text-center mb-6">
        <div className="w-13 h-13 bg-brand-primary/10 rounded-full mx-auto flex items-center justify-center mb-3">
          <BankWithAtIcon className="w-7 h-7 text-brand-primary" />
        </div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Instant Loans</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Gold Collateral &amp; Jewellery Experience Example</p>
      </div>

      <div className="space-y-3.5 text-xs sm:text-sm">
        {/* 1. Available Gold Balance */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">1. Available Gold Balance</span>
          <span className="font-bold text-slate-900 text-right">{availableGrams.toFixed(2)}g (24K)</span>
        </div>

        {/* 2. Gold Rate per Gram */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">2. Today Gold Rate per Gram (24K)</span>
          <span className="font-bold text-slate-800 text-right">₹ {goldRate.toLocaleString('en-IN')}</span>
        </div>

        {/* 3. Total Gold Balance Value */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">3. Total Gold Balance Value</span>
          <span className="font-bold text-slate-900 text-right">₹ {totalGoldValue.toLocaleString('en-IN')}</span>
        </div>

        {/* 4. Max Loan Eligibility */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-blue-50/60 px-3 py-2 rounded-lg">
          <span className="text-slate-700 font-semibold leading-tight">4. Max. Loan Eligibility (75%)</span>
          <span className="font-bold text-[#003D80] text-right">₹ {maxLoanEligibility.toLocaleString('en-IN')}</span>
        </div>

        {/* 5. Required Gold Loan Amount */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">5. Required Gold Loan Amount</span>
          <span className="font-bold text-[#005CB9] text-right border-b-2 border-[#005CB9]/40 pb-0.5">
            ₹ {safeLoanAmount.toLocaleString('en-IN')}
          </span>
        </div>

        {/* 6. Gold Pledged (in GOLD text) */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-amber-50/70 px-3 py-2 rounded-lg border border-amber-200/40">
          <span className="text-slate-700 font-semibold leading-tight">6. Gold Pledged</span>
          <span className="font-extrabold text-[#B8860B] text-right">{goldPledgedGrams}g (24K)</span>
        </div>

        {/* 7. Eligible Jewellery Experience (in GREEN text) */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-emerald-50/80 px-3 py-2 rounded-lg border border-emerald-200/40">
          <span className="text-slate-700 font-semibold leading-tight">7. Eligible Jewellery Experience</span>
          <span className="font-extrabold text-emerald-700 text-right">Value up to {eligibleJewelleryGrams}g (24K)</span>
        </div>

        {/* 8. Lending Partner */}
        <div className="flex items-center justify-between pt-1 gap-3 px-1">
          <span className="text-slate-500 font-medium leading-tight">8. Lending Partner</span>
          <span className="font-bold text-[#005CB9] text-right">RBI Regulated NBFC</span>
        </div>
      </div>
    </div>
  );
}

// ─── Instant Liquidity Interactive Widget matching notebook note ────────────
function InstantLiquidityWidget() {
  const [goldRate] = useState<number>(DEFAULT_GOLD_RATE);
  const [availableGrams] = useState<number>(50);
  const [requiredLiquidity] = useState<number>(200000);

  const totalGoldValue = Math.round(availableGrams * goldRate);
  const goldLiquidatedGrams = (requiredLiquidity / goldRate).toFixed(2);
  const remainingGoldGrams = (availableGrams - parseFloat(goldLiquidatedGrams)).toFixed(2);

  return (
    <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xl">
      <div className="text-center mb-6">
        <div className="w-13 h-13 bg-brand-secondary/10 rounded-full mx-auto flex items-center justify-center mb-3">
          <IndianRupee className="w-7 h-7 text-brand-secondary" />
        </div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Instant Liquidity</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Gold Liquidation Example</p>
      </div>

      <div className="space-y-3.5 text-xs sm:text-sm">
        {/* 1. Available Gold Balance */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">1. Available Gold Balance</span>
          <span className="font-bold text-slate-900 text-right">{availableGrams.toFixed(2)}g (24K)</span>
        </div>

        {/* 2. Gold Rate per Gram */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">2. Today Gold Rate per Gram (24K)</span>
          <span className="font-bold text-slate-800 text-right">₹ {goldRate.toLocaleString('en-IN')}</span>
        </div>

        {/* 3. Total Gold Balance Value */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">3. Total Gold Balance Value</span>
          <span className="font-bold text-slate-900 text-right">₹ {totalGoldValue.toLocaleString('en-IN')}</span>
        </div>

        {/* 4. Required Liquidity */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-blue-50/60 px-3 py-2 rounded-lg">
          <span className="text-slate-700 font-semibold leading-tight">4. Required Liquidity</span>
          <span className="font-bold text-[#003D80] text-right">₹ {requiredLiquidity.toLocaleString('en-IN')}</span>
        </div>

        {/* 5. Gold Liquidated */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-amber-50/70 px-3 py-2 rounded-lg border border-amber-200/40">
          <span className="text-slate-700 font-semibold leading-tight">5. Gold Liquidated</span>
          <span className="font-extrabold text-[#B8860B] text-right">{goldLiquidatedGrams}g (24K)</span>
        </div>

        {/* 6. Remaining Gold Balance */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3 bg-emerald-50/80 px-3 py-2 rounded-lg border border-emerald-200/40">
          <span className="text-slate-700 font-semibold leading-tight">6. Remaining Gold Balance</span>
          <span className="font-extrabold text-emerald-700 text-right">{remainingGoldGrams}g (24K)</span>
        </div>

        {/* 7. Settlement Rail */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-3">
          <span className="text-slate-600 font-medium leading-tight">7. Settlement Rail</span>
          <span className="font-bold text-slate-800 text-right">IMPS / RTGS</span>
        </div>

        {/* 8. Liquidity Partner */}
        <div className="flex items-center justify-between pt-1 gap-3 px-1">
          <span className="text-slate-500 font-medium leading-tight">8. Liquidity Partner</span>
          <span className="font-bold text-brand-secondary text-right">LIMOVI</span>
        </div>
      </div>
    </div>
  );
}

export function InstantLoans() {
  return (
    <>
      {/* ── Instant Loans Section ── */}
      <section id="loans" className="py-16 md:py-32 bg-white relative overflow-hidden" style={{ background: "#FFFFFF" }}>
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
                Digital &amp; physical gold backed loans.
              </h2>
              <p className="text-xl text-slate-600 mb-4 font-medium leading-relaxed">
                Take a loan against your gold balance instantly without physical visits. We partner with RBI-regulated NBFCs as our primary lending rail.
              </p>

              {/* Bullet points directly under paragraph */}
              <ul className="space-y-2.5 mb-8 text-slate-600 text-base font-medium">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-2.5" />
                  <span>Enjoy jewellery experience worth value of remaining gold balance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-2.5" />
                  <span>Loan + Jewellery Experience.</span>
                </li>
              </ul>

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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[500px] sm:min-h-[600px] py-12 rounded-3xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-xl"
            >
              <InstantLoansWidget />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Instant Liquidity Section ── */}
      <section id="liquidity" className="py-16 md:py-32 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
            
            {/* Widget container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative min-h-[500px] sm:min-h-[600px] py-12 rounded-3xl border border-brand-secondary/20 bg-gradient-to-br from-slate-50 to-brand-secondary/5 overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-xl"
            >
              <InstantLiquidityWidget />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="text-brand-secondary w-6 h-6" />
                <span className="text-brand-secondary font-bold uppercase tracking-widest text-sm">INSTANT LIQUIDITY</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">
                Instant Liquidity on Gold Balances
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                Liquidate your Gold Balance into transparent cash value instantly. Connected via secure IMPS/UPI banking APIs through certified payment gateways.
              </p>

              {/* HOW YOUR GOLD CONVERTS TO CASH */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">How your Gold converts to Cash:</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-slate-600">Select the exact <strong className="text-slate-800">Gold Balance</strong> you wish to liquidate from your balance.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
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
