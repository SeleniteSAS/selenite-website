"use client";

import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/_ui/button";

export default function Arrows() {
  const [disabledKeys, setDisabledKeys] = useState({
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key in disabledKeys) {
        setDisabledKeys((prev) => ({ ...prev, [event.key]: true }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key in disabledKeys) {
        setDisabledKeys((prev) => ({ ...prev, [event.key]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [disabledKeys]);

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2">
      <Button
        className="pointer-events-none col-start-2 row-start-1 bg-transparent"
        disabled={disabledKeys.ArrowUp}
        size={"sm"}
        variant={"outline"}
      >
        <ArrowUpIcon />
      </Button>
      <Button
        className="pointer-events-none col-start-1 row-start-2 bg-transparent"
        disabled={disabledKeys.ArrowLeft}
        size={"sm"}
        variant={"outline"}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        className="pointer-events-none col-start-2 row-start-2 bg-transparent"
        disabled={disabledKeys.ArrowDown}
        size={"sm"}
        variant={"outline"}
      >
        <ArrowDownIcon />
      </Button>
      <Button
        className="pointer-events-none col-start-3 row-start-2 bg-transparent"
        disabled={disabledKeys.ArrowRight}
        size={"sm"}
        variant={"outline"}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
