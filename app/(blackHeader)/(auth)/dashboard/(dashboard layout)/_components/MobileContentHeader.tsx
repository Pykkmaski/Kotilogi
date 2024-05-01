'use client';

import { useUserProviderContext } from '../../../UserProvider';

export function MobileContentHeader() {
  const { user } = useUserProviderContext();
  return (
    <div className='xs:block lg:hidden flex flex-col mb-10'>
      <small className='text-slate-500 text-sm'>Hallintapaneeli</small>
      <h1 className='text-lg'>{user.email}</h1>
    </div>
  );
}
