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

const oswald = Oswald({
	variable: "--font-oswald",
	subsets: ["latin"],
});

// Creates our person and makes it seamless
function createPerson(
	fname: string,
	lname: string,
	role: string,
	linkedin: string,
	website: string,
	github: string,
): Person {
	return {
		fname: fname,
		lname: lname,
		imgLink: CreateImgLink(fname, lname),
		role: role,
		linkedin: linkedin,
		website: website,
		github: github,
	};
}

function CreateImgLink(firstname: string, lastname: string) {
	return `/img/landing/team/${firstname}_${lastname}.jpg`;
}

const director = "Director";
const media = "Media/Design";
const experience = "Experience";
const logistics = "Logistics";
const tech = "Tech";
const pr = "PR";

let team: Array<Person> = [
	// add each person here. if no website, leave empty string
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
	createPerson(
		"Josh",
		"Silva",
		tech,
		"https://www.linkedin.com/in/joshuasilva414/",
		"https://joshuasilva.netlify.app/",
		"https://github.com/joshuasilva414",
	),
];

function CarouselDefault() {
	const [data_rendered, setData_rendered] = useState(false);
	const plugin = React.useRef(
		Autoplay({ delay: 2500, stopOnInteraction: true }),
	);
	useEffect(() => {
		// Basic use effect hook to check if the page has rendered
		setData_rendered(true);
	}, []);

	return (
		//Where Carousel will go
		<>
			{data_rendered ? (
				<Carousel
					opts={{ align: "end", loop: true }}
					// Christian Walker: Typescript was complaining here so I suppressed. This use of the carousel is correct according to the docs
					// See docs for example code: https://ui.shadcn.com/docs/components/carousel#plugins
					// @ts-ignore
					plugins={[
						Autoplay({ delay: 2500, stopOnInteraction: true }),
					]}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}
					className="flex max-w-7xl items-center justify-center md:w-[75%] xl:w-[85%] 2xl:w-full 2xl:max-w-[92rem]"
				>
					<CarouselContent>
						{team.map((p: Person, index: React.Key) => (
							<CarouselItem
								key={index}
								className="pl-1 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
							>
								<TeamMember person={p} />
							</CarouselItem>
						))}
					</CarouselContent>
					{/* NOTE: Source image of carousel previous and next are modified with color prop  */}
					<CarouselPrevious className="border-none bg-transparent hover:cursor-pointer" />
					<CarouselNext className="border-none bg-transparent hover:cursor-pointer" />
				</Carousel>
			) : (
				<div className="hidden md:flex md:justify-center">
					<h1 className="text-3xl text-[#FEF2E6]">Loading...</h1>
				</div>
			)}
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
			className="grid w-full grid-cols-1 overflow-hidden"
		>
			<motion.div
				className="night relative flex w-full flex-col justify-end"
				style={{
					backgroundSize: useTransform(
						scrollYProgress,
						[0, 1],
						["100%", "200%"],
					),
				}}
			>
				<div className="relative flex h-[1630px] w-full flex-col items-center">
					<motion.div
						style={{
							translateY: useTransform(
								scrollYProgress,
								[0.2, 0.5, 0.6, 0.7],
								["0", "45%", "17.7%", "22%"],
							),
							scale: useTransform(
								scrollYProgress,
								[0.2, 0.5, 0.6],
								[1, 1.75, 1],
							),
						}}
					>
						<motion.div
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.2],
									["30%", "-20%"],
								),
							}}
						>
							<Image
								src="/img/Ground1.png"
								alt="Ground 1"
								width={1920}
								height={1080}
								className="z-1 h-auto w-full object-contain"
								unoptimized
							/>
						</motion.div>
						<motion.div
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.2],
									["-50%", "-120%"],
								),
							}}
						>
							<Image
								src="/img/Ground2.png"
								alt="Ground 2"
								width={1920}
								height={1080}
								className="z-5 h-auto w-full object-contain"
								unoptimized
							/>
						</motion.div>
						<motion.div
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.2], // Where we are at the page (0 = top, 1 = bottom)
									["-100%", "-220%"],
								),
								translateX: useTransform(
									scrollYProgress,
									[0.5, 0.65],
									["0%", "-100%"],
								),
							}}
						>
							<Image
								src="/img/Ground3.png"
								alt="Ground3"
								width={1920}
								height={1080}
								className="z-10 h-auto w-full object-contain"
								unoptimized
							/>
						</motion.div>
						<motion.div
							style={{
								translateY: useTransform(
									scrollYProgress,
									[0, 0.2],
									["-200%", "-310%"],
								),
								scale: useTransform(
									scrollYProgress,
									[0, 0.2],
									[0, 0.7],
								),
								translateX: useTransform(
									scrollYProgress,
									[0.5, 0.65],
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
								className="z-15 h-auto w-full object-contain"
							/>

							<div className="absolute inset-0 flex translate-y-[-18%] flex-col items-center justify-center px-4 py-6">
								<h1 className="mb-6 text-center font-spaceranger text-4xl text-[#4f3b34] md:text-5xl lg:text-7xl">
									Help Wanted
								</h1>
								<div className="h-30%] ml-3 flex w-[50%] max-w-5xl flex-col gap-3 md:flex-row md:gap-4">
									<div className="flex aspect-[16/10] w-full flex-col rounded-2xl border-4 border-[#4f3b34] bg-white/90 px-2 shadow-2xl">
										<h2 className="-translate-y-[50%] self-start rounded-full border-4 border-[#4f3b34] bg-white px-3 py-2 font-league text-[#4f3b34]">
											Students
										</h2>
										<div className="-translate-y-[5%]">
											<h1 className="text-1xl font-league text-[#4f3b34] md:text-2xl lg:text-3xl">
												Interested in helping?
											</h1>
											<p className="my-4 font-bitter text-[#4f3b34]">
												If you are interested in
												becoming a volunteer or mentor,
												click below to signup!
											</p>
											<div className="flex flex-wrap gap-3">
												<a href="/">
													<button className="rounded bg-[#4f3b34] px-3 py-3 font-bold text-white transition-colors duration-150">
														Volunteer Form
													</button>
												</a>
												<a href="/">
													<button className="rounded bg-[#4f3b34] px-3 py-3 font-bold text-white transition-colors duration-150">
														Mentor Form
													</button>
												</a>
											</div>
										</div>
									</div>

									<div className="mr-3 flex aspect-[16/10] w-full flex-col rounded-2xl border-4 border-[#4f3b34] bg-white/90 px-2 shadow-2xl">
										<h2 className="-translate-y-[50%] self-end rounded-full border-4 border-[#4f3b34] bg-white px-3 py-2 font-league text-[#4f3b34]">
											Companies
										</h2>
										<div className="mx-auto max-w-xl -translate-y-[5%] text-right">
											<h1 className="text-1xl font-league text-[#4f3b34] md:text-2xl lg:text-3xl">
												Interested in sponsoring?
											</h1>
											<p className="my-4 font-bitter text-[#4f3b34]">
												If you or a group you represent
												are interested in partnering,
												please click below to view our
												Partner Packet.
											</p>
											<div className="flex flex-wrap justify-end gap-3">
												<a href="/">
													<button className="rounded bg-[#4f3b34] px-3 py-3 font-bold text-white transition-colors duration-150">
														Partner Packet
													</button>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
						<motion.div
							style={{
								translateX: useTransform(
									scrollYProgress,
									[0.5, 0.65],
									["99%", "0%"],
								),
								translateY: useTransform(
									scrollYProgress,
									[0, 0.2],
									["0%", "-420%"],
								),
							}}
						>
							<Image
								src={"/img/Ground4.png"}
								alt="Ground4"
								width={1920}
								height={1080}
								className="z-16 h-auto w-full object-contain"
								unoptimized
							/>
						</motion.div>
						<motion.div
							style={{
								translateX: useTransform(
									scrollYProgress,
									[0.5, 0.65],
									["99%", "0%"],
								),
								translateY: useTransform(
									scrollYProgress,
									[0, 0.2],
									["0%", "-520%"],
								),
							}}
						>
							<Image
								src={"/img/wanted-board.png"}
								alt="Wanted Board"
								width={1200}
								height={800}
								unoptimized
								className="z-20 h-auto w-full object-contain"
							/>
							<div className="absolute inset-0 mx-auto flex max-w-5xl -translate-y-[120px] flex-col items-center justify-center px-4 py-6">
								<CarouselDefault />
							</div>
						</motion.div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
