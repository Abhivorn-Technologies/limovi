"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Get Early Access", isModal: true, href: "" },
  ],
  products: [
    { label: "Gold Balance", href: "#platform" },
    { label: "Luxury Jewellery Cloud", href: "#jewellery-experience" },
    { label: "Instant Loans", href: "#loans" },
    { label: "Instant Liquidity", href: "#liquidity" },
    { label: "Wealth Generation", href: "#wealth" },
    { label: "Gift Gold Ecosystem", href: "#gift-gold" },
  ],
  compliance: [
    { label: "SEBI Info", href: "/compliance/sebi" },
    { label: "RBI Guidelines", href: "/compliance/rbi" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push(`/${href}`);
        return;
      }
      const targetId = href.replace("#", "");
      if (targetId === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <footer className="bg-slate-50 pt-12 lg:pt-20 pb-12 border-t border-slate-200">
      <div className="container mx-auto px-6">
        
        {/* 12-Column Balanced Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 lg:mb-16">
          
          {/* Brand Info & Tagline Column (4 Cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4 lg:mb-6">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/logo-icon.png"
                  alt="LIMOVI Icon"
                  width={254}
                  height={237}
                  className="h-[36px] w-auto object-contain"
                />
                <Image
                  src="/logo-text.png"
                  alt="LIMOVI Text"
                  width={569}
                  height={236}
                  className="h-[50px] w-auto object-contain -mt-1.5"
                />
              </div>
            </Link>
            <p className="text-slate-600 mb-6 max-w-sm font-medium text-sm lg:text-base leading-relaxed">
              India&apos;s first 360° Gold Asset Ecosystem. Convert your gold into liquidity, luxury experiences, and wealth.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#005CB9] hover:border-[#005CB9] transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#005CB9] hover:border-[#005CB9] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
            </div>
          </div>

          {/* Company Column (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-bold mb-4 lg:mb-6 text-base">Company</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.isModal ? (
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent("open-early-access-modal"))} 
                      className="text-slate-600 font-medium hover:text-[#005CB9] transition-colors text-sm whitespace-nowrap text-left cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link href={link.href} className="text-slate-600 font-medium hover:text-[#005CB9] transition-colors text-sm whitespace-nowrap">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column (3 Cols - Single Line Items) */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-bold mb-4 lg:mb-6 text-base">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={pathname !== "/" && link.href.startsWith("#") ? `/${link.href}` : link.href} 
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-slate-600 font-medium hover:text-[#005CB9] transition-colors flex items-center gap-2 group whitespace-nowrap text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 group-hover:bg-[#005CB9]" />
                    <span className="whitespace-nowrap">{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all shrink-0 text-[#005CB9]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Legal Column (3 Cols - Closes Right Side Gap) */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-bold mb-4 lg:mb-6 text-base">Compliance &amp; Legal</h4>
            <ul className="space-y-3.5">
              {footerLinks.compliance.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-600 font-medium hover:text-[#005CB9] transition-colors text-sm whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} LIMOVI. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
