'use client';

import { FooterNav } from '@/components/Feature/FooterNav';

export function MobileNavBar() {
  return (
    <FooterNav>
      <FooterNav.Link href='info'>
        <i className='fa fa-info-circle' />
      </FooterNav.Link>

      <FooterNav.Link href='events'>
        <i className='fa fa-history' />
      </FooterNav.Link>

      <FooterNav.Link href='usage?type=all'>
        <i className='fa fa-bolt' />
      </FooterNav.Link>

      <FooterNav.Link href='images'>
        <i className='fa fa-image' />
      </FooterNav.Link>

      <FooterNav.Link href='files'>
        <i className='fa fa-copy' />
      </FooterNav.Link>
    </FooterNav>
  );
}
