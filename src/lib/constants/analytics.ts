export const MARKETING_EVENTS = {
  primaryCta: "marketing.primary_cta_clicked",
  opportunitiesCta: "marketing.opportunities_cta_clicked",
  contactCta: "marketing.contact_cta_clicked",
  partnerCta: "marketing.partner_cta_clicked",
  languageSwitched: "marketing.language_switched",
} as const;

export type MarketingEvent =
  (typeof MARKETING_EVENTS)[keyof typeof MARKETING_EVENTS];
