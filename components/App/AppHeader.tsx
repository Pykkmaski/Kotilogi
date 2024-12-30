import { loadSession } from 'kotilogi-app/utils/loadSession';

import { VPMobileMenu } from './VPMobileMenu';
import { Logo } from './Logo';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileCircle } from '../New/ProfileCircle';
import { MenuPrefab } from '../UI/VPMenu';
import { AddHomeOutlined, Settings } from '@mui/icons-material';
import Link from 'next/link';
import db from 'kotilogi-app/dbconfig';

/**The header displayed when using the app-portion of the site. */
export async function AppHeader() {
  //One of these seems to be causing a knex timeout error.
  const session = await loadSession();

  const [{ propertyCount }] = await db('data_propertyOwners')
    .where({ userId: session.user.id })
    .count('*', { as: 'propertyCount' });

  const addPropertyDisabled = propertyCount >= 1;

  return (
    <header className='w-full flex items-center justify-between py-2 lg:mb-8 xs:mb-4 border-b border-slate-200'>
      <Logo
        labelColorVariant='gray'
        backgroundVariant='auth'
      />
      <div className='flex gap-2 items-center'>
        <div className='flex gap-2 items-center mr-4'>
          <Link href='/dashboard/settings'>
            <IconButton>
              <Settings />
            </IconButton>
          </Link>

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
