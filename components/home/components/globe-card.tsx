import { Globe } from "@/components/special/globe";

export default function GlobeCard() {
  return (
    <div className="border rounded-sm bg-background p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Worldwide click tracking</h3>
        <p className=" text-base font-normal text-muted-foreground">
          Track where your clicks are coming from in real time and across the
          globe. Get insights into link performance by country, region, and
          more.
        </p>
      </div>

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden border rounded-sm bg-background mt-auto">
        <div className="w-full h-full bg-transparent mask-b-from-30% mask-b-to-100%">
          <div className="absolute inset-0 h-full w-full bg-transparent dark:bg-[linear-gradient(to_right,#4f4f4f50_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f50_1px,transparent_1px)] bg-[linear-gradient(to_right,#4f4f4f14_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f14_1px,transparent_1px)] bg-[size:2rem_2rem] mask-b-to-100% transition-opacity duration-500 z-1 opacity-50" />
          <Globe className="z-10 " />
        </div>
      </div>
    </div>
  );
}
