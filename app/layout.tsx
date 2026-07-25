import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fittoardiansyah.dev'),
  title: 'Fitto Ardiansyah — AI Engineer & Full Stack Developer',
  description:
    'AI Engineer, Full Stack Developer, and Mobile Developer building intelligent digital experiences with AI and modern technologies.',
  keywords: [
    'AI Engineer',
    'Full Stack Developer',
    'Mobile Developer',
    'Fitto Ardiansyah',
    'Machine Learning',
    'Computer Vision',
    'Flutter',
    'Laravel',
    'Python',
    'Next.js',
  ],
  authors: [{ name: 'Fitto Ardiansyah' }],
  openGraph: {
    title: 'Fitto Ardiansyah — AI Engineer & Full Stack Developer',
    description:
      'Building intelligent digital experiences with AI & modern technologies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitto Ardiansyah — AI Engineer & Full Stack Developer',
    description:
      'Building intelligent digital experiences with AI & modern technologies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
