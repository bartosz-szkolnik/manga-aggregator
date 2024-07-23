import { z } from 'zod';

export const addMangaSchema = z.object({
  url: z.string().regex(new RegExp('https://mangadex.org/title/.*/?.*?'), {
    message: 'This must be a MangaDex url',
  }),
  'add-to-user-library': z.string().optional().default(''),
  'start-following': z.string().optional().default(''),
  'is-favorite': z.string().optional().default(''),
});
