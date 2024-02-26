'use server';

import { auth } from '@/server/auth';
import type { User } from 'next-auth';

export async function validateUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  } else {
    return session.user as User;
  }
}
