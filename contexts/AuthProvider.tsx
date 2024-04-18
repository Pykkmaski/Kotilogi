'use client';
import { SessionProvider } from 'next-auth/react';

/**A client-side wrapper for the next-auth/react SessionProvider,
 * to stop errors due to the SessionProvider not working on server components.
 */
export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
