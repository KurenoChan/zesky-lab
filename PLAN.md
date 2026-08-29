# Zesky Lab — Initial MVP Implementation Direction

## Summary

Build and deploy Zesky Lab as a polished, independently complete 2D software-engineering portfolio using Next.js App Router, React, TypeScript, Tailwind CSS, and CSS design tokens.

The initial experience will explore:

- A cinematic, immediately understandable hero.
- A non-linear 2D lab dashboard or similarly coherent exploration surface.
- Persistent conventional navigation.
- Core professional content.
- Structured, reusable portfolio data.
- At least one complete project case study.
- Direct contact and professional links.
- A separate, clearly attributed Kisora Studio invitation.

This plan establishes product goals, architectural boundaries, and an initial implementation direction. Visual composition, section presentation, interactions, component boundaries, and content models may evolve through implementation and review when changes improve coherence, usability, accessibility, performance, or maintainability.

## Implementation Direction

### Foundation and architecture

- Initialize a permanent Git repository with current stable Next.js App Router, React, strict TypeScript, Tailwind CSS, ESLint, `src/`, and the `@/*` alias.
- Use npm and target Vercel’s full Next.js runtime, preserving future GitHub, CMS, preview, and server-backed capabilities.
- Add development, build, lint, type-check, unit-test, and browser-test scripts as their corresponding functionality becomes active.
- Use meaningful incremental commits around coherent features.
- Document setup, architecture, content editing, major data flow, Server/Client boundaries, testing, and deployment.
- Keep Server Components as the default. Introduce Client Components only for state, browser APIs, menus, pointer interaction, and motion.

### Shared content

- Begin with typed, presentation-neutral modules for profile, projects, experience, education, skills, credentials, experiments, navigation, social links, and Kisora references.
- Ensure projects can represent slug, summary, role, ownership, status, technologies, links, media, and structured case-study material.
- Keep reusable data free of JSX, styling classes, animation configuration, and Lab-specific layouts.
- Treat the initial schema as evolvable: revise it when real content exposes better abstractions while preserving clear types and migration paths.
- Use real supplied facts where available and visibly marked development placeholders elsewhere. Unverified employers, claims, metrics, credentials, or testimonials must not reach production.
- Mark collaborative projects and Zesky’s role explicitly. Kisora remains an external collaborative destination rather than a portfolio category.
- Place content access behind small repository-style functions so future GitHub or CMS sources do not require rewriting presentation components.

### Visual and interaction system

- Start with a dark laboratory direction: deep neutral/navy surfaces, restrained cool accents, high-contrast typography, controlled glass, layered depth, and minimal supporting gradients.
- Define semantic CSS variables for colors, typography, spacing, radii, shadows, glass treatment, layout widths, and motion.
- Use Tailwind for responsive composition while retaining tokens as the visual source of truth.
- Establish reusable primitives only when repeated needs emerge; avoid prematurely constructing a large component library.
- Use an expressive display font with a highly readable body font, optimized through Next.js.
- Borrow principles rather than layouts from references:

  - Immediate identity and role communication from Mason Wong.
  - Editorial project storytelling from Poch Studio.
  - Direct professional navigation from Brittany Chiang.
  - Localized experimentation from Noomo Labs and Wodniack.

- Review each coherent feature visually and allow justified iteration before propagating patterns across the application.

### Homepage experience

Develop `/` progressively around these product outcomes:

- Communicate “Zesky Lab,” Zesky’s software-engineering identity, and meaningful work within the first five seconds.
- Provide an exploratory 2D destination surface for Projects, About, Experience, Skills, Experiments, and Contact.
- Back all exploratory interactions with semantic links and persistent conventional navigation.
- Present selected projects with technical focus, role, ownership, status, and case-study access.
- Include About/development journey, experience, skills, experiments, verified credentials, direct contact links, and an attributed Kisora Studio invitation.
- Ensure recruiters never need to understand an interaction mechanic to access projects or experience.
- Adapt the exploration surface into a straightforward destination grid or another touch-friendly presentation on narrow screens.
- Permit the lab-dashboard metaphor or section ordering to evolve if implementation review identifies a clearer expression of non-linear exploration.

### Case studies and routes

- Implement `/projects/[slug]` using static parameter generation, project-specific metadata, canonical URLs, social metadata, and not-found handling.
- Deliver at least one substantive case study covering context, objective, role and ownership, architecture, implementation, challenges, decisions, trade-offs, results, and lessons.
- Render public project content as accessible HTML independent of client-side animation.
- Include verified repository and deployment links, project-to-project navigation where useful, and an obvious return to selected work.
- Add further routes only when real content or user journeys justify them.

