"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LPVideo.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function LPVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoWrapRef.current) {
        gsap.from(videoWrapRef.current, {
          opacity: 0,
          scale: 0.97,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={videoWrapRef} className={styles.videoWrap}>
        {/* HUD corner decorations */}
        <span className={`${styles.hudCorner} ${styles.topLeft}`} />
        <span className={`${styles.hudCorner} ${styles.topRight}`} />
        <span className={`${styles.hudCorner} ${styles.bottomLeft}`} />
        <span className={`${styles.hudCorner} ${styles.bottomRight}`} />

        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/lp-video.mp4" type="video/mp4" />
        </video>

        {/* Scanline overlay */}
        <div className={styles.scanlineOverlay} />
      </div>
    </section>
  );
}
