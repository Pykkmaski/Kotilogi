import { loadSession } from 'kotilogi-app/utils/loadSession';

import { VPMobileMenu } from './VPMobileMenu';
import { Logo } from './Logo';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileCircle } from '../New/ProfileCircle';
import { VP } from '../Util/VP';
import { MenuPrefab } from '../UI/VPMenu';

export async function AppHeader() {
  const session = await loadSession().catch(err => console.log(err.message));

  return (
    <header className='w-full flex items-center justify-between py-2 lg:mb-8 xs:mb-4 border-b border-slate-200'>
      <Logo variant='gray' />
      <MenuPrefab
        trigger={
          !session ? (
            <IconButton
              sx={{
                color: 'black',
              }}>
              <MenuIcon sx={{ fontSize: '2rem', color: 'white' }} />
            </IconButton>
          ) : (
            <ProfileCircle email={session.user.email} />
          )
        }
        target={<VPMobileMenu session={session} />}
      />
    </header>
  );
}
