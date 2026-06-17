import Footer from "@/components/footer/Footer";
import Header from "@/components/Header";
import CookiePopup from "@/components/home/CookiePopup";

export default function MainLayout({ children }) {
  return (
    <>
      <CookiePopup />
      <Header />
      {children}
      <Footer />
    </>
  );
}
