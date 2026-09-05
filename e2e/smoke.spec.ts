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
    const header = page.getByRole("banner");
    await header.getByRole("button", { name: /Til: O‘zbekcha/ }).click();
    await header.getByRole("link", { name: "Русский", exact: true }).click();
    await expect(page).toHaveURL(/\/ru\/partners$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");

    await header.getByRole("button", { name: /Язык: Русский/ }).click();
    await header.getByRole("link", { name: "English", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/partners$/);
  });

  test("every page declares canonical, alternate, and social URLs", async ({ page }) => {
    await page.goto("/en/about");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    for (const locale of LOCALES) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${locale}"]`)).toHaveCount(1);
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "http://localhost:3000/opengraph-image.png",
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      "http://localhost:3000/opengraph-image.png",
    );

    const socialImage = await page.request.get("/opengraph-image.png");
    expect(socialImage.status()).toBe(200);
    expect(socialImage.headers()["content-type"]).toBe("image/png");
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
  for (const path of ["/v1", "/v2", "/v3", "/uz/v3", "/en/course"]) {
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
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("nothing overflows horizontally", async ({ page }) => {
    await page.goto("/uz");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("plain HTTP keeps transport-only headers disabled", async ({ page }) => {
    const response = await page.goto("/en");
    const headers = response?.headers() ?? {};

    expect(headers["content-security-policy"]).not.toContain("upgrade-insecure-requests");
    expect(headers["strict-transport-security"]).toBeUndefined();
    expect(headers["x-content-type-options"]).toBe("nosniff");
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

test.describe("the hero map", () => {
  test("renders a plan-view map and every region name without JavaScript", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/en");

    const section = page.locator("#hero-map");
    await expect(section).toHaveCount(1);

    await expect(section.locator("svg")).toHaveCount(1);
    await expect(section.locator("svg path")).toHaveCount(14);
    await expect(section.locator("li")).toHaveCount(14);

    await context.close();
  });

  for (const [locale, name] of [
    ["uz", "Qoraqalpogʻiston"],
    ["ru", "Каракалпакстан"],
    ["en", "Karakalpakstan"],
  ] as const) {
    test(`names the regions in ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("#hero-map li").filter({ hasText: name })).toHaveCount(1);
      await expect(page.locator("#hero-map li")).toHaveCount(14);
    });
  }

  test("pins a panel that releases into the next section", async ({ page }) => {
    await page.goto("/en");
    await page.waitForFunction(
      () => {
        const panel = document.querySelector("#hero-map")?.firstElementChild;
        return Boolean(panel) && getComputedStyle(panel!).position === "sticky";
      },
      null,
      { timeout: 15_000 },
    );

    const geometry = await page.evaluate(() => {
      const section = document.querySelector("#hero-map") as HTMLElement;
      const panel = section.firstElementChild as HTMLElement;
      return {
        sectionHeight: section.offsetHeight,
        panelHeight: panel.offsetHeight,
        panelPosition: getComputedStyle(panel).position,
        viewport: window.innerHeight,
      };
    });

    expect(geometry.panelPosition).toBe("sticky");
    expect(geometry.sectionHeight).toBeGreaterThan(geometry.panelHeight);
    expect(geometry.panelHeight).toBeLessThanOrEqual(geometry.viewport);
  });

  test("renders a complete non-pinned state with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");

    const state = await page.evaluate(() => {
      const panel = document.querySelector("#hero-map")?.firstElementChild as HTMLElement;
      const hiddenScenes = [...document.querySelectorAll<HTMLElement>("[data-scene]")].filter(
        (element) => getComputedStyle(element).opacity === "0",
      );
      const duplicateMarquee = document.querySelector<HTMLElement>(
        '.marquee-track[aria-hidden="true"]',
      );

      return {
        duplicateMarqueeDisplay: duplicateMarquee
          ? getComputedStyle(duplicateMarquee).display
          : null,
        hiddenSceneCount: hiddenScenes.length,
        motionEnabled: document.documentElement.hasAttribute("data-motion"),
        panelPosition: getComputedStyle(panel).position,
      };
    });

    expect(state).toEqual({
      duplicateMarqueeDisplay: "none",
      hiddenSceneCount: 0,
      motionEnabled: false,
      panelPosition: "relative",
    });
  });

  test("keeps the page's only h1 in the hero above the map", async ({ page }) => {
    await page.goto("/en");
    const hero = page.locator("#hero-map");
    await expect(hero.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(
      hero.getByRole("heading", { level: 2, name: /growing across Uzbekistan/i }),
    ).toHaveCount(1);
  });

  test("the hero call to action stays reachable at rest", async ({ page }) => {
    await page.goto("/en");
    const cta = page.locator("#hero-map").getByRole("link", { name: "Become a volunteer" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/en/contact");
  });

  test("offers no sign-in link while the product application has no origin", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(page.locator("#hero-map").getByRole("link", { name: "Log in" })).toHaveCount(0);
  });
});
