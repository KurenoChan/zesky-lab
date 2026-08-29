"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { NavItem } from "@/types/portfolio";

export function LabField({ items }: { items: NavItem[] }) {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    void import("gsap").then(({ gsap }) => {
      const context = gsap.context(() => {
        gsap.from(fieldRef.current, { y: 16, scale: 0.99, duration: 0.8, ease: "power3.out" });
      }, fieldRef);
      cleanup = () => context.revert();
    });
    return () => cleanup();
  }, []);

  return (
    <div className="lab-field" ref={fieldRef} aria-label="Explore the lab">
      <div className="field-orbit orbit-one" aria-hidden="true" />
      <div className="field-orbit orbit-two" aria-hidden="true" />
      <div className="field-core" data-node>
        <span className="pulse" aria-hidden="true" />
        <strong>ZL</strong><small>Core online</small>
      </div>
      {items.map((item, index) => (
        <Link className={`field-node node-${index + 1}`} data-node href={item.href} key={item.href}>
          <span>{item.index}</span><strong>{item.label}</strong><small>Open module ↗</small>
        </Link>
      ))}
    </div>
  );
}
