import 'server-only';
import { redirect } from 'next/navigation';
import { loadSession } from './loadSession';

/**Redirects to the login page, if a session is not present.
 * @returns A session object.
 */
export const verifySession = async () => {
  const session = await loadSession(false);
  if (!session) {
    return redirect('/login');
  }

  return session;
};
