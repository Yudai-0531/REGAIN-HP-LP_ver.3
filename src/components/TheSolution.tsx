"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingDown,
  BrainCircuit,
  Zap,
  Palette,
} from "lucide-react";
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

const TRAD_INITIAL = 30_000;
const TRAD_MONTHLY = 12_000;
const REGAIN_INITIAL = 0;
const REGAIN_MONTHLY = 1_100;

/* ------------------------------------------------
   Feature blocks data
   ------------------------------------------------ */
const FEATURES = [
  {
    num: "01",
    icon: TrendingDown,
    headline: "毎月の管理費を「ゼロ」にする。",
    description:
      "もう、修正依頼のたびに見積もりを待つ必要はありません。初期費用のみの「買い切り型」で、月額コストの呪縛からチームを解き放ちます。浮いた予算は、選手の強化費へ。",
    placeholder: "Cost Comparison Graph",
    hasGraph: true,
  },
  {
    num: "02",
    icon: BrainCircuit,
    headline: "魚をもらうな。「釣り方」を覚えろ。",
    description:
      "REGAINは単なる制作代行ではありません。AIを使った「自走スキル」をコーチングします。誰かに依存するのではなく、自分たちの手で未来を切り拓く力を提供します。",
    placeholder: "Image Placeholder 02",
    hasGraph: false,
    hasVideo: true,
    videoSrc: "/REGAIN_LP3.webm",
  },
  {
    num: "03",
    icon: Zap,
    headline: "「今」伝えたい熱量を、逃さない。",
    description:
      "試合結果、急なスケジュール変更、保護者への連絡。外部業者への連絡待ち時間はゼロです。思いついたその瞬間に、スマホ一つでサイトを更新できるスピード感を手に入れましょう。",
    placeholder: "Image Placeholder 03",
    hasGraph: false,
  },
  {
    num: "04",
    icon: Palette,
    headline: "強豪チームにふさわしい「ブランド」を。",
    description:
      "テンプレート感丸出しの「ダサい」サイトは、チームのブランドを毀損します。黒と赤を基調とした、アグレッシブかつ洗練されたデザインで、対戦相手や入部希望者を圧倒します。",
    placeholder: "Image Placeholder 04",
    hasGraph: false,
  },
] as const;

/* ------------------------------------------------
   Graph sub-component (reused from before)
   ------------------------------------------------ */
