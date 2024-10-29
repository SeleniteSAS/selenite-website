import React, { type ReactNode } from "react";
import { auth } from "@/lib/auth";

export default async function WebsitePage(): Promise<ReactNode> {
  const session = await auth();

  return <p>Website Page - {session?.user ? "is connected" : "is not connected"}</p>;
}
