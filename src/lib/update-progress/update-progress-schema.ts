import { z } from 'zod';

export const updateProgressSchema = z.object({
  'latest-chapter-read': z
    .string({ message: 'This value is required' })
    .refine(val => !isNaN(Number(val)) && val.length, { message: 'This must be a number' }),
  'reading-status': z
    .enum(['reading', 'want to read', 'finished reading', 'postponed', 'dropped'])
    .default('want to read'),
  priority: z.enum(['high', 'normal', 'low']).default('normal'),
});
