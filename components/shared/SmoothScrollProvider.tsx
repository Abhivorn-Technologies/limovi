"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
