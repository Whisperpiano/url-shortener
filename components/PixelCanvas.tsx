"use client";

import { useEffect, useRef, useState } from "react";

type PixelCanvasProps = {
  gap?: number;
  speed?: number;
  className?: string;
};

class Pixel {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string;
  private speed: number;
  private size: number;
  private sizeStep: number;
  private minSize = 0.5;
  private maxSizeInteger = 2;
  private maxSize: number;
  private isReverse = false;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number
  ) {
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = Math.random() * 0.4 * speed;
    this.sizeStep = Math.random() * 0.4;
    this.maxSize =
      Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;
    this.size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
  }

  draw() {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;

    this.size += this.isReverse ? -this.speed : this.speed;
    this.draw();
  }
}

function PixelCanvas({
  gap = 6,
  speed = 0.2,
  className = "",
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const getTailwindColor = (cls: string) => {
      const span = document.createElement("span");
      span.className = cls;
      span.style.display = "none";
      document.body.appendChild(span);
      const style = getComputedStyle(span).color;
      document.body.removeChild(span);
      return style;
    };

    const muted = getTailwindColor("text-muted-foreground");
    const accent = getTailwindColor("text-accent-foreground");

    setColors([muted, accent]);
  }, []);

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas || colors.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    pixelsRef.current = [];
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        pixelsRef.current.push(new Pixel(canvas, ctx, x, y, color, speed));
      }
    }
  };

  const animate = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixelsRef.current.forEach((pixel) => pixel.shimmer());

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (colors.length === 0) return;

    init();
    animate();

    const resizeObserver = new ResizeObserver(() => {
      init();
    });

    if (canvasRef.current) resizeObserver.observe(canvasRef.current);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gap, speed, colors]);

  return <canvas ref={canvasRef} className={`${className}`} />;
}

export default PixelCanvas;
