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
- Client Components are restricted to the responsive menu and GSAP-enhanced lab index. Content, metadata, and routes stay server-rendered.

Data flows from typed content records through repository selectors into Server Components. Interactive children receive only the serializable data they need.

## Editing content

Replace or extend the records in `src/data/portfolio.ts`. Do not publish unverified employers, credentials, metrics, ownership claims, or contact details. Collaborative projects must keep an explicit ownership value and personal role description.

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment so canonical, sitemap, and Open Graph URLs use the final domain.

## Product boundary

Zesky Lab is the complete 2D personal portfolio. LabGround may reuse its content but owns a separate 3D presentation. Kisora Studio is a separate collaborative product and is represented here only through clearly attributed references.
