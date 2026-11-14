export const LEGAL_VERSION = "2026-11-14";

export const LEGAL_OPERATORS = [
  "Arslon Rajabov",
  "Abdulaziz Yusupaliev",
] as const;

export const LEGAL_DOCUMENT_HASHES = {
  uz: "b176d2255ec8f77bdb5b7ab7ed4d0dec3d114884d7ffa64834ecca4e1d51e739",
  ru: "a8ab51d605370f24eab7e40bf1405d396e02cd4a5a1ea47ed80d0c129a21a17b",
  en: "de76520e8968332c73cf8db2b1f4bf82f0dc29cc786a57f82c6921c90b720df6",
} as const;

export function legalContact() {
  return {
    email: process.env.LEGAL_CONTACT_EMAIL?.trim() || null,
    address: process.env.LEGAL_CORRESPONDENCE_ADDRESS?.trim() || null,
  };
}
