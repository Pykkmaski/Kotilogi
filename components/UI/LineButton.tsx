'use client';

type LineButtonProps = React.ComponentProps<'div'> & {
  open?: boolean;
};

export function LineButton({ open, ...props }: LineButtonProps) {
  return (
    <div
      className='flex flex-col gap-2 w-5'
      {...props}>
      <div className='bg-white h-1 w-full' />
      <div className='bg-white h-1 w-[70%]' />
      <div className='bg-white h-1 w-full' />
    </div>
  );
}
