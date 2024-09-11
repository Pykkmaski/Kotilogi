import { Logo3 } from '@/components/App/Header';
import Link from 'next/link';

export const Header = () => {
  return (
    <Link
      href='/'
      className='lg:text-2xl xs:text-xl font-bold text-black flex gap-2 items-baseline hover:no-underline py-4'>
      KOTIDOK
      <small className='text-xs text-slate-400'>BETA</small>
    </Link>
  );
};
