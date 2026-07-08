"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "SOLUTIONS",
      links: [
        { name: "2allWidget", href: "/access-widget" },
        { name: "2allFlow", href: "/develop-accessible-code" },
        { name: "2allServices", href: "/services" },
        { name: "VPAT", href: "/vpat" },
        { name: "User testing", href: "/user-testing" },
        { name: "Expert audit", href: "/expert-audit" },
        { name: "File & PDF accessibility", href: "/file-pdf-accessibility" }
      ]
    },
    {
      title: "INTEGRATIONS",
      links: [
        { name: "WordPress", href: "/wordpress" },
        { name: "Shopify", href: "/shopify" },
        { name: "BigCommerce", href: "/bigcommerce" },
        { name: "WooCommerce", href: "/woocommerce" },
        { name: "Wix", href: "/wix" },
        { name: "Webflow", href: "/webflow" },
        { name: "Squarespace", href: "/squarespace" }
      ]
    },
    {
      title: "COMPLIANCE",
      links: [
        { name: "ADA", href: "/ada" },
        { name: "ADA Checklist", href: "/ada-checklist" },
        { name: "EAA", href: "/eaa" },
        { name: "WCAG", href: "/wcag" },
        { name: "WCAG Checklist", href: "/wcag-checklist" },
        { name: "AODA", href: "/aoda" },
        { name: "Section 508", href: "/section-508" },
        { name: "Lawsuit guide", href: "/lawsuit-guide" },
        { name: "Demand letter guide", href: "/demand-letter-guide" }
      ]
    },
    {
      title: "ACCESSIBILITY FOR",
      links: [
        { name: "Small business", href: "/small-business" },
        { name: "Mid – Large businesses", href: "/mid-large-business" },
        { name: "Enterprise", href: "/enterprise" },
        { name: "Industries", href: "/industries" },
        { name: "Industry reports", href: "/industry-reports" },
        { name: "Agency Partners", href: "/agency-partners" },
        { name: "Platform Partners", href: "/platform-partners" },
        { name: "California businesses", href: "/california-businesses" },
        { name: "Free accessibility scan", href: "/access-scan" }
      ]
    },
    {
      title: "COMPANY",
      links: [
        { name: "About 2all.ai", href: "/about-us" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Careers", href: "/careers" },
        { name: "Why choose 2all.ai", href: "/why-choose-2all-ai" },
        { name: "Submit Media Inquiry", href: "/submit-media-inquiry" },
        { name: "GAAD 2026", href: "/gaad-2026" }
      ]
    },
    {
      title: "SUPPORT",
      links: [
        { name: "My account", href: "/my-account" },
        { name: "Litigation support", href: "/litigation-support" },
        { name: "Tech support", href: "/tech-support" },
        { name: "Partners", href: "/partners" },
        { name: "Trust center", href: "/trust-center" }
      ]
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 relative overflow-hidden select-none font-sans border-t border-slate-900 z-10">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Links Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-4 text-left">
              <h4 className="text-white font-extrabold text-xs tracking-wider uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-xs text-slate-500">
            <span>&copy; {currentYear} - 2all.ai Inc.</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <span className="text-slate-700">|</span>
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Notice</Link>
            <span className="text-slate-700">|</span>
            <Link href="#" className="hover:text-slate-400 transition-colors">Cookie Policy</Link>
            <span className="text-slate-700">|</span>
            <Link href="#" className="hover:text-slate-400 transition-colors">Accessibility Statement</Link>
          </div>

          {/* Social Icons Links */}
          <div className="flex gap-3">
            {[
              {
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                ),
                href: "#"
              },
              {
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
                href: "#"
              },
              {
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                href: "#"
              },
              {
                icon: (
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                href: "#"
              }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-750 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                {soc.icon}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}
