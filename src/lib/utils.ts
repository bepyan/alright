import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Place } from '~/types/place';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transferPosition(company: Pick<Place, 'x'> & Pick<Place, 'y'>) {
  return { lng: Number(company.x), lat: Number(company.y) };
}
