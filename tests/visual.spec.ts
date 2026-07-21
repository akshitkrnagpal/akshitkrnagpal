import { expect, test } from "@playwright/test";

const pages = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small-mobile", width: 320, height: 568 },
] as const;

for (const pageCase of pages) {
  for (const viewport of viewports) {
    test(`${pageCase.name} remains visually stable at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(pageCase.path);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        [...document.images].forEach((image) => {
          image.loading = "eager";
        });
        for (let offset = 0; offset < document.documentElement.scrollHeight; offset += window.innerHeight) {
          window.scrollTo(0, offset);
          await new Promise((resolve) => window.setTimeout(resolve, 30));
        }
        window.scrollTo(0, 0);
        await new Promise((resolve) => window.setTimeout(resolve, 250));
      });

      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images]
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
      }));

      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
      expect(layout.brokenImages).toEqual([]);
      await expect(page).toHaveScreenshot(`${pageCase.name}-${viewport.name}.png`, {
        animations: "disabled",
        fullPage: true,
        mask: [page.locator(".stars")],
        maskColor: "#e7d7c1",
        maxDiffPixelRatio: 0.01,
      });
    });
  }
}

test("keyboard users can reveal and use the skip link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();

  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("external links disclose their new-tab behavior", async ({ page }) => {
  await page.goto("/projects");

  const externalLinks = page.locator('main a[target="_blank"]');
  await expect(externalLinks).not.toHaveCount(0);

  const count = await externalLinks.count();
  for (let index = 0; index < count; index += 1) {
    const link = externalLinks.nth(index);
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAccessibleName(/opens in a new tab/i);
  }
});
