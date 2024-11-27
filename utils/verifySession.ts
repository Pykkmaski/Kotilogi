import 'server-only';
import { redirect } from 'next/navigation';
import { loadSession } from './loadSession';

/**Redirects to the login page, if a session is not present.
 * @returns A session object.
 */
export const verifySession = async (callbackUrl?: string) => {
  const session = await loadSession(false);
  if (!session) {
    const url = callbackUrl ? `/login?callback=${callbackUrl}` : '/login';
    return redirect(url);
  }

  return session;
};