### Motion

- Use CSS transitions for routine hover, focus, navigation, and interface feedback.
- Initially reserve GSAP for a meaningful hero/dashboard sequence or transition where CSS is insufficient.
- Keep motion code inside narrowly scoped Client Components and load it only where needed.
- Do not adopt site-wide ScrollTrigger choreography until real sections demonstrate a need.
- Provide reduced-motion equivalents that reveal content immediately and retain spatial clarity.
- Exclude scroll hijacking, mandatory loaders, cursor replacement, sound, fox dependencies, WebGL, Three.js, and Blender assets.

### Deployment and quality

- Deploy early to Vercel preview environments and test behavior under production compilation throughout development.
- Add metadata, icons, sitemap, robots configuration, social images, and a useful not-found state before public release.
- Optimize images, fonts, client boundaries, dynamic imports, and motion dependencies as real performance evidence emerges.
- Configure a custom domain after it is supplied; use the generated Vercel domain for previews and the initial deployment.
- Target Lighthouse scores of at least 90 for Performance, Accessibility, Best Practices, and SEO on representative production routes.
- Treat Lighthouse as diagnostic evidence: investigate regressions and material deficiencies, but do not make one synthetic run an absolute release gate.

## Public Interfaces and Boundaries

- Initial public routes: `/` and `/projects/[slug]`.
- Shared interfaces: typed profile, project, experience, education, skill, credential, experiment, navigation, and social-link records.
- No public API routes, database, authentication, analytics, CMS, GitHub integration, or contact-submission endpoint in the MVP.
- Contact uses direct email, GitHub, LinkedIn, résumé, and other approved links.
- Zesky LabGround may later consume the shared content layer but will own its presentation.
- Kisora Studio retains separate content ownership and implementation.
- Visual and internal component APIs may evolve during feature development; the product boundary and presentation-neutral content principle remain stable.

## Incremental Test Strategy

Introduce tests beside meaningful functionality rather than front-loading an exhaustive suite:

1. Establish linting, strict type checking, and production builds with repository initialization.
2. Add unit tests when content selectors, slug resolution, ordering, ownership labeling, or non-trivial state logic appear.
3. Add focused component tests for interactive navigation and menus as those features are built.
4. Add Playwright coverage once stable user journeys exist, prioritizing:

   - Initial identity and primary actions.
   - Direct and keyboard navigation.
   - Mobile-menu focus and dismissal.
   - Project case-study navigation.
   - Invalid project handling.
   - Reduced-motion behavior.
   - Critical responsive layouts.

5. Add automated accessibility checks to representative stable routes and manually inspect keyboard use, focus, contrast, zoom, touch input, and semantic structure.
6. Expand regression coverage as features stabilize and bugs reveal important failure modes.

Do not block early visual development on exhaustive test infrastructure, pursue arbitrary coverage percentages, or test transient implementation details.

## Acceptance and Delivery

The credible MVP is complete when:

- It runs locally and is deployed to Vercel.
- Visitors quickly understand Zesky’s identity and engineering position.
- Exploratory navigation and direct professional navigation both work.
- Core professional areas and contact paths are present.
- At least one credible case study is complete.
- Shared content is typed, presentation-neutral, and suitable for later LabGround reuse.
- Collaborative ownership is clearly attributed.
- The experience is responsive, keyboard accessible, reduced-motion compatible, and useful without advanced animation.
- Production contains no deceptive placeholder claims.
- Relevant lint, type, build, and accumulated critical-path tests pass.
- Representative production routes generally meet the ≥90 Lighthouse target, with material deficiencies documented and investigated.
- Documentation explains the resulting architecture and important App Router, TypeScript, component, and data-flow decisions.

## Assumptions

- Portfolio content is currently partial; content inventory and implementation will progress together.
- The user will supply or approve biography, identity details, email, social links, résumé, work history, education, credentials, project facts, media, and public links before release.
- The initial theme is dark with cool accents; dual-theme support is deferred.
- Tailwind CSS and semantic CSS variables form the sole styling foundation.
- Motion is CSS-first with targeted GSAP.
- Visual and architectural iteration is expected when supported by implementation evidence and product review.
- Fox, 3D systems, CMS, GitHub integration, Kisora implementation, and LabGround remain outside this MVP.
