'use client';

import './loading-spinner.css';

export function LoadingSpinner() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div id="loading-splash">
        <div id="loading-splash-spinner" />
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
}
