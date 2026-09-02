# Volontyorlar Product Context

## What Volontyorlar is

Volontyorlar helps high school students in Uzbekistan discover and
apply to meaningful volunteering. It was founded on **4 June 2025** by **Arslon
Rajabov** and **Parizoda Abdurakhimova**.

Volontyorlar has grown past reposting other people's opportunities. It now:

- finds volunteer opportunities;
- contacts organisers;
- sources events;
- builds partnerships;
- supplies volunteers;
- builds regional operations.

## Verified facts

These are the only figures and relationships the website may present. They are
encoded in `src/lib/content/org.ts`; the message catalogs carry only the prose
around them.

| Fact | Value |
| --- | --- |
| Telegram community | 3,600+ followers |
| Instagram | 220+ followers |
| Events supplied with volunteers | 50+ |
| Applications for regional project manager and coordinator roles | 500+ |
| Regional expansion target | all 14 regions of Uzbekistan |
| Partnership | O‘ZLIDEP Party |
| Support and recognition | Youth Affairs Agency, Uzbekistan Volunteer Association, Republican Children's Library |
| Opportunity sources | Yashil Qo‘llar, Youth Run Club, Youth for Good, Youth Grants, Relay Fellowship |

Do not add partnerships, statistics, testimonials, awards, offices, addresses,
or integrations that are not on this list.

## System boundary

The product is intentionally split in two.

| Marketing website (this repository) | Volontyorlar application (separate repository) |
| --- | --- |
| Brand and public positioning | Volunteer authentication and sessions |
| Public pages and partner presentation | Opportunity browsing, filtering, applications |
| Explanations of how Volontyorlar works | Reusable profiles and saved essays |
| Volunteering guidance | Volunteer records, hours, attendance |
| SEO, metadata, structured data, legal pages | Admin and partner workflows |
| Central links into the application | Any backend contract |

The marketing site must not become a second copy of the application. It explains
opportunities; it does not host a marketplace.

## Languages

Uzbek, Russian, and English are all product languages. Uzbek is the default
audience locale. Every user-facing string exists in all three, and the language
is carried by the URL, never by browser storage.

## Presented, not implemented

The original brief also described one-tap Telegram sign-in, reusable
applications, volunteer levels, reliability scoring, and an admin panel. None of
that is implemented here, and this document is not evidence that any of it is
live. Terminology for those concepts is kept in
[`docs/data/DATA_MODEL.md`](docs/data/DATA_MODEL.md) so the marketing copy stays
consistent with the eventual application, not so it can be claimed as shipped.

## Needs verification

- Public marketing domain and the product application origin
- Relationship between the delivered `volontyorlar` wordmark and the canonical
  product name Volontyorlar
- Public channel addresses (Telegram, Instagram) and any other contact route
- Legal entity details behind the privacy and terms pages
