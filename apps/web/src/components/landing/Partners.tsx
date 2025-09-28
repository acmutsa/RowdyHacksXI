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
const HORIZ_PAD_PCT = 0.15;     // adds % width padding on BOTH left & right (increases path length)
const STAGE_H_RATIO = 0.34;     // stage height as a % of width (was ~0.26). higher => longer path
const CARD_GAP_FACTOR = 0.70;   // each card width <= 70% of average arc gap (lower => more breathing room)
const ROCK_SCALE = 0.95;        // rock size relative to card
const COW_SCALE  = 1.08;        // cow size relative to card
const SAMPLES    = 33;          // path smoothness so more == smoother length
/* =================================================================== */

/**
 * Build a smooth quadratic "U" path sampled across 5 bars with optional horizontal padding.
 * - Lowest point at center (bar 3).
 * - Higher at edges (bars 1 & 5).
 * Returns the path `d`, rough polyline `length`, and the padded extents for the SVG viewBox.
 */
function buildFiveBarPath(
  W: number,
  H: number,
  padXPct = 0.0,     // 0.15 => 15% left + 15% right
  EDGE_RATIO = 0.25, // y at edges 0..1
  LOW_RATIO  = 0.75, // y at center also 0-1
  samples    = 29
) {
  const padX = W * padXPct;
  const left  = -padX;
  const right = W + padX;
  const span  = right - left;

  const yEdge = EDGE_RATIO * H;
  const yLow  = LOW_RATIO  * H;

  const y = (x: number) => {
    const t = (x - (left + span / 2)) / span;
    return yLow - 4 * (yLow - yEdge) * (t * t);
  };

  const xs = Array.from({ length: samples }, (_, i) => left + (i / (samples - 1)) * span);
  const pts = xs.map((x) => [x, y(x)] as const);

  const d =
    "M" +
    pts
      .map(([px, py], idx) => (idx === 0 ? `${px} ${py}` : `L${px} ${py}`))
      .join("");

  // approx polyline length
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

    // initial
    setSize({ width: el.clientWidth, height: el.clientHeight });

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setSize({ width: cr.width, height: cr.height });
      }
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

export default function Partners() {
  // pull out the title sponsor
  const titlePartners = partnerData.partners.filter((p) => p.tier === "Title Sponsor");

  // orbit tiers (excluding Title)
  const tiers = [
    "Gold Sponsor",
    "Silver Sponsor",
    "Bronze Sponsor",
    "Rowdy Partner",
    "Rowdy In-Kind",
  ];

  const rockImgs = ["rock1.png", "rock2.png", "rock3.png"];

  return (
    <section className="min-h-screen w-full">
      {/* ===== centered title sponsor (the sun) ===== */}
      {titlePartners.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center py-16">
          <h2 className="mb-6 text-center text-4xl md:text-5xl font-black tracking-wide text-purple-500 drop-shadow-lg font-texatbold">
            Title Sponsor
          </h2>
          <div className="flex items-center justify-center translate-y-16">
            <PartnerCard partner={titlePartners[0]} is_title={true} />
          </div>
        </div>
      )}

      {/* ===== orbit tiers ===== */}
      {tiers.map((tier) => {
        const tierPartners = partnerData.partners.filter((p) => p.tier === tier);
        if (tierPartners.length === 0) return null;

        const tierRef = useRef<HTMLDivElement | null>(null);
        const { scrollYProgress } = useScroll({
          target: tierRef,
          offset: ["start center", "end center"],
        });
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.2, 0.9]);

        const { ref: stageRef, size } = useElementSize<HTMLDivElement>();

        const stageHeight = useMemo(() => {
          const W = Math.max(320, size.width || 0);
          const proposed = W * STAGE_H_RATIO;
          return Math.max(300, Math.min(680, Math.round(proposed)));
        }, [size.width]);

        const { d: orbitPath, length: pathLen, left, span } = useMemo(() => {
          const W = Math.max(320, size.width || 0);
          const H = stageHeight || 420;
          const isNarrow = W < 640;
          const EDGE = isNarrow ? 0.32 : 0.25;
          const LOW  = isNarrow ? 0.72 : 0.76; // slightly deeper for more length
          return buildFiveBarPath(W, H, HORIZ_PAD_PCT, EDGE, LOW, SAMPLES);
        }, [size.width, stageHeight]);

        const followers: { type: "card" | "cow" | "rock"; data?: Partner; logo?: string }[] = [];
        tierPartners.forEach((p, i) => {
          followers.push({ type: "card", data: p });
          if (i < tierPartners.length - 1) {
            followers.push({
              type: "rock",
              logo: rockImgs[Math.floor(Math.random() * rockImgs.length)],
            });
          }
        });
        // cow at the end
        followers.push({ type: "cow", logo: "partners_cow.png" });

        const totalFollowers = followers.length;
        const avgGapPx = pathLen / Math.max(1, totalFollowers);

        const desiredCard =
          stageHeight < 340 ? 160 : stageHeight < 420 ? 180 : 200;

        const cardSize = Math.min(desiredCard, Math.floor(avgGapPx * CARD_GAP_FACTOR));
        const rockSize = Math.round(cardSize * ROCK_SCALE);
        const cowSize  = Math.round(cardSize * COW_SCALE);

        return (
          <motion.div
            key={tier}
            ref={tierRef}
            className="w-full flex flex-col justify-center items-center mb-[-40px] overflow-hidden"
            style={{ scale }}
          >

            <div
              ref={stageRef}
              className="relative w-full overflow-visible"
              style={
                {
                  height: `${stageHeight}px`,
                  ["--orbitPath" as any]: `"${orbitPath}"`,
                } as React.CSSProperties
              }
            >
              {/* Debug path */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`${left} 0 ${span} ${stageHeight || 1}`}
                preserveAspectRatio="none"
              >
                {/* <path
                  d={orbitPath}
                  fill="none"
                  stroke="rgba(255,0,0,.35)"
                  strokeDasharray="10 10"
                /> */}
              </svg>

              <div className="absolute inset-0">
                {followers.map((f, index) => {
                  const dur = 24;
                  const delay = -(index / followers.length) * dur;

                  return (
                    <div
                      key={`${tier}-${index}`}
                      className={`mp-follower ${
                        f.type === "cow" || f.type === "rock" ? "" : "animate-wobble"
                      }`}
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

            <h2
              className={`mt-32 text-center text-4xl md:text-5xl font-black drop-shadow-lg tracking-wide font-texatbold ${
                tier === "Gold Sponsor"
                  ? "text-yellow-600"
                  : tier === "Silver Sponsor"
                  ? "text-gray-400"
                  : tier === "Bronze Sponsor"
                  ? "text-amber-800"
                  : tier === "Rowdy Partner"
                  ? "text-blue-500"
                  : tier === "Rowdy In-Kind"
                  ? "text-red-500"
                  : "text-white"
              }`}
            >
              {tier}
            </h2>
          </motion.div>
        );
      })}
    </section>
  );
}
