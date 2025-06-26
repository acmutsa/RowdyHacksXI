"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";

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
	// End of Scroll Debug Area
	
	return (
		<section
			ref={inViewRef}
			className="flex min-h-screen w-full border-y-2 border-muted-foreground overflow-hidden"
			id="About"
		>
			<motion.div
				className="night relative flex h-screen w-full flex-col"
				style={{
					backgroundSize: useTransform(
						scrollPage,
						[0, 1],
						["100%", "250%"],
					),
				}}
			>
				<motion.div 
					className="absolute flex top-[75%] scale-x-[250%] w-[100%] aspect-square bg-gray-500 rounded-full"
				>	
				</motion.div>
				<motion.div
					className="relative flex top-[75%] w-full h-[25%]"
				>
					<div className="relative flex justify-center w-[25%]">
						<Image
							className="absolute left-[50%] bottom-[70%] w-[60%] h-[100%] rotate-[6.2rad]"
							src={"/img/saloon.png"}
							alt="Saloon"
							width={100}
							height={650}
							unoptimized={true}
						/>
					</div>
					<div className="relative flex justify-center w-[50%]">
						<Image
							className="absolute bottom-[65%] w-[60%]"
							src={"/img/ufo.svg"}
							alt="UFO"
							width={431}
							height={431}
							unoptimized={true}
						/>
					</div>
					<div className="relative flex justify-center w-[25%]">
						<Image
							className="relative bottom-[20%] right-[50%] w-[20%] h-[55%] rotate-[6.2rad]"
							alt="Cactus1"
							src={"/img/cactus1.png"}
							width={100}
							height={650}
							unoptimized={true}
						/>
						<Image
							className="relative bottom-[25%] right-[50%] w-[20%] h-[55%] rotate-[6.4rad]"
							alt="Cactus2"
							src={"/img/cactus1.png"}
							width={100}
							height={650}
							unoptimized={true}
						/>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}

	{/* <motion.div
						className="relative w-2/3 h-1/3 flex flex-col items-center justify-center border-4"
						style={{
							scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.5]),
						}}
					>
						<h1 className="text-center text-4xl font-black">
							About Us
						</h1>
						<h3 className="px-1 text-center text-sm font-bold">
						RowdyHacks is UTSA's annual hackathon, 
						proudly hosted by the Association for Computing Machinery (ACM) at UTSA. 
						It's a weekend-long event where students, tech enthusiasts, 
						and creatives from all backgrounds come together to collaborate, 
						innovate, and build real-world projects — all in just 24 hours.
						</h3>
						<h1 className="mt-8 text-center text-4xl font-black">
							Who Can Attend?
						</h1>
						<h3 className="p-1 text-center text-sm font-bold">
						Everyone is welcome. RowdyHacks is open to all students and beginners — no matter
						your major, skill level, or background. 
						Whether you're a first-time hacker, an experienced developer, 
						or just curious about tech, there's a place for you here.
						</h3>
					</motion.div> */}