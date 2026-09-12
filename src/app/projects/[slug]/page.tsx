import type { Metadata } from "next";import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectNeighbors, getProjects } from "@/data/portfolio";
import { CaptureIllustration } from "@/components/projects/capture-illustration";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getProjects().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary, alternates: { canonical: `/projects/${project.slug}` }, openGraph: { title: `${project.title} · Zesky Lab`, description: project.summary } };
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <section className="case-block"><h2>{title}</h2><div className="case-list">{items.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div></section>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { previous, next } = getProjectNeighbors(slug);
  const isComplete = project.caseStudy.architecture.length > 0;
  return (
    <main id="main" className="case-page">
      <header className="case-hero shell"><Link className="back-link" href="/#work">← Selected work</Link><p className="eyebrow">Case study · {project.status}</p><h1>{project.title}</h1><p className="case-summary">{project.summary}</p><div className="case-facts"><div><span>Role</span><strong>{project.role}</strong></div><div><span>Ownership</span><strong>{project.ownership}</strong></div><div><span>Stack</span><strong>{project.technologies.join(" · ")}</strong></div></div></header>
      <div className="case-visual shell" aria-hidden="true">{project.slug === "dmit-frontend-web" ? <CaptureIllustration /> : <div className="case-console"><span>PROJECT / {project.slug.toUpperCase()}</span><strong>{project.title.slice(0, 2).toUpperCase()}</strong><span>STATUS / {project.status.toUpperCase()}</span></div>}</div>
      {(project.links.deployment || project.links.repository || project.links.organization) && <div className="case-links shell">{project.links.deployment && <a href={project.links.deployment} target="_blank" rel="noreferrer">Launch live project <span aria-hidden="true">↗</span></a>}{project.links.organization && <a href={project.links.organization} target="_blank" rel="noreferrer">Visit Lunix Luminous <span aria-hidden="true">↗</span></a>}{project.links.repository && <a href={project.links.repository} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>}</div>}
      <article className="case-content shell">
        {project.caseStudy.journey && <section className="case-block case-journey"><h2>How I became involved</h2><div className="case-list">{project.caseStudy.journey.map((phase, index) => <article key={phase.title}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{phase.period}</small><h3>{phase.title}</h3><p>{phase.description}</p></div></article>)}</div></section>}
        <section className="case-intro"><div><p className="eyebrow">Context</p><h2>The starting point</h2></div><p>{project.caseStudy.context}</p></section>
        <section className="case-intro"><div><p className="eyebrow">Objective</p><h2>What success means</h2></div><p>{project.caseStudy.objective}</p></section>
        {!isComplete && <aside className="case-notice"><span>Documentation status</span><strong>This project story is being prepared.</strong><p>Only verified information is published. Full architectural and outcome details will follow after review.</p></aside>}
        <ListSection title="Architecture" items={project.caseStudy.architecture} />
        <ListSection title="Implementation" items={project.caseStudy.implementation} />
        <ListSection title="Challenges" items={project.caseStudy.challenges} />
        <ListSection title="Decisions" items={project.caseStudy.decisions} />
        <ListSection title="Trade-offs" items={project.caseStudy.tradeoffs} />
        <ListSection title="Results" items={project.caseStudy.results} />
        <ListSection title="Lessons learned" items={project.caseStudy.lessons} />
        {project.media?.map((item) => <figure className="case-media" key={item.src}><Image src={item.src} alt={item.alt} width={1400} height={350} sizes="(max-width: 800px) 100vw, 1180px" /><figcaption>{item.caption}</figcaption></figure>)}
      </article>
      <nav className="case-nav shell" aria-label="Project navigation">{previous && <Link href={`/projects/${previous.slug}`}><span>Previous</span>{previous.title}</Link>}{next && <Link href={`/projects/${next.slug}`}><span>Next</span>{next.title} →</Link>}</nav>
    </main>
  );
}
