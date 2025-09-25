"use client";

import CreatedWithHackkit from "@/components/landing/CreatedWithHackkit";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Github } from "lucide-react";
import FooterLinks, { footerSections } from "./FooterLinks";

export default function Footer() {
	
	return (
		<>
			<footer className="relative bottom-0 bg-[#3B3486] min-h-[25vh] w-full items-center justify-center border-muted-foreground p-1 py-8 sm:p-8 md:px-10">
				<div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 md:justify-items-center lg:grid-cols-5 lg:justify-items-start">
					<div className="col-span-2 row-span-1 flex items-center justify-self-center font-black sm:row-span-3 lg:row-span-1 lg:justify-self-start">
						<Image
							className="w-20 sm:w-28"
							src="/img/logo/rhxi-logo.png"
							alt="RowdyHacks Logo"
							width={100}
							height={50}
						/>
					</div>
					{footerSections.map((section) => (
						<FooterLinks
						key={section.title}
						title={section.title}
						data={section.data}
						/>
					))}
					<div className="col-span-2 flex w-full items-start justify-between lg:col-span-5 -mt-6 sm:-mt-8">
						{/* HackKit on the left */}
						<div className="justify-self-start">
							<CreatedWithHackkit />
						</div>

						{/* Social bar on the right */}
						<div className="flex items-center gap-x-2 rounded-lg border-black bg-[#222222] py-[6px] pl-[7px] pr-4 min-h-[48px]">
							<Link href="https://twitter.com/rowdyhacks/">
							<Twitter className="invert dark:invert-0" />
							</Link>
							<Link href="https://www.instagram.com/rowdyhacks/">
							<Instagram className="invert dark:invert-0" />
							</Link>
							<Link href="https://www.facebook.com/UTSA.ACM">
							<Facebook className="invert dark:invert-0" />
							</Link>
							<Link href="https://github.com/acmutsa/RowdyHacksX">
							<Github className="invert dark:invert-0" />
							</Link>
							<Link href="https://go.rowdyhacks.org/discord">
							<Image
								className="select-none"
								src="/img/discord_icon.svg"
								alt="Discord logo"
								width={20}
								height={20}
							/>
							</Link>
						</div>
					</div>

					<p className=" col-span-2 self-center justify-self-center text-center font-mono text-xs text-white-500 sm:col-start-2 md:py-0 lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:w-11/12">
						Made with &lt;/&gt; &amp; ♥ @ RowdyHacks
						<br />© RowdyHacks &amp; Association of Computing Machinery
						at UTSA 2024. All Rights Reserved.
					</p>

				</div>
			</footer>
		</>
	);
}
