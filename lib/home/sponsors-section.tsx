import Sponsor1 from "@/lib/assets/sponsors/logoipsum-1.svg";
import Sponsor2 from "@/lib/assets/sponsors/logoipsum-2.svg";
import Sponsor3 from "@/lib/assets/sponsors/logoipsum-3.svg";
import Sponsor4 from "@/lib/assets/sponsors/logoipsum-4.svg";
import Sponsor5 from "@/lib/assets/sponsors/logoipsum-5.svg";
import Sponsor6 from "@/lib/assets/sponsors/logoipsum-6.svg";
import Sponsor7 from "@/lib/assets/sponsors/logoipsum-7.svg";
import Sponsor8 from "@/lib/assets/sponsors/logoipsum-8.svg";

export default function SponsorsSection() {
  return (
    <article className="grid grid-cols-4">
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor1 className="w-32 h-auto " />
      </div>
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor2 className="w-32 h-auto " />
      </div>
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor3 className="w-32 h-auto " />
      </div>
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor4 className="w-32 h-auto " />
      </div>
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor5 className="w-32 h-auto " />
      </div>
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor6 className="w-32 h-auto " />
      </div>
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor7 className="w-32 h-auto " />
      </div>
      <div className="border aspect-[16/6] flex items-center justify-center">
        <Sponsor8 className="w-32 h-auto " />
      </div>
    </article>
  );
}
