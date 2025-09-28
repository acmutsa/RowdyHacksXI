"use client";

import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../shadcn/ui/accordion";
import type { PropsWithChildren } from "react";

interface Props {
  title: string | Readonly<string>;
}

export default function FAQItem({ title, children }: PropsWithChildren<Props>) {
  return (
    <AccordionItem
      className="w-[100%] items-center self-start justify-self-center rounded-lg border-4 border-[#E6B84E] bg-[#FFFAF0] px-6 text-[#1F2937] transition-transform hover:bg-[#FFF1D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC94A] lg:data-[state=closed]:hover:scale-105 data-[state=open]:bg-[#FFF1D6]"
      value={`item-${title}`}
    >
      <AccordionTrigger className="text-left font-oswald text-2xl font-bold sm:text-3xl text-[#111827]">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <p className="font-mono text-xl text-[#374151]">{children}</p>
      </AccordionContent>
    </AccordionItem>
  );
}