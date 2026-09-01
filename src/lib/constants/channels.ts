export type ChannelId = "telegram" | "instagram";

function readUrl(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function channelUrl(id: ChannelId): string | null {
  switch (id) {
    case "telegram":
      return readUrl(process.env.NEXT_PUBLIC_TELEGRAM_URL);
    case "instagram":
      return readUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL);
  }
}

export function availableChannels(): ChannelId[] {
  return (["telegram", "instagram"] as const).filter(
    (id) => channelUrl(id) !== null,
  );
}

export function verifiedSocialUrls(): string[] {
  return availableChannels()
    .map((id) => channelUrl(id))
    .filter((url): url is string => url !== null);
}
