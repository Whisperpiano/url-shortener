import { OrbitingCircles } from "@/components/special/orbiting-circles";
import { OrbitIcon } from "./orbiting-icon";

import {
  insideIcons,
  middleIcons,
  outsideIcons,
} from "../utils/home-constants";

import NextjsIcon from "@/lib/assets/icons/nextjs.svg";

export default function StackCard() {
  return (
    <article className="border rounded-sm bg-background p-6">
      <header className="mb-6 flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Built with modern tools</h3>
        <p className="text-base text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300 ">
          Shortleap runs on a powerful and efficient tech stack, including
          Next.js, Turso, Prisma, and more. Built for speed, scalability, and
          developer happiness.
        </p>
      </header>

      <section className="relative flex w-full h-[500px] flex-col items-center justify-center overflow-hidden border rounded-sm bg-background">
        {/* Background */}
        <div className="absolute inset-0 h-full w-full bg-transparent dark:bg-[linear-gradient(to_right,#4f4f4f50_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f50_1px,transparent_1px)] bg-[linear-gradient(to_right,#4f4f4f14_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f14_1px,transparent_1px)] bg-[size:2rem_2rem]  mask-b-to-100% transition-opacity duration-500 group-hover:opacity-80 z-1 opacity-50" />
        <div className="absolute inset-0 h-full w-full z-20 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        {/* Main icon */}
        <div className=" size-12 flex items-center justify-center translate-y-17 animate-pulse">
          <NextjsIcon />
        </div>

        {/* Outside icons */}
        <div className="w-[460px] h-[460px] pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3">
          <div className="size-full rounded-full border border-[rgba(0,0,0,0.07)] dark:border-[rgba(249,250,251,0.07)] bg-gradient-to-b from-[rgba(0,0,0,0.05)] via-[rgba(249,250,251,0.00)] dark:from-[rgba(249,250,251,0.06)] dark:via-[rgba(249,250,251,0.02)]"></div>
        </div>

        <OrbitingCircles
          radius={230}
          speed={0.3}
          path={false}
          className="translate-y-20"
        >
          {outsideIcons.map((icon) => (
            <OrbitIcon
              key={icon.name}
              darkColor={icon.dark}
              lightColor={icon.light}
            >
              <icon.icon />
            </OrbitIcon>
          ))}
        </OrbitingCircles>

        {/* Middle icons */}
        <div className="w-[320px] h-[320px] pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(28%)]">
          <div className="size-full rounded-full border border-[rgba(0,0,0,0.07)] dark:border-[rgba(249,250,251,0.07)] bg-gradient-to-b from-[rgba(0,0,0,0.05)] via-[rgba(249,250,251,0.00)] dark:from-[rgba(249,250,251,0.04)] dark:via-[rgba(249,250,251,0.02)]"></div>
        </div>

        <OrbitingCircles
          radius={159}
          speed={0.6}
          path={false}
          reverse
          className="translate-y-18"
        >
          {middleIcons.map((icon) => (
            <OrbitIcon
              key={icon.name}
              darkColor={icon.dark}
              lightColor={icon.light}
            >
              <icon.icon />
            </OrbitIcon>
          ))}
        </OrbitingCircles>
        <div className="w-[190px] h-[190px] pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/8">
          <div className="size-full rounded-full border border-[rgba(0,0,0,0.07)] dark:border-[rgba(249,250,251,0.07)] bg-gradient-to-b from-[rgba(0,0,0,0.05)] via-[rgba(249,250,251,0.00)] dark:from-[rgba(249,250,251,0.06)] dark:via-[rgba(249,250,251,0.02)]"></div>
        </div>

        {/* Inside icons */}
        <OrbitingCircles
          radius={90}
          speed={0.6}
          path={false}
          className="translate-y-18"
        >
          {insideIcons.map((icon) => (
            <OrbitIcon
              key={icon.name}
              darkColor={icon.dark}
              lightColor={icon.light}
            >
              <icon.icon />
            </OrbitIcon>
          ))}
        </OrbitingCircles>
      </section>
    </article>
  );
}
