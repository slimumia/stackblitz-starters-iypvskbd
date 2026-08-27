import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 🟢 禁用雙擊放大，營造原生 App 體驗
};

export const metadata: Metadata = {
  title: 'NZ Campervan',
  description: '14-Day New Zealand Campervan Trip Offline PWA',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NZ Camper',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-[#0F172A] text-slate-200 antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
