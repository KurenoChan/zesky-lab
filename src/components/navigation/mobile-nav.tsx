"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavItem } from "@/types/portfolio";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    if (closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOpen(false); return; }
    setClosing(true);
    window.setTimeout(() => { setOpen(false); setClosing(false); }, 380);
  }, [closing]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previous; };
  }, [closeMenu, open]);

  return <div className="mobile-nav">
    <button className="menu-icon-button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><MenuIcon /></button>
    {open && <div className={`mobile-menu-backdrop${closing ? " is-closing" : ""}`} onMouseDown={closeMenu}>
      <div className="mobile-menu-panel" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mobile-menu-header"><div><span className="dispatch-code">LAB NAVIGATOR</span><strong>Zesky Lab</strong></div><button ref={closeRef} className="menu-icon-button" aria-label="Close menu" onClick={closeMenu}><CloseIcon /></button></div>
        <div className="nav-constellation" aria-hidden="true"><i /><i /><i /><span>Explore freely</span></div>
        <p className="mobile-menu-brief">Choose a signal and jump directly there. No fixed route, no hidden information.</p>
        <nav aria-label="Mobile navigation">{items.map((item) => <Link key={item.href} href={`/${item.href}`} onClick={closeMenu}><span>{item.index}</span><strong>{item.label}</strong><small>Open</small></Link>)}</nav>
        <div className="mobile-menu-footer"><span>Lab online</span><i aria-hidden="true" /></div>
      </div>
    </div>}
  </div>;
}
