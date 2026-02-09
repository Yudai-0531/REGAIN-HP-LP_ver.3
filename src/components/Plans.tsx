"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Plans.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------
   Plan data
   ------------------------------------------------ */
const PLAN_A = {
  code: "PLAN_A",
  loadout: "CHALLENGER LOADOUT",
  name: "AIコーチング型",
  price: "¥55,000",
  priceSub: "（税込）",
  sub: "自分で作る力を手に入れる",
  features: [
    "AI活用HP制作コーチング（全4回）",
    "テンプレート＆プロンプト集",
    "チャットサポート（30日間）",
    "ドメイン・サーバー初期設定サポート",
    "完成後の自走マニュアル",
  ],
};

const PLAN_B = {
  code: "PLAN_B",
  loadout: "HYBRID ASSAULT LOADOUT",
  name: "コーチング＋制作代行",
  price: "¥150,000",
  priceSub: "（税込）",
  sub: "プロの仕上がりを、あなたの手元に",
  recommended: true,
  features: [
    "Plan Aの全内容",
    "プロによるデザイン制作代行",
    "レスポンシブ対応（PC / スマホ）",
    "SEO基本設定",
    "公開後の修正サポート（60日間）",
    "AI運用トレーニング",
  ],
};

export default function Plans() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const careRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --- Heading --- */
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
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- Card A from left --- */
      if (cardARef.current) {
        gsap.from(cardARef.current, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardARef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- Card B from right --- */
      if (cardBRef.current) {
        gsap.from(cardBRef.current, {
          x: 80,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardBRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- REGAIN Care bar --- */
      if (careRef.current) {
        gsap.from(careRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: careRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- Guarantee badge --- */
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 92%",
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

      {/* Label */}
      <p className={`${styles.sectionLabel} ${styles.fadeUp}`}>
        SELECT YOUR WEAPON
      </p>

      {/* Heading */}
      <h2 className={`${styles.sectionHeading} ${styles.fadeUp}`}>
        チームの状況に合わせて選べる
        <span className={styles.accent}>「2つの武器」</span>
      </h2>

      {/* Cards row */}
      <div className={styles.cardsRow}>
        {/* Plan A */}
        <div ref={cardARef} className={`${styles.card} ${styles.cardCyan}`}>
          {/* HUD corners */}
          <span className={`${styles.corner} ${styles.cTL}`} />
          <span className={`${styles.corner} ${styles.cTR}`} />
          <span className={`${styles.corner} ${styles.cBL}`} />
          <span className={`${styles.corner} ${styles.cBR}`} />

          {/* Power gauge */}
          <div className={styles.gauge}>
            <span className={styles.gaugeLabel}>POWER</span>
            <div className={styles.gaugeTrack}>
              <div
                className={`${styles.gaugeFill} ${styles.gaugeCyan}`}
                style={{ width: "55%" }}
              />
            </div>
          </div>

          {/* Icon area — gear silhouette */}
          <div className={`${styles.iconArea} ${styles.iconCyan}`}>
            <svg viewBox="0 0 64 64" className={styles.planIcon}>
              <circle
                cx="32"
                cy="32"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="32"
                cy="32"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {/* Gear teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 32 + 22 * Math.cos(rad);
                const y1 = 32 + 22 * Math.sin(rad);
                const x2 = 32 + 28 * Math.cos(rad);
                const y2 = 32 + 28 * Math.sin(rad);
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          </div>

          <span className={styles.planCode}>{PLAN_A.code}</span>
          <h3 className={styles.planName}>{PLAN_A.name}</h3>
          <p className={styles.planSub}>{PLAN_A.sub}</p>

          <div className={styles.priceWrap}>
            <span className={styles.price}>{PLAN_A.price}</span>
            <span className={styles.priceSub}>{PLAN_A.priceSub}</span>
          </div>

          <ul className={styles.features}>
            {PLAN_A.features.map((f) => (
              <li key={f} className={styles.featureItem}>
                <span className={`${styles.featureDot} ${styles.dotCyan}`} />
                {f}
              </li>
            ))}
          </ul>

          <div className={`${styles.loadout} ${styles.loadoutCyan}`}>
            {PLAN_A.loadout}
          </div>
        </div>

        {/* Plan B */}
        <div ref={cardBRef} className={`${styles.card} ${styles.cardRed}`}>
          {/* Recommended badge */}
          <span className={styles.recBadge}>RECOMMENDED</span>

          {/* HUD corners */}
          <span className={`${styles.corner} ${styles.cTL}`} />
          <span className={`${styles.corner} ${styles.cTR}`} />
          <span className={`${styles.corner} ${styles.cBL}`} />
          <span className={`${styles.corner} ${styles.cBR}`} />

          {/* Power gauge */}
          <div className={styles.gauge}>
            <span className={styles.gaugeLabel}>POWER</span>
            <div className={styles.gaugeTrack}>
              <div
                className={`${styles.gaugeFill} ${styles.gaugeRed}`}
                style={{ width: "95%" }}
              />
            </div>
          </div>

          {/* Icon area — crosshair / target */}
          <div className={`${styles.iconArea} ${styles.iconRed}`}>
            <svg viewBox="0 0 64 64" className={styles.planIcon}>
              <circle
                cx="32"
                cy="32"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="32"
                cy="32"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="32"
                cy="32"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Crosshair lines */}
              <line
                x1="32"
                y1="4"
                x2="32"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="32"
                y1="48"
                x2="32"
                y2="60"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="4"
                y1="32"
                x2="16"
                y2="32"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="48"
                y1="32"
                x2="60"
                y2="32"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <span className={styles.planCode}>{PLAN_B.code}</span>
          <h3 className={styles.planName}>{PLAN_B.name}</h3>
          <p className={styles.planSub}>{PLAN_B.sub}</p>

          <div className={styles.priceWrap}>
            <span className={`${styles.price} ${styles.priceRed}`}>
              {PLAN_B.price}
            </span>
            <span className={styles.priceSub}>{PLAN_B.priceSub}</span>
          </div>

          <ul className={styles.features}>
            {PLAN_B.features.map((f) => (
              <li key={f} className={styles.featureItem}>
                <span className={`${styles.featureDot} ${styles.dotRed}`} />
                {f}
              </li>
            ))}
          </ul>

          <div className={`${styles.loadout} ${styles.loadoutRed}`}>
            {PLAN_B.loadout}
          </div>
        </div>
      </div>

      {/* REGAIN Care bar */}
      <div ref={careRef} className={styles.careBar}>
        <div className={styles.careLeft}>
          <span className={styles.careIcon}>&#9769;</span>
          <div>
            <p className={styles.careLabel}>SYSTEM PROTECTION ACTIVE</p>
            <p className={styles.careTitle}>REGAIN Care</p>
          </div>
        </div>
        <div className={styles.careRight}>
          <p className={styles.carePrice}>
            月額 <strong>¥1,100</strong>（税込）〜 / 修正依頼 Max ¥3,300
          </p>
          <p className={styles.careDesc}>
            公開後も安心。軽微な修正・相談をカバーするサポートプラン。
          </p>
        </div>
      </div>

      {/* Guarantee badge */}
      <div ref={badgeRef} className={styles.guarantee}>
        <span className={styles.guaranteeIcon}>&#9733;</span>
        <div>
          <p className={styles.guaranteeTitle}>全額返金保証</p>
          <p className={styles.guaranteeDesc}>
            内容に満足いただけなかった場合、全額返金いたします。
          </p>
        </div>
      </div>
    </section>
  );
}
