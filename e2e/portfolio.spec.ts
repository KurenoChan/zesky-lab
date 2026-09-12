import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("zesky-lab-intro", "seen"));
});

test("presents identity, direct navigation, and a complete case study", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ideas become");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await page.getByRole("button", { name: /Close/ }).click();
  } else {
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  }
  await page.getByRole("link", { name: /Open DMIT Fingerprint System case terminal/ }).click();
  await expect(page).toHaveURL(/\/projects\/dmit-frontend-web$/);
  await expect(page.getByRole("heading", { name: "Architecture" })).toBeVisible();
});

test("has no serious or critical accessibility violations on representative routes", async ({ page }) => {
  await page.goto("/");
  for (const route of ["/", "/projects/dmit-frontend-web"]) {
    await page.goto(route);
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === "critical" || impact === "serious")).toEqual([]);
  }
});

test("keeps the hero readable above the dock without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1300);
  const bounds = await page.evaluate(() => ({
    width: innerWidth, content: document.documentElement.scrollWidth,
    actions: document.querySelector(".hero-actions")!.getBoundingClientRect().bottom,
    dock: document.querySelector(".site-header")!.getBoundingClientRect().top,
  }));
  expect(bounds.content).toBeLessThanOrEqual(bounds.width);
  expect(bounds.actions).toBeLessThan(bounds.dock);
});

test("mobile navigation contains focus, dismisses, and reaches a real destination", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile dock journey");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Contact/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site navigation" })).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Experience/ }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.getByRole("dialog", { name: "Site navigation" })).not.toBeVisible();
  await expect.poll(async () => (await page.locator("#experience").boundingBox())!.y).toBeLessThan(100);
});

test("desktop scroll moves the DMIT story horizontally and permits a direct exit", async ({ page, isMobile }) => {
  test.skip(isMobile, "Touch uses the vertical story");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const story = page.locator(".project-story");
  await expect(story).toHaveAttribute("data-enhanced", "true");
  const top = await page.locator(".pin-spacer").evaluate((el) => el.getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => window.scrollTo({ top: y + innerWidth, behavior: "instant" }), top);
  await expect.poll(async () => page.locator(".story-rail").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41)).toBeLessThan(-1000);
  await expect(page.getByRole("heading", { name: "Contract system development" })).toBeInViewport();
  await page.getByRole("link", { name: "Continue to the lab" }).click();
  await expect(page).toHaveURL(/#after-story$/);
  await expect.poll(async () => (await page.locator("#after-story").boundingBox())!.y).toBeLessThan(100);
});

test("reduced motion keeps all chapters in normal flow and bypasses transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".project-story")).not.toHaveAttribute("data-enhanced");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  const chapters = await page.locator(".story-chapter").evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top));
  expect(chapters[1]).toBeGreaterThan(chapters[0]);
  expect(chapters[2]).toBeGreaterThan(chapters[1]);
  await page.getByRole("link", { name: /Open DMIT Fingerprint System case terminal/ }).click();
  await expect(page).toHaveURL(/\/projects\/dmit-frontend-web$/);
  await expect(page.getByRole("dialog", { name: "Opening project case study" })).not.toBeVisible();
});

test("resizing removes pin spacing and short screens keep content readable", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop media-query lifecycle");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".project-story")).not.toHaveAttribute("data-enhanced");
  const hero = await page.locator(".hero").boundingBox();
  expect(hero!.height).toBeLessThanOrEqual(668);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
});

test("project transition completes and back navigation restores the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Open DMIT Fingerprint System case terminal/ }).click();
  await expect(page.getByRole("dialog", { name: "Opening project case study" })).toBeVisible();
  await expect(page).toHaveURL(/\/projects\/dmit-frontend-web$/);
  await expect(page.getByRole("dialog", { name: "Opening project case study" })).not.toBeVisible();
  await expect(page.locator("#main")).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ideas become");
  await expect(page.getByRole("dialog", { name: "Opening project case study" })).not.toBeVisible();
  await page.getByRole("link", { name: /Open DMIT Fingerprint System case terminal/ }).click();
  await expect(page).toHaveURL(/\/projects\/dmit-frontend-web$/);
});

test("shows the project not-found experience", async ({ page }) => {
  await page.goto("/projects/not-a-project");
  await expect(page.getByRole("heading", { name: "Signal lost." })).toBeVisible();
});
