import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
	const moonRef = useRef(null);
	const ufoRef = useRef(null);

	const { scrollYProgress: ufoScroll } = useScroll({
		target: ufoRef,
		offset: ["start end", "start start"]
	})
	const { scrollYProgress: moonScroll } = useScroll({
		target: moonRef,
		offset: ["start end", "end end"]
	})

	const scaleUfo = useTransform(ufoScroll, [0, 0.8], [0.1, 1]);
	const xUfo = useTransform(ufoScroll, [0, 0.8], ["-100%", "0%"]);

	const scaleUfoTransition = useTransform(moonScroll, [0.21, 0.5], [1, 0.7]);
	const xUfoTransition = useTransform(moonScroll, [0.21, 0.5], ["0%", "100%"]);

	const scaleMoon = useTransform(moonScroll, [0.21, 0.4, 0.55, 0.7, 0.8, 0.9, 0.99, 1], [1, 8, 8, 1, 1.5, 3, 5, 2]);
	const xMoon = useTransform(moonScroll, [0.21, 0.4, 0.55, 0.7], ["0%", "50%", "50%", "0%"]);
	const yMoon = useTransform(moonScroll, [0.21, 0.4, 0.55, 0.7, 0.8, 0.9, 0.9999, 1], ["0%", "250%", "50%", "0%", "50%", "300%", "600%", "0%"]);
	const opacityMoon = useTransform(moonScroll, [0.99, 1], [1, 0]);

	const scaleSign = useTransform(moonScroll, [0.21, 0.4, 0.55, 0.7, 0.9], [0.075, 1, 1, 0.075, 0.2]);
	const xSign = useTransform(moonScroll, [0.21, 0.4, 0.55, 0.7, 0.9], ["-10%", "0%", "0%", "-10%", "-15%"])
	const ySign = useTransform(moonScroll, [0.21, 0.4, 0.55, 0.7, 0.9, 1], ["-30%", "40%", "-25%", "-30%", "85%", "60%"])
	const opacitySign = useTransform(moonScroll, [0.99, 1], [1, 0]);

	return (
		<section className="relative w-full min-w-[375px] min-h-[800px]">
			<div ref={ufoRef} className="relative w-full h-screen min-w-[375px] min-h-[800px] overflow-hidden">
				<motion.div className="w-full h-full"
					style={{ scale: scaleUfo, translateX: xUfo }}
				>
					<motion.div className="flex justify-center w-full h-full"
						style={{ scale: scaleUfoTransition, translateX: xUfoTransition }}
					>
						<Image
							className="w-auto h-full object-cover overflow-visible"
							src="/img/about/ufo.svg"
							width={500}
							height={500}
							alt="UFO"
						/>
						<motion.div className="absolute top-[33%] px-20 text-center">
		 					<h1 className="font-space-ranger text-4xl/8 text-black">About Us</h1>
		 					<p className="w-[17ch] font-xolonium text-lg text-black tracking-tight">
		 						RowdyHacks is UTSA's annual hackathon, hosted by the Association for Computing Machinery (ACM) at UTSA.
								It's a weekend-long event where students, tech enthusiasts, and creative minds from all backgrounds come
		 						together to collaborate, innovate, and build real-world projects in 24 hours.
		 					</p> 
		 				</motion.div>
					</motion.div>
				</motion.div>
			</div>
			<div ref={moonRef} className="relative flex flex-col justify-end w-full h-[200vh] min-h-[calc(800px*2)]">
				<div className="sticky bottom-0 w-full h-[50vh]">
					<div className="relative w-full h-full overflow-x-clip">					
						<motion.div className="relative w-full h-full origin-bottom"
							style={{ scale: scaleMoon, translateX: xMoon, translateY: yMoon, opacity: opacityMoon }}
						>
							<Image 
								className="absolute w-full h-full object-cover object-bottom md:object-center overflow-visible"
								src="/img/about/moon.svg"
								width={500}
								height={500}
								alt="Moon"
							/>
						</motion.div>
					<motion.div className="absolute w-full h-full bottom-0 origin-bottom"
						style={{ scale: scaleSign, translateX: xSign, translateY: ySign, opacity: opacitySign }}
					>
						<div className="absolute flex justify-center items-center w-full h-screen bottom-0">
							<div className="absolute flex justify-center items-center w-[500px] h-[700px] z-20">
								<Image 
									className="absolute w-[500px] h-[700px] object-cover overflow-visible will-change-transform"
									src="/img/about/sign.svg"
									width={500}
									height={500}
									alt="Sign"
									quality={10}
									priority
								/>
								<motion.div className="absolute flex flex-col w-full h-full pt-[15%]">
									<div className="relative w-full h-[26%] px-[16%] text-center">
										<h1 className="font-texas-tango text-3xl/6 text-black tracking-tighter">Who Can Attend?</h1>
										<p className="font-bang-bang text-[33px]/8 text-black">
											Everyone is welcome. RowdyHacks is open to all students and beginners no matter your major, skill level, or background. 
										</p>
									</div>
									<div className="relative w-full h-[21%] mt-[14%] px-[15%] text-center">
										<p className="font-bang-bang text-[33px]/8 text-black">
											Whether you're a first-time hacker, an experienced developer, or just curious about tech, there's a place for you here.
										</p>
									</div>
								</motion.div>
							</div>
							<Image 
								className="absolute w-full h-full z-10 min-w-[600px]"
								src="/img/about/sign_background.svg"
								width={500}
								height={500}
								alt="Sign Background"
							/>
						</div>
					</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}