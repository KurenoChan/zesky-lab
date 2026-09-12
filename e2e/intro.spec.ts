import { expect, test } from "@playwright/test";

test("first-visit welcome is skippable and does not replay on reload", async ({ page }) => {
  // Do not wait for artwork downloads while the short greeting auto-dismisses.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const intro = page.getByRole("dialog", { name: "Welcome to Zesky Lab" });
  await expect(intro).toBeVisible();
  await page.getByRole("button", { name: "Skip intro" }).press("Enter");
  await expect(intro).not.toBeVisible();
  await page.reload();
  await expect(intro).not.toBeVisible();
});

test("a direct professional link bypasses the welcome", async ({ page }) => {
  await page.goto("/#experience");
  await expect(page.getByRole("dialog", { name: "Welcome to Zesky Lab" })).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Progress measured in ownership." })).toBeInViewport();
});

test("professional HTML is available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ideas become");
  await expect(page.getByRole("heading", { name: "Contract system development" })).toBeVisible();
  await page.getByRole("link", { name: /Open DMIT Fingerprint System case terminal/ }).click();
  await expect(page.getByRole("heading", { name: "Architecture" })).toBeVisible();
  await context.close();
});
