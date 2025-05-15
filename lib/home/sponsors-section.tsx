import Image from "next/image";

export default function SponsorsSection() {
  return (
    <article className="grid grid-cols-4">
      <div>
        <Image
          src="/sponsors/logoipsum-1.svg"
          alt="Logo 1"
          width={100}
          height={100}
          className="fill-white text-white bg-red-500"
        />
      </div>
    </article>
  );
}
