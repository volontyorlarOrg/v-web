import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/routing";
import { formatCount } from "@/lib/format";

describe("formatCount", () => {
  it("groups thousands with a no-break space in Uzbek and Russian", () => {
    expect(formatCount(3600, "uz")).toBe("3\u00a0600");
    expect(formatCount(3600, "ru")).toBe("3\u00a0600");
  });

  it("groups thousands with a comma in English", () => {
    expect(formatCount(3600, "en")).toBe("3,600");
  });

  it("never follows the runtime's Uzbek grouping, which Node and browsers disagree on", () => {
    expect(["3\u00a0600", "3,600"]).toContain(new Intl.NumberFormat("uz").format(3600));
    expect(formatCount(3600, "uz")).toBe("3\u00a0600");
  });

  it("leaves a number below a thousand ungrouped", () => {
    expect(formatCount(500, "uz")).toBe("500");
    expect(formatCount(14, "en")).toBe("14");
    expect(formatCount(0, "ru")).toBe("0");
  });

  it("separates every group of three digits", () => {
    expect(formatCount(1234567, "en")).toBe("1,234,567");
    expect(formatCount(1000, "uz")).toBe("1\u00a0000");
  });

  it("gives every locale a separator", () => {
    for (const locale of locales) {
      expect(formatCount(1000, locale)).not.toBe("1000");
    }
  });

  it("rounds a fractional count and keeps a negative one signed", () => {
    expect(formatCount(1499.6, "en")).toBe("1,500");
    expect(formatCount(-2500, "en")).toBe("-2,500");
  });
});
