import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Erlking Archive',
  description: 'Erlking의 공부 자료와 로봇 프로젝트를 모은 개인 아카이브',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body>{children}</body>
    </html>
  );
}
