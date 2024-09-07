import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { redirect } from 'next/navigation';

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

export function unauthorized() {
  return redirect('/auth/sign-in');
}

export function isAdmin(email?: string) {
  // TODO: write a proper method to determining whether the user is an admin or not
  const isAdmin = email === 'bartosz.szkolnik@protonmail.com';
  return isAdmin;
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getTheMetaSymbol() {
  return (
    <span className="text-sm text-muted-foreground">
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>
      </kbd>
    </span>
  );
}
