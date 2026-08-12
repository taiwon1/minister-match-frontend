import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppNav } from '@/components/AppNav';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = { title: '사역자 매칭', description: '사역자와 교회를 연결하는 매칭 플랫폼' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="flex min-h-full flex-col"><AuthProvider><AppNav />{children}</AuthProvider></body></html>;
}
