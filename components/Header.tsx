'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  savedCount: number;
};

const nav = [
  { href: '/', label: 'Today' },
  { href: '/topics', label: 'Topics' },
  { href: '/saved', label: 'Saved' }
];

export function Header({ savedCount }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-white/15 bg-ink">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-2 md:h-16 md:flex-nowrap md:py-0">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-sm bg-maroon" />
          <span className="text-sm font-medium text-white">ASU Smart Content Hub</span>
        </div>

        <nav className="flex w-full items-center gap-4 overflow-x-auto pb-1 md:w-auto md:gap-6 md:pb-0">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            const label = item.label === 'Saved' ? `Saved (${savedCount})` : item.label;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap pb-1 text-sm transition-colors ${
                  isActive
                    ? 'border-b-2 border-maroon font-medium text-white'
                    : 'border-b-2 border-transparent text-white/70 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
