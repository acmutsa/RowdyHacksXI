import React from "react";
import Link from "next/link";
import Image from "next/image";

// Planet image lists
const goldPlanets = ["gold1.png", "gold2.png", "gold3.png"];
const silverPlanets = ["silver1.png", "silver2.png"];
const bronzePlanets = ["planet1.png", "planet2.png", "planet3.png", "planet4.png"];
const titlePlanets = ["sun.png"];

type Partner = {
  name: string;
  logo: string;
  url: string;
  tier: string;
  wordmark?: boolean;
  logoTone?: "light" | "dark";
  img?: string;
};

const tierColorMap: { [key: string]: string } = {
  ["Title Sponsor"]: "text-purple-500",
  ["Gold Sponsor"]: "text-yellow-600",
  ["Silver Sponsor"]: "text-gray-400",
  ["Bronze Sponsor"]: "text-amber-800",
  ["Rowdy Partner"]: "text-blue-500",
  ["Rowdy In-Kind"]: "text-red-500",
};

const tailwindColorHexMap: { [key: string]: string } = {
  "text-purple-500": "#a78bfa",
  "text-yellow-600": "#ca8a04",
  "text-gray-400": "#a3a3a3",
  "text-amber-800": "#8a5b3dff",
  "text-blue-500": "#3b82f6",
  "text-red-500": "#ef4444",
};

function getGlowColor(tier: string) {
  const tw = tierColorMap[tier];
  return tw ? tailwindColorHexMap[tw] : "#fff";
}

/* ======================= glow adjustments ======================= */
// Rowdy Partner Glow (Increased scale for bigger glow)
const BLUE_GLOW_SCALE = 1.05; 
const BLUE_GLOW_BLUR = 14;
const BLUE_GLOW_OPACITY = 0.9; // Increased opacity
// Title Sponsor Glow (Maintained scale)
const TITLE_GLOW_SCALE = 1.15; 
const TITLE_GLOW_BLUR = 12;
/* =============================================================== */

function PartnerCard({
  partner,
  is_title,
}: {
  partner: Partner;
  is_title: boolean;
}) {
  const text: string = is_title
    ? "text-2xl sm:text-3xl xl:text-4xl 2xl:text-[3rem]"
    : "text-md sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl";

  const height: string = is_title
    ? "h-[15rem] sm:h-[15rem] md:h-[16rem] lg:h-[20rem] xl:h-[20rem] 2xl:h-[22rem]"
    : "h-[9rem] sm:h-[11rem] md:h-[11rem] lg:h-[12rem] xl:h-[14rem] 2xl:h-[17rem]";

  const isGold = partner?.tier === "Gold Sponsor";
  const isSilver = partner?.tier === "Silver Sponsor";
  const isBronze = partner?.tier === "Bronze Sponsor";
  const isTitle = partner?.tier === "Title Sponsor" || is_title;
  const isBlue = partner?.tier === "Rowdy Partner";

  const isWordmark = !!partner?.wordmark;
  const logoIsLight = partner?.logoTone === "light";
  const logoIsDark  = partner?.logoTone === "dark";

  // Determine planet image based on tier or custom field
  let planetImg = partner?.img
    ? `/img/tierplanets/${partner.img}`
    : "/img/tierplanets/planet5.png";

  if (!partner?.img) {
    if (isTitle) {
      planetImg = `/img/tierplanets/${titlePlanets[Math.floor(Math.random() * titlePlanets.length)]}`;
    } else if (isGold) {
      planetImg = `/img/tierplanets/${goldPlanets[Math.floor(Math.random() * goldPlanets.length)]}`;
    } else if (isSilver) {
      planetImg = `/img/tierplanets/${silverPlanets[Math.floor(Math.random() * silverPlanets.length)]}`;
    } else if (isBronze) {
      planetImg = `/img/tierplanets/${bronzePlanets[Math.floor(Math.random() * bronzePlanets.length)]}`;
    }
  }

  const centerTransform = "translate(-50%, -50%)";

  const planetToneClass =
    isWordmark && logoIsLight
      ? "brightness-[0.70] contrast-[1.05]"
      : isWordmark && logoIsDark
      ? "brightness-[0.92] contrast-[1.0]"
      : "brightness-[0.80]";

  const logoSizeClass = isWordmark ? "h-[10rem] w-[10rem]" : "h-[8rem] w-[8rem]";
  const logoPixelSize = isWordmark ? 160 : 140;
  const logoShadowClass = isWordmark ? "drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]" : "";

  return (
    <Link
      href={partner?.url}
      target="_blank"
      className={`duration-350 group font-semibold transition ease-in-out hover:-translate-y-8 ${text} ${
        tierColorMap[partner?.tier]
      }`}
    >
      <div className={`relative flex w-full items-center justify-center ${height} p-3`}>
        {/* Glow Layer */}
        <div
          className={`absolute left-1/2 top-1/2 z-0 pointer-events-none ${is_title ? "sun-glow-pulse" : ""}`}
          style={{
            // Increased base glow width for Gold/Silver/Bronze/In-Kind planets
            width: is_title ? "min(190%, 550px)" : isBlue ? "min(170%, 400px)" : "**min(150%, 4000px)**",
            aspectRatio: "1 / 1",
            background: getGlowColor(partner?.tier),
            filter: is_title ? `blur(${TITLE_GLOW_BLUR}px)` : isBlue ? `blur(${BLUE_GLOW_BLUR}px)` : "blur(16px)",
            // Increased base glow opacity for Gold/Silver/Bronze/In-Kind planets
            opacity: is_title ? 0.5 : isBlue ? BLUE_GLOW_OPACITY : 0.8,
            borderRadius: "50%",
            // Scale increased for Rowdy Partner; Sun scale maintained
            transform: is_title
              ? `translate(-50%, -50%) scale(${TITLE_GLOW_SCALE})`
              : isBlue
              ? `translate(-50%, -50%) scale(${BLUE_GLOW_SCALE})`
              : centerTransform,
          }}
        />

        {/* Planet/Sun Image */}
        <div
          className="absolute left-1/2 top-1/2 z-10"
          style={{
            // Increased size for Title Sponsor planet graphic
            width: is_title ? "min(320%, 800px)" : "min(160%, 360px)",
            aspectRatio: "1 / 1",
            transform: centerTransform,
            opacity: 0.9,
          }}
        >
          <Image
            src={planetImg}
            alt={isTitle ? "sun background" : "planet background"}
            fill
            className={`object-contain ${planetToneClass}`}
            priority={true}
          />
        </div>

        {/* Logo Image */}
        <Image
          src={`/img/sponsors/${partner?.logo}`}
          width={logoPixelSize}
          height={logoPixelSize}
          quality={100}
          priority={true}
          alt={`${partner?.name} logo`}
          className={`z-20 ${logoSizeClass} object-contain ${logoShadowClass}`}
        />
      </div>

      {/* Sponsor name on hover */}
      <h2
        className={`font-western font-normal ${
          is_title ? "text-[2rem] sm:text-[2.25rem]" : ""
        } w-full text-center transition delay-100 duration-300 ease-in-out ${
          is_title ? "pb-8" : "pb-4"
        } invisible group-hover:visible group-hover:translate-y-4`}
      >
        {partner?.name}
      </h2>
    </Link>
  );
}

export default PartnerCard;