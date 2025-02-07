import { ReactNode } from "react";

import BoldCopy from "@/components/_animate/bold-copy";
import FallingText from "@/components/_animate/falling-text";
import SpotlightCard from "@/components/_animate/spotlight-card";
import TextPressure from "@/components/_animate/text-pressure";
import Waves from "@/components/_animate/waves";

import { cn } from "@/lib/utils";
import MirrorText from "@/components/_animate/mirror-text";

type ContainerProps = { children: ReactNode; className?: string };

function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-48 items-center justify-center rounded-lg border border-black p-6 text-black",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PoppinsDisplayOne() {
  return (
    <Container className="overflow-hidden border-none p-0">
      <SpotlightCard
        className="flex h-full w-full items-center justify-center rounded-none border-none bg-[#545454]"
        spotlightColor="rgba(0, 229, 229, 0.3)"
      >
        <p className="text-center text-2xl font-bold text-white">
          This is our writing font. It&apos;s a sans-serif typeface that&apos;s designed to be easy to read on screens.
        </p>
      </SpotlightCard>
    </Container>
  );
}

export function PoppinsDisplayTwo() {
  return (
    <Container className="overflow-hidden p-0">
      <BoldCopy text="LOST CONTACT" textClassName="text-4xl" />
    </Container>
  );
}

export function PoppinsDisplayThree() {
  const keywords: string[] = [
    "Selenite",
    "Lune",
    "Colonisation",
    "Astronaute",
    "Exploration",
    "Base",
    "Espace",
    "Aliens",
    "Mission",
    "Atmosphère",
    "Sombre",
  ].sort(() => Math.random() - 0.5);

  return (
    <Container className="bg-[#EFEEEC] p-0 font-semibold uppercase">
      <FallingText
        text={keywords.join(" ")}
        highlightWords={["Selenite"]}
        trigger="scroll"
        fontSize="1.35rem"
        gravity={0.5}
        highlightClass="font-bold text-[#009898] underline"
      />
    </Container>
  );
}

export function OrbitronDisplayOne() {
  return <Container>
    <MirrorText 
      text="welcome to selenite"
      className="text-[2rem] uppercase font-orbitro text-center font-semibold leading-9"
      direction="down"
      containerClassName=" w-full h-full flex items-center justify-center flex-col"
    />
  </Container>;
}

export function OrbitronDisplayTwo() {
  return (
    <Container className="border-none bg-[#A4191F]">
      <div className="flex items-center justify-center">
        <TextPressure
          text="SELENITESTUDIO"
          textColor="#F8F7F5"
          fontFamily="Orbitron"
          width={false}
          weight={true}
          italic={false}
          flex={false}
          alpha={false}
          stroke={false}
          minFontSize={85}
        />
      </div>
    </Container>
  );
}

export function OrbitronDisplayThree() {
  return (
    <Container className="overflow-hidden border-2 border-[#A4191F] p-0">
      <Waves
        lineColor="#A4191F"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
    </Container>
  );
}
