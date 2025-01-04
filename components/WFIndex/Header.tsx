'use client';

import Link from 'next/link';
import { ToggleProvider } from '../Util/ToggleProvider';
import { useMemo } from 'react';
import { MenuPrefab, VPMenu } from '../UI/VPMenu';
import { VPMobileMenu } from '../App/VPMobileMenu';
import { useIndexPageContext } from 'kotilogi-app/app/IndexPageProvider';

const bgColor = '#101211';
const textColor = '#dbdbdb';

const PrimaryHeaderButton = ({ children }) => (
  <button className='bg-wf-primary text-black px-4 py-2 rounded-lg'>{children}</button>
);

const SecondaryHeaderButton = ({ children }) => (
  <button className='text-white px-4 py-2 bg-wf-secondary rounded-lg'>{children}</button>
);

function MenuButton({ children, ...props }: React.ComponentProps<'button'>) {
  const Line = () => <div className='w-full h-[2px] bg-white' />;
  const lines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 3; ++i) {
      lines.push(<Line />);
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

function MenuContent({ isToggled = null }) {
  const className = [
    'flex flex-col gap-2 absolute w-32 top-8 right-1 p-2 bg-wf-secondary transition-opacity duration-500',
    isToggled ? 'opacity-1' : 'opacity-0',
  ].join(' ');

  return isToggled ? (
    <nav className={className}>
      <Link href='Yrityksille'>Yrityksille</Link>
      <Link href='Yrityksille'>Jutut</Link>
      <Link href='Yrityksille'>Ota Yhteyttä</Link>
    </nav>
  ) : null;
}

function Menu() {
  return (
    <div className='flex flex-col gap-2 justify-end relative'>
      <ToggleProvider>
        <ToggleProvider.Trigger>
          <MenuButton />
        </ToggleProvider.Trigger>
        <ToggleProvider.Target>
          <MenuContent />
        </ToggleProvider.Target>
      </ToggleProvider>
    </div>
  );
}

/**Renders the page header. */
export function Header() {
  const { footerRef } = useIndexPageContext();

  return (
    <header
      style={{
        color: textColor,
      }}
      className={`z-30 sticky top-0 left-0 w-full lg:px-[5rem] xs:px-2 bg-wf-background flex items-center gap-12 h-16 justify-between text-wf-header-text`}>
      <div className='flex items-center gap-16'>
        <Link href='/'>
          <img
            src='/logo.png'
            className='aspect-auto h-[30px]'
          />
        </Link>
        <nav className={`text-[#dbdbdb] xs:hidden items-center gap-8 font-medium lg:flex`}>
          <Link href='Yrityksille'>Yrityksille</Link>
          <Link href='Yrityksille'>Jutut</Link>
          <button onClick={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            Ota Yhteyttä
          </button>
        </nav>
      </div>

      <div className='lg:flex xs:hidden gap-3 items-center'>
        <Link href='/login'>
          <SecondaryHeaderButton>Kirjaudu</SecondaryHeaderButton>
        </Link>

        <Link href='/register'>
          <PrimaryHeaderButton>Rekisteröidy</PrimaryHeaderButton>
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
    </header>
  );
}
