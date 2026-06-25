"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
            className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors relative z-[999]"
            style={{ color: currentHoverColor }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="fixed inset-0 z-40 pt-24 px-8 md:hidden"
            style={{ background: "#07111F", borderBottom: `1px solid ${NAV_BORDER}` }}
          >
            {/* Subtle blue glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-48 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(43,127,232,0.12) 0%, transparent 70%)" }} />

            <nav className="relative flex flex-col gap-5 text-center">
              {navLinks.map((link, i) => (
                <motion.div key={link.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href as string)}
                    className="text-2xl font-black transition-colors cursor-pointer block"
                    style={{ color: "#EEF4FF" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = SECONDARY)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#EEF4FF")}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              <motion.div className="mt-6 flex flex-col gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>

                <button
                  className="cursor-pointer text-white px-8 py-4 rounded-full text-lg font-bold w-full relative z-[999]"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                    boxShadow: `0 6px 24px rgba(0,92,185,0.4)`,
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
