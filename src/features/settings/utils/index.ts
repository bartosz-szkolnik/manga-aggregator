export function arePushNotificationsSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}
