"use client";
import awtomatig_logo from "@/assets/logo/awtomatig-logo.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HambargerIcon, LinkDownArrowIcon } from "./SvgIcons";
import FadeInSection from "./animation/FadeEffect";

const links = [
  {
    id: 1,
    pathname: "Home",
    path: "/",
  },

  {
    id: 3,
    pathname: "Services",
    path: "/services",
  },
  {
    id: 4,
    pathname: "Process",
    path: "/process",
  },
  {
    id: 5,
    pathname: "About us",
    path: "/about-us",
  },
  {
    id: 6,
    pathname: "Contact",
    path: "/contact",
  },
];
export default function Header() {
  const [isShowNav, setIsShowNav] = useState(false);
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header className="fixed w-full top-0 z-99 ">
        <div
          className={`relative ${
            scrolled ? "bg-black/80" : "bg-black/80 lg:bg-transparent"
          }`}
        >
          <FadeInSection
            initial={{ opacity: 0, y: -100 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: -80 }}
            margin="40px 0px -40px 0px"
          >
            <nav className="container py-2">
              <div className="flex justify-between items-center   text-white">
                <div>
                  <Link href="/" className="hover:text-gray-400">
                    <Image
                      src={awtomatig_logo}
                      alt="Logo"
                      width={81}
                      height={112}
                      className="object-cover w-[55px] lg:w-full lg:h-full max-w-[81px] max-h-[112px]"
                    />
                  </Link>
                </div>
                <ul className="hidden lg:flex justify-center w-full lg:space-x-5 xl:space-x-8 ">
                  {links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.path}
                        className={`text-sm font-bold flex items-end gap-2 hover:text-gold transition-colors duration-300 uppercase px-4 py-1.5 rounded-md hover:bg-dark ${
                          path == link.path && "bg-dark"
                        }`}
                      >
                        <span>{link.pathname} </span>
                        <LinkDownArrowIcon className="relative bottom-1" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://awlabs.online/"
                  target="_blank"
                  className="hidden lg:flex justify-center items-center gap-5 border px-5 py-2 bg-gradient-to-r from-blue-light to-pink-400 text-black rounded-lg font-bold hover:bg-gradient-to-l"
                >
                  Awlabs
                  <Icon
                    icon="meteor-icons:arrow-up-right"
                    width="21"
                    height="21"
                  />
                </a>

                <button
                  onClick={() => setIsShowNav((prev) => !prev)}
                  className="cursor-pointer lg:hidden"
                >
                  <HambargerIcon />
                </button>
                {/* for mobile */}
                <div
                  className={`lg:hidden absolute z-99 top-[87px] right-0 w-full h-screen transition-all duration-300  bg-black/80  origin-top ${
                    isShowNav
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  }`}
                >
                  <ul className="flex flex-col gap-y-9 md:gap-y-10 py-16 justify-center items-center">
                    {links.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={link.path}
                          className={`hover:text-blue-400 text-lg md:text-xl transition-colors duration-300 uppercase font-bold ${
                            path == link.path && "text-gold"
                          }`}
                        >
                          {link.pathname}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://awlabs.online/"
                    target="_blank"
                    className="flex justify-center items-center gap-5 border px-5 py-2 bg-gradient-to-r from-blue-light to-pink-400 hover:bg-gradient-to-l text-black rounded-lg font-bold w-fit mx-auto"
                  >
                    Awlabs
                    <Icon
                      icon="meteor-icons:arrow-up-right"
                      width="21"
                      height="21"
                    />
                  </a>
                </div>
              </div>
            </nav>
          </FadeInSection>
        </div>
      </header>
    </>
  );
}
