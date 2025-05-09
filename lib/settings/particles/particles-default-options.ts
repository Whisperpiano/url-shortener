import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";

export const defaultOptions: ISourceOptions = {
  fullScreen: false,
  background: {
    color: "#5646af",
    opacity: 0.2,
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: false },
      onHover: { enable: false },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    move: {
      direction: MoveDirection.top,
      enable: true,
      outModes: { default: OutMode.out },
      random: true,
      speed: 2,
      straight: true,
    },
    number: {
      density: { enable: true },
      value: 120,
    },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: {
        enable: true,
        speed: 0.5,

        sync: false,
      },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 3 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
  },
  detectRetina: true,
};
