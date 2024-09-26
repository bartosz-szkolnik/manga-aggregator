import { redirect } from 'next/navigation';

export function unauthorized() {
  return redirect('/auth/sign-in');
}
