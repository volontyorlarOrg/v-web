export type ChannelId = "telegram" | "instagram";

export type ConfiguredChannel = {
  id: ChannelId;
  url: string;
};

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

export const OFFICIAL_LINKS = {
  telegramChannel: "https://t.me/yvc_uz",
  telegramAdmin: "https://t.me/yvc_admin",
  telegramBot: "https://t.me/volontyor_uz_bot",
  instagram: "https://www.instagram.com/yvc.uz/",
} as const;

export function officialChannelUrl(id: ChannelId): string {
  return channelUrl(id) ?? (id === "telegram" ? OFFICIAL_LINKS.telegramChannel : OFFICIAL_LINKS.instagram);
}

export function configuredChannels(): ConfiguredChannel[] {
  return (["telegram", "instagram"] as const).flatMap((id) => {
    const url = channelUrl(id);
    return url ? [{ id, url }] : [];
  });
}

export function verifiedSocialUrls(): string[] {
  return configuredChannels().map((channel) => channel.url);
}
