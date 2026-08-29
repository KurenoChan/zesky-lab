import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectNeighbors, getProjects } from "@/data/portfolio";

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
      <div className="case-visual shell" aria-hidden="true"><div className="case-console"><span>PROJECT / {project.slug.toUpperCase()}</span><strong>{project.title.slice(0, 2).toUpperCase()}</strong><span>STATUS / {project.status.toUpperCase()}</span></div></div>
      <article className="case-content shell">
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
      </article>
      <nav className="case-nav shell" aria-label="Project navigation">{previous && <Link href={`/projects/${previous.slug}`}><span>Previous</span>{previous.title}</Link>}{next && <Link href={`/projects/${next.slug}`}><span>Next</span>{next.title} →</Link>}</nav>
    </main>
  );
}
