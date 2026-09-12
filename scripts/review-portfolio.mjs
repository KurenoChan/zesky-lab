import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const origin = process.env.REVIEW_URL ?? "http://127.0.0.1:3000";
await mkdir("playwright-report/visual", { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height] of [["desktop", 1440, 900], ["laptop", 1366, 768], ["mobile", 390, 844], ["small-mobile", 375, 667]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: width < 800, hasTouch: width < 800 });
    await context.addInitScript(() => sessionStorage.setItem("zesky-lab-intro", "seen"));
    const page = await context.newPage();
    page.on("pageerror", (error) => console.error(name, error.message));
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.screenshot({ path: `playwright-report/visual/${name}-hero.png` });
    console.log(name, await page.evaluate(() => ({ viewport: innerWidth, contentWidth: document.documentElement.scrollWidth, heroHeight: document.querySelector(".hero").clientHeight, actionsBottom: document.querySelector(".hero-actions").getBoundingClientRect().bottom, dockTop: document.querySelector(".site-header").getBoundingClientRect().top })));
    await page.locator("#work").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `playwright-report/visual/${name}-work.png` });
    if (width >= 1024) {
      const top = await page.locator(".pin-spacer").evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
      await page.evaluate((y) => window.scrollTo({ top: y + window.innerWidth, behavior: "instant" }), top);
      await page.waitForTimeout(1300);
      await page.screenshot({ path: `playwright-report/visual/${name}-story.png` });
    } else {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: `playwright-report/visual/${name}-menu.png` });
    }
    await context.close();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => sessionStorage.setItem("zesky-lab-intro", "seen"));
  await page.goto(`${origin}/projects/dmit-frontend-web`, { waitUntil: "networkidle" });
  await page.screenshot({ path: "playwright-report/visual/desktop-case.png" });
  await page.goto(`${origin}/#experience`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "playwright-report/visual/desktop-experience.png" });
  console.log("experience heading", await page.locator("#experience .section-heading").evaluate((el) => ({ headingBottom: el.querySelector("h2").getBoundingClientRect().bottom, copyTop: el.querySelector("p").getBoundingClientRect().top })));
} finally { await browser.close(); }
