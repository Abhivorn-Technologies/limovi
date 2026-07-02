"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

// LIMOVI official palette — light hero theme
const NAV_BG_SCROLLED  = "rgba(255, 255, 255, 0.98)"; // solid/frosted white when scrolled
const NAV_BG_TOP       = "transparent"; // transparent at top
const NAV_BORDER       = "rgba(0,0,0,0.06)";
const TEXT_DARK        = "rgba(10,25,41,0.75)";    // dark text — readable on light bg
const TEXT_HOVER_DARK  = "#005CB9";
const PRIMARY          = "#005CB9";
const SECONDARY        = "#2B7FE8";

const navLinks = [
  { name: "Ecosystem", href: "#" },
  { 
    name: "Loans & Liquidity", 
    isDropdown: true,
    subLinks: [
      { name: "Instant Loans", href: "#loans" },
      { name: "Instant Liquidity", href: "#liquidity" }
    ]
  },
  { name: "Jewellery Experience", href: "#jewellery-experience" },
  { name: "Gift Happiness", href: "#gift-gold" },
  { name: "Wealth", href: "#wealth" },
  { name: "Platform", href: "#platform" },
];

export function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
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
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  const currentTextColor  = TEXT_DARK;
  const currentHoverColor = TEXT_HOVER_DARK;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          isScrolled ? "backdrop-blur-xl border-b" : ""
        }`}
        style={{
          background: isScrolled ? NAV_BG_SCROLLED : NAV_BG_TOP,
          borderColor: isScrolled ? NAV_BORDER : "transparent",
          height: "90px",
          boxShadow: isScrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-full">

          {/* ── Logo ── */}
          <Link href="/" onClick={(e) => handleNavClick(e, "#")} className="relative z-[999] flex items-center group">
            <div
              className="transition-opacity duration-300 group-hover:opacity-80"
              style={{ display: "flex", alignItems: "center", height: "90px", overflow: "hidden" }}
            >
              <Image
                src="/Limovi.png"
                alt="LIMOVI"
                width={1153}
                height={288}
                priority
                style={{ objectFit: "contain", width: "160px", height: "auto" }}
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8 relative z-[999] h-full">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => link.isDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.isDropdown && setActiveDropdown(null)}
              >
                {link.isDropdown ? (
                  <span
                    className="text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-1"
                    style={{ color: currentTextColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = currentHoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = currentTextColor)}
                  >
                    {link.name}
                    <svg className="w-3 h-3 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href as string)}
                    className="text-sm font-semibold transition-colors duration-200 relative group cursor-pointer"
                    style={{ color: currentTextColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = currentHoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = currentTextColor)}
                  >
                    {link.name}
                  </a>
                )}

                {/* Dropdown Menu */}
                {link.isDropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                        className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-3 px-2 min-w-[200px]"
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-slate-200 rotate-45" />
                        {link.subLinks?.map((subLink) => (
                          <a
                            key={subLink.name}
                            href={subLink.href}
                            onClick={(e) => handleNavClick(e, subLink.href)}
                            className="relative block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
                          >
                            {subLink.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-4">


            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all relative z-[999]"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                boxShadow: `0 4px 18px rgba(0,92,185,0.45), 0 1px 4px rgba(43,127,232,0.3)`,
              }}>
              Get Early Access
            </motion.button>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all relative z-[999]"
            style={{ 
              background: isMobileMenuOpen ? PRIMARY : "white",
              border: isMobileMenuOpen ? "none" : "1px solid rgba(0,0,0,0.08)",
              color: isMobileMenuOpen ? "white" : PRIMARY,
              boxShadow: isMobileMenuOpen ? `0 4px 12px ${PRIMARY}50` : "0 2px 8px rgba(0,0,0,0.04)"
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-4 md:hidden"
            style={{ background: "#07111F", borderBottom: `1px solid ${NAV_BORDER}` }}
          >
            {/* Subtle blue glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-48 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(43,127,232,0.12) 0%, transparent 70%)" }} />

            <nav 
              className="relative flex flex-col flex-1 min-h-0 px-2 pb-10 overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
            >
              <div className="flex flex-col divide-y divide-white/5 border-t border-white/5 mt-4">
                {navLinks.map((link, i) => (
                  <motion.div key={link.name}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    {link.isDropdown ? (
                      <div className="flex flex-col py-2">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest pt-3 pb-1 px-2">{link.name}</span>
                        <div className="flex flex-col">
                          {link.subLinks?.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub.href)}
                              className="flex items-center justify-between py-3.5 px-2 group transition-colors"
                            >
                              <span className="text-lg font-bold text-[#EEF4FF] group-hover:text-blue-400 transition-colors pl-3 border-l-2 border-blue-500/0 group-hover:border-blue-500">
                                {sub.name}
                              </span>
                              <ChevronRight size={16} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href as string)}
                        className="flex items-center justify-between py-4 px-2 group transition-colors"
                      >
                        <span className="text-xl font-bold text-[#EEF4FF] group-hover:text-blue-400 transition-colors">
                          {link.name}
                        </span>
                        <ChevronRight size={18} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div className="mt-8 px-2"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <button
                  className="cursor-pointer text-white px-8 py-4 rounded-full text-base font-bold w-full relative z-[999]"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                    boxShadow: `0 6px 24px ${PRIMARY}40`,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Get Early Access
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
