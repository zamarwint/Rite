import React from 'react';
import { Pen, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/app/_components/ModeToggle';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import TryGetClaimsDataQuery from '@/lib/queries/TryGetClaimsDataQuery';
import UserDropdown from '../../(auth)/_components/UserDropdown';
import { LogoState } from '@/app/_components/LogoStates';

interface HeaderProps {
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

const headerLinks = [
  {
    label: 'Features',
    href: '#features'
  },
  {
    label: 'Methodology',
    href: '#agitation'
  },
  {
    label: 'Wall of Love',
    href: '#testimonials'
  },
  {
    label: 'Donate',
    href: '#',
    isExternal: true
  }
]

export const Header: React.FC<HeaderProps> = ({
  isFocusMode,
  onToggleFocusMode,
}) => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const { data, error, isPending } = TryGetClaimsDataQuery();

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 transition-colors duration-300 border-b border-border bg-background text-foreground backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <LogoState size={'size-5'} />

          <div className="flex flex-col">
            <span className="font-serif text-2xl font-black tracking-tight leading-none">
              Rite<span className="text-primary">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono font-semibold">
              Distraction-Free Suite
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-widest">
          {headerLinks.map((link, key) => (
            <Link key={key} href={link.href} target={link.isExternal ? '_blank' : '_self'} className="hover:text-primary transition-colors py-1 border-b-2 border-transparent hover:border-primary flex items-center gap-1">
              {link.label}
              {link.isExternal ? <ExternalLink className="w-3 h-3 ml-1" /> : null}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          {/* Primary CTA */}
          {!data ? (
            <Button
              onClick={() => router.push('/~')}
              id="header-cta-button"
              className="inline-flex items-center space-x-2 px-6 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Pen className="w-3.5 h-3.5 fill-current" />
              <span>Start Writing Free</span>
            </Button>
          ) : (
            <div className='flex items-center justify-center gap-3'>
              <ModeToggle />
              <Button onClick={() => router.push('/~')} className='p-4 cursor-pointer'>Back to Dashboard</Button>
              <UserDropdown data={data} full={false} small={false} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
