import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Clock3,
  FileText,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Bricolage_Grotesque, Manrope } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Volontyorlar — every hour counts",
  description:
    "A mobile-first concept for finding volunteer opportunities and keeping a confirmed record of showing up.",
  openGraph: {
    title: "Volontyorlar — V3 concept preview",
    description:
      "A planned concept for discovering opportunities, applying from a reusable profile, and keeping confirmed volunteer hours.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const opportunities = [
  {
    category: "Environment",
    region: "Tashkent",
    title: "Tree planting at the botanical garden",
    schedule: "Saturday · 09:00 · 5 hours",
    note: "Illustrative listing · 12 sample places",
    featured: true,
  },
  {
    category: "Education",
    region: "Samarkand",
    title: "Reading hour with primary pupils",
    schedule: "Sunday · 11:00 · 3 hours",
    note: "Illustrative listing",
    featured: false,
  },
  {
    category: "Community",
    region: "Namangan",
    title: "Neighbourhood clean-up crew",
    schedule: "Sunday · 08:00 · 4 hours",
    note: "Illustrative listing",
    featured: false,
  },
] as const;

const levels = [
  { name: "Newcomer", requirement: "Joined", reached: true },
  { name: "Active", requirement: "3 events", reached: true },
  { name: "Trusted", requirement: "8 events · 85%", reached: false },
  { name: "Core", requirement: "20 events · 90% + reviews", reached: false },
] as const;

const tokens = {
  "--v3-bg": "#071719",
  "--v3-field": "#0D2529",
  "--v3-panel": "#123438",
  "--v3-panel-strong": "#174147",
  "--v3-line": "#285158",
  "--v3-text": "#F4FBFB",
  "--v3-muted": "#A8C0C2",
  "--v3-teal": "#45C1C4",
  "--v3-teal-dark": "#082326",
  "--v3-amber": "#F3A94A",
} as CSSProperties;

