"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mainCopyRef = useRef<HTMLHeadingElement>(null);
  const subCopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Glitch overlay ---
      const glitchEl = glitchRef.current;
      if (glitchEl) {
        gsap.set(glitchEl, { opacity: 1 });
        gsap.to(glitchEl, {
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.inOut",
        });
      }

      // --- Video reveal ---
      const videoEl = videoRef.current;
      if (videoEl) {
        gsap.from(videoEl, {
          opacity: 0,
          scale: 1.1,
          duration: 1.8,
          delay: 0.3,
          ease: "power2.out",
        });
      }

      // --- Background texture fade in ---
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        gsap.from(overlayEl, {
          opacity: 0,
          duration: 1.2,
          delay: 0.4,
          ease: "power2.out",
        });
      }

      // --- Main copy stagger ---
      const mainLines = mainCopyRef.current?.querySelectorAll(
        `.${styles.heroLine}`
      );
      if (mainLines && mainLines.length > 0) {
        gsap.from(mainLines, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.6,
          ease: "power3.out",
        });
      }

      // --- Sub copy ---
      if (subCopyRef.current) {
        gsap.from(subCopyRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 1.2,
          ease: "power3.out",
        });
      }

      // --- CTA button ---
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 1.6,
          ease: "power3.out",
        });
      }

      // --- Tagline ---
      if (taglineRef.current) {
        gsap.from(taglineRef.current, {
          opacity: 0,
          duration: 1,
          delay: 2.0,
          ease: "power2.out",
        });
      }

      // --- Scanline animation ---
      if (scanlineRef.current) {
        gsap.to(scanlineRef.current, {
          y: "100vh",
          duration: 8,
          repeat: -1,
          ease: "none",
          delay: 1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      {/* Video background */}
      <video
        ref={videoRef}
        className={styles.videoBg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      {/* Dark overlay for text readability */}
      <div className={styles.videoOverlay} />

      {/* Glitch overlay */}
      <div ref={glitchRef} className={styles.glitchOverlay}>
        <div className={styles.glitchBar} />
        <div className={styles.glitchBar} />
        <div className={styles.glitchBar} />
        <div className={styles.glitchBar} />
        <div className={styles.glitchBar} />
      </div>

      {/* Fence mesh texture background */}
      <div ref={overlayRef} className={styles.meshOverlay} />

      {/* Scanline */}
      <div ref={scanlineRef} className={styles.scanline} />

      {/* Content */}
      <div className={styles.content}>
        <h1 ref={mainCopyRef} className={styles.mainCopy}>
          <span className={styles.heroLine}>
            チームから
            <span className={styles.accent}>毎月払う1万円。</span>
          </span>
          <span className={styles.heroLine}>そのホームページにかかる費用、</span>
          <span className={styles.heroLine}>いつまで払い続ける？</span>
        </h1>

        <p ref={subCopyRef} className={styles.subCopy}>
          「正直、うちのホームページってダサいよね…」
          <br />
          その気持ちから、解放され、新しい時代のホームページ運用をしよう。
        </p>

        <div ref={ctaRef} className={styles.ctaWrap}>
          <a href="#contact" className={styles.ctaButton}>
            <span className={styles.ctaText}>START !</span>
            {/* HUD corner decorations */}
            <span className={`${styles.ctaCorner} ${styles.topLeft}`} />
            <span className={`${styles.ctaCorner} ${styles.topRight}`} />
            <span className={`${styles.ctaCorner} ${styles.bottomLeft}`} />
            <span className={`${styles.ctaCorner} ${styles.bottomRight}`} />
          </a>
          <span className={styles.badge}>全額返金保証付き</span>
        </div>
      </div>

      {/* Bottom tagline */}
      <p ref={taglineRef} className={styles.tagline}>
        REGAIN: The Web Revolution for Sports &amp; Wellness.
      </p>
    </section>
  );
}
