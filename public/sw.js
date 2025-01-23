/// <reference lib="WebWorker" />

/** @typedef {{ mangaName: string, mangaId: string, type: 'common' | 'singular' }} Message */

/** @type {ServiceWorkerGlobalScope} */
const sw = self;

sw.addEventListener('install', () => {
  sw.skipWaiting();
});

sw.addEventListener('push', event => {
  /** @type {Message} */
  const { mangaId, mangaName, type } = event.data.json();

  event.waitUntil(
    sw.clients.matchAll({ type: 'window' }).then(active => {
      active.forEach(client => client.postMessage({ type: 'push' }));

      if (type === 'common') {
        return sw.registration.showNotification(`Some of the mangas you follow have been updated!`, {
          body: 'Click here to open it.',
          icon: `${self.location.origin}/favicon.ico`,
          data: { id: mangaId, type },
          badge: `${self.location.origin}/favicon.ico`,
          silent: true,
        });
      }

      return sw.registration.showNotification(`${mangaName} has a new chapter!`, {
        body: 'Click here to open it.',
        icon: `${self.location.origin}/favicon.ico`,
        badge: `${self.location.origin}/favicon.ico`,
        data: { id: mangaId },
        silent: true,
      });
    }),
  );
});

sw.addEventListener('notificationclick', event => {
  event.notification.close();

  const data = event.notification.data;
  if (data.type === 'common') {
    return event.waitUntil(
      sw.clients.matchAll({ type: 'window' }).then(() => {
        sw.clients.openWindow(`https://manga-aggregator.vercel.app/manga/updated`).then(client => client?.focus());
      }),
    );
  }

  event.waitUntil(
    sw.clients.matchAll({ type: 'window' }).then(() => {
      sw.clients.openWindow(`https://mangadex.org/title/${data['id']}`).then(client => client?.focus());
    }),
  );
});
