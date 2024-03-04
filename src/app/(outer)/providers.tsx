'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <div className="w-full h-full flex flex-col items-center justify-center ">
          {children}
        </div>
      </SessionProvider>
    </NextUIProvider>
  );
}
