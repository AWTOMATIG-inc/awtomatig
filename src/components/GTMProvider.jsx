"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pushEvent } from "@/lib/gtm";

export default function GTMProvider() {
  const pathname = usePathname();
  const prevPath = useRef(null);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    pushEvent({ event: "page_view", page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const fired = new Set();

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          pushEvent({ event: "scroll_depth", scroll_threshold: t });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
