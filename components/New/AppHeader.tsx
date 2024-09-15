import { loadSession } from 'kotilogi-app/utils/loadSession';

import { MobileMenu } from '../App/MobileMenu';
import { Logo } from '../App/Logo';

export async function AppHeader() {
  const session = await loadSession().catch(err => console.log(err.message));

  return (
    <header className='w-full flex items-center justify-between py-2 lg:mb-8 xs:mb-4 border-b border-slate-200'>
      <Logo variant='gray' />
      <MobileMenu session={session} />
    </header>
  );
}
