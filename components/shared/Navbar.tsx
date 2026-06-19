"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";

const navLinks = [
  { name: "Ecosystem", href: "#" },
  { name: "Loans", href: "#loans" },
  { name: "Wealth", href: "#wealth" },
  { name: "Platform", href: "#platform" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-4 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="relative z-50">
            <div className="text-2xl font-black tracking-tighter flex items-center gap-1 text-brand-primary">
              LIMOVI
              <div className="w-2 h-2 rounded-full bg-brand-secondary" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-slate-600 hover:text-brand-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-brand-secondary transition-colors">
              Log In
            </Link>
            <button className="cursor-pointer bg-brand-primary text-white hover:bg-slate-800 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-brand-primary/20">
                Get Early Access
              </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-brand-primary hover:text-brand-secondary"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 flex flex-col gap-4">
                <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-slate-600"
                >
                  Log In
                </Link>
                <button className="cursor-pointer bg-brand-primary text-white px-8 py-4 rounded-full text-lg font-bold w-full shadow-lg">
                  Get Early Access
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
