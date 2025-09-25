import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
	const ufoRef = useRef(null);
	const moonRef = useRef(null);
	const transitionRef = useRef(null);

	// UFO scrollYProgress
	const { scrollYProgress: scrollYProgressUfo } = useScroll({
		target: ufoRef,
		offset: ["start end", "end start"]
	})
	// Moon scrollYProgress
	const { scrollYProgress: scrollYProgressMoon } = useScroll({
		target: moonRef,
		offset: ["start end", "end end"]
	})
	// TransitionOut scrollYProgress
	const { scrollYProgress: scrollYProgressTransition } = useScroll({
		target: transitionRef,
		offset: ["center end", "end end"]
	})

	// Reason why UFO is using 2 different refs is because one is for the start of the
	// section and the second one is so it can be in sync with the sign animation 
	// when it is zooming out.
	// Ufo Animation with UfoRef 
	const scaleUfo = useTransform(scrollYProgressUfo, [0, 0.5], [0.1, 1]);
	const translateXUfo = useTransform(scrollYProgressUfo, [0, 0.5], ["-100%", "0%"]);
	// Ufo Animation with MoonRef
	const scaleUfoSync = useTransform(scrollYProgressMoon, [0.5, 0.9], [1, 4]);
	const translateXUfoSync = useTransform(scrollYProgressMoon, [0.5, 0.9], ["0%", "100%"]);
	const translateYUfoSync = useTransform(scrollYProgressMoon, [0.5, 0.9], ["0%", "-100%"]);
	// Moon Animation
	const scaleMoon = useTransform(scrollYProgressMoon, [0.5, 0.9], [1, 10]);
	const translateXMoon = useTransform(scrollYProgressMoon, [0.5, 0.9], ["0%", "10%"]);
	const translateYMoon = useTransform(scrollYProgressMoon, [0.5, 0.9], ["0%", "150%"]);
	// Sign Animation
	const scaleSign = useTransform(scrollYProgressMoon, [0.5, 0.8], [0.075, 1]);
	const translateXSign = useTransform(scrollYProgressMoon, [0.5, 0.8], ["-10%", "0%"]);
	const translateYSign = useTransform(scrollYProgressMoon, [0.5, 0.8], ["-15%", "0%"]);
	// Transition Animation
	const scaleTransition = useTransform(scrollYProgressTransition, [0, 1], [1, 0.4]);
	const translateXTransition = useTransform(scrollYProgressTransition, [0, 1], ["0%", "25%"]);
	const translateYTransition = useTransform(scrollYProgressTransition, [0, 1], ["0%", "200%"]);


	return (
		<section className="relative flex flex-col justify-center w-full h-auto min-w-[375px] min-h-[800px] z-10 overflow-hidden">
			{/* Div for UFO Section */}
			<div ref={ufoRef} className="relative w-auto h-screen min-w-[375px] min-h-[800px] z-30">
				{/* MotionDiv for UFO (start animation) */}
				<motion.div 
					className="absolute w-full h-full bottom-0 origin-bottom"
					style={{ scale: scaleUfo, translateX: translateXUfo }}
				>
					{/* MotionDiv for UFO (sync animation with sign) */}
					<motion.div 
						className="absolute flex justify-center items-center w-full h-full bottom-0 origin-bottom"
						style={{ scale: scaleUfoSync, translateX: translateXUfoSync, translateY: translateYUfoSync }}
					>
						{/* Div for UFO and Text */}
						<div className="absolute flex justify-center items-center w-auto h-[90%] bottom-0 origin-bottom">
							{/* UFO */}
							<Image
								className="w-auto h-full object-cover overflow-visible"
								src="/img/about/ufo.svg"
								width={500}
								height={500}
								alt="UFO"
							/>
							{/* MotionDiv for Text Animation */}
							<motion.div className="absolute top-[35%] px-20 text-center">
								<h1 className="font-space-ranger text-4xl/8 text-black">About Us</h1>
								<p className="w-[17ch] font-xolonium text-base text-black tracking-tight">
									RowdyHacks is UTSA's annual hackathon, hosted by the Association for Computing Machinery (ACM) at UTSA.
									It's a weekend-long event where students, tech enthusiasts, and creative minds from all backgrounds come
									together to collaborate, innovate, and build real-world projects in 24 hours.
								</p>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</div>
			{/* Div for Moon and Sign */}
			<motion.div ref={moonRef} className="relative flex justify-center items-center w-full h-auto min-w-[375px] z-20"
				// style={{ scale: scaleTransition }}
			>
				{/* MotionDiv for Moon Animation*/}
				<motion.div 
					className="relative w-full h-auto origin-center z-10"
					style={{ scale: scaleMoon, translateX: translateXMoon, translateY: translateYMoon }}
				>
					{/* Moon */}
					<Image 
						className="w-full h-auto"
						src="/img/about/moon.svg"
						width={500}
						height={500}
						alt="Moon Background"
					/>
				</motion.div>
				{/* MotionDiv for Sign Animation */}
				<motion.div 
					className="absolute flex justify-center items-center w-full h-full origin-center z-20"
					style={{ scale: scaleSign, translateX: translateXSign, translateY: translateYSign }}
				>
					{/* Div for Sign & Text */}
					<div className="absolute flex justify-center items-center w-[415px] h-[600px] z-20">
						{/* Sign */}
						<Image 
							className="w-[415px] h-[600px] object-cover overflow-visible"
							src="/img/about/new_sign.svg"
							width={500}
							height={500}
							alt="Sign"
						/>
						{/* MotionDiv for Text Animation */}
						<motion.div className="absolute flex flex-col w-full h-full pt-[17%]">
							<div className="relative w-full h-[28%] px-14 text-center">
								<h1 className="font-texas-tango text-2xl/6 text-black tracking-tighter">Who Can Attend?</h1>
								<p className="font-bang-bang text-3xl/6 text-black">
									Everyone is welcome. RowdyHacks is open to all students and beginners no matter your major, skill level, or background. 
								</p>
							</div>
							<div className="relative w-full h-[28%] mt-[14%] px-14 text-center">
								<p className="font-bang-bang text-3xl/6 text-black">
									Whether you're a first-time hacker, an experienced developer, or just curious about tech, there's a place for you here.
								</p>
							</div>
						</motion.div>
					</div>
					<Image 
						className="absolute w-full h-full z-10"
						src="/img/about/sign_background.svg"
						width={500}
						height={500}
						alt="Sign Background"
					/>
				</motion.div>
			</motion.div>
			<motion.div ref={transitionRef} className="relative w-full h-[400px] z-10"/>
		</section>
	)
}