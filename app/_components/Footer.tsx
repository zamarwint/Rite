import React from 'react';
import { Feather, FileText, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  onOpenSpecs: () => void;
  onOpenApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSpecs, onOpenApp }) => {
  return (
    <footer id="footer" className="bg-[#2f2d32] text-[#f2e0d2]/70 pt-16 pb-12 border-t border-[#f2e0d2]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#f2e0d2]/10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center justify-start mb-4">
              <Image
                src="/logos/logo2.svg"
                alt="Logo"
                width={100}
                height={100}
                className='w-12 h-12'
              />
              <span className="font-serif text-2xl font-black text-[#f2e0d2] tracking-tight">
                Rite<span className="text-[#d42710]">.</span>
              </span>
            </div>
            <p className="text-sm font-normal text-[#f2e0d2]/70 leading-relaxed mb-4">
              The quiet space for digital creators, journalists, planners, and authors.
            </p>
            <button
              onClick={onOpenSpecs}
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#d42710] hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect Wireframe Blueprint</span>
            </button>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f2e0d2] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="hover:text-[#d42710] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <button onClick={onOpenApp} className="hover:text-[#d42710] transition-colors text-left">
                  Interactive Web Suite
                </button>
              </li>
              <li>
                <a href="#agitation" className="hover:text-[#d42710] transition-colors">
                  Focus Methodology
                </a>
              </li>
              <li>
                <button onClick={onOpenApp} className="hover:text-[#d42710] transition-colors text-left flex items-center space-x-1">
                  <span>Download Mac</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#d42710] text-[#f2e0d2] font-mono">v2.4</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenApp} className="hover:text-[#d42710] transition-colors text-left">
                  Download Windows
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f2e0d2] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#agitation" className="hover:text-[#d42710] transition-colors">
                  The Focus Blog
                </a>
              </li>
              <li>
                <button onClick={onOpenApp} className="hover:text-[#d42710] transition-colors text-left">
                  Pomodoro Sprint Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenSpecs} className="hover:text-[#d42710] transition-colors text-left">
                  Wireframe & Copy Spec Sheet
                </button>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#d42710] transition-colors">
                  Wall of Love
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f2e0d2] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#footer" className="hover:text-[#d42710] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-[#d42710] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-[#d42710] transition-colors">
                  Security Guarantee
                </a>
              </li>
              <li>
                <a href="mailto:support@rite.app" className="hover:text-[#d42710] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#f2e0d2]/50">
          <p>© 2024 Rite Software Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Designed with <span className="text-[#d42710]">#d42710</span> | <span className="text-[#f2e0d2]">#f2e0d2</span> | <span className="text-gray-400">#2f2d32</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
