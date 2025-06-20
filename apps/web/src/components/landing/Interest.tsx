import Image from "next/image";
import { Button } from "../shadcn/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Interest() {
	// const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll();
	return (
		<section
			className="flex min-h-screen w-full items-center justify-center"
			// ref={containerRef}
			id="Interest"
		>
			<motion.div
				className="relative flex w-3/4 flex-col items-center justify-center"
				style={{
					translateX: useTransform(
						scrollYProgress,
						[0, 1],
						["100%", "0%"],
					),
					translateY: useTransform(
						scrollYProgress,
						[0, 1],
						["100%", "0%"],
					),
					rotate: useTransform(scrollYProgress, [0, 1], [-15, 5]),
					scale: useTransform(scrollYProgress, [0, 1], [1, 1.15]),
				}}
			>
				<img
					src="/img/rh-ufo.svg"
					alt="JOIN US! Fall '25 @ UTSA's San Pedro I"
					className="mx-auto w-1/2"
					width={1000}
					height={1000}
				/>
				<Link href="https://tally.so/r/3qXd25">
					<Button
						size="lg"
						className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 bg-green-400 text-xl text-black shadow shadow-green-100 hover:bg-green-300"
					>
						Join Us!
					</Button>
				</Link>
			</motion.div>
		</section>
	);
}
