import type { Route } from 'next';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const toRoute = (url: string): Route => url as Route;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string, maxLength = 2): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength);
}
