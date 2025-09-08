"use client";

import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../shadcn/ui/carousel";
import { Person } from "./Person";
import TeamMember from "./TeamMember";
import { Oswald } from "next/font/google";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

function CarouselDefault() {
	const [team, setTeam] = useState<Person[]>([]);
	const [loading, setLoading] = useState(true);
	const plugin = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: true }),
	);
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
		//Where Carousel will go
		<>
			<Carousel
				opts={{ align: "end", loop: true }}
				// Christian Walker: Typescript was complaining here so I suppressed. This use of the carousel is correct according to the docs
				// See docs for example code: https://ui.shadcn.com/docs/components/carousel#plugins
				// @ts-ignore
				plugins={[Autoplay({ delay: 2500, stopOnInteraction: true })]}
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
				className="flex-row] flex w-full max-w-fit"
			>
				<CarouselContent>
					{team.map((p, index) => (
						<CarouselItem
							key={index}
							className="overflow-visible md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
						>
							<TeamMember person={p} />
						</CarouselItem>
					))}
				</CarouselContent>
				{/* NOTE: Source image of carousel previous and next are modified with color prop  */}
				<CarouselPrevious className="border-none bg-transparent hover:cursor-pointer" />
				<CarouselNext className="border-none bg-transparent hover:cursor-pointer" />
			</Carousel>
		</>
	);
}

export default function WorkWithUs() {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	return (
		<section
			ref={sectionRef}
			className="relative z-10 grid w-full grid-cols-1 overflow-hidden"
		>
			<div className="relative h-[200vh] w-full">
				<div className="absolute left-[50%] h-full w-full -translate-x-[50%]">
					<motion.div
						style={{
							backgroundSize: useTransform(
								scrollYProgress,
								[0, 1],
								["100%", "200%"],
							),
						}}
					>
						{/* Ground 1 */}
						<motion.div
							className="absolute bottom-0"
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.1, 0.15, 0.4, 0.6],
									["-80%", "-130%", "-130%", "-80%", "-15%"],
								),
							}}
						>
							<Image
								src="/img/Ground1.png"
								alt="Ground 1"
								width={1920}
								height={1080}
								className="z-1 h-[auto] w-full object-contain"
								unoptimized
							/>
						</motion.div>

						{/* Ground 2 */}
						<motion.div
							className="absolute bottom-0"
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.13, 0.15, 0.4, 0.6],
									["-100%", "-130%", "-130%", "-80%", "-15%"],
								),
							}}
						>
							<Image
								src="/img/Ground2.png"
								alt="Ground 2"
								width={1920}
								height={1080}
								className="z-20 h-auto w-full object-contain"
								unoptimized
							/>
						</motion.div>

						{/* Ground 3 */}
						<motion.div
							className="absolute bottom-0"
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.15, 0.4, 0.6],
									["-80%", "-130%", "-80%", "-15%"],
								),
								translateX: useTransform(
									scrollYProgress,
									[0.4, 0.6],
									["0%", "-100%"],
								),
							}}
						>
							<Image
								src="/img/Ground3.png"
								alt="Ground3"
								width={1920}
								height={1080}
								className="z-30 h-auto w-full object-contain"
								unoptimized
							/>
						</motion.div>

						{/* Billboard */}
						<motion.div
							className="absolute bottom-0 origin-bottom"
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.15, 0.4, 0.6],
									["-80%", "-130%", "-50%", "15%"],
								),
								scale: useTransform(
									scrollYProgress,
									[0, 0.15, 0.4],
									[0, 0.7, 1.3],
								),
								translateX: useTransform(
									scrollYProgress,
									[0.4, 0.6],
									["0%", "-100%"],
								),
							}}
						>
							<Image
								src={"/img/billboard.png"}
								alt="Billboard"
								width={1200}
								height={800}
								unoptimized
								className="z-15 h-auto w-full origin-bottom object-contain"
							/>

							<div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-6">
								<div className="h-[45%] w-[50%] -translate-y-[40%]">
									<h1 className="mb-6 text-center font-spaceranger text-2xl text-[#9EFF3C] drop-shadow-xl md:text-5xl lg:text-7xl">
										Help Wanted
									</h1>
									<h2 className="text-center font-league text-5xl text-[#2e2e2e]">
										Want to get involved?
									</h2>
									<div className="flex flex-col items-center justify-center gap-5 pb-5 md:flex-row">
										<Link
											href={
												"https://form.rowdyhacks.org/volunteer"
											}
										>
											<button className="rounded bg-[#A5836B] px-3 py-3 font-bold text-white transition-colors duration-150">
												Volunteer Form
											</button>
										</Link>
										<Link
											href={
												"https://form.rowdyhacks.org/mentor"
											}
										>
											<button className="rounded bg-[#A5836B] px-3 py-3 font-bold text-white transition-colors duration-150">
												Mentor Form
											</button>
										</Link>
									</div>
									<h2 className="text-center font-league text-5xl text-[#2e2e2e]">
										Ready to become a sponsor?
									</h2>
									<div className="flex items-center justify-center pb-5">
										<Link href="https://static.rowdyhacks.org/docs%2FRowdyHacks%202024%20Partner%20Packet.pdf">
											<button className="rounded bg-[#A5836B] px-3 py-3 font-bold text-white transition-colors duration-150">
												Partner Packet
											</button>
										</Link>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Ground 4 */}
						<motion.div
							className="absolute bottom-0"
							style={{
								translateX: useTransform(
									scrollYProgress,
									[0.4, 0.6],
									["99%", "0%"],
								),
								translateY: useTransform(
									scrollYProgress,
									[0.4, 0.6, 1],
									["-80%", "-15%", "0%"],
								),
							}}
						>
							<Image
								src={"/img/Ground4.png"}
								alt="Ground4"
								width={1920}
								height={1080}
								className="z-15 h-auto w-full object-contain"
								unoptimized
							/>
						</motion.div>

						{/* Wanted Board */}
						<motion.div
							className="absolute bottom-0 overflow-visible"
							style={{
								translateX: useTransform(
									scrollYProgress,
									[0.4, 0.6],
									["99%", "0%"],
								),
								translateY: useTransform(
									scrollYProgress,
									[0.4, 0.6, 1],
									["-80%", "-15%", "0%"],
								),
							}}
						>
							<Image
								src={"/img/wanted-board.png"}
								alt="Wanted Board"
								width={1200}
								height={800}
								unoptimized
								className="z-20 h-auto w-full"
							/>
							<div className="absolute inset-0 z-[60] mx-auto flex h-[50%] w-[62%] translate-y-[25%] flex-col items-center justify-center overflow-visible px-4 py-6">
								<CarouselDefault />
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
