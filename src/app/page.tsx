import Link from "next/link";
import { LabField } from "@/components/lab-field";
import { SectionHeading } from "@/components/section-heading";
import { experience, experiments, getFeaturedProjects, navigation, profile, skillGroups } from "@/data/portfolio";

const ownershipLabel = { personal: "Personal", professional: "Professional", collaborative: "Collaborative" } as const;

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  return (
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-status"><span className="status-dot" /> Lab system online <span>KL / MY</span></div>
        <div className="hero-copy">
          <p className="eyebrow">Software engineer · Product-minded builder</p>
          <h1 id="hero-title">Ideas into<br /><em>working systems.</em></h1>
          <p className="hero-lede">{profile.introduction}</p>
          <div className="hero-actions"><Link className="button primary" href="#work">Explore selected work <span>↓</span></Link><Link className="button ghost" href="#lab-index">Open lab index <span>↗</span></Link></div>
        </div>
        <div className="hero-code" aria-hidden="true"><span>01</span><span>ARCHITECTURE</span><span>INTERACTION</span><span>DELIVERY</span></div>
        <div className="scroll-cue" aria-hidden="true"><span /> Scroll to investigate</div>
      </section>

      <section className="index-section shell" id="lab-index" aria-labelledby="index-title">
        <SectionHeading index="00" eyebrow="Lab index" title="Choose your own route." copy="A portfolio should invite curiosity—not demand a tutorial. Enter anywhere, or use the familiar navigation above." />
        <h2 className="sr-only" id="index-title">Explore the lab</h2>
        <LabField items={navigation} />
      </section>

      <section className="work-section shell" id="work">
        <SectionHeading index="01" eyebrow="Selected work" title="Built to be understood." copy="Not just what shipped—the context, architecture, trade-offs, and lessons behind it." />
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
        <SectionHeading index="02" eyebrow="About the practice" title="Curious by default. Deliberate by design." />
        <div className="about-grid"><p className="about-lead">I&apos;m Zesky—a software engineer interested in the space where <em>clear systems</em> meet <em>memorable experiences.</em></p><div><p>This lab documents more than finished screens. It follows the reasoning, experiments, constraints, and changes that shape the work.</p><p>The aim is growing ownership: understand the architecture, trace the data, question trade-offs, and keep refining what ships.</p><div className="principle"><span>Working principle</span><strong>Concept → Build → Review → Learn → Refine</strong></div></div></div>
      </section>

      <section className="experience-section shell" id="experience">
        <SectionHeading index="03" eyebrow="Experience" title="Progress measured in ownership." copy="Verified professional details will be added as they are approved. This timeline reflects the current engineering practice without inventing credentials." />
        <div className="timeline">{experience.map((item) => <article key={item.title}><span>{item.period}</span><div><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>)}</div>
      </section>

      <section className="skills-section shell" id="skills">
        <SectionHeading index="04" eyebrow="Engineering areas" title="Capabilities, not percentages." copy="A working set of tools and practices—best demonstrated through decisions and shipped systems." />
        <div className="skill-grid">{skillGroups.map((group, index) => <article key={group.label}><span>0{index + 1}</span><h3>{group.label}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
      </section>

      <section className="experiments-section shell" id="experiments">
        <SectionHeading index="05" eyebrow="Experiments" title="The lab stays in motion." />
        <div className="experiment-list">{experiments.map((experiment) => <article key={experiment.title}><span>{experiment.status}</span><h3>{experiment.title}</h3><p>{experiment.summary}</p></article>)}</div>
      </section>

      <section className="kisora-section shell" aria-labelledby="kisora-title"><div className="kisora-glow" aria-hidden="true" /><p className="eyebrow">Beyond the personal lab</p><h2 id="kisora-title">Kisora Studio</h2><p>A separate collaborative direction for games, AI initiatives, and community-built products. Shared work will always distinguish individual contribution from team ownership.</p><span className="coming-soon">Studio transmission pending</span></section>

      <section className="contact-section shell" id="contact"><div><p className="eyebrow">06 · Contact</p><h2>Have a system<br />worth building?</h2></div><div className="contact-copy"><p>{profile.availability}. Verified contact channels will appear here before public launch.</p><span className="contact-status"><i /> Channel configuration in progress</span></div></section>
      <footer className="site-footer shell"><span>ZESKY LAB © {new Date().getFullYear()}</span><span>Built with intent. Evolving in public.</span><Link href="#main">Back to top ↑</Link></footer>
    </main>
  );
}
