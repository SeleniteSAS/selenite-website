import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

import { type IOS, UAParser } from "ua-parser-js";

export function getUserPlatform(headers: ReadonlyHeaders): { os: string; version?: string } {
  const userAgent: string = headers.get("user-agent") || "";
  const os: IOS = new UAParser(userAgent).getOS();

  return {
    os: os.name || "Unknown",
    version: os.version || undefined,
  };
}
