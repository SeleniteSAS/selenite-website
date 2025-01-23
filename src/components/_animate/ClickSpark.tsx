"use client";

import { useRef, useEffect, ReactNode, type RefObject, type MouseEvent, type MutableRefObject } from "react";

type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
};

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
}: ClickSparkProps): ReactNode => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
  const sparksRef: MutableRefObject<Spark[]> = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;

    const parent: HTMLElement | null = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = (): void => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!ctx) return;

    let animationId: number;

    const easeFunc = (t: number): number => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: // "ease-out"
          return t * (2 - t);
      }
    };

    const draw = (timestamp: number): void => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark: Spark): boolean => {
        const elapsed: number = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress: number = elapsed / duration;
        const eased: number = easeFunc(progress);

        const distance: number = eased * sparkRadius * extraScale;
        const lineLength: number = sparkSize * (1 - eased);

        const x1: number = spark.x + distance * Math.cos(spark.angle);
        const y1: number = spark.y + distance * Math.sin(spark.angle);
        const x2: number = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2: number = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

  const handleClick = (e: MouseEvent<HTMLCanvasElement>): void => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const rect: DOMRect = canvas.getBoundingClientRect();
    const x: number = e.clientX - rect.left;
    const y: number = e.clientY - rect.top;

    const now: number = performance.now();
    const newSparks: Spark[] = Array.from(
      { length: sparkCount },
      (_: unknown, i: number): Spark => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }),
    );

    sparksRef.current.push(...newSparks);
  };

  return <canvas ref={canvasRef} className="block h-full w-full select-none" onClick={handleClick} />;
};

export default ClickSpark;
