import { signOut } from '@/server/auth';

export async function GET() {
  await signOut();
}
