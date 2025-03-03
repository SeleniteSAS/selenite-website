"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

type Unit = { label: string; value: string };

export default function Clock(): ReactNode {
  const release: Date = new Date(2025, 2, 2, 10, 30, 0);
  const [now, setNow] = useState<Date>(new Date());
  const t = useTranslations("Website.Clock");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000); // Mise à jour toutes les secondes

    return () => clearInterval(intervalId); // Nettoyage lors du démontage
  }, []);

  const diff: number = release.getTime() - now.getTime();

  const units: Unit[] = useMemo(
    () => [
      {
        label: "days",
        value: Math.floor(diff / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
      },
      {
        label: "hours",
        value: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0"),
      },
      {
        label: "minutes",
        value: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0"),
      },
      {
        label: "seconds",
        value: Math.floor((diff % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0"),
      },
    ],
    [diff],
  );

  return (
    <ul className="relative z-10 flex flex-col flex-wrap items-center font-light text-white xs:flex-row md:flex-nowrap md:justify-around">
      {units.map((unit: Unit) => (
        <li
          key={unit.label}
          aria-label={`${unit.value} ${unit.label}`}
          className="flex flex-1 select-none flex-col items-center justify-center"
          suppressHydrationWarning={true}
        >
          <p
            className="font-orbitron text-[32vw] tabular-nums xs:text-[24vw] md:text-[12vw]"
            suppressHydrationWarning={true}
            style={{
              lineHeight: "1",
            }}
          >
            {unit.value}
          </p>
          <p className="text-md w-full text-center font-poppins capitalize">{t(unit.label)}</p>
        </li>
      ))}
    </ul>
  );
}
