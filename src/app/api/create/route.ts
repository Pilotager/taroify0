import type { NextRequest, NextResponse } from 'next/server';
import { EventNotifier, getSSEWriter } from 'ts-sse';
import { designInit } from '@/app/utils';

export async function POST(req: NextRequest, res: NextResponse) {
  const { id = '', prompt = '' } = await req.json();
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const syncStatusStream = async (notifier: any) => {
    await designInit(prompt, res, notifier, writer, encoder);
  };

  await syncStatusStream(getSSEWriter(writer, encoder));
}
