import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { LabIntro } from "@/components/motion/lab-intro";
import { ProjectTransition } from "@/components/motion/project-transition";
import { CustomCursor } from "@/components/motion/custom-cursor";
import "./globals.css";

const bodyFont = localFont({ src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", variable: "--font-manrope", display: "swap", weight: "200 800" });
const displayFont = localFont({ src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2", variable: "--font-space-grotesk", display: "swap", weight: "300 700" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Zesky Lab — Software Engineer", template: "%s · Zesky Lab" },
  description: "Zesky Lab is an interactive software engineering portfolio exploring systems, interfaces, and the decisions behind them.",
  openGraph: { title: "Zesky Lab — Software Engineer", description: "Systems, interfaces, and experiments—built with intent.", type: "website", siteName: "Zesky Lab" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}><a className="skip-link" href="#main">Skip to content</a><SmoothScroll /><CustomCursor /><ProjectTransition><LabIntro /><SiteHeader />{children}</ProjectTransition></body>
    </html>
  );
}
