"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const lenis = new Lenis({ duration: 0.95, smoothWheel: true, anchors: true });
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      const syncModal = () => document.querySelector("dialog[open]") ? lenis.stop() : lenis.start();
      const observer = new MutationObserver(syncModal);
      observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      syncModal();
      return () => { observer.disconnect(); gsap.ticker.remove(tick); lenis.destroy(); };
    });
    return () => media.revert();
  }, []);
  return null;
}
