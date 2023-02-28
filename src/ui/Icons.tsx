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
      <path d='M11.5356 5.79327L7.29294 10.0359L4.46451 7.20748' stroke='white' strokeWidth='1.5' />
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
  Money: (props: LucideProps) => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M7.28 13.6H8.68V12.6C9.34667 12.48 9.92 12.22 10.4 11.82C10.88 11.42 11.12 10.8267 11.12 10.04C11.12 9.48 10.96 8.96667 10.64 8.5C10.32 8.03333 9.68 7.62667 8.72 7.28C7.92 7.01333 7.36667 6.78 7.06 6.58C6.75333 6.38 6.6 6.10667 6.6 5.76C6.6 5.41333 6.72347 5.14 6.9704 4.94C7.2168 4.74 7.57333 4.64 8.04 4.64C8.46667 4.64 8.8 4.74347 9.04 4.9504C9.28 5.1568 9.45333 5.41333 9.56 5.72L10.84 5.2C10.6933 4.73333 10.4235 4.32667 10.0304 3.98C9.6368 3.63333 9.2 3.44 8.72 3.4V2.4H7.32V3.4C6.65333 3.54667 6.13333 3.84 5.76 4.28C5.38667 4.72 5.2 5.21333 5.2 5.76C5.2 6.38667 5.38347 6.89333 5.7504 7.28C6.1168 7.66667 6.69333 8 7.48 8.28C8.32 8.58667 8.90347 8.86 9.2304 9.1C9.5568 9.34 9.72 9.65333 9.72 10.04C9.72 10.48 9.5632 10.8032 9.2496 11.0096C8.93653 11.2165 8.56 11.32 8.12 11.32C7.68 11.32 7.29013 11.1832 6.9504 10.9096C6.61013 10.6365 6.36 10.2267 6.2 9.68L4.88 10.2C5.06667 10.84 5.3568 11.3568 5.7504 11.7504C6.14347 12.1435 6.65333 12.4133 7.28 12.56V13.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9499 3.06 14.38 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210133 10.1467 0 9.10667 0 8C0 6.89333 0.210133 5.85333 0.6304 4.88C1.05013 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.6296C5.85333 0.209867 6.89333 0 8 0C9.10667 0 10.1467 0.209867 11.12 0.6296C12.0933 1.04987 12.94 1.62 13.66 2.34C14.38 3.06 14.9499 3.90667 15.3696 4.88C15.7899 5.85333 16 6.89333 16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9499 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7899 9.10667 16 8 16Z' />
    </svg>
  ),
  Schedule: (props: LucideProps) => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M10.64 11.76L11.76 10.64L8.8 7.68V4H7.2V8.32L10.64 11.76ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9499 3.06 14.38 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210133 10.1467 0 9.10667 0 8C0 6.89333 0.210133 5.85333 0.6304 4.88C1.05013 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.6296C5.85333 0.209867 6.89333 0 8 0C9.10667 0 10.1467 0.209867 11.12 0.6296C12.0933 1.04987 12.94 1.62 13.66 2.34C14.38 3.06 14.9499 3.90667 15.3696 4.88C15.7899 5.85333 16 6.89333 16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9499 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7899 9.10667 16 8 16Z' />
    </svg>
  ),
  Description: (props: LucideProps) => (
    <svg
      width='13'
      height='16'
      viewBox='0 0 13 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M3.25 12.8H9.75V11.2H3.25V12.8ZM3.25 9.6H9.75V8H3.25V9.6ZM1.625 16C1.17812 16 0.795708 15.8435 0.47775 15.5304C0.15925 15.2168 0 14.84 0 14.4V1.6C0 1.16 0.15925 0.7832 0.47775 0.4696C0.795708 0.156533 1.17812 0 1.625 0H8.125L13 4.8V14.4C13 14.84 12.841 15.2168 12.5231 15.5304C12.2046 15.8435 11.8219 16 11.375 16H1.625ZM7.3125 5.6H11.375L7.3125 1.6V5.6Z' />
    </svg>
  ),
};

export type IconType = keyof typeof Icons;
