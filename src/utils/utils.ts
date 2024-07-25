import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function invariant(value: unknown, message = 'No message provided.'): asserts value {
  if (!value) {
    throw new Error(`Invariant: ${message}`);
  }
}

export function isTruthy<T>(value: T): value is NonNullable<T> {
  return Boolean(value);
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
