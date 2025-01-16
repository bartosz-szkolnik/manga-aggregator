import { PostgrestError } from '@supabase/supabase-js';
import { Error } from './error';
import { logger } from '@utils/server/logger';

export function ServerError({ error, className }: { error: PostgrestError; className?: string }) {
  logger.error(error);
  return <Error className={className} />;
}
