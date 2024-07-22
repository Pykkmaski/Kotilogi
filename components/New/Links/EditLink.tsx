import Link from 'next/link';

/**Renders a next-Link with a pre-determined style. */
export function EditLink({ children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className='text-teal-500 font-semibold'>
      {children}
    </Link>
  );
}
