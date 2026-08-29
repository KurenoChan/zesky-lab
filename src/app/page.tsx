import { LabField } from "@/components/lab-field";
import { ProjectDossierCard } from "@/components/projects/project-dossier-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ActionLink } from "@/components/ui/action-link";
import { experience, experiments, getFeaturedProjects, navigation, profile, skillGroups } from "@/data/portfolio";
import { getProjectRepositories } from "@/lib/github";

export default async function Home() {
  const featuredProjects = getFeaturedProjects();
  const repositories = await getProjectRepositories(featuredProjects);
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner shell">
          <div className="hero-status"><span className="status-dot" /> Lab session active <span>KL / MY · Night mode</span></div>
          <div className="hero-copy">
            <p className="eyebrow">Zesky Lab · Software engineering atelier</p>
            <h1 id="hero-title">Ideas become<br /><em>living systems.</em></h1>
            <p className="hero-lede">I design and build software where clear architecture meets memorable interaction—then document the choices that made it work.</p>
            <div className="hero-actions"><ActionLink href="#work">Explore selected work</ActionLink><ActionLink href="#lab-index" variant="secondary">Choose a route</ActionLink></div>
          </div>
          <div className="hero-scene-note"><span>Lab window / 01</span><p>Every project begins as a faint signal. Open one to see the decisions behind the finished interface.</p></div>
        </div>
      </section>

      <section className="field-briefing shell" aria-labelledby="briefing-title"><div className="briefing-stamp" aria-hidden="true"><span>ZL</span><small>LAB NOTE</small></div><div><p className="eyebrow">The idea</p><h2 id="briefing-title">Make complex things feel clear.</h2></div><p>This is a living record of projects, experiments, and growing engineering ownership—from first sketch to working system.</p><div className="briefing-coordinates"><span>Architecture</span><span>Interfaces</span><span>Delivery</span></div></section>

      <section className="index-section shell" id="lab-index" aria-labelledby="index-title">
        <SectionHeading index="00" eyebrow="Lab constellation" title="Choose your own route." copy="Move through the story in any order, or use the navigation for a direct path. Exploration is optional; clarity is not." />
        <h2 className="sr-only" id="index-title">Explore the lab</h2>
        <LabField items={navigation} />
      </section>

      <section className="work-section shell" id="work">
        <SectionHeading index="01" eyebrow="Project library" title="Work with a reason to exist." copy="Each project opens like a living case file: the problem, the architecture, the trade-offs, and what changed along the way." />
        <div className="project-list">
          {featuredProjects.map((project, index) => <ProjectDossierCard key={project.slug} project={project} index={index} repository={repositories[project.slug]} />)}
        </div>
      </section>

      <section className="about-section shell" id="about">
        <SectionHeading index="02" eyebrow="About Zesky" title="Curious by default. Intentional in practice." />
        <div className="about-grid"><p className="about-lead">I&apos;m Zesky—a software engineer interested in the space where <em>clear systems</em> meet <em>memorable experiences.</em></p><div><p>This lab documents more than finished screens. It follows the reasoning, experiments, constraints, and changes that shape the work.</p><p>The aim is growing ownership: understand the architecture, trace the data, question trade-offs, and keep refining what ships.</p><div className="principle"><span>Working principle</span><strong>Concept → Build → Review → Learn → Refine</strong></div></div></div>
      </section>

      <section className="experience-section shell" id="experience">
        <SectionHeading index="03" eyebrow="Development journey" title="Progress measured in ownership." copy="A record of increasing responsibility: from making features work to understanding why the whole system holds together." />
        <div className="timeline">{experience.map((item) => <article key={item.title}><span>{item.period}</span><div><h3>{item.title}</h3>{item.organization && <small>{item.organization}</small>}<p>{item.summary}</p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>)}</div>
      </section>

      <section className="skills-section shell" id="skills">
        <SectionHeading index="04" eyebrow="Engineering toolkit" title="Capabilities proven in context." copy="Tools matter when they solve real constraints. These are the disciplines carried into each build." />
        <div className="skill-grid">{skillGroups.map((group, index) => <article key={group.label}><span>0{index + 1}</span><h3>{group.label}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
      </section>

      <section className="experiments-section shell" id="experiments">
        <SectionHeading index="05" eyebrow="Unclassified experiments" title="The lab stays in motion." />
        <div className="experiment-list">{experiments.map((experiment) => <article key={experiment.title}><span>{experiment.status}</span><h3>{experiment.title}</h3><p>{experiment.summary}</p></article>)}</div>
      </section>

      <section className="kisora-section shell" aria-labelledby="kisora-title"><div className="kisora-glow" aria-hidden="true" /><p className="eyebrow">A connected world of its own</p><h2 id="kisora-title">Kisora Studio</h2><p>A separate collaborative direction for games, AI initiatives, and community-built products. It belongs to a team story, so shared work will always distinguish individual contribution from collective ownership.</p><span className="coming-soon">Separate studio experience · Coming later</span></section>

      <section className="contact-section shell" id="contact"><div><p className="eyebrow">06 · Say hello</p><h2>Have an idea<br />worth building?</h2></div><div className="contact-copy"><p>{profile.availability}. Bring the difficult part, the unclear brief, or the system that needs a calmer way through.</p><div className="contact-links">{profile.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</div></div></section>
      <footer className="site-footer shell"><span>ZESKY LAB © {new Date().getFullYear()}</span><span>Built with intent. Evolving in public.</span><a href="#main">Back to top ↑</a></footer>
    </main>
  );
}
