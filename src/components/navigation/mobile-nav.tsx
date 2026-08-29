"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/types/portfolio";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previous; };
  }, [open]);

  return <div className="mobile-nav">
    <button className="menu-icon-button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><MenuIcon /></button>
    {open && <div className="mobile-menu-backdrop" onMouseDown={() => setOpen(false)}>
      <div className="mobile-menu-panel" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mobile-menu-header"><div><span className="dispatch-code">FIELD MENU</span><strong>Zesky Lab</strong></div><button ref={closeRef} className="menu-icon-button" aria-label="Close menu" onClick={() => setOpen(false)}><CloseIcon /></button></div>
        <p className="mobile-menu-brief">Choose a route through the field archive. Every destination remains directly accessible.</p>
        <nav aria-label="Mobile navigation">{items.map((item) => <Link key={item.href} href={`/${item.href}`} onClick={() => setOpen(false)}><span>{item.index}</span><strong>{item.label}</strong><small>Open file</small></Link>)}</nav>
        <div className="mobile-menu-footer"><span>Signal stable</span><i aria-hidden="true" /></div>
      </div>
    </div>}
  </div>;
}
