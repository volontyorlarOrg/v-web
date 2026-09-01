import type { Metadata } from "next";
import Image from "next/image";
import { IBM_Plex_Serif, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const display = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "YVC — Proof you showed up",
  description: "A volunteer record nobody can copy: events, hours, reliability.",
};

const ledger = [
  { date: "14 SEP", title: "Tree planting, botanical garden", region: "Tashkent", places: "12", deadline: "12 SEP" },
  { date: "15 SEP", title: "Reading hour with 3rd graders", region: "Samarkand", places: "04", deadline: "TOMORROW" },
  { date: "21 SEP", title: "Blood drive registration desk", region: "Bukhara", places: "08", deadline: "17 SEP" },
  { date: "22 SEP", title: "Marathon water station crew", region: "Fergana", places: "20", deadline: "18 SEP" },
  { date: "28 SEP", title: "Neighbourhood clean-up", region: "Namangan", places: "15", deadline: "24 SEP" },
];

const record = [
  { date: "07 JUN", event: "River bank clean-up", hours: "05" },
  { date: "23 JUN", event: "Chess day, orphanage 21", hours: "04" },
  { date: "12 JUL", event: "First-aid workshop crew", hours: "06" },
  { date: "03 AUG", event: "Book fair volunteer desk", hours: "08" },
];

const levels = [
  { name: "NEWCOMER", earned: "Just joined", color: "#2F5570" },
  { name: "ACTIVE", earned: "3 events completed", color: "#8A6D14" },
  { name: "TRUSTED", earned: "8 events · 85% reliability", color: "#26313A" },
  { name: "CORE", earned: "20 events · 90% · standout reviews", color: "#8A3033" },
];

