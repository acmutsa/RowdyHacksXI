import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";

import About from "@/components/landing/About";

import Partners from "@/components/landing/Partners";
import Footer from "@/components/landing/Footer";
import MLHBadge from "@/components/landing/MLHBadge";

import { Oswald } from "next/font/google";
import WorkWithUs from "@/components/landing/WorkWithUs";

import Landing from "./Landing";

const oswald = Oswald({
	variable: "--font-oswald",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<div className={`${oswald.variable} w-full h-[100vh] min-w-[375px] min-h-[800px]`}>
			<Navbar />
			<MLHBadge />
			<main className="relative bg-transparent">
				<Landing />
			</main>
		</div>
	);
}

export const runtime = "edge";
export const revalidate = 30;