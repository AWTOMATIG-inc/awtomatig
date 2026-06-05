import Footer from "@/components/footer/Footer";
import GTMProvider from "@/components/GTMProvider";
import Header from "@/components/Header";
import CookiePopup from "@/components/home/CookiePopup";
import { GoogleTagManager } from "@next/third-parties/google";
import {
  Inter,
  Manrope,
  Montserrat,
  Press_Start_2P,
  Russo_One,
  Silkscreen,
  Sora,
} from "next/font/google";
import "swiper/css";
import "./common.css";
import "./globals.css";
const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
});
const russoOne = Russo_One({
  variable: "--font-russo-one",
  subsets: ["latin"],
  weight: "400",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});
const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://awtomatig.com";

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
    <html lang="en">
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
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <body
        className={`${pressStart2P.variable} ${manrope.variable} ${sora.variable} ${silkscreen.variable} ${russoOne.variable} ${inter.variable} ${montserrat.variable} font-manrope bg-black overflow-x-hidden  text-white antialiased`}
      >
        <GTMProvider />
        <CookiePopup />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
