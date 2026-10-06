import { promises as fs } from "fs";
import path from "path";

export interface StoredNotification {
  id: string;
  type: "DEMO" | "SIGNUP" | "PAYMENT" | "PROJECT";
  category: string;
  title: string;
  description: string;
  user?: { name?: string | null; email?: string | null; phone?: string | null };
  url?: string;
  timestamp: string;
  read: boolean;
}

const NOTIFICATIONS_FILE = path.join(process.cwd(), "src/data/notifications.json");

export async function getNotifications(): Promise<StoredNotification[]> {
  try {
    const data = await fs.readFile(NOTIFICATIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addNotification(
  notification: Omit<StoredNotification, "id" | "timestamp" | "read"> & { timestamp?: string; read?: boolean }
): Promise<StoredNotification> {
  const notifications = await getNotifications();
  const newNotif: StoredNotification = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: notification.timestamp || new Date().toISOString(),
    read: notification.read ?? false,
  };
  notifications.unshift(newNotif);
  await fs.writeFile(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2), "utf-8");
  return newNotif;
}

export async function markAllNotificationsRead(readStatus: boolean = true): Promise<void> {
  const notifications = await getNotifications();
  const updated = notifications.map((n) => ({ ...n, read: readStatus }));
  await fs.writeFile(NOTIFICATIONS_FILE, JSON.stringify(updated, null, 2), "utf-8");
}

export async function deleteNotification(id: string): Promise<void> {
  const notifications = await getNotifications();
  const updated = notifications.filter((n) => n.id !== id);
  await fs.writeFile(NOTIFICATIONS_FILE, JSON.stringify(updated, null, 2), "utf-8");
}
