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
  pastEvents: [
    {
      id: "event-1",
      title: "Community cleanup",
      organization: "Community Foundation",
      eventDate: "2026-09-20",
      hours: 4.5,
      xpAwarded: 80,
      countsTowardProgress: true,
    },
  ],
  activity: [
    {
      id: "attendance-1",
      source: "attendance",
      kind: "volunteering",
      title: "Riverside tree planting",
      organization: "Green City",
      eventDate: "2026-09-27",
      hours: 3,
      placement: null,
      xpAwarded: 30,
      countsTowardProgress: true,
    },
    {
      id: "event-1",
      source: "manual",
      kind: "volunteering",
      title: "Community cleanup",
      organization: "Community Foundation",
      eventDate: "2026-09-20",
      hours: 4.5,
      placement: null,
      xpAwarded: 80,
      countsTowardProgress: true,
    },
  ],
};

const reserved = {
  ...profile,
  displayName: "Sardor Aliyev",
  username: "sardor_uz",
  region: null,
  city: "",
  school: "",
  gradeYear: "",
  languages: [],
  phone: "",
  telegram: "",
  instagram: "",
  linkedin: "",
  links: [],
  joinedAt: null,
  pastEvents: [],
  activity: [],
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
  if (request.url === "/public/profiles/sardor_uz") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(reserved));
    return;
  }
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Not found" }));
}).listen(port, host);
