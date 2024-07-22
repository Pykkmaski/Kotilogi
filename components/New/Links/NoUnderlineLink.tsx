import Link from 'next/link';

export function NoUnderlineLink({ children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className='hover:no-underline'>
      {children}
    </Link>
  );
}
