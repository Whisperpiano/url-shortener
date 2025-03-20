import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 min-h-screen">
        <h2 className="font-mono font-semibold text-3xl ">
          Shorten your links{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            fast
          </span>
          <span> and </span>
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
            easy
          </span>
        </h2>
        <p>
          Transform long, messy URLs into short and shareable links in seconds.
          Start simplifying your links today!
        </p>
        <Button variant={"default"} className="cursor-pointer group">
          Get started
          <ArrowRight className="group-hover:translate-x-0.5 transition-transform duration-300" />
        </Button>
      </main>
    </>
  );
}
