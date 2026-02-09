"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Support.module.css";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: "initial",
    code: "PHASE_01",
    name: "Initial Boost",
    nameSub: "初期ブースト",
    period: "納品後 30〜60日間",
    desc: "公開直後の不安を解消。修正・質問に即対応するスタートダッシュ支援。",
  },
  {
    id: "care",
    code: "PHASE_02",
    name: "REGAIN Care",
    nameSub: "継続サポート",
    period: "月額 ¥1,100〜",
    desc: "軽微な修正・テキスト変更・相談をカバー。月額制で安心の運用パートナー。",
  },
  {
    id: "spot",
    code: "PHASE_03",
    name: "Spot Support",
    nameSub: "スポット対応",
    period: "¥3,300 / 回〜",
    desc: "必要な時だけ依頼できる単発サポート。大きな変更やページ追加に対応。",
  },
] as const;

/* SVG icons as components for each stage */
function ShieldIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon}>
      <path
        d="M24 4 L6 14 L6 26 C6 36 14 44 24 46 C34 44 42 36 42 26 L42 14 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 12 L12 18 L12 27 C12 33 17 39 24 40 C31 39 36 33 36 27 L36 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0.5"
      />
      <polyline
        points="17,25 22,30 31,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon}>
      <rect
        x="6"
        y="8"
        width="36"
        height="26"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <polygon
        points="14,34 20,34 17,42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line
        x1="14"
        y1="17"
        x2="34"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="14"
        y1="22"
        x2="28"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="14"
        y1="27"
        x2="22"
        y2="27"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon}>
      <path
        d="M36 8 C32 4 26 4 22 8 C19 11 18 15 20 19 L8 31 C6 33 6 37 8 39 L9 40 C11 42 15 42 17 40 L29 28 C33 30 37 29 40 26 C44 22 44 16 40 12 L34 18 L30 14 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="36"
        r="2"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

const ICONS: Record<string, () => React.JSX.Element> = {
  initial: ShieldIcon,
  care: ChatIcon,
  spot: WrenchIcon,
};

export default function Support() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading fade up */
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

      /* Cards stagger */
      const cards = sectionRef.current?.querySelectorAll(
        `.${styles.card}`
      );
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
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
      {/* Background grid */}
      <div className={styles.gridBg} />

      {/* Label */}
      <p className={`${styles.sectionLabel} ${styles.fadeUp}`}>
        DEFENSE PROTOCOL
      </p>

      {/* Heading */}
      <h2 className={`${styles.sectionHeading} ${styles.fadeUp}`}>
        「作って終わり」にはしない。
        <br />
        <span className={styles.accent}>鉄壁の守り。</span>
      </h2>

      {/* Cards row */}
      <div className={styles.cardsRow}>
        {STAGES.map((stage) => {
          const IconComp = ICONS[stage.id];
          return (
            <div key={stage.id} className={styles.card}>
              {/* HUD corners */}
              <span className={`${styles.corner} ${styles.cTL}`} />
              <span className={`${styles.corner} ${styles.cTR}`} />
              <span className={`${styles.corner} ${styles.cBL}`} />
              <span className={`${styles.corner} ${styles.cBR}`} />

              {/* Phase code */}
              <span className={styles.phaseCode}>{stage.code}</span>

              {/* Icon */}
              <div className={styles.iconWrap}>
                <IconComp />
              </div>

              {/* Name */}
              <h3 className={styles.cardName}>{stage.name}</h3>
              <p className={styles.cardNameSub}>{stage.nameSub}</p>

              {/* Period / price tag */}
              <span className={styles.tag}>{stage.period}</span>

              {/* Description */}
              <p className={styles.cardDesc}>{stage.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
