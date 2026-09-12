"use client";

import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import type { ProjectScreenshot } from "@/types/portfolio";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { CloseIcon } from "@/components/ui/icons";

export function ProjectGallery({ screenshots, title }: { screenshots: ProjectScreenshot[]; title: string }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  if (!screenshots.length) return null;
  const slide = screenshots[active];
  const move = (offset: number) => setActive((index) => (index + offset + screenshots.length) % screenshots.length);
  return <section className="project-gallery shell" aria-label={`${title} screenshots`}>
    <div className="gallery-heading"><p className="eyebrow">Inside the interface</p><span>Project archive / {screenshots.length} screens</span></div>
    <div className="gallery-stage" role="group" aria-label="Screenshot viewer" tabIndex={0} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
      <Image key={slide.src} src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} sizes="(min-width: 1024px) 70vw, 95vw" />
      <button type="button" className="gallery-expand icon-button" aria-label="Enlarge screenshot" onClick={() => setExpanded(true)}><FiMaximize2 aria-hidden="true" /></button>
    </div>
    <div className="gallery-caption"><div aria-live="polite" aria-atomic="true"><strong>{slide.caption}</strong><span>{slide.source} · Historical prototype, not a live capture</span></div><div className="gallery-controls"><button type="button" className="icon-button" aria-label="Previous screenshot" onClick={() => move(-1)}><FiChevronLeft aria-hidden="true" /></button><span>{active + 1} / {screenshots.length}</span><button type="button" className="icon-button" aria-label="Next screenshot" onClick={() => move(1)}><FiChevronRight aria-hidden="true" /></button></div></div>
    <div className="gallery-thumbnails" aria-label="Choose a screenshot">{screenshots.map((item, index) => <button type="button" key={item.src} aria-pressed={index === active} aria-label={`Show ${item.caption}`} onClick={() => setActive(index)}><Image src={item.src} alt="" width={240} height={114} sizes="(min-width: 1024px) 17vw, 24vw" /><span>{item.caption}</span></button>)}</div>
    <AnimatedDialog open={expanded} onDismiss={() => setExpanded(false)} label={slide.caption} className="gallery-dialog"><button type="button" className="icon-button" aria-label="Close enlarged screenshot" onClick={() => setExpanded(false)}><CloseIcon /></button><Image src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} sizes="95vw" /><p>{slide.caption} · {slide.source}</p></AnimatedDialog>
  </section>;
}
