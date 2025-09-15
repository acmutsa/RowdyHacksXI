"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";

export default function Partners() {


	return (
		<section className="relative flex min-h-screen w-full items-center justify-center">
			<div className="absolute top-0 w-full h-auto"> 
				<Image 
					className="w-full h-[100px] object-cover overflow-visible"
					src="/img/about/edge.svg"
					width={500}
					height={500}
					alt="Sign"
				/>
			</div>
		</section>
	);
}
