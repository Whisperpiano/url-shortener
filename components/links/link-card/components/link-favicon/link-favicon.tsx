import { getFaviconFromUrl } from "@/lib/utils/getFaviconFromUrl";
import { FaLink } from "react-icons/fa";
import { useState } from "react";

import Image from "next/image";

interface Props {
  url: string;
}

export default function LinkFavicon({ url }: Props) {
  const [faviconFallback, setFaviconFallback] = useState(false);
  return (
    <div className="p-2 rounded-full border border-foreground/20 relative overflow-hidden shrink-0">
      {faviconFallback ? (
        <div className="min-w-6 min-h-6 rounded-full flex items-center justify-center">
          <FaLink size={16} />
        </div>
      ) : (
        <Image
          src={getFaviconFromUrl(url)}
          alt={url}
          width={24}
          height={24}
          className="rounded-full z-10 relative min-w-6 min-h-6"
          onError={() => setFaviconFallback(true)}
        />
      )}

      <Image
        src={getFaviconFromUrl(url)}
        alt={url}
        width={24}
        height={24}
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-125 opacity-30 z-0"
        aria-hidden="true"
      />
    </div>
  );
}
