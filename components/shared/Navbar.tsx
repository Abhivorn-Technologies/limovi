"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// LIMOVI official palette
const NAV_BG_SCROLLED  = "rgba(255,255,255,0.95)"; // white when scrolled
const NAV_BORDER       = "rgba(0,0,0,0.06)";       // very light border
const TEXT_DARK        = "rgba(0,0,0,0.7)";        // text when scrolled
const TEXT_LIGHT       = "rgba(200,215,240,0.8)";  // text when at top
const TEXT_HOVER_DARK  = "#005CB9";                // hover when scrolled
const TEXT_HOVER_LIGHT = "#5BABFF";                // hover when at top
const PRIMARY          = "#005CB9";
const SECONDARY        = "#2B7FE8";

const navLinks = [
  { name: "Ecosystem", href: "#"         },
  { name: "Loans",     href: "#loans"    },
  { name: "Wealth",    href: "#wealth"   },
  { name: "Platform",  href: "#platform" },
];

export function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentTextColor = isScrolled ? TEXT_DARK : TEXT_LIGHT;
  const currentHoverColor = isScrolled ? TEXT_HOVER_DARK : TEXT_HOVER_LIGHT;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          isScrolled ? "py-3 backdrop-blur-xl border-b shadow-sm" : "py-5 bg-transparent"
        }`}
        style={isScrolled
          ? { background: NAV_BG_SCROLLED, borderColor: NAV_BORDER }
          : {}}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="relative z-[999] flex items-center group">
            <div className="transition-opacity duration-300 group-hover:opacity-80">
              <Image
                src="/Limovi-cropped.png"
                alt="LIMOVI"
                width={1198}
                height={333}
                priority
                style={{ objectFit: "contain", height: "48px", width: "auto" }}
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8 relative z-[999]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold transition-colors duration-200 relative group"
                style={{ color: currentTextColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = currentHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = currentTextColor)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login"
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: currentTextColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = currentHoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentTextColor)}>
              Log In
            </Link>

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
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-black transition-colors"
                    style={{ color: "#EEF4FF" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = SECONDARY)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#EEF4FF")}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div className="mt-6 flex flex-col gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold"
                  style={{ color: TEXT_LIGHT }}>
                  Log In
                </Link>
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
