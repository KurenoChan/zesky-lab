import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("playwright-report/chapters", { recursive: true });
const browser = await chromium.launch();
try {
  for (const [width, height] of [[1920, 900], [1440, 900], [1366, 768]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.addInitScript(() => sessionStorage.setItem("zesky-lab-intro", "seen"));
    page.on("pageerror", (error) => console.error(error.message));
    await page.goto(process.env.REVIEW_URL ?? "http://127.0.0.1:3000", { waitUntil: "networkidle" });
    for (const id of ["work", "lab-index", "about", "experience", "skills", "experiments", "contact"]) {
      await page.locator(`#${id}`).evaluate((el) => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: "instant" }));
      await page.waitForTimeout(1100);
      const bounds = await page.locator(`#${id}`).evaluate((el) => ({
        height: el.getBoundingClientRect().height, left: el.getBoundingClientRect().left,
        width: el.getBoundingClientRect().width,
        contentBottom: el.lastElementChild.getBoundingClientRect().bottom,
        dockTop: document.querySelector(".site-header").getBoundingClientRect().top,
      }));
      console.log(`${width}x${height} ${id}`, JSON.stringify(bounds));
      if (width !== 1440 || ["about", "work"].includes(id)) await page.screenshot({ path: `playwright-report/chapters/${width}-${id}.png` });
    }
    await page.close();
  }
} finally { await browser.close(); }
