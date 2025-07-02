import { CopyButton } from "@/components/ui/copy-button";
import { CornerDownRight } from "lucide-react";
import { Link as LinkType } from "@/lib/zod/links";

import Link from "next/link";

interface Props {
  link: LinkType;
}

export default function LinkInfo({ link }: Props) {
  return (
    <div className="min-w-0 overflow-hidden flex flex-col">
      <div className="flex gap-2 items-center min-w-0">
        <Link
          href={`https://shortleap.vercel.app/${link.slug}`}
          className="font-medium lowercase text-sm truncate"
          target="_blank"
          prefetch={false}
        >
          <span className="whitespace-nowrap">shortleap.vercel.app/</span>
          <span className="dark:text-purple-400 text-purple-600">
            {link.slug}
          </span>
        </Link>
        <CopyButton text={`https://shortleap.vercel.app/${link.slug}`} />
      </div>

      <Link
        href={link.url}
        className="text-xs text-muted-foreground lowercase flex items-center gap-1.5 hover:underline hover:text-accent-foreground truncate max-w-[220px]"
        target="_blank"
      >
        <CornerDownRight size={12} />
        <span className="truncate ">{link.url}</span>
      </Link>
    </div>
  );
}
