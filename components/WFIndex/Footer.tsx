'use client';

import { useIndexPageContext } from 'kotilogi-app/app/(wf)/(index)/IndexPageProvider';
import Link from 'next/link';
import appPackage from '@/package.json';

type FooterSpacerProps = Omit<React.ComponentProps<'div'>, 'className'> & {
  align?: 'start' | 'middle' | 'end';
};

function FooterSpacer({ children, align = 'start', ...props }: FooterSpacerProps) {
  const className = [
    'flex flex-col',
    align == 'start'
      ? 'lg:items-start xs:items-start'
      : align == 'middle'
      ? 'lg:items-center xs:items-start'
      : align == 'end'
      ? 'lg:items-end xs:items-start'
      : '',
  ].join(' ');

  return (
    <div
      {...props}
      className={className}>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  );
}

FooterSpacer.Heading = function ({
  children,
  ...props
}: Omit<React.ComponentProps<'h1'>, 'className'>) {
  return (
    <h1
      {...props}
      className='text-base text-white opacity-60'>
      {children}
    </h1>
  );
};

export function Footer() {
  const { footerRef } = useIndexPageContext();

  return (
    <footer
      className='flex w-full px-wf-index py-wf-index text-white'
      ref={footerRef}>
      <div className='flex flex-col w-full gap-16'>
        <div
          id='footer-content-grid'
          className='lg:grid lg:grid-cols-3 w-full xs:flex xs:flex-col xs:gap-10'>
          <FooterSpacer
            id='footer-product-links'
            align='start'>
            <FooterSpacer.Heading>Tuote</FooterSpacer.Heading>
            <Link href='/'>Etusivulle</Link>
            <Link href='/business'>Yrityksille</Link>
            <Link href='/login'>Kirjaudu Sisään</Link>
            <Link href='/doc/privacy.pdf' target="_blank">Tietosuojaseloste</Link>
          </FooterSpacer>

          <FooterSpacer
            id='footer-company-info'
            align='middle'>
            <FooterSpacer.Heading>Kotidok Oy</FooterSpacer.Heading>
            <span className='italic'>Y-tunnus: 3426507-4</span>
            <span className='italic'>Timontie 13</span>
            <span className='italic'>65300 Vaasa</span>
            <Link
              href='tel:0451310749'
              className='italic'>
              0451310749
            </Link>
            <Link
              href='mailto:kotidok.service@gmail.com'
              className='italic'>
              kotidok.service@gmail.com
            </Link>
          </FooterSpacer>

          <FooterSpacer
            id='footer-social-info'
            align='end'>
            <FooterSpacer.Heading>Some</FooterSpacer.Heading>
            <Link
              href='https://www.instagram.com/kotidok.fi/'
              target='_blank'>
              Instagram
            </Link>
            <Link
              href='https://www.facebook.com/profile.php?id=61559435630869'
              target='_blank'>
              Facebook
            </Link>
          </FooterSpacer>
        </div>
        <div className='w-full border border-b-white opacity-20' />
        <div
          id='footer-bottom-info'
          className='w-full flex justify-between items-center'>
          <img
            src='/logo.png'
            className='aspect-auto h-[40px]'
          />
          <div className='text-white opacity-60 flex flex-row gap-8'>
            <span>v{appPackage.version}</span>
            <span>&copy; Kotidok OY 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
