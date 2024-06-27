'use client';

import { Button } from '@components/ui/button';

export default function ClientComponent() {
  function handleClick() {
    console.log('Hello there!');
  }

  return <Button onClick={handleClick}>Hello there</Button>;
}
