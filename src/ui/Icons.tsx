import type { LucideIcon, LucideProps } from 'lucide-react';
import * as Lucide from 'lucide-react';
import React from 'react';
// https://lucide.dev/

export type Icon = LucideIcon;

export const Icons = {
  ...Lucide,
  Logo: (props: LucideProps) => (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <circle cx='12' cy='12' r='10' />
    </svg>
  ),
  Check: (props: LucideProps) => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='8' cy='8' r='8' />
      <path
        d='M11.5356 5.79327L7.29294 10.0359L4.46451 7.20748'
        stroke='white'
        stroke-width='1.5'
      />
    </svg>
  ),
  CarPark: (props: LucideProps) => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='8' cy='8' r='8' />
      <path
        d='M5.5 11.95H7.29V9.48H8.16C9.74 9.48 11.1 8.7 11.1 6.93C11.1 5.09 9.75 4.5 8.12 4.5H5.5V11.95ZM7.29 8.07V5.92H8.02C8.88 5.92 9.36 6.18 9.36 6.93C9.36 7.66 8.94 8.07 8.07 8.07H7.29Z'
        fill='white'
      />
    </svg>
  ),
};

export type IconType = keyof typeof Icons;
