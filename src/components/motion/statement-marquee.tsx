"use client";

import { useEffect, useRef } from "react";
import { FiAperture } from "react-icons/fi";

export function StatementMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="statement-band">
    <p className="sr-only">Curiosity. Craft. Continuity.</p>
    <div className="statement-track" aria-hidden="true">{[0, 1].map((copy) => <div className="statement-copy" key={copy}>Curiosity. <span>Craft.</span> Continuity. <i><FiAperture /></i></div>)}</div>
  </div>;
}
