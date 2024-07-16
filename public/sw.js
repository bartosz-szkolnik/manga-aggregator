/// <reference lib="WebWorker" />

/** @typedef {{ mangaName: string, mangaId: string }} Message */

/** @type {ServiceWorkerGlobalScope} */
const sw = self;

sw.addEventListener('install', () => {
  sw.skipWaiting();
});

sw.addEventListener('push', event => {
  /** @type {Message} */
  const { mangaId, mangaName } = event.data.json();

  event.waitUntil(
    sw.clients.matchAll({ type: 'window' }).then(active => {
      active.forEach(client => client.postMessage({ type: 'push' }));

      return sw.registration.showNotification(`${mangaName} has a new chapter!`, {
        body: 'Click here to open it.',
        icon: `${self.location.origin}/favicon.ico`,
        data: { id: mangaId },
        silent: true,
      });
    }),
  );
});

sw.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    sw.clients.matchAll({ type: 'window' }).then(() => {
      sw.clients
        .openWindow(`https://mangadex.org/title/${event.notification.data['id']}`)
        .then(client => client?.focus());
    }),
  );
});
