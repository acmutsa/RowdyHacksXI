"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import Hero from "@/components/landing/Hero";

import About from "@/components/landing/About";

import Partners from "@/components/landing/Partners";
import Footer from "@/components/landing/Footer";

import WorkWithUs from "@/components/landing/WorkWithUs";

import Interest from "@/components/landing/Interest";

function sawtoothWave(t: number, amplitude = 1, frequency = 1, phase = 0) {
	// Calculate the period of the wave
	const period = 1 / frequency;

	// Adjust time with the phase shift
	const adjustedTime = (t + phase / (2 * Math.PI * frequency)) % period;

	// Compute the sawtooth wave value and add 100 to ensure minimum value
	return amplitude * (2 * (adjustedTime / period) - 1);
}

// function sineWave(t: number, amplitude = 1, frequency = 1, phase = 0) {
// 	return amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
// }

function starOpacity(t: number, frequency = 1, phase = 0) {
	const period = 1 / frequency;
	const adjustedTime = (t + phase / (2 * Math.PI * frequency)) % period;

	// Quick fade in at the start (first 10% of the period)
	if (adjustedTime < period * 0.1) {
		return adjustedTime / (period * 0.1);
	}
	// Quick fade out at the end (last 10% of the period)
	else if (adjustedTime > period * 0.9) {
		return 1 - (adjustedTime - period * 0.9) / (period * 0.1);
	}
	// Full opacity in the middle
	return 1;
}

export default function Landing() {
	const { scrollYProgress } = useScroll();
	return (
		<div className="night relative overflow-y-hidden">
			<motion.div
				className="star-bg fixed left-0 top-0 z-0 h-full w-full bg-transparent"
				style={{
					backgroundSize: useTransform(
						() =>
							`${sawtoothWave(scrollYProgress.get(), 25, 5, 1) + 50}%`,
					),
					opacity: useTransform(
						() =>
							`${starOpacity(scrollYProgress.get(), 3, 11) * 80}%`,
					),
				}}
			/>
			{/* <motion.div
				className="star-bg fixed left-0 top-0 z-0 h-full w-full bg-transparent"
				style={{
					backgroundSize: useTransform(
						() =>
							`${sawtoothWave(scrollYProgress.get(), 50, 11, 13) + 70}%`,
					),
					opacity: useTransform(
						() =>
							`${starOpacity(scrollYProgress.get(), 5, 17) * 100}%`,
					),
				}}
			/> */}
			<motion.div
				className="star-bg fixed left-0 top-0 z-0 h-full w-full bg-transparent"
				style={{
					backgroundSize: useTransform(
						() =>
							`${sawtoothWave(scrollYProgress.get(), 25, 17, 5) + 50}%`,
					),
					opacity: useTransform(
						() =>
							`${starOpacity(scrollYProgress.get(), 7, 10) * 80}%`,
					),
				}}
			/>
			<Hero />
			<Interest />
			{/* <About />
			<Partners />
			<WorkWithUs />
			<Footer /> */}
		</div>
	);
}
