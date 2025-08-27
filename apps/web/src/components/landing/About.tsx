import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
	return (
		<section className="relative flex justify-center w-full h-screen border-4 border-white">
			{/* UFO and Text Container */}
			<motion.div className="absolute flex justify-center items-center w-auto h-[80%] top-0 border-4 border-red-500 z-40">
				{/* UFO */}
				<Image
					className="w-auto h-full"
					src="/img/about/ufo_wo_text.svg"
					width={500}
					height={500}
					alt="UFO"
				/>
				{/* Text */}
				<div className="absolute bottom-0 px-10 text-center">
					<h1 className="pb-2 text-4xl font-bold text-black">About Us</h1>
					<p className="text-lg md:text-lg/6 font-[500] text-black tracking-tight">
						RowdyHacks is UTSA's annual hackathon, hosted by the Association for Computing Machinery (ACM) at UTSA.
						It's a weekend-long event where students, tech enthusiasts, and creative minds from all backgrounds come
						together to collaborate, innovate, and build real-world projects in 24 hours.
					</p>
				</div>
			</motion.div>
			{/* Container for Moon and Sign */}
			<motion.div className="absolute flex justify-center items-center w-full h-auto bottom-0 border-4 border-blue-500 z-10">
				{/* Moon */}
				<Image 
					className="w-full h-auto z-20"
					src="/img/about/moon.svg"
					width={500}
					height={500}
					alt="Moon Background"
				/>
				{/* Sign */}
				<Image 
					className="absolute w-[8%] h-auto border-4 z-30"
					src="/img/about/sign.svg"
					width={500}
					height={500}
					alt="UFO"
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