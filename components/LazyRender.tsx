"use client";

import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

export default function LazyRender({ children, minHeight = "100vh" }: { children: ReactNode, minHeight?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    // Start loading when the section is 400px away from viewport
    rootMargin: "400px 0px",
  });

  return (
    <div ref={ref} style={{ minHeight: inView ? "auto" : minHeight }}>
      {inView ? children : null}
    </div>
  );
}
