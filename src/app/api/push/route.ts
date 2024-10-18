import { invariant } from '@utils/utils';
import { createClient, PushClientAuthorizationError, PushSubscription, WebPushError } from '@utils/push/client';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@utils/server/logger';

export const dynamic = 'force-dynamic';

invariant(process.env.VAPID_SUBJECT, 'process.env.VAPID_SUBJECT is required.');
invariant(process.env.PRIVATE_VAPID_KEY, 'process.env.PRIVATE_VAPID_KEY is required.');
invariant(process.env.NEXT_PUBLIC_VAPID_KEY, 'process.env.NEXT_PUBLIC_VAPID_KEY is required.');

const client = createClient({
  vapid: {
    subject: process.env.VAPID_SUBJECT,
    privateKey: process.env.PRIVATE_VAPID_KEY,
    publicKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  },
});

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('p-apikey') ?? '';

  if (!apiKey) {
    return NextResponse.json({ message: 'Unauthorized', statusCode: 401 }, { status: 401 });
  }

  const json = await request.json();
  if (!validateBody(json)) {
    return NextResponse.json({ message: 'Invalid payload', statusCode: 400 }, { status: 400 });
  }

  try {
    await client.send(apiKey, json);
    return NextResponse.json({ message: 'Sent', statusCode: 200 }, { status: 200 });
  } catch (err) {
    logger.error(err);
    if (err instanceof PushClientAuthorizationError) {
      return NextResponse.json({ message: 'Unauthorized', statusCode: 401 }, { status: 401 });
    }

    if (err instanceof WebPushError) {
      return NextResponse.json({ message: err.message, statusCode: err.statusCode }, { status: err.statusCode });
    }
  }

  return NextResponse.json({ message: 'Bad request', statusCode: 400 }, { status: 400 });
}

function validateBody(body: unknown): body is { subscription: PushSubscription; payload: unknown } {
  if (!body || typeof body !== 'object') {
    return false;
  }

  return typeof body === 'object' && 'subscription' in body && 'payload' in body;
}
