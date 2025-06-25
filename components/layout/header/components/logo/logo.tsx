import { Badge } from "@/components/ui/badge";
import { FaLink } from "react-icons/fa";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-200"
    >
      <FaLink />
      <h1 className="font-mono tracking-widest font-medium text-base">
        Shortleap
      </h1>
      <Badge className="text-xs uppercase " variant={"secondary"}>
        beta
      </Badge>
    </Link>
  );
}
