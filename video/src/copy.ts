export const SITE_URL_LABEL = "";

export const BROWSER_LABEL = SITE_URL_LABEL || "Volontyorlar";

export const ORG = {
  name: "Volontyorlar",
  foundedOn: "2025-06-04",
} as const;

export const TRACTION = {
  telegramFollowers: 3600,
  eventsSupplied: 50,
  regionalRoleApplications: 500,
  targetRegionCount: 14,
} as const;

export const OPPORTUNITY_SOURCES = [
  "Yashil Qo‘llar",
  "Youth Run Club",
  "Youth for Good",
  "Youth Grants",
  "Relay Fellowship",
] as const;

export const site = {
  heroTitle: "There’s work to be done. Find where you can make yourself useful.",
  heroLead: "We speak with organisers before sharing an opportunity with the community.",
  heroPrimaryCta: "Become a volunteer",
  heroLoginCta: "Log in",
  heroEyebrow: "Volunteering in",
  navItems: ["Volunteering", "Partners", "About", "Contact"],
  howEyebrow: "How it works",
  howTitle: "Four steps between an event and a volunteer",
  howSteps: [
    { title: "We find it", description: "We look for opportunities and bring in events." },
    { title: "We check it", description: "We ask the organiser what the event actually needs." },
    { title: "We share it", description: "The opportunity goes out to the community." },
    { title: "You volunteer", description: "You take part in the event." },
  ],
  statsEyebrow: "Where we are now",
  statsTitle: "The work so far",
  stats: [
    { value: TRACTION.telegramFollowers, suffix: "", label: "Telegram community" },
    { value: TRACTION.eventsSupplied, suffix: "", label: "Events supplied with volunteers" },
    { value: TRACTION.regionalRoleApplications, suffix: "", label: "Applications for regional roles" },
    { value: TRACTION.targetRegionCount, suffix: "", label: "Regions we are expanding to" },
  ],
} as const;

export const REGIONS = [
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Fergana",
  "Andijan",
  "Namangan",
] as const;

export const captions = {
  open: "Volunteering for young people in Uzbekistan",
  landing: "It starts on the website",
  how: "We do the work behind the event",
  login: "One account, one tap",
  discover: "Opportunities, already checked",
  apply: "Applying takes a minute",
  confirmed: "Your place is confirmed",
} as const;

export const app = {
  loginTitle: "Log in",
  loginLead: "We send a code. No password to remember.",
  phoneLabel: "Phone number",
  phoneValue: "+998 90 123 45 67",
  continueCta: "Send me a code",
  codeTitle: "Enter your code",
  codeLead: "Sent to +998 90 123 45 67",
  code: "418602",
  discoverTitle: "Open opportunities",
  filterAll: "All regions",
  applyCta: "Apply",
  applyingCta: "Applying…",
  appliedCta: "Applied",
  requirementsTitle: "What the organiser asked for",
  confirmTitle: "You’re going.",
  confirmLead: "The organiser has your name. We’ll send the details the day before.",
} as const;

export const OPPORTUNITIES = [
  {
    id: "riverbank",
    title: "Riverbank clean-up",
    organiser: "Yashil Qo‘llar",
    region: "Tashkent",
    date: "Sat 14 Mar",
    slots: 12,
    needed: 4,
  },
  {
    id: "run",
    title: "City run — water stations",
    organiser: "Youth Run Club",
    region: "Samarkand",
    date: "Sun 15 Mar",
    slots: 30,
    needed: 9,
  },
  {
    id: "library",
    title: "Reading hour for children",
    organiser: "Youth for Good",
    region: "Bukhara",
    date: "Wed 18 Mar",
    slots: 8,
    needed: 2,
  },
] as const;

export const REQUIREMENTS = [
  "Be at Chorsu gate by 08:30",
  "Gloves and bags are provided",
  "Roughly four hours, finishing by 13:00",
] as const;

export const outro = {
  title: "Find where you can make yourself useful.",
  cta: "Join the community",
} as const;
