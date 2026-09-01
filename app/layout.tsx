import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyleSwitcher from "./style-switcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volontyorlar — YVC",
  description: "Youth Volunteering Community — Uzbekistan",
  icons: {
    icon: "/logo/volontyorlar-mark.svg",
    apple: "/apple-icon.png",
  },
};

const showStyleSwitcher =
  process.env.NEXT_PUBLIC_SHOW_STYLE_SWITCHER === "true";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {showStyleSwitcher ? <StyleSwitcher /> : null}
      </body>
    </html>
  );
}
