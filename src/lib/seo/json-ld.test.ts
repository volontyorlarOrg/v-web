import { beforeEach, describe, expect, it, vi } from "vitest";

import { FOUNDERS } from "@/lib/content/org";
import { organizationJsonLd } from "@/lib/seo/json-ld";

function organization() {
  return organizationJsonLd({
    locale: "en",
    name: "Volontyorlar",
    description: "Volunteering for young people in Uzbekistan.",
    founderJobTitle: "Co-founder & CEO",
  });
}

describe("organizationJsonLd", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org");
  });

  it("names every founder recorded in the verified facts", () => {
    const founders = organization().founder as ReadonlyArray<Record<string, string>>;

    expect(founders.map((founder) => founder.name)).toEqual(
      FOUNDERS.map((founder) => founder.name),
    );
  });

  it("gives each founder the title the page carries, not a bare Person", () => {
    const founders = organization().founder as ReadonlyArray<Record<string, string>>;

    for (const founder of founders) {
      expect(founder["@type"]).toBe("Person");
      expect(founder.jobTitle).toBe("Co-founder & CEO");
    }
  });

  it("anchors the organisation to the canonical home URL", () => {
    const result = organization();

    expect(result["@id"]).toBe("https://example.org/en#organization");
    expect(result.url).toBe("https://example.org/en");
  });
});
