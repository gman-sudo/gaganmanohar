"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  ["Work", "#work", "work"],
  ["About", "#about", "about"],
  ["Experience", "#experience", "experience"],
  ["Skills", "#skills", "skills"],
  ["Contact", "#contact", "contact"],
] as const;

export default function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = [
      "work",
      "about",
      "experience",
      "skills",
      "contact",
    ];

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const position = window.scrollY + 180;
      let current = "";

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (section && position >= section.offsetTop) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 sm:px-5">
      <div className="mx-auto max-w-7xl pt-3 sm:pt-5">
        <div
          className={`relative flex items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-500 sm:px-5 sm:py-3 ${
            scrolled
              ? "border-white/[0.16] bg-[#090909]/80 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              : "border-white/10 bg-black/35 backdrop-blur-xl"
          }`}
        >
          {/* BRAND */}

          <Link
            href="/"
            onClick={() => setActiveSection("")}
            className="group flex items-center gap-2.5 px-2 text-sm font-semibold tracking-[0.18em] text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 transition duration-300 group-hover:scale-125 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.8)]" />

            GAGANMANOHAR
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(([label, href, id]) => (
              <a
                key={id}
                href={href}
                className={`relative rounded-full px-3.5 py-2 text-[13px] transition-all duration-300 ${
                  activeSection === id
                    ? "text-white"
                    : "text-white/50 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {label}

                <span
                  className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-cyan-400 transition-all duration-300 ${
                    activeSection === id
                      ? "w-3 opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
            {/* ADMIN */}

            <Link
              href="/admin"
              className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/60 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:inline-flex"
            >
              ADMIN
            </Link>

            {/* LET'S TALK */}

            <a
              href="#contact"
              style={{ color: "#000000" }}
              className="hidden rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-semibold transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-white/90 sm:inline-flex"
            >
              LET&apos;S TALK
            </a>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:hidden"
            >
              <span
                className={`text-lg leading-none transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
              >
                {mobileMenuOpen ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}

        <motion.div
          initial={false}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? "auto" : 0,
            y: mobileMenuOpen ? 0 : -8,
          }}
          className="overflow-hidden sm:hidden"
        >
          <nav className="mt-2 rounded-[26px] border border-white/10 bg-[#090909]/95 p-2 shadow-2xl backdrop-blur-2xl">
            {navItems.map(([label, href, id]) => (
              <a
                key={id}
                href={href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSection(id);
                }}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm transition ${
                  activeSection === id
                    ? "bg-white/[0.07] text-white"
                    : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>{label}</span>

                <span
                  className={`text-xs transition ${
                    activeSection === id
                      ? "text-cyan-400"
                      : "text-white/20"
                  }`}
                >
                  ↗
                </span>
              </a>
            ))}

            {/* MOBILE ADMIN */}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm font-medium text-white/70 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              ADMIN
            </Link>

            {/* MOBILE LET'S TALK */}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#000000" }}
              className="mt-2 flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              LET&apos;S TALK
            </a>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}