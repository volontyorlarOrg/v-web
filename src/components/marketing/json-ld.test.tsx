import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JsonLd } from "@/components/marketing/json-ld";

describe("JsonLd", () => {
  it("renders one parseable JSON-LD object per script", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      description: "Volunteering in Uzbekistan",
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    expect(JSON.parse(script?.textContent ?? "null")).toEqual(data);
  });

  it("escapes markup without changing the parsed value", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Thing",
      description: "</script><script>alert(1)</script>",
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.innerHTML).not.toContain("<");
    expect(JSON.parse(script?.textContent ?? "null")).toEqual(data);
  });
});
