"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/super-admin");

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

    if (isAdminRoute) {
      // Inside Admin & Super Admin Consoles, strictly preserve original blue branding & theme swatches
      styleTag.innerHTML = `
        :root {
          --brand-primary: ${primaryColor};
        }
        .theme-color-swatch-blue {
          background-color: #004bff !important;
        }
        .admin-console-root .bg-blue-600,
        .admin-console-root button.bg-blue-600,
        .admin-console-root a.bg-blue-600 {
          background-color: #2563eb !important;
        }
        .admin-console-root .bg-blue-700,
        .admin-console-root button.bg-blue-700 {
          background-color: #1d4ed8 !important;
        }
        .admin-console-root .bg-\\[\\#004bff\\],
        .admin-console-root button.bg-\\[\\#004bff\\] {
          background-color: #004bff !important;
        }
        .admin-console-root .text-blue-600 {
          color: #2563eb !important;
        }
        .admin-console-root .text-blue-500 {
          color: #3b82f6 !important;
        }
        .admin-console-root .text-blue-700 {
          color: #1d4ed8 !important;
        }
        .admin-console-root .text-\\[\\#004bff\\] {
          color: #004bff !important;
        }
        .admin-console-root .border-blue-600 {
          border-color: #2563eb !important;
        }
        .admin-console-root .border-blue-500 {
          border-color: #3b82f6 !important;
        }
        .admin-console-root .border-blue-400 {
          border-color: #60a5fa !important;
        }
        .admin-console-root .border-\\[\\#004bff\\] {
          border-color: #004bff !important;
        }
      `;
      return;
    }

    styleTag.innerHTML = `
      :root {
        --brand-primary: ${primaryColor};
      }

      /* Global Dynamic Theme Overrides for Customer Side (excluding Admin Console and Swatches) */
      body:not(:has(.admin-console-root)) .bg-blue-600:not(.theme-color-swatch),
      body:not(:has(.admin-console-root)) .bg-blue-700:not(.theme-color-swatch),
      body:not(:has(.admin-console-root)) .bg-\\[\\#004bff\\]:not(.theme-color-swatch),
      body:not(:has(.admin-console-root)) .bg-\\[\\#0052ff\\]:not(.theme-color-swatch),
      body:not(:has(.admin-console-root)) .bg-blue-500:not(.theme-color-swatch) {
        background-color: ${primaryColor} !important;
      }

      body:not(:has(.admin-console-root)) .hover\\:bg-blue-700:hover,
      body:not(:has(.admin-console-root)) .hover\\:bg-blue-600:hover,
      body:not(:has(.admin-console-root)) .hover\\:bg-\\[\\#0039cc\\]:hover,
      body:not(:has(.admin-console-root)) .hover\\:bg-blue-800:hover {
        filter: brightness(0.9) !important;
      }

      body:not(:has(.admin-console-root)) .text-blue-600,
      body:not(:has(.admin-console-root)) .text-blue-500,
      body:not(:has(.admin-console-root)) .text-blue-700,
      body:not(:has(.admin-console-root)) .text-\\[\\#004bff\\],
      body:not(:has(.admin-console-root)) .text-\\[\\#0052ff\\] {
        color: ${primaryColor} !important;
      }

      body:not(:has(.admin-console-root)) .border-blue-600,
      body:not(:has(.admin-console-root)) .border-blue-500,
      body:not(:has(.admin-console-root)) .border-blue-400,
      body:not(:has(.admin-console-root)) .border-\\[\\#004bff\\],
      body:not(:has(.admin-console-root)) .border-\\[\\#0052ff\\] {
        border-color: ${primaryColor} !important;
      }

      body:not(:has(.admin-console-root)) .shadow-blue-500\\/20,
      body:not(:has(.admin-console-root)) .shadow-blue-500\\/30,
      body:not(:has(.admin-console-root)) .shadow-blue-600\\/30 {
        box-shadow: 0 10px 25px -5px ${primaryColor}40 !important;
      }

      /* Color Swatches must never be overridden */
      .theme-color-swatch-blue {
        background-color: #004bff !important;
      }
    `;
  }, [primaryColor, isAdminRoute]);

  return null;
}
