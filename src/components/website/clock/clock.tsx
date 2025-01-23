"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

type Unit = { label: string; value: string };

export default function Clock(): ReactNode {
  const release: Date = new Date(2025, 0, 25, 13, 0, 0);
  const [now, setNow] = useState<Date>(new Date());

  useEffect((): (() => void) => {
    let animationFrameId: number;

    const updateNow: () => void = (): void => {
      setNow(new Date());
      animationFrameId = requestAnimationFrame(updateNow);
    };

    animationFrameId = requestAnimationFrame(updateNow);

    return (): void => cancelAnimationFrame(animationFrameId);
  }, []);

  const diff: number = release.getTime() - now.getTime();

  const units: Unit[] = useMemo(
    (): Unit[] => [
      {
        label: "Days",
        value: Math.floor(diff / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
      },
      {
        label: "Hours",
        value: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0"),
      },
      {
        label: "Minutes",
        value: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0"),
      },
      {
        label: "Seconds",
        value: Math.floor((diff % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0"),
      },
    ],
    [diff],
  );

  return (
    <ul className="relative z-10 flex items-center justify-around font-light text-white">
      {units.map(
        (unit: Unit): ReactNode => (
          <li
            key={unit.label}
            aria-label={unit.value && unit.label ? `${unit.value} ${unit.label}` : "N/A"}
            className="flex flex-1 select-none flex-col items-center justify-center"
            suppressHydrationWarning={true}
          >
            <p
              className="font-orbitron tabular-nums"
              suppressHydrationWarning={true}
              style={{
                fontSize: "12vw",
                lineHeight: "1",
              }}
            >
              {unit.value}
            </p>
            <p className="text-md w-full text-center font-poppins">{unit.label}</p>
          </li>
        ),
      )}
    </ul>
  );
}
