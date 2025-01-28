'use client';

import Link from 'next/link';
import { ToggleProvider } from '../../../components/Util/ToggleProvider';
import { useMemo } from 'react';
import { MenuPrefab, VPMenu } from '../../../components/UI/VPMenu';
import { VPMobileMenu } from '../../../components/App/VPMobileMenu';
import { useIndexPageContext } from 'kotilogi-app/app/(wf)/(index)/IndexPageProvider';
import { Header } from '../../../components/WFIndex/Header';
import { PrimaryButton, SecondaryButton } from '@/components/WFIndex/Button';
import { usePathname } from 'next/navigation';
import { TabButton } from '@/components/UI/TabButton';
import { useSession } from 'next-auth/react';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import Spinner from '@/components/UI/Spinner';
import { VPSideMenu } from '@/components/UI/VPSideMenu';

function MenuButton({ children, ...props }: React.ComponentProps<'button'>) {
  const Line = () => <div className='w-full h-[2px] bg-white' />;
  const lines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 3; ++i) {
      lines.push(<Line key={`menu-btn-line-${i}`} />);
    }
    return lines;
  }, []);

  return (
    <button
      {...props}
      className='w-8 flex flex-col gap-1'>
      {lines}
    </button>
  );
}

/**Renders the page header. */
export function IndexHeader() {
  const { data: session, status } = useSession();
  const { contactRef } = useIndexPageContext();
  const pathname = usePathname();
  const getLinkClassName = (href: string) => (pathname == href ? 'text-wf-primary' : 'text-white');
  const contactLink =
    pathname == '/' ? (
      <button
        onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
        className='hover:underline'>
        Ota Yhteyttä
      </button>
    ) : (
      <Link href='/#contact-section'>Ota Yhteyttä</Link>
    );

  return (
    <Header>
      <Header.LogoContainer>
        <Header.MainNav>
          <Link
            href='/blog'
            className={getLinkClassName('/blog')}>
            Blogi
          </Link>
          {contactLink}
        </Header.MainNav>
      </Header.LogoContainer>

      <div className='lg:flex xs:hidden gap-3 items-center'>
        {status == 'loading' ? (
          <Spinner />
        ) : session ? (
          <>
            <Link href='/dashboard'>Hallintapaneeli</Link>
            <Link href='/logout'>
              <SecondaryButton>Kirjaudu ulos</SecondaryButton>
            </Link>
          </>
        ) : (
          <>
            <Link href='/login'>
              <SecondaryButton>Kirjaudu</SecondaryButton>
            </Link>

            <Link href='/register'>
              <PrimaryButton>Rekisteröidy</PrimaryButton>
            </Link>
          </>
        )}
      </div>
      <div className='xs:block lg:hidden'>
        <MenuPrefab
          trigger={<MenuButton />}
          target={<VPMobileMenu session={session} />}
        />
      </div>
    </Header>
  );
}
