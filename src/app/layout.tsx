import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { promises as fs } from "fs";
import path from "path";
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import AccessibilityWidget from "@/components/accessibility/AccessibilityWidget";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import DynamicThemeInjector from "@/components/DynamicThemeInjector";
import DynamicSeoHead from "@/components/DynamicSeoHead";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "https://2all.ai"),
  title: "2all.ai | Next-Gen AI Web Accessibility & Compliance Platform",
  description: "Modern AI Accessibility SaaS Platform to scan, monitor, and suggest fixes for website accessibility issues aligned with WCAG 2.1 standards.",
  keywords: ["accessibility", "WCAG", "AI widget", "web compliance", "2all.ai", "SaaS", "disability inclusion"],

  openGraph: {
    title: "2all.ai | AI Website Accessibility Platform",
    description: "Make any website accessible in 2 minutes with AI-powered floating widgets and WCAG monitoring.",
    url: "https://2all.ai",
    siteName: "2all.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2all.ai | AI Website Accessibility Platform",
    description: "Make any website accessible in 2 minutes with AI-powered floating widgets and WCAG monitoring.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let customCss = "";
  let customJs = "";
  let trackingScripts = "";

  let primaryColorHex = "#004bff";

  try {
    const configPath = path.join(process.cwd(), "src/data/site-config.json");
    const data = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(data);
    customCss = config.customCss || "";
    customJs = config.customJs || "";
    trackingScripts = config.trackingScripts || "";

    const val = config.primaryColor || "blue";
    if (val.startsWith("#")) {
      primaryColorHex = val;
    } else {
      const presets: Record<string, string> = {
        blue: "#004bff",
        purple: "#9333ea",
        emerald: "#059669",
        indigo: "#4f46e5",
        orange: "#ea580c",
        rose: "#e11d48",
        red: "#dc2626",
        gold: "#d97706"
      };
      primaryColorHex = presets[val.toLowerCase()] || "#004bff";
    }
  } catch (err) {
    console.error("Failed to load injected custom scripts in RootLayout:", err);
  }

  const dynamicThemeCss = `
    :root {
      --brand-primary: ${primaryColorHex};
    }

    /* Global Dynamic Theme Overrides */
    .bg-blue-600,
    .bg-blue-700,
    .bg-\\[\\#004bff\\],
    .bg-\\[\\#0052ff\\],
    .bg-blue-500 {
      background-color: ${primaryColorHex} !important;
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
      color: ${primaryColorHex} !important;
    }

    .border-blue-600,
    .border-blue-500,
    .border-blue-400,
    .border-\\[\\#004bff\\],
    .border-\\[\\#0052ff\\] {
      border-color: ${primaryColorHex} !important;
    }

    .focus\\:ring-blue-500:focus,
    .focus\\:ring-blue-600:focus,
    .focus\\:ring-\\[\\#004bff\\]:focus {
      --tw-ring-color: ${primaryColorHex} !important;
    }
  `;

  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Dynamic Global Theme Injector */}
        <style dangerouslySetInnerHTML={{ __html: dynamicThemeCss }} />
        {/* Inject Custom CSS */}
        {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {/* Inject Tracking Scripts */}
        {trackingScripts && <div dangerouslySetInnerHTML={{ __html: trackingScripts }} style={{ display: "none" }} />}
        
        <AccessibilityProvider>
          <DynamicThemeInjector initialColor={primaryColorHex} />
          <DynamicSeoHead />
          <div id="app-content">
            {children}
          </div>
          <AccessibilityWidget />
        </AccessibilityProvider>

        {/* Anna chat widget — hidden on admin pages */}
        <ChatWidgetWrapper />

        {/* Global Scroll to Top Button (Bottom-Left) */}
        <ScrollToTopButton />

        {/* Inject Custom JS before body end */}
        {customJs && (
          <Script
            id="custom-js"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: customJs }}
          />
        )}
      </body>
    </html>
  );
}
