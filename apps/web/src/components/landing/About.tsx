import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
	const ufoRef = useRef(null);
	const moonRef = useRef(null);

	const { scrollYProgress: scrollYProgressUfo } = useScroll({
		target: ufoRef,
		offset: ["start end", "end start"],
	})
	const { scrollYProgress: scrollYProgressMoon } = useScroll({
		target: moonRef,
		offset: ["center end", "end end"],
	})

	// Ufo Animation 
	const scaleUfo = useTransform(scrollYProgressUfo, [0, 0.2, 0.5, 1], [0.5, 1, 1, 4]);
	const translateXUfo = useTransform(scrollYProgressUfo, [0, 0.2, 0.5, 1], ["-100%", "0%", "0%", "500%"]);
	const translateYUfo = useTransform(scrollYProgressUfo, [0, 0.2, 0.5, 1], ["10%", "0%", "0%", "-150%"]);
	// Moon Animation
	const scaleMoon = useTransform(scrollYProgressMoon, [0, 0.7], [1, 10]);
	const translateXMoon = useTransform(scrollYProgressMoon, [0, 0.7], ["0%", "10%"]);
	const translateYMoon = useTransform(scrollYProgressMoon, [0, 0.7], ["0%", "150%"]);
	// Sign Animation
	const scaleSign = useTransform(scrollYProgressMoon, [0, 0.7], [0.05, 1]);
	const translateXSign = useTransform(scrollYProgressMoon, [0, 0.7], ["-10%", "0%"]);
	const translateYSign = useTransform(scrollYProgressMoon, [0, 0.7], ["-15%", "0%"]);

	return (
		<section className="relative flex flex-col justify-center w-full h-auto min-w-[375px] min-h-[800px] z-10 overflow-hidden">
			{/* Div for UFO Section */}
			<div ref={ufoRef} className="relative flex justify-center items-center w-auto h-screen min-w-[375px] min-h-[800px] z-40">
				{/* MotionDiv for UFO & Text Animation */}
				<motion.div 
					className="absolute flex justify-center items-center w-auto h-[90%] bottom-0"
					style={{ scale: scaleUfo, translateX: translateXUfo, translateY: translateYUfo }}
				>
					{/* UFO */}
					<Image
						className="w-auto h-full"
						src="/img/about/ufo_wo_text.svg"
						width={500}
						height={500}
						alt="UFO"
					/>
					{/* Text */}
					<div className="absolute top-[35%] px-20 text-center">
						<h1 className="font-space-ranger text-4xl/8 text-black">About Us</h1>
						<p className="w-[17ch] font-xolonium text-base text-black tracking-tight">
							RowdyHacks is UTSA's annual hackathon, hosted by the Association for Computing Machinery (ACM) at UTSA.
							It's a weekend-long event where students, tech enthusiasts, and creative minds from all backgrounds come
							together to collaborate, innovate, and build real-world projects in 24 hours.
						</p>
					</div>
				</motion.div>
			</div>
			{/* Container for Moon and Sign */}
			{/* style={{ scale: scaleMoon, translateX: translateXMoon, translateY: translateYMoon }} */}
			{/* Div for Moon Section */}
			<div ref={moonRef} className="relative flex justify-center items-center w-full h-auto min-w-[375px] z-20">
				{/* MotionDiv for Moon Animation*/}
				<motion.div 
					className="w-full h-auto origin-center"
					style={{ scale: scaleMoon, translateX: translateXMoon, translateY: translateYMoon }}
					// style={{ scale: scaleMoon, translateX: translateXMoon, translateY: translateYMoon }}
				>
					{/* Moon */}
					<Image 
						className="w-full h-auto"
						src="/img/about/moon_test_3.svg"
						width={500}
						height={500}
						alt="Moon Background"
					/>
				</motion.div>
				{/* MotionDiv for Sign Animation */}
				<motion.div 
					className="absolute flex justify-center items-center w-full h-full origin-center border-4 border-blue-500"
					style={{ scale: scaleSign, translateX: translateXSign, translateY: translateYSign }}
				>
					<div className="absolute flex justify-center items-center w-auto h-screen min-h-[725px] bottom-0 z-30">
						{/* Sign */}
						<Image 
							className="w-auto h-full"
							src="/img/about/sign_test.svg"
							width={500}
							height={500}
							alt="Sign"
						/>
						<motion.div className="absolute flex flex-col w-full h-full pt-[13%]">
							<div className="relative w-full h-[28%] px-6 text-center">
								<h1 className="font-texas-tango text-2xl/6 text-black tracking-tighter">Who Can Attend?</h1>
								<p className="font-bang-bang text-2xl/6 text-black">
									Everyone is welcome. RowdyHacks is open to all students and beginners no matter your major, skill level, or background. 
								</p>
							</div>
							<div className="relative w-full h-[28%] mt-[8%] px-6 text-center">
								<p className="font-bang-bang text-2xl/6 text-black">
									Whether you're a first-time hacker, an experienced developer, or just curious about tech, there's a place for you here.
								</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}


// "use client";
// import Image from "next/image";
// import { useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, useInView, useMotionValueEvent, useMotionValue, useSpring, animate } from "framer-motion";

// export default function About() {
// 	const{ scrollYProgress: scrollPage } = useScroll();

// 	// Scroll Debug Area
// 	const inViewRef = useRef<HTMLDivElement>(null);
// 	const isInView = useInView(inViewRef, {
// 		amount: "some",
// 	});
// 	const { scrollYProgress } = useScroll({
// 		target: inViewRef,
// 		offset: ["start end", "end start"]
// 	});
// 	useMotionValueEvent(scrollYProgress, "change",
// 		(latest) => {
// 			console.log(latest);
// 		}
// 	);
// 	useEffect(() => {
// 		console.log(`The section ${isInView ? "is" : "is not"} in view`);
// 	}, [isInView]);

// 	// Figure 8 UFO
// 	const oscillation = useMotionValue(0);
// 	useEffect(() => {
// 		const controls = animate(oscillation, 2 * Math.PI, {
// 			repeat: Infinity,
// 			duration: 4,
// 			ease: "linear",
// 		});
// 		return controls.stop;
// 	}, []);
// 	const floatX = useTransform(oscillation, v => 15 * Math.sin(v));
// 	const floatY = useTransform(oscillation, v => 8 * Math.sin(2 * v));