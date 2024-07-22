import Link from 'next/link';

type IconLinkProps = React.ComponentProps<typeof Link> & {
  icon: React.ReactNode;
};

export function IconLink({ icon, ...props }: IconLinkProps) {
  return (
    <Link
      className='p-2 rounded-md hover:bg-teal-600'
      {...props}>
      {icon}
    </Link>
  );
}
