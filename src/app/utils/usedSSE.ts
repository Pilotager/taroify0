import type { NextResponse } from 'next/server';

export function useSSE(res: NextResponse) {
  res.headers.set('Content-Type', 'text/event-stream;charset-utf-8');
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('X-Accel-Buffering', 'no');
  res.headers.set('Cache-Control', 'no-cache, no-transform');
}
