'use client';

// Code taken from https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d?permalink_comment_id=2577818#gistcomment-2577818

type SwipeHandlerOptions = {
  element?: HTMLElement; // if not present, will default to document
};

type Direction = 'left' | 'right' | 'down' | 'up' | 'tap';
export type SwipeCallback = (direction: Direction) => void;

export function swipeHandler(callback: SwipeCallback, options?: SwipeHandlerOptions) {
  const element = options?.element ?? (document as unknown as HTMLElement);

  const pageWidth = window.innerWidth || document.body.clientWidth;
  const treshold = Math.max(1, Math.floor(0.01 * pageWidth));
  const limit = Math.tan(((45 * 1.5) / 180) * Math.PI);

  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  function handleTouchStart(event: TouchEvent) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }

  function handleTouchEnd(event: TouchEvent) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  }

  function handleGesture() {
    const x = touchendX - touchstartX;
    const y = touchendY - touchstartY;
    const xy = Math.abs(x / y);
    const yx = Math.abs(y / x);

    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
      if (yx <= limit && xy > yx) {
        if (x < 0) {
          callback('left');
        } else {
          callback('right');
        }
      }

      if (xy <= limit && yx > xy) {
        if (y < 0) {
          callback('up');
        } else {
          callback('down');
        }
      }
    } else {
      callback('tap');
    }
  }

  element.addEventListener('touchstart', handleTouchStart);
  element.addEventListener('touchend', handleTouchEnd);

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}
