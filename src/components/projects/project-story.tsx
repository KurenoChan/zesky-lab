import Link from "next/link";
import type { Project } from "@/types/portfolio";

export function ProjectStory({ project }: { project: Project }) {
  const phases = project.caseStudy.journey;
  if (!phases?.length) return null;
  return <section className="project-story" aria-labelledby="story-title">
    <div className="story-topline shell"><p className="eyebrow" id="story-title">Behind the build / DMIT</p><a href="#after-story" className="story-skip">Continue to the lab ↓</a></div>
    <div className="story-rail">
      {phases.map((phase, index) => <article className="story-chapter" key={phase.title}>
        <div className="chapter-inner shell">
          <div className="chapter-art" aria-hidden="true"><span className="chapter-number">0{index + 1}</span><div className="chapter-orbit" /><span className="chapter-caption">{index === 0 ? "A question becomes a system." : "A system meets the real world."}</span></div>
          <div className="chapter-copy"><p className="eyebrow">{phase.period}</p><h2>{phase.title}</h2><p>{phase.description}</p><span className="chapter-footnote">{index === 0 ? "ZKTeco ZK9500 · Browser → bridge → device" : "OS300 · Scanner-specific adapters, shared workflow"}</span></div>
        </div>
      </article>)}
      <article className="story-chapter chapter-outcome"><div className="chapter-inner shell">
        <div className="chapter-art" aria-hidden="true"><span className="chapter-number">03</span><div className="chapter-orbit" /><span className="chapter-caption">The interesting part is the in-between.</span></div>
        <div className="chapter-copy"><p className="eyebrow">The engineering lesson</p><h2>Recovery is part<br />of the design.</h2><p>{project.caseStudy.lessons[0]}</p><p className="chapter-caveat">{project.caseStudy.tradeoffs[1]}</p><Link className="text-link" href={`/projects/${project.slug}`}>Read the decisions and trade-offs <span aria-hidden="true">↗</span></Link></div>
      </div></article>
    </div>
    <div className="story-bottom shell" aria-hidden="true"><span>FYP foundation</span><div className="story-progress"><i /></div><span>Industry integration</span></div>
  </section>;
}
