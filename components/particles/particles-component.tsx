"use client";

import { useMemo } from "react";
import { type ISourceOptions } from "@tsparticles/engine";
import { defaultOptions } from "@/lib/settings/particles/particles-default-options";
import { useParticlesEngine } from "@/lib/hooks/particles/useParticlesEngine";
import Particles from "@tsparticles/react";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  const isEngineInitialized = useParticlesEngine();
  const mergedOptions = useMemo(() => {
    const baseOptions = mergeOptions(defaultOptions, options);
    return {
      ...baseOptions,
      particles: {
        ...baseOptions.particles,
        color: {
          value: theme === "light" ? "#000000" : "#ffffff",
        },
      },
    };
  }, [options, theme]);

  if (!isEngineInitialized) return null;

  return (
    <Particles id="tsparticles" options={mergedOptions} className={className} />
  );
};
