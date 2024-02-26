import { NextResponse, NextRequest } from 'next/server';
import { validateUser } from '@/app/utils';
import { db, components } from '@/server/database/schema';
import { init } from '@paralleldrive/cuid2';

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await validateUser();
  const slugCache = init({
    length: 12,
  });
  const { prompt = '', slug = slugCache() } = await req.json();
  if (!prompt) {
    return new Response('prompt is empty', {
      status: 400,
    });
  }
  const result = db
    .insert(components)
    .values({
      slug,
      description: prompt,
      userId: user.id,
    })
    .returning()
    .get();
  return Response.json(result);
}
