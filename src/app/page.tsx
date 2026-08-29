import Link from "next/link";
import { LabField } from "@/components/lab-field";
import { SectionHeading } from "@/components/ui/section-heading";
import { ActionLink } from "@/components/ui/action-link";
import { experience, experiments, getFeaturedProjects, navigation, profile, skillGroups } from "@/data/portfolio";

const ownershipLabel = { personal: "Personal", professional: "Professional", collaborative: "Collaborative" } as const;

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner shell">
          <div className="hero-status"><span className="status-dot" /> Transmission 01 received <span>KL / MY · 05:42</span></div>
          <div className="hero-copy">
            <p className="eyebrow">Zesky Lab · Software engineering field archive</p>
            <h1 id="hero-title">Building<br /><em>through the storm.</em></h1>
            <p className="hero-lede">Ideas arrive incomplete. Systems break under pressure. This is a record of how I turn uncertainty into software that holds.</p>
            <div className="hero-actions"><ActionLink href="#work">Enter the field archive</ActionLink><ActionLink href="#lab-index" variant="secondary">Choose a route</ActionLink></div>
          </div>
          <div className="hero-scene-note"><span>Outpost / 01</span><p>The signal is quiet, but active. Every file ahead contains the decisions behind the finished interface.</p></div>
        </div>
      </section>

      <section className="field-briefing shell" aria-labelledby="briefing-title"><div className="briefing-stamp" aria-hidden="true"><span>ZL</span><small>FIELD LOG</small></div><div><p className="eyebrow">The mission</p><h2 id="briefing-title">Make complex things feel clear.</h2></div><p>Not a résumé in disguise. Not spectacle without substance. Follow the work from first signal to shipped system, and see what changed along the way.</p><div className="briefing-coordinates"><span>Architecture</span><span>Interfaces</span><span>Delivery</span></div></section>

      <section className="index-section shell" id="lab-index" aria-labelledby="index-title">
        <SectionHeading index="00" eyebrow="Operations map" title="Choose your route through the archive." copy="Follow the dispatch in order, or move directly to the evidence you care about. The map is optional; the information never is." />
        <h2 className="sr-only" id="index-title">Explore the lab</h2>
        <LabField items={navigation} />
      </section>

      <section className="work-section shell" id="work">
        <SectionHeading index="01" eyebrow="Recovered field files" title="Work with a reason to exist." copy="Each dossier records the pressure, the choices, and the engineering behind what eventually shipped." />
        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <article className="project-card" key={project.slug}>
              <div className={`project-visual visual-${index + 1}`} aria-hidden="true"><span className="visual-index">0{index + 1}</span><div className="visual-window"><span /><span /><span /></div><strong>{project.title.slice(0, 2).toUpperCase()}</strong></div>
              <div className="project-info"><div className="project-meta"><span>{project.eyebrow}</span><span>{ownershipLabel[project.ownership]} ownership</span></div><h3>{project.title}</h3><p>{project.summary}</p><ul aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul><Link href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section shell" id="about">
        <SectionHeading index="02" eyebrow="Operator profile" title="Curious by default. Steady under pressure." />
        <div className="about-grid"><p className="about-lead">I&apos;m Zesky—a software engineer interested in the space where <em>clear systems</em> meet <em>memorable experiences.</em></p><div><p>This lab documents more than finished screens. It follows the reasoning, experiments, constraints, and changes that shape the work.</p><p>The aim is growing ownership: understand the architecture, trace the data, question trade-offs, and keep refining what ships.</p><div className="principle"><span>Working principle</span><strong>Concept → Build → Review → Learn → Refine</strong></div></div></div>
      </section>

      <section className="experience-section shell" id="experience">
        <SectionHeading index="03" eyebrow="Campaign log" title="Progress measured in ownership." copy="A record of increasing responsibility: from making features work to understanding why the whole system holds together." />
        <div className="timeline">{experience.map((item) => <article key={item.title}><span>{item.period}</span><div><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>)}</div>
      </section>

      <section className="skills-section shell" id="skills">
        <SectionHeading index="04" eyebrow="Field equipment" title="Capabilities proven in context." copy="Tools matter when they help a system survive real constraints. These are the disciplines carried into each build." />
        <div className="skill-grid">{skillGroups.map((group, index) => <article key={group.label}><span>0{index + 1}</span><h3>{group.label}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
      </section>

      <section className="experiments-section shell" id="experiments">
        <SectionHeading index="05" eyebrow="Unclassified experiments" title="The lab stays in motion." />
        <div className="experiment-list">{experiments.map((experiment) => <article key={experiment.title}><span>{experiment.status}</span><h3>{experiment.title}</h3><p>{experiment.summary}</p></article>)}</div>
      </section>

      <section className="kisora-section shell" aria-labelledby="kisora-title"><div className="kisora-glow" aria-hidden="true" /><p className="eyebrow">A signal beyond this outpost</p><h2 id="kisora-title">Kisora Studio</h2><p>A separate collaborative direction for games, AI initiatives, and community-built products. It belongs to a team story, so shared work will always distinguish individual contribution from collective ownership.</p><span className="coming-soon">Distant transmission · Studio channel pending</span></section>

      <section className="contact-section shell" id="contact"><div><p className="eyebrow">06 · Open channel</p><h2>Have a system<br />worth building?</h2></div><div className="contact-copy"><p>{profile.availability}. Bring the difficult part, the unclear brief, or the system that needs a calmer way through.</p><span className="contact-status"><i /> Channel configuration in progress</span></div></section>
      <footer className="site-footer shell"><span>ZESKY LAB © {new Date().getFullYear()}</span><span>Built with intent. Evolving in public.</span><Link href="#main">Back to top ↑</Link></footer>
    </main>
  );
}
