import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
	const containerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end center"],
	})

	const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1.5]);
	const zoomMoon = useTransform(scrollYProgress, [0, 1,], [1, 2]);

	return (
		<section 
			ref={containerRef} 
			className="relative flex justify-center w-full h-screen min-h-[800px] min-w-[340px] overflow-hidden z-10 border-4"
		>
			{/* UFO and Text Container */}
			<motion.div className="absolute flex justify-center items-center w-auto h-[80%] top-0 z-0">
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
			{/* Sign */}
			<motion.div style={{scale}} className="absolute flex justify-center items-center w-auto h-[60%] left-[25%] bottom-[10%] z-40 border-4 origin-bottom">
				<Image 
					className="w-auto h-full"
					src="/img/about/sign.svg"
					width={500}
					height={500}
					alt="UFO"
				/>
				<div className="absolute top-[7%] px-6 text-center">
					<h1 className="font-texas-tango text-2xl/6 text-black tracking-tighter">Who Can Attend?</h1>
					<p className="font-bang-bang text-2xl/6 text-black">
						Everyone is welcome. RowdyHacks is open to all students and beginners no matter your major, skill level, or background. 
					</p>
					<p className="mt-9 md:mt-6 font-bang-bang text-2xl/6 text-black">
						Whether you're a first-time hacker, an experienced developer, or just curious about tech, there's a place for you here.
					</p>
				</div>
			</motion.div>
			{/* Container for Moon and Sign */}
			<motion.div style={{scale: zoomMoon}} className="absolute flex justify-center items-center w-full h-auto bottom-0 z-20 origin-bottom">
				{/* Moon */}
				<Image 
					className="w-full h-auto z-30"
					src="/img/about/moon.svg"
					width={500}
					height={500}
					alt="Moon Background"
				/>
			</motion.div>
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
	
// 	return (
// 		<section
// 			ref={inViewRef}
// 			className="relative flex h-screen w-full"
// 			id="About"
// 		>
// 			<motion.div 
// 				className="absolute flex bottom-0 w-[100%]"
// 			>	
// 				<motion.div 
// 					className="border-4">
// 					<Image
// 						className="absolute h-[20%] w-auto bottom-[25%] right-[15%] border-4"
// 						src={"/img/about/sign.svg"}
// 						alt="Sign"
// 						width={500}
// 						height={500}
// 						unoptimized={true}
// 					/>
// 				</motion.div>
// 				<Image
// 					className="border-4 w-full h-auto"
// 					src={"/img/about/moon.svg"}
// 					alt="Moon"
// 					width={500}
// 					height={500}
// 					unoptimized={true}
// 				/>
// 			</motion.div>
// 			<div className="relative flex justify-center w-full h-full">
// 				<motion.div
// 					className="absolute flex top-0 h-[90%]"
// 					style={{
// 						translateX: useTransform(
// 								scrollYProgress,
// 							[0.0, 0.4, 1],
// 							["-100%", "0%", "0%"]
// 							),
// 						translateY: useTransform(
// 							scrollYProgress,
// 							[0, 0.4, 1],
// 							["20%", "0%", "0%"]
// 						),
// 						scale: useTransform(
// 							scrollYProgress,
// 							[0, 0.4, 1],
// 							[0, 1, 1]
// 						),
// 						x: floatX,
// 						y: floatY
// 					}}
// 				>
// 					<Image
// 						src={"/img/about/ufo.svg"}
// 						alt="UFO"
// 						width={500}
// 						height={500}
// 						unoptimized={true}
// 					/>
// 				</motion.div>
// 			</div>
// 		</section>
// 	);
// }