export default function V3() {
  return (
    <div
      id="top"
      className={`${display.variable} ${body.variable} v3-root min-h-screen overflow-x-hidden bg-(--v3-bg) font-(family-name:--font-body) text-(--v3-text)`}
      style={tokens}
    >
      <style>{`
        .v3-root { color-scheme: dark; }
        .v3-root ::selection { background: #45c1c4; color: #071719; }
        .v3-root :focus-visible { outline: 3px solid #45c1c4; outline-offset: 4px; }
        .v3-root { scrollbar-color: #45c1c4 #0d2529; scrollbar-width: thin; }
        .v3-signal { animation: v3-signal 4.6s cubic-bezier(.16,1,.3,1) infinite; }
        .v3-pulse { animation: v3-pulse 3.2s cubic-bezier(.16,1,.3,1) infinite; }
        .v3-stage { animation: v3-stage .7s cubic-bezier(.16,1,.3,1) both; }
        .v3-stage:nth-child(2) { animation-delay: 120ms; }
        .v3-stage:nth-child(3) { animation-delay: 240ms; }
        @keyframes v3-signal {
          0%, 12% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          72% { opacity: 1; }
          88%, 100% { transform: translateY(278px); opacity: 0; }
        }
        @keyframes v3-pulse {
          0%, 70%, 100% { box-shadow: 0 0 0 0 rgba(69,193,196,0); }
          78% { box-shadow: 0 0 0 10px rgba(69,193,196,.10); }
        }
        @keyframes v3-stage {
          from { opacity: .45; filter: blur(5px); transform: translateY(10px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-root { scroll-behavior: auto; }
          .v3-signal, .v3-pulse, .v3-stage { animation: none; }
        }
      `}</style>

      <header className="relative z-30 border-b border-white/8 bg-(--v3-bg)/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#top" aria-label="Volontyorlar home" className="rounded-md">
            <Image
              src="/logo/volontyorlar-horizontal.svg"
              alt="Volontyorlar"
              width={540}
              height={128}
              priority
              className="h-auto w-40 sm:w-48"
            />
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm font-semibold">
            <a className="hidden text-(--v3-muted) transition-colors hover:text-(--v3-text) sm:block" href="#record">
              Your record
            </a>
            <a
              href="#journey"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-(--v3-teal) px-4 text-(--v3-teal-dark) transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#62D1D3] active:translate-y-0"
            >
              See the journey
              <ArrowDownRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative isolate border-b border-white/8">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[88%] w-full text-(--v3-teal) opacity-[.035]"
          >
            <defs>
              <pattern
                id="v3-signal-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M32 0H0V32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#v3-signal-grid)" />
          </svg>
          <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.04fr_.96fr] lg:py-20">
            <div className="max-w-3xl">
              <p className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-(--v3-muted)">
                <span className="size-2 rounded-full bg-(--v3-teal) shadow-[0_0_0_6px_rgba(69,193,196,.1)]" />
                Concept preview · no live sign-in yet
              </p>
              <h1 className="max-w-[15ch] font-(family-name:--font-display) text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[.94] tracking-[-.04em] text-balance">
                Your hours should remember you.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-(--v3-muted) text-pretty sm:text-xl">
                Volontyorlar is planned as one place to find an opportunity,
                apply from a reusable profile, and keep a confirmed record of
                every time you showed up.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#journey"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-(--v3-teal) px-6 font-extrabold text-(--v3-teal-dark) transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#62D1D3] active:translate-y-0"
                >
                  Follow one opportunity
                  <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2.2} />
                </a>
                <a
                  href="#launch"
                  className="inline-flex min-h-13 items-center justify-center rounded-xl border border-(--v3-line) px-6 font-bold text-(--v3-text) transition-colors hover:border-(--v3-teal) hover:bg-(--v3-field)"
                >
                  Read the launch target
                </a>
              </div>
            </div>

            <div id="journey" className="relative mx-auto w-full max-w-xl scroll-mt-24">
              <div aria-hidden="true" className="absolute bottom-16 left-7 top-16 w-px bg-(--v3-line) sm:left-9">
                <span className="v3-signal absolute -left-1.5 top-0 size-3 rounded-full bg-(--v3-teal) shadow-[0_0_18px_rgba(69,193,196,.8)]" />
              </div>
              <div className="space-y-4">
                <article className="v3-stage relative ml-14 rounded-2xl border border-(--v3-line) bg-(--v3-panel)/95 p-5 shadow-[0_28px_70px_-44px_rgba(69,193,196,.65)] sm:ml-20 sm:p-6">
                  <span className="absolute -left-[3.15rem] top-6 grid size-10 place-items-center rounded-full border border-(--v3-line) bg-(--v3-bg) text-(--v3-teal) sm:-left-[4.8rem] sm:size-12">
                    <Send aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold tracking-[.14em] text-(--v3-teal) uppercase">Illustrative opportunity</p>
                      <h2 className="mt-2 font-(family-name:--font-display) text-xl font-semibold tracking-tight sm:text-2xl">
                        Tree planting · Tashkent
                      </h2>
                    </div>
                    <span className="rounded-lg bg-(--v3-field) px-2.5 py-1 text-xs font-bold text-(--v3-amber)">Deadline Thu</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-(--v3-muted)">
                    <span className="inline-flex items-center gap-1.5"><Clock3 aria-hidden="true" className="size-4" />Saturday · 09:00</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-4" />Botanical garden</span>
                  </div>
                </article>

                <article className="v3-stage relative ml-14 rounded-2xl border border-(--v3-line) bg-(--v3-field) p-5 sm:ml-20 sm:p-6">
                  <span className="absolute -left-[3.15rem] top-6 grid size-10 place-items-center rounded-full border border-(--v3-line) bg-(--v3-bg) text-(--v3-teal) sm:-left-[4.8rem] sm:size-12">
                    <FileText aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <p className="text-sm font-extrabold text-(--v3-text)">Planned application</p>
                  <p className="mt-2 leading-7 text-(--v3-muted)">
                    Profile details are reused. A saved essay can be pulled in.
                    The brief targets three steps and about two minutes.
                  </p>
                </article>

                <article className="v3-stage v3-pulse relative ml-14 rounded-2xl border border-(--v3-teal)/55 bg-(--v3-panel-strong) p-5 sm:ml-20 sm:p-6">
                  <span className="absolute -left-[3.15rem] top-6 grid size-10 place-items-center rounded-full bg-(--v3-teal) text-(--v3-teal-dark) sm:-left-[4.8rem] sm:size-12">
                    <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={2.1} />
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold">Attendance confirmed</p>
                      <p className="mt-1 text-sm text-(--v3-muted)">Illustrative record update</p>
                    </div>
                    <strong className="font-(family-name:--font-display) text-2xl font-semibold tabular-nums text-(--v3-teal)">+5 h</strong>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="launch" className="border-b border-white/8 bg-(--v3-field) scroll-mt-20">
          <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-(family-name:--font-display) text-2xl font-semibold tracking-tight">The launch target is concrete.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-(--v3-muted)">
                These are requirements from the supplied brief, not claims about the current state.
              </p>
            </div>
            <ul className="grid grid-cols-3 divide-x divide-(--v3-line) rounded-2xl border border-(--v3-line) bg-(--v3-bg)/45">
              {[
                ["15+", "opportunities"],
                ["3", "partners"],
                ["1", "working bot"],
              ].map(([value, label]) => (
                <li key={label} className="px-4 py-4 text-center sm:px-7">
                  <span className="block text-[9px] font-extrabold tracking-[.16em] text-(--v3-amber) uppercase">
                    Launch target
                  </span>
                  <strong className="block font-(family-name:--font-display) text-2xl font-semibold tabular-nums text-(--v3-teal)">{value}</strong>
                  <span className="mt-1 block text-[11px] font-bold tracking-wide text-(--v3-muted) uppercase">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="opportunities" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="max-w-3xl font-(family-name:--font-display) text-4xl font-semibold leading-tight tracking-[-.035em] text-balance sm:text-5xl">
                Find the work that fits your weekend.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-(--v3-muted)">
                The examples below demonstrate the planned browse experience.
                They are not live opportunities.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-(--v3-teal)">
              Illustrative listings
              <Sparkles aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </span>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_.85fr]">
            <article className="group relative min-h-96 overflow-hidden rounded-[1.75rem] border border-(--v3-line) bg-(--v3-panel) p-7 sm:p-9">
              <div aria-hidden="true" className="absolute -right-20 -top-20 size-72 rounded-full border-[46px] border-(--v3-teal)/9 transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap gap-2 text-xs font-extrabold tracking-wide uppercase">
                  <span className="rounded-lg bg-(--v3-teal) px-2.5 py-1 text-(--v3-teal-dark)">{opportunities[0].category}</span>
                  <span className="rounded-lg bg-(--v3-field) px-2.5 py-1 text-(--v3-muted)">{opportunities[0].region}</span>
                </div>
                <h3 className="mt-auto max-w-xl pt-20 font-(family-name:--font-display) text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-5xl">
                  {opportunities[0].title}
                </h3>
                <div className="mt-6 flex flex-col gap-5 border-t border-(--v3-line) pt-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-1 text-sm text-(--v3-muted)">
                    <p>{opportunities[0].schedule}</p>
                    <p>{opportunities[0].note}</p>
                  </div>
                  <a href="#journey" className="inline-flex items-center gap-2 font-extrabold text-(--v3-teal) underline-offset-4 hover:underline">
                    See the application concept
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {opportunities.slice(1).map((opportunity) => (
                <article key={opportunity.title} className="rounded-[1.5rem] border border-(--v3-line) bg-(--v3-field) p-6 transition-colors hover:bg-(--v3-panel)">
                  <p className="mb-5 text-[10px] font-extrabold tracking-[.15em] text-(--v3-amber) uppercase">
                    {opportunity.note}
                  </p>
                  <div className="flex items-center justify-between gap-4 text-xs font-extrabold tracking-wide uppercase">
                    <span className="text-(--v3-teal)">{opportunity.category}</span>
                    <span className="text-(--v3-muted)">{opportunity.region}</span>
                  </div>
                  <h3 className="mt-7 max-w-md font-(family-name:--font-display) text-2xl font-semibold leading-tight tracking-tight">
                    {opportunity.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-(--v3-muted)">{opportunity.schedule}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="record" className="border-y border-white/8 bg-(--v3-field) scroll-mt-20">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div>
              <h2 className="font-(family-name:--font-display) text-4xl font-semibold leading-tight tracking-[-.035em] text-balance sm:text-5xl">
                A record that gets stronger every time you show up.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-(--v3-muted)">
                Organizers confirm attendance. Your completed events, hours,
                reliability, and level stay together on one planned shareable page.
              </p>
              <div className="mt-8 rounded-2xl border border-(--v3-line) bg-(--v3-bg)/45 p-5">
                <p className="font-bold text-(--v3-text)">Reliability has one rule</p>
                <p className="mt-2 leading-7 text-(--v3-muted)">
                  Events attended ÷ events accepted. If an organizer forgets to
                  confirm, the volunteer is never penalized.
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-(--v3-line) bg-(--v3-bg) p-5 shadow-[0_34px_90px_-58px_rgba(69,193,196,.8)] sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-(--v3-line) pb-6">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-(--v3-panel) text-(--v3-teal)">
                    <UserRound aria-hidden="true" className="size-6" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-extrabold">Illustrative volunteer</p>
                    <p className="mt-1 text-xs font-bold tracking-wide text-(--v3-muted) uppercase">Record preview</p>
                  </div>
                </div>
                <span className="rounded-lg bg-(--v3-panel) px-3 py-1.5 text-sm font-extrabold text-(--v3-teal)">Active</span>
              </div>

              <dl className="grid grid-cols-3 divide-x divide-(--v3-line) py-7 text-center">
                {[
                  ["3", "events"],
                  ["14", "hours"],
                  ["100%", "reliability"],
                ].map(([value, label]) => (
                  <div key={label} className="px-2">
                    <dd className="font-(family-name:--font-display) text-2xl font-semibold tabular-nums sm:text-3xl">{value}</dd>
                    <dt className="mt-1 text-[11px] font-bold tracking-wide text-(--v3-muted) uppercase">{label}</dt>
                  </div>
                ))}
              </dl>

              <div className="space-y-2.5">
                {levels.map((level) => (
                  <div
                    key={level.name}
                    className={`flex min-h-14 items-center justify-between gap-4 rounded-xl border px-4 ${
                      level.reached
                        ? "border-(--v3-teal)/35 bg-(--v3-panel)"
                        : "border-(--v3-line) text-(--v3-muted)"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 font-extrabold">
                      {level.reached ? <Check aria-hidden="true" className="size-4 text-(--v3-teal)" strokeWidth={2.4} /> : null}
                      {level.name}
                    </span>
                    <span className="text-sm font-semibold tabular-nums">{level.requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="relative overflow-hidden rounded-[2rem] bg-(--v3-teal) px-6 py-14 text-(--v3-teal-dark) sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute -right-16 -top-20 size-72 rounded-full border-[54px] border-(--v3-teal-dark)/8" />
            <div className="relative max-w-3xl">
              <h2 className="font-(family-name:--font-display) text-4xl font-semibold leading-[1.02] tracking-[-.04em] text-balance sm:text-6xl">
                First make showing up easier. Then make it count.
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#123E42]">
                This page is a visual test of the V3 direction. Product access,
                Telegram authentication, and live opportunities remain outside
                this prototype until their contracts are available.
              </p>
              <a
                href="#top"
                className="mt-9 inline-flex min-h-13 items-center gap-2 rounded-xl bg-(--v3-teal-dark) px-6 font-extrabold text-(--v3-text) transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#0D3034] active:translate-y-0"
              >
                View the concept again
                <ArrowRight aria-hidden="true" className="size-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 pb-10 pt-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Image
            src="/logo/volontyorlar-horizontal-white.svg"
            alt="Volontyorlar"
            width={540}
            height={128}
            loading="eager"
            className="h-auto w-44"
          />
          <p className="max-w-md text-sm leading-6 text-(--v3-muted) md:text-right">
            Youth Volunteering Community · Uzbekistan<br />
            English at launch · Uzbek planned next
          </p>
        </div>
      </footer>
    </div>
  );
}
