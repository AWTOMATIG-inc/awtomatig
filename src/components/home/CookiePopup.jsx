"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function CookiePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const consent = localStorage.getItem("awtomatig_cookie_consent");
      if (!consent) {
        // Smooth entrance shortly after mount
        const timer = setTimeout(() => setIsOpen(true), 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Safari private browsing may block localStorage access
    }
  }, []);

  const handleConsent = (type) => {
    setIsClosing(true);
    setTimeout(() => {
      try {
        localStorage.setItem("awtomatig_cookie_consent", type);
        localStorage.setItem("cookieAccepted", type === "accepted" ? "true" : "false");
      } catch {
        // Safari private browsing may block localStorage access
      }
      setIsOpen(false);
    }, 280);
  };

  if (!isOpen) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie Consent Banner"
      className={`fixed bottom-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-out ${
        isClosing
          ? "opacity-0 translate-y-6"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="relative w-full border-t border-white/10 bg-[#07090E]/98 shadow-[0_-12px_45px_rgba(0,0,0,0.85)]">
        {/* Subtle top edge gradient highlight with brand colors */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#02D5E8]/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 mb-2">
            {/* Left: Golden Cookie Icon + Notice Text */}
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
              {/* Golden Bitten Cookie Vector Icon */}
              <div className="relative shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
                <svg
                  className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 drop-shadow-[0_2px_12px_rgba(245,166,35,0.3)]"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Golden Cookie Base */}
                  <path
                    d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 23.25 43.95 22.5 43.85 21.8C42.2 22.3 40.5 21.95 39.2 20.95C37.5 19.65 36.9 17.4 37.8 15.5C36 14.9 34.8 13.2 34.9 11.3C35 9.4 36.4 7.8 38.3 7.6C36.8 5.4 34.4 4 24 4Z"
                    fill="#E89D3F"
                  />
                  {/* Subtle Top-Layer Honey Highlight */}
                  <path
                    d="M24 6C14.059 6 6 14.059 6 24C6 33.941 14.059 42 24 42C33.941 42 42 33.941 42 24C42 23.3 41.95 22.65 41.86 22.02C40.4 22.42 38.8 22.08 37.65 21.15C36.1 19.92 35.6 17.85 36.4 16.05C34.7 15.5 33.6 13.9 33.7 12.1C33.8 10.3 35.1 8.8 36.9 8.6C35.5 6.4 33.2 6 24 6Z"
                    fill="#F5A843"
                  />
                  {/* Dark Chocolate Chips */}
                  <circle cx="15" cy="18" r="2.4" fill="#3D1D09" />
                  <circle cx="25" cy="15" r="2.2" fill="#3D1D09" />
                  <circle cx="20" cy="27" r="2.5" fill="#3D1D09" />
                  <circle cx="13" cy="32" r="2.1" fill="#3D1D09" />
                  <circle cx="28" cy="33" r="2.3" fill="#3D1D09" />
                  <circle cx="34" cy="26" r="2" fill="#3D1D09" />
                  {/* Outer Crumbs */}
                  <circle cx="43" cy="12" r="1.1" fill="#E89D3F" />
                  <circle cx="45" cy="17" r="0.9" fill="#F5A843" />
                </svg>
              </div>

              {/* Text Copy */}
              <div className="text-left font-inter">
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  We care about your data, and we only use cookies to improve your experience and analyze traffic. By using our platform, you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => setShowPolicyDetails(!showPolicyDetails)}
                    className="text-[#02D5E8] hover:text-[#44B6E9] underline underline-offset-2 font-medium transition-colors cursor-pointer inline-flex items-center gap-0.5"
                  >
                    <span>Cookies Policy</span>
                    <Icon
                      icon="solar:alt-arrow-down-linear"
                      className={`w-3 h-3 transition-transform duration-200 ${
                        showPolicyDetails ? "rotate-180 text-[#02D5E8]" : ""
                      }`}
                    />
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Right: Actions Styled Consistent with Site Brand Buttons */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0 self-end md:self-center">
              {/* Decline Button (Secondary Site Button Style) */}
              <button
                type="button"
                onClick={() => handleConsent("declined")}
                className="px-5 sm:px-6 h-[38px] sm:h-[42px] rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#02d5e8]/50 text-white font-inter font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(2,213,232,0.2)] active:scale-95 whitespace-nowrap cursor-pointer"
              >
                Decline
              </button>

              {/* Accept Button (Primary Site Button Gradient & Glow) */}
              <button
                type="button"
                onClick={() => handleConsent("accepted")}
                className="group relative inline-flex items-center justify-center gap-1.5 px-6 sm:px-7 h-[38px] sm:h-[42px] rounded-full bg-gradient-to-r from-[#02d5e8] via-[#44b6e9] to-[#b66dd2] text-[#050508] font-inter font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(2,213,232,0.55)] hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Icon icon="solar:cookie-bold" className="w-3.5 h-3.5 text-[#050508]" />
                <span>Accept</span>
              </button>

              {/* Close 'X' Button 
              <button
                type="button"
                aria-label="Dismiss cookie notice"
                onClick={() => handleConsent("dismissed")}
                className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 active:scale-90 cursor-pointer ml-0.5"
              >
                <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
              </button>*/}
            </div>
          </div>

          {/* Expandable Cookies Policy Disclosure */}
          {showPolicyDetails && (
            <div className="mt-3 pt-3 border-t border-white/[0.08] text-xs text-neutral-400 font-inter leading-relaxed text-left animate-fadeIn max-w-4xl">
              <p>
                Awtomatig uses essential technical cookies to keep our platform secure, along with privacy-friendly analytics to understand page interactions and optimize load speeds. We never sell, rent, or trade your personal browsing activity with third-party advertisers.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
