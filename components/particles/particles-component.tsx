"use client";

import { useMemo } from "react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { defaultOptions } from "@/lib/settings/particles/particles-default-options";
import { useParticlesEngine } from "@/lib/hooks/particles/useParticlesEngine";
import Particles from "@tsparticles/react";

interface ParticlesContainerProps {
  options?: Partial<ISourceOptions>;
  className?: string;
}

const mergeOptions = (
  defaultOpts: ISourceOptions,
  userOpts?: Partial<ISourceOptions>
): ISourceOptions => {
  return { ...defaultOpts, ...userOpts };
};

export const ParticlesComponent: React.FC<ParticlesContainerProps> = ({
  options,
  className = "",
}) => {
  const isEngineInitialized = useParticlesEngine();
  const mergedOptions = useMemo(
    () => mergeOptions(defaultOptions, options),
    [options]
  );

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles container loaded", container);
  };

  if (!isEngineInitialized) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={mergedOptions}
      className={className}
    />
  );
};
