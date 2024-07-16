import { sendSuccessResponse } from '../_shared/common.ts';
import { createSupabaseBrowserClient, SupabaseBrowserClient, throwError } from '../_shared/common.ts';
import { Json } from '../_shared/database.types.ts';

type Notification = {
  subscription: Json;
  data: Json;
  id: string;
};

Deno.serve(async req => {
  console.info('Starting the sending notifications process...');
  const client = createSupabaseBrowserClient(req);
  try {
    const pendingNotifications = await getPendingNotifications(client);
    await sendNotifications(client, pendingNotifications);

    console.info('Finishing the sending notifications process...');
  } catch (error) {
    return throwError(error);
  }

  return sendSuccessResponse('Notifications sent.');
});

async function getPendingNotifications(client: SupabaseBrowserClient): Promise<Notification[]> {
  const { data, error } = await client.from('notifications').select('subscription, data, id').eq('status', 'pending');
  if (error) {
    throw error;
  }

  return data;
}

async function sendNotifications(client: SupabaseBrowserClient, pendingNotifications: Notification[]) {
  const result = await Promise.allSettled(pendingNotifications.map(notification => sendNotification(notification)));

  const fulfilled = result.flatMap(val => (val.status === 'fulfilled' ? [val.value] : []));
  const failed = pendingNotifications.flatMap(({ id }) => (!fulfilled.includes(id) ? [id] : []));

  await Promise.all([
    client.from('notifications').update({ status: 'sent' }).in('id', fulfilled),
    client.from('notifications').update({ status: 'error' }).in('id', failed),
  ]);
}

async function sendNotification({ subscription, data, id }: Notification) {
  const resp = await fetch(Deno.env.get('PUSH_API_URL') ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'p-apikey': Deno.env.get('PUSH_API_KEY') ?? '',
    },
    body: JSON.stringify({
      subscription,
      payload: data,
    }),
  });

  if (resp.ok) {
    return id;
  }

  throw new Error('Sending notification failed.');
}
