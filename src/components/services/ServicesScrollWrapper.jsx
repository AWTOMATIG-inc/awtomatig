"use client";
import { useEffect, useRef } from "react";

export default function ServicesScrollWrapper({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return <main ref={ref}>{children}</main>;
}
