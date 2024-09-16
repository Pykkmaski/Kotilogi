import Link from 'next/link';

/**A link to render alternate actions under the user auth forms, such as logging in from the register form. */
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
