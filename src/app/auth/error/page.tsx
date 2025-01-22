import { ClientError } from '@components/common/error/error.client';

export default function AuthErrorPage() {
  return (
    <div className="flex h-full flex-col justify-center">
      <ClientError error={new Error('Something wrong happened with auth.')} />
    </div>
  );
}
