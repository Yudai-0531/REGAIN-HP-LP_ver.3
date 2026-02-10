"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TheSolution.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------
   Graph constants — SVG coordinate system
   viewBox: 0 0 800 450
   ------------------------------------------------ */
const GRAPH = {
  left: 80,
  right: 760,
  top: 40,
  bottom: 380,
  yMin: 0,
  yMax: 200_000,
  months: 12,
} as const;

/** Map (month, yen) → SVG coords */
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

/** Build polyline points + individual dot coords */
function buildData(monthlyCost: number, initial: number = 0) {
  const pts: string[] = [];
  const dots: { cx: number; cy: number }[] = [];
  for (let m = 0; m <= GRAPH.months; m++) {
    const { x, y } = toSvg(m, initial + monthlyCost * m);
    pts.push(`${x},${y}`);
    dots.push({ cx: x, cy: y });
  }
  return { points: pts.join(" "), dots };
}

// Traditional: initial setup ¥30,000 + ¥12,000/month
const TRAD_INITIAL = 30_000;
const TRAD_MONTHLY = 12_000;
// REGAIN: ¥1,100/month only
const REGAIN_INITIAL = 0;
const REGAIN_MONTHLY = 1_100;

export default function TheSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const tradLineRef = useRef<SVGPolylineElement>(null);
  const regainLineRef = useRef<SVGPolylineElement>(null);
  const graphWrapRef = useRef<HTMLDivElement>(null);

  const trad = buildData(TRAD_MONTHLY, TRAD_INITIAL);
  const regain = buildData(REGAIN_MONTHLY, REGAIN_INITIAL);

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

      animateLine(regainLineRef.current, 0);
      animateLine(tradLineRef.current, 0.8);

      /* --- Dots fade in --- */
      const dots = graphWrapRef.current?.querySelectorAll(
        `.${styles.dot}`
      );
      if (dots && dots.length > 0) {
        gsap.from(dots, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          stagger: 0.06,
          delay: 1.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: graphWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* --- Y-axis ticks: 0, 5万, 10万, 15万, 20万 --- */
  const yTicks = [0, 50_000, 100_000, 150_000, 200_000];

  /* --- X-axis ticks: every month 0–12 --- */
  const xTicks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
        <span className={styles.headingLine}>魚を買う必要はない。</span>
        <span className={styles.headingLine}>
          魚の<span className={styles.accent}>釣り方</span>を覚えれば、
        </span>
        <span className={styles.headingLine}>無駄は消える。</span>
      </h2>

      {/* Sub */}
      <p className={`${styles.subHeading} ${styles.fadeUp}`}>
        AI × 自走が生む、圧倒的なコスト革命
      </p>

      {/* Graph area */}
      <div ref={graphWrapRef} className={styles.graphWrap}>
        {/* Legend — top-left inside graph */}
        <div className={styles.legendWrap}>
          <div className={`${styles.graphLabel} ${styles.tradLabel}`}>
            <span className={styles.labelLine} />
            <span className={styles.labelAccent}>従来業者 月額 10,000円〜</span>
            <span className={styles.labelTag}>DEPENDENCE / 依存</span>
          </div>
          <div className={`${styles.graphLabel} ${styles.regainLabel}`}>
            <span className={styles.labelLine} />
            <span className={styles.labelWhite}>REGAIN 月額 1,100円〜</span>
            <span className={styles.labelTag}>OWNERSHIP / 自走</span>
          </div>
        </div>

        <svg
          className={styles.graphSvg}
          viewBox="0 0 800 450"
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
                {m === 0 ? "0" : `${m}`}
              </text>
            );
          })}

          {/* Axis titles — Japanese */}
          <text
            x={GRAPH.left + (GRAPH.right - GRAPH.left) / 2}
            y={GRAPH.bottom + 46}
            textAnchor="middle"
            className={styles.axisTitle}
          >
            経過月数（12ヶ月）
          </text>
          <text
            x={20}
            y={GRAPH.top + (GRAPH.bottom - GRAPH.top) / 2}
            textAnchor="middle"
            className={styles.axisTitle}
            transform={`rotate(-90, 20, ${
              GRAPH.top + (GRAPH.bottom - GRAPH.top) / 2
            })`}
          >
            累計コスト（円）
          </text>

          {/* REGAIN line (white) — draws first */}
          <polyline
            ref={regainLineRef}
            points={regain.points}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Traditional line (red) — draws second */}
          <polyline
            ref={tradLineRef}
            points={trad.points}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Glow duplicates */}
          <polyline
            points={regain.points}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth="6"
            strokeLinejoin="round"
            opacity="0.1"
            className={styles.glowLine}
          />
          <polyline
            points={trad.points}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="6"
            strokeLinejoin="round"
            opacity="0.15"
            className={styles.glowLine}
          />

          {/* Dot points — traditional (red) */}
          {trad.dots.map((d, i) => (
            <circle
              key={`td-${i}`}
              cx={d.cx}
              cy={d.cy}
              r="4"
              fill="var(--color-accent)"
              className={styles.dot}
            />
          ))}

          {/* Dot points — REGAIN (white) */}
          {regain.dots.map((d, i) => (
            <circle
              key={`rd-${i}`}
              cx={d.cx}
              cy={d.cy}
              r="4"
              fill="var(--color-text)"
              className={styles.dot}
            />
          ))}
        </svg>
      </div>

    </section>
  );
}
