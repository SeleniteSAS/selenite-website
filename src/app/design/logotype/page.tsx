import { Fragment } from "react";

import LogoDisplay from "@/components/design/logo-display/logo-display";

export default function DesignMainPage() {
  return (
    <Fragment>
      <section className="flex h-[calc(100vh-10rem)] w-full flex-col items-start justify-center px-24 pb-32 font-poppins text-black">
        <div>
          <div className="flex items-center gap-8 px-8">
            <h1
              className="text-xl font-bold uppercase"
              style={{
                writingMode: "vertical-rl",
              }}
            >
              Logotype
            </h1>
            <h3 className="text-3xl">
              A symbol is more than just a shape—it carries meaning, history, and purpose. For Selenite, the lunar
              eclipse is more than a celestial event; it is a beacon of mystery and survival. The darkened moon
              represents the unknown, the silence that shrouds the lost lunar base. The faint glow around it is the last
              trace of hope, the resilience of those who dare to uncover the truth.
            </h3>
          </div>
          <p className="mt-8 text-center text-xl">
            This is the emblem of Selenite. A mark of exploration, danger, and the fight for humanity’s survival.
          </p>
          <svg
            width="42"
            height="42"
            viewBox="0 0 341 344"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mt-16"
          >
            <path
              d="M0.550049 7.14977L7.65063 0.0497901L170.75 163.15L333.85 0.0498044L340.95 7.14978L170.75 177.35L0.550049 7.14977Z"
              fill="black"
            />
            <path
              d="M0.550049 173.75L7.65063 166.75L170.75 329.85L333.85 166.75L340.95 173.75L170.75 343.95L0.550049 173.75Z"
              fill="black"
            />
          </svg>
        </div>
      </section>
      <section
        className="relative flex h-screen w-full items-center justify-center px-24 py-12 text-black"
        id="meatball"
      >
        <LogoDisplay logo="meatball" title="Meatball" />
      </section>
      <section className="relative flex h-screen w-full items-center justify-center px-24 py-12 text-black">
        <LogoDisplay logo="text" title="Text" />
      </section>
    </Fragment>
  );
}
