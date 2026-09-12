import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const origin = process.env.REVIEW_URL ?? "http://127.0.0.1:3000";
await mkdir("playwright-report/refinements", { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: width < 800, hasTouch: width < 800 });
    await context.addInitScript(() => sessionStorage.setItem("zesky-lab-intro", "seen"));
    const page = await context.newPage();
    page.on("pageerror", (error) => console.error(name, error.message));
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.screenshot({ path: `playwright-report/refinements/${name}-hero.png` });
    for (const selector of ["#about", "#lab-index", ".future-section", "#contact"]) {
      await page.locator(selector).evaluate((el) => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 24, behavior: "instant" }));
      await page.waitForTimeout(800);
      await page.screenshot({ path: `playwright-report/refinements/${name}-${selector.replace(/[.#]/g, '')}.png` });
    }
    console.log(name, await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, sections: [...document.querySelectorAll('main > section.shell')].map(el => ({ name: el.id || el.className, width: el.clientWidth, height: el.clientHeight })) })));
    await page.goto(`${origin}/projects/dmit-frontend-web`, { waitUntil: "networkidle" });
    await page.locator('.project-gallery').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `playwright-report/refinements/${name}-gallery.png` });
    await page.locator('.project-preview').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `playwright-report/refinements/${name}-preview.png` });
    await context.close();
  }
} finally { await browser.close(); }
