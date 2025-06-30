import HeroSection from "@/components/home/components/hero-section/hero-section";
import ContributeSection from "@/components/home/components/contribute-section/contribute-section";
import FeaturesSection from "@/components/home/components/features-section/features-section";
import SponsorsSection from "@/components/home/components/sponsors-section/sponsors-section";
import StackSection from "@/components/home/components/stack-section/stack-section";
import Divider from "@/components/ui/divider";

export default async function Home() {
  return (
    <main>
      <section className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px] max-h-[calc(100vh-85px)] overflow-hidden">
        <HeroSection />
      </section>

      <Divider />

      <section className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px]">
        <FeaturesSection />
      </section>

      <Divider />

      <section className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px]">
        <StackSection />
      </section>

      <Divider />

      <section className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px]">
        <ContributeSection />
      </section>

      <Divider />

      <section className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px] ">
        <SponsorsSection />
      </section>

      <Divider />
    </main>
  );
}
