import type { Metadata } from "next";
import Image from "next/image";
import { Bricolage_Grotesque, Figtree } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "YVC — Show up. It adds up.",
  description: "Volunteering across Uzbekistan. One tap from Telegram.",
};

const opportunities = [
  {
    day: "14",
    month: "Sep",
    title: "Tree planting, botanical garden",
    meta: "Tashkent · Saturday 09:00 · 5 hours",
    places: "12 places left",
    deadline: "Closes Thursday",
  },
  {
    day: "15",
    month: "Sep",
    title: "Reading hour with 3rd graders",
    meta: "Samarkand · Sunday 11:00 · 3 hours",
    places: "4 places left",
    deadline: "Closes tomorrow",
  },
  {
    day: "22",
    month: "Sep",
    title: "Marathon water station crew",
    meta: "Fergana · Sunday 07:00 · 6 hours",
    places: "20 places left",
    deadline: "Closes 18 Sep",
  },
];

const levels = [
  { name: "Newcomer", earned: "Just joined", bar: "#8FA6B4" },
  { name: "Active", earned: "3 events completed", bar: "#F5C742" },
  { name: "Trusted", earned: "8 events · 85% reliability", bar: "#E89B2D" },
  { name: "Core", earned: "20 events · 90% · standout reviews", bar: "#E86A45" },
];

