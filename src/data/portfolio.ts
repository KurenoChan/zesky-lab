import type {
  Credential,
  Experience,
  Experiment,
  NavItem,
  Project,
  SkillGroup,
} from "@/types/portfolio";

export const profile = {
  publicName: "Zesky",
  productName: "Zesky Lab",
  role: "Software engineer building thoughtful digital systems.",
  introduction:
    "I turn ambitious ideas into clear, resilient software—connecting product thinking, interface craft, and engineering decisions.",
  availability: "Open to meaningful engineering conversations",
};

export const navigation: NavItem[] = [
  { label: "Work", href: "#work", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Experience", href: "#experience", index: "03" },
  { label: "Skills", href: "#skills", index: "04" },
  { label: "Experiments", href: "#experiments", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

export const projects: Project[] = [
  {
    slug: "zesky-lab",
    title: "Zesky Lab",
    eyebrow: "Personal portfolio · Active",
    summary:
      "A non-linear portfolio system designed to make technical work inviting, legible, and reusable across future experiences.",
    description:
      "Zesky Lab reframes a software engineering portfolio as an explorable interface without hiding the professional story behind spectacle.",
    role: "Product designer and software engineer",
    ownership: "personal",
    status: "active",
    featured: true,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    links: {},
    caseStudy: {
      context:
        "A conventional résumé page could list projects, but it would not communicate how Zesky thinks about systems, interactions, or long-term product evolution.",
      objective:
        "Create a credible 2D portfolio that reveals useful information immediately, rewards exploration, and establishes content that a future 3D LabGround can reuse.",
      architecture: [
        "Next.js App Router supplies addressable pages, metadata, and server-rendered professional content.",
        "Presentation-neutral TypeScript records keep projects and experience independent from their current visual treatment.",
        "Small client-side interaction islands sit inside a predominantly server-rendered application.",
      ],
      implementation: [
        "A persistent navigation system provides a familiar path through the portfolio.",
        "A responsive lab index exposes the same destinations as an exploratory two-dimensional field.",
        "Project records generate selected-work cards, metadata, and dedicated case-study routes.",
      ],
      challenges: [
        "Balancing a distinctive interface with recruiter-friendly access to information.",
        "Creating depth and motion without turning the first release into a WebGL project.",
        "Designing around partial personal content without publishing invented claims.",
      ],
      decisions: [
        "Keep semantic navigation available alongside every experimental interaction.",
        "Use Server Components for content and narrowly scoped Client Components for motion and menus.",
        "Make the content schema a product boundary rather than coupling copy to cards.",
      ],
      tradeoffs: [
        "The first release uses local typed content instead of a CMS, reducing operational complexity while preserving a migration seam.",
        "Targeted motion creates less spectacle than a fully animated site but improves performance and reduced-motion support.",
      ],
      results: [
        "A shippable portfolio foundation with direct navigation and non-linear exploration.",
        "A reusable project model ready to support additional case studies and a future LabGround presentation.",
      ],
      lessons: [
        "An experimental portfolio works best when exploration is an enhancement, not an access requirement.",
        "Honest, structured content is more valuable than visual polish built around unsupported claims.",
      ],
    },
  },
  {
    slug: "learning-portal",
    title: "Learning Portal",
    eyebrow: "Product engineering · In progress",
    summary:
      "An evolving learning environment focused on guided technical work, feedback, and maintainable educational experiences.",
    description:
      "A product-engineering exploration into making structured learning feel immediate and practical.",
    role: "Software engineering contributor",
    ownership: "professional",
    status: "active",
    featured: true,
    technologies: ["React", "TypeScript", "Product systems"],
    links: {},
    caseStudy: {
      context: "Detailed project information is being prepared for publication.",
      objective: "Present the verified engineering story once its scope and outcomes are approved.",
      architecture: [], implementation: [], challenges: [], decisions: [], tradeoffs: [], results: [], lessons: [],
    },
  },
  {
    slug: "kisora-studio",
    title: "Kisora Studio",
    eyebrow: "Collaborative studio · Future",
    summary:
      "A separate community and studio direction for collaborative games, AI initiatives, and shared products.",
    description:
      "Kisora is a shared destination, not another version of Zesky’s personal portfolio.",
    role: "Contributor; individual responsibilities to be documented per project",
    ownership: "collaborative",
    status: "experimental",
    featured: true,
    technologies: ["Games", "AI", "Community"],
    links: {},
    caseStudy: {
      context: "Kisora Studio is intentionally separated from the personal portfolio architecture.",
      objective: "Create a future home for work owned and built by multiple contributors.",
      architecture: [], implementation: [], challenges: [], decisions: [], tradeoffs: [], results: [], lessons: [],
    },
  },
];

export const experience: Experience[] = [
  {
    period: "Now",
    title: "Building product depth",
    summary: "Developing practical ownership across interface architecture, typed systems, debugging, and product delivery.",
    highlights: ["Ship coherent features", "Trace decisions through the stack", "Review, learn, and refine"],
  },
  {
    period: "Ongoing",
    title: "Independent engineering practice",
    summary: "Using real products and experiments to turn concepts into maintainable software.",
    highlights: ["React and Next.js applications", "Reusable content architecture", "Accessible interaction design"],
  },
];

export const skillGroups: SkillGroup[] = [
  { label: "Application", skills: ["React", "Next.js", "TypeScript", "Component architecture"] },
  { label: "Interface", skills: ["Responsive UI", "Accessibility", "Motion systems", "Design tokens"] },
  { label: "Engineering", skills: ["Data flow", "Debugging", "API integration", "Performance"] },
  { label: "Practice", skills: ["Product thinking", "Technical decisions", "Iterative delivery", "AI-assisted development"] },
];

export const experiments: Experiment[] = [
  { title: "Lab navigation", status: "Active", summary: "Testing how spatial composition can support free exploration without obscuring direct paths." },
  { title: "Motion grammar", status: "Studying", summary: "Building a restrained motion language where feedback and continuity matter more than spectacle." },
  { title: "Shared portfolio content", status: "Foundation", summary: "Separating professional facts from presentation so 2D and future 3D experiences can share one source." },
];

export const credentials: Credential[] = [];

export function getProjects() { return projects; }
export function getFeaturedProjects() { return projects.filter((project) => project.featured); }
export function getProjectBySlug(slug: string) { return projects.find((project) => project.slug === slug); }
export function getProjectNeighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
