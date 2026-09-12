"use client";

import { useCallback, useEffect, useState } from "react";
import { FiAperture, FiArrowUpRight } from "react-icons/fi";
import { AnimatedDialog } from "@/components/ui/animated-dialog";

export function LabIntro() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => {
    try { sessionStorage.setItem("zesky-lab-intro", "seen"); } catch { /* Storage may be disabled. */ }
    setOpen(false);
  }, []);
  useEffect(() => {
    if (location.pathname !== "/" || location.hash || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { if (sessionStorage.getItem("zesky-lab-intro")) return; } catch { return; }
    const reveal = setTimeout(() => setOpen(true), 0);
    const finish = setTimeout(close, 1600);
    return () => { clearTimeout(reveal); clearTimeout(finish); };
  }, [close]);
  return <AnimatedDialog open={open} onDismiss={close} label="Welcome to Zesky Lab" className="lab-intro">
    <span className="eyebrow intro-top">A little curiosity goes a long way.</span>
    <div className="intro-identity"><span data-dialog-item>ZESKY</span><span data-dialog-item>LAB<span className="intro-star" aria-hidden="true"><FiAperture /></span></span></div>
    <div className="intro-bottom"><p>Software. Systems. Stories.</p><button className="text-link" onClick={close}>Skip intro <FiArrowUpRight aria-hidden="true" /></button></div>
  </AnimatedDialog>;
}
