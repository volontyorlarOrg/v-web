import { beforeEach, describe, expect, it, vi } from "vitest";

import { FOUNDERS } from "@/lib/content/org";
import { organizationJsonLd } from "@/lib/seo/json-ld";

function organization() {
  return organizationJsonLd({
    locale: "en",
    name: "Volontyorlar",
    description: "Volunteering for young people in Uzbekistan.",
    founderJobTitles: { ceo: "Co-founder & CEO", cto: "Co-founder & CTO" },
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

  it("gives each founder their own title, not one shared across both", () => {
    const founders = organization().founder as ReadonlyArray<Record<string, string>>;

    for (const founder of founders) {
      expect(founder["@type"]).toBe("Person");
    }

    expect(founders.map((founder) => [founder.name, founder.jobTitle])).toEqual([
      ["Arslon Rajabov", "Co-founder & CEO"],
      ["Abdulaziz Yusupaliev", "Co-founder & CTO"],
    ]);
  });

  it("anchors the organisation to the canonical home URL", () => {
    const result = organization();

    expect(result["@id"]).toBe("https://example.org/en#organization");
    expect(result.url).toBe("https://example.org/en");
  });
});
