"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ShieldCheck, Gem, Landmark, Crown, Search } from "lucide-react";

const faqs = [
  {
    question: "How is digital gold stored and secured?",
    icon: ShieldCheck,
    answer: "Every gram of digital gold is backed by 24K 99.99% pure physical gold, stored in highly secure, fully insured, SEBI-regulated vaults in partnership with leading banks."
  },
  {
    question: "Can I convert my digital gold to physical jewellery?",
    icon: Gem,
    answer: "Yes! You can redeem your gold balance for physical coins, bars, or jewellery anytime. We offer zero making charges on select partner jeweller networks."
  },
  {
    question: "How does the Instant Loan process work?",
    icon: Landmark,
    answer: "You can pledge your digital gold balance as collateral directly through the app. Our NBFC partners process the request instantly and funds are disbursed to your linked bank account within minutes, with no physical verification."
  },
  {
    question: "What is the Jewellery Cloud?",
    icon: Crown,
    answer: "The Jewellery Cloud is a subscription or credit-based service where you can use your gold holdings as a deposit to rent luxury jewellery for special occasions, without paying the full capital cost."
  },
  {
    question: "Are there any hidden charges?",
    icon: Search,
    answer: "No. LIMOVI believes in 100% transparency. Any fees for storage, processing, or delivery are clearly stated before you confirm a transaction."
  }
];

export function FAQ() {
  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-primary mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600 font-medium">Everything you need to know about the LIMOVI ecosystem.</p>
        </div>

        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-slate-200">
              <AccordionTrigger className="text-slate-800 hover:text-brand-secondary hover:no-underline text-lg text-left py-6 transition-colors font-bold group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-brand-primary group-hover:bg-brand-secondary/10 transition-colors">
                    <faq.icon size={16} />
                  </div>
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6 font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
