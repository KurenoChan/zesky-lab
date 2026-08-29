export type Ownership = "personal" | "collaborative" | "professional";
export type ProjectStatus = "completed" | "active" | "experimental";

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  role: string;
  ownership: Ownership;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  githubRepository?: { owner: string; name: string };
  media?: { src: string; alt: string; caption: string }[];
  links: { repository?: string; deployment?: string; organization?: string };
  caseStudy: {
    journey?: { period: string; title: string; description: string }[];
    context: string;
    objective: string;
    architecture: string[];
    implementation: string[];
    challenges: string[];
    decisions: string[];
    tradeoffs: string[];
    results: string[];
    lessons: string[];
  };
};

export type Experience = {
  period: string;
  title: string;
  organization?: string;
  summary: string;
  highlights: string[];
};

export type SkillGroup = { label: string; skills: string[] };
export type Experiment = { title: string; summary: string; status: string };
export type Credential = { title: string; issuer: string; detail: string };
export type NavItem = { label: string; href: string; index: string };
