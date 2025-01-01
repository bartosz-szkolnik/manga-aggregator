import { z } from 'zod';

export const addMangaToDatabaseMangaIdSchema = z.object({
  url: z.string().regex(new RegExp('https://mangadex.org/title/.*/?.*?'), {
    message: 'This must be a MangaDex url',
  }),
});

export const addMangaToDatabaseMangaDataSchema = z.object({
  'check-every-number': z.string().refine(val => !isNaN(Number(val)) && val.length),
  'check-every-period': z.enum(['months', 'weeks', 'days']),
});

export const addMangaToDatabaseProfileMangaDataSchema = z.object({
  'add-to-user-library': z.string().optional().default(''),
  'start-following': z.string().optional().default(''),
  'is-favorite': z.string().optional().default(''),
  'latest-chapter-read': z
    .string({ message: 'This value is required' })
    .refine(val => !isNaN(Number(val)) && val.length)
    .default('0'),
  'reading-status': z
    .enum(['reading', 'want to read', 'finished reading', 'postponed', 'dropped'])
    .default('want to read'),
  priority: z.enum(['high', 'normal', 'low']).default('normal'),
});
