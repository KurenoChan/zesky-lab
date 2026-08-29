import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

test("has no automatically detectable critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(({ impact }) => impact === "critical")).toEqual([]);
});

test("shows the project not-found experience", async ({ page }) => {
  await page.goto("/projects/not-a-project");
  await expect(page.getByRole("heading", { name: "Signal lost." })).toBeVisible();
});
