import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { UserProvider } from './UserProvider';

export default async function AuthLayout({ children }) {
  const session = (await getServerSession(options as any)) as any;
  if (!session) throw new Error('Käyttäjän lataaminen epäonnistui!');
  return <UserProvider user={session.user}>{children}</UserProvider>;
}
