"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/types/portfolio";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button className="menu-trigger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
        Menu <span aria-hidden="true">↗</span>
      </button>
      {open && (
        <div className="menu-overlay" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="menu-topline">
            <span>ZESKY / LAB INDEX</span>
            <button ref={closeRef} className="menu-trigger" onClick={() => setOpen(false)}>Close ×</button>
          </div>
          <nav aria-label="Mobile navigation">
            {items.map((item) => (
              <Link key={item.href} href={`/${item.href}`} onClick={() => setOpen(false)}>
                <span>{item.index}</span>{item.label}<span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
