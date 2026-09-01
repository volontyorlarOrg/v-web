import { expect, test, type Page } from "@playwright/test";

const LOCALES = ["uz", "ru", "en"] as const;

async function isMobile(page: Page) {
  return (page.viewportSize()?.width ?? 1280) < 1024;
}

async function openNavigation(page: Page) {
  if (await isMobile(page)) {
    await page.getByRole("button", { name: /menu/i }).click();
  }
}

test.describe("locale routing", () => {
  for (const locale of LOCALES) {
    test(`the ${locale} home page renders in ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    });
  }

  test("the prefix-less root redirects to a locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(uz|ru|en)$/);
  });

  test("switching language keeps the same page", async ({ page }) => {
    await page.goto("/uz/partners");
    const footer = page.getByRole("contentinfo");
    await footer.getByRole("link", { name: "ru", exact: true }).click();
    await expect(page).toHaveURL(/\/ru\/partners$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");

    await footer.getByRole("link", { name: "en", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/partners$/);
  });

  test("every page declares a canonical URL and three hreflang alternates", async ({ page }) => {
    await page.goto("/en/about");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    for (const locale of LOCALES) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${locale}"]`)).toHaveCount(1);
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });
});

test.describe("navigation", () => {
  test("reaches the main pages from the header", async ({ page }) => {
    await page.goto("/en");
    await openNavigation(page);
    await page.getByRole("banner").getByRole("link", { name: "Volunteering" }).click();
    await expect(page).toHaveURL(/\/en\/volunteering$/);

    await openNavigation(page);
    await page.getByRole("banner").getByRole("link", { name: "Partners" }).click();
    await expect(page).toHaveURL(/\/en\/partners$/);
  });

  test("the legal pages load from the footer", async ({ page }) => {
    await page.goto("/en");
    const footer = page.getByRole("contentinfo");
    await footer.getByRole("link", { name: "Privacy" }).click();
    await expect(page).toHaveURL(/\/en\/privacy$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.getByRole("contentinfo").getByRole("link", { name: "Terms" }).click();
    await expect(page).toHaveURL(/\/en\/terms$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("the join call to action stays on a verified destination", async ({ page }) => {
    await page.goto("/en");
    const cta = page.getByRole("main").getByRole("link", { name: "Join the community" }).first();
    const href = await cta.getAttribute("href");
    expect(href).toBe("/en/contact");
  });
});

test.describe("production information architecture", () => {
  for (const path of ["/v1", "/v2", "/v3", "/uz/v3"]) {
    test(`${path} is not a public route`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
    });
  }

  test("no navigation link points at an exploration route", async ({ page }) => {
    await page.goto("/uz");
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );
    expect(hrefs.length).toBeGreaterThan(5);
    expect(hrefs.filter((href) => /\/v[123](\/|$)/.test(href))).toEqual([]);
  });

  test("an unknown URL returns a 404 page", async ({ page }) => {
    const response = await page.goto("/uz/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("nothing overflows horizontally", async ({ page }) => {
    await page.goto("/uz");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("mobile menu", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 1280) >= 1024, "desktop shows inline navigation");

  test("opens and closes by touch", async ({ page }) => {
    await page.goto("/en");
    const trigger = page.getByRole("button", { name: /menu/i });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.tap();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("banner").getByRole("link", { name: "About" })).toBeVisible();

    await trigger.tap();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("opens and closes from the keyboard", async ({ page }) => {
    await page.goto("/en");
    const trigger = page.getByRole("button", { name: /menu/i });

    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });
});
