import { SiteHeaderProps } from '@/components/App/SiteHeader';
import Link from 'next/link';
import { useMemo } from 'react';

export type LogoProps = {
  backgroundVariant?: SiteHeaderProps['variant'];
  labelColorVariant?: 'main' | 'gray';
};

export const Logo = ({ backgroundVariant = 'index', labelColorVariant = 'main' }: LogoProps) => {
  const [appNameClassName, labelClassName] = useMemo(() => {
    const appNameClassName = [
      '2xl:text-2xl xs:text-xl font-bold flex gap-2 items-baseline hover:no-underline',
      backgroundVariant == 'index' ? 'xs:text-black lg:text-white' : 'text-black',
    ].join(' ');

    const labelClassName = [
      'text-xs',
      labelColorVariant == 'main' ? '2xl:text-primary xs:text-black' : 'text-slate-400',
    ].join(' ');

    return [appNameClassName, labelClassName];
  }, [backgroundVariant, labelColorVariant]);

  return (
    <Link
      href='/'
      className={appNameClassName}>
      KOTIDOK
    </Link>
  );
};
