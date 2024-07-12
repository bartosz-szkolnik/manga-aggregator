import { signin } from './action';

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
