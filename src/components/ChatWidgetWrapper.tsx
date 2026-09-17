"use client";

import { usePathname } from "next/navigation";
import AlexChatWidget from "@/components/AlexChatWidget";

export default function ChatWidgetWrapper() {
  const pathname = usePathname();

  // Hide chat widget on admin, super-admin, and dashboard pages
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/super-admin") ||
    pathname?.startsWith("/dashboard")
  ) {
    return null;
  }

  return <AlexChatWidget />;
}

