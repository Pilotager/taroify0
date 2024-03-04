import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/app/components';
import { Providers } from './providers';

import '../style/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taroify0',
  description: 'Generate Component with simple text prompts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="px-2 md:px-4 w-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
