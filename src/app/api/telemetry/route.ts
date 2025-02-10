import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { metricSchema } from "@/schemas/webvital";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ error: "Not in production" }, { status: 400 });
  }

  const body = await request.json();

  const result = metricSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Wrong parameters" }, { status: 400 });
  }

  const webHook: string = env.DISCORD_WEBHOOK_TELEMETRY;
  const metric = result.data;

  const content = `.
   📊 **${metric.name}** - ${metric.rating.toUpperCase()}
   🔹 Value: ${metric.value} ms
   🔹 Delta: ${metric.delta} ms
   🔹 ID: ${metric.id}
   🔹 Navigation: ${metric.navigationType}
   🔹 Entries: ${metric.entries.length} items
      ${metric.entries.map((entry) => {
        return `🔸 **${entry.name}** - ${entry.type ?? "Unknown"} - From ${Math.ceil(entry.startTime)} ms to ${Math.ceil(entry.startTime + entry.duration)} ms`;
      })}
  `;

  try {
    await fetch(webHook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send data" }, { status: 500 });
  }

  return NextResponse.json({ message: "Thanks for using the app" });
}
