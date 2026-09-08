import type { Metadata } from "next";

const BING_META_NAME = "msvalidate.01";

const TOKEN_PATTERN = /^[A-Za-z0-9_.=-]{8,128}$/;

export function isVerificationToken(value: string): boolean {
  return TOKEN_PATTERN.test(value);
}

function readToken(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw || !isVerificationToken(raw)) return null;
  return raw;
}

export function searchEngineVerification(): Metadata["verification"] {
  const google = readToken(process.env.GOOGLE_SITE_VERIFICATION);
  const yandex = readToken(process.env.YANDEX_VERIFICATION);
  const bing = readToken(process.env.BING_SITE_VERIFICATION);

  if (!google && !yandex && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(bing ? { other: { [BING_META_NAME]: bing } } : {}),
  };
}
