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
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-sm bg-maroon" />
          <span className="text-sm font-medium text-ink">sparknotes · asu edition</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            const label = item.label === 'Saved' ? `Saved (${savedCount})` : item.label;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-1 text-sm transition-colors ${
                  isActive
                    ? 'border-b-2 border-maroon font-medium text-maroon'
                    : 'border-b-2 border-transparent text-ink/70 hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="h-8 w-8 rounded-full border border-black/20" />
      </div>
    </header>
  );
}
