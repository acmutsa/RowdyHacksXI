import Image from "next/image";

import {
	motion,
	useScroll,
	useTransform,
	useInView,
	useMotionValueEvent,
	useMotionValue,
	useSpring,
	animate,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
	const { scrollYProgress } = useScroll();

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
	const floatX = useTransform(oscillation, (v) => 15 * Math.sin(v));
	const floatY = useTransform(oscillation, (v) => 8 * Math.sin(2 * v));

	return (
		<section className="h-screen w-full overflow-hidden">
			<div className="relative h-screen w-full">
				<div className="absolute bottom-0 z-20 w-screen">
					<motion.div
						style={{
							translateY: useTransform(
								scrollYProgress,
								[0, 1],
								[0, 10000],
							),
						}}
					>
						<Image
							className="z-30 w-full"
							src={"/img/hero/sands.png"}
							alt="Sands"
							width={1000}
							height={1000}
							unoptimized={true}
						/>
						<Image
							className="absolute bottom-[20%] left-[20%] z-20 w-[100px]"
							src={"/img/hero/tumbleweed.svg"}
							alt="Tumbleweed"
							width={100}
							height={100}
							unoptimized={true}
						/>
						<Image
							className="absolute bottom-[15%] left-[60%] z-20 w-[80px]"
							src={"/img/hero/tumbleweed.svg"}
							alt="Tumbleweed"
							width={80}
							height={80}
							unoptimized={true}
						/>
					</motion.div>
				</div>
				<motion.div
					className="absolute right-[10%] top-[10%] z-20 w-[120px]"
					style={{
						translateX: useTransform(
							scrollYProgress,
							[0, 1],
							[0, 250],
						),
						rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
						x: floatX,
						y: floatY,
					}}
				>
					<Image
						className="absolute right-[10%] top-[10%] z-20 w-[120px]"
						src={"/img/hero/cow.svg"}
						alt="Floating Cow"
						width={120}
						height={120}
						unoptimized={true}
					/>
				</motion.div>
				<motion.div
					className="absolute left-1/2 top-1/2 z-30 w-full max-w-[1200px]"
					style={{
						translateX: useTransform(
							scrollYProgress,
							[0, 1],
							["-50%", "-5000%"],
						),
						translateY: useTransform(
							scrollYProgress,
							[0, 1],
							["-60%", "-80%"],
						),
						scale: useTransform(scrollYProgress, [0, 1], [1, 10]),
						rotate: useTransform(
							scrollYProgress,
							[0, 1],
							[0, -180],
						),
					}}
				>
					<div className="relative mx-auto">
						<Image
							src={"/img/hero/hero-title.svg"}
							alt={"Rowdy Hacks Coming Fall '25"}
							className="w-full"
							width={1000}
							height={1000}
							unoptimized={true}
						/>
						<Image
							src={"/img/hero/cactus.svg"}
							className="title-cactus absolute bottom-0 left-0 z-30 w-fit -translate-x-1/2"
							alt={"Cactus"}
							width={1000}
							height={1000}
							unoptimized={true}
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
