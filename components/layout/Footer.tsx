import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { buttonVariants } from "../ui/button";
import { Mail } from "lucide-react";
import { HorizontalBorder } from "../ui/border";

export default function Footer() {
  return (
    <footer className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px] py-4 md:py-0">
      <HorizontalBorder>
        <div className="shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 antialiased">
          <p className="mb-4 text-sm text-center text-muted-foreground sm:mb-0">
            &copy; 2025 Shortleap Inc.
          </p>

          <div className="flex justify-center items-center space-x-4">
            <Link
              href="https://github.com/Whisperpiano"
              data-tooltip-target="tooltip-facebook"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "group"
              )}
              target="_blank"
            >
              <FaGithub className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="sr-only">Github</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/jes%C3%BAs-alberola-herrero-896b61189/"
              data-tooltip-target="tooltip-facebook"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "group"
              )}
              target="_blank"
            >
              <FaLinkedin className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:jesusalberola90@gmail.com"
              data-tooltip-target="tooltip-facebook"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "group"
              )}
              target="_blank"
            >
              <Mail className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="sr-only">Mail</span>
            </Link>
          </div>
        </div>
      </HorizontalBorder>
    </footer>
  );
}
