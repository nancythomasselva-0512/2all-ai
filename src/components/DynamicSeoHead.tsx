"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DynamicSeoHead() {
  const pathname = usePathname() || "/";
  const [seoData, setSeoData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/config", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.seoPagesConfig) {
          const pageSeo = data.seoPagesConfig[pathname] || data.seoPagesConfig["/"];
          if (pageSeo) {
            setSeoData(pageSeo);
          }
        }
      })
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    if (!seoData) return;

    // 1. Update Title
    if (seoData.seoTitle) {
      document.title = seoData.seoTitle;
    }

    // 2. Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    if (seoData.metaDescription) {
      metaDesc.setAttribute("content", seoData.metaDescription);
    }

    // 3. Update Meta Keywords
    let metaKw = document.querySelector("meta[name='keywords']");
    if (!metaKw) {
      metaKw = document.createElement("meta");
      metaKw.setAttribute("name", "keywords");
      document.head.appendChild(metaKw);
    }
    if (seoData.metaKeywords) {
      metaKw.setAttribute("content", seoData.metaKeywords);
    }

    // 4. Update Canonical Link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    if (seoData.canonicalUrl) {
      canonical.setAttribute("href", seoData.canonicalUrl);
    }

    // 5. Update Robots Meta
    let robots = document.querySelector("meta[name='robots']");
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", `${seoData.robotsIndex || "index"}, ${seoData.robotsFollow || "follow"}`);

    // 6. Update OG Title
    let ogTitle = document.querySelector("meta[property='og:title']");
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    if (seoData.ogTitle || seoData.seoTitle) {
      ogTitle.setAttribute("content", seoData.ogTitle || seoData.seoTitle);
    }

    // 7. Update OG Description
    let ogDesc = document.querySelector("meta[property='og:description']");
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    if (seoData.ogDescription || seoData.metaDescription) {
      ogDesc.setAttribute("content", seoData.ogDescription || seoData.metaDescription);
    }

    // 8. Update OG Image
    let ogImg = document.querySelector("meta[property='og:image']");
    if (!ogImg) {
      ogImg = document.createElement("meta");
      ogImg.setAttribute("property", "og:image");
      document.head.appendChild(ogImg);
    }
    if (seoData.ogImage) {
      ogImg.setAttribute("content", seoData.ogImage);
    }

  }, [seoData]);

  return null;
}
