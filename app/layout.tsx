import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SegVoice - AI Audio Processing',
  description: 'Advanced AI-powered audio processing and analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500">
            <Navigation />
            <div className="pt-20">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}