import { describe, expect, it } from "vitest";

import { contentSecurityPolicy, securityHeaders } from "@/lib/security/headers";

const find = (secureTransport: boolean, key: string) =>
  securityHeaders({ secureTransport }).find((header) => header.key === key);

describe("security headers", () => {
  it("locks the same origins down however the site is served", () => {
    for (const secureTransport of [true, false]) {
      const policy = contentSecurityPolicy({ secureTransport });
      expect(policy).toContain("default-src 'self'");
      expect(policy).toContain("object-src 'none'");
      expect(policy).toContain("frame-ancestors 'none'");
      expect(policy).toContain("form-action 'self'");
      expect(policy).toContain("img-src 'self' data:");
      expect(find(secureTransport, "X-Frame-Options")?.value).toBe("DENY");
      expect(find(secureTransport, "X-Content-Type-Options")?.value).toBe("nosniff");
    }
  });

  it("upgrades insecure requests only where there is TLS to upgrade to", () => {
    expect(contentSecurityPolicy({ secureTransport: true })).toContain(
      "upgrade-insecure-requests",
    );
    expect(contentSecurityPolicy({ secureTransport: false })).not.toContain(
      "upgrade-insecure-requests",
    );
  });

  it("sends HSTS only over a secure transport", () => {
    expect(find(true, "Strict-Transport-Security")?.value).toContain("max-age=63072000");
    expect(find(false, "Strict-Transport-Security")).toBeUndefined();
  });

  it("never sends a directive that would break a plain-HTTP origin", () => {
    const policy = contentSecurityPolicy({ secureTransport: false });
    expect(policy).not.toMatch(/upgrade-insecure-requests|block-all-mixed-content/);
  });
});
