import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Volontyorlar — landing page explorations",
  description: "Three design directions for the Volontyorlar marketing landing page.",
};

const versions = [
  {
    href: "/v1",
    name: "1 · Poster",
    thesis: "A civic poster turned into a page — butter yellow, print navy, tomato. Type is the visual.",
    palette: ["#24333E", "#F5C742", "#C63D1A", "#FAF6EC"],
    good: "Loud, warm, young — reads like a real youth-org poster, not corporate polish. Survives a logo change.",
    bad: "Loudness has a ceiling: inner pages (rules, FAQs) will fight the uppercase poster voice.",
  },
  {
    href: "/v2",
    name: "2 · Record",
    thesis: "A register, not a brochure — paper, writing ink, oxblood and blue stamp pads. The record card is the hero.",
    palette: ["#26313A", "#8A3033", "#2F5570", "#8A6D14", "#F4F0E5"],
    good: "Sells the actual moat (proof of showing up); the stamp motif extends straight into the product.",
    bad: "Most serious of the three — teens may read serif + register as paperwork; tables are risky on mobile.",
  },
  {
    href: "/v3",
    name: "3 · Night",
    thesis: "Telegram-native dark — the messenger's own blues plus one amber. A channel post does the pitching.",
    palette: ["#0E1621", "#2B5278", "#4FA9E8", "#E8A13C"],
    good: "Truest to the real journey (a phone, a Telegram link, 11pm); the chat hero explains the product in three messages.",
    bad: "Dark reads less trustworthy to parents, schools and the partner orgs the launch depends on.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBFAF7] px-5 py-14 font-sans text-[#1F2933]">
      <main className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <Image src="/logo/volontyorlar-horizontal.svg" alt="Volontyorlar" width={540} height={128} className="h-auto w-44" />
          <h1 className="text-2xl font-bold tracking-tight">Landing page explorations</h1>
        </div>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#52606D]">
          Three directions, each grounded in a different truth from the product brief and each with
          its own palette — none of them depends on the logo staying as it is. Use the switcher in
          the corner to flip between them from any page. Full rationale lives in a comment at the
          bottom of each version&apos;s source file.
        </p>

        <div className="mt-10 divide-y divide-[#D9DDE2] border-y border-[#D9DDE2]">
          {versions.map((v) => (
            <Link key={v.href} href={v.href} className="group block py-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold group-hover:underline">{v.name}</h2>
                <span className="flex items-center gap-1.5">
                  {v.palette.map((c) => (
                    <span
                      key={c}
                      className="size-4 rounded-sm border border-black/10"
                      style={{ background: c }}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-2 font-medium">{v.thesis}</p>
              <div className="mt-3 space-y-1 text-sm leading-relaxed text-[#52606D]">
                <p>
                  <span className="font-semibold text-[#1F2933]">For: </span>
                  {v.good}
                </p>
                <p>
                  <span className="font-semibold text-[#1F2933]">Against: </span>
                  {v.bad}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-[#7B8794]">
          Shared facts across all three: 15+ live opportunities · 6 regions · Telegram sign-in ·
          levels Newcomer / Active / Trusted / Core · reliability = attended ÷ accepted.
        </p>
      </main>
    </div>
  );
}
