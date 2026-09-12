"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

/** Progressive mouse-only enhancement. Never replaces touch, text-input or modal cursors. */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)", () => {
      const root = document.documentElement;
      cursor.dataset.enabled = "true";
      const x = gsap.quickTo(cursor, "x", { duration: 0.16, ease: "power3.out" });
      const y = gsap.quickTo(cursor, "y", { duration: 0.16, ease: "power3.out" });
      let active = false;
      let modalOpen = Boolean(document.querySelector("dialog[open]"));
      const hide = () => { active = false; delete root.dataset.cursorReady; delete cursor.dataset.visible; };
      const observer = new MutationObserver(() => {
        modalOpen = Boolean(document.querySelector("dialog[open]"));
        if (modalOpen) hide();
      });
      observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
      const move = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target : null;
        if (event.pointerType !== "mouse" || modalOpen || target?.closest('input, textarea, select, iframe, [contenteditable="true"], [data-native-cursor]')) { hide(); return; }
        if (!active) { gsap.set(cursor, { x: event.clientX, y: event.clientY }); active = true; }
        x(event.clientX); y(event.clientY);
        root.dataset.cursorReady = "true";
        cursor.dataset.visible = "true";
        const label = target?.closest<HTMLElement>("[data-cursor-label]")?.dataset.cursorLabel ?? "";
        cursor.dataset.interactive = String(Boolean(target?.closest("a, button, summary")));
        cursor.dataset.labeled = String(Boolean(label));
        const text = cursor.querySelector("span");
        if (text && text.textContent !== label) text.textContent = label;
      };
      const key = (event: KeyboardEvent) => { if (event.key === "Tab" || event.key === "Escape") hide(); };
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);
      window.addEventListener("keydown", key);
      return () => {
        hide(); delete cursor.dataset.enabled; observer.disconnect(); x.tween.kill(); y.tween.kill();
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide); window.removeEventListener("keydown", key);
      };
    });
    return () => media.revert();
  }, []);
  return <div ref={ref} className="custom-cursor" aria-hidden="true"><div className="cursor-ring"><span /><FiArrowUpRight className="cursor-arrow" /></div></div>;
}
