import Footer from "@/components/footer/Footer";
import Header from "@/components/Header";
import CookiePopup from "@/components/home/CookiePopup";
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

export const metadata = {
  title: "AWTOMATIG",
  description: "Developed by Shipon islam",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${manrope.variable} ${sora.variable} ${silkscreen.variable} ${russoOne.variable} ${inter.variable} ${montserrat.variable} font-manrope bg-black overflow-x-hidden  text-white antialiased`}
      >
        <CookiePopup />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
