"use client";

import awtomatig_logo from "@/assets/logo/awtomatig-logo.png";
import { pushEvent } from "@/lib/gtm";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  {
    id: 1,
    num: "01",
    pathname: "Home",
    path: "/",
  },
  {
    id: 2,
    num: "02",
    pathname: "Services",
    path: "/services",
  },
  {
    id: 3,
    num: "03",
    pathname: "Process",
    path: "/process",
  },
  {
    id: 4,
    num: "04",
    pathname: "About us",
    path: "/about-us",
  },
  {
    id: 5,
    num: "05",
    pathname: "Contact",
    path: "/contact",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Capsule style change
          setScrolled(currentScrollY > 20);

          // Always show near the very top of page or when mobile drawer is open
          if (currentScrollY <= 60 || isOpen) {
            setVisible(true);
          } else {
            const scrollDiff = currentScrollY - lastScrollY;
            if (Math.abs(scrollDiff) > 6) {
              if (scrollDiff > 0 && currentScrollY > 80) {
                // Scrolling down: hide navbar
                setVisible(false);
              } else if (scrollDiff < 0) {
                // Scrolling up: reveal navbar
                setVisible(true);
              }
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] w-full pointer-events-none transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className={`w-full mx-auto px-4 sm:px-6 transition-all duration-500 ease-out flex justify-center ${
          scrolled ? "pt-2.5 sm:pt-3" : "pt-4 sm:pt-6"
        }`}
      >
        {/* Floating Capsule Bar */}
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto relative w-full max-w-7xl flex items-center justify-between rounded-full transition-all duration-500 ease-out ${
            scrolled
              ? "bg-[#09090c]/95 border-white/[0.14] py-2 px-3.5 sm:px-5"
              : "bg-[#0a0a0e]/90 border-white/[0.1] py-2.5 px-4 sm:px-6"
          } border`}
        >
          {/* Left: Brand Identity / Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <Link
              href="/"
              onClick={() => pushEvent({ event: "nav_click", label: "Logo Home" })}
              className="group flex items-center gap-2.5 transition-transform duration-300 active:scale-95"
            >
              <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.04] border border-white/[0.08] group-hover:border-[#02d5e8]/40 group-hover:bg-white/[0.08] transition-all duration-300 shadow-inner">
                <Image
                  src={awtomatig_logo}
                  alt="Awtomatig Logo"
                  width={24}
                  height={32}
                  priority
                  className="w-4 sm:w-5 h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Brand name text: only on desktop (lg+), hidden on mobile */}
              <span className="font-russo-one tracking-wider text-xs sm:text-sm text-white/90 group-hover:text-white transition-colors duration-300 hidden lg:inline-block">
                AWTOMATIG
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Floating inner pill) */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1 p-1 rounded-full shadow-inner">
              {links.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.id}>
                    <Link
                      href={link.path}
                      onClick={() =>
                        pushEvent({
                          event: "nav_click",
                          label: link.pathname,
                          path: link.path,
                        })
                      }
                      className={`nav-link-item group relative px-4 py-1.5 rounded-full text-[13px] font-medium tracking-wide uppercase font-inter transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? "bg-white/[0.14] text-white font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.4)] border border-white/10"
                          : "text-neutral-300/80 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                        {link.pathname}
                      </span>
                      <span className="nav-link-glow-bar" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Desktop AWLABS Glow Button & Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-10">
            {/* Desktop: AWLABS Button with signature glowing hover effect (Desktop Only) */}
            <a
              href="https://awlabs.online/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                pushEvent({
                  event: "cta_click",
                  cta_label: "Awlabs Nav Pill",
                  destination: "https://awlabs.online/",
                })
              }
              className="glow-button font-inter !h-9 sm:!h-10 !px-4 sm:!px-5 !text-xs sm:!text-sm !font-bold whitespace-nowrap !gap-1.5 !hidden lg:!inline-flex"
            >
              <span>AWLABS</span>
              <Icon
                icon="meteor-icons:arrow-up-right"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
              />
            </a>

            {/* Mobile Only: Contact Us Outside Button */}
            <Link
              href="/contact"
              onClick={() =>
                pushEvent({
                  event: "cta_click",
                  cta_label: "Navbar Contact Us",
                  destination: "/contact",
                })
              }
              className="!inline-flex lg:!hidden relative items-center gap-1.5 px-3 sm:px-4 h-8 sm:h-9 rounded-full bg-[#0c1017] hover:bg-[#121824] border border-white/15 hover:border-[#02d5e8]/50 text-white font-inter font-medium text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)] active:scale-95"
            >
              <span>Contact Us</span>
              <Icon
                icon="solar:phone-calling-linear"
                className="w-3.5 h-3.5 text-[#02d5e8]"
              />
            </Link>

            {/* Mobile Hamburger / Close Toggle Button */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className={`lg:hidden relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all duration-300 active:scale-90 cursor-pointer ${
                isOpen
                  ? "bg-white/10 border-white/30 text-white"
                  : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-white"
              }`}
            >
              <div className="w-3.5 h-3 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                    isOpen ? "rotate-45 translate-y-[5.25px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-white rounded-full transition-all duration-200 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                    isOpen ? "-rotate-45 -translate-y-[5.25px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Full-Screen Backdrop Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[-2] bg-black/90 transition-opacity duration-400 ease-in-out pointer-events-auto ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Navigation Dropdown Menu (Sliding Down from Top) */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-[-1] w-full bg-[#07090e]/98 border-b border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] pt-24 pb-8 px-6 sm:px-8 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto transform ${
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Subtle Ambient Glow Canvas along bottom border */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#02d5e8]/40 to-transparent pointer-events-none" />

        <div className="max-w-md mx-auto flex flex-col justify-between">
          {/* Minimal, sleek navigation list */}
          <ul className="flex flex-col gap-4 py-2">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.id}>
                  <Link
                    href={link.path}
                    onClick={() => {
                      pushEvent({
                        event: "mobile_nav_click",
                        label: link.pathname,
                        path: link.path,
                      });
                      setIsOpen(false);
                    }}
                    className={`group flex items-center justify-between py-1 transition-all duration-300 font-inter ${
                      isActive
                        ? "text-[#02d5e8] font-semibold"
                        : "text-white/90 hover:text-[#02d5e8] hover:translate-x-1"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl font-medium tracking-tight">
                      {link.pathname}
                    </span>

                    {link.pathname === "Services" ? (
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.08] border border-white/10 group-hover:border-[#02d5e8]/40 group-hover:bg-[#02d5e8]/10 transition-colors">
                        <Icon
                          icon="solar:arrow-right-down-linear"
                          className="w-3.5 h-3.5 text-white/70 group-hover:text-[#02d5e8] transition-colors"
                        />
                      </div>
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#02d5e8] shadow-[0_0_10px_#02d5e8]" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bottom Actions within Dropdown */}
          <div className="pt-6 mt-3 border-t border-white/[0.08] flex flex-col gap-3">
            {/* Prominent AWLABS Pill Button with signature glowing effect */}
            <a
              href="https://awlabs.online/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                pushEvent({
                  event: "cta_click",
                  cta_label: "Awlabs Mobile Nav Pill",
                  destination: "https://awlabs.online/",
                });
                setIsOpen(false);
              }}
              className="glow-button font-inter group relative !flex !items-center !justify-between !w-full !h-12 !px-5 active:scale-95"
            >
              <span className="font-bold text-base text-[#050508] tracking-wide">
                AWLABS
              </span>
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#050508] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                <Icon icon="meteor-icons:arrow-up-right" className="w-4 h-4 font-bold" />
              </div>
            </a>

            {/* Secondary Discovery Call Link */}
            <a
              href="https://calendly.com/nahidr-awtomatig/30min?month=2025-04"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                pushEvent({ event: "cta_click", cta_label: "Mobile Nav Book Call" });
                setIsOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 py-1.5 text-xs font-inter text-neutral-400 hover:text-white transition-colors"
            >
              <span>Book a Discovery Call</span>
              <Icon icon="meteor-icons:arrow-up-right" className="w-3.5 h-3.5 text-[#02d5e8]" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
