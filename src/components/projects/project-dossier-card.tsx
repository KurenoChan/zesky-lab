"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { GitHubRepository } from "@/lib/github";
import type { Project } from "@/types/portfolio";

const ownershipLabel = { personal: "Personal", professional: "Professional", collaborative: "Collaborative" } as const;

export function ProjectDossierCard({ project, index, repository }: { project: Project; index: number; repository: GitHubRepository | null }) {
  const router = useRouter();
  const cardRef = useRef<HTMLElement>(null);
  const [opening, setOpening] = useState(false);
  const href = `/projects/${project.slug}`;

  useEffect(() => {
    if (!opening) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => router.push(href), 720);
    return () => { window.clearTimeout(timer); document.body.style.overflow = previous; };
  }, [href, opening, router]);

  function updateLight(event: MouseEvent<HTMLElement>) {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    cardRef.current?.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    cardRef.current?.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  function openDossier(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (!opening) setOpening(true);
  }

  return <>
    <article ref={cardRef} className="project-card dossier-card" onMouseMove={updateLight}>
      <div className={`project-visual visual-${index + 1}`} aria-hidden="true">
        <span className="visual-index">0{index + 1}</span><div className="visual-window"><span /><span /><span /></div>
        <strong>{project.title.slice(0, 2).toUpperCase()}</strong>
        <div className="terminal-peek"><span>$ open {project.slug}</span><i>Project link resolved</i><b>Enter project story ↗</b></div>
      </div>
      <div className="project-info">
        <div className="project-meta"><span>{project.eyebrow}</span><span>{ownershipLabel[project.ownership]} ownership</span></div>
        <h3>{project.title}</h3><p>{project.summary}</p>
        {repository && <p className="repo-signal"><span>GitHub live</span>{repository.language ?? "Repository"} · updated {new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(repository.updatedAt))}</p>}
        <ul aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        <span className="project-open">Open case terminal <span aria-hidden="true">↗</span></span>
      </div>
      <Link className="dossier-hit-area" href={href} onClick={openDossier}><span className="sr-only">Open {project.title} case terminal</span></Link>
    </article>
    {opening && <div className="dossier-transition" role="status" aria-live="polite"><div className="transition-terminal"><span>ZESKY LAB / PROJECT TERMINAL</span><p>&gt; opening {project.slug}</p><p>&gt; resolving project story</p><p className="terminal-active">&gt; entering project space<span>_</span></p><div /></div></div>}
  </>;
}
