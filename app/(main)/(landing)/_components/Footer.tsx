import React from 'react';
import { Feather, FileText, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { LogoState } from '@/app/_components/LogoStates';

const footerLinks = [
  {
    title: 'Product',
    columnNumber: 1,
    links: [
      {
        label: 'Features',
        href: '#features',
      },
      {
        label: 'Focus Methodology',
        href: '#agitation',
      },
      {
        label: 'Download for Mac & Windows',
        href: '/download',
      },
    ],
  },
  {
    title: 'Resources',
    columnNumber: 2,
    links: [
      {
        label: 'The Focus Blog',
        href: '/blog',
      },
      {
        label: 'Wall of Love',
        href: '#testimonials',
      },
    ],
  },
  {
    title: 'Legal',
    columnNumber: 3,
    links: [
      {
        label: 'Security Guarantee',
        href: '/security',
      },
      {
        label: 'Contact Us',
        href: 'mailto:support@rite.app',
      },
    ],
  },
];

export const Footer = () => {
  const { resolvedTheme } = useTheme();

  return (
    <footer id="footer" className="bg-background text-foreground/70 pt-16 pb-12 border-t border-background/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-muted-foreground/10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center justify-start space-x-2 mb-4">
              <LogoState size={'size-10'} />
              <span className="font-serif text-2xl font-black text-foreground tracking-tight">
                Rite<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-sm font-normal text-foreground/70 leading-relaxed mb-4">
              The quiet space for digital creators, journalists, planners, and authors.
            </p>
          </div>

          {footerLinks.map((column, key) => (
            <div key={key}>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <Link href={`${link.href}`}>
                      {link.label}
                      {link.label.toLowerCase().includes('download') ? <span className="text-[10px] px-1.5 py-0.5 ml-2 rounded bg-primary text-foreground font-mono">v2.4</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-foreground/50">
          <p>© 2024 Rite Software Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Developed by Zamar Wint, designed with AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
