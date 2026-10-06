import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppShell } from '@/components/app-shell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MAR-EVO-XAI — Explainable AI for Historical Marathi Evolution',
  description:
    'A research prototype exploring the historical evolution of Marathi from Sanskrit through Prakrit, Apabhramsha, and Old Marathi using linguistically grounded rules, phoneme-level modelling, and explainable AI.',
  openGraph: {
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
