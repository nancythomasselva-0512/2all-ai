import { NextResponse } from "next/server";
import { getNotifications, addNotification, markAllNotificationsRead, deleteNotification } from "@/lib/notifications";

export async function GET() {
  try {
    const notifications = await getNotifications();
    return NextResponse.json({ notifications });
  } catch (err) {
    return NextResponse.json({ notifications: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newNotif = await addNotification(body);
    return NextResponse.json({ success: true, notification: newNotif });
  } catch (err) {
    return NextResponse.json({ message: "Failed to store notification" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { read } = body;
    await markAllNotificationsRead(read !== undefined ? read : true);
    const notifications = await getNotifications();
    return NextResponse.json({ success: true, notifications });
  } catch (err) {
    return NextResponse.json({ message: "Failed to update notification status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
    await deleteNotification(id);
    const notifications = await getNotifications();
    return NextResponse.json({ success: true, notifications });
  } catch (err) {
    return NextResponse.json({ message: "Failed to delete notification" }, { status: 500 });
  }
}
