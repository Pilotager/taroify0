import { ReactNode } from 'react';

export const metadata = {
  title: 'Taroify0',
  description: 'Generate Component with simple text prompts.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
