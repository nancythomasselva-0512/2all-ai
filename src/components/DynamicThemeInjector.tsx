"use client";

import { useEffect, useState } from "react";

const COLOR_PRESETS: Record<string, string> = {
  blue: "#004bff",
  purple: "#9333ea",
  emerald: "#059669",
  indigo: "#4f46e5",
  orange: "#ea580c",
  rose: "#e11d48",
  red: "#dc2626",
  gold: "#d97706"
};

export default function DynamicThemeInjector({ initialColor = "#004bff" }: { initialColor?: string }) {
  const [primaryColor, setPrimaryColor] = useState(initialColor);

  useEffect(() => {
    const fetchLatestConfig = async () => {
      try {
        const res = await fetch("/api/admin/config", { cache: "no-store" });
        if (res.ok) {
          const config = await res.json();
          const val = config.primaryColor || "#004bff";
          let hex = val.startsWith("#") ? val : COLOR_PRESETS[val.toLowerCase()] || "#004bff";
          setPrimaryColor(hex);
        }
      } catch (e) {
        // Fallback to initial
      }
    };

    // Fetch immediately on mount and poll every 3 seconds for live server updates
    fetchLatestConfig();
    const interval = setInterval(fetchLatestConfig, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update dynamic theme CSS style tag in document.head
  useEffect(() => {
    if (typeof document === "undefined") return;

    let styleTag = document.getElementById("live-dynamic-theme-override") as HTMLStyleElement;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "live-dynamic-theme-override";
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      :root {
        --brand-primary: ${primaryColor};
      }

      /* Global Dynamic Theme Overrides for Customer Side */
      .bg-blue-600,
      .bg-blue-700,
      .bg-\\[\\#004bff\\],
      .bg-\\[\\#0052ff\\],
      .bg-blue-500 {
        background-color: ${primaryColor} !important;
      }

      .hover\\:bg-blue-700:hover,
      .hover\\:bg-blue-600:hover,
      .hover\\:bg-\\[\\#0039cc\\]:hover,
      .hover\\:bg-blue-800:hover {
        filter: brightness(0.9) !important;
      }

      .text-blue-600,
      .text-blue-500,
      .text-blue-700,
      .text-\\[\\#004bff\\],
      .text-\\[\\#0052ff\\] {
        color: ${primaryColor} !important;
      }

      .border-blue-600,
      .border-blue-500,
      .border-blue-400,
      .border-\\[\\#004bff\\],
      .border-\\[\\#0052ff\\] {
        border-color: ${primaryColor} !important;
      }

      .shadow-blue-500\\/20,
      .shadow-blue-500\\/30,
      .shadow-blue-600\\/30 {
        box-shadow: 0 10px 25px -5px ${primaryColor}40 !important;
      }
    `;
  }, [primaryColor]);

  return null;
}
