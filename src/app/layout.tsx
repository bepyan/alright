import '~/styles/globals.css';

import React from 'react';

import { cn } from '~/lib/utils';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className='bg-white'>
      <head>
        <title>오리이</title>
      </head>
      <body className={cn('w-full bg-zinc-50 font-sans text-slate-900 antialiased')}>
        <div className='container min-h-screen bg-white'>{children}</div>
      </body>
    </html>
  );
}
