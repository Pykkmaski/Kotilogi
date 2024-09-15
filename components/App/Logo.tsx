import Link from 'next/link';

type LogoProps = {
  variant?: 'orange' | 'gray';
};
export const Logo = ({ variant = 'orange' }: LogoProps) => {
  const appNameClasses = [
    '2xl:text-2xl xs:text-xl font-bold flex gap-2 items-baseline hover:no-underline',
    variant == 'orange' ? '2xl:text-white xs:text-black' : 'xs:text-black',
  ];

  const labelClasses = [
    'text-xs',
    variant == 'orange' ? '2xl:text-primary xs:text-black' : '2xl:text-slate-400 xs:text-black',
  ];

  return (
    <Link
      href='/'
      className={appNameClasses.join(' ')}>
      KOTIDOK
      <small className={labelClasses.join(' ')}>BETA</small>
    </Link>
  );
};
