'use client';
import { useMemo } from 'react';

/**Renders its children within a rounded box, with padding and a shadow. */
export function ContentBox({
  children,
  grow = true,
  ...props
}: React.PropsWithChildren & { grow?: boolean }) {
  const classes = useMemo(
    () =>
      [
        'rounded-lg shadow-lg lg:p-4 xs:p-2 bg-white flex-1',
        grow ? 'flex-grow' : 'flex-grow-0',
      ].join(' '),
    [grow]
  );

  return (
    <div
      {...props}
      className={classes}>
      {children}
    </div>
  );
}
