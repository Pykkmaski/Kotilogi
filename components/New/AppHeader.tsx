import { loadSession } from 'kotilogi-app/utils/loadSession';
import { Logo2, Logo3 } from '../App/Header';
import { Margin } from './Margin';
import { ProfileCircle } from './ProfileCircle';
import { MobileMenu } from '../App/MobileMenu';

export async function AppHeader() {
  const session = await loadSession().catch(err => console.log(err.message));

  return (
    <header className='w-full flex items-center justify-between py-2 lg:mb-8 xs:mb-4 border-b border-slate-200'>
      <Logo3 />
      <MobileMenu session={session} />
    </header>
  );
}
