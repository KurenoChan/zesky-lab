import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Zesky Lab — Software Engineer", template: "%s · Zesky Lab" },
  description: "Zesky Lab is an interactive software engineering portfolio exploring systems, interfaces, and the decisions behind them.",
  openGraph: { title: "Zesky Lab — Software Engineer", description: "Systems, interfaces, and experiments—built with intent.", type: "website", siteName: "Zesky Lab" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}</body>
    </html>
  );
}
