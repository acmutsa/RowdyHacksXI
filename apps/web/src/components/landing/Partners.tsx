import partnerData from "./partners.json";
import PartnerCard from "./PartnerCard";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

type Partner = {
  name: string;
  logo: string;
  url: string;
  tier: string;
};

/* ======================= orbit adjustments  ======================= */
const HORIZ_PAD_PCT = 0.15;
const STAGE_H_RATIO = 0.28;
const CARD_GAP_FACTOR = 0.85;
const ROCK_SCALE = 0.95;
const COW_SCALE = 1.08;
const SAMPLES = 33;
/* =================================================================== */

function buildFiveBarPath(
  W: number,
  H: number,
  padXPct = 0.0,
  EDGE_RATIO = 0.25,
  LOW_RATIO = 0.75,
  samples = 29
) {
  const padX = W * padXPct;
  const left = -padX;
  const right = W + padX;
  const span = right - left;

  const yEdge = EDGE_RATIO * H;
  const yLow = LOW_RATIO * H;

  const y = (x: number) => {
    const t = (x - (left + span / 2)) / span;
    return yLow - 4 * (yLow - yEdge) * (t * t);
  };

  const xs = Array.from({ length: samples }, (_, i) => left + (i / (samples - 1)) * span);
  const pts = xs.map((x) => [x, y(x)] as const);

  const d = "M" + pts.map(([px, py], idx) => (idx === 0 ? `${px} ${py}` : `L${px} ${py}`)).join("");

  let length = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i - 1];
    const [x2, y2] = pts[i];
    length += Math.hypot(x2 - x1, y2 - y1);
  }

  return { d, length, left, span };
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    setSize({ width: el.clientWidth, height: el.clientHeight });

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      setSize({ width: cr.width, height: cr.height });
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

export default function Partners() {
  const hasPartners = partnerData.partners && partnerData.partners.length > 0;
  const titlePartner = hasPartners ? (partnerData.partners[0] as Partner) : undefined;

  const mainSponsors = useMemo(
    () =>
      (partnerData.partners || []).filter(
        (p) => p.tier === "Bronze Sponsor" || p.tier === "Rowdy Partner"
      ),
    []
  );

  const rockImgs = ["rock1.png", "rock2.png", "rock3.png"];

  return (
    <section className="min-h-screen w-full">
      {/* Sun Hero section with sticky scroll-shrink animation */}
      {titlePartner && <SunHero partner={titlePartner} />}

      {/* Orbit section for general sponsors/partners */}
      {mainSponsors.length > 0 && (
        <MergedOrbit title="Sponsors & Partners" sponsors={mainSponsors} rockImgs={rockImgs} />
      )}
    </section>
  );
}

/* ======================= Sun "sunrise" hero ======================= */
function SunHero({ partner }: { partner: Partner }) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"], 
  });

  // Sun: Horizon to Center Zoom (ends 1.4x larger)
  const sunScale = useTransform(scrollYProgress, [0, 0.75, 0.95, 1], [3.2, 1.8, 1.4, 1.4]); 
  // Sun: Vertical movement (horizon peek to center, clamped at 0)
  const sunY = useTransform(scrollYProgress, [0, 0.95, 1], [200, 0, 0]); 
  
  // Title: Fade in (0.5-0.75) and exit/fade out (0.8-0.9)
  const titleOpacity = useTransform(scrollYProgress, [0.5, 0.75, 0.80, 0.90], [0, 1, 1, 0]);
  // Title: Subtle initial movement, then exit off-screen
  const titleY = useTransform(scrollYProgress, [0.5, 0.75, 0.80, 0.90], [20, 0, 0, -100]); 

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-visible"
      // Section height controls scroll distance for animation
      style={{ height: "200vh", paddingTop: "5vh", paddingBottom: "12vh" }}
    >
      
      {/* Title Caption (Sticky top-16, sits above the sun card) */}
      <motion.h2
        className="sticky top-16 z-20 text-center text-4xl md:text-5xl font-black tracking-wide text-purple-500 drop-shadow-lg font-texatbold pointer-events-none"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        Title Sponsor
      </motion.h2>

      {/* Sun (PartnerCard) (Sticky top-64, sits below the title) */}
      <motion.div
        className="sticky top-64 z-10 flex items-center justify-center"
        style={{ scale: sunScale, y: sunY }}
      >
        <PartnerCard partner={partner} is_title />
      </motion.div>
    </section>
  );
}


