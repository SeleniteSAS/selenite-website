import { NextRequest, NextResponse } from "next/server";

type DownloadRouteProps = {
  params: { os: string };
};

export const dynamic = "force-dynamic";

const downloadUrl = (os: string): string =>
  `https://github.com/selenite-live/selenite-game/releases/latest/download/selenite-lost-contact-${os}.zip`;

export function GET(_: NextRequest, { params }: DownloadRouteProps) {
  const availableOperatingSystems: string[] = ["windows", "macos"];

  if (!availableOperatingSystems.includes(params.os)) {
    return NextResponse.json({
      message: "This operating system doesn't exist or isn't yet available",
    });
  }

  return NextResponse.redirect(downloadUrl(params.os));
}
