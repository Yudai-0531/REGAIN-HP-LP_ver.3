"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Closing.module.css";

gsap.registerPlugin(ScrollTrigger);

const BODY_LINES = [
  "「ダサいHP」への支払いは終わりだ。",
  "その資金で選手に投資を。あなたが創ったイケてるHPでチームの魅力を。",
  "チームにふさわしい「魅力が最大化するWebサイト」を手に入れろ。",
];

export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --- Section label & heading --- */
      const headEls = sectionRef.current?.querySelectorAll(
        `.${styles.fadeUp}`
      );
      if (headEls && headEls.length > 0) {
        gsap.from(headEls, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- Body lines stagger --- */
      const lines = sectionRef.current?.querySelectorAll(
        `.${styles.bodyLine}`
      );
      if (lines && lines.length > 0) {
        gsap.from(lines, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.3,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lines[0],
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- CTA card --- */
      if (ctaCardRef.current) {
        gsap.from(ctaCardRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          delay: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background layers */}
      <div className={styles.bgGrad} />
      <div className={styles.bgNoise} />
      <div className={styles.bgGrid} />

      <div className={styles.inner}>
        {/* Left: text block */}
        <div className={styles.textBlock}>
          {/* Label */}
          <p className={`${styles.sectionLabel} ${styles.fadeUp}`}>
            FINAL OPERATION
          </p>

          {/* Heading */}
          <h2 className={`${styles.heading} ${styles.fadeUp}`}>
            浮いた予算を、
            <br />
            <span className={styles.accent}>勝利への投資</span>へ。
          </h2>

          {/* Body lines */}
          <div className={styles.bodyWrap}>
            {BODY_LINES.map((line, i) => (
              <p key={i} className={styles.bodyLine}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Right: CTA card */}
        <div ref={ctaCardRef} className={styles.ctaCard}>
          {/* HUD corners */}
          <span className={`${styles.corner} ${styles.cTL}`} />
          <span className={`${styles.corner} ${styles.cTR}`} />
          <span className={`${styles.corner} ${styles.cBL}`} />
          <span className={`${styles.corner} ${styles.cBR}`} />

          {/* Logo text */}
          <p className={styles.logo}>REGAIN</p>
          <p className={styles.ctaSub}>無料相談・デモ体験はこちら</p>

          {/* CTA button */}
          <a href="#contact" className={styles.ctaButton}>
            <span className={styles.ctaText}>無料相談に参加する</span>
          </a>

          {/* Badge */}
          <span className={styles.badge}>全額返金保証付き</span>
        </div>
      </div>
    </section>
  );
}
