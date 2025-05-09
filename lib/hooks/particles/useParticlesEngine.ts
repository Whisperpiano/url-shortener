import { useEffect, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const useParticlesEngine = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  return init;
};
