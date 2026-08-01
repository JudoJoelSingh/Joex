import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'JOEX AI — Premium AI Resume Generator & Professional Identity Platform',
  description:
    'Craft modern, executive resumes in minutes with OpenAI powered rewrites, live split-screen editor, 3 ATS templates, and instant vector PDF download.',
  keywords: [
    'Resume Builder',
    'AI Resume Generator',
    'OpenAI Resume Writer',
    'JOEX AI',
    'ATS Resume Templates',
    'PDF Resume Export',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} dark h-full`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0B] text-[#F5F5F5] font-sans antialiased selection:bg-[#7C3AED] selection:text-white">
        {children}
      </body>
    </html>
  );
}
