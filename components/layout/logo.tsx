import Link from "next/link";
import { FaLink } from "react-icons/fa";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-200"
    >
      <FaLink />
      <h1 className="font-mono tracking-widest font-medium text-base">
        Shortly
      </h1>
    </Link>
  );
}