export default function V1() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-(--paper) text-(--ink) font-(family-name:--font-body)`}
      style={{
        "--paper": "#FAF6EC",
        "--ink": "#24333E",
        "--sun": "#F5C742",
        "--tomato": "#C63D1A",
      } as React.CSSProperties}
    >
      {/* Nav — solid, printed, no blur */}
      <header className="border-b-[3px] border-(--ink) bg-(--paper)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <Image src="/yvc.png" alt="YVC" width={36} height={36} />
            <span className="font-(family-name:--font-display) text-lg font-extrabold tracking-tight">
              YVC
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#opportunities" className="hover:text-(--tomato)">Opportunities</a>
            <a href="#how" className="hover:text-(--tomato)">How it works</a>
            <a href="#levels" className="hover:text-(--tomato)">Levels</a>
          </nav>
          <a
            href="#cta"
            className="bg-(--ink) px-4 py-2 text-sm font-bold uppercase tracking-wide text-(--sun) hover:bg-(--tomato) hover:text-(--paper)"
          >
            Sign in with Telegram
          </a>
        </div>
      </header>

      {/* Hero — a poster, not a pitch deck: full-bleed yellow, type does the work */}
      <section className="border-b-[3px] border-(--ink) bg-(--sun)">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em]">
            Youth Volunteering Community · Uzbekistan
          </p>
          <h1 className="mt-6 font-(family-name:--font-display) text-[17vw] font-extrabold uppercase leading-[0.92] tracking-tight md:text-[7.5rem]">
            Show up.
            <br />
            <span className="text-(--paper) [text-shadow:3px_3px_0_var(--ink)]">It adds up.</span>
          </h1>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-lg font-medium leading-snug">
              Find volunteering near you, apply in about two minutes, and build a record of every
              event you actually attended.
            </p>
            <a
              href="#cta"
              className="bg-(--ink) px-7 py-4 text-lg font-bold uppercase tracking-wide text-(--paper) hover:bg-(--tomato)"
            >
              Browse opportunities
            </a>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <div className="border-b-[3px] border-(--ink) bg-(--ink) py-2.5">
        <p className="mx-auto max-w-6xl px-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-(--paper)">
          15+ live opportunities <span className="text-(--sun)">✱</span> 6 regions{" "}
          <span className="text-(--sun)">✱</span> profile filled once{" "}
          <span className="text-(--sun)">✱</span> no passwords, ever
        </p>
      </div>

      {/* Opportunities — event-poster rows, not shadow cards */}
      <section id="opportunities" className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <h2 className="font-(family-name:--font-display) text-3xl font-extrabold uppercase tracking-tight">
          <span className="mr-3 inline-block size-4 bg-(--tomato)" aria-hidden />
          This month
        </h2>
        <div className="mt-8 border-t-2 border-(--ink)">
          {opportunities.map((o) => (
            <article
              key={o.title}
              className="grid grid-cols-[4.5rem_1fr] items-center gap-x-5 gap-y-2 border-b-2 border-(--ink) py-5 sm:grid-cols-[4.5rem_1fr_auto]"
            >
              <div className="border-2 border-(--ink) py-2 text-center">
                <div className="font-(family-name:--font-display) text-2xl font-extrabold leading-none">
                  {o.day}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest">{o.month}</div>
              </div>
              <div>
                <h3 className="font-(family-name:--font-display) text-xl font-bold leading-tight md:text-2xl">
                  {o.title}
                </h3>
                <p className="mt-1 text-sm font-medium opacity-70">{o.meta}</p>
              </div>
              <div className="col-span-2 flex items-center gap-5 sm:col-span-1 sm:block sm:text-right">
                <p className="text-sm font-semibold">{o.places}</p>
                <p className="text-sm font-bold uppercase text-(--tomato)">{o.deadline}</p>
                <a
                  href="#cta"
                  className="ml-auto text-sm font-bold uppercase tracking-wide underline decoration-2 underline-offset-4 hover:text-(--tomato) sm:ml-0 sm:mt-2 sm:inline-block"
                >
                  Apply →
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold">
          …and twelve more.{" "}
          <a href="#cta" className="underline decoration-2 underline-offset-4 hover:text-(--tomato)">
            See all opportunities
          </a>
        </p>
      </section>

      {/* How it works — a real sequence, so the numbers are earned */}
      <section id="how" className="border-y-[3px] border-(--ink) bg-(--paper) py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-(family-name:--font-display) text-3xl font-extrabold uppercase tracking-tight">
            Two minutes, start to sent
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              { n: "1", t: "Sign in with Telegram", d: "One tap. No password, no email, no forms to invent answers for." },
              { n: "2", t: "Fill your profile once", d: "It follows you into every application. Never typed again." },
              { n: "3", t: "Apply in about 2 minutes", d: "Three steps. Pull in a saved essay with one click." },
            ].map((s) => (
              <div key={s.n}>
                <div className="h-2 w-12 bg-(--sun)" />
                <span className="mt-3 inline-block font-(family-name:--font-display) text-5xl font-extrabold text-(--ink)/25">
                  {s.n}
                </span>
                <h3 className="mt-2 font-(family-name:--font-display) text-xl font-bold">{s.t}</h3>
                <p className="mt-2 leading-relaxed opacity-80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels — ink band */}
      <section id="levels" className="bg-(--ink) py-14 text-(--paper)">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-(family-name:--font-display) text-3xl font-extrabold uppercase tracking-tight">
            Your record grows with you
          </h2>
          <p className="mt-3 max-w-lg opacity-80">
            Reliability is simple: of the events you were accepted to, how many you attended.
            No star ratings. If an organizer forgets to confirm, you are never penalised.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((l) => (
              <div key={l.name}>
                <div className="h-2 w-12" style={{ background: l.bar }} />
                <h3 className="mt-3 font-(family-name:--font-display) text-2xl font-bold">{l.name}</h3>
                <p className="mt-1 text-sm opacity-75">{l.earned}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — back to the yellow poster */}
      <section id="cta" className="border-y-[3px] border-(--ink) bg-(--sun)">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
          <h2 className="font-(family-name:--font-display) text-4xl font-extrabold uppercase leading-none tracking-tight md:text-5xl">
            The next event
            <br />
            is this weekend.
          </h2>
          <a
            href="#"
            className="shrink-0 bg-(--ink) px-8 py-4 text-lg font-bold uppercase tracking-wide text-(--paper) hover:bg-(--tomato)"
          >
            Sign in with Telegram
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--ink) py-8 text-(--paper)">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-2.5">
            <Image src="/yvc-white.png" alt="" width={28} height={28} />
            <span className="font-(family-name:--font-display) font-bold">YVC</span>
          </div>
          <p className="text-sm opacity-75">Youth Volunteering Community · Uzbekistan · English now, Uzbek next</p>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
   DESIGN NOTES — V1 "Poster" (civic poster: butter yellow / print navy / tomato)

   PATTERN
   A public-space poster turned into a page: full-bleed yellow hero where the
   headline IS the visual, a facts strip like a printed banner, opportunities
   as event-poster rows with big tear-off date blocks, hard 3px rules between
   sections. No cards, no shadows, no glass. The signature is the giant
   two-line headline with the second line knocked out in paper + hard offset
   ink shadow — a screen-print trick, not a CSS gradient trick.

   PALETTE (deliberately NOT the full logo rainbow — logo may change)
   Paper  #FAF6EC — warm print stock
   Ink    #24333E — deep print navy: all structure, type, bands
   Sun    #F5C742 — the poster colour; hero, CTA band, step markers
   Tomato #C63D1A — urgency: deadlines AND hover states, nothing decorative
   Level bars get two extra steps (amber, burnt orange) between sun and
   tomato — a temperature scale, not a category rainbow.

   TYPE
   Bricolage Grotesque (display, extrabold, uppercase) — chunky civic
   lettering with personality. Figtree (body) — quiet under loud headings.

   WHY IT'S GOOD
   + Loud, warm, young — reads like a real youth-org poster on a wall, which
     is exactly the register a 16-year-old trusts more than corporate polish.
   + Survives a logo change: only warm yellow ties back, nothing else leans
     on the mark.
   + Cheap to keep consistent: three colours, two faces, hard rules — hard
     to break even with many hands editing later.

   WHY IT'S BAD
   − Loudness has a ceiling: long content pages (rules, FAQs) will fight the
     uppercase poster voice; needs a quieter sibling style for inner pages.
   − Yellow at this scale is polarizing and hard to photograph against —
     real event photos will need heavy art direction or duotones.
   − Zero softness: if the team wants "friendly and gentle" rather than
     "bold and civic", this is the wrong direction entirely.
   ========================================================================= */
