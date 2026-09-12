import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("zesky-lab-intro", "seen"));
});

test("desktop content uses 15 percent gutters and grows without clipping", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop composition; mobile grows naturally");
  for (const [width, height] of [[1920, 900], [1440, 900], [1366, 768]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    for (const id of ["work", "lab-index", "about", "experience", "skills", "experiments", "contact"]) {
      const layout = await page.locator(`#${id}`).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return { height: rect.height, left: rect.left, lastContent: el.lastElementChild!.getBoundingClientRect().bottom - rect.top };
      });
      expect(layout.left / width).toBeCloseTo(.15, 2);
      expect(layout.lastContent, `${id} has bottom breathing room`).toBeLessThan(layout.height - 90);
    }
  }
});

test("the text band keeps looping on hover without pause controls", async ({ page }) => {
  await page.goto("/");
  const band = page.locator(".statement-band");
  const track = page.locator(".statement-track");
  await band.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(band).toHaveAttribute("data-in-view", "true");
  const translation = () => track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  const initial = await translation();
  await expect.poll(translation).toBeLessThan(initial - 1);
  const geometry = await track.evaluate((el) => {
    const children = Array.from(el.children).map((child) => child.getBoundingClientRect().width);
    return { children, width: el.getBoundingClientRect().width, iterations: getComputedStyle(el).animationIterationCount };
  });
  expect(geometry.children[0]).toBeCloseTo(geometry.children[1], 1);
  expect(geometry.width).toBeCloseTo(geometry.children[0] * 2, 1);
  expect(geometry.iterations).toBe("infinite");
  await expect(band.getByRole("button")).toHaveCount(0);
  await band.hover();
  await expect(track).toHaveCSS("animation-play-state", "running");
  const hovered = await translation();
  await expect.poll(translation).toBeLessThan(hovered - 1);
});

test("custom cursor labels projects and restores the native cursor for keyboard and dialogs", async ({ page, isMobile }) => {
  test.skip(isMobile, "No custom cursor on touch devices");
  await page.goto("/");
  await expect(page.locator(".custom-cursor")).toHaveAttribute("data-enabled", "true");
  await page.getByRole("link", { name: /Open DMIT Fingerprint System case terminal/ }).hover();
  await expect(page.locator("html")).toHaveAttribute("data-cursor-ready", "true");
  await expect(page.locator(".custom-cursor")).toHaveAttribute("data-labeled", "true");
  await expect(page.locator(".cursor-ring span")).toHaveText("Open");
  await page.keyboard.press("Tab");
  await expect(page.locator("html")).not.toHaveAttribute("data-cursor-ready");
  await page.setViewportSize({ width: 700, height: 800 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-cursor-ready");
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(100, 150);
  await expect(page.locator("html")).not.toHaveAttribute("data-cursor-ready");
});

test("reduced motion stops the marquee and retains ordinary cursors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".statement-band").scrollIntoViewIfNeeded();
  await expect(page.locator(".statement-track")).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("button", { name: "Pause moving text" })).not.toBeVisible();
  await page.mouse.move(100, 150);
  await expect(page.locator("html")).not.toHaveAttribute("data-cursor-ready");
});
