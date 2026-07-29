import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items, theme = "dark", className = "" }: { items: BreadcrumbItem[], theme?: "light" | "dark", className?: string }) {
  const isLight = theme === "light";
  
  const navClass = isLight ? "text-slate-500" : "text-white/80";
  const linkClass = isLight 
    ? "hover:text-slate-900 transition-colors underline decoration-slate-300 hover:decoration-slate-900 underline-offset-4"
    : "hover:text-white transition-colors underline decoration-white/40 hover:decoration-white underline-offset-4";
  const activeClass = isLight ? "text-slate-900 font-semibold" : "text-white font-semibold";
  const chevronClass = isLight ? "text-slate-400" : "text-white/60";

  return (
    <nav className={`flex flex-wrap items-center justify-start text-left gap-1.5 text-[14px] font-medium mb-4 w-full ${navClass} ${className}`}>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-1.5">
          {item.href ? (
            <Link href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ) : (
            <span className={activeClass}>{item.label}</span>
          )}
          
          {index < items.length - 1 && (
            <ChevronRight className={`w-4 h-4 ${chevronClass}`} />
          )}
        </div>
      ))}
    </nav>
  );
}