function CostGraph({
  tradLineRef,
  regainLineRef,
  trad,
  regain,
}: {
  tradLineRef: React.RefObject<SVGPolylineElement | null>;
  regainLineRef: React.RefObject<SVGPolylineElement | null>;
  trad: { points: string; dots: { cx: number; cy: number }[] };
  regain: { points: string; dots: { cx: number; cy: number }[] };
}) {
  const yTicks = [0, 50_000, 100_000, 150_000, 200_000];
  const xTicks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={styles.graphInner}>
      {/* Legend */}
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
        <line x1={GRAPH.left} y1={GRAPH.top} x2={GRAPH.left} y2={GRAPH.bottom} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1={GRAPH.left} y1={GRAPH.bottom} x2={GRAPH.right} y2={GRAPH.bottom} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {yTicks.map((val) => {
          const { y } = toSvg(0, val);
          return (
            <g key={`y-${val}`}>
              <line x1={GRAPH.left} y1={y} x2={GRAPH.right} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <text x={GRAPH.left - 8} y={y + 4} textAnchor="end" className={styles.axisTick}>
                {val === 0 ? "¥0" : `¥${(val / 10000).toFixed(0)}万`}
              </text>
            </g>
          );
        })}

        {xTicks.map((m) => {
          const { x } = toSvg(m, 0);
          return (
            <text key={`x-${m}`} x={x} y={GRAPH.bottom + 24} textAnchor="middle" className={styles.axisTick}>
              {m === 0 ? "0" : `${m}`}
            </text>
          );
        })}

        <text x={GRAPH.left + (GRAPH.right - GRAPH.left) / 2} y={GRAPH.bottom + 46} textAnchor="middle" className={styles.axisTitle}>
          経過月数（12ヶ月）
        </text>
        <text x={20} y={GRAPH.top + (GRAPH.bottom - GRAPH.top) / 2} textAnchor="middle" className={styles.axisTitle} transform={`rotate(-90, 20, ${GRAPH.top + (GRAPH.bottom - GRAPH.top) / 2})`}>
          累計コスト（円）
        </text>

        <polyline ref={regainLineRef} points={regain.points} fill="none" stroke="var(--color-text)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <polyline ref={tradLineRef} points={trad.points} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={regain.points} fill="none" stroke="var(--color-text)" strokeWidth="6" strokeLinejoin="round" opacity="0.1" className={styles.glowLine} />
        <polyline points={trad.points} fill="none" stroke="var(--color-accent)" strokeWidth="6" strokeLinejoin="round" opacity="0.15" className={styles.glowLine} />

        {trad.dots.map((d, i) => (
          <circle key={`td-${i}`} cx={d.cx} cy={d.cy} r="4" fill="var(--color-accent)" className={styles.dot} />
        ))}
        {regain.dots.map((d, i) => (
          <circle key={`rd-${i}`} cx={d.cx} cy={d.cy} r="4" fill="var(--color-text)" className={styles.dot} />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------
   Main Component
   ------------------------------------------------ */
export default function TheSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const tradLineRef = useRef<SVGPolylineElement>(null);
  const regainLineRef = useRef<SVGPolylineElement>(null);

  const trad = buildData(TRAD_MONTHLY, TRAD_INITIAL);
  const regain = buildData(REGAIN_MONTHLY, REGAIN_INITIAL);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --- Section header fade up --- */
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

      /* --- Feature blocks stagger in --- */
      const blocks = sectionRef.current?.querySelectorAll(
        `.${styles.featureBlock}`
      );
      if (blocks) {
        blocks.forEach((block) => {
          const visual = block.querySelector(`.${styles.visualCol}`);
          const text = block.querySelector(`.${styles.textCol}`);
          const bgNum = block.querySelector(`.${styles.bgNumber}`);

          if (bgNum) {
            gsap.from(bgNum, {
              opacity: 0,
              scale: 0.8,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          if (visual) {
            gsap.from(visual, {
              y: 60,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          if (text) {
            gsap.from(text, {
              y: 60,
              opacity: 0,
              duration: 0.9,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
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
            trigger: el.closest(`.${styles.graphInner}`),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      };

      animateLine(regainLineRef.current, 0);
      animateLine(tradLineRef.current, 0.8);

      /* --- Dots fade in --- */
      const dots = sectionRef.current?.querySelectorAll(
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
            trigger: dots[0]?.closest(`.${styles.graphInner}`),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      /* --- Graph labels fade in --- */
      const labels = sectionRef.current?.querySelectorAll(
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
            trigger: labels[0]?.closest(`.${styles.graphInner}`),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="solution" ref={sectionRef} className={styles.section}>
      {/* Background grid */}
      <div className={styles.gridBg} />

      {/* Section header */}
      <p className={`${styles.sectionLabel} ${styles.fadeUp}`}>
        SYSTEM UPGRADE INITIATED
      </p>
      <h2 className={`${styles.sectionHeading} ${styles.fadeUp}`}>
        REGAINが選ばれる
        <span className={styles.accent}>「4つの理由」</span>
      </h2>
      <p className={`${styles.subHeading} ${styles.fadeUp}`}>
        旧式の依存モデルから脱却し、自走する力を手に入れる
      </p>

      {/* Feature blocks */}
      <div className={styles.featuresContainer}>
        {FEATURES.map((feat, idx) => {
          const IconComp = feat.icon;
          const isReversed = idx % 2 !== 0;

          return (
            <div
              key={feat.num}
              className={`${styles.featureBlock} ${isReversed ? styles.reversed : ""}`}
            >
              {/* Background number */}
              <span className={styles.bgNumber}>{feat.num}</span>

              {/* Visual column */}
              <div className={styles.visualCol}>
                {feat.hasGraph ? (
                  <div className={styles.graphWrap}>
                    <CostGraph
                      tradLineRef={tradLineRef}
                      regainLineRef={regainLineRef}
                      trad={trad}
                      regain={regain}
                    />
                  </div>
                ) : "hasVideo" in feat && feat.hasVideo ? (
                  <div className={styles.videoWrap}>
                    <video
                      className={styles.videoElement}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={"videoSrc" in feat ? (feat.videoSrc as string) : ""} type="video/webm" />
                    </video>
                  </div>
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderText}>
                      {feat.placeholder}
                    </span>
                  </div>
                )}
              </div>

              {/* Text column */}
              <div className={styles.textCol}>
                <div className={styles.iconWrap}>
                  <IconComp size={28} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureHeadline}>{feat.headline}</h3>
                <p className={styles.featureDesc}>{feat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
