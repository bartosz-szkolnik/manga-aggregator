'use client';

import { ClientError } from '@components/common/error/error.client';

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ClientError error={error} />;
}
