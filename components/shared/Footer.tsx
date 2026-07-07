"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Gold Balance", href: "/products/balance" },
    { label: "Jewellery Cloud", href: "/products/jewellery" },
    { label: "Instant Loans", href: "/products/loans" },
    { label: "Yield Generation", href: "/products/yield" },
    { label: "Gift Gold", href: "/products/gift" },
  ],
  compliance: [
    { label: "SEBI Info", href: "/compliance/sebi" },
    { label: "RBI Guidelines", href: "/compliance/rbi" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-50 pt-6 lg:pt-24 pb-12 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-6 lg:gap-8 mb-12 lg:mb-16">
          
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4 lg:mb-6">
              <Image
                src="/Limovi-1.png"
                alt="LIMOVI"
                width={871}
                height={237}
                style={{ width: "135px", height: "auto", objectFit: "contain" }}
              />
            </Link>
            <p className="text-slate-600 mb-6 max-w-sm font-medium text-sm lg:text-base">
              India&apos;s first 360° Gold Asset Ecosystem. Convert your gold into liquidity, luxury experiences, and wealth.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-secondary hover:border-brand-secondary transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-secondary hover:border-brand-secondary transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-secondary hover:border-brand-secondary transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-slate-900 font-bold mb-4 lg:mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 font-medium hover:text-brand-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-slate-900 font-bold mb-4 lg:mb-6">Products</h4>
            <ul className="space-y-4">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 font-medium hover:text-brand-secondary transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2 mt-2 lg:mt-0">
            <h4 className="text-slate-900 font-bold mb-4 lg:mb-6">Compliance & Legal</h4>
            <ul className="space-y-4">
              {footerLinks.compliance.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 font-medium hover:text-brand-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} LIMOVI. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a
              href="https://www.abhivorn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors text-[#0A2540] hover:text-brand-secondary"
            >
              Abhivorn Technologies Pvt Ltd
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.digilevelup.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors text-[#0A2540] hover:text-brand-secondary"
            >
              Digilevelup
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
