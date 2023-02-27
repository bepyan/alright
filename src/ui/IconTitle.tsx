import React from 'react';

import { cn } from '~/lib/utils';

import { Icons, IconType } from './Icons';

export interface IconTitleProps {
  className?: string;
  icon: IconType;
  text: string;
}

export default function IconTitle({ className, icon, text }: IconTitleProps) {
  const Icon = Icons[icon] as any;

  return (
    <div className={cn('flex items-center gap-1 text-al-slate', className)}>
      <Icon className='h-4 w-4' />
      <span className='text-sm font-bold'>{text}</span>
    </div>
  );
}
