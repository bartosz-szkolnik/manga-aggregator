import { SwipeCallback, swipeHandler } from '@utils/swipe';
import { useEffect } from 'react';

export function useSwipe(callback: SwipeCallback) {
  useEffect(() => {
    const teardown = swipeHandler(callback);
    return () => teardown();
  }, [callback]);
}
