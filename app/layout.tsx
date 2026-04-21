import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASU Smart Content Hub',
  description: 'Auto-learning hub for bite-sized ASU story lessons.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
