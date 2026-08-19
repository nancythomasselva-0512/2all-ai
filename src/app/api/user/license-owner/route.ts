import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { logAudit } from "@/lib/audit";

/** GET /api/user/license-owner
 *  Returns the current user's name, email, and phone. */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const db = getDb();

    // Use $queryRaw to avoid Prisma client cache issues with newly added fields
    const rows = await db.$queryRaw`
      SELECT name, email, phone, createdAt FROM "User" WHERE id = ${userId} LIMIT 1
    `;

    const user = Array.isArray(rows) ? rows[0] : null;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      createdAt: user.createdAt ?? null,
    });
  } catch (err: any) {
    console.error("[license-owner GET]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

/** POST /api/user/license-owner
 *  Updates the current user's name, email, and phone.
 *  Body: { name: string, email: string, phone: string } */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;

    let body: { name?: string; email?: string; phone?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { name, email, phone } = body;

    // Basic validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "Owner name is required." }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const db = getDb();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone?.trim() ?? "";

    // Use raw SQL to avoid Prisma client cache issues with newly added phone field
    await db.$executeRaw`
      UPDATE "User"
      SET name = ${cleanName},
          email = ${cleanEmail},
          phone = ${cleanPhone},
          updatedAt = datetime('now')
      WHERE id = ${userId}
    `;

    await logAudit({
      userId,
      action: "UPDATED_LICENSE_OWNER_INFO",
      details: { name: cleanName, email: cleanEmail },
    });

    // Send email notification to Admin + User (non-blocking)
    try {
      const { sendLicenseOwnerNotificationEmail } = await import("@/lib/mail");
      sendLicenseOwnerNotificationEmail(cleanName, cleanEmail, cleanPhone).catch(e =>
        console.error("License owner mail trigger error:", e)
      );
    } catch (mailErr) {
      console.error("Failed to import mail utility:", mailErr);
    }

    return NextResponse.json({
      success: true,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
    });
  } catch (err: any) {
    console.error("[license-owner POST]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
