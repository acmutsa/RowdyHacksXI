import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
	motion,
	useScroll,
	useTransform,
	useMotionValue,
	useInView,
	animate,
} from "framer-motion";

export default function Hero() {
	const secRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: secRef,
		offset: ["start start", "end center"],
	});

	const translateYSand = useTransform(
		scrollYProgress,
		[0, 0.9],
		["0%", "200%"],
	);

	// Figure 8 COW
	const oscillation = useMotionValue(0);
	const isInView = useInView(secRef);
	useEffect(() => {
		let controls: ReturnType<typeof animate> | undefined;
		if (isInView) {
			controls = animate(oscillation, 2 * Math.PI, {
				repeat: Infinity,
				duration: 4,
				ease: "linear",
			});
		} else {
			oscillation.set(0);
			controls?.stop();
		}
		return () => controls?.stop();
	}, [isInView, oscillation]);
	const floatX = useTransform(oscillation, (v) => 15 * Math.sin(v));
	const floatY = useTransform(oscillation, (v) => 8 * Math.sin(2 * v));

	return (
		<section className="relative min-h-[800px] w-full min-w-[375px]">
			<div
				ref={secRef}
				className="relative flex h-[150vh] w-full flex-col justify-end"
			>
				<div className="sticky bottom-0 min-h-screen w-full">
					<div className="relative h-full w-full overflow-hidden">
						<div className="relative flex h-full w-full flex-col items-center justify-center">
							<motion.div
								className="absolute bottom-0"
								style={{ translateY: translateYSand }}
							>
								<Image
									className="w-full"
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
							<motion.div
								className="absolute right-[10%] top-[10%] z-20 w-[120px]"
								style={{
									translateX: useTransform(
										scrollYProgress,
										[0, 1],
										["0%", "150%"],
									),
									rotate: useTransform(
										scrollYProgress,
										[0, 1],
										[0, 360],
									),
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
								className="absolute z-30 w-full max-w-[1000px]"
								style={{
									translateX: useTransform(
										scrollYProgress,
										[0, 1],
										["0", "-300%"],
									),
									translateY: useTransform(
										scrollYProgress,
										[0, 1],
										["0%", "-100%"],
									),
									scale: useTransform(
										scrollYProgress,
										[0, 1],
										[1, 2],
									),
									rotate: useTransform(
										scrollYProgress,
										[0, 1],
										[0, -180],
									),
								}}
							>
								<div className="relative mx-auto">
									<Image
										src={"/img/hero/HeroTitle.svg"}
										alt={"Rowdy Hacks hero title"}
										className="w-full  "
										width={1000}
										height={1000}
										unoptimized={true}
									/>
									<Image
										src={"/img/hero/cactus.svg"}
										className="title-cactus absolute -bottom-6 md:-bottom-6 left-0 z-30 w-fit -translate-x-1/2"
										alt={"Cactus"}
										width={1000}
										height={1000}
										unoptimized={true}
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
