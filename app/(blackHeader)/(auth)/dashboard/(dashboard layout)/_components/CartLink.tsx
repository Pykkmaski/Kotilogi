import IconLink from '@/components/UI/IconLink';
import Link from 'next/link';
import { useState } from 'react';

export function CartLink({
  selected,
  numDueBills = 0,
  ...props
}: React.ComponentProps<typeof Link> & {
  selected?: boolean;
  numDueBills?: number;
}) {
  console.log(props.href);
  return (
    <IconLink
      {...props}
      selected={selected}
      imageSrc='/icons/cart.png'
      icon='fa-shopping-cart'>
      <div className='relative w-full flex items-center justify-between'>
        <span>Ostoskori</span>
        {numDueBills !== 0 ? (
          <div className='flex items-center justify-center rounded-full bg-orange-500 shadow-md text-white right-2 w-6 h-6 font-semibold mr-2'>
            {numDueBills}
          </div>
        ) : null}
      </div>
    </IconLink>
  );
}
