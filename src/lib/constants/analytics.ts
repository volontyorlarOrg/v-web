/**
 * Centralised marketing event names.
 *
 * No analytics provider is installed or configured, so nothing dispatches these
 * yet. They exist so that when a provider is chosen the event vocabulary is
 * already defined in one place instead of being invented per component.
 *
 * Never attach volunteer PII, essays, phone numbers, Telegram identities, or
 * form contents to any of these events.
 */
export const MARKETING_EVENTS = {
  primaryCta: "marketing.primary_cta_clicked",
  opportunitiesCta: "marketing.opportunities_cta_clicked",
  courseInterestCta: "marketing.course_interest_cta_clicked",
  contactCta: "marketing.contact_cta_clicked",
  partnerCta: "marketing.partner_cta_clicked",
  languageSwitched: "marketing.language_switched",
} as const;

export type MarketingEvent =
  (typeof MARKETING_EVENTS)[keyof typeof MARKETING_EVENTS];
