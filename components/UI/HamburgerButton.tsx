'use client';

type HamburgerButton = React.ComponentProps<'div'> & {
  open?: boolean;
};

export function HamburgerButton({ open, ...props }: HamburgerButton) {
  return (
    <div
      className='flex flex-col gap-2 w-8'
      {...props}>
      <div className='bg-white h-1 w-full' />
      <div className='bg-white h-1 w-full' />
      <div className='bg-white h-1 w-full' />
    </div>
  );
}
