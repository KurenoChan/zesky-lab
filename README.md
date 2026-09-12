# Zesky Lab

Zesky Lab is Zesky's 2D interactive software engineering portfolio. It combines direct professional navigation with an exploratory lab index and keeps portfolio facts independent from the current presentation so a future LabGround experience can reuse them.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Playwright requires a Chromium browser (`npx playwright install chromium`) before the first E2E run.

## Architecture

- `src/app/page.tsx` is the server-rendered homepage composition.
- `src/app/projects/[slug]/page.tsx` generates addressable case studies and metadata from the shared project repository.
- `src/data/portfolio.ts` is the current content source. It deliberately contains no JSX, CSS classes, or animation settings.
- `src/types/portfolio.ts` defines the content contract that future sources and LabGround can consume.
- `src/components/layout`, `navigation`, `motion`, and `ui` separate stable responsibilities without creating speculative folders.
- Client Components own interactive menus, dialogs, motion, cursor feedback, the screenshot gallery, opt-in project frame, and non-submitting contact form. The lab index, About, future destinations, and DMIT story chapters are Server Components. Content, metadata, and routes stay server-rendered.

Data flows from typed content records through repository selectors into Server Components. Interactive children receive only the serializable data they need.

Lenis runs only for fine-pointer users who have not requested reduced motion. Touch devices retain native scrolling. Lenis and GSAP share a ticker; ScrollTrigger receives Lenis scroll updates. Open native dialogs pause Lenis.

`ScrollExperience` enhances existing server HTML. Desktop screens at least 1024px wide and 700px tall receive the finite horizontal DMIT story. Other viewports and reduced-motion users receive vertical chapters. GSAP match-media contexts revert transforms and pin spacing on resize and unmount. A skip link and direct navigation bypass the scene.

`AnimatedDialog` centralizes native top-layer placement, focus containment, keyboard wrapping, Escape dismissal, and motion. The mobile menu no longer relies on a fixed overlay inside a transformed dock. `ProjectTransition` lives in the root layout so its terminal survives route changes and reveals the destination after it mounts. Modifier-clicks, reduced motion, and non-JavaScript navigation retain ordinary links. A bounded timeout and direct link prevent a failed navigation from trapping visitors.

The first-visit intro is a short brand greeting, not a simulated network loader. It is skippable, remembered per tab session, and bypassed for deep links, disabled storage, and reduced motion.

`StatementMarquee` provides a seamless 42-second typography loop. Its two equal copies share one CSS transform animation, independent of scroll position; an IntersectionObserver pauses it offscreen. It continues on hover without controls, as requested; reduced motion renders static text. `CustomCursor` is a mouse-only reticle with contextual project labels. Its DOM updates use GSAP quick setters/tweens rather than React state on every pointer event. Native cursors are restored on keyboard use, pointer exit, window blur, text inputs, dialogs, reduced motion, forced colors, and cleanup.

Desktop content occupies 70% of the viewport, leaving 15% gutters on each side. Tablet and mobile use smaller responsive gutters. Sections compose above the bottom dock within a screen where practical; longer content grows instead of clipping. The full DMIT case study is intentionally long-form. Manrope body text and Space Grotesk display text are bundled locally through Next's font optimization.

See `docs/design-direction.md` for the current storytelling and visual rationale.

## Editing content

Featured projects are deliberately curated in `src/data/showcase.ts`; that ordered list is the selection source, not the legacy `featured` flag. GitHub is an enrichment source, not the editorial CMS: add a `githubRepository` owner/name to retrieve current language and update metadata, while keeping role, ownership, architecture, and case-study writing in the typed project record. Public repositories work without configuration. Private repositories require an optional server-only `GITHUB_TOKEN` in `.env.local` and Vercel; use a fine-grained read-only token and never expose it as `NEXT_PUBLIC_*`. Confirm what repository metadata is approved for public display before enabling private-repository enrichment.

The homepage selection lives in `src/data/showcase.ts`. Add or remove an approved project slug there; presentation components do not need to change.

The MVP does not include an admin CMS. This avoids authentication and database complexity while there are only a few carefully written case studies. The repository-style data functions preserve a later migration path to a CMS without rewriting presentation components.

Replace or extend the records in `src/data/portfolio.ts`. Do not publish unverified employers, credentials, metrics, ownership claims, or contact details. Collaborative projects must keep an explicit ownership value and personal role description.

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment so canonical, sitemap, and Open Graph URLs use the final domain.

## Reviewing changes

### Portrait, gallery, and live previews

- Add your photo as `public/images/portrait.webp`, then set `src` to `/images/portrait.webp` in `src/data/portrait.ts`. The rounded frame applies grayscale automatically; update the alt text for your chosen photo.
- Project `screenshots` records contain dimensions, captions, alt text, and source provenance. The DMIT gallery uses reviewed report figures from PDF pages 78, 79, 80, and 85, with browser chrome cropped. These are historical prototype screens, not claims about the current deployment. No actual fingerprint captures or environment credentials were exported.
- `ProjectGallery` supports thumbnails, arrow keys, and an enlarged native dialog. `ProjectPreview` loads the HTTPS deployment only after launch. It does not bypass remote embedding restrictions; an external link remains available. Authentication, backend, and scanner workflows may not work within the sandboxed frame.
- The contact form is a visual preview only: it neither submits nor saves data. Approved professional links remain usable.
- `src/data/ecosystem.ts` keeps LabGround and Kisora's future scope distinct. Locked actions do not imply either destination is available.

Run `node scripts/review-refinements.mjs` for the latest desktop/mobile component captures.

Run `node scripts/review-portfolio.mjs` with a local server running. It captures desktop, laptop, mobile, and small-mobile views under the ignored `playwright-report/visual/` directory and reports viewport overflow and hero/dock measurements. Set `REVIEW_URL` to inspect a different local or preview origin.

`node scripts/review-chapters.mjs` measures and captures each desktop homepage chapter at 1920×900, 1440×900, and 1366×768. Its ignored screenshots live in `playwright-report/chapters/`.

Browser tests cover first-visit and deep-link entry, no-JavaScript HTML, project transitions, return navigation, mobile focus and dismissal, desktop horizontal movement, continuous marquee behavior, custom-cursor fallbacks, reduced motion, resize cleanup, responsive gutters, circle alignment, locked destinations, the non-submitting form, gallery navigation, opt-in previews, and serious/critical axe findings on the homepage and DMIT case study. Five device-specific cases are intentionally skipped on the opposite device.

To test production compilation, run `npm run build`, then `npm run start -- --port 3001`. Set `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001` when running `npm run test:e2e` against that server. `PLAYWRIGHT_SERVER_COMMAND` can override the server command if Playwright should start it itself. These environment examples use shell-appropriate syntax; in PowerShell, assign `$env:PLAYWRIGHT_BASE_URL`.

Use Lighthouse on production compilation, not the development server. Target 90+ across categories, investigate material regressions, and supplement synthetic scores with keyboard, touch, reduced-motion, zoom, and visual checks. Scores are evidence, not a substitute for product review.

## Product boundary

Zesky Lab is the complete 2D personal portfolio. LabGround may reuse its content but owns a separate 3D presentation. Kisora Studio is a separate collaborative product and is represented here only through clearly attributed references.
