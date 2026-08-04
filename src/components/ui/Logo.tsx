"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  height?: number;
  href?: string;
  asLink?: boolean;
}

export default function Logo({ className = "", height = 32, href = "/", asLink = true }: LogoProps) {
  const content = (
    <div className={`flex items-center justify-center select-none transition-opacity hover:opacity-95 cursor-pointer ${className}`}>
      <img
        src="/images/logo.png"
        alt="2all.ai Logo"
        style={{ height: `${height}px`, width: "auto" }}
        className="object-contain"
      />
    </div>
  );

  if (!asLink || !href) {
    return content;
  }

  return (
    <Link href={href} className="inline-flex items-center justify-center shrink-0">
      {content}
    </Link>
  );
}
