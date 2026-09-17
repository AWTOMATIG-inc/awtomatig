import GTMProvider from "@/components/GTMProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import {
  Inter,
  Manrope,
  Montserrat,
  Newsreader,
  Russo_One,
  Sora,
} from "next/font/google";
import "./animate.css";
import "./common.css";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});
const russoOne = Russo_One({
  variable: "--font-russo-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://awtomatig.com";

export const viewport = {
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Awtomatig — Business Automation, Operations & Web Development Agency",
    template: "%s | Awtomatig",
  },
  description:
    "Your extended tech and operations team without the overhead. Custom web platforms, AI workflow automation, ERPNext implementation, and back-office management. Founder-led since 2022.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Awtomatig",
    title: "Awtomatig — Business Automation, Operations & Web Development Agency",
    description:
      "Your extended tech and operations team without the overhead. Custom web platforms, AI workflow automation, ERPNext implementation, and back-office management.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awtomatig — Business Automation, Operations & Web Development Agency",
    description:
      "Your extended tech and operations team without the overhead. Custom web platforms, AI workflow automation, ERPNext implementation, and back-office management.",
    site: "@awtomatig",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Awtomatig",
  url: siteUrl,
  logo: `${siteUrl}/favicon.png`,
  foundingDate: "2022",
  sameAs: [
    "https://www.linkedin.com/company/awtomatig",
    "https://x.com/awtomatig",
    "https://www.instagram.com/awtomatig/",
    "https://www.facebook.com/awtomatig/",
    "https://medium.com/@awtomatig",
    "https://mastodon.social/@AWTOMATIG",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Awtomatig",
  url: siteUrl,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${sora.variable} ${russoOne.variable} ${inter.variable} ${montserrat.variable} ${newsreader.variable} font-manrope bg-black overflow-x-clip text-white antialiased`}
      >
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <GTMProvider />
        {children}
      </body>
    </html>
  );
}
