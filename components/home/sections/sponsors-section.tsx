import { HorizontalBorder, VerticalBorder } from "@/components/ui/border";
import Sponsor1 from "@/lib/assets/sponsors/logoipsum-1.svg";
import Sponsor2 from "@/lib/assets/sponsors/logoipsum-2.svg";
import Sponsor3 from "@/lib/assets/sponsors/logoipsum-3.svg";
import Sponsor4 from "@/lib/assets/sponsors/logoipsum-4.svg";
import Sponsor5 from "@/lib/assets/sponsors/logoipsum-5.svg";
import Sponsor6 from "@/lib/assets/sponsors/logoipsum-6.svg";
import Sponsor7 from "@/lib/assets/sponsors/logoipsum-7.svg";
import Sponsor8 from "@/lib/assets/sponsors/logoipsum-8.svg";
import { ArrowRight } from "lucide-react";
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
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor1 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor2 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor3 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor4 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor5 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor6 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor7 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
          <Link
            className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-4 "
            href="https://logoipsum.com/"
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              <Sponsor8 className="w-32 h-auto " />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </section>
      </article>
    </HorizontalBorder>
  );
}
