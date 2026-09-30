import { createServer } from "node:http";

const host = "127.0.0.1";
const port = 3213;

const profile = {
  displayName: "Aziza Karimova",
  username: "aziza_uz",
  avatarUrl: null,
  bio: "Toshkentdagi taʼlim va ekologiya loyihalarida volontyorlik qilaman.",
  region: "tashkent-city",
  city: "Tashkent",
  school: "School 110",
  gradeYear: "11",
  languages: ["uz", "ru", "en"],
  phone: "+998901234567",
  telegram: "aziza_volunteer",
  instagram: "aziza.volunteers",
  linkedin: "https://www.linkedin.com/in/aziza-karimova",
  links: ["https://example.com/aziza"],
  joinedAt: "2025-09-01T09:30:00.000Z",
  level: "active",
  xp: 780,
  stats: { attendedEvents: 12, confirmedHours: 48 },
};

const COVER_ID = "5cb6dab6-dfba-480b-8f88-e78301aebe21";
const PIXEL = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

const articles = [
  {
    slug: "riverbank-clean-up",
    contentLocale: "en",
    title: "A day at the riverbank clean-up",
    summary: "Forty volunteers, two tonnes of litter and one very muddy afternoon.",
    coverUrl: `/public/blog/media/${COVER_ID}/lg`,
    coverAlt: "Volunteers carrying bags along the riverbank",
    publishedAt: "2026-09-28T12:00:00.000Z",
  },
  {
    slug: "birinchi-imkoniyat",
    contentLocale: "uz",
    title: "Birinchi volontyorlik imkoniyatini qanday tanlash kerak",
    summary: "Yaqin atrofingizdagi imkoniyatlarni qanday topish haqida qisqacha.",
    coverUrl: null,
    coverAlt: "",
    publishedAt: "2026-09-20T09:00:00.000Z",
  },
  {
    slug: "school-club",
    contentLocale: "en",
    title: "Starting a volunteering club at school",
    summary: "",
    coverUrl: null,
    coverAlt: "",
    publishedAt: "2026-09-12T09:00:00.000Z",
  },
];

function listItem(article, locale) {
  return {
    ...article,
    requestedLocale: locale,
    availableLocales: [article.contentLocale],
  };
}

function json(response, body) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${host}:${port}`);
  const locale = url.searchParams.get("locale") ?? "uz";
  if (url.pathname === "/public/blog") {
    json(response, {
      items: articles.map((article) => listItem(article, locale)),
      page: 1,
      pageSize: 12,
      total: articles.length,
    });
    return;
  }
  const media = /^\/public\/blog\/media\/([a-f0-9-]{36})\/(sm|md|lg)$/.exec(url.pathname);
  if (media && media[1] === COVER_ID) {
    response.writeHead(200, { "Content-Type": "image/png" });
    response.end(PIXEL);
    return;
  }
  const article = articles.find(
    (candidate) => url.pathname === `/public/blog/${candidate.slug}`,
  );
  if (article) {
    json(response, {
      ...listItem(article, locale),
      body: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "We met at nine by the bridge." }],
          },
        ],
      },
      coverMediaId: article.coverUrl ? COVER_ID : null,
      coverCaption: "",
      coverCredit: "",
      seoDescription: "",
      authorName: "Volontyorlar",
    });
    return;
  }
  if (request.url === "/health") {
    response.writeHead(200).end("ok");
    return;
  }
  if (request.url === "/public/profiles/aziza_uz") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(profile));
    return;
  }
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Not found" }));
}).listen(port, host);
