import type { Metadata } from "next";
import Image from "next/image";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "YVC — One tap from chat",
  description: "Volunteering that starts where you already are: Telegram.",
};

const cards = [
  { tags: "#environment #tashkent", title: "Tree planting, botanical garden", meta: "Sat 09:00 · 5 hours", places: "12 places", deadline: "closes Thu" },
  { tags: "#education #samarkand", title: "Reading hour with 3rd graders", meta: "Sun 11:00 · 3 hours", places: "4 places", deadline: "closes tomorrow" },
  { tags: "#health #bukhara", title: "Blood drive registration desk", meta: "Sat 10:00 · 4 hours", places: "8 places", deadline: "closes 17 Sep" },
  { tags: "#community #namangan", title: "Neighbourhood clean-up", meta: "Sun 08:00 · 4 hours", places: "15 places", deadline: "closes 24 Sep" },
  { tags: "#events #fergana", title: "Marathon water station crew", meta: "Sun 07:00 · 6 hours", places: "20 places", deadline: "closes 18 Sep" },
];

const levels = [
  { name: "Newcomer", req: "joined", done: true },
  { name: "Active", req: "3 events", done: true },
  { name: "Trusted", req: "8 events · 85%", done: false },
  { name: "Core", req: "20 events · 90%", done: false },
];

