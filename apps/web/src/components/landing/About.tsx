import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";
import { relative } from 'path';
import { MoonStarIcon } from 'lucide-react';

export default function About() {
	const secRef = useRef(null);
	const moonRef = useRef(null);
	const ufoRef = useRef(null);

	const { scrollYProgress: secScroll } = useScroll({
		target: secRef,
		offset: ["start end", "end end"]
	})
	const { scrollYProgress: ufoScroll } = useScroll({
		target: ufoRef,
		offset: ["start end", "start start"]
	})

	const inView = useInView(moonRef, { amount: "all" });
	const [startValue, setStartValue] = useState(null);

	useEffect(() => {
		return secScroll.on("change", (latest) => {
			if (inView && startValue == null) {
				setStartValue(latest);
			}
		});
	}, [inView, startValue, secScroll])
	
	const relativeScroll = useTransform(secScroll, latest => {
		if (startValue == null) return 0;
		return (latest - startValue) / (1 - startValue);
	});

	const scaleUfo = useTransform(ufoScroll, [0, 0.8], [0.1, 1]);
	const xUfo = useTransform(ufoScroll, [0, 0.8], ["-100%", "0%"]);

	const scaleUfoTransition = useTransform(relativeScroll, [0, 0.35], [1, 4]);
	const xUfoTransition = useTransform(relativeScroll, [0, 0.35], ["0%", "250%"]);

	const scaleMoon = useTransform(relativeScroll, [0, 0.35, 0.7, 0.85, 1], [1, 8, 1, 1, 4]);
	const yMoon = useTransform(relativeScroll, [0, 0.35, 0.7, 0.85, 1], ["0%", "100%", "0%", "0%", "400%"]);

	const scaleSign = useTransform(relativeScroll, [0, 0.35, 0.6, 0.7], [0.075, 1, 1, 0.075]);
	const xSign = useTransform(relativeScroll, [0, 0.35, 0.6, 0.7], ["-10%", "0%", "0%", "-10%"]);
	const ySign = useTransform(relativeScroll, [0, 0.35, 0.7, 0.85, 1], ["-25%", "0%", "-40%", "-40%", "400%"]);

	return (
		<section className="relative w-full min-w-[375px] min-h-[800px]">
			<div ref={secRef} className="relative flex flex-col justify-end w-full h-[350vh] min-h-[calc(800px*3)]">
				<div className="sticky bottom-0 w-full min-h-screen">
					<div className="w-full h-full overflow-hidden">
						<div ref={ufoRef} className="relative w-full h-screen min-w-[375px] min-h-[800px]">
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
									<motion.div className="absolute top-[35%] px-20 text-center">
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
						<div ref={moonRef} className="relative w-full h-auto">
							<motion.div className="relative w-full h-auto origin-bottom"
								style={{ scale: scaleMoon, translateY: yMoon }}
							>
								<Image 
									className="w-full h-auto"
									src="/img/about/moon_test.svg"
									width={500}
									height={500}
									alt="Moon"
								/>
							</motion.div>
							<motion.div className="absolute w-full h-full bottom-0 origin-bottom"
								style={{ scale: scaleSign, translateX: xSign,  translateY: ySign }}
							>
								<div className="absolute flex justify-center items-center w-full h-screen bottom-0">
									<div className="absolute flex justify-center items-center w-[500px] h-[700px] z-20">
										<Image 
											className="absolute w-[500px] h-[700px] object-cover overflow-visible"
											src="/img/about/new_sign.svg"
											width={500}
											height={500}
											alt="Sign"
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
										className="absolute w-full h-full z-10 overflow-visible object-cover"
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
			</div>
		</section>
	)
}