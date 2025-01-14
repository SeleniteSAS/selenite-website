import React, { type ReactNode } from "react";
import WebsiteCanvas from "@/components/website-canvas/website-canvas";
import WebsiteCountDown from "@/components/website-countdown/website-countdown";
import WebsiteMoon from "@/components/website-moon/website-moon";
import WebsiteCamera from "@/components/website-camera/website-camera";
import WebsiteHeader from "@/components/website-header/website-header";
import WebsiteSkybox from "@/components/website-skybox/website-skybox";

export default async function WebsitePage(): Promise<ReactNode> {
  return (
    <div className={"min-h-screen overflow-x-hidden bg-black"}>
      <WebsiteCanvas>
        <WebsiteMoon />
        <WebsiteSkybox />
        <WebsiteCamera />
      </WebsiteCanvas>
      <section className="relative z-10 flex h-screen w-screen flex-col justify-between p-8">
        <WebsiteHeader />
        <div>
          <p className="align-left px-16 text-left font-poppins text-lg text-white">The adventure begins in </p>
          <WebsiteCountDown />
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
