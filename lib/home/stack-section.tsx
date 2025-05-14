import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Icons } from "./globe-section";
import { Globe } from "@/components/magicui/globe";

export default function StackSection() {
  return (
    <section className="grid grid-cols-[0px_1fr_0px]">
      <div className="border-r"></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 bg-muted-foreground/5 ">
        <div className="border rounded-sm bg-background p-4">
          <div className="mb-4">
            <span className="text-xl font-medium ">
              Built with modern tools
            </span>
            <p className=" text-base font-normal text-muted-foreground">
              Shortleap runs on a powerful and efficient tech stack, including
              Next.js, Turso, Prisma, and more. Built for speed, scalability,
              and developer happiness.
            </p>
          </div>

          <div className="relative flex w-full h-[500px] flex-col items-center justify-center overflow-hidden border rounded-sm bg-background ">
            <div className=" size-10 flex items-center justify-center">
              <Icons.nextjs />
            </div>

            <div className="w-[480px] h-[480px] pointer-events-none absolute inset-0 m-auto">
              <div className="size-full rounded-full border border-[0,0,0,0.07] dark:border-[rgba(249,250,251,0.07)] bg-gradient-to-b from-[rgba(0,0,0,0.05)] from-0% via-[rgba(249,250,251,0.00)] via-54.76% dark:bg-gradient-to-b dark:from-[rgba(249,250,251,0.03)] dark:from-0% dark:via-[rgba(249,250,251,0.00)] dark:via-54.76%"></div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>

            <OrbitingCircles
              radius={240}
              iconSize={45}
              speed={0.3}
              path={false}
            >
              <Icons.nextjs />
              <Icons.react />
              <Icons.typescript />
              <Icons.tailwind />
              <Icons.framer />
            </OrbitingCircles>
            <div className="w-[360px] h-[360px] pointer-events-none absolute inset-0 m-auto">
              <div className="size-full rounded-full border border-[0,0,0,0.07] dark:border-[rgba(249,250,251,0.07)] bg-gradient-to-b from-[rgba(0,0,0,0.05)] from-0% via-[rgba(249,250,251,0.00)] via-54.76% dark:bg-gradient-to-b dark:from-[rgba(249,250,251,0.03)] dark:from-0% dark:via-[rgba(249,250,251,0.00)] dark:via-54.76%"></div>
            </div>
            <OrbitingCircles
              radius={180}
              iconSize={40}
              speed={0.6}
              path={false}
              reverse
            >
              <Icons.drizzle />
              <Icons.turso />
              <Icons.cloudinary />
              <Icons.authjs />
              <Icons.zod />
            </OrbitingCircles>
            <div className="w-[240px] h-[240px] pointer-events-none absolute inset-0 m-auto">
              <div className="size-full rounded-full border border-[0,0,0,0.07] dark:border-[rgba(249,250,251,0.07)] bg-gradient-to-b from-[rgba(0,0,0,0.05)] from-0% via-[rgba(249,250,251,0.00)] via-54.76% dark:bg-gradient-to-b dark:from-[rgba(249,250,251,0.03)] dark:from-0% dark:via-[rgba(249,250,251,0.00)] dark:via-54.76%"></div>
            </div>
            <OrbitingCircles
              radius={120}
              iconSize={40}
              speed={0.6}
              path={false}
              reverse
            >
              <Icons.drizzle />
              <Icons.turso />
              <Icons.cloudinary />
              <Icons.authjs />
              <Icons.zod />
            </OrbitingCircles>
          </div>
        </div>
        <div className="border rounded-sm bg-background p-4">
          <div className="mb-4">
            <span className="text-xl font-medium ">
              Worldwide click tracking
            </span>
            <p className=" text-base font-normal text-muted-foreground">
              Track where your clicks are coming from in real time and across
              the globe. Get insights into link performance by country, region,
              and more.
            </p>
          </div>

          <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden border rounded-sm bg-background">
            {/* <div className="absolute inset-0 aspect-square rounded-full w-[320px] bg-gradient-to-br from-foreground/5 via-transparent to-transparent m-auto" /> */}
            <Globe />
          </div>
        </div>
      </div>
      <div className="border-l"></div>
    </section>
  );
}
