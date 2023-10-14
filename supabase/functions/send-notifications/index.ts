import { createClient } from '@supabase/supabase-js';
import type { Database, Json } from '../../../src/lib/database.types.ts';

// needs refactor

type NotificationRow = {
  subscription: Json;
  data: Json;
  id: string;
};

Deno.serve(async req => {
  const client = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    {
      global: { headers: { Authorization: req.headers.get('Authorization')! } },
    },
  );

  const { data, error } = await client.from('notifications').select('subscription, data, id').eq('status', 'pending');
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  const result = await Promise.allSettled(data.map(notificationRow => getRq(notificationRow)));
  const fulfilled = result.flatMap(val => (val.status === 'fulfilled' ? [val.value] : []));
  const failed = data.flatMap(({ id }) => (!fulfilled.includes(id) ? [id] : []));

  await Promise.all([
    client.from('notifications').update({ status: 'sent' }).in('id', fulfilled),
    client.from('notifications').update({ status: 'error' }).in('id', failed),
  ]);

  return new Response(JSON.stringify({ message: 'Notifications sent.' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

async function getRq({ subscription, data, id }: NotificationRow) {
  try {
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
  } catch (e) {
    console.error(e);
    throw e;
  }
}
