'use client';

import { FooterNav } from '@/components/Feature/FooterNav';

export function MobileNavbar({ propertyId }) {
  return (
    <FooterNav>
      <FooterNav.Link href='info'>
        <i className='fa fa-info-circle' />
      </FooterNav.Link>

      <FooterNav.Link href='images'>
        <i className='fa fa-image' />
      </FooterNav.Link>

      <FooterNav.Link href='files'>
        <i className='fa fa-copy' />
      </FooterNav.Link>

      <FooterNav.Link href={`/properties/${propertyId}/events`}>
        <i className='fa fa-chevron-left' />
      </FooterNav.Link>
    </FooterNav>
  );
}
