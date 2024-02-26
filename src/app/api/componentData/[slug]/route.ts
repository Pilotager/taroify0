import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { components, users, db } from '@/server/database/schema';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const result = await db
    .select({
      id: components.id,
      slug: components.slug,
      description: components.description,
      code: components.code,
      createdAt: components.createdAt,
      userId: components.userId,
      metadata: components.metadata,
      completed: components.completed,
      user: users,
    })
    .from(components)
    .leftJoin(users, eq(components.userId, users.id))
    .orderBy(desc(components.createdAt))
    .where(eq(components.slug, params.slug));
  return Response.json(result);
}
