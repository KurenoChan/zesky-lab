"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Enhances server HTML; content remains visible without animation. */
export function ScrollExperience() {
  useEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    let hashFrame = 0;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero-line", { yPercent: 22, opacity: 0, stagger: 0.12, duration: 1.1, ease: "power3.out" });
        gsap.utils.toArray<HTMLElement>(".section-heading").forEach((heading) => {
          gsap.from(heading.children, {
            y: 18, opacity: 0, stagger: 0.05, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 92%", once: true },
          });
        });
        gsap.from(".portrait-frame", { clipPath: "inset(0 0 14% 0 round 1.4rem)", y: 20, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".portrait-frame", start: "top 88%", once: true } });
      }, "#main");
      return () => context.revert();
    });
    media.add("(min-width: 1024px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.to(".hero-backdrop", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".hero-copy", { y: -65, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 } });

        const scene = document.querySelector<HTMLElement>(".project-story");
        const rail = scene?.querySelector<HTMLElement>(".story-rail");
        if (!scene || !rail) return;
        scene.dataset.enhanced = "true";
        const distance = () => Math.max(0, rail.scrollWidth - scene.clientWidth);
        const tween = gsap.to(rail, {
          x: () => -distance(), ease: "none",
          scrollTrigger: {
            trigger: scene, start: "top top", end: () => `+=${distance()}`, pin: true,
            scrub: 0.65, invalidateOnRefresh: true,
            onUpdate: (self) => scene.style.setProperty("--story-progress", String(self.progress)),
          },
        });
        const onFocus = (event: FocusEvent) => {
          const panel = (event.target as HTMLElement).closest<HTMLElement>(".story-chapter");
          const trigger = tween.scrollTrigger;
          if (!panel || !trigger) return;
          const bounds = panel.getBoundingClientRect();
          if (bounds.left < -1 || bounds.right > window.innerWidth + 1) {
            window.scrollTo({ top: trigger.start + panel.offsetLeft, behavior: "instant" });
            ScrollTrigger.update();
            tween.progress(Math.min(1, panel.offsetLeft / distance()));
          }
        };
        scene.addEventListener("focusin", onFocus);
        return () => { scene.removeEventListener("focusin", onFocus); delete scene.dataset.enhanced; scene.style.removeProperty("--story-progress"); };
      }, "#main");
      return () => context.revert();
    });
    void document.fonts.ready.then(() => {
      if (disposed) return;
      ScrollTrigger.refresh();
      // A streamed Server Component may arrive after the browser's initial hash jump.
      hashFrame = requestAnimationFrame(() => {
        if (disposed || !location.hash) return;
        let id: string;
        try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
        const destination = document.getElementById(id);
        if (destination) {
          window.scrollTo({ top: destination.getBoundingClientRect().top + scrollY - 32, behavior: "instant" });
          ScrollTrigger.update();
        }
      });
    });
    return () => { disposed = true; cancelAnimationFrame(hashFrame); media.revert(); };
  }, []);
  return null;
}
