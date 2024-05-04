'use client';

import { FooterNav } from '@/components/Feature/FooterNav';
import IconLink from '@/components/UI/IconLink';
import Link from 'next/link';
import { useState } from 'react';

function Token({ n }) {
  return n !== 0 ? (
    <div className='flex items-center justify-center rounded-full bg-orange-500 shadow-md text-white right-2 w-6 h-6 font-semibold mr-2 xs:text-sm lg:text-lg'>
      {n}
    </div>
  ) : null;
}

export function CartLink({
  selected,
  numDueBills = 0,
  variant = 'desktop',
  ...props
}: React.ComponentProps<typeof Link> & {
  selected?: boolean;
  numDueBills?: number;
  variant?: 'desktop' | 'mobile';
}) {
  return variant === 'desktop' ? (
    <IconLink
      {...props}
      selected={selected}
      imageSrc='/icons/cart.png'
      icon='fa-shopping-cart'>
      <div className='relative w-full flex items-center justify-between'>
        <span>Ostoskori</span>
        <Token n={numDueBills} />
      </div>
    </IconLink>
  ) : (
    <FooterNav.Link href={props.href}>
      <div className='relative'>
        <i className='fa fa-shopping-cart' />
        <div className='absolute top-0 left-4'>
          <Token n={numDueBills} />
        </div>
      </div>
    </FooterNav.Link>
  );
}