export default function V3() {
  return (
    <div
      className={`${manrope.variable} min-h-screen bg-(--bg) pb-24 text-(--text) font-(family-name:--font-body) md:pb-0`}
      style={{
        "--bg": "#0E1621",
        "--panel": "#17212B",
        "--in": "#182533",
        "--out": "#2B5278",
        "--edge": "#243342",
        "--text": "#E7EDF3",
        "--muted": "#8FA0B0",
        "--blue": "#4FA9E8",
        "--link": "#6AB3F0",
        "--amber": "#E8A13C",
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes v3-pop { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .v3-b1 { animation: v3-pop 0.35s ease-out 0.2s both; }
        .v3-b2 { animation: v3-pop 0.35s ease-out 0.9s both; }
        .v3-b3 { animation: v3-pop 0.35s ease-out 1.6s both; }
        @media (prefers-reduced-motion: reduce) { .v3-b1, .v3-b2, .v3-b3 { animation: none; } }
        .v3-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Nav — apps keep it to a name and a link */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Image src="/yvc-white.png" alt="YVC" width={30} height={30} />
          <span className="text-base font-extrabold tracking-tight">YVC</span>
        </div>
        <a href="#cta" className="text-sm font-bold text-(--link) hover:underline">
          Sign in with Telegram
        </a>
      </header>

      {/* Hero: headline + the channel doing the pitching */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-14">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            Volunteering starts where you already are.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-(--muted)">
            Opportunities land in Telegram. You sign in with Telegram. You apply in two minutes —
            and every hour you show up for is counted, for good.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="rounded-[10px] bg-(--blue) px-6 py-3.5 font-extrabold text-[#0B141D] hover:bg-(--link)"
            >
              Sign in with Telegram
            </a>
            <span className="text-sm text-(--muted)">No password. No forms. Ever.</span>
          </div>
          <dl className="mt-10 flex gap-10 tabular-nums">
            {[
              { v: "3,000+", k: "volunteers" },
              { v: "15+", k: "live now" },
              { v: "6", k: "regions" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="sr-only">{s.k}</dt>
                <dd className="text-2xl font-extrabold">{s.v}</dd>
                <dd className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-(--muted)">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Signature: a channel post + the two replies that ARE the product */}
        <div className="mx-auto w-full max-w-sm rounded-xl border border-(--edge) bg-(--panel)">
          <div className="flex items-center gap-3 border-b border-(--edge) px-4 py-3">
            <Image src="/yvc.png" alt="" width={34} height={34} className="rounded-full bg-white p-0.5" />
            <div>
              <div className="text-sm font-bold">YVC · opportunities</div>
              <div className="text-xs text-(--muted)">3,204 subscribers</div>
            </div>
          </div>
          <div className="space-y-3 p-4">
            <div className="v3-b1 max-w-[88%] rounded-xl rounded-bl-[4px] bg-(--in) p-3.5">
              <p className="text-sm font-bold text-(--link)">Tree planting — Tashkent</p>
              <p className="mt-1 text-sm leading-relaxed">
                Sat 09:00 at the botanical garden. 12 places.{" "}
                <span className="font-semibold text-(--amber)">Closes Thursday.</span>
              </p>
              <p className="mt-1.5 text-right text-[11px] text-(--muted)">1.2K views · 18:02</p>
            </div>
            <div className="v3-b2 ml-auto max-w-[70%] rounded-xl rounded-br-[4px] bg-(--out) p-3.5">
              <p className="text-sm font-medium">I&apos;m in — sent my saved essay</p>
              <p className="mt-1.5 text-right text-[11px] text-(--link)">18:03 ✓✓</p>
            </div>
            <div className="v3-b3 max-w-[88%] rounded-xl rounded-bl-[4px] bg-(--in) p-3.5">
              <p className="text-sm leading-relaxed">
                Attendance confirmed. <span className="font-bold">+5 hours</span>, reliability{" "}
                <span className="font-bold">100%</span>. Two more events to{" "}
                <span className="font-bold text-(--link)">Active</span>.
              </p>
              <p className="mt-1.5 text-right text-[11px] text-(--muted)">Sun 14:11</p>
            </div>
          </div>
        </div>
      </section>

      {/* Snap-scroll opportunity rail */}
      <section className="py-6">
        <div className="mx-auto mb-5 flex max-w-6xl items-baseline justify-between px-5">
          <h2 className="text-xl font-extrabold">This month</h2>
          <span className="text-sm text-(--muted)">swipe →</span>
        </div>
        <div className="v3-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
          {cards.map((c) => (
            <article
              key={c.title}
              className="w-72 shrink-0 snap-start rounded-xl border border-(--edge) bg-(--panel) p-5"
            >
              <p className="text-xs font-semibold lowercase text-(--link)">{c.tags}</p>
              <h3 className="mt-3 text-lg font-bold leading-snug">{c.title}</h3>
              <p className="mt-1.5 text-sm text-(--muted)">{c.meta}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-(--muted)">
                  {c.places} · <span className="font-semibold text-(--amber)">{c.deadline}</span>
                </span>
                <a href="#cta" className="font-bold text-(--link) hover:underline">
                  Apply
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Record + levels */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-xl border border-(--edge) bg-(--panel) p-7 md:p-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold leading-snug md:text-3xl">
                Hours that don&apos;t disappear.
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-(--muted)">
                Organizers confirm who actually came. Your level, hours and reliability live on one
                shareable page — proof for universities, employers, embassies.
              </p>
              <p className="mt-4 text-sm text-(--muted)">
                Reliability = events attended ÷ events accepted. No star ratings.
              </p>
            </div>
            <div className="space-y-2.5">
              {levels.map((l) => (
                <div
                  key={l.name}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                    l.done ? "border-(--out) bg-(--in)" : "border-(--edge) bg-transparent opacity-60"
                  }`}
                >
                  <span className="font-bold">{l.name}</span>
                  <span className="text-sm tabular-nums text-(--muted)">
                    {l.done ? "✓ " : ""}
                    {l.req}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-5 pb-20 pt-4 text-center">
        <h2 className="mx-auto max-w-lg text-3xl font-extrabold leading-snug">
          The next event is this weekend.
        </h2>
        <a
          href="#"
          className="mt-7 inline-block rounded-[10px] bg-(--blue) px-8 py-4 text-lg font-extrabold text-[#0B141D] hover:bg-(--link)"
        >
          Sign in with Telegram
        </a>
        <p className="mt-4 text-sm text-(--muted)">Free · English now, Uzbek next</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-(--edge) py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-(--muted)">
          <div className="flex items-center gap-2">
            <Image src="/yvc-white.png" alt="" width={22} height={22} />
            <span>Youth Volunteering Community · Uzbekistan</span>
          </div>
          <span>@yvc_opportunities</span>
        </div>
      </footer>

      {/* Mobile sticky CTA — everyone arrives on a phone */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-(--edge) bg-(--panel) p-3 md:hidden">
        <a
          href="#cta"
          className="block rounded-[10px] bg-(--blue) py-3.5 text-center font-extrabold text-[#0B141D]"
        >
          Sign in with Telegram
        </a>
      </div>
    </div>
  );
}

/* ============================================================================
   DESIGN NOTES — V3 "Night shift" (Telegram-native dark: messenger blues + amber)

   PATTERN
   The page behaves like the app it funnels into. The hero's right half is a
   Telegram channel ("YVC · opportunities", subscriber count, view counts,
   read checkmarks) demonstrating the whole loop in three messages: post →
   apply with a saved essay → hours and reliability confirmed. Opportunities
   are a thumb-friendly snap-scroll rail with lowercase #hashtag tags instead
   of category chips; levels are a progress list; a sticky bottom CTA bar on
   mobile mimics an app. Show, don't tell.

   PALETTE (borrowed from Telegram's own dark theme, not from the logo)
   Bg #0E1621 / panel #17212B / bubbles #182533 & #2B5278 — the exact
   elevation family a Telegram user's eye already trusts at night
   Blue #4FA9E8 — the only button colour, dark text on it for contrast
   Link #6AB3F0 — links, tags, active states
   Amber #E8A13C — the single warm accent, reserved for deadlines
   No rainbow: categories are hashtags, levels are filled/unfilled rows.

   TYPE
   Manrope only, 400–800. Real messaging apps don't use display faces —
   one family with a heavy top weight IS the authentic voice here. Numerals
   set tabular for the stats.

   WHY IT'S GOOD
   + Truest to the real journey in the product doc: a teenager opening a
     Telegram link at 11pm lands somewhere that feels native, not corporate.
   + The channel hero explains the product faster than any headline could,
     and its details (views, ✓✓, subscribers) buy believability for free.
   + Single family, four colours, flat panels — the cheapest system to keep
     consistent across the future app, bot messages and admin panel.

   WHY IT'S BAD
   − Dark pages read less trustworthy to parents, schools and the partner
     organizations the launch depends on ("3 partners to launch").
   − Borrowing Telegram's visual language invites comparison with the real
     thing, and flirts with looking like an unofficial client rather than
     an organization with its own identity.
   − Amber-on-navy is the only urgency signal; colour-blind-safe, but the
     page has little range left for celebration moments (level-ups) without
     breaking its own restraint.
   ========================================================================= */
