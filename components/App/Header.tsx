'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Group } from '@/components/UI/Group';
import Spinner from '../UI/Spinner';
import { serviceName } from 'kotilogi-app/constants';
import { Padding } from '../UI/Padding';

import { VPMobileMenu } from './VPMobileMenu';
import Button from '@mui/material/Button';
import { ToggleProvider } from '../Util/ToggleProvider';
import { Spacer } from '../UI/Spacer';
import { useCallback, useMemo } from 'react';
import { Menu, Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ElementReferenceProvider } from '../Util/ElementReferenceProvider copy';

export function Logo2() {
  return (
    <Link
      href='/'
      className='flex gap-2 items-baseline'>
      <img
        src='/logo_text.png'
        className='aspect-auto xs:w-[100px] lg:w-[120px]'
      />
    </Link>
  );
}

export function Logo3() {
  return (
    <Link
      href='/'
      className='flex gap-2 items-baseline'>
      <img
        src='/logo_text_black.png'
        className='aspect-auto xs:w-[100px] lg:w-[120px]'
      />
    </Link>
  );
}

export function Logo() {
  return (
    <div
      className='z-40'
      id='app-logo'
      title='Etusivulle'>
      <Link
        href='/'
        id='app-logo-link'
        className='w-[50px] aspect-auto object-contain font-semibold'>
        <span className='text-orange-300 text-[1.7rem]'>{serviceName[0]}</span>
        <span className='text-white text-[1.2rem]'>{serviceName.slice(1)}</span>
      </Link>
    </div>
  );
}

type HeaderProps = {
  variant?: 'black' | 'transparent';
};

/**
 * @deprecated
 * @param param0
 * @returns
 */
export default function Header({ variant = 'black' }: HeaderProps) {
  const { data, status } = useSession();
  const userIsLoggedIn = status === 'authenticated';

  const userEmail = data?.user?.email;
  //<Image src={Logo} alt="Kotidok logo"/>

  const menuElement = (
    <ToggleProvider>
      <ElementReferenceProvider>
        <ElementReferenceProvider.Element>
          <ToggleProvider.Trigger>
            <IconButton>
              <Menu />
            </IconButton>
          </ToggleProvider.Trigger>
        </ElementReferenceProvider.Element>

        <ElementReferenceProvider.Target>
          <ToggleProvider.MUITarget>
            <VPMobileMenu session={null} />
          </ToggleProvider.MUITarget>
        </ElementReferenceProvider.Target>
      </ElementReferenceProvider>
    </ToggleProvider>
  );

  const navContent = useMemo(() => {
    if (status === 'loading') {
      return <Spinner size='2rem' />;
    } else if (userIsLoggedIn) {
      return (
        <>
          <div className='xl:flex gap-4 text-white items-center xs:hidden'>
            <Link
              href='/'
              className='xs:hidden'>
              Etusivu
            </Link>
            <Link href='/dashboard/properties'>Oma Sivu</Link>
            <div className='h-4 border-l border-gray-100 mx-4 xs:hidden xl:block'></div>
            <Link
              href='/logout'
              className='font-semibold'>
              Kirjaudu Ulos
            </Link>
          </div>

          <div className='xm:block xl:hidden flex'>{menuElement}</div>
        </>
      );
    } else {
      const linkClassName = '';

      return (
        <>
          <nav className='text-white xs:text-base xl:flex gap-4 items-center xs:hidden font-semibold z-70'>
            <Link
              href='/about'
              className={linkClassName}>
              Tietoa Meistä
            </Link>
            <Link
              href='/tos'
              className={linkClassName}>
              Käyttöehdot
            </Link>
            <div className='h-4 border-l border-gray-100 mx-4 xs:hidden xl:block'></div>
            <Link
              href='/register'
              className={linkClassName}>
              Rekisteröidy
            </Link>

            <Link
              href='/login'
              className='ml-8'>
              <Button
                variant='contained'
                color='primary'>
                Kirjaudu Sisään
              </Button>
            </Link>
          </nav>

          <div className='xs:block xl:hidden z-50'>{menuElement}</div>
        </>
      );
    }
  }, [status]);

  const className = useMemo(
    () =>
      [
        'w-full py-2 h-[4em] items-center flex z-0',
        variant === 'black'
          ? 'bg-black'
          : 'bg-gradient-to-l from-secondary to-transparent to-60% absolute top-0 left-0',
      ].join(' '),
    [variant]
  );

  return (
    <header
      className={className}
      id='main-header'>
      <div className='w-full'>
        <Padding>
          <Spacer
            dir='row'
            justify='between'
            items='center'>
            <Logo2 />
            {navContent}
          </Spacer>
        </Padding>
      </div>
    </header>
  );
}
