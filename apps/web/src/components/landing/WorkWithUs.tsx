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

// function MobileTeam() {
// 	const [data_rendered, setData_rendered] = useState(false);

// 	useEffect(() => {
// 		// Basic use effect hook to check if the page has rendered
// 		setData_rendered(true);
// 	}, []);

// 	return (
// 		<>
// 			{data_rendered ? (
// 				<div className="flex w-full flex-col items-center justify-center md:hidden">
// 					<div className="no-scrollbar grid w-[85%] grid-flow-col grid-rows-2 overflow-x-auto overflow-y-hidden">
// 						{team.map((p: Person, index: React.Key) => (
// 							<TeamMember person={p} key={index} />
// 						))}
// 					</div>
// 					{/* Change directiom */}
// 					<div className="flex w-full items-center justify-center">
// 						<h1 className="[@media (min-width)] pr-3 text-xl text-[#FEF2E6] sm:pr-5 sm:text-2xl">
// 							More Organizers
// 						</h1>
// 						<ArrowRight
// 							className="arrow_animate h-8 w-8 self-center pt-1 sm:h-10 sm:w-10"
// 							color="#FEF2E6"
// 						/>
// 					</div>
// 				</div>
// 			) : (
// 				<div className="tetx-3xl text-[#FEF2E6] md:hidden">
// 					Loading...
// 				</div>
// 			)}
// 		</>
// 	);
// }
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
				<div className="relative z-20 w-screen">
					<motion.div
						style={{
							scale: useTransform(
								scrollYProgress,
								[0, 0.2, 0.3, 0.5], // Where we are at the page (0 = top, 1 = bottom)
								[0.3, 0.8, 0.8, 0.6],
							),
							translateX: useTransform(
								scrollYProgress,
								[0.3, 0.5],
								["0%", "-20%"],
							),
						}}
					>
						<div className="absolute inset-0 -z-10">
							<Image
								src="/img/GreenLand1.png"
								alt="Green background1"
								fill
								className="translate-y-20 scale-[2.5] object-cover"
								unoptimized={true}
							/>
						</div>

						<Image
							className="absolute translate-x-[900px] translate-y-[30px] object-cover"
							src={"/img/YellowTree1.png"}
							alt="Yellow Tree1"
							width={1000}
							height={1000}
							unoptimized={true}
						/>
						<Image
							className="absolute -translate-x-[500px] object-cover"
							src={"/img/YellowTree2.png"}
							alt="Yellow Tree2"
							width={900}
							height={900}
							unoptimized={true}
						/>

						<div className="flex w-full justify-center">
							<div className="relative w-[90%] md:w-[80%] xl:w-[70%]">
								<Image
									src={"/img/billboard.png"}
									alt="Billboard"
									width={1200}
									height={800}
									unoptimized
									className="h-auto w-full object-contain"
								/>

								<div className="absolute inset-0 flex translate-y-[-22%] flex-col items-center justify-center px-4 py-6">
									<h1 className="text-outline mb-6 text-center font-gota text-4xl text-[#e9c290] md:text-5xl lg:text-7xl">
										Work With Us
									</h1>
									<div className="ml-3 flex w-full max-w-5xl flex-col gap-6 md:flex-row md:gap-9">
										<div className="flex aspect-[16/10] w-full flex-col rounded-2xl border-4 border-[#6f3800] bg-white/90 px-5 shadow-2xl">
											<h2 className="-translate-y-[50%] self-start rounded-full border-4 border-[#6f3800] bg-white px-3 py-2 font-league text-[#6f3800]">
												Students
											</h2>
											<div className="-translate-y-[5%]">
												<h1 className="font-league text-2xl text-[#6f3800] md:text-3xl lg:text-4xl">
													Interested in helping?
												</h1>
												<p className="my-4 font-bitter text-[#6f3800]">
													We are always looking for
													volunteers and mentors to
													help us make RowdyHacks the
													best hackathon around! If
													you are interested in
													becoming a volunteer or
													mentor, click below to
													signup!
												</p>
												<div className="flex flex-wrap gap-3">
													<a href="/">
														<button className="rounded bg-[#6f3800] px-3 py-3 font-bold text-white transition-colors duration-150">
															Volunteer Form
														</button>
													</a>
													<a href="/">
														<button className="rounded bg-[#6f3800] px-3 py-3 font-bold text-white transition-colors duration-150">
															Mentor Form
														</button>
													</a>
												</div>
											</div>
										</div>

										{/* Companies Card */}
										<div className="mr-3 flex aspect-[16/10] w-full flex-col rounded-2xl border-4 border-[#6f3800] bg-white/90 px-5 shadow-2xl">
											<h2 className="-translate-y-[50%] self-end rounded-full border-4 border-[#6f3800] bg-white px-3 py-2 font-league text-[#6f3800]">
												Companies
											</h2>
											<div className="mx-auto max-w-xl -translate-y-[5%] text-right">
												<h1 className="font-league text-2xl text-[#6f3800] md:text-3xl lg:text-4xl">
													Interested in sponsoring?
												</h1>
												<p className="my-4 font-bitter text-[#6f3800]">
													RowdyHacks would not be
													possible without our
													incredible partners! If you
													or a group you represent are
													interested in partnering,
													please click below to view
													our Partner Packet.
												</p>
												<div className="flex flex-wrap justify-end gap-3">
													<a href="/">
														<button className="rounded bg-[#6f3800] px-3 py-3 font-bold text-white transition-colors duration-150">
															Partner Packet
														</button>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
					<motion.div
						style={{
							scale: useTransform(
								scrollYProgress,
								[0, 0.4],
								[0, 0.9],
							),
						}}
					>
						<div className="absolute inset-0 z-10">
							<Image
								src={"/img/GreenLand2.png"}
								alt="Mountain"
								fill
								className="-translate-y-[400px] scale-[2] object-cover"
								unoptimized
							/>
						</div>
						<Image
							className="absolute z-20 -translate-y-[600px] translate-x-[800px] scale-[1.75] object-cover"
							src={"/img/YellowBush.png"}
							alt="Yellow Bush"
							width={1000}
							height={1000}
							unoptimized={true}
						/>
						<Image
							className="absolute z-20 -translate-y-[500px] translate-x-[350px] scale-[1.5] object-cover"
							src={"/img/YellowBush.png"}
							alt="Yellow Bush"
							width={1000}
							height={1000}
							unoptimized={true}
						/>
						<Image
							className="absolute z-20 -translate-x-[230px] -translate-y-[650px] scale-[2] object-cover"
							src={"/img/YellowBush.png"}
							alt="Yellow Bush"
							width={1000}
							height={1000}
							unoptimized={true}
						/>
						<div
							className="relative z-50 w-full overflow-visible"
							style={{ height: "90vh", maxHeight: "900px" }}
						>
							<Image
								src={"/img/wanted-board.png"}
								alt="Wanted Board"
								fill
								className="-translate-y-40 scale-[1.5] object-contain"
								unoptimized
							/>
							<div className="absolute inset-0 mx-auto flex max-w-5xl -translate-y-[300px] flex-col items-center justify-center px-4 py-6">
								<CarouselDefault />
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
