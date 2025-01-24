"use client";

import { MutableRefObject, ReactNode, RefObject, useEffect, useRef } from "react";
import Confetti from "react-canvas-confetti";
import { TCanvasConfettiInstance } from "react-canvas-confetti/src/types";

import { CreateTypes } from "canvas-confetti";

type ConfettiProviderProps = {
  children: ReactNode;
};

export default function ConfettiProvider({ children }: ConfettiProviderProps): ReactNode {
  const confettiInstance: MutableRefObject<TCanvasConfettiInstance | null> = useRef<TCanvasConfettiInstance | null>(
    null,
  );

  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const mousePosition: MutableRefObject<{ x: number; y: number }> = useRef<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });

  const triggerConfetti = (x: number, y: number): void => {
    confettiInstance.current?.({
      particleCount: 200,
      drift: 0,
      spread: 180,
      disableForReducedMotion: true,
      colors: ["#FFFFFF", "#00E5E5", "#F6262E"],
      origin: { x, y },
    });
  };

  const handleMouseMove = (e: MouseEvent): void => {
    mousePosition.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  };

  const handleClick = (e: MouseEvent): void => {
    const target = e.target as Element;
    if (target.getAttribute("data-disabled") === "true") return;

    triggerConfetti(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  const handleKeydown = (e: KeyboardEvent): void => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const { x, y } = mousePosition.current;
      triggerConfetti(x, y);
    }
  };

  useEffect((): (() => void) => {
    const container: HTMLDivElement | null = containerRef.current;

    if (container) {
      const elements: NodeListOf<Element> = container.querySelectorAll("[data-confetti='true']");
      elements.forEach((element: Element): void => element.addEventListener("click", handleClick as EventListener));
    }

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("mousemove", handleMouseMove);

    return (): void => {
      if (container) {
        const elements: NodeListOf<Element> = container.querySelectorAll("[data-confetti='true']");
        elements.forEach((element: Element): void =>
          element.removeEventListener("click", handleClick as EventListener),
        );
      }
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleKeydown, handleClick]);

  return (
    <div ref={containerRef}>
      <Confetti
        onInit={({ confetti }: { confetti: CreateTypes }): void => {
          confettiInstance.current = confetti;
        }}
        className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
      />
      <div className="relative z-10 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
