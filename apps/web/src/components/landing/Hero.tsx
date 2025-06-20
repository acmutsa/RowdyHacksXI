import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcn/ui/button";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
	const { scrollYProgress } = useScroll();
	return (
		<section className="h-screen w-screen overflow-hidden">
			<div className="relative h-screen w-full overflow-hidden">
				<div className="absolute bottom-0 z-20 w-screen overflow-y-hidden">
					<motion.div
						style={{
							translateY: useTransform(
								scrollYProgress,
								[0, 1],
								[0, 20000],
							),
						}}
					>
						<Image
							className="w-full"
							src={"/img/sands.png"}
							alt="Sands"
							width={1000}
							height={1000}
							unoptimized={true}
						/>
						<Image
							className="absolute bottom-[20%] left-[20%] z-20 w-[100px]"
							src={"/img/tumbleweed.svg"}
							alt="Tumbleweed"
							width={100}
							height={100}
							unoptimized={true}
						/>
						<Image
							className="absolute bottom-[15%] left-[60%] z-20 w-[80px]"
							src={"/img/tumbleweed.svg"}
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
							[0, 1000],
						),
						rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
					}}
				>
					<Image
						className="absolute right-[10%] top-[10%] z-20 w-[120px]"
						src={"/img/cow.svg"}
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
							["-50%", "-1000%"],
						),
						translateY: useTransform(
							scrollYProgress,
							[0, 1],
							["-60%", "-100%"],
						),
						scale: useTransform(scrollYProgress, [0, 1], [1, 10]),
						rotate: useTransform(
							scrollYProgress,
							[0, 1],
							[0, -180],
						),
					}}
				>
					<Image
						src={"/img/hero-title.svg"}
						alt={"Rowdy Hacks Coming Fall '25"}
						className="mx-auto"
						width={1000}
						height={1000}
						unoptimized={true}
					/>
				</motion.div>
			</div>
		</section>
	);
}
