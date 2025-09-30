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
				<CarouselContent className="relative w-full h-[245px]">
					{team.map((p, index) => (
						<CarouselItem
							key={index}
							className="basis-1/4 mx-[50px] overflow-visible"
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
	const xBillboard = useTransform(secScroll, [0.2, 0.9], ["0%", "-100%"]);
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
						<Billboard xBillboard={xBillboard}/>
						<WantedBoard xWantedBoard={xWantedBoard}/>
					</div>
				</div>
			</div>
		</section>
  	)
}

function Billboard({ xBillboard }: { xBillboard: MotionValue<string> }) {
	return (
		<motion.div className="absolute flex justify-center w-full h-full bottom-0"
			style={{ translateX: xBillboard}}
		>
			<Image
				className="absolute w-full h-auto md:h-full md:object-cover object-bottom object-visible bottom-0"
				src="/img/work/Ground3.png"
				width={1920}
				height={1080}
				alt="Ground3"
			/>
			<div className="absolute flex justify-center w-[375px] h-[500px] bottom-0">
				<Image
					className="absolute w-full h-full bottom-0 md:object-cover object-bottom overflow-visible"
					src="/img/work/billboard_new.png"
					width={1920}
					height={1080}
					alt="Billboard"
				/>
				<div className="relative flex flex-col w-full h-[220px] mt-12">
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
	)
}

function WantedBoard({ xWantedBoard }: { xWantedBoard: MotionValue<string> }) {
	return (
		<motion.div className="absolute flex justify-center w-full h-full bottom-0"
			style={{ translateX: xWantedBoard }}
		>
			<Image
				className="absolute w-full h-auto md:h-full md:object-cover object-bottom object-visible bottom-0"
				src="/img/work/Ground4.png"
				width={1920}
				height={1080}
				alt="Ground4"
			/>
			<div className="absolute flex justify-center w-[375px] h-[500px] bottom-0">
				<Image 
					className="absolute w-full h-full bottom-0 md:object-cover object-bottom overflow-visible"
					src="/img/work/wanted_new.png"
					width={1920}
					height={1080}
					alt="WantedBoard"
				/>
				<div className="relative w-full h-[245px] mt-16 overflow-visible">
					<CarouselDefault />
				</div>
			</div>
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

// 	return (
// 		<section
// 			ref={sectionRef}
// 			className="relative z-10 grid w-full h- full grid-cols-1 bg-transparent"
// 		>
// 			<div className="border border-red-500  relative h-[200vh] w-full ">
// 				<div className="absolute left-[50%] h-full w-full -translate-x-[50%] ">
					
// 					<motion.div
// 						style={{
// 							backgroundSize: useTransform(
// 								scrollYProgress,
// 								[0, 1],
// 								["100%", "200%"],
// 							),
// 						}}
// 					>
// 						{/* Ground 1 */}
// 						<motion.div
// 							className="absolute bottom-0"
// 							style={{
// 								translateY: useTransform(
// 									scrollYProgress,
// 									[0, 0.1, 0.15, 0.4, 0.6],
// 									["-80%", "-130%", "-130%", "-80%", "-15%"],
// 								),
// 							}}
// 						>
// 							<Image
// 								src="/img/Ground1.png"
// 								alt="Ground 1"
// 								width={1920}
// 								height={1080}
// 								className="z-1 h-[auto] w-full object-contain"
// 								unoptimized
// 							/>
// 						</motion.div>

// 						{/* Ground 2 */}
// 						<motion.div
// 							className="absolute bottom-0"
// 							style={{
// 								translateY: useTransform(
// 									scrollYProgress,
// 									[0, 0.13, 0.15, 0.4, 0.6],
// 									["-100%", "-130%", "-130%", "-80%", "-15%"],
// 								),
// 							}}
// 						>
// 							<Image
// 								src="/img/Ground2.png"
// 								alt="Ground 2"
// 								width={1920}
// 								height={1080}
// 								className="z-20 h-auto w-full object-contain"
// 								unoptimized
// 							/>
// 						</motion.div>

// 						{/* Ground 3 */}
// 						<motion.div
// 							className="absolute bottom-0"
// 							style={{
// 								translateY: useTransform(
// 									scrollYProgress,
// 									[0, 0.15, 0.4, 0.6],
// 									["-80%", "-130%", "-80%", "-15%"],
// 								),
// 								translateX: useTransform(
// 									scrollYProgress,
// 									[0.4, 0.6],
// 									["0%", "-100%"],
// 								),
// 							}}
// 						>
// 							<Image
// 								src="/img/Ground3.png"
// 								alt="Ground3"
// 								width={1920}
// 								height={1080}
// 								className="z-30 h-auto w-full object-contain"
// 								unoptimized
// 							/>
// 						</motion.div>

// 						{/* Billboard */}
// 						<motion.div
// 							className="absolute bottom-0 origin-bottom"
// 							style={{
// 								translateY: useTransform(
// 									scrollYProgress,
// 									[0, 0.15, 0.4, 0.6],
// 									["-80%", "-130%", "-50%", "15%"],
// 								),
// 								scale: useTransform(
// 									scrollYProgress,
// 									[0, 0.15, 0.4],
// 									[0, 0.7, 1.3],
// 								),
// 								translateX: useTransform(
// 									scrollYProgress,
// 									[0.4, 0.6],
// 									["0%", "-100%"],
// 								),
// 							}}
// 						>
// 							<Image
// 								src={"/img/billboard.png"}
// 								alt="Billboard"
// 								width={1200}
// 								height={800}
// 								unoptimized
// 								className="z-15 h-auto w-full origin-bottom object-contain"
// 							/>

// 							<div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-6">
// 								<div className="h-[45%] w-[50%] -translate-y-[40%]">
// 									<h1 className="mb-6 text-center font-spaceranger text-2xl text-[#9EFF3C] drop-shadow-xl md:text-5xl lg:text-7xl">
// 										Help Wanted
// 									</h1>
// 									<h2 className="text-center font-league text-5xl text-[#2e2e2e]">
// 										Want to get involved?
// 									</h2>
// 									<div className="flex flex-col items-center justify-center gap-5 pb-5 md:flex-row">
// 										<Link
// 											href={
// 												"https://form.rowdyhacks.org/volunteer"
// 											}
// 										>
// 											<button className="rounded bg-[#A5836B] px-3 py-3 font-bold text-white transition-colors duration-150">
// 												Volunteer Form
// 											</button>
// 										</Link>
// 										<Link
// 											href={
// 												"https://form.rowdyhacks.org/mentor"
// 											}
// 										>
// 											<button className="rounded bg-[#A5836B] px-3 py-3 font-bold text-white transition-colors duration-150">
// 												Mentor Form
// 											</button>
// 										</Link>
// 									</div>
// 									<h2 className="text-center font-league text-5xl text-[#2e2e2e]">
// 										Ready to become a sponsor?
// 									</h2>
// 									<div className="flex items-center justify-center pb-5">
// 										<Link href="https://static.rowdyhacks.org/docs%2FRowdyHacks%202024%20Partner%20Packet.pdf">
// 											<button className="rounded bg-[#A5836B] px-3 py-3 font-bold text-white transition-colors duration-150">
// 												Partner Packet
// 											</button>
// 										</Link>
// 									</div>
// 								</div>
// 							</div>
// 						</motion.div>

// 						{/* Ground 4 */}
// 						<motion.div
// 							className=" absolute bottom-0"
// 							style={{
// 								translateX: useTransform(
// 									scrollYProgress,
// 									[0.4, 0.6],
// 									["99%", "0%"],
// 								),
// 								translateY: useTransform(
// 									scrollYProgress,
// 									[0.4, 0.6, 1],
// 									["-80%", "-15%", "0%"],
// 								),
// 							}}
// 						>
// 							<Image
// 								src={"/img/Ground4.png"}
// 								alt="Ground4"
// 								width={1920}
// 								height={1080}
// 								className="z-15 h-auto w-full object-contain"
// 								unoptimized
// 							/>
// 						</motion.div>

// 						{/* Wanted Board */}
// 						<motion.div

// 							className="absolute bottom-0 overflow-visible"
// 							style={{
// 								translateX: useTransform(
// 									scrollYProgress,
// 									[0.4, 0.6],
// 									["99%", "0%"],
// 								),
// 								translateY: useTransform(
// 									scrollYProgress,
// 									[0.4, 0.6, 1],
// 									["-80%", "-15%", "0%"],
// 								),
// 							}}
// 						>
// 							<Image
// 								src={"/img/wanted-board.png"}
// 								alt="Wanted Board"
// 								width={1200}
// 								height={800}
// 								unoptimized
// 								className="z-20 h-auto w-full"
// 							/>
							
// 							<div className="absolute inset-0 z-[60] mx-auto flex h-[50%] w-[62%] translate-y-[25%] flex-col items-center justify-center overflow-visible px-4 py-6">
// 								<CarouselDefault />
// 							</div>
// 						</motion.div>
						
// 					</motion.div>
					
// 				</div>
// 			</div>
			
// 		</section>
// 	);
// }
