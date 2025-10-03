import React from "react";
import Link from "next/link";
import Image from "next/image";

// Gold, Silver, Bronze, Title (sun)
const goldPlanets = ["gold1.png", "gold2.png", "gold3.png"];
const silverPlanets = ["silver1.png", "silver2.png"];
const bronzePlanets = ["bronze1.png", "bronze2.png"];
const titlePlanets = ["sun.png"];

type Partner = {
	name: string;
	logo: string;
	url: string;
	tier: string;
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

/* ======================= rowdy partner adjustments  ======================= */
const BLUE_GLOW_SCALE = 0.86; // smaller halo for Rowdy Partner
const BLUE_GLOW_BLUR = 14; // a touch tighter than 18
const BLUE_GLOW_OPACITY = 0.85; // slightly softer
const BLUE_GLOW_X_NUDGE = -2; // % shift left
const BLUE_GLOW_Y_NUDGE = 2; // % shift DOWN (positive = down)
/* ======================= title sponsor adjustments  ====================== */
const TITLE_GLOW_SCALE = 1.04; // subtle bloom for sun
const TITLE_GLOW_BLUR = 12; // softer than 10
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
	const image: string = is_title
		? "w-[17rem] sm:w-[17rem] md:w-[18rem] xl:w-[20rem] 2xl:w-[24rem]"
		: "w-[8rem] sm:w-[10rem] md:w-[14rem] lg:w-48 xl:w-[16rem]";

	const isGold = partner?.tier === "Gold Sponsor";
	const isSilver = partner?.tier === "Silver Sponsor";
	const isBronze = partner?.tier === "Bronze Sponsor";
	const isTitle = partner?.tier === "Title Sponsor" || is_title;
	const isBlue = partner?.tier === "Rowdy Partner";

	let planetImg = "/img/tierplanets/planet.png";
	if (isTitle) {
		planetImg = `/img/tierplanets/${titlePlanets[Math.floor(Math.random() * titlePlanets.length)]}`;
	} else if (isGold) {
		planetImg = `/img/tierplanets/${goldPlanets[Math.floor(Math.random() * goldPlanets.length)]}`;
	} else if (isSilver) {
		planetImg = `/img/tierplanets/${silverPlanets[Math.floor(Math.random() * silverPlanets.length)]}`;
	} else if (isBronze) {
		planetImg = `/img/tierplanets/${bronzePlanets[Math.floor(Math.random() * bronzePlanets.length)]}`;
	}

	// planet offset because the images aren't perfectly centered
	const planetTransform = is_title
		? "translate(-51%, -52%)"
		: "translate(-45%, -56%)";

	return (
		<Link
			href={partner?.url}
			target="_blank"
			className={`duration-350 group font-semibold transition ease-in-out hover:-translate-y-8 ${text} ${
				tierColorMap[partner?.tier]
			}`}
		>
			<div
				className={`relative flex w-full items-center justify-center ${height} p-3`}
			>
				{/* Glow */}
				<div
					className={`absolute left-1/2 top-1/2 z-0 pointer-events-none${is_title ? "sun-glow-pulse" : ""}`}
					style={{
						// title and rowdy partner needed some adjustments
						width: is_title
							? "min(200%, 480px)"
							: isBlue
								? "min(200%, 320px)"
								: "min(120%, 180px)",
						...(is_title
							? { aspectRatio: "1 / 1" }
							: isBlue
								? { aspectRatio: "1 / 1" }
								: { height: "min(120%, 180px)" }),
						background: getGlowColor(partner?.tier),
						filter: is_title
							? `blur(${TITLE_GLOW_BLUR}px)`
							: isBlue
								? `blur(${BLUE_GLOW_BLUR}px)`
								: "blur(18px)",
						opacity: is_title
							? 0.55
							: isBlue
								? BLUE_GLOW_OPACITY
								: 0.9,
						borderRadius: "50%",
						transform: is_title
							? `translate(-50%, -50%) scale(${TITLE_GLOW_SCALE})`
							: isBlue
								? `${planetTransform} translateX(${BLUE_GLOW_X_NUDGE}%) translateY(${BLUE_GLOW_Y_NUDGE}%) scale(${BLUE_GLOW_SCALE})`
								: "translate(-50%, -50%)",
					}}
				/>

				{/* Planet/Sun */}
				<div
					className="absolute left-1/2 top-1/2 z-10"
					style={{
						width: is_title
							? "min(200%, 480px)"
							: "min(200%, 320px)",
						...(is_title
							? { aspectRatio: "1 / 1" }
							: isBlue
								? { aspectRatio: "1 / 1" }
								: { height: "min(200%, 320px)" }),
						transform: planetTransform,
					}}
				>
					<Image
						src={planetImg}
						alt={isTitle ? "sun background" : "planet background"}
						fill
						className="h-[120px] w-[120px] object-contain sm:h-[180px] sm:w-[180px] md:h-full md:w-full lg:h-[320px] lg:w-[320px]"
						priority={true}
					/>
				</div>

				{/* temp placeholder logo*/}
				<Image
					src={`/img/sponsors/${partner?.logo}`}
					width={96}
					height={96}
					quality={100}
					priority={true}
					alt={`${partner?.name} logo (placeholder)`}
					className="z-20 h-[6rem] w-[6rem] -translate-x-1 object-contain"
				/>
				{/* ORIGINAL — uncomment when real logos are ready */}
				{/*
        <Image
          src={`/img/partner-logos/${partner?.logo}`}
          width={0}
          height={0}
          quality={100}
          priority={true}
          alt={`${partner?.name} logo`}
          className={`h-auto ${image} z-20`}
        />
        */}
			</div>

			{/* sponsor name*/}
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
