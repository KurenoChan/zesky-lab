# UI refinement verification — 12 September 2026

## Automated checks

- Production build, ESLint, and strict TypeScript checks passed.
- Five content unit tests passed.
- Production browser regression: 37 passed, five intentionally skipped for device-specific behavior.
- After the final Kisora image optimization, all ten refinement tests passed again against a fresh production server.
- Representative homepage and DMIT axe checks found no serious or critical violations on desktop or mobile. This is not a full accessibility-conformance claim.
- `git diff --check` passed; Git reported only Windows line-ending conversion warnings.
- Production dependency audit reported zero vulnerabilities; this does not include development dependencies.

The cursor test now waits for enhancement initialization before moving the pointer. The short, automatically dismissed intro is tested with keyboard activation rather than waiting for pointer-click animation stability. No forced clicks or disabled application animation were needed.

## Visual review

Reviewed desktop 1440×900 and mobile 390×844 captures for hero, About, invitation cards, future destinations, contact, project gallery, and preview launcher. Corrected a redundant About identity row and an inherited contact alignment rule, then confirmed the layout. Neither viewport had horizontal page overflow.

Desktop content measured 1008px at 1440px viewport width: 15% margins per side. Contact fits one 900px viewport. About is approximately 908px and the two future destinations approximately 1046px; these grow naturally rather than cropping information. Mobile sections intentionally grow to preserve readable content.

Circle-center tests verify chapter-number alignment within one pixel on both device configurations and a separate caption gap. Marquee tests verify continuous movement on hover, no pause control, and static reduced-motion behavior.

## Lighthouse

Local production compilation, default mobile simulation:

| Route | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` after image optimization | 92 | 100 | 100 | 100 |
| `/projects/dmit-frontend-web` | 95 | 100 | 100 | 100 |

The initial homepage run scored 90. Investigation found the Kisora background loading the full original PNG; it now uses responsive Next Image delivery. The subsequent run scored 92, with 3.4s simulated LCP. Scores vary; the remaining LCP/main-thread work warrants monitoring on the deployed origin. Local results do not establish real-device or Vercel performance.

## Boundaries and remaining validation

- Contact deliberately sends and stores nothing. Existing professional links remain the real contact paths.
- The iframe journey was tested with a controlled external response. Real deployment authentication, backend availability, scanner workflows, downloads, and cross-origin policy remain external constraints; the preview always offers a separate-tab link.
- PDF gallery figures were individually reviewed. Actual fingerprint captures, credentials, and the complete report were not published.
- Add the owner's approved portrait using `src/data/portrait.ts`; no fabricated portrait is presented.
- No CMS, contact backend, deployment, commit, or push was performed in this refinement.
- Desktop Chromium and emulated mobile checks do not replace Safari, physical touch-device, zoom, and assistive-technology review.
- Continuous motion without a pause control follows the explicit brief; reduced-motion support alone does not establish WCAG compliance for that choice.
