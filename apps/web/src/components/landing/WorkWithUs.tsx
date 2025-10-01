import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import TeamMember from './TeamMember';

const CarouselDefault = () => {
	const plugin = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: true })
 	);
	const [team, setTeam] = useState<Person[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		axios.get("/team.json").then((res) => {
			setTeam(res.data.team);
			setLoading(false);
		});
	}, []);
	if (loading || team === undefined) return <div>Loading...</div>;
	if (team.length === 0) return <div>No team members found.</div>;

	return (
		<>
			<Carousel className="relative flex w-full h-[245px]"
				opts={{ align: "start", loop: true }}
				// @ts-ignore - TypeScript complains, but this usage is correct per docs
				plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
			>
				<CarouselContent className="relative w-full h-full">
					{team.map((p, index) => (
						<CarouselItem
							key={index}
							className="basis-1/6 mx-[40px] overflow-visible"
						>
							<TeamMember person={p} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="border-none bg-transparent"/>
				<CarouselNext className="border-none bg-transparent"/>
			</Carousel>
		</>
	)
}

export default function WorkWithUs() {
	const secRef = useRef(null);
	const { scrollYProgress: secScroll } = useScroll({
		target: secRef,
		offset: ["start start", "end end"]
	})
	const scaleBillBoard = useTransform(secScroll, [0.2, 0.9], [1, 0.5]);
	const xBillBoard = useTransform(secScroll, [0.2, 0.9], ["0%", "-100%"]);
	const scaleWantedBoard = useTransform(secScroll, [0, 0.2, 0.9], [0.5, 0.5, 1]);
	const xWantedBoard = useTransform(secScroll, [0, 0.2, 0.9], ["100%", "100%", "0%"])


	return (
		<section className="relative w-full min-w-[375px] min-h-[800px]">
			<div ref={secRef} className="relative flex justify-center items-end w-full h-[175vh] min-h-[800px]">
				<div className="sticky bottom-0 w-full h-screen min-h-screen">
					<div className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden">
						<motion.div className="absolute w-full h-full bottom-0">
							<Image 
								className="absolute w-full h-auto md:h-full md:object-cover object-bottom overflow-visible bottom-0"
								src="/img/work/Ground1.png"
								width={1920}
								height={1080}
								alt="Ground1"
							/>
							<Image 
								className="absolute w-full h-auto md:h-full md:object-cover object-bottom overflow-visible bottom-0"
								src="/img/work/Ground2.png"
								width={1920}
								height={1080}
								alt="Ground2"
							/>
						</motion.div>
						<Billboard scaleBillBoard={scaleBillBoard} xBillBoard={xBillBoard}/>
						<WantedBoard scaleWantedBoard={scaleWantedBoard} xWantedBoard={xWantedBoard}/>
					</div>
				</div>
			</div>
		</section>
  	)
}

function Billboard({ xBillBoard, scaleBillBoard }: { xBillBoard: MotionValue<string>, scaleBillBoard: MotionValue<number>}) {
	return (
		<motion.div className="absolute flex justify-center w-full h-full bottom-0"
			style={{ translateX: xBillBoard }}
		>
			<Image
				className="absolute w-full h-auto object-cover object-bottom object-visible bottom-0"
				src="/img/work/Ground3.png"
				width={1920}
				height={1080}
				alt="Ground3"
			/>
			<motion.div className="absolute flex justify-center w-[375px] h-[500px] md:w-[600px] md:h-[600px] bottom-0 origin-bottom"
				style={{ scale: scaleBillBoard }}
			>
				<div className="absolute flex justify-center w-[375px] h-[500px] md:w-[600px] md:h-[600px] bottom-0">
					<Image
						className="absolute w-full h-full bottom-0 object-cover object-bottom overflow-visible"
						src="/img/work/billboard_new.png"
						width={1920}
						height={1080}
						alt="BillBoard"
					/>
					<div className="relative flex flex-col w-full h-[220px] md:h-[275px] mt-12 md:mt-14">
						<h1 className="text-center font-spaceranger text-5xl text-[#9EFF3C] drop-shadow-xl">Help Wanted</h1>
						<div className="relative flex flex-col w-full h-full mb-2">
							<div className="flex flex-col items-center justify-center w-full h-1/2">
								<h1 className="text-3xl text-center font-league text-[#2e2e2e]">Interested in helping?</h1>
								<div className="w-full flex justify-around">
									<Link href={"https://form.rowdyhacks.org/volunteer"}>
										<button className="rounded bg-[#A5836B] px-2 py-2 font-bold text-white transition-colors duration-150">Volunteer Form</button>
									</Link>
									<Link href={"https://form.rowdyhacks.org/mentor"}>
										<button className="rounded bg-[#A5836B] px-2 py-2 font-bold text-white transition-colors duration-150">Mentor Form</button>
									</Link>
								</div>
							</div>
							<div className="flex flex-col items-center justify-center w-full h-1/2">
								<h1 className="text-3xl text-center font-league text-[#2e2e2e]">Interested in sponsoring?</h1>
								<Link href={"https://static.rowdyhacks.org/docs%2FRowdyHacks%202024%20Partner%20Packet.pdf"}>
									<button className="rounded bg-[#A5836B] px-2 py-2 font-bold text-white transition-colors duration-150">Partner Packet</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

function WantedBoard({ xWantedBoard, scaleWantedBoard }: { xWantedBoard: MotionValue<string>, scaleWantedBoard: MotionValue<number> }) {
	return (
		<motion.div className="absolute flex justify-center w-full h-full bottom-0"
			style={{ translateX: xWantedBoard }}
		>
			<Image
				className="absolute w-full h-auto object-cover object-bottom object-visible bottom-0"
				src="/img/work/Ground4.png"
				width={1920}
				height={1080}
				alt="Ground4"
			/>
			<motion.div className="absolute flex justify-center w-[375px] h-[500px] md:w-[800px] md:h-[550px] bottom-0 origin-bottom"
				style={{ scale: scaleWantedBoard}}
			>
				<div className="absolute flex justify-center w-[375px] h-[500px] md:w-[800px] md:h-[550px] bottom-0">
					<Image 
						className="absolute w-full h-full md:h-auto bottom-0 object-cover object-bottom overflow-visible"
						src="/img/work/wanted_new.png"
						width={1920}
						height={1080}
						alt="WantedBoard"
					/>
					<div className="relative w-[400px] md:w-[575px] h-[245px] mt-14 overflow-visible border-4">
						<CarouselDefault />
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}


// "use client";

// import React from "react";
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselNext,
// 	CarouselPrevious,
// } from "../shadcn/ui/carousel";
// import { Person } from "./Person";
// import TeamMember from "./TeamMember";
// import { Oswald } from "next/font/google";
// import { useState, useEffect } from "react";
// import Autoplay from "embla-carousel-autoplay";
// import { ArrowRight } from "lucide-react";
// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import axios from "axios";
// import Link from "next/link";

// 							<div className="absolute inset-0 z-[60] mx-auto flex h-[50%] w-[62%] translate-y-[25%] flex-col items-center justify-center overflow-visible px-4 py-6">
// 								<CarouselDefault />
// 							</div>