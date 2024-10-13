import { loadSession } from 'kotilogi-app/utils/loadSession';

import { VPMobileMenu } from '../App/VPMobileMenu';
import { Logo } from '../App/Logo';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileCircle } from './ProfileCircle';

export async function AppHeader() {
  const session = await loadSession().catch(err => console.log(err.message));

  return (
    <header className='w-full flex items-center justify-between py-2 lg:mb-8 xs:mb-4 border-b border-slate-200'>
      <Logo variant='gray' />
      <VisibilityProvider>
        <VisibilityProvider.Trigger>
          {!session ? (
            <IconButton
              sx={{
                color: 'black',
              }}>
              <MenuIcon sx={{ fontSize: '2rem', color: 'white' }} />
            </IconButton>
          ) : (
            <ProfileCircle email={session.user.email} />
          )}
        </VisibilityProvider.Trigger>

        <VisibilityProvider.Target>
          <VPMobileMenu session={session} />
        </VisibilityProvider.Target>
      </VisibilityProvider>
    </header>
  );
}
