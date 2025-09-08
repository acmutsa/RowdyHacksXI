"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, useMotionValue, useSpring, animate } from "framer-motion";

export default function About() {
	const{ scrollYProgress: scrollPage } = useScroll();

	// Scroll Debug Area
	const inViewRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(inViewRef, {
		amount: "some",
	});
	const { scrollYProgress } = useScroll({
		target: inViewRef,
		offset: ["start end", "end start"]
	});
	useMotionValueEvent(scrollYProgress, "change",
		(latest) => {
			console.log(latest);
		}
	);
	useEffect(() => {
		console.log(`The section ${isInView ? "is" : "is not"} in view`);
	}, [isInView]);

	// Figure 8 UFO
	const oscillation = useMotionValue(0);
	useEffect(() => {
		const controls = animate(oscillation, 2 * Math.PI, {
			repeat: Infinity,
			duration: 4,
			ease: "linear",
		});
		return controls.stop;
	}, []);
	const floatX = useTransform(oscillation, v => 15 * Math.sin(v));
	const floatY = useTransform(oscillation, v => 8 * Math.sin(2 * v));
	
	return (
		<section
			ref={inViewRef}
			className="relative flex h-screen w-full"
			id="About"
		>
			<motion.div 
				className="absolute flex bottom-0 w-[100%]"
			>	
				<motion.div 
					className="">
					<Image
						className="absolute h-[20%] w-auto bottom-[25%] right-[15%]"
						src={"/img/about/sign.svg"}
						alt="Sign"
						width={500}
						height={500}
						unoptimized={true}
					/>
				</motion.div>
				<Image
					className=" w-full h-auto"
					src={"/img/about/moon.svg"}
					alt="Moon"
					width={500}
					height={500}
					unoptimized={true}
				/>
			</motion.div>
			<div className="relative flex justify-center w-full h-full">
				<motion.div
					className="absolute flex top-0 h-[90%]"
					style={{
						translateX: useTransform(
								scrollYProgress,
							[0.0, 0.4, 1],
							["-100%", "0%", "0%"]
							),
						translateY: useTransform(
							scrollYProgress,
							[0, 0.4, 1],
							["20%", "0%", "0%"]
						),
						scale: useTransform(
							scrollYProgress,
							[0, 0.4, 1],
							[0, 1, 1]
						),
						x: floatX,
						y: floatY
					}}
				>
					<Image
						src={"/img/about/ufo.svg"}
						alt="UFO"
						width={500}
						height={500}
						unoptimized={true}
					/>
				</motion.div>
			</div>
		</section>
	);
}