import React from 'react';

import { cn } from '~/lib/utils';

interface HeaderNavProps {
  className?: string;
  children?: React.ReactNode;
}

export default function HeaderNav({ className, children }: HeaderNavProps) {
  return (
    <div
      className={cn(
        'container fixed inset-x-0 top-0 z-30 px-container',
        'flex items-center justify-between',
        className,
      )}
    >
      {children}
    </div>
  );
}
