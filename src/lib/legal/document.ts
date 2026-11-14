export const LEGAL_VERSION = "2026-11-14";

export const LEGAL_OPERATORS = [
  "Arslon Rajabov",
  "Abdulaziz Yusupaliev",
] as const;

export const LEGAL_DOCUMENT_HASHES = {
  uz: "5775cded508bec9a9c7c47311b77603897c60bfb87a74934cd1430245b905446",
  ru: "d6e6c8d71e925d2d894e24b96d52fc3a6ff72e2690244ad7b948f02f576fb1a7",
  en: "abe5694fa5f1fa66b8b89a903539447fcc8d5a8a794e5637dfe8043a8661dd5c",
} as const;

export function legalContact() {
  return {
    email: process.env.LEGAL_CONTACT_EMAIL?.trim() || null,
    address: process.env.LEGAL_CORRESPONDENCE_ADDRESS?.trim() || null,
  };
}
