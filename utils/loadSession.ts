import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export async function loadSession() {
  const session = (await getServerSession(options as any)) as any;
  if (!session) throw new Error('Error loading user session!');
  return session;
}
