import 'server-only';
import { redirect } from 'next/navigation';
import { loadSession } from './loadSession';

export const verifySession = async () => {
  const session = await loadSession(false);
  if (!session) {
    return redirect('/login');
  }

  return session;
};
