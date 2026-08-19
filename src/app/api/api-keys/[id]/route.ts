import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { logAudit } from "@/lib/audit";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;
  const userRole = (session.user as any).role || "USER";
  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";

  try {
    const keyId = params.id;
    if (!keyId) {
      return NextResponse.json({ message: "API Key ID required" }, { status: 400 });
    }

    const db = getDb();
    const existingKey = await db.apiKey.findUnique({
      where: { id: keyId },
    });

    if (!existingKey) {
      return NextResponse.json({ message: "API key not found" }, { status: 404 });
    }

    if (!isAdmin && existingKey.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.apiKey.delete({
      where: { id: keyId },
    });

    await logAudit({
      userId,
      action: "DELETED_API_KEY",
      details: { keyId, name: existingKey.name, key: existingKey.key },
    });

    return NextResponse.json({ message: "API key deleted successfully", id: keyId });
  } catch (error: any) {
    console.error("Error deleting API key:", error);
    return NextResponse.json({ message: error.message || "Internal server error." }, { status: 500 });
  }
}
