import { z } from 'zod';

export const addMangaToDatabaseSchema = z.object({
  url: z.string().regex(new RegExp('https://mangadex.org/title/.*/?.*?'), {
    message: 'This must be a MangaDex url',
  }),
  'add-to-user-library': z.string().optional().default(''),
  'start-following': z.string().optional().default(''),
  'is-favorite': z.string().optional().default(''),
  'check-every-number': z.string().refine(val => !isNaN(Number(val)) && val.length),
  'check-every-period': z.enum(['months', 'weeks', 'days']),
});
