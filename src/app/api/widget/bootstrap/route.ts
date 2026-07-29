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

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "MISSING_API_KEY", message: "Widget API key is required." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 1. Validate API Key
    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { user: true },
    });

    if (!keyRecord || keyRecord.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_OR_REVOKED_API_KEY",
          message: "The provided API key is invalid or has been revoked.",
        },
        { status: 403, headers: CORS_HEADERS }
      );
    }

    // Update lastUsedAt asynchronously
    prisma.apiKey.update({ where: { id: keyRecord.id }, data: { lastUsedAt: new Date() } }).catch(() => {});

    const userId = keyRecord.userId;
    const user = keyRecord.user;

    // 2. Domain matching and verification check
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");

    const isLocalOrDemo =
      cleanDomain.includes("localhost") ||
      cleanDomain.includes("127.0.0.1") ||
      cleanDomain.includes("example.com") ||
      process.env.NODE_ENV === "development";

    if (cleanDomain && !isLocalOrDemo) {
      const domainRecord = await prisma.domain.findFirst({
        where: { userId, domain: cleanDomain },
      });

      if (!domainRecord) {
        return NextResponse.json(
          {
            success: false,
            error: "UNAUTHORIZED_DOMAIN",
            message: `Domain '${cleanDomain}' is not registered to this API key account.`,
          },
          { status: 403, headers: CORS_HEADERS }
        );
      }

      if (domainRecord.status !== "VERIFIED") {
        return NextResponse.json(
          {
            success: false,
            error: "DOMAIN_NOT_VERIFIED",
            message: `Domain '${cleanDomain}' is registered but pending ownership verification.`,
          },
          { status: 403, headers: CORS_HEADERS }
        );
      }
    }

    // 3. Quota Tracking & Usage Logging
    const currentMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-07"
    const targetDomain = cleanDomain || "unknown";

    const usageLog = await prisma.usageLog.upsert({
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
    });

    // 4. Check plan limits & 7-Day Free Trial status
    const plan = user.plan || "NONE";
    let limit = 999; // Micro default
    if (plan.toLowerCase() === "business") limit = 29999;
    if (plan.toLowerCase() === "enterprise") limit = 999999;

    const overageWarning = usageLog.pageViews > limit;

    // 7-Day Free Trial Calculation
    const TRIAL_DAYS = 7;
    const userCreatedAt = new Date(user.createdAt).getTime();
    const now = Date.now();
    const trialDurationMs = TRIAL_DAYS * 24 * 60 * 60 * 1000;
    const isPaidUser = user.paymentStatus === "PAID" || ["PRO", "BUSINESS", "ENTERPRISE"].includes((user.plan || "").toUpperCase()) || ["ADMIN", "SUPER_ADMIN"].includes((user.role || "").toUpperCase());

    const isTrialExpired = !isPaidUser && (now - userCreatedAt > trialDurationMs);
    const daysRemaining = isPaidUser ? 999 : Math.max(0, Math.ceil((trialDurationMs - (now - userCreatedAt)) / (1000 * 60 * 60 * 24)));

    // 5. Fetch Published Widget Config
    let configRecord = await prisma.widgetConfig.findUnique({
      where: { userId },
    });

    let publishedConfig = {
      primaryColor: "#2563eb",
      position: "bottom-right",
      size: "medium",
      enabledTools: ["text-resize", "high-contrast", "dark-mode", "highlight-links", "readable-font", "screen-reader"],
      buttonIcon: "universal",
    };

    if (configRecord && configRecord.publishedConfig) {
      try {
        publishedConfig = JSON.parse(configRecord.publishedConfig);
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
          isPaidUser,
          isTrialExpired,
          daysRemaining,
          trialPeriodDays: TRIAL_DAYS,
          upgradeUrl: "https://2all.ai/pricing"
        },
        overageWarning: overageWarning || isTrialExpired,
        overageMessage: isTrialExpired
          ? "Your 7-day free trial has expired. Upgrade your plan at 2all.ai to reactivate accessibility suite."
          : overageWarning
          ? `Monthly pageview limit (${limit.toLocaleString()}) exceeded for ${plan} plan.`
          : null,
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
