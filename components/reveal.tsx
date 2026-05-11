"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Reveal({ children, className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            window.setTimeout(() => {
              e.target.classList.add("visible");
            }, (i % 5) * 70);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
