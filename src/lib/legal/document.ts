export const LEGAL_VERSION = "2026-11-18";

export const LEGAL_OPERATORS = [
  "Arslon Rajabov",
  "Abdulaziz Yusupaliev",
] as const;

export const LEGAL_DOCUMENT_HASHES = {
  uz: "d130dde46b2e4c3a5dc067cd5025587adca38f3fbbfd0797bad0fa544263438d",
  ru: "6c9df7491683da077b59180ef5b63827d9583c03f9811fc1638f8e08629dd86e",
  en: "158ba163eff5e98d69cade98c1bd0d30627e5c8226d92931ada02494ed75721e",
} as const;

export function legalContact() {
  return {
    email: process.env.LEGAL_CONTACT_EMAIL?.trim() || null,
    address: process.env.LEGAL_CORRESPONDENCE_ADDRESS?.trim() || null,
  };
}
