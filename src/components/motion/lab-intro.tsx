"use client";

import { useEffect, useState } from "react";

const steps = ["Waking the interface", "Connecting the project library", "Welcome to Zesky Lab"];

export function LabIntro() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.sessionStorage.getItem("zesky-lab-intro") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reveal = window.setTimeout(() => setVisible(true), 0);
    const advance = window.setInterval(() => setStep((current) => Math.min(current + 1, steps.length - 1)), 620);
    const finish = window.setTimeout(() => close(), 2600);
    return () => { window.clearTimeout(reveal); window.clearInterval(advance); window.clearTimeout(finish); };
  }, []);

  function close() {
    window.sessionStorage.setItem("zesky-lab-intro", "seen");
    setExiting(true);
    window.setTimeout(() => setVisible(false), 520);
  }

  if (!visible) return null;
  return <div className={`lab-intro${exiting ? " is-exiting" : ""}`} role="dialog" aria-modal="true" aria-label="Welcome to Zesky Lab">
    <div className="intro-orbit" aria-hidden="true"><i /><i /><span>Z</span></div>
    <div className="intro-copy"><span>INITIALIZING / ZL-01</span><h2>{steps[step]}</h2><div className="intro-progress"><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><p>{String(step + 1).padStart(2, "0")} / 03</p></div>
    <button type="button" onClick={close}>Skip intro <span aria-hidden="true">↗</span></button>
  </div>;
}
