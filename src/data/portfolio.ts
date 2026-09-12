import type {
  Credential,
  Experience,
  Experiment,
  NavItem,
  Project,
  SkillGroup,
} from "@/types/portfolio";
import { showcaseProjectSlugs } from "@/data/showcase";

export const profile = {
  publicName: "Zesky",
  productName: "Zesky Lab",
  role: "Software engineer building thoughtful digital systems.",
  introduction:
    "I turn ambitious ideas into clear, resilient software—connecting product thinking, interface craft, and engineering decisions.",
  availability: "Open to meaningful engineering conversations",
  links: [
    { label: "GitHub", href: "https://github.com/KurenoChan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/zheng-hong-koh-3797052b3/" },
  ],
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
    featured: false,
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
    slug: "dmit-frontend-web",
    title: "DMIT Fingerprint System",
    eyebrow: "Lunix Luminous Sdn. Bhd. · Industrial project",
    summary:
      "An industrial fingerprint capture and analysis interface for Lunix Luminous Sdn. Bhd., spanning guided capture, hardware integration, and backend-driven ML analysis.",
    description:
      "A React scanning application supporting touch-based hardware and touchless camera workflows within a distributed system.",
    role: "FYP developer, then contracted External System Development Expert through TAR UMT’s collaboration with Lunix Luminous Sdn. Bhd.; frontend workflows and scanner integration.",
    roleSummary: "Frontend workflows & scanner integration · FYP developer, then contracted System Development Expert",
    ownership: "professional",
    status: "active",
    featured: true,
    technologies: ["React", "Vite", "Zustand", "REST APIs", "Hardware bridge"],
    githubRepository: { owner: "KurenoChan", name: "fingerprint-scanning-web-app" },
    links: { deployment: "https://dmit-frontend-web.vercel.app/", organization: "https://luminous.com.my/" },
    screenshots: [
      { src: "/images/dmit/session-dashboard.webp", alt: "FYP interface showing an active session countdown and a start capture action", caption: "Session dashboard", width: 1919, height: 911, source: "FYP report · PDF page 78" },
      { src: "/images/dmit/image-browser.webp", alt: "Empty touch-based image browser with finger-position guides and capture placeholders", caption: "Guided image browser", width: 1919, height: 912, source: "FYP report · PDF page 79" },
      { src: "/images/dmit/bridge-install.webp", alt: "Scanner bridge installation dialog explaining the Windows bridge setup", caption: "Hardware bridge onboarding", width: 1919, height: 909, source: "FYP report · PDF page 80" },
      { src: "/images/dmit/session-complete.webp", alt: "Prototype submission confirmation screen with a return action", caption: "Submission confirmation", width: 1918, height: 909, source: "FYP report · PDF page 85" },
    ],
    media: [{ src: "/images/dmit-moa-ceremony.jpg", alt: "Group photograph at the TAR UMT and Lunix Luminous collaboration ceremony", caption: "The university-industry collaboration behind the DMIT system, bringing TAR UMT and Lunix Luminous together." }],
    caseStudy: {
      journey: [
        { period: "11 Jul 2025 – 24 Apr 2026", title: "Final-year project foundation", description: "Started as Zesky's Bachelor of Software Engineering final-year project at TAR UMT: a hybrid fingerprint submission system with a React interface, ZKTeco ZK9500 scanner bridge, backend services, PostgreSQL, and external ML analysis." },
        { period: "1 May – 31 Jul 2026", title: "Contract system development", description: "Returned as an External System Development Expert under the TAR UMT and Lunix Luminous collaboration, extending scanner integrations, connecting enterprise workflows, consolidating touchless and touch-based processing, and supporting testing and deployment." },
      ],
      context: "Lunix Luminous Sdn. Bhd. needed a guided web interface for Dermatoglyphic Multiple Intelligence Test (DMIT) fingerprint capture. The frontend operates inside a distributed system with a Node.js API, PostgreSQL data layer, Java scanner bridge, and external ML analysis service. This case study describes software and device integration; it does not establish the scientific validity of intelligence assessment from fingerprints.",
      objective: "Guide operators through reliable touch-based scanner and touchless camera capture, validate image quality through backend analysis, and submit complete fingerprint sessions.",
      architecture: [
        "React and Vite provide the browser interface and multi-step capture workflow.",
        "A Node.js and Express API owns sessions, fingerprint records, and external ML orchestration.",
        "A local Micronaut Java bridge connects the web workflow to ZKTeco scanner hardware, while PostgreSQL stores structured session data.",
      ],
      implementation: [
        "Reusable capture components and hooks separate camera, scanner, upload, analysis, and session concerns.",
        "Zustand stores coordinate touch-based and touchless capture state across guided workflows.",
        "The interface supports per-finger, multi-angle capture, quality feedback, review, and structured submission.",
        "During the contract phase, integrated the OS300 roller scanner and reorganized scanner-specific implementations behind a shared workflow contract.",
        "Refined device status, initialization, close, capture, API response, result presentation, image storage, and enterprise integration flows.",
        "In May 2026, refined OS300 /stat, /init, and /close responses, added device information to /stat, packaged the bridge as an executable, and documented a version-flexible bridge directory structure.",
      ],
      challenges: ["Coordinating browser state with local scanner hardware and remote services.", "Keeping a long capture session understandable while validating completeness and image quality.", "The scanner bridge could close after a failed or completed attempt, requiring a controlled reopen-and-retry path while capturing every angle."],
      decisions: ["Separate each scanner's device-specific implementation behind a common capture workflow contract.", "Keep ML inference outside the browser and communicate with it through the backend boundary.", "Standardize scanner bridge responses so the frontend can handle device state and errors consistently."],
      tradeoffs: ["A local scanner bridge adds an installation dependency, but enables communication with specialized hardware that browsers cannot access directly.", "Reopening the bridge during recovery favored completing the operational workflow while the underlying device lifecycle issue remained under investigation.", "After the 21 June 2026 scanner-adapter refactor, the ZK9500 workflow still required re-testing. The shared interface is an architectural decision, not a claim that both scanner paths were fully validated."],
      results: ["A deployed frontend supporting guided touch-based and touchless fingerprint capture workflows.", "Extended the original ZK9500 integration with OS300 roller-scanner work and a version-flexible executable structure."],
      lessons: ["Hardware-adjacent web products need explicit recovery states and clear progress feedback across every system boundary."],
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
    featured: false,
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
    period: "Jun 2026 – Present",
    title: "Software Engineer and Teaching Assistant Intern",
    organization: "Sigma School · On-site · Puchong, Selangor",
    summary: "Contributing to software delivery and supporting learners across practical engineering work.",
    highlights: ["React and TypeScript", "CMS", "System testing and QA", "Event planning"],
  },
  {
    period: "May – Jul 2026",
    title: "External System Development Expert",
    organization: "TAR UMT · Contract · Remote",
    summary: "Appointed under the TAR UMT and Lunix Luminous collaboration to extend and integrate the industrial fingerprint system beyond its FYP foundation.",
    highlights: ["ZK9500 and OS300 scanner SDK integration", "Unified touchless and touch-based workflows", "Database and enterprise-system integration", "Deployment testing and validation"],
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
export function getFeaturedProjects() { return showcaseProjectSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is Project => Boolean(project)); }
export function getProjectBySlug(slug: string) { return projects.find((project) => project.slug === slug); }
export function getProjectNeighbors(slug: string) {
  const selected = getFeaturedProjects();
  const index = selected.findIndex((project) => project.slug === slug);
  if (index < 0 || selected.length < 2) return { previous: undefined, next: undefined };
  return {
    previous: selected[index - 1],
    next: selected[index + 1],
  };
}
