import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { id = '', prompt = '' } = await req.json();
}
