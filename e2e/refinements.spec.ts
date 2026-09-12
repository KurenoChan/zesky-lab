import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("zesky-lab-intro", "seen"));
});

test("chapter numbers are centered and captions sit outside the circles", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const measurements = await page.locator('.chapter-art').evaluateAll(elements => elements.map(el => {
    const orbit = el.querySelector('.chapter-orbit')!.getBoundingClientRect();
    const number = el.querySelector('.chapter-number')!.getBoundingClientRect();
    const caption = el.querySelector('.chapter-caption')!.getBoundingClientRect();
    return { x: number.x + number.width / 2 - orbit.x - orbit.width / 2, y: number.y + number.height / 2 - orbit.y - orbit.height / 2, gap: caption.top - orbit.bottom };
  }));
  for (const value of measurements) { expect(Math.abs(value.x)).toBeLessThan(1); expect(Math.abs(value.y)).toBeLessThan(1); expect(value.gap).toBeGreaterThan(15); }
});

test("future destinations distinguish portfolio and studio, with honest locked actions", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole('heading', { name: 'Zesky LabGround' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Kisora Studio' })).toBeVisible();
  for (const card of ['.destination-labground', '.destination-kisora']) {
    await expect(page.locator(card).getByRole('button', { name: 'Coming soon' })).toBeDisabled();
    await page.locator(card).locator('summary').click();
    await expect(page.locator(card).locator('details')).toHaveAttribute('open', '');
  }
  await expect(page.locator('.destination-labground details')).toContainText('reuse this portfolio');
  await expect(page.locator('.destination-kisora details')).toContainText('separate studio product');
  await expect(page.locator('.portrait-frame')).toBeVisible();
});

test("contact preview retains entered text without submitting", async ({ page }) => {
  await page.goto('/#contact');
  const form = page.getByRole('form', { name: 'Contact form preview' });
  await form.getByLabel('Your name').fill('Preview visitor');
  await form.getByLabel('Email address').fill('preview@example.com');
  await form.getByLabel('What are you thinking?').fill('Local UI test only.');
  const requests: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') requests.push(request.url()); });
  await form.getByRole('button', { name: "Let's connect" }).click();
  await expect(form.getByLabel('Your name')).toHaveValue('Preview visitor');
  await expect(page).toHaveURL(/#contact$/);
  expect(requests).toEqual([]);
});

test("project gallery supports thumbnails, keyboard, and enlargement", async ({ page }) => {
  await page.goto('/projects/dmit-frontend-web');
  await page.getByRole('button', { name: 'Show Guided image browser' }).click();
  await expect(page.getByRole('button', { name: 'Show Guided image browser' })).toHaveAttribute('aria-pressed', 'true');
  const viewer = page.getByRole('group', { name: 'Screenshot viewer' });
  await viewer.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: 'Show Hardware bridge onboarding' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Enlarge screenshot' }).click();
  await expect(page.getByRole('dialog', { name: 'Hardware bridge onboarding' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Enlarge screenshot' })).toBeFocused();
});

test("live project frame is opt-in and can close without leaving the case study", async ({ page }) => {
  // Stub the remote app so regression tests neither depend on nor interact with its backend.
  await page.route('https://dmit-frontend-web.vercel.app/**', route => route.fulfill({ contentType: 'text/html', body: '<h1>External preview test fixture</h1>' }));
  await page.goto('/projects/dmit-frontend-web');
  await expect(page.locator('.preview-terminal iframe')).toHaveCount(0);
  await page.getByRole('button', { name: 'Launch live preview' }).click();
  await expect(page.locator('.preview-terminal iframe')).toHaveAttribute('src', 'https://dmit-frontend-web.vercel.app/');
  await expect(page.frameLocator('.preview-terminal iframe').getByRole('heading')).toContainText('External preview test fixture');
  await page.getByRole('button', { name: 'Close project preview' }).click();
  await expect(page.locator('.preview-terminal iframe')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Launch live preview' })).toBeFocused();
});
