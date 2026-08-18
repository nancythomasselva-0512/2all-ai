import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { logAudit } from "@/lib/audit";

const DEFAULT_CONFIG = {
  primaryColor: "#2563eb",
  position: "bottom-right",
  size: "medium",
  enabledTools: [
    "text-resize",
    "high-contrast",
    "dark-mode",
    "highlight-links",
    "readable-font",
    "screen-reader",
  ],
  buttonIcon: "universal",
  autoCheck: true,
};

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  let config = await prisma.widgetConfig.findUnique({
    where: { userId },
  });

  if (!config) {
    const defaultJson = JSON.stringify(DEFAULT_CONFIG);
    config = await prisma.widgetConfig.create({
      data: {
        userId,
        draftConfig: defaultJson,
        publishedConfig: defaultJson,
      },
    });
  }

  return NextResponse.json({
    id: config.id,
    draftConfig: JSON.parse(config.draftConfig || "{}"),
    publishedConfig: JSON.parse(config.publishedConfig || "{}"),
    lastPublishedAt: config.lastPublishedAt,
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  try {
    const body = await req.json();
    const configPayload = body.draftConfig || body.config;
    if (!configPayload) {
      return NextResponse.json({ message: "draftConfig or config is required." }, { status: 400 });
    }

    const configString = typeof configPayload === "string" ? configPayload : JSON.stringify(configPayload);
    const isPublish = Boolean(body.publish);

    const updated = await prisma.widgetConfig.upsert({
      where: { userId },
      update: {
        draftConfig: configString,
        ...(isPublish ? { publishedConfig: configString, lastPublishedAt: new Date() } : {}),
      },
      create: {
        userId,
        draftConfig: configString,
        publishedConfig: isPublish ? configString : JSON.stringify(DEFAULT_CONFIG),
        lastPublishedAt: isPublish ? new Date() : null,
      },
    });

    await logAudit({
      userId,
      action: isPublish ? "PUBLISHED_WIDGET_CONFIG" : "UPDATED_DRAFT_CONFIG",
      details: { configId: updated.id },
    });

    return NextResponse.json({
      success: true,
      draftConfig: JSON.parse(updated.draftConfig),
      publishedConfig: updated.publishedConfig ? JSON.parse(updated.publishedConfig) : null,
      lastPublishedAt: updated.lastPublishedAt,
    });
  } catch (error) {
    console.error("Error saving widget config:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
