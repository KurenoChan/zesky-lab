"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useState } from "react";
import type { NavItem } from "@/types/portfolio";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { AnimatedDialog } from "@/components/ui/animated-dialog";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  return <div className="mobile-nav">
    <button className="menu-icon-button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><MenuIcon /></button>
    <AnimatedDialog open={open} onDismiss={() => setOpen(false)} label="Site navigation" className="mobile-menu-panel" id="mobile-menu">
      <div className="mobile-menu-header"><div><span className="eyebrow">Find your next chapter</span><strong>Zesky Lab</strong></div><button className="menu-icon-button" aria-label="Close menu" onClick={() => setOpen(false)}><CloseIcon /></button></div>
      <nav aria-label="Mobile navigation">{items.map((item) => <Link data-dialog-item key={item.href} href={`/${item.href}`} onClick={() => setOpen(false)}><span>{item.index}</span><strong>{item.label}</strong><FiArrowUpRight aria-hidden="true" /></Link>)}</nav>
      <p className="mobile-menu-footer">Your curiosity. Your route.</p>
    </AnimatedDialog>
  </div>;
}
