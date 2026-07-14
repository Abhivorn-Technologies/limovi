'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Coins } from 'lucide-react';
import { GoldBalanceCalculator } from './GoldBalanceCalculator';
import type { TimelineKey } from './TimelineSelector';

const SESSION_KEY = 'limovi_gc_minimized';

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

export function FloatingWidgetWrapper() {
  const [minimized, setMinimized] = useState(true);
  const [mounted, setMounted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

  // Shared state to remember inputs when minimized / maximized
  const [investment, setInvestment] = useState(1_00_000);
  const [timeline, setTimeline] = useState<TimelineKey>('3Y');
  const [customDate, setCustomDate] = useState('');

  useEffect(() => {
    // If they previously opened it in this session, we can restore it,
    // but the requirement "should not open directly untill open manually"
    // means it starts minimized by default. We respect sessionStorage if they already opened it.
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved !== null) {
      setMinimized(saved === 'true');
    } else {
      setMinimized(true);
    }
    setMounted(true);
  }, []);

  const minimize = () => {
    setMinimized(true);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  const open = () => {
    setMinimized(false);
    sessionStorage.setItem(SESSION_KEY, 'false');
  };

  if (!mounted) return null;

  return (
    <>
      {/* Drag-constraint viewport (invisible) */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9989]" aria-hidden />

      {/* ── FAB (minimized state) ─────────────────────────────────────── */}
      <AnimatePresence>
        {minimized && (
          <motion.button
            key="fab"
            drag={!isMobile}
            dragConstraints={!isMobile ? constraintsRef : undefined}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 24 }}
            onClick={open}
            className="fixed z-[9999] flex items-center justify-center cursor-pointer select-none"
            style={
              isMobile
                ? { bottom: 96, right: 20, width: 48, height: 48, borderRadius: '50%' }
                : { bottom: 96, right: 28, width: 52, height: 52, borderRadius: '50%' }
            }
            aria-label="Open Gold Balance Calculator"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Coin gradient */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 30deg,#B8860B 0deg,#D4AF37 60deg,#F5C542 100deg,#D4AF37 160deg,#B8860B 220deg,#D4AF37 280deg,#F5C542 320deg,#B8860B 360deg)',
                boxShadow: '0 8px 32px rgba(212,175,55,0.65), 0 0 0 3px rgba(212,175,55,0.2), 0 0 0 6px rgba(212,175,55,0.08)',
              }}
            />
            {/* Pulse rings */}
            {[0, 0.6, 1.2].map((delay, i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full"
                style={{ border: `2px solid rgba(212,175,55,${0.5 - i * 0.12})` }}
                animate={{ scale: [1, 1.5, 1.9], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay }}
              />
            ))}
            <Coins size={22} color="#3D2800" style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── CALCULATOR CARD ───────────────────────────────────────────── */}
      <AnimatePresence>
        {!minimized && (
          <>
            {/* Mobile: bottom sheet with backdrop */}
            {isMobile && (
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9990]"
                style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(3px)' }}
                onClick={minimize}
              />
            )}

            <motion.div
              key="calculator"
              drag={!isMobile}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={!isMobile ? constraintsRef : undefined}
              dragElastic={0.04}
              dragMomentum={false}
              // Desktop: scale+fade from bottom-right
              // Mobile: slide up from bottom
              initial={
                isMobile
                  ? { y: '100%', opacity: 0 }
                  : { scale: 0.88, opacity: 0, y: 30 }
              }
              animate={
                isMobile
                  ? { y: 0, opacity: 1 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              exit={
                isMobile
                  ? { y: '100%', opacity: 0 }
                  : { scale: 0.9, opacity: 0, y: 16 }
              }
              transition={{ type: 'spring', stiffness: 310, damping: 30 }}
              role="dialog"
              aria-label="LIMOVI Gold Balance Calculator"
              aria-modal="false"
              style={
                isMobile
                  ? {
                      // Bottom sheet
                      position: 'fixed',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 9999,
                      maxHeight: '92dvh',
                      borderRadius: '24px 24px 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255,255,255,0.97)',
                      backdropFilter: 'blur(30px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                      boxShadow: '0 -16px 60px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.8)',
                      overflow: 'hidden',
                    }
                  : {
                      // Desktop card — 450–500px wide
                      position: 'fixed',
                      bottom: 28,
                      right: 28,
                      zIndex: 9999,
                      width: 'clamp(380px, 30vw, 500px)',
                      maxHeight: 'calc(100dvh - 56px)',
                      borderRadius: 22,
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255,255,255,0.97)',
                      backdropFilter: 'blur(28px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                      boxShadow: '0 32px 80px rgba(0,0,0,0.17), 0 8px 32px rgba(11,98,214,0.1), 0 0 0 1px rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,255,255,0.75)',
                      overflow: 'hidden',
                    }
              }
            >
              {/* Top drag handle */}
              <div
                className="flex-shrink-0 flex items-center justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                  if (!isMobile) dragControls.start(e);
                }}
                style={{ touchAction: 'none' }}
              >
                <div className="w-8 h-1 rounded-full" style={{ background: 'rgba(0,0,0,0.1)' }} />
              </div>

              <GoldBalanceCalculator
                investment={investment}
                setInvestment={setInvestment}
                timeline={timeline}
                setTimeline={setTimeline}
                customDate={customDate}
                setCustomDate={setCustomDate}
                onMinimize={minimize}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
