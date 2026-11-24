export function googleTagManagerId(): string | undefined {
  const id = process.env.GOOGLE_TAG_MANAGER_ID?.trim();
  return id && /^GTM-[A-Z0-9]+$/.test(id) ? id : undefined;
}
