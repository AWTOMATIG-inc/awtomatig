import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Manrope, Press_Start_2P, Silkscreen, Sora } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
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

export const metadata = {
  title: "AWTOMATIG",
  description: "Developed by Shipon islam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${manrope.variable} ${sora.variable} ${silkscreen.variable} font-manrope bg-black overflow-x-hidden  text-white antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
