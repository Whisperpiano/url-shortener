import { ParticlesComponent } from "@/components/particles/particles-component";

import AuraEffect from "@/components/not-found/aura-effect";
import NotFoundSection from "@/components/not-found/not-found-section";

export const metadata = {
  title: "404",
  description: "Page not found - Shortleap",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative overflow-hidden ">
      <ParticlesComponent className="absolute inset-0 pointer-events-none rotate-180" />
      <NotFoundSection />
      <AuraEffect />
    </div>
  );
}
