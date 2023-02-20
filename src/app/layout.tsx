import '~/styles/globals.css';

import React from 'react';

import { cn } from '~/lib/utils';

import GlobalNav from './GlobalNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className='bg-zinc-50'>
      <head>
        <title>오리이</title>
      </head>
      <body className={cn('w-full bg-white font-sans text-slate-900 antialiased')}>
        <div className='container min-h-screen bg-zinc-50'>
          <GlobalNav className='h-14' />
          <main className='pt-14'>{children}</main>
        </div>
      </body>
    </html>
  );
}
