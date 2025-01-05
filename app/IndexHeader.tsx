'use client';

import Link from 'next/link';
import { ToggleProvider } from '../components/Util/ToggleProvider';
import { useMemo } from 'react';
import { MenuPrefab, VPMenu } from '../components/UI/VPMenu';
import { VPMobileMenu } from '../components/App/VPMobileMenu';
import { useIndexPageContext } from 'kotilogi-app/app/IndexPageProvider';
import { Header } from '../components/WFIndex/Header';
import { PrimaryButton, SecondaryButton } from '@/components/WFIndex/Button';

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
  const { footerRef } = useIndexPageContext();

  return (
    <Header>
      <Header.LogoContainer>
        <Header.MainNav>
          <Link href='/business'>Yrityksille</Link>
          <Link href='/blog'>Jutut</Link>
          <button
            onClick={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className='hover:underline'>
            Ota Yhteyttä
          </button>
        </Header.MainNav>
      </Header.LogoContainer>

      <div className='lg:flex xs:hidden gap-3 items-center'>
        <Link href='/login'>
          <SecondaryButton>Kirjaudu</SecondaryButton>
        </Link>

        <Link href='/register'>
          <PrimaryButton>Rekisteröidy</PrimaryButton>
        </Link>
      </div>
      <div className='xs:block lg:hidden'>
        <MenuPrefab
          trigger={<MenuButton />}
          target={
            <VPMenu>
              <Link href='Yrityksille'>Yrityksille</Link>
              <Link href='Yrityksille'>Jutut</Link>
              <Link href='/login'>Kirjaudu Sisään</Link>
              <Link href='/register'>Rekisteröidy</Link>
              <button
                onClick={() =>
                  footerRef.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }>
                Ota Yhteyttä
              </button>
            </VPMenu>
          }
        />
      </div>
    </Header>
  );
}
