import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { promises as fs } from "fs";
import path from "path";
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import AccessibilityWidget from "@/components/accessibility/AccessibilityWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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

  try {
    const configPath = path.join(process.cwd(), "src/data/site-config.json");
    const data = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(data);
    customCss = config.customCss || "";
    customJs = config.customJs || "";
    trackingScripts = config.trackingScripts || "";
  } catch (err) {
    console.error("Failed to load injected custom scripts in RootLayout:", err);
  }

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Inject Custom CSS */}
        {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {/* Inject Tracking Scripts */}
        {trackingScripts && <div dangerouslySetInnerHTML={{ __html: trackingScripts }} style={{ display: "none" }} />}
        
        <AccessibilityProvider>
          <div id="app-content">
            {children}
          </div>
          <AccessibilityWidget />
        </AccessibilityProvider>

        {/* Anna chat widget — hidden on admin pages */}
        <ChatWidgetWrapper />

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
