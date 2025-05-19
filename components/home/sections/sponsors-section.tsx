import { HorizontalBorder, VerticalBorder } from "@/components/ui/border";
import { ArrowRight } from "lucide-react";
import { sponsors } from "../utils/home-constants";

import Link from "next/link";

export default function SponsorsSection() {
  return (
    <HorizontalBorder>
      <article id="sponsors">
        <VerticalBorder>
          <header className="py-32 px-6 border-b">
            <h2 className="flex items-center justify-center gap-2.5 text-5xl font-medium tracking-tighter pb-4 ">
              You are in good
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                company
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg text-center">
              Designed with scalability and transparency in mind. Want to
              support the project or become a sponsor?
            </p>
          </header>
        </VerticalBorder>

        <section className="grid grid-cols-4">
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.id}
              className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
              href={sponsor.href}
              target="_blank"
            >
              <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
                <sponsor.logo className="w-32 h-auto " />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
                <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  Learn More <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </section>
      </article>
    </HorizontalBorder>
  );
}
