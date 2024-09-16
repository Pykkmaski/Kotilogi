import Link from 'next/link';

export const AltActionLink = ({ children, href, ...props }: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      href={href}
      className='text-[#757575] font-[600] text-[18px]'>
      {children}
    </Link>
  );
};
