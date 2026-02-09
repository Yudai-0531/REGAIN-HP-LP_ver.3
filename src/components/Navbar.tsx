"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "#pain", label: "課題" },
  { href: "#solution", label: "解決策" },
  { href: "#plans", label: "プラン" },
  { href: "#support", label: "サポート" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={handleLinkClick}>
          REGAIN
        </a>

        {/* Desktop links */}
        <ul className={styles.desktopLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={styles.ctaLink}>
              無料相談
            </a>
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.menuVisible : ""}`}
      >
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.mobileNavLink}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={styles.mobileCta}
              onClick={handleLinkClick}
            >
              無料相談に参加する
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
