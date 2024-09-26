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

export function exhaustiveCheck(_param: never): never {
  throw new TypeError(`This code shouldn't be executed, yet it happened. This means that some kind of error happened.`);
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function removeProperty<T extends Record<string, unknown>, K extends keyof T>(obj: T, prop: K) {
  const { [prop]: _, ...rest } = obj;
  return rest;
}
