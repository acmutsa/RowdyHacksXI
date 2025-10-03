import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import TeamMember from "./TeamMember";

const CarouselDefault = () => {
	const plugin = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: true }),
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
			<Carousel
				className="flex h-[245px] w-full overflow-visible"
				opts={{ align: "start", loop: true }}
				// @ts-ignore - TypeScript complains, but this usage is correct per docs
				// plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
			>
				<CarouselContent className="relative -ml-4 h-full w-full overflow-visible">
					{team.map((p, index) => (
						<CarouselItem
							key={index}
							className="ml-4 basis-1/2 overflow-visible pl-0 md:basis-1/3"
						>
							<TeamMember person={p} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="border-none bg-transparent" />
				<CarouselNext className="border-none bg-transparent" />
			</Carousel>
		</>
	);
};

export default function WorkWithUs() {
	const secRef = useRef(null);
	const { scrollYProgress: secScroll } = useScroll({
		target: secRef,
		offset: ["start start", "end end"],
	});
	const scaleBillBoard = useTransform(secScroll, [0.2, 0.9], [1, 0.5]);
	const xBillBoard = useTransform(secScroll, [0.2, 0.9], ["0%", "-100%"]);
	const scaleWantedBoard = useTransform(
		secScroll,
		[0, 0.2, 0.9],
		[0.5, 0.5, 1],
	);
	const xWantedBoard = useTransform(
		secScroll,
		[0, 0.2, 0.9],
		["100%", "100%", "0%"],
	);

	return (
		<section className="relative min-h-[800px] w-full min-w-[375px]">
			<div
				ref={secRef}
				className="relative flex h-[175vh] min-h-[800px] w-full items-end justify-center"
			>
				<div className="sticky bottom-0 h-screen min-h-screen w-full">
					<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
						<motion.div className="absolute bottom-0 h-full w-full">
							<Image
								className="absolute bottom-0 h-auto w-full overflow-visible object-bottom md:h-full md:object-cover"
								src="/img/work/Ground1.png"
								width={1920}
								height={1080}
								alt="Ground1"
							/>
							<Image
								className="absolute bottom-0 h-auto w-full overflow-visible object-bottom md:h-full md:object-cover"
								src="/img/work/Ground2.png"
								width={1920}
								height={1080}
								alt="Ground2"
							/>
						</motion.div>
						<Billboard
							scaleBillBoard={scaleBillBoard}
							xBillBoard={xBillBoard}
						/>
						<WantedBoard
							scaleWantedBoard={scaleWantedBoard}
							xWantedBoard={xWantedBoard}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

function Billboard({
	xBillBoard,
	scaleBillBoard,
}: {
	xBillBoard: MotionValue<string>;
	scaleBillBoard: MotionValue<number>;
}) {
	return (
		<motion.div
			className="absolute bottom-0 flex h-full w-full justify-center"
			style={{ translateX: xBillBoard }}
		>
			<Image
				className="object-visible absolute bottom-0 h-auto w-full object-cover object-bottom"
				src="/img/work/Ground3.png"
				width={1920}
				height={1080}
				alt="Ground3"
			/>
			<motion.div
				className="absolute bottom-0 flex h-[500px] w-[375px] origin-bottom justify-center md:h-[600px] md:w-[600px]"
				style={{ scale: scaleBillBoard }}
			>
				<div className="absolute bottom-0 flex h-[500px] w-[375px] justify-center md:h-[600px] md:w-[600px]">
					<Image
						className="absolute bottom-0 h-full w-full overflow-visible object-cover object-bottom"
						src="/img/work/billboard_new_background.png"
						width={1920}
						height={1080}
						alt="BillBoard"
					/>
					<div className="relative m-8 mt-12 flex h-[220px] w-full flex-col p-2 md:mt-14 md:h-[275px]">
						<h1 className="text-outline pt-3 text-center font-texas-tango text-3xl text-[#E2C394] drop-shadow-xl md:text-5xl">
							Help Wanted
						</h1>
						<div className="relative mb-3 flex h-full w-full flex-col md:px-0">
							<div className="flex h-full w-full flex-row items-center justify-center px-8 md:px-0">
								<div className="rounded-lg border-4 border-[#94391F] bg-white bg-opacity-50 p-3">
									<h1 className="text-outline-other text-1xl text-center font-gota text-white md:text-2xl">
										Interested in helping or sponsoring?
									</h1>
								</div>

								<div className="flex items-center justify-center gap-3">
									<Link
										href={
											"https://form.rowdyhacks.org/volunteerform"
										}
									>
										<button className="bg-earth rounded-full border-2 border-[#4E9642] px-[5px] py-4 font-league font-bold text-white transition-colors duration-150">
											<span className="block">
												Volunteer
											</span>
											<span className="block">Form</span>
										</button>
									</Link>
									<Link
										href={
											"https://form.rowdyhacks.org/mentorform"
										}
									>
										<button className="bg-moon rounded-full border-2 border-[#7C6D66] px-2 py-2 font-league font-bold text-[#282220] transition-colors duration-150">
											<span className="block">
												Mentor
											</span>
											<span className="block">Form</span>
										</button>
									</Link>
									<Link
										href={
											"https://form.rowdyhacks.org/judgeform"
										}
									>
										<button className="bg-og-planet rounded-full border-2 border-[#9d3300] px-2 py-2 font-league font-bold text-white transition-colors duration-150">
											<span className="block">Judge</span>
											<span className="block">Form</span>
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

function WantedBoard({
	xWantedBoard,
	scaleWantedBoard,
}: {
	xWantedBoard: MotionValue<string>;
	scaleWantedBoard: MotionValue<number>;
}) {
	return (
		<motion.div
			className="absolute bottom-0 flex h-full w-full justify-center"
			style={{ translateX: xWantedBoard }}
		>
			<Image
				className="object-visible absolute bottom-0 h-auto w-full object-cover object-bottom"
				src="/img/work/Ground4.png"
				width={1920}
				height={1080}
				alt="Ground4"
			/>
			<motion.div
				className="absolute bottom-0 flex h-[500px] w-[375px] origin-bottom justify-center md:h-[550px] md:w-[800px]"
				style={{ scale: scaleWantedBoard }}
			>
				<div className="absolute bottom-0 flex h-[500px] w-[375px] justify-center md:h-[550px] md:w-[800px]">
					<Image
						className="absolute bottom-0 h-full w-full overflow-visible object-cover object-bottom md:h-auto"
						src="/img/work/wanted_new.png"
						width={1920}
						height={1080}
						alt="WantedBoard"
					/>
					<div className="relative mt-14 h-[245px] w-[400px] overflow-visible md:w-[575px]">
						<CarouselDefault />
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
