import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) =>
    ({ home: "Home", partners: "Partners" })[key] ?? key,
}));

describe("PageBreadcrumbJsonLd", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org");
  });

  it("builds the standard home-to-page breadcrumb", () => {
    const { container } = render(
      <PageBreadcrumbJsonLd locale="en" route="partners" />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.textContent ?? "null");

    expect(data.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://example.org/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Partners",
        item: "https://example.org/en/partners",
      },
    ]);
  });
});
