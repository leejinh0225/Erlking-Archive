import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Erlking Archive',
  description: '공부 자료와 로봇 프로젝트를 한곳에 모은 Erlking의 개인 아카이브.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

/* Before first paint: restore the saved theme and decide whether motion is on. */
const bootScript = `(function(){var r=document.documentElement;try{var s=localStorage.getItem('erlking-theme');if(s==='dark'||s==='light')r.setAttribute('data-theme',s)}catch(e){}var mq=function(q){return !!(window.matchMedia&&window.matchMedia(q).matches)};if(!mq('(prefers-reduced-motion: reduce)')&&!navigator.webdriver){r.classList.add('motion');if(mq('(hover: hover) and (pointer: fine)'))r.classList.add('fine')}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
