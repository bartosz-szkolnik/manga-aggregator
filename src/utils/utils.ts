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

export function replaceImageUrlToUseImageProxy(imageUrl: string) {
  return imageUrl.replace('https://mangadex.org/covers/', '../images/');
}

export async function wait(seconds: number) {
  return await new Promise(resolve => setTimeout(() => resolve(null), seconds * 1000));
}

export type ToCamelCase<S extends PropertyKey> = S extends `${infer Start}_${infer Rest}`
  ? `${Start}${Capitalize<ToCamelCase<Rest>>}`
  : S;

export function toCamelCase(text: string) {
  return text.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
}

export type PropertiesToCamelCase<O extends Record<string, unknown>> = {
  [K in keyof O as ToCamelCase<K>]: O[K];
};

export function propertiesToCamelCase<O extends Record<string, unknown>>(
  obj: O | null,
): Reveal<PropertiesToCamelCase<O>> {
  const entries = Object.entries(obj || {}).map(([key, value]) => [toCamelCase(key), value]);
  return Object.fromEntries(entries);
}

export type Reveal<T> = { [K in keyof T]: T[K] } & {};

export function mapArrayToCamelCase<O extends Record<string, unknown>>(arr: O[]) {
  return arr.map(p => propertiesToCamelCase(p));
}

export function updateSearchParamsShallowly(params: URLSearchParams) {
  const [pageUrl] = window.location.href.split('?');
  window.history.replaceState(null, '', `${pageUrl}?${params}`);
}

export function detectOperatingSystem() {
  const agent = navigator.userAgent;
  if (agent.indexOf('Win') != -1) return 'Windows';
  if (agent.indexOf('Mac') != -1) return 'MacOS';
  if (agent.indexOf('X11') != -1) return 'UNIX';
  if (agent.indexOf('Linux') != -1) return 'Linux';
  return 'Unknown';
}
