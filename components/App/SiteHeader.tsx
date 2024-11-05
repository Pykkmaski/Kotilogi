'use client';
import { Logo, LogoProps } from '@/components/App/Logo';
import { MenuPrefab, VPMenu } from '@/components/UI/VPMenu';
import { useMemo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export type SiteHeaderProps = React.PropsWithChildren & {
  variant?: 'index' | 'auth';
  labelColorVariant?: LogoProps['labelColorVariant'];
  showNavigation?: boolean;
};

/**The header displayed outside of the main app-portion of the site. */
export const SiteHeader = ({
  variant = 'index',
  labelColorVariant = 'main',
  showNavigation = true,
}: SiteHeaderProps) => {
  const { status } = useSession();
  const isLoggedIn = status == 'authenticated';

  const links = useMemo(() => {
    if (isLoggedIn) {
      return [
        {
          href: '/dashboard',
          text: 'Hallintapaneeli',
        },

        {
          href: '/logout',
          text: 'Kirjaudu Ulos',
        },
      ];
    } else {
      return [
        {
          href: '/login',
          text: 'Kirjaudu Sisään',
        },

        {
          href: '/register',
          text: 'Rekisteröidy',
        },

        {
          href: '/tos',
          text: 'Käyttöehdot',
        },
      ];
    }
  }, [isLoggedIn]);

  const navElement = useMemo(() => {
    const linkElements = links.map(({ href, text }) => <Link href={href}>{text}</Link>);
    const navClassName = [
      '2xl:text-lg xs:text-base font-semibold',
      variant === 'auth' ? 'text-white' : '2xl:text-white xs:text-black',
    ].join(' ');

    return (
      showNavigation && (
        <nav className={navClassName}>
          <ul className='2xl:gap-8 xs:gap-4 items-center xs:hidden md:flex'>
            {links.map(({ href, text }) => (
              <li>
                <Link href={href}>{text}</Link>
              </li>
            ))}
          </ul>

          <div className='xs:block md:hidden'>
            {/*This is probably causing problems when logging out, when the page loads. */}
            <MenuPrefab
              trigger={<MenuIcon sx={{ color: 'black' }} />}
              target={<VPMenu>{linkElements}</VPMenu>}
            />
          </div>
        </nav>
      )
    );
  }, [links, showNavigation]);

  const classes = useMemo(() => {
    const classes: string[] = [];
    if (variant === 'index') {
      classes.push('2xl:border-b-white xs:border-b-black border-b-[1px]');
    }

    classes.push(
      'absolute flex w-full items-center justify-between py-4 sm:px-20 md:px-24 xs:px-4 2xl:px-36 z-[20] xs:backdrop-blur-md 2xl:backdrop-blur-none'
    );
    return classes.join(' ');
  }, [variant]);

  return (
    <header className={classes}>
      <Logo
        backgroundVariant={variant}
        labelColorVariant={labelColorVariant}
      />
      {navElement}
    </header>
  );
};
