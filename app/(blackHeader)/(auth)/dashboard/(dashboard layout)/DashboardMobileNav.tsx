'use client';

import { FooterNav } from '@/components/FooterNav';
import Link from 'next/link';

export function DashboardMobileNav() {
  return (
    <FooterNav>
      <FooterNav.Link href='/dashboard/settings'>
        <i className='fa fa-cog' />
      </FooterNav.Link>

      <Link href='/dashboard/properties'>
        <i className='fa fa-home' />
      </Link>

      <Link href='/dashboard/cart'>
        <i className='fa fa-shopping-cart' />
      </Link>
    </FooterNav>
  );
}
