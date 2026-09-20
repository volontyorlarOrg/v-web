import { createServer } from "node:http";

const host = "127.0.0.1";
const port = 3213;

const profile = {
  displayName: "Aziza Karimova",
  username: "aziza_uz",
  avatarUrl: null,
  bio: "Toshkentdagi taʼlim va ekologiya loyihalarida volontyorlik qilaman.",
  region: "tashkent-city",
  languages: ["uz", "ru", "en"],
  links: ["https://example.com/aziza"],
  level: "active",
  xp: 780,
  stats: { attendedEvents: 12, confirmedHours: 48 },
};

createServer((request, response) => {
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
