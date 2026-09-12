"use client";

import { useEffect, useRef, useState } from "react";

export function StatementMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="statement-band" data-paused={paused}>
    <p className="sr-only">Curiosity. Craft. Continuity.</p>
    <div className="statement-track" aria-hidden="true">{[0, 1].map((copy) => <div className="statement-copy" key={copy}>Curiosity. <span>Craft.</span> Continuity. <i>✳</i></div>)}</div>
    <div className="marquee-controls shell"><button type="button" aria-label={paused ? "Resume moving text" : "Pause moving text"} aria-pressed={paused} onClick={() => setPaused(!paused)}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Resume" : "Pause"}</button></div>
  </div>;
}
