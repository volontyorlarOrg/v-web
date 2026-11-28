import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  preferenceCookie,
  readPreferenceCookie,
  sharedCookieDomain,
} from "@/lib/preferences";

describe("sharedCookieDomain", () => {
  it("covers a site and its app subdomain", () => {
    expect(sharedCookieDomain(["volontyorlar.uz", "app.volontyorlar.uz"])).toBe(
      ".volontyorlar.uz",
    );
  });

  it("does not scope a cookie when both origins are the same host", () => {
    expect(sharedCookieDomain(["localhost", "localhost"])).toBeUndefined();
  });

  it("ignores an origin that is not configured", () => {
    expect(sharedCookieDomain(["volontyorlar.uz", null])).toBeUndefined();
  });

  it("refuses a public suffix when the origins share no registrable domain", () => {
    expect(
      sharedCookieDomain(["volontyorlar.uz", "volontyorlar-app.uz"]),
    ).toBeUndefined();
  });

  it("matches only on whole labels", () => {
    expect(
      sharedCookieDomain(["notvolontyorlar.uz", "app.volontyorlar.uz"]),
    ).toBeUndefined();
  });

  it("finds the domain shared by more than two origins", () => {
    expect(
      sharedCookieDomain([
        "volontyorlar.uz",
        "app.volontyorlar.uz",
        "admin.volontyorlar.uz",
      ]),
    ).toBe(".volontyorlar.uz");
  });
});

describe("shared preference cookies", () => {
  const NAME = "volontyorlar_test";

  beforeEach(() => {
    document.cookie = `${NAME}=; path=/; max-age=0`;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("writes a root-path cookie that a sibling origin can read", () => {
    const cookie = preferenceCookie(NAME, "on");
    expect(cookie).toContain(`${NAME}=on`);
    expect(cookie).toContain("path=/");
    expect(cookie).toContain("samesite=lax");
  });

  it("reads back a value written to the cookie", () => {
    document.cookie = `${NAME}=on; path=/`;
    expect(readPreferenceCookie(NAME)).toBe("on");
  });
});
