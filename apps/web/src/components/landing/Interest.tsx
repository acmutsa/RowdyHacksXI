import Image from "next/image";
import { Button } from "../shadcn/ui/button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Interest() {
	// const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll();
	return (
		<section
			className="flex h-[80dvh] w-full"
			// ref={containerRef}
			id="Interest"
		>
			<div className="z-40 w-full">
				<div className="relative z-40 text-center">
					<motion.div
						style={{
							opacity: useTransform(
								scrollYProgress,
								[0, 0.9, 1],
								[0, 0.25, 1],
							),
						}}
					>
						<h2 className="font-sans text-8xl font-bold uppercase text-white">
							Join Us
						</h2>
						<p className="text-3xl font-bold text-white">
							Fall '25 @ UTSA's San Pedro I
						</p>
						<Link href="https://tally.so/r/3qXd25">
							<Button size="lg" className="mt-10 text-xl">
								Interest Form
							</Button>
						</Link>
					</motion.div>

					<motion.div
						className="absolute left-0 right-0 -z-10"
						style={{
							translateX: useTransform(
								scrollYProgress,
								[0, 0.5],
								[1000, 0],
							),
							translateY: useTransform(
								scrollYProgress,
								[0, 0.5],
								["0%", "-75%"],
							),
						}}
					>
						<Image
							src="/img/ufo3d.png"
							alt="JOIN US! Fall '25 @ UTSA's San Pedro I"
							className="mx-auto w-full max-w-7xl"
							width={1000}
							height={1000}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
