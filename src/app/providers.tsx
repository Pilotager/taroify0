// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className="w-full h-full flex flex-col items-center justify-center ">
        {children}
      </div>
    </NextUIProvider>
  );
}
