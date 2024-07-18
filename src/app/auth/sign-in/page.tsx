import { Metadata } from 'next';
import { signin } from './action';

export const metadata: Metadata = {
  title: 'Sign in · Manga Aggregator',
};

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required />
      <label htmlFor="password">password</label>
      <input id="password" type="password" name="password" required />
      <button formAction={signin}>Log in</button>
    </form>
  );
}
