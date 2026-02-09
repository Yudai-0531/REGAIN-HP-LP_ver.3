"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TheSolution.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------
   Graph constants — all values are in the SVG
   coordinate system (viewBox 0 0 800 400).
   ------------------------------------------------ */
const GRAPH = {
  // Plotting area inside the axes
  left: 80,
  right: 760,
  top: 20,
  bottom: 360,
  // Y-axis range
  yMin: 0,
  yMax: 2_000_000,
  // 12 months of data
  months: 12,
} as const;

/** Map a data-point (month, yen) to SVG coords */
function toSvg(month: number, yen: number) {
  const x =
    GRAPH.left +
    (month / GRAPH.months) * (GRAPH.right - GRAPH.left);
  const y =
    GRAPH.bottom -
    ((yen - GRAPH.yMin) / (GRAPH.yMax - GRAPH.yMin)) *
      (GRAPH.bottom - GRAPH.top);
  return { x, y };
}

/** Build an SVG polyline points string from monthly cumulative costs */
function buildPath(monthlyCost: number, initial: number = 0): string {
  const pts: string[] = [];
  for (let m = 0; m <= GRAPH.months; m++) {
    const { x, y } = toSvg(m, initial + monthlyCost * m);
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

// Traditional model: initial 300,000 + 10,000/mo → ~420,000 at 12 mo
// but to make the visual dramatic we show cumulative only (starts at ~100k/mo equivalent)
const TRAD_INITIAL = 300_000;
const TRAD_MONTHLY = 120_000; // ≈ agency retainer + hidden costs amortised
const REGAIN_INITIAL = 0;
const REGAIN_MONTHLY = 13_200; // 1,100 * 12 = 13,200/yr shown as monthly cumulative

export default function TheSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const tradLineRef = useRef<SVGPolylineElement>(null);
  const regainLineRef = useRef<SVGPolylineElement>(null);
  const graphWrapRef = useRef<HTMLDivElement>(null);

  /* Traditional line path */
  const tradPoints = buildPath(TRAD_MONTHLY, TRAD_INITIAL);
  /* REGAIN line path */
  const regainPoints = buildPath(REGAIN_MONTHLY, REGAIN_INITIAL);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --- Heading stagger --- */
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

      /* --- Graph line draw animation --- */
      const animateLine = (
        el: SVGPolylineElement | null,
        delay: number
      ) => {
        if (!el) return;
        const length = el.getTotalLength();
        gsap.set(el, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.8,
          delay,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: graphWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      };

      // White (REGAIN) draws first, then red (traditional)
      animateLine(regainLineRef.current, 0);
      animateLine(tradLineRef.current, 0.8);

      /* --- Graph labels fade in --- */
      const labels = graphWrapRef.current?.querySelectorAll(
        `.${styles.graphLabel}`
      );
      if (labels && labels.length > 0) {
        gsap.from(labels, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          stagger: 0.3,
          delay: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: graphWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- HUD card --- */
      const hudCard = sectionRef.current?.querySelector(
        `.${styles.hudCard}`
      );
      if (hudCard) {
        gsap.from(hudCard, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          delay: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: hudCard,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* --- Y-axis tick marks --- */
  const yTicks = [0, 500_000, 1_000_000, 1_500_000, 2_000_000];

  /* --- X-axis tick marks (months) --- */
  const xTicks = [0, 3, 6, 9, 12];

  /* End-points for labels */
  const tradEnd = toSvg(GRAPH.months, TRAD_INITIAL + TRAD_MONTHLY * GRAPH.months);
  const regainEnd = toSvg(GRAPH.months, REGAIN_INITIAL + REGAIN_MONTHLY * GRAPH.months);

  return (
    <section id="solution" ref={sectionRef} className={styles.section}>
      {/* Background grid */}
      <div className={styles.gridBg} />

      {/* Section label */}
      <p className={`${styles.sectionLabel} ${styles.fadeUp}`}>
        SYSTEM UPGRADE INITIATED
      </p>

      {/* Heading */}
      <h2 className={`${styles.sectionHeading} ${styles.fadeUp}`}>
        魚を買う必要はない。
        <br />
        魚の<span className={styles.accent}>釣り方</span>
        を覚えれば、無駄は消える。
      </h2>

      {/* Sub */}
      <p className={`${styles.subHeading} ${styles.fadeUp}`}>
        AI × 自走が生む、圧倒的なコスト革命
      </p>

      {/* Graph area */}
      <div ref={graphWrapRef} className={styles.graphWrap}>
        <svg
          className={styles.graphSvg}
          viewBox="0 0 800 420"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Axis lines */}
          <line
            x1={GRAPH.left}
            y1={GRAPH.top}
            x2={GRAPH.left}
            y2={GRAPH.bottom}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <line
            x1={GRAPH.left}
            y1={GRAPH.bottom}
            x2={GRAPH.right}
            y2={GRAPH.bottom}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />

          {/* Y-axis grid lines & labels */}
          {yTicks.map((val) => {
            const { y } = toSvg(0, val);
            return (
              <g key={`y-${val}`}>
                <line
                  x1={GRAPH.left}
                  y1={y}
                  x2={GRAPH.right}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={GRAPH.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className={styles.axisTick}
                >
                  {val === 0 ? "¥0" : `¥${(val / 10000).toFixed(0)}万`}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {xTicks.map((m) => {
            const { x } = toSvg(m, 0);
            return (
              <text
                key={`x-${m}`}
                x={x}
                y={GRAPH.bottom + 24}
                textAnchor="middle"
                className={styles.axisTick}
              >
                {m === 0 ? "0" : `${m}M`}
              </text>
            );
          })}

          {/* Axis titles */}
          <text
            x={GRAPH.left + (GRAPH.right - GRAPH.left) / 2}
            y={GRAPH.bottom + 48}
            textAnchor="middle"
            className={styles.axisTitle}
          >
            Time (1 Year / 12 Months)
          </text>
          <text
            x={16}
            y={GRAPH.top + (GRAPH.bottom - GRAPH.top) / 2}
            textAnchor="middle"
            className={styles.axisTitle}
            transform={`rotate(-90, 16, ${
              GRAPH.top + (GRAPH.bottom - GRAPH.top) / 2
            })`}
          >
            Cumulative Cost (JPY)
          </text>

          {/* REGAIN line (white) — draws first */}
          <polyline
            ref={regainLineRef}
            points={regainPoints}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Traditional line (red) — draws second */}
          <polyline
            ref={tradLineRef}
            points={tradPoints}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Glow duplicates for neon effect */}
          <polyline
            points={regainPoints}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth="6"
            strokeLinejoin="round"
            opacity="0.1"
            className={styles.glowLine}
          />
          <polyline
            points={tradPoints}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="6"
            strokeLinejoin="round"
            opacity="0.15"
            className={styles.glowLine}
          />
        </svg>

        {/* Floating labels for graph lines */}
        <div
          className={`${styles.graphLabel} ${styles.tradLabel}`}
          style={{
            top: `${(tradEnd.y / 420) * 100}%`,
            right: "4%",
          }}
        >
          <span className={styles.labelLine} />
          <span className={styles.labelAccent}>月額 10,000円〜</span>
          <span className={styles.labelTag}>DEPENDENCE / 依存</span>
        </div>

        <div
          className={`${styles.graphLabel} ${styles.regainLabel}`}
          style={{
            bottom: `${((420 - regainEnd.y) / 420) * 100 + 2}%`,
            right: "4%",
          }}
        >
          <span className={styles.labelLine} />
          <span className={styles.labelWhite}>月額 1,100円〜</span>
          <span className={styles.labelTag}>OWNERSHIP / 自走</span>
        </div>
      </div>

      {/* HUD card */}
      <div className={styles.hudCard}>
        <span className={`${styles.hudCorner} ${styles.cTL}`} />
        <span className={`${styles.hudCorner} ${styles.cTR}`} />
        <span className={`${styles.hudCorner} ${styles.cBL}`} />
        <span className={`${styles.hudCorner} ${styles.cBR}`} />
        <p className={styles.hudMain}>
          最高級のWebサイトを「所有」し、AIで「運用」する。
        </p>
        <p className={styles.hudSub}>
          (Agency fixes capped at ¥22,000/mo)
        </p>
      </div>
    </section>
  );
}
