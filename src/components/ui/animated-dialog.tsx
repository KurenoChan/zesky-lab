"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

/** Native top-layer dialog: focus containment, inert background, focus restoration. */
export function AnimatedDialog({ open, onDismiss, label, className, children, id }: {
  open: boolean; onDismiss: () => void; label: string; className: string; children: ReactNode; id?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      const context = gsap.context(() => {
        gsap.fromTo(dialog, { opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.97 }, { opacity: 1, y: 0, scale: 1, duration: reduced ? 0 : 0.25, ease: "power3.out" });
        if (!reduced) gsap.fromTo(dialog.querySelectorAll("[data-dialog-item]"), { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.2, ease: "power3.out" });
      }, dialog);
      return () => { context.revert(); document.body.style.overflow = previousOverflow; };
    }
    if (dialog.open) {
      const tween = gsap.to(dialog, { opacity: 0, y: reduced ? 0 : 14, duration: reduced ? 0 : 0.18, ease: "power2.out", onComplete: () => dialog.close() });
      return () => { tween.kill(); dialog.close(); };
    }
  }, [open]);

  return <dialog ref={ref} id={id} className={className} aria-label={label} onCancel={(event) => { event.preventDefault(); onDismiss(); }} onKeyDown={(event) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onDismiss();
  }}>{children}</dialog>;
}
