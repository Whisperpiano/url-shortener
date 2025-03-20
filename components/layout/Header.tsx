import { cn } from "@/lib/utils";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { GithubLogo } from "../icons/GithubLogo";

export default function Header() {
  return (
    <header className="max-w-7xl mx-auto p-4 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <h1 className="font-mono tracking-widest font-medium text-base">
          Shortly
        </h1>
      </div>
      <div>
        <Link
          href="https://github.com/Whisperpiano/url-shortener"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          <GithubLogo />
        </Link>
      </div>
    </header>
  );
}
