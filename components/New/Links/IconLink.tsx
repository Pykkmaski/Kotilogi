import Link from 'next/link';
import React from 'react';

type IconLinkProps = React.ComponentProps<typeof Link> & {
  icon: React.ReactElement;
};

export function IconLink({ icon, ...props }: IconLinkProps) {
  return (
    <Link
      className='p-2 rounded-md hover:bg-primary'
      {...props}>
      {React.cloneElement(icon, {
        ...icon.props,
        sx: { color: 'white' },
      })}
    </Link>
  );
}