export default function V2() {
  return (
    <div
      className={`${display.variable} ${mono.variable} ${body.variable} min-h-screen bg-(--paper) text-(--ink) font-(family-name:--font-body)`}
      style={{
        "--paper": "#F4F0E5",
        "--ink": "#26313A",
        "--ox": "#8A3033",
        "--stamp": "#2F5570",
        "--line": "#CBC3B0",
      } as React.CSSProperties}
    >
      <style>{`
        .v2-stamp {
          display: inline-block; transform: rotate(-5deg);
          border: 2px solid currentColor; border-radius: 3px;
          padding: 1px 7px; font-weight: 600; letter-spacing: 0.08em;
        }
      `}</style>

      {/* Top bar — double rule like a printed form header */}
      <header className="border-b-4 border-double border-(--ink)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <Image src="/yvc.png" alt="YVC" width={32} height={32} />
            <span className="font-(family-name:--font-display) text-lg font-bold">YVC</span>
            <span className="ml-2 hidden font-(family-name:--font-mono) text-xs uppercase tracking-widest opacity-70 sm:inline">
              Volunteer register · Uzbekistan
            </span>
          </div>
          <a
            href="#cta"
            className="bg-(--ox) px-4 py-2 font-(family-name:--font-mono) text-sm font-semibold text-(--paper) hover:bg-[#6E2227]"
          >
            Sign in with Telegram
          </a>
        </div>
      </header>

      {/* Hero: thesis + the record card artifact */}
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] opacity-70">
            Form YVC-01 · Public copy
          </p>
          <h1 className="mt-4 font-(family-name:--font-display) text-5xl font-semibold leading-[1.06] tracking-tight md:text-6xl">
            Nobody can copy your record of{" "}
            <em className="border-b-4 border-(--ox) font-bold not-italic">showing up</em>.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            Every event you attend is confirmed by an organizer and written down: hours, level,
            reliability. Yours to keep, yours to share — one link.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#cta"
              className="bg-(--ox) px-6 py-3.5 font-(family-name:--font-mono) font-semibold text-(--paper) hover:bg-[#6E2227]"
            >
              Start your record
            </a>
            <span className="font-(family-name:--font-mono) text-sm opacity-70">
              reliability = attended ÷ accepted
            </span>
          </div>
        </div>

        {/* Signature: the volunteer record card, stamps and all */}
        <aside className="border border-(--ink) bg-[#FCFAF3]">
          <div className="flex items-center justify-between border-b border-(--ink) px-5 py-3">
            <span className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em]">
              Volunteer record · № 0482 / A
            </span>
            <span className="v2-stamp font-(family-name:--font-mono) text-xs text-(--ox)">
              TRUSTED
            </span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-(--line) border-b border-(--line) text-center">
            {[
              { k: "events", v: "11" },
              { k: "hours", v: "63" },
              { k: "reliability", v: "92%" },
            ].map((s) => (
              <div key={s.k} className="px-2 py-4">
                <div className="font-(family-name:--font-mono) text-3xl font-semibold">{s.v}</div>
                <div className="mt-1 font-(family-name:--font-mono) text-[11px] uppercase tracking-widest opacity-70">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
          <ul className="px-5 py-2">
            {record.map((r) => (
              <li
                key={r.event}
                className="flex items-center justify-between gap-3 border-b border-dotted border-(--line) py-2.5 last:border-0"
              >
                <span className="font-(family-name:--font-mono) text-xs opacity-70">{r.date}</span>
                <span className="flex-1 truncate text-sm font-medium">{r.event}</span>
                <span className="font-(family-name:--font-mono) text-xs opacity-70">{r.hours}h</span>
                <span className="v2-stamp font-(family-name:--font-mono) text-[10px] text-(--stamp)">
                  ATTENDED
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-(--ink) px-5 py-2.5 font-(family-name:--font-mono) text-xs opacity-80">
            share: yvc.uz/r/aziza-0482
          </div>
        </aside>
      </section>

      {/* Ledger of opportunities */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-(family-name:--font-display) text-3xl font-semibold tracking-tight">
            Open positions
          </h2>
          <span className="font-(family-name:--font-mono) text-xs uppercase tracking-widest opacity-70">
            15+ live · 6 regions
          </span>
        </div>
        <div className="overflow-x-auto border border-(--ink) bg-[#FCFAF3]">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-(--ink) font-(family-name:--font-mono) text-[11px] uppercase tracking-widest text-(--paper)">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Opportunity</th>
                <th className="px-4 py-3 font-medium">Region</th>
                <th className="px-4 py-3 font-medium">Places</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {ledger.map((row) => (
                <tr key={row.title} className="border-b border-(--line) last:border-0 hover:bg-(--paper)">
                  <td className="px-4 py-3.5 font-(family-name:--font-mono) text-sm">{row.date}</td>
                  <td className="px-4 py-3.5 font-medium">{row.title}</td>
                  <td className="px-4 py-3.5 text-sm opacity-80">{row.region}</td>
                  <td className="px-4 py-3.5 font-(family-name:--font-mono) text-sm">{row.places}</td>
                  {/* Oxblood appears exactly here and in the CTA: urgency and action share one ink */}
                  <td className="px-4 py-3.5 font-(family-name:--font-mono) text-sm font-semibold text-(--ox)">
                    {row.deadline}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <a href="#cta" className="font-(family-name:--font-mono) text-sm font-semibold text-(--stamp) underline underline-offset-4 hover:text-(--ox)">
                      apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-(family-name:--font-mono) text-xs opacity-70">
          Apply in three steps, about two minutes. Saved essays pull in with one click.
        </p>
      </section>

      {/* Levels as a register */}
      <section className="border-y border-(--ink) bg-[#FCFAF3] py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-(family-name:--font-display) text-3xl font-semibold tracking-tight">
            Four levels. Earned, not claimed.
          </h2>
          <div className="mt-8 grid gap-px border border-(--ink) bg-(--line) sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((l) => (
              <div key={l.name} className="bg-[#FCFAF3] p-5">
                <span className="v2-stamp font-(family-name:--font-mono) text-xs" style={{ color: l.color }}>
                  {l.name}
                </span>
                <p className="mt-3 text-sm opacity-80">{l.earned}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed opacity-80">
            Reliability is just attendance: of the events you were accepted to, how many you came
            to. No star ratings. If an organizer forgets to confirm, you are never penalised.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="max-w-xl font-(family-name:--font-display) text-4xl font-semibold tracking-tight">
            Page one of your record is this weekend.
          </h2>
          <a
            href="#"
            className="shrink-0 bg-(--ox) px-7 py-4 font-(family-name:--font-mono) text-lg font-semibold text-(--paper) hover:bg-[#6E2227]"
          >
            Sign in with Telegram
          </a>
        </div>
      </section>

      {/* Footer — microprint line, like the bottom of a document */}
      <footer className="border-t-4 border-double border-(--ink) py-6">
        <p className="mx-auto max-w-6xl truncate px-5 font-(family-name:--font-mono) text-[10px] uppercase tracking-[0.3em] opacity-60">
          YVC · Youth Volunteering Community · Uzbekistan · English now Uzbek next · YVC · Youth
          Volunteering Community · Uzbekistan
        </p>
      </footer>
    </div>
  );
}

/* ============================================================================
   DESIGN NOTES — V2 "Record" (register / passbook: paper, ink, oxblood, stamp blue)

   PATTERN
   A document, not a brochure. The hero shows the product's actual artifact —
   a volunteer record card with organizer stamps — and the rest of the page
   keeps the register vernacular: a real table for opportunities, level
   stamps, a double-rule form header, a microprint footer line. Flat printed
   rules everywhere; no drop shadows, no offset "brutalist" shadows, no
   rounded cards.

   PALETTE (real stamp-pad and ledger colours, independent of the logo)
   Paper #F4F0E5 / card #FCFAF3 — two tones of document stock
   Ink   #26313A — blue-black writing ink: text, rules, table header
   Oxblood #8A3033 — the red stamp pad: CTA buttons, deadlines, level CORE
   Stamp blue #2F5570 — the blue stamp pad: ATTENDED stamps, "apply" links
   Gold #8A6D14 — one level stamp only; no yellow highlighter anywhere

   TYPE
   IBM Plex Serif (display) — an official-document serif with warmth; the
   italic-free bold underline in the headline replaces the highlighter trick.
   IBM Plex Mono — every number, date, label: the record must look auditable.
   IBM Plex Sans — body. One type family in three voices = one document.

   WHY IT'S GOOD
   + Sells the moat: "nobody can copy your record of showing up" is the
     product doc's own thesis, made visible in the first viewport.
   + The stamp motif is ownable and extends into the product (confirmation
     stamps, level stamps, the shareable record page).
   + One Plex family in serif/mono/sans keeps it disciplined and cheap to
     maintain; the style scales directly into the app's tables and admin.

   WHY IT'S BAD
   − The most "serious" of the three: teens may read register + serif as
     paperwork. The copy has to carry all the warmth.
   − Tables stay the riskiest pattern on mobile; the horizontal scroll is
     survivable on a landing page but can't be the pattern for the real app.
   − Muted paper-and-ink pages depend on typographic craft; one sloppy
     spacing decision and it looks like an unstyled default, not a document.
   ========================================================================= */
