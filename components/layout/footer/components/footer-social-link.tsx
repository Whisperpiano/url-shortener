import { cn } from "@/lib/utils";
import { SocialItem } from "../utils/social-items";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

export default function FooterSocialLink({
  socialItem,
}: {
  socialItem: SocialItem;
}) {
  return (
    <Link
      href={socialItem.href}
      data-tooltip-target="tooltip-facebook"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "group"
      )}
      target={socialItem.external ? "_blank" : "_self"}
    >
      <socialItem.icon className="text-muted-foreground group-hover:text-foreground transition-colors" />
      <span className="sr-only">{socialItem.label}</span>
    </Link>
  );
}
