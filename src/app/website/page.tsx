import React, { type ReactNode } from "react";
import Canvas from "@/components/website/canvas/canvas";
import Countdown from "@/components/website/countdown/countdown";
import Moon from "@/components/website/moon/moon";
import Camera from "@/components/website/camera/camera";
import Header from "@/components/website/header/header";
import Skybox from "@/components/website/skybox/skybox";

export default async function WebsitePage(): Promise<ReactNode> {
  return (
    <div className={"min-h-screen overflow-x-hidden bg-black"}>
      <Canvas>
        <Moon />
        <Skybox />
        <Camera />
      </Canvas>
      <section className="relative z-10 flex h-screen w-screen flex-col justify-between p-8">
        <Header />
        <div>
          <p className="align-left px-16 text-left font-poppins text-lg text-white">The adventure begins in </p>
          <Countdown />
          <p className="align-left px-16 text-right font-poppins text-lg text-white">Here will come the newletters </p>
          <p className="align-left center mt-16 px-16 font-poppins text-lg text-white">See more down there</p>
        </div>
      </section>
      <section
        className="relative z-10 flex h-screen w-full bg-black bg-grid"
        style={{ backgroundSize: "1000px" }}
      ></section>
    </div>
  );
}
