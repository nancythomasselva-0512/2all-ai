import { NextResponse } from "next/server";
import prisma from "@/lib/db";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  return handleBootstrap(req);
}

export async function GET(req: Request) {
  return handleBootstrap(req);
}

async function handleBootstrap(req: Request) {
  try {
    let apiKey = "";
    let domain = "";
    let url = "";

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      apiKey = body.apiKey || "";
      domain = body.domain || "";
      url = body.url || "";
    } else {
      const { searchParams } = new URL(req.url);
      apiKey = searchParams.get("apiKey") || "";
      domain = searchParams.get("domain") || "";
      url = searchParams.get("url") || "";
    }

    // Determine target clean domain (prioritize actual browser requestHost if available)
    const originHeader = req.headers.get("origin") || req.headers.get("referer") || "";
    let requestHost = "";
    if (originHeader) {
      try {
        requestHost = new URL(originHeader).hostname.toLowerCase();
      } catch (e) {
        requestHost = originHeader.replace(/^https?:\/\//, "").split("/")[0].split(":")[0].toLowerCase();
      }
    }

    let rawDomain = (requestHost || domain || "yourwebsite.com").trim().toLowerCase();
    let cleanDomain = rawDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "").split(":")[0];

    // 1. Validate API Key if provided, or allow fallback
    let keyRecord: any = null;
    if (apiKey && apiKey !== "demo" && apiKey !== "DEMO") {
      keyRecord = await prisma.apiKey.findUnique({
        where: { key: apiKey },
        include: { user: true },
      });
    }

    // If keyRecord found, update lastUsedAt
    if (keyRecord) {
      prisma.apiKey.update({ where: { id: keyRecord.id }, data: { lastUsedAt: new Date() } }).catch(() => {});
    }

    const userId = keyRecord?.userId || "demo_user";
    const user = keyRecord?.user || { plan: "PRO", paymentStatus: "PAID", createdAt: new Date() };

    // 2. Domain Auto-Registration for frictionless embed across external sites
    if (keyRecord && cleanDomain && !["localhost", "127.0.0.1", "example.com"].includes(cleanDomain)) {
      try {
        const domainRecord = await prisma.domain.findFirst({
          where: {
            userId,
            OR: [
              { domain: cleanDomain },
              { canonicalDomain: cleanDomain },
              { domain: `www.${cleanDomain}` },
            ],
          },
        });

        if (!domainRecord) {
          // Auto register domain for active key
          await prisma.domain.create({
            data: {
              userId,
              domain: cleanDomain,
              status: "VERIFIED",
              verified: true,
              verificationToken: "auto_" + Math.random().toString(36).substring(2, 12),
            },
          }).catch(() => {});
        }
      } catch (domErr) {
        console.warn("Domain check/creation non-fatal error:", domErr);
      }
    }

    // 3. Quota Tracking & Usage Logging
    const currentMonth = new Date().toISOString().slice(0, 7);
    const targetDomain = cleanDomain || "unknown";

    if (keyRecord && userId !== "demo_user") {
      prisma.usageLog.upsert({
        where: {
          userId_domain_month: {
            userId,
            domain: targetDomain,
            month: currentMonth,
          },
        },
        update: {
          pageViews: { increment: 1 },
          widgetLoads: { increment: 1 },
        },
        create: {
          userId,
          domain: targetDomain,
          month: currentMonth,
          pageViews: 1,
          widgetLoads: 1,
        },
      }).catch(() => {});
    }

    // 4. Fetch Published Widget Config
    let publishedConfig = {
      primaryColor: "#0055ff",
      position: "bottom-right",
      size: "medium",
      enabledTools: ["text-resize", "high-contrast", "dark-mode", "highlight-links", "readable-font", "screen-reader"],
      buttonIcon: "universal",
    };

    if (userId !== "demo_user") {
      try {
        const configRecord = await prisma.widgetConfig.findUnique({
          where: { userId },
        });
        if (configRecord && configRecord.publishedConfig) {
          publishedConfig = JSON.parse(configRecord.publishedConfig);
        }
      } catch (e) {}
    }

    return NextResponse.json(
      {
        success: true,
        tenantId: userId,
        domain: targetDomain,
        config: publishedConfig,
        scriptUrl: "/widget-core.js",
        trialInfo: {
          isPaidUser: true,
          isTrialExpired: false,
          daysRemaining: 999,
          trialPeriodDays: 7,
          upgradeUrl: "https://2all.ai/pricing",
        },
        overageWarning: false,
        overageMessage: null,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("Bootstrap API error:", error);
    return NextResponse.json(
      { success: false, error: "INTERNAL_SERVER_ERROR", message: "Failed to initialize widget." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
