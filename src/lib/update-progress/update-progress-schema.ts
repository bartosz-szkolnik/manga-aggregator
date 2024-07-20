import { z } from 'zod';

export const updateProgressSchema = z.object({
  'latest-chapter-read': z.string({
    // TODO: fix this
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  'reading-status': z
    .enum(['reading', 'want to read', 'finished reading', 'postponed', 'dropped'])
    .default('want to read'),
  priority: z.enum(['high', 'normal', 'low']).default('normal'),
});
