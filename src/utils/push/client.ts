import WebPush, { type PushSubscription, WebPushError } from 'web-push';

export { WebPushError };
export type { PushSubscription };

const API_KEY = process.env['PUSH_API_KEY'];

export class PushClientAuthorizationError extends Error {}

export function createClient(config: PushClientConfig) {
  WebPush.setVapidDetails(config.vapid.subject, config.vapid.publicKey, config.vapid.privateKey);

  return {
    send: async (apiKey: string, message: { subscription: PushSubscription; payload?: unknown }) => {
      if (apiKey !== API_KEY) {
        throw new PushClientAuthorizationError('Invalid API key');
      }

      return WebPush.sendNotification(message.subscription, JSON.stringify(message.payload));
    },
  };
}

export interface PushClientConfig {
  vapid: {
    subject: string;
    publicKey: string;
    privateKey: string;
  };
}
