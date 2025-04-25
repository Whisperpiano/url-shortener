import { getFaviconFromUrl } from "@/lib/utils/getFaviconFromUrl";
import { Link } from "@/lib/zod/links";
import Image from "next/image";

export default function TopLinks({ topLinks }: { topLinks: Link[] }) {
  return (
    <div>
      {topLinks.map((link) => (
        <div key={link.id}>
          <Image
            src={getFaviconFromUrl(link.url)}
            alt={link.url}
            width={35}
            height={35}
          />
          <a href={link.url}>{link.url}</a>
        </div>
      ))}
    </div>
  );
}
