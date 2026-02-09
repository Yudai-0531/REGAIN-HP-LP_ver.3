"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ThePain.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ThePain() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Left panel slide in ---
      if (leftPanelRef.current) {
        gsap.from(leftPanelRef.current, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // --- Right panel slide in ---
      if (rightPanelRef.current) {
        gsap.from(rightPanelRef.current, {
          x: 80,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // --- Error codes stagger ---
      const errorItems = rightPanelRef.current?.querySelectorAll(
        `.${styles.errorItem}`
      );
      if (errorItems && errorItems.length > 0) {
        gsap.from(errorItems, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.25,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightPanelRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // --- Warning flash ---
      if (warningRef.current) {
        gsap.from(warningRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          delay: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: warningRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            // Flash effect
            gsap.to(warningRef.current, {
              opacity: 0.3,
              duration: 0.1,
              yoyo: true,
              repeat: 3,
              ease: "power1.inOut",
            });
          },
        });
      }

      // --- Section heading ---
      const heading = sectionRef.current?.querySelector(
        `.${styles.sectionHeading}`
      );
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // --- Bottom emphasis box ---
      const emphasisBox = sectionRef.current?.querySelector(
        `.${styles.emphasisBox}`
      );
      if (emphasisBox) {
        gsap.from(emphasisBox, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: emphasisBox,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background grid */}
      <div className={styles.gridBg} />

      {/* HUD corner brackets */}
      <span className={`${styles.hudCorner} ${styles.cTopLeft}`} />
      <span className={`${styles.hudCorner} ${styles.cTopRight}`} />
      <span className={`${styles.hudCorner} ${styles.cBottomLeft}`} />
      <span className={`${styles.hudCorner} ${styles.cBottomRight}`} />

      {/* Scrolling ticker */}
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          <span>SYSTEM FAILURE DETECTED</span>
          <span>SYSTEM FAILURE DETECTED</span>
          <span>SYSTEM FAILURE DETECTED</span>
          <span>SYSTEM FAILURE DETECTED</span>
          <span>SYSTEM FAILURE DETECTED</span>
          <span>SYSTEM FAILURE DETECTED</span>
        </div>
      </div>

      {/* Section label */}
      <p className={styles.sectionLabel}>STATUS QUO ANALYSIS: NEGATIVE</p>

      {/* Heading */}
      <h2 className={styles.sectionHeading}>
        既存業者の<span className={styles.accent}>「搾取構造」</span>
      </h2>

      {/* Two-column layout */}
      <div className={styles.columns}>
        {/* Left: System Architecture diagram */}
        <div ref={leftPanelRef} className={styles.leftPanel}>
          <p className={styles.panelLabel}>CURRENT SYSTEM ARCHITECTURE</p>

          <div className={styles.flowDiagram}>
            {/* TEAM BUDGET */}
            <div className={styles.flowNode}>
              <span className={styles.flowNodeLabel}>TEAM BUDGET</span>
              <span className={styles.flowNodeSub}>チームの予算</span>
            </div>

            {/* Arrow down */}
            <div className={styles.flowArrow}>
              <span className={styles.arrowLine} />
              <span className={styles.arrowHead}>&#9660;</span>
            </div>

            {/* BLACK BOX */}
            <div className={`${styles.flowNode} ${styles.blackBox}`}>
              <span className={styles.flowNodeLabel}>BLACK BOX AGENCY</span>
              <span className={styles.flowNodeSub}>ブラックボックス</span>
              <span className={styles.lockIcon}>&#128274;</span>
            </div>

            {/* Arrow down */}
            <div className={styles.flowArrow}>
              <span className={styles.arrowLine} />
              <span className={styles.arrowHead}>&#9660;</span>
            </div>

            {/* OUTDATED SITE */}
            <div className={`${styles.flowNode} ${styles.outdated}`}>
              <span className={styles.flowNodeLabel}>OUTDATED SITE</span>
              <span className={styles.flowNodeSub}>時代遅れのサイト</span>
            </div>
          </div>

          {/* Warning */}
          <div ref={warningRef} className={styles.warning}>
            <span className={styles.warningIcon}>&#9888;</span>
            <span>年間12万円以上の死に金</span>
            <span className={styles.warningIcon}>&#9888;</span>
          </div>
        </div>

        {/* Right: Error codes */}
        <div ref={rightPanelRef} className={styles.rightPanel}>
          <p className={styles.panelLabel}>
            ERROR CODES{" "}
            <span className={styles.panelLabelSub}>(The Triple Suffering)</span>
          </p>

          <div className={styles.errorList}>
            <div className={styles.errorItem}>
              <div className={styles.errorHeader}>
                <span className={styles.errorIcon} />
                <span className={styles.errorCode}>ERR_01</span>
                <span className={styles.errorTitle}>EXCESSIVE_CHARGES</span>
              </div>
              <p className={styles.errorDesc}>
                修正依頼のたびに追加費用。小さなテキスト変更でも5,000円〜。年間の修正費だけで数万円が消える。
              </p>
            </div>

            <div className={styles.errorItem}>
              <div className={styles.errorHeader}>
                <span className={styles.errorIcon} />
                <span className={styles.errorCode}>ERR_02</span>
                <span className={styles.errorTitle}>QUALITY_DEGRADATION</span>
              </div>
              <p className={styles.errorDesc}>
                「スマホで見づらい」「情報が古い」——保護者や会員からのクレームが止まらない。
              </p>
            </div>

            <div className={styles.errorItem}>
              <div className={styles.errorHeader}>
                <span className={styles.errorIcon} />
                <span className={styles.errorCode}>ERR_03</span>
                <span className={styles.errorTitle}>VENDOR_LOCK_IN</span>
              </div>
              <p className={styles.errorDesc}>
                解約したらサイトごと消滅。ドメインもデザインデータも、全て業者の&quot;人質&quot;。
              </p>
            </div>
          </div>

          {/* Emphasis box */}
          <div className={styles.emphasisBox}>
            <p>
              あなたのチームの「顔」であるHPが、
              <br />
              他人にコントロールされている。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
