import { loadSession } from 'kotilogi-app/utils/loadSession';

import { VPMobileMenu } from './VPMobileMenu';
import { Logo } from './Logo';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileCircle } from '../New/ProfileCircle';
import { VP } from '../Util/VP';
import { MenuPrefab } from '../UI/VPMenu';
import { AddHomeOutlined, Home, HomeOutlined, NotificationsOutlined } from '@mui/icons-material';
import Link from 'next/link';
import db from 'kotilogi-app/dbconfig';
import { DialogPrefab, VPDialog } from '../UI/VPDialog';
import { DialogActions, DialogTitle } from '@mui/material';
import { Button } from '../New/Button';
import { NotificationsButton } from './NotificationsButton';

/**The header displayed when using the app-portion of the site. */
export async function AppHeader() {
  const session = await loadSession().catch(err => console.log(err.message));
  const [{ propertyCount }] = await db('data_propertyOwners')
    .where({ userId: session.user.id })
    .count('*', { as: 'propertyCount' });

  const addPropertyDisabled = propertyCount >= 2;

  return (
    <header className='w-full flex items-center justify-between py-2 lg:mb-8 xs:mb-4 border-b border-slate-200'>
      <Logo
        labelColorVariant='gray'
        backgroundVariant='auth'
      />
      <div className='flex gap-2 items-center'>
        <div className='flex gap-2 items-center mr-4'>
          <NotificationsButton />
          {!addPropertyDisabled && (
            <Link
              href='/dashboard/properties/add'
              title='Lisää talo'>
              <IconButton>
                <AddHomeOutlined />
              </IconButton>
            </Link>
          )}
        </div>

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
      </div>
    </header>
  );
}
