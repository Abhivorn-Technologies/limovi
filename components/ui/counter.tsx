"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  format?: "currency" | "number" | "compact";
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function Counter({
  value,
  direction = "up",
  format = "number",
  suffix = "",
  prefix = "",
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, direction, value]);

  const formatted = useTransform(springValue, (latest) => {
    let formattedNumber = "";
    if (format === "compact") {
      formattedNumber = Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(latest);
    } else {
      formattedNumber = Intl.NumberFormat("en-US").format(Math.round(latest));
    }
    return `${prefix}${formattedNumber}${suffix}`;
  });

  return <motion.span ref={ref}>{formatted}</motion.span>;
}
