import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { KPlace } from '~/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transferPosition(company: Pick<KPlace, 'x'> & Pick<KPlace, 'y'>) {
  return { lng: Number(company.x), lat: Number(company.y) };
}

export const copyClipboard = async (url = window.document.location.href) => {
  try {
    await navigator.clipboard.writeText(url);
  } catch (e) {
    console.error(e);
  }
};
