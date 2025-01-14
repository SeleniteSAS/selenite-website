"use client";

import { useEffect, useState, useMemo, type ReactNode, Fragment } from "react";

export default function WebsiteCountDown(): ReactNode {
  const release: Date = new Date(2025, 0, 30, 9, 30, 0, 0);
  const [now, setNow] = useState<Date>(new Date());

  useEffect((): (() => void) => {
    let animationFrameId: number;

    const updateNow = (): void => {
      setNow(new Date());
      animationFrameId = requestAnimationFrame(updateNow);
    };

    animationFrameId = requestAnimationFrame(updateNow);

    return (): void => cancelAnimationFrame(animationFrameId);
  }, []);

  const diff: number = release.getTime() - now.getTime();

  const timeUnits = useMemo(
    () => [
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
    <Fragment>
      <ul
        className="relative z-10 flex items-center justify-around font-light text-white"
        aria-live="polite"
        aria-label="Countdown Timer"
      >
        {timeUnits.map((unit) => (
          <li
            key={unit.label}
            aria-label={unit.value && unit.label ? `${unit.value} ${unit.label}` : "N/A"}
            className="flex flex-1 select-none flex-col items-center justify-center"
            suppressHydrationWarning={true}
          >
            <p
              className="font-martian tabular-nums"
              suppressHydrationWarning={true}
              aria-hidden="true"
              style={{
                fontSize: "11vw",
                lineHeight: "1",
              }}
            >
              {unit.value}
            </p>
            <p className="text-md w-full text-center font-poppins">{unit.label}</p>
          </li>
        ))}
      </ul>
      <time
        dateTime={release.toISOString()}
        className={"sr-only"}
        aria-label={"Release Date"}
        aria-live="off"
        aria-atomic="true"
      >
        {release.toDateString()}
      </time>
    </Fragment>
  );
}
