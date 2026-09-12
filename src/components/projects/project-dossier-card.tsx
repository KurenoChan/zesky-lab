"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef, type MouseEvent } from "react";
import { useProjectTransition } from "@/components/motion/project-transition";
import { CaptureIllustration } from "@/components/projects/capture-illustration";
import type { GitHubRepository } from "@/lib/github";
import type { Project } from "@/types/portfolio";

const ownershipLabel = { personal: "Personal", professional: "Professional", collaborative: "Collaborative" } as const;

export function ProjectDossierCard({ project, index, repository }: { project: Project; index: number; repository: GitHubRepository | null }) {
  const openProject = useProjectTransition();
  const cardRef = useRef<HTMLElement>(null);
  const href = `/projects/${project.slug}`;


  function updateLight(event: MouseEvent<HTMLElement>) {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    cardRef.current?.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    cardRef.current?.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  function openDossier(event: MouseEvent<HTMLAnchorElement>) {
    openProject(event, { href, title: project.title });
  }

  return <>
    <article ref={cardRef} className="project-card dossier-card" onMouseMove={updateLight}>
      <div className={`project-visual visual-${index + 1}`} aria-hidden="true">
        <span className="visual-index">0{index + 1}</span><div className="visual-window"><span /><span /><span /></div>
        {project.slug === "dmit-frontend-web" ? <CaptureIllustration /> : <strong>{project.title}</strong>}
        <div className="terminal-peek"><span>$ open {project.slug}</span><i>Project link resolved</i><b>Enter project story <FiArrowUpRight aria-hidden="true" /></b></div>
      </div>
      <div className="project-info">
        <div className="project-meta"><span>{project.eyebrow}</span><span>{ownershipLabel[project.ownership]} ownership</span></div>
        <h3>{project.title}</h3><p>{project.summary}</p>
        <p className="project-role"><span>My contribution</span>{project.roleSummary ?? project.role}</p>
        {repository && <p className="repo-signal"><span>GitHub live</span>{repository.language ?? "Repository"} · updated {new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(repository.updatedAt))}</p>}
        <ul aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        <span className="project-open">Open case terminal <FiArrowUpRight aria-hidden="true" /></span>
      </div>
      <Link className="dossier-hit-area" data-cursor-label="Open" href={href} onClick={openDossier}><span className="sr-only">Open {project.title} case terminal</span></Link>
    </article>
  </>;
}
