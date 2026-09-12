# Zesky Lab visual direction

This direction implements DEVROADMAP-117 within the ecosystem boundaries established by DEVROADMAP-2. Zesky Lab remains a complete 2D personal software-engineering portfolio; LabGround owns future 3D presentation, and Kisora Studio remains a separate collaborative destination.

## Story premise

Zesky Lab is presented as a modern digital atelier above a luminous city at night. Its anime influence comes from atmosphere, framing, quiet human presence, and a sense that ideas are still alive—not from copying a franchise or turning the portfolio into a game.

The visitor journey is:

1. Enter through a short, skippable first-visit introduction and immediately understand that Zesky is a software engineer.
2. Read the central idea: make complex things feel clear.
3. Discover DMIT, then follow its FYP-to-contract story through a finite horizontal desktop chapter sequence (vertical on mobile), or bypass it entirely.
4. Open project terminals that explain decisions, not only outcomes; use the destination grid or dock to explore in any order.
5. Learn who is behind the work and how ownership has grown.
6. Review the engineering toolkit and active experiments.
7. Notice Kisora as a connected but separate studio world.
8. Make contact directly.

Professional information remains available without understanding the metaphor.

The onboarding, horizontal narrative, smooth scrolling, and project-terminal transitions are progressive enhancements. Semantic links, server-rendered case studies, direct navigation, keyboard access, and reduced-motion behavior remain the baseline.

## Visual principles

- Anime influence comes from cinematic environment art, atmospheric depth, large skies, quiet light, and emotional framing.
- Midnight navy, clear cyan, soft violet, glass, rain reflections, and small warm lights establish a modern technology atmosphere.
- The visual language avoids military terminology, generic cyberpunk HUD clutter, and excessive neon.
- Typography is intentionally larger than the original release, with readable body copy and strong editorial chapter headings.
- Glass is used for navigation and overlays where depth helps. Content surfaces are more opaque so readability does not depend on the background.
- Motion supports arrival and continuity. Lenis is disabled for reduced-motion and touch/coarse-pointer visitors.
- The generated hero artwork is original and depicts a subtle engineer in a modern glass studio. It contains no logos or copyrighted characters.

## Reference observations

- Mason Wong: communicate identity and role immediately; use typography as composition.
- Poch Studio: let projects carry editorial weight and enough context to feel consequential.
- Noomo Labs and Wodniack: localize experimentation instead of making every interaction unconventional.
- Brittany Chiang: maintain direct, recruiter-friendly navigation regardless of the visual concept.
- Sigmo codebase: keep server shells stable, isolate the smallest stateful client components, and extract primitives only after a repeated responsibility is clear.

These are principles, not layouts to clone.

## September 2026 interaction iteration

Mason Wong's current [homepage](https://www.mason-wong.com/home) was inspected in a browser at the opening and after scrolling. Its oversized letter composition gives way to editorial identity text against atmospheric imagery. The useful lesson here is continuity and typographic scale, not its lettering, exact layout, or script accents. Zesky uses sans-serif type only.

The supporting directions remain [Poch Studio](https://poch.studio/) for editorial project weight, [Noomo Labs](https://labs.noomoagency.com/) and [Wodniack](https://wodniack.dev/) for purposeful local experimentation, and [Brittany Chiang](https://brittanychiang.com/) for direct professional access. These references are inspiration, not a claim that all of their current interaction implementations were reproduced or audited.

- A unified midnight/lavender token system replaces the accumulated anime/wartime CSS overrides. The wartime theme is removed.
- The hero pairs the existing anime studio art with immediate identity, a short human-readable statement, and visible actions. The image now uses Next Image instead of an unoptimized CSS background.
- The heading hierarchy uses normal document flow so display text cannot cover its supporting paragraph. Short screens and browser zoom may grow naturally rather than clipping content to a fixed height.
- Hero parallax, connected text movement, and staggered heading reveals establish continuity. Only the DMIT sequence pins; touch, reduced-motion, and shorter viewports retain vertical reading. There is no forced snapping or site-wide scroll interception.
- Project hover reveals a local terminal cue and scan illustration. A layout-owned transition keeps the entry animation alive across route changes. The illustration is explicitly not a real scan or product screenshot.
- The mobile dock opens a rounded native dialog with an opaque reading surface and staggered links. Focus, Escape, and background inertness are functional requirements.
- The first-visit greeting lasts about 1.6 seconds before its exit, can be skipped, and does not invent loading percentages or backend activity.
- No new animation framework, CMS, API, analytics, or 3D dependency was introduced.

## Content invariants

DMIT means Dermatoglyphic Multiple Intelligence Test. Its case study is about engineering workflows, not scientific validation of intelligence claims. Keep the two phases distinct: TAR UMT Bachelor of Software Engineering FYP (11 July 2025–24 April 2026), then External System Development Expert contract (1 May–31 July 2026) through the TAR UMT/Lunix Luminous Sdn. Bhd. collaboration. ZKTeco ZK9500 belongs to the FYP foundation; OS300 was added during the contract. Preserve the bridge-reopen workaround and the ZK9500 re-testing caveat after the June adapter refactor. Do not turn these into resolved issues or solo ownership claims.

Sigma School remains a Software Engineer and Teaching Assistant internship from June 2026–Present, on-site in Puchong, Selangor: React, TypeScript, CMS, system testing/QA, and event planning. No unsupported impact metrics or additional internship projects are invented. The ceremony photo and full DMIT architecture, decisions, trade-offs, results, and lessons remain in the case study.

The selected-work list and project neighbors exclude the portfolio itself and unselected Kisora work. Older project routes remain addressable to avoid breaking existing URLs. Kisora remains a separate collaborative destination, not a third portfolio presentation.

## Video-guided spacing and motion refinement

The supplied 36-second recording was inspected locally as a sequence of frames. It demonstrates large editorial type, distinct page compositions, clear horizontal margins, and movement connecting the content. No video frames or reference artwork were copied into production.

The homepage now uses an inset 1180px maximum reading width, paired heading/copy compositions, and viewport-aware display sizes. About's introduction and working principle remain alongside its heading in one desktop composition. Both professional roles are visible together in Experience. The main desktop sections were measured at 1920×900, 1440×900, and 1366×768; all fit their respective viewport with content above the dock. These measurements are not a reason to clip longer copy or constrain mobile layouts.

The Curiosity / Craft / Continuity strip now moves slowly and infinitely without requiring scrolling. Duplicate decorative copies produce a seamless loop; one screen-reader text alternative avoids repetition. An explicit pause/resume control and reduced-motion fallback preserve user control. The desktop DMIT scroll-driven horizontal story remains separate from this autonomous motion.

The owner's later request explicitly introduces a custom cursor, superseding the initial MVP exclusion. It is limited to fine-pointer hover devices without reduced-motion or forced-color preferences. Its default ring is small; project links expand it into an Open cue. It never becomes a requirement for navigation, and native pointers remain available for dialogs and text inputs.
