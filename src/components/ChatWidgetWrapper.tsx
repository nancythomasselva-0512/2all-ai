"use client";

import { usePathname } from "next/navigation";
import AlexChatWidget from "@/components/AlexChatWidget";

export default function ChatWidgetWrapper() {
  const pathname = usePathname();

  // Hide chat widget on admin pages
  if (pathname?.startsWith("/admin")) return null;

  return <AlexChatWidget />;
}