/* ======================= Orbit section ======================= */
function MergedOrbit({
  title,
  sponsors,
  rockImgs,
}: {
  title: string;
  sponsors: Partner[];
  rockImgs: string[];
}) {
  const tierRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: tierRef, offset: ["start center", "end center"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.2, 0.9]);

  const { ref: stageRef, size } = useElementSize<HTMLDivElement>();

  const stageHeight = useMemo(() => {
    const W = Math.max(320, size.width || 0);
    const proposed = W * STAGE_H_RATIO;
    return Math.max(280, Math.min(620, Math.round(proposed)));
  }, [size.width]);

  const { d: orbitPath, length: pathLen, left, span } = useMemo(() => {
    const W = Math.max(320, size.width || 0);
    const H = stageHeight || 420;
    const isNarrow = W < 640;

    const EDGE = isNarrow ? 0.26 : 0.2;
    const LOW = isNarrow ? 0.64 : 0.58;

    return buildFiveBarPath(W, H, HORIZ_PAD_PCT, EDGE, LOW, SAMPLES);
  }, [size.width, stageHeight]);

  const followers: { type: "card" | "cow" | "rock"; data?: Partner; logo?: string }[] = [];
  sponsors.forEach((p, i) => {
    followers.push({ type: "card", data: p });
    if (i < sponsors.length - 1) {
      followers.push({ type: "rock", logo: rockImgs[Math.floor(Math.random() * rockImgs.length)] });
    }
  });
  followers.push({ type: "cow", logo: "partners_cow.png" });

  const totalFollowers = followers.length;
  const avgGapPx = pathLen / Math.max(1, totalFollowers);

  const desiredCard = stageHeight < 340 ? 180 : stageHeight < 420 ? 200 : 240;
  const cardSize = Math.min(desiredCard, Math.floor(avgGapPx * CARD_GAP_FACTOR));
  const rockSize = Math.round(cardSize * ROCK_SCALE);
  const cowSize = Math.round(cardSize * COW_SCALE);

  return (
    <motion.div
      ref={tierRef}
      className="w-full flex flex-col justify-center items-center mb-[-32px] pb-40"
      style={{ scale }}
    >
      <h2 className="mt-12 text-center text-4xl md:text-5xl font-black drop-shadow-lg tracking-wide font-texatbold text-blue-100">
        {title}
      </h2>

      <div
        ref={stageRef}
        className="relative w-full overflow-visible -mt-8"
        style={
          {
            height: `${stageHeight}px`,
            ["--orbitPath" as any]: `"${orbitPath}"`,
          } as React.CSSProperties
        }
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`${left} 0 ${span} ${stageHeight || 1}`}
          preserveAspectRatio="none"
        />

        <div className="absolute inset-0">
          {followers.map((f, index) => {
            const dur = 24;
            const delay = -(index / followers.length) * dur;

            return (
              <div
                key={`merged-${index}`}
                className={`mp-follower ${f.type === "cow" || f.type === "rock" ? "" : "animate-wobble"}`}
                style={
                  {
                    ["--dur" as any]: `${dur}s`,
                    ["--delay" as any]: `${delay}s`,
                    width:
                      f.type === "cow"
                        ? `${cowSize}px`
                        : f.type === "rock"
                        ? `${rockSize}px`
                        : `${cardSize}px`,
                    height:
                      f.type === "cow"
                        ? `${cowSize}px`
                        : f.type === "rock"
                        ? `${rockSize}px`
                        : `${cardSize}px`,
                  } as React.CSSProperties
                }
              >
                {f.type === "card" && f.data ? (
                  <div className="w-full h-full pointer-events-auto">
                    <PartnerCard partner={f.data} is_title={false} />
                  </div>
                ) : (
                  <div
                    className={[
                      "w-full h-full",
                      ["animate-float-wobble-1", "animate-float-wobble-2", "animate-float-wobble-3"][index % 3],
                    ].join(" ")}
                  >
                    <Image
                      src={`/img/${f.logo}`}
                      alt={f.type}
                      fill
                      className="absolute object-contain pointer-events-auto"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}