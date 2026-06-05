"use client";
import AnimatedButton from "@/components/AnimatedButton";
import { pushEvent } from "@/lib/gtm";

export default function ProcessCTA() {
  return (
    <a
      href="https://calendly.com/nahidr-awtomatig/30min?month=2026-01"
      target="_blank"
      onClick={() => {
        pushEvent({ event: "cta_click", cta_label: "Start Project" });
        pushEvent({ event: "book_call_click", destination: "calendly" });
      }}
    >
      <AnimatedButton name="Start Project" width="w-[220px]" icon={true} />
    </a>
  );
}
