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
								<div
									className="
										absolute bottom-[20%] right-[2.5%] w-[400px] h-[400px] rotate-6 p-5
										sm:bottom-[20%] sm:right-[2.5%]
										md:bottom-[20%] md:right-[2.5%]
										lg:bottom-[20%] lg:right-[2.5%]
										/* mobile overrides */
										max-md:inset-0 max-md:m-auto max-md:rotate-0 max-md:w-[250px] max-md:h-[250px] max-md:p-0 max-md:translate-y-[-60%]
									"
								>
									<Image
										className="absolute inset-0 z-20 w-full h-full object-contain"
										src="/img/work/billboard_new.png"
										alt="Sign"
										width={400}
										height={400}
										unoptimized
									/>
									<Image
										className="absolute bottom-[-20%] right-[27%] z-20 w-[50%] h-[50%] -rotate-6"
										src="/img/hero/rock.png"
										alt="rock"
										width={100}
										height={100}
										unoptimized
									/>
									<div className="mt-8 relative flex flex-col items-center justify-center p-5">
										<h1 className="z-30 text-center font-texas-tango text-black text-[1.5rem] md:text-[2rem]">
											Presented By
										</h1>
										<Image
											src={`img/sponsors/swivel.svg`}
											alt={"Swivel Logo"}
											width={200}
											height={200}
											className="mt-2 w-auto h-auto object-contain z-30"
											unoptimized
										/>
									</div>
								</div>

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
										src={"/img/hero/HeroTitleFixed.png"}
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
