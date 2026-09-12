# Interaction redesign verification — 12 September 2026

Scope: the existing Zesky Lab portfolio UI, interaction continuity, responsive behavior, and content preservation. No deployment, CMS setup, repository integration changes, or additional product implementation is included in this iteration.

## Automated checks

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: 5 content tests passed.
- `npm run build`: passed; homepage and existing project routes render through Next.js production compilation.
- Browser tests against `next start` on local port 3001: 21 passed, 3 intentionally skipped where a desktop-only or mobile-only case does not apply.
- Axe checks on `/` and `/projects/dmit-frontend-web`: no serious or critical findings in the tested desktop/mobile states.

The browser suite covers direct identity/navigation, first-visit intro skipping and session persistence, deep links, no-JavaScript content, project entry and return, mobile focus wrapping/Escape/destination navigation, horizontal story movement and exit, runtime resize cleanup, reduced-motion changes, invalid projects, and hero/dock bounds.

## Lighthouse

Lighthouse 12.8.2, default simulated mobile settings, local production build, fresh navigation. Scores are diagnostic samples, not guarantees for every device, connection, or the deployed Vercel environment.

| Route | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | 97 | 100 | 100 | 100 |
| `/projects/dmit-frontend-web` | 98 | 100 | 100 | 100 |

Homepage LCP: approximately 2.5 seconds; total blocking time: 20 ms; CLS: 0. DMIT LCP: approximately 2.4 seconds; total blocking time: 20 ms; CLS: 0.

An initial run identified an anchor without an href inside the inactive transition dialog. It is now rendered only when a destination exists. A dock accessible-name mismatch was also corrected. The final runs above include both fixes and the higher-resolution mobile hero image selection.

Remaining diagnostics include framework baseline unused/legacy JavaScript and some render delay associated with the short first-visit greeting and animation setup. These do not currently cause a category to miss the target. Keep the greeting bounded/skippable, and remeasure cold Vercel previews before expanding motion or dependencies.

## Visual and layout evidence

Production screenshots were inspected at 1440×900, 1366×768, 390×844, and 375×667. Each viewport had no document-level horizontal overflow; each hero fit its viewport, with primary actions above the bottom dock. At 375×667, the hero measured 667px and its actions ended at approximately 538px, above the dock at approximately 583px.

The DMIT horizontal chapter, mobile menu, case-study introduction, and Experience heading were inspected. The Experience heading and supporting copy have a measured 32px vertical gap in the desktop capture. Natural vertical growth is retained at more constrained sizes and zoom levels rather than hiding content.

Reproduce screenshots with `scripts/review-portfolio.mjs`. Images and raw Lighthouse JSON are local, ignored artifacts under `playwright-report/`; they are not production assets. Desktop Chromium automation is not a substitute for testing physical iOS/Android browsers or obtaining the owner's visual approval.

## Content preserved

- Sigma School role, location, period, and supplied areas of work.
- DMIT's FYP and contract phases, TAR UMT/Lunix Luminous attribution, scanner integration, architecture, case-study material, public deployment link, and ceremony photo.
- The OS300 bridge lifecycle limitation and ZK9500 post-refactor validation caveat.
- Separation of personal portfolio presentation from Kisora Studio collaboration.

No claims of resolved device issues, scientific validation, sole project ownership, new credentials, or invented impact metrics were added.

## Follow-up: video-guided composition, cursor, and marquee

The later owner-supplied video was inspected locally; no recording or reference artwork is published with the site. Main homepage sections now use an inset 1180px-max content shell. At desktop widths of 1920, 1440, and 1366px with respective viewport heights of 900, 900, and 768px, all seven main content sections fit one viewport and keep their last content above the dock. About displays its heading, introduction, and working principle together. Experience displays both roles side by side without deleting their content. Narrow and zoomed layouts remain natural-flow documents.

The typography strip is now an autonomous 65-second seamless loop with equal duplicated visual groups, explicit pause/resume, offscreen suspension, and a static reduced-motion alternative. A mouse-only custom cursor provides a contextual Open label on project links and restores the native pointer for keyboard input, dialogs, text inputs, touch, reduced motion, and forced colors. Tests caught and resolved a focus-based pause rule that prevented explicit Resume from taking effect.

Final follow-up checks: lint, type-check, production build, and 5 content tests passed. Both development and compiled-production browser runs passed 27 applicable tests, with 5 intentional device-specific skips. The suite now also verifies autonomous movement, loop geometry, pause/resume, cursor labels and restoration, and desktop chapter measurements. Chapter screenshots are ignored local artifacts under `playwright-report/chapters/`.

A fresh local-production mobile Lighthouse run after these changes scored 96 Performance and 100 Accessibility, Best Practices, and SEO; LCP was approximately 2.6 seconds and CLS remained 0. This remains above the target and within the normal variation of the earlier run. The earlier DMIT numbers above were not remeasured in this follow-up; the case route was covered by the production browser and axe regressions.
