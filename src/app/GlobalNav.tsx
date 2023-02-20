'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

import { cn } from '~/lib/utils';
import { Icons } from '~/ui/Icons';

export default function GlobalNav({ className }: { className?: string }) {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();

  return (
    <div className={cn('fixed top-0 z-30 p-4', 'flex items-center justify-between', className)}>
      <Icons.logo className='h-6 w-6' />
      {selectedLayoutSegments}
    </div>
  );
}
