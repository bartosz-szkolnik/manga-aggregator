import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found · Manga Aggregator',
  description: 'Here you can find all the manga you love.',
};

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/home">Return Home</Link>
    </div>
  );
}
