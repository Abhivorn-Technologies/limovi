"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, User, LogOut, Shield } from "lucide-react";


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
    name: "Jewellery Cloud", 
    href: "#jewellery-experience",
    isDropdown: true,
    subLinks: [
      { name: "Luxury Jewellery", href: "#heritage-collection" },
      { name: "Lifestyle Jewellery", href: "#minimalist-elegance" }
    ]
  },
  { 
    name: "Loans & Liquidity", 
    href: "#loans",
    isDropdown: true,
    subLinks: [
      { name: "Instant Loans", href: "#loans" },
      { name: "Instant Liquidity", href: "#liquidity" }
    ]
  },
  { name: "Wealth Generation", href: "#wealth" },
  { name: "Gift Gold Ecosystem", href: "#gift-gold" },
  { name: "Platform", href: "#platform" },
];

export function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);
  const [activeLink,       setActiveLink]       = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("user-state-changed", fetchUser);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("user-state-changed", fetchUser);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setIsProfileMenuOpen(false);
    window.location.reload();
  };


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

  const handleNavClickWithActive = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    setActiveLink(name);
    handleNavClick(e, href);
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
                src="/Limovi-1.png"
                alt="LIMOVI"
                width={871}
                height={237}
                priority
                style={{ objectFit: "contain", width: "135px", height: "auto" }}
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-8 relative z-[999] h-full">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => link.isDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.isDropdown && setActiveDropdown(null)}
              >
                {link.isDropdown ? (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href) handleNavClickWithActive(e, link.href, link.name);
                    }}
                    className="text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-1"
                    style={{ color: activeLink === link.name ? PRIMARY : currentTextColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = currentHoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = activeLink === link.name ? PRIMARY : currentTextColor)}
                  >
                    {link.name}
                    <svg className="w-3 h-3 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </a>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClickWithActive(e, link.href as string, link.name)}
                    className="text-sm font-semibold transition-colors duration-200 relative group cursor-pointer"
                    style={{ color: activeLink === link.name ? PRIMARY : currentTextColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = currentHoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = activeLink === link.name ? PRIMARY : currentTextColor)}
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

          {/* ── Desktop Actions & User Profile ── */}
          <div className="hidden xl:flex items-center gap-4 relative">
            {/* User Profile Icon / Button */}
            <div className="relative">
              <button
                onClick={() => {
                  if (user) {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                  } else {
                    const webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL;
                    window.location.href = `${webappUrl}/login`;
                  }


                }}
                className="flex items-center gap-2 p-2 rounded-full border border-slate-200 hover:border-[#005CB9] bg-white text-slate-700 hover:text-[#005CB9] transition-all cursor-pointer shadow-sm hover:shadow-md"
                title={user ? user.fullName : "Create Account / Login"}
              >
                <div className="w-8 h-8 rounded-full bg-[#005CB9] text-white flex items-center justify-center font-bold text-sm">
                  {user ? user.fullName.charAt(0).toUpperCase() : <User size={18} />}
                </div>
                {user && (
                  <span className="text-xs font-bold max-w-[100px] truncate pr-1">
                    {user.fullName.split(" ")[0]}
                  </span>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-12 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-[1000]"
                  >
                    <div className="pb-3 mb-3 border-b border-slate-100">
                      <p className="font-bold text-slate-900 text-sm">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{user.phoneNumber}</p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#005CB9] hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <Shield size={16} className="text-[#005CB9]" />
                        <span>Admin Panel</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-left"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-early-access-modal"));
              }}
              className="cursor-pointer px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all relative z-[999] whitespace-nowrap"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                boxShadow: `0 4px 18px rgba(0,92,185,0.45), 0 1px 4px rgba(43,127,232,0.3)`,
              }}>
              Get Early Access
            </motion.button>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all relative z-[999]"
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
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-4 xl:hidden"
            style={{ background: "#ffffff", borderBottom: `1px solid ${NAV_BORDER}` }}
          >
            <nav 
              className="relative flex flex-col flex-1 min-h-0 px-2 pb-10 overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
              data-lenis-prevent="true"
            >
              <div className="flex flex-col divide-y divide-slate-100 border-t border-slate-100 mt-4">
                {/* Mobile User Profile Section */}
                <div className="py-3 px-2">
                  {user ? (
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#005CB9] text-white flex items-center justify-center font-bold">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{user.fullName}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-3 py-1.5 bg-[#005CB9] text-white text-xs font-bold rounded-xl"
                      >
                        Admin
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        const webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL;
                        window.location.href = `${webappUrl}/login`;
                      }}


                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 text-[#005CB9] font-bold text-sm rounded-2xl border border-blue-100"
                    >
                      <User size={18} />
                      <span>Create Account / Login</span>
                    </button>
                  )}
                </div>

                {navLinks.map((link, i) => (
                  <motion.div key={link.name}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    {link.isDropdown ? (
                      <div className="flex flex-col py-2">
                        {link.href ? (
                          <a
                            href={link.href}
                            onClick={(e) => handleNavClickWithActive(e, link.href as string, link.name)}
                            className={`text-[10px] font-black uppercase tracking-widest pt-3 pb-1 px-2 block cursor-pointer ${activeLink === link.name ? 'text-brand-primary' : 'text-slate-400'}`}
                          >
                            {link.name}
                          </a>
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-3 pb-1 px-2">{link.name}</span>
                        )}
                        <div className="flex flex-col">
                          {link.subLinks?.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={(e) => handleNavClickWithActive(e, sub.href, sub.name)}
                              className="flex items-center justify-between py-3.5 px-2 group transition-colors"
                            >
                              <span className={`text-lg font-bold transition-colors pl-3 border-l-2 ${activeLink === sub.name ? 'text-brand-primary border-brand-primary' : 'text-slate-800 border-brand-primary/0 group-hover:text-brand-primary group-hover:border-brand-primary'}`}>
                                {sub.name}
                              </span>
                              <ChevronRight size={16} className="pointer-events-none text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClickWithActive(e, link.href as string, link.name)}
                        className="flex items-center justify-between py-4 px-2 group transition-colors"
                      >
                        <span className={`text-xl font-bold transition-colors ${activeLink === link.name ? 'text-brand-primary' : 'text-slate-800 group-hover:text-brand-primary'}`}>
                          {link.name}
                        </span>
                        <ChevronRight size={18} className="pointer-events-none text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
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
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-early-access-modal"));
                  }}>
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


