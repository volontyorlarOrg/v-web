export const LEGAL_VERSION = "2026-11-18";

export const LEGAL_OPERATORS = [
  "Arslon Rajabov",
  "Abdulaziz Yusupaliev",
] as const;

export const LEGAL_DOCUMENT_HASHES = {
  uz: "7e4b405921693cf6a4763056cdcb939912da4b1f3da28ef070ca6c8657ba5155",
  ru: "a2a410274f8520ee6e0c776d831e630aa0c4069171abea09da9f42d53b966fc8",
  en: "d6f5b10ae69816453784ec3d247ea813b782c210fd0366e5f20cf303c5512be5",
} as const;

export function legalContact() {
  return {
    email: process.env.LEGAL_CONTACT_EMAIL?.trim() || null,
    address: process.env.LEGAL_CORRESPONDENCE_ADDRESS?.trim() || null,
  };
}
