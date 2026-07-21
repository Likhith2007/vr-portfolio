import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VR Portfolio | 3D Developer Experience',
  description: 'An immersive 3D/VR portfolio built with Next.js, Three.js, and React Three Fiber.',
  keywords: ['VR', 'Portfolio', 'Three.js', 'React Three Fiber', 'Next.js', '3D Web'],
  authors: [{ name: 'Developer' }],
};

export const viewport = {
  themeColor: '#050510',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* We are using Google Fonts imported via CSS variables in globals.css, but we can also preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen bg-black text-white selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}
