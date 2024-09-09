import { z } from 'zod';

export const editMangaAttributesSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  'image-url': z.string(),
  'manga-status': z.enum(['completed', 'ongoing', 'hiatus', 'cancelled', 'unknown']),
  'latest-chapter': z.string(),
  'check-every-number': z.string().refine(val => !isNaN(Number(val)) && val.length),
  'check-every-period': z.enum(['months', 'weeks', 'days']),
  'last-time-checked': z.string(),
});
