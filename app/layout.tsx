import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm",
});

export const metadata: Metadata = {
  title: `${site.name} — IT specialist · web, design & support`,
  description: site.lede,
  openGraph: {
    title: `${site.name} — IT specialist`,
    description: site.lede,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — IT specialist`,
    description: site.lede,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <div className="site-shell">{children}</div>
        <noscript>
          <style>{`.reveal{opacity:1}`}</style>
        </noscript>
      </body>
    </html>
  );
}